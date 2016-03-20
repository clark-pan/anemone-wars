export const SELECT_PLAYER_BOT = Symbol('SELECT_PLAYER_BOT');
export function selectPlayerBot(player, bot) {
	return {
		type: SELECT_PLAYER_BOT,
		player: player,
		bot: bot
	};
}

export const UPDATE_PLAYER_BOT_CODE = Symbol('UPDATE_PLAYER_BOT_CODE');
export function updatePlayerBotCode(player, bot, code) {
	return {
		type: UPDATE_PLAYER_BOT_CODE,
		player: player,
		bot: bot,
		code: code
	};
}
