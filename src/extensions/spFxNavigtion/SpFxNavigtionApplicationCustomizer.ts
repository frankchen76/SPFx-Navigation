import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
    BaseApplicationCustomizer,
    PlaceholderContent,
    PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SpFxNavigtionApplicationCustomizerStrings';
import { GlobalNavigation } from './components/GlobalNavigation/GlobalNavigation';
const LOG_SOURCE: string = 'SpFxNavigtionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxNavigtionApplicationCustomizerProperties {
    // This is an example; replace with your own property
    testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpFxNavigtionApplicationCustomizer
    extends BaseApplicationCustomizer<ISpFxNavigtionApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;

    @override
    public onInit(): Promise<void> {
        // Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

        // let message: string = this.properties.testMessage;
        // if (!message) {
        //     message = '(No properties were provided.)';
        // }

        // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    }

    private _renderPlaceHolders(): void {
        console.log("_renderPlaceHolders()");
        console.log(
            "Available placeholders: ",
            this.context.placeholderProvider.placeholderNames
                .map(name => PlaceholderName[name])
                .join(", ")
        );

        // Handling the top placeholder
        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Top,
                { onDispose: this._onDispose }
            );

            // The extension should not assume that the expected placeholder is available.
            if (!this._topPlaceholder) {
                console.error("The expected placeholder (Top) was not found.");
                return;
            }

            if (this._topPlaceholder.domElement) {
                const element: React.ReactElement<{}> = React.createElement(
                    GlobalNavigation,
                    {}
                );
                ReactDom.render(element, this._topPlaceholder.domElement);
            }

        }

        // Handling the bottom placeholder
        // if (!this._bottomPlaceholder) {
        //     this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        //         PlaceholderName.Bottom,
        //         { onDispose: this._onDispose }
        //     );

        //     // The extension should not assume that the expected placeholder is available.
        //     if (!this._bottomPlaceholder) {
        //         console.error("The expected placeholder (Bottom) was not found.");
        //         return;
        //     }

        //     if (this.properties) {
        //         // let bottomString: string = this.properties.Bottom;
        //         // if (!bottomString) {
        //         //     bottomString = "(Bottom property was not defined.)";
        //         // }

        //         if (this._bottomPlaceholder.domElement) {
        //             this._bottomPlaceholder.domElement.innerHTML = `
        //             <div class="${styles.app}">
        //                 <div class="${styles.bottom}">
        //                     <i class="ms-Icon ms-Icon--Info" aria-hidden="true">Test footer</i>
        //                 </div>
        //             </div>`;
        //         }
        //     }
        // }
    }

    private _onDispose(): void {
        console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
    }
}
