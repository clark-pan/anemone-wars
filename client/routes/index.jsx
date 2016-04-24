import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './layouts/MainLayout.jsx';
import SplashPage from './splash/SplashPage.jsx';
import LocalGamePage from './local-game/LocalGamePage.jsx';

import { wrapOnEnter } from 'client/utils/RouterUtils.js';

export default function getRoutes(store) {
	return (
		<Route path="/" component={ MainLayout }>
			<IndexRoute component={ SplashPage } onEnter={ wrapOnEnter(store, SplashPage.onEnter) }/>
			<Route path="local-game" component={ LocalGamePage } onEnter={ wrapOnEnter(store, LocalGamePage.onEnter) }/>
		</Route>
	);
}
