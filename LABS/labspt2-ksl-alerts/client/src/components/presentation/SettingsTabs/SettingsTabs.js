import React from 'react';
import { Segment, Tab, } from 'semantic-ui-react';
import { style } from './style/inline/inline.js';

const AccountSettings = props => {

    return (
        <Tab.Pane>
            Account Settings
        </Tab.Pane>
    );
}

const BillingSettings = props => {

    return (
        <Tab.Pane>
            Billing Settings
        </Tab.Pane>
    );
}

const Interface = props => {

    return (
        <Tab.Pane>
            Interface Settings
        </Tab.Pane>
    );
}

const SettingsTabs = props => {

    const panes = [
        { menuItem: 'Account',   render: AccountSettings },
        { menuItem: 'Billing',   render: BillingSettings },
        { menuItem: 'Interface', render: Interface       },
    ]


    return (
        <Segment
            style={ style.settingsTabsContainer }
        >
            <Tab menu={{ fluid: true, vertical: true, tabular: true, }} panes={ panes } />
        </Segment>
    );
}

export default SettingsTabs;