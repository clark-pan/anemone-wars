import _ from 'lodash';
import Promise from 'bluebird';

import * as Engine from '/shared/game/engine.js';
import MoveService from '/client/services/MoveService.js';

export const NEW_GAME = Symbol('NEW_GAME');
export function addGame() {
	return {
		type: NEW_GAME,
		numPlayers: 6,
		width: 40,
		height: 20
	};
}

export const START_GAME = Symbol('START_GAME');
export function startGame(players) {
	return {
		type: START_GAME,
		players: players
	};
}

export const UPDATE_GAME_STATE = Symbol('UPDATE_GAME_STATE');
export function updateGameState(gameState) {
	return {
		type: UPDATE_GAME_STATE,
		gameState: gameState
	};
}

export function generateNextGameStateAsync(game) {
	return async (dispatch) => {
		if (game.gameState.turn === -1) {
			dispatch(startGame(game.players));
		}

		let moves = await Promise
			.all(
				_.map(game.players, (player) => MoveService
					.getPlayerMoveAsync(game.gameState, player, player.code)
					.catch(() => {})
				)
			)
			.reduce((acc, moreMoves) => _.assign(acc, moreMoves));

		let nextState = Engine.resolve(game.gameState, moves);
		dispatch(updateGameState(nextState));
		return nextState;
	};
}

export const SPEED_MAP = {
	'slow': 1000,
	'fast': 500,
	'faster': 100
};


export const UPDATE_GAME_PLAYBACK = Symbol('UPDATE_GAME_PLAYBACK');
export function updateGamePlayback(running, speed) {
	if (!(speed in SPEED_MAP)) {
		throw new Error('invalid speed option');
	}

	return {
		type: UPDATE_GAME_PLAYBACK,
		running: !!running,
		speed: speed
	};
}
