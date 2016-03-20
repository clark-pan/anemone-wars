import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'codemirror/lib/codemirror.css!';
import './index.css!';

import store from '/client/domain/store.js';
import { addGame } from '/client/domain/game/GameActions.js';

import MainPage from '/client/routes/main/MainPage';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

store.dispatch(addGame());

ReactDOM.render(
	<Provider store={store}>
		<MainPage />
	</Provider>
, document.getElementById('app'));
