import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'MsgReceiverWebPartStrings';
import MsgReceiver from './components/MsgReceiver';
import { IMsgReceiverProps } from './components/IMsgReceiverProps';
import { autobind } from 'office-ui-fabric-react';

export interface IMsgReceiverWebPartProps {
    description: string;
}

export default class MsgReceiverWebPart extends BaseClientSideWebPart<IMsgReceiverWebPartProps> {
    private _message: string;

    public render(): void {
        const element: React.ReactElement<IMsgReceiverProps> = React.createElement(
            MsgReceiver,
            {
                description: this.properties.description,
                message: this._message
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onInit(): Promise<void> {
        return new Promise<void>(resolve => {
            window.addEventListener("message", this._receiveMessage);
            resolve();
        });
    }
    @autobind
    private _receiveMessage(event: MessageEvent) {
        console.log(`receiver: ${event}`);
        console.log(event);
        this._message = event.data.toString();
        this.render();
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
