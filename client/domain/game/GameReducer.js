import _ from 'lodash';

import { NEW_GAME, START_GAME, UPDATE_GAME_STATE, UPDATE_GAME_PLAYBACK } from './GameActions.js';

import * as Engine from '/shared/game/engine.js';

// Temporary test bot
import testCode from '/shared/bots/beginner.js!text';

function createDefaultState(width, height) {
	return {
		players: _.times(6, (i) => {
			return {
				playerNumber: i,
				code: testCode,
				profile: { // TODO make this into an id
					colour: '#dddddd'
				}
			};
		}),
		gameState: Engine.createGame(width, height),
		running: false,
		speed: 'slow',
		_tickTimeout: null
	};
}

export default function gameReducer(state = null, action) {
	switch (action.type) {
		case NEW_GAME:
			let newState = createDefaultState(action.width, action.height);
			
			return newState;
		case START_GAME:
			return {
				...state,
				gameState: Engine.startGame(state.gameState, action.players.length)
			};
		case UPDATE_GAME_STATE:
			return {
				...state,
				gameState: action.gameState
			};
		case UPDATE_GAME_PLAYBACK:
			return {
				...state,
				running: action.running,
				speed: action.speed
			};
		default:
			return state;
	}
}
