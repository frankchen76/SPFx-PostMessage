import * as React from 'react';
import styles from './MsgReceiver.module.scss';
import { IMsgReceiverProps } from './IMsgReceiverProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MsgReceiver extends React.Component<IMsgReceiverProps, {}> {
    public render(): React.ReactElement<IMsgReceiverProps> {
        return (
            <div className={styles.msgReceiver}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Welcome to SharePoint!</span>
                            <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
                            <p className={styles.description}>{escape(this.props.message)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
