import { generateNextGameStateAsync, SPEED_MAP } from 'client/domain/game/GameActions.js';

// TODO refactor into a saga

export default function gameRunner(store) {
	let timeoutId, lastRunning, lastSpeed;
	return store.subscribe(() => {
		let { game } = store.getState();
		if (game) {
			if (game.running !== lastRunning || game.speed !== lastSpeed) {
				clearTimeout(timeoutId);
				timeoutId = null;
				lastRunning = game.running;
				lastSpeed = game.speed;
				let tick = () => {
					let currentState = store.getState(), currentGame = currentState.game;
					if (currentGame.running && !timeoutId) {
						timeoutId = setTimeout(async () => {
							await store.dispatch(generateNextGameStateAsync(currentGame));
							timeoutId = null;
							tick();
						}, SPEED_MAP[currentGame.speed]);
					} else {
						timeoutId = null;
					}
				};

				tick();
			}
		}
	});
}
