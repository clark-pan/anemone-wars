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
			if (game.running) {
				let tick = () => {
					timeoutId = setTimeout(() => {
						let { currentGame = game } = store.getState();
						if (game.running) {
							store.dispatch(generateNextGameStateAsync(currentGame)).then(() => {
								tick();
							});
						}
					}, SPEED_MAP[game.speed]);
				};

				tick();
			}
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MainPage />
	</Provider>
, document.getElementById('app'));
