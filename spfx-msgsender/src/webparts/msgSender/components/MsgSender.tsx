import * as React from 'react';
import styles from './MsgSender.module.scss';
import { IMsgSenderProps } from './IMsgSenderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, TextField, autobind } from 'office-ui-fabric-react';

export interface IMsgSenderState {
    message: string;
}

export default class MsgSender extends React.Component<IMsgSenderProps, IMsgSenderState> {
    constructor(props: IMsgSenderProps) {
        super(props);
        this.state = {
            message: "testmessage"
        };
    }

    @autobind
    public _sendMessageHandler() {
        //const iframeId = "dom-isolated-webpart-d150a302-f8de-47b1-8a1b-602040022c36";
        //HTMLElement
        const iFrameElem = this._getiFrame();
        if (iFrameElem) {
            let url = new URL(iFrameElem.src);

            iFrameElem.contentWindow.postMessage(this.state.message, url.origin);
            console.log(`sender: message sent.`);
        }
    }
    public _getiFrame(): HTMLIFrameElement {
        let ret: HTMLIFrameElement = null;
        const elemsIFrame = document.getElementsByTagName("iframe");
        for (let i = 0; i < elemsIFrame.length; i++) {
            const elem = elemsIFrame[i];
            if (elem.id.indexOf("dom-isolated-webpart") != -1) {
                ret = elem as HTMLIFrameElement;
                break;
            }
        }
        return ret;
    }
    @autobind
    private _onChanged(event, newValue) {
        this.setState({
            message: newValue
        });
    }
    public render(): React.ReactElement<IMsgSenderProps> {
        return (
            <div className={styles.msgSender}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Welcome to SharePoint!</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField value={this.state.message} onChange={this._onChanged} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton text="send message" onClick={this._sendMessageHandler} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
