Player {
	id,
	code,
	profile
}

Profile {
	id,
	name,
	avatar,
	color,
	bots = [
		{
			url: "",
			name: ""
		}
	]
}

Game {
	players = [Player],
	gameState,
	running,
	interval
}