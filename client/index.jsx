import 'fetch-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import './index.css!';

import store, { history } from 'client/domain/store.js';
import routes from 'client/routes/index.jsx';
import { newGame } from 'client/domain/game/GameActions.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

setTimeout(() => store.dispatch(newGame()));

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			{ routes }
		</Router>
	</Provider>
, document.getElementById('app'));
