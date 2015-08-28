var actions = ['split', 'regenerate'];

function getMoves(state, me, myAnemones) {
	return Object.keys(myAnemones).reduce(function(moves, id) {
		moves[id] = {
			action : actions[~~(Math.random() * actions.length)],
			direction : ~~(Math.random() * 6)
		};
		return moves;
	}, {});
}