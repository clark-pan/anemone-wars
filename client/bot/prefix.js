function handleStart(e) {
	(self.start || function noop() {})(e.data[2]);
	self.postMessage([e.data[1]]);
}

function getPlayerAnemones(state, player) {
	var anemones = {}, id;
	for (id in state.anemones) {
		if (state.anemones[id].ownerId === player.id) {
			anemones[id] = state.anemones[id];
		}
	}
	return anemones;
}

function handleMoves(e) {
	var state = e.data[2],
		player = e.data[3],
		playerAnemones = getPlayerAnemones(state, player),
		moves;

	moves = (self.getMoves || function identityObj() { return {}; })(state, player, playerAnemones);

	self.postMessage([e.data[1], moves]);
}
self.addEventListener('message', function listener(e) {
	switch (e.data[0]) {
		case 'start': handleStart(e); break;
		case 'getMoves': handleMoves(e); break;
		default:
			// Do nothing
	}
});
