import _ from 'lodash';

import { NEW_GAME, START_GAME, UPDATE_GAME_STATE, UPDATE_GAME_PLAYBACK, SELECT_PLAYER_PROFILE, SELECT_PLAYER_CODE, SELECT_PLAYER_BOT } from './GameActions.js';

import * as Engine from '/shared/game/engine.js';

function createDefaultState(width, height) {
	return {
		players: _.times(6, (i) => {
			return {
				playerNumber: i,
				code: '',
				profile: {
					avatar: null,
					colour: null
				},
				profileId: null,
				botPath: null
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
		case SELECT_PLAYER_PROFILE:
			return {
				...state,
				players: _.map(state.players, (player) => {
					if (player.playerNumber !== action.playerNumber) return player;

					return {
						...player,
						profileId: action.profileId
					};
				})
			};
		case SELECT_PLAYER_BOT:
			return {
				...state,
				players: _.map(state.players, (player) => {
					if (player.playerNumber !== action.playerNumber) return player;

					return {
						...player,
						botPath: action.botPath
					};
				})
			};
		case SELECT_PLAYER_CODE:
			return {
				...state,
				players: _.map(state.players, (player) => {
					if (player.playerNumber !== action.playerNumber) return player;

					return {
						...player,
						code: action.code
					};
				})
			};
		default:
			return state;
	}
}
