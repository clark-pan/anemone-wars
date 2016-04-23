import React, { Component } from 'react';
import { routerShape } from 'react-router';

import { Menu, MenuItem, Paper } from 'material-ui';

import SPLASH from 'client/constants/splash.txt!text';

import './SplashPage.css!';

export default class SplashPage extends Component {
	static displayName = 'SplashPage';
	static contextTypes = {
		router: routerShape.isRequired
	};
	render() {
		return (
			<div className="splash">
				<Paper className="splash-title">
					<pre className="splash-pre">{ SPLASH }</pre>
				</Paper>
				<Paper className="splash-paper">
					<Menu style={ { opacity: 1, background: '#ffffff' } }>
						<MenuItem primaryText="How to play" />
						<MenuItem primaryText="Practise" onTouchTap={ () => this.context.router.push('/local-game') } />
						<MenuItem primaryText="Tournament" disabled={ true } title="Coming soon!" />
					</Menu>
				</Paper>
			</div>
		);
	}
}
