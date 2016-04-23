import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './layouts/MainLayout.jsx';
import SplashPage from './splash/SplashPage.jsx';
import LocalGamePage from './local-game/LocalGamePage.jsx';

const routes = (
	<Route path="/" component={ MainLayout }>
		<IndexRoute component={ SplashPage } />
		<Route path="local-game" component={ LocalGamePage } />
	</Route>
);


export default routes;
