import 'babel-polyfill';
import extension from 'extensionizer';
import EventEmitter from 'events';
import PortStream from './lib/port-stream.js';
import {cbToPromise, setupDnode, transformMethods} from './lib/dnode-util';
import log from "loglevel";
import {initApp} from './ui/index';

const WAVESKEEPER_DEBUG = true;
log.setDefaultLevel(WAVESKEEPER_DEBUG ? 'debug' : 'warn');

startUi().catch(log.error);

async function startUi() {
    const port = extension.runtime.connect({name: 'ui'});
    const connectionStream = new PortStream(port);

    // Bind event emitter to background function sendUpdate.
    // This way every time background calls sendUpdate with its state we get event with new background state
    const eventEmitter = new EventEmitter();
    const emitterApi = {
        sendUpdate: async state => eventEmitter.emit('update', state)
    };
    const dnode = setupDnode(connectionStream, emitterApi,  'api');

    const background = await new Promise(resolve => {
        dnode.once('remote', (background) => {
            let backgroundWithPromises = transformMethods(cbToPromise, background);
            // Add event emitter api to background object

            backgroundWithPromises.on = eventEmitter.on.bind(eventEmitter);
            resolve(backgroundWithPromises)
        })
    });

    // global access to service on debug
    if (WAVESKEEPER_DEBUG) {
        global.background = background
    }

    // If popup is opened close notification window
    if (extension.extension.getViews({ type: "popup" }).length > 0){
        await background.closeNotificationWindow();
    }


    // Initialize app
    initApp(background);
}
