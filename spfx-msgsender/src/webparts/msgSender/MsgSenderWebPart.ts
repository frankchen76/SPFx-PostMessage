import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'MsgSenderWebPartStrings';
import MsgSender from './components/MsgSender';
import { IMsgSenderProps } from './components/IMsgSenderProps';
import { autobind } from 'office-ui-fabric-react';

export interface IMsgSenderWebPartProps {
    description: string;
}

export default class MsgSenderWebPart extends BaseClientSideWebPart<IMsgSenderWebPartProps> {

    public render(): void {
        const element: React.ReactElement<IMsgSenderProps> = React.createElement(
            MsgSender,
            {
                description: this.properties.description
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onInit(): Promise<void> {
        return new Promise<void>(resolve => {

            resolve();
        });
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
