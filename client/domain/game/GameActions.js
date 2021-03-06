import _ from 'lodash';
import Promise from 'bluebird';

import * as Engine from 'shared/game/engine.js';
import MoveService from 'client/services/MoveService.js';
import GithubService from 'client/services/GithubService.js';

export const NEW_GAME = Symbol('NEW_GAME');
export function newGame() {
	return {
		type: NEW_GAME,
		numPlayers: 5,
		width: 40,
		height: 20
	};
}

export const START_GAME = Symbol('START_GAME');
export function startGame() {
	return {
		type: START_GAME
	};
}

export const UPDATE_GAME_STATE = Symbol('UPDATE_GAME_STATE');
export function updateGameState(gameState, moves, previousTurnNumber) {
	return {
		type: UPDATE_GAME_STATE,
		gameState: gameState,
		moves: moves,
		previousTurnNumber: previousTurnNumber
	};
}

export const SELECT_PLAYER_PROFILE = Symbol('SELECT_PLAYER_PROFILE');
export function selectPlayerProfile(player, profileId) {
	return {
		type: SELECT_PLAYER_PROFILE,
		playerNumber: player.playerNumber,
		profileId: profileId
	};
}

export const SELECT_PLAYER_BOT = Symbol('SELECT_PLAYER_BOT');
export function selectPlayerBot(player, botPath) {
	return {
		type: SELECT_PLAYER_BOT,
		playerNumber: player.playerNumber,
		botPath: botPath
	};
}

export const SELECT_PLAYER_CODE = Symbol('SELECT_PLAYER_CODE');
export function selectPlayerCode(player, code) {
	return {
		type: SELECT_PLAYER_CODE,
		playerNumber: player.playerNumber,
		code: code
	};
}

export const FETCH_PLAYER_BOT_CODE = Symbol('FETCH_PLAYER_BOT_CODE');
export function fetchPlayerBotCode(player, botPath) {
	return async (dispatch) => {
		let code = await GithubService.getUserProfileBotCodeAsync(player.profileId, botPath);
		dispatch(selectPlayerCode(player, code));
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

export function generateNextGameStateAsync(game) {
	return async (dispatch) => {
		if (game.gameState.turn === -1) {
			dispatch(startGame());
		}
		let turn = game.gameState.turn;

		let moves = await Promise
			.all(
				_.map(game.players, (player) => MoveService
					.getPlayerMoveAsync(game.gameState, player)
					.catch(() => { return {}; }) // Todo, better error handling
				)
			)
			.reduce((acc, moreMoves) => _.assign(acc, moreMoves));

		let nextState = Engine.resolve(game.gameState, moves);
		dispatch(updateGameState(nextState, moves, turn));
	};
}

export function startSampleGameAsync() {
	return async (dispatch) => {
		dispatch(updateGamePlayback(false, 'faster'));
		await dispatch(newGame());
		let code = await System.import('client/domain/game/SplashBot.js!text');
		_.times(5, (i) => dispatch(selectPlayerCode({ playerNumber: i }, code)));
		dispatch(startGame());
		dispatch(updateGamePlayback(true, 'faster'));
	};
}
