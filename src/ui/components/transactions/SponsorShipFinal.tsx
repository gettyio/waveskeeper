import * as styles from './../pages/styles/transactions.styl';
import * as React from 'react'
import { translate, Trans } from 'react-i18next';
import { Balance } from '../ui';

@translate('extension')
export class SponsorShipFinal extends React.PureComponent {
    
    readonly props;
    
    render() {
        const { tx, isApprove, isReject, isSend } = this.props;
        
        if (isApprove) {
            return <div>
                <div className="margin-main-large headline2">
                    {isSend ? <Trans i18nKey='sign.transactionSend'>Your transaction is send!</Trans> : null}
                    {!isSend ? <Trans i18nKey='sign.transactionConfirmed'>Your transaction is confirmed!</Trans>: null}
                </div>
                <div className="basic500">
                    {isSend ? <Trans i18nKey='sign.transactionSendSponsor'>Sponsorship has been set</Trans> : null}
                    {!isSend ? <Trans i18nKey='sign.transactionConfirmSponsor'>You have approved a Set Sponsorship transaction</Trans> : null}
                </div>
            </div>
        }
        
        if (isReject) {
            return <div className="margin-main-large headline2">
                <Trans i18nKey='sign.transactionFiled'>Your transaction is rejected!</Trans>
            </div>
        }
        
        return null;
    }
}
