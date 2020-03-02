import * as React from "react";
import styles from './globalNavigation.module.scss';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

import { IGlobalNavigationProps } from './IGlobalNavigationProps';
import { IGlobalNavigationState } from './IGlobalNavigationState';


export class GlobalNavigation extends React.Component<IGlobalNavigationProps, IGlobalNavigationState> {
    private _overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };
    private _items: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text: 'New',
            ariaLabel: 'New',
            subMenuProps: {
                items: [
                    {
                        key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' }, subMenuProps: {
                            items: [
                                { key: 'test', text: 'test' }
                            ]
                        }
                    },
                    { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } }
                ]
            }
        },
        {
            key: 'upload',
            text: 'Upload',
            // iconProps: { iconName: 'Upload' },
            // split: true,
            //disabled: true,
            href: 'https://dev.office.com/fabric',
            subMenuProps: {
                items: [
                    { key: 'item1', text: 'Item One' },
                    { key: 'item2', text: 'Item Two' }
                ]
            }
        },
        {
            key: 'share',
            text: 'Share',
            //iconProps: { iconName: 'Share' },
            //disabled: true
        },
        {
            key: 'download',
            text: 'Download',
            ariaLabel: 'Download',
            //iconProps: { iconName: 'Download' },
            //iconOnly: true,
            //disabled: true
        }
    ];

    constructor(props: IGlobalNavigationProps) {
        super(props);

        this.state = {
        };
    }

    public componentWillMount(): void {
    }

    public componentDidMount(): void {
    }

    public render(): JSX.Element {
        return (
            <div className={styles.app}>
                <CommandBar
                    items={this._items}
                    overflowButtonProps={this._overflowButtonProps}
                    ariaLabel="Use left and right arrow keys to navigate between commands"
                />
                {/* <div className={styles.top}>
                    <i className="ms-Icon ms-Icon--Info" aria-hidden="true">Test header</i>
                </div> */}
            </div>
        );
    }
}
