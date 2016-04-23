import 'fetch-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css!';

import store from 'client/domain/store.js';
import { newGame } from 'client/domain/game/GameActions.js';

import MainPage from 'client/routes/main/MainPage.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

store.dispatch(newGame());

ReactDOM.render(
	<Provider store={store}>
		<MainPage />
	</Provider>
, document.getElementById('app'));
