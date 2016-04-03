var cache = {};

function getPlayerAnemones(state, player) {
	var anemones = {}, id;
	for (id in state.anemones) {
		if (state.anemones[id].playerNumber === player.playerNumber) {
			anemones[id] = state.anemones[id];
		}
	}
	return anemones;
}

function getWrappedMovesFunc(code) {
	if (cache[code]) return cache[code];

	return (cache[code] = new Function('state', 'player', 'playerAnemones', // eslint-disable-line no-new-func
		code + '\n' +
		';; return getMoves(state, player, playerAnemones);'
	));
}

function handleMoves(e) {
	var state = e.data[2],
		player = e.data[3],
		playerCode = e.data[4] || 'function getMoves() { return {}; }',
		playerAnemones = getPlayerAnemones(state, player),
		getMovesFunc = getWrappedMovesFunc(playerCode),
		moves;

	try {
		moves = getMovesFunc(state, player, playerAnemones);
	} catch(err) {
		moves = {};
	}

	self.postMessage([e.data[1], moves]);
}

self.addEventListener('message', function listener(e) {
	switch (e.data[0]) {
		case 'getMoves': handleMoves(e); break;
		default:
			// Do nothing
	}
});
