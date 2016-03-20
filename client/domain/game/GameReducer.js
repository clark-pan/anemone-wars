import _ from 'lodash';

import { NEW_GAME, START_GAME, UPDATE_GAME_STATE, UPDATE_GAME_PLAYBACK } from './GameActions.js';

import * as Engine from '/shared/game/engine.js';

function createDefaultState(width, height) {
	return {
		players: [],
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
				gameState: Engine.getRandomInitialState(state.gameState, _.map(action.players, 'id'))
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
