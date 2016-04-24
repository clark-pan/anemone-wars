import 'fetch-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import './index.css!';

import store, { history } from 'client/domain/store.js';
import getRoutes from 'client/routes/index.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			{ getRoutes(store) }
		</Router>
	</Provider>
, document.getElementById('app'));
