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

export function startGame(state, ownerIds) {
	if (state.turn !== -1) {
		throw new Error('Game has already started');
	}
	let tiles = _.chain(state.board)
		.flattenDeep(state.board)
		.shuffle()
		.value();

	_.each(ownerIds, (ownerId) => {
		const anemoneId = state._lastAnemoneCounter++;
		let tile = tiles.pop(), position = [tile.x, tile.y];
		state.anemones[anemoneId] = Anemone.create(anemoneId, ownerId, position);
		tile.occupantId = anemoneId;
	});
	state.turn = 0;

	return state;
}

export function getRandomInitialState(width, height, ownerIds) {
	const state = createGame(width, height);
	startGame(state, ownerIds);
	return state;
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
			groupedByPlayer = _.groupBy(anemones, 'ownerId'),
			[x, y] = positionKey.split(':').map(parseInt10),
			tile = state.board[x][y],
			currentOccupant = state.anemones[tile.occupantId];
		let currentOwnerId,
			largestAnemoneGroup, nextLargestHealth;

		if (currentOccupant) {
			if (!groupedByPlayer[currentOccupant.ownerId]) {
				groupedByPlayer[currentOccupant.ownerId] = [];
			}
			groupedByPlayer[currentOccupant.ownerId].push(currentOccupant);
			currentOwnerId = currentOccupant.ownerId;
		}

		for (const ownerId in groupedByPlayer) {
			const playerAnemones = groupedByPlayer[ownerId],
				// 2. calculating health of a group
				health = _.chain(playerAnemones)
				.sortBy('health')
				.reduceRight(splitHealthAccumulator, 0)
				.value();

			// 3. largest group is remembered along with second largest health
			if (!largestAnemoneGroup || largestAnemoneGroup.health < health) {
				nextLargestHealth = largestAnemoneGroup ? largestAnemoneGroup.health : 0;
				largestAnemoneGroup = {
					health: health,
					ownerId: ownerId,
					anemones: playerAnemones
				};
			} else if (largestAnemoneGroup && largestAnemoneGroup.health === health) {
				nextLargestHealth = health;
			}
		}

		// 3a. check if the largest health is not the same as the second largest health
		if (nextLargestHealth !== largestAnemoneGroup.health) {
			// 4. Calculate the difference and set the surviving anemone accordingly
			const finalHealth = largestAnemoneGroup.health - nextLargestHealth;

			// If the winning group is the same as the current occupant, then just update that occupant's health
			if (largestAnemoneGroup.ownerId === currentOwnerId) {
				Anemone.setHealth(state.anemones[currentOccupant.id], finalHealth);
			} else {
				const winningAnemone = largestAnemoneGroup.anemones[0];
				Anemone.setHealth(winningAnemone, finalHealth);
				winningAnemone.id = state._lastAnemoneCounter++;
				winningAnemone.position = [x, y];
				state.anemones[winningAnemone.id] = winningAnemone;
				state.board[x][y].occupantId = winningAnemone.id;

				if (currentOccupant) {
					delete state.anemones[currentOccupant.id];
				}
			}
		} else {
			// 5. If the largest group's health is the same as the next largest, then everyone dies
			if (currentOccupant) {
				delete state.anemones[currentOccupant.id];
			}
			state.board[x][y].occupantId = null;
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
