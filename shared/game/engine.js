import _ from 'lodash';

import * as Anemone from './anemone';
import * as Board from './board';

// TODO refactor this to be immutable

/**
 * @typedef {Object} Engine.Move
 * @description - A move a player can issue to an anemone
 *
 * @property {('defend'|'attack'|'regenerate'|'split'|'idle')} [action= 'idle'] - action to take
 * @property {0...5} direction - Used by attack and split to decide which direction to split in
 *
 * @example
 * {
 *     action : 'attack',
 *     direction : 3
 * }
 */
/**
 * @typedef {Object} Engine.State
 * @description - The board state
 *
 * @property {Board} board - the board
 * @property {Object.<String, Anemone>} anemones - Hash of the anemones
 * @property {int} turn - The turn number
 * @property {int} _lastAnemoneCounter - Private property used so we can generate unique ids
 *
 * @example
 * {
 *     board : Board,
 *     anemones : {
 *         'anemoneId' : Anemone
 *     },
 *     turn : 0,
 *     _lastAnemoneCounter : 123
 * }
 */

const parseInt10 = (n) => parseInt(n, 10);

export function createGame(width, height) {
	return {
		board: Board.createBoard(width, height),
		anemones: Object.create(null),
		turn: -1,
		_lastAnemoneCounter: 0
	};
}

export function startGame(state, numPlayers) {
	if (state.turn !== -1) {
		throw new Error('Game has already started');
	}
	let tiles = _.chain(state.board)
		.flattenDeep(state.board)
		.shuffle()
		.value();

	_.times(numPlayers, (i) => {
		const anemoneId = state._lastAnemoneCounter++;
		let tile = tiles.pop(), position = [tile.x, tile.y];
		state.anemones[anemoneId] = Anemone.create(anemoneId, i, position);
		tile.occupantId = anemoneId;
	});
	state.turn = 0;

	return state;
}

export function getRandomInitialState(width, height, numPlayers) {
	const state = createGame(width, height);
	startGame(state, numPlayers);
	return state;
}

function resolveDefense(state, moveSets) {
	const defendMoves = moveSets[Anemone.STATES.DEFEND];
	for (const anemoneId in defendMoves) {
		const anemone = state.anemones[anemoneId];
		if (anemone) {
			Anemone.defend(anemone);
		}
	}
}

function resolveAttack(state, moveSets) {
	const attackMoves = moveSets[Anemone.STATES.ATTACK],
		regenerateMoves = moveSets[Anemone.STATES.REGENERATE],
		getNewPosition = _.partial(Board.getPositionFromDirection, state.board);

	for (const anemoneId in attackMoves) {
		const move = attackMoves[anemoneId],
			anemone = state.anemones[anemoneId];
		let newPosition, target, x, y;
		if (!anemone) continue;
		newPosition = getNewPosition(anemone.position, move.direction);
		if (!newPosition) continue;
		[x, y] = newPosition;
		target = state.anemones[state.board[x][y].occupantId];
		if (!target) continue;

		Anemone.attack(anemone, target);

		// Give attack an advantage over regeneration by cancelling out a regeneration when it is attacked
		delete regenerateMoves[target.id];
	}
}

// Read description of resolve split for the reasoning behind this method
function splitHealthAccumulator(sum, anemone, i) {
	if (i === 0) {
		return sum + anemone.health;
	} else if ( i === 1) {
		return sum + Math.min(anemone.health, 3);
	}
	return sum + Math.min(anemone.health, 1);
}

function calculateAnemoneGroupHealth(anemoneGroup) {
	let health = _.chain(anemoneGroup)
		.orderBy(['health'], ['desc'])
		.reduceRight(splitHealthAccumulator, 0)
		.value();
	return {
		health,
		anemone: anemoneGroup[0]
	};
}

/**
 * Split resolves as follows:
 *
 * 1. All anemone splits happen simultaneously, and are grouped by the tiles they split onto
 * 2. For each tile, a health number is calculated with by adding the anemone belonging to each player in that tile
 * 3. The largest health number remaining stays on the tile.
 * 4. The lone anemone has its health reduced by the second largest health group.
 * 5. If theres a tie for most health on a tile, then no one is left, and the tile becomes/stays empty
 *
 * THOUGHTS
 * The logic of adding together the health is important and needs to be balanced for game play.
 * If its a simple addition, then I predict the dominate strategy would be to form a 'supply chain'
 * where the backline anemone constantly split/regen their health towards the front.
 * This would pretty much guarantee that, if two players adopt this strategy, the player with the
 * largest surface area would win every time.
 */
function resolveSplit(state, moveSets) {
	const unresolvedTiles = Object.create(null),
		splitMoves = moveSets[Anemone.STATES.SPLIT],
		getNewPosition = _.partial(Board.getPositionFromDirection, state.board);

	// 1. split happens
	for (const anemoneId in splitMoves) {
		const move = splitMoves[anemoneId],
			anemone = state.anemones[anemoneId];
		let targetPosition, x, y, positionKey, clone;

		if (!anemone) continue;
		targetPosition = getNewPosition(anemone.position, move.direction);

		if (!targetPosition) continue;
		[x, y] = targetPosition;
		positionKey = x + ':' + y;

		clone = Anemone.split(anemone);
		if (!clone) continue;

		// Add the newly split anemone to an unresolved set
		if (!unresolvedTiles[positionKey]) unresolvedTiles[positionKey] = [];
		unresolvedTiles[positionKey].push(clone);
	}

	for (const positionKey in unresolvedTiles) {
		const anemones = unresolvedTiles[positionKey],
			groupedByPlayer = _.groupBy(anemones, 'playerNumber'),
			[x, y] = positionKey.split(':').map(parseInt10),
			tile = state.board[x][y],
			currentOccupant = state.anemones[tile.occupantId];
		let anemoneGroups, winningAnemone;

		if (currentOccupant) {
			if (!groupedByPlayer[currentOccupant.playerNumber]) {
				groupedByPlayer[currentOccupant.playerNumber] = [];
			}
			groupedByPlayer[currentOccupant.playerNumber].unshift(currentOccupant);
		}

		// 2. calculate the health of every group
		anemoneGroups = _.chain(groupedByPlayer)
			.map(calculateAnemoneGroupHealth)
			.orderBy(['health'], ['desc'])
			.value();

		// 3. Find the winner
		if (anemoneGroups.length > 1) {
			let [firstGroup, secondGroup] = anemoneGroups;
			if (firstGroup.health === secondGroup.health) {
				winningAnemone = null;
			} else {
				winningAnemone = firstGroup.anemone;
				Anemone.setHealth(winningAnemone, firstGroup.health - secondGroup.health);
			}
		} else {
			winningAnemone = anemoneGroups[0].anemone;
		}

		// 4. Put the winner on the board
		if (!winningAnemone && currentOccupant) { // No winner, kill the guy on the current position
			if (currentOccupant) {
				delete state.anemones[currentOccupant.id];
				state.board[x][y].occupantId = null;
			}
		} else {
			// If the winning anemone is the currentOccupant, then nothing further needs to be done
			if (currentOccupant && currentOccupant === winningAnemone) {
				continue;
			} else {
				winningAnemone.id = state._lastAnemoneCounter++;
				winningAnemone.position = [x, y];
				state.anemones[winningAnemone.id] = winningAnemone;
				state.board[x][y].occupantId = winningAnemone.id;

				if (currentOccupant) {
					delete state.anemones[currentOccupant.id];
				}
			}
		}
	}
}

function resolveRegen(state, moveSets) {
	const regenMoves = moveSets[Anemone.STATES.REGENERATE];
	for (const anemoneId in regenMoves) {
		const anemone = state.anemones[anemoneId];
		if (anemone) {
			Anemone.regenerate(anemone);
		}
	}
}

function resolveDeath(state) {
	for (const anemoneId in state.anemones) {
		const anemone = state.anemones[anemoneId];
		if (anemone.health <= 0) {
			const [x, y] = anemone.position;
			delete state.anemones[anemone.id];
			state.board[x][y].occupantId = null;
		}
	}
}

/**
 * Resolves a set of moves
 * It is assumed that the moves are validated already, meaning there are only moves for anemone that exist
 *
 * @param {State} state - the current state
 * @param {Object.<String, Move>} moves - list of moves, keyed on anemoneId
 * @return {State} - The next state
 */

export function resolve(state, moves) {
	const moveSets = _.reduce(moves, (_moveSets, move, anemoneId) => {
		if (!_.isObject(move)) return _moveSets;
		if (_moveSets[move.action]) {
			_moveSets[move.action][anemoneId] = move;
		}
		return _moveSets;
	}, {
		[Anemone.STATES.DEFEND]: Object.create(null),
		[Anemone.STATES.ATTACK]: Object.create(null),
		[Anemone.STATES.REGENERATE]: Object.create(null),
		[Anemone.STATES.SPLIT]: Object.create(null)
	});
	state.turn += 1;

	resolveDefense(state, moveSets);
	resolveAttack(state, moveSets);
	// The order of the resolution between split and regen is very important
	// If we split after regen, it means that a regenerator will not be able to 'beat' a splitter as he'll be guranteed to take damage
	// Whereas if we split after regen, it means the regenerator can heal any damage taken from the split
	resolveSplit(state, moveSets);
	resolveRegen(state, moveSets);
	resolveDeath(state);

	return state;
}
