import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { Balance, Button, BUTTON_TYPE } from '../ui';
import { SignClass } from './SignClass';
import { TxIcon } from './TransactionIcon';
import { OriginWarning } from './OriginWarning';
import { TransactionBottom } from './TransactionBottom';

@translate('extension')
export class Alias extends SignClass {
    
    render() {
        const { data: tx } = this.props.signData;
        
        return <div className={styles.transaction}>
            {super.render()}

            <div className={styles.txScrollBox}>

                <div className={`${styles.txIcon} margin`}>
                    <TxIcon txType={this.props.txType}/>
                </div>

                <div className={`${styles.txBalance} ${styles.block} center headline2`}>
                    {tx.alias}
                </div>

                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.txid'>TXID</Trans>
                    </div>
                    <div className={styles.txValue}>{this.props.txHash}</div>
                </div>
                
                <div className={styles.txRow}>
                    <div className="tx-title tag1 basic500">
                        <Trans i18nKey='transactions.fee'>Fee</Trans>
                    </div>
                    <div className={styles.txValue}>
                        <Balance isShortFormat={true} balance={tx.fee} showAsset={true}/>
                    </div>
                </div>
            </div>
            
            <TransactionBottom {...this.props}/>
        </div>
    }
}
