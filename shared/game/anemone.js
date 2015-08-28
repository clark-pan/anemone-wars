import _ from 'lodash';

/**
 * @typedef {Object} Anemone
 * @description - An anemone
 *
 * @property {String} id - id of anemone
 * @property {int} health - Health of the anemone
 * @property {String} ownerId - id of the owner of this anemone
 * @property {Tuple.<int, int>} position - [x, y] position
 *
 * @example
 * {
 *     id : '123',
 *     health : 10,
 *     ownerId : 'playerId',
 *     position : [0, 0]
 * }
 */

export const MAX_HEALTH = 12,
	HEALTH_REGEN = 5,
	ATTACK_COST = -2,
	DEFENSE_COST = -1,
	FULL_DAMAGE = -4,
	DEFENDED_DAMAGE = 0,

	STATES = {
		IDLE: 'idle',
		DEFEND: 'defend',
		REGENERATE: 'regenerate',
		SPLIT: 'split',
		ATTACK: 'attack'
	};

export function create(id, ownerId, position, health = MAX_HEALTH) {
	return {
		id: id,
		health: health,
		ownerId: ownerId,
		position: position
	};
}

export function setHealth(anemone, health) {
	anemone.health = Math.min(MAX_HEALTH, health);
}

/**
 * Defend action for the engine
 * Defenders incur a cost of {DEFENSE_COST} for defending
 *
 * @param  {Anemone} anemone - anemone thats defending
 * @return {void}
 */
export function defend(anemone) {
	anemone.health += DEFENSE_COST;
}

/**
 * Attack action for the engine
 * Attackers incur a cost of {ATTACK_COST} for attacking
 * The target take damage of {DEFENDED_DAMAGE} if it was defending, {FULL_DAMAGE} otherwise
 *
 * @param  {Anemone} anemone - anemone thats attacking
 * @param  {Anemone} target - anemone thats being attacked
 * @return {void}
 */
export function attack(anemone, target) {
	anemone.health += ATTACK_COST;
	target.health += target.state === STATES.DEFEND ? DEFENDED_DAMAGE : FULL_DAMAGE;
}

/**
 * Regenerate action for the engine
 * Regenerates gain {HEALTH_REGEN} health points
 *
 * @param  {Anemone} anemone - anemone thats regenerating
 * @return {Anemone} Updated anemone
 */
export function regenerate(anemone) {
	setHealth(anemone, anemone.health + HEALTH_REGEN);
}

function clone(anemone, health) {
	return _.defaults({
		id: null,
		health: health,
		position: null
	}, anemone);
}

/**
 * Split action for the engine
 * @param  {Anemone} anemone - anemone to split
 * @return {Anemone|null}
 *
 * Cloned anemone
 *
 * The cloned anemone will not have a position or id
 */
export function split(anemone) {
	if (anemone.health > 1) {
		const health = anemone.health;
		anemone.health = Math.ceil(health / 2);
		return clone(anemone, Math.floor(health / 2));
	}
	return null;
}
