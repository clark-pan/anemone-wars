var actions = ['attack', 'defend', 'split', 'regenerate'];

function getMoves(state){
	return Object.keys(state.anemones).map(function(id){
		return {
			id : id,
			action : actions[~~(Math.random() * actions.length)],
			direction : ~~(Math.random() * 6)
		};
	});
}