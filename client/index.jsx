import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'codemirror/lib/codemirror.css!';
import './index.css!';

import store from '/client/domain/store.js';
import { addGame, generateNextGameStateAsync, SPEED_MAP } from '/client/domain/game/GameActions.js';

import MainPage from '/client/routes/main/MainPage';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

store.dispatch(addGame());

let timeoutId, lastRunning, lastSpeed;
store.subscribe(() => {
	let { game } = store.getState();
	if (game) {
		if (game.running !== lastRunning || game.speed !== lastSpeed) {
			clearTimeout(timeoutId);
			timeoutId = null;
			lastRunning = game.running;
			lastSpeed = game.speed;
			let tick = () => {
				let currentState = store.getState(), currentGame = currentState.game;
				if (currentGame.running && !timeoutId) {
					timeoutId = setTimeout(async () => {
						await store.dispatch(generateNextGameStateAsync(currentGame));
						timeoutId = null;
						tick();
					}, SPEED_MAP[currentGame.speed]);
				} else {
					timeoutId = null;
				}
			};

			tick();
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MainPage />
	</Provider>
, document.getElementById('app'));
