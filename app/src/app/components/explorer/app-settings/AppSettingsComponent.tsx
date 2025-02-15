import React from 'react';
import { APP_NAME } from '../../../types';
import { ConnectedProps } from 'react-redux';
import { appSettingsContainer } from './AppSettingsContainer';
import QuickSwitchComponent from '../quick-switch/QuickSwitchContainer';
import Button2 from '../../Button';

const AppSettingsComponent = (props: ConnectedProps<typeof appSettingsContainer>) => (
	<div style={{ marginLeft: '10px' }}>
		<strong>{APP_NAME} Controls</strong>

		<ul className="app-settings-component__action-list">
			<li><QuickSwitchComponent /></li>
			<li><Button2 flat onClick={() => props.feelingLucky()}>I'm feeling lucky</Button2></li>
			<li><Button2 flat onClick={() => props.clearOldData()}>Clear old/unused data</Button2></li>
		</ul>
	</div>
);

export default AppSettingsComponent;
