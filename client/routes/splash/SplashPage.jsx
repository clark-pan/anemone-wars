import React, { Component } from 'react';
import { routerShape } from 'react-router';

import { Menu, MenuItem, Paper } from 'material-ui';

import SPLASH from 'client/constants/splash.txt!text';

import { startSampleGameAsync } from 'client/domain/game/GameActions.js';

import './SplashPage.css!';

export default class SplashPage extends Component {
	static displayName = 'SplashPage';
	static contextTypes = {
		router: routerShape.isRequired
	};
	static onEnter(store) {
		return store.dispatch(startSampleGameAsync());
	}

	render() {
		return (
			<div className="splash">
				<Paper className="splash-title">
					<pre className="splash-pre">{ SPLASH }</pre>
				</Paper>
				<Paper className="splash-paper">
					<Menu style={ { opacity: 1, background: '#ffffff' } }>
						<MenuItem primaryText="How to play" disabled title="Coming soon!" />
						<MenuItem primaryText="Practise" onTouchTap={ () => this.context.router.push('/local-game') } />
						<MenuItem primaryText="Tournament" disabled title="Coming soon!" />
					</Menu>
				</Paper>
			</div>
		);
	}
}
