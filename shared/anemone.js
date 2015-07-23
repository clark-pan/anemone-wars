import _ from 'lodash';

const MAX_HEALTH = 10,
	HEALTH_REGEN = 5,
	ATTACK_COST = -2,
	DEFENSE_COST = -1,
	FULL_DAMAGE = -4,
	DEFENDED_DAMAGE = 0;

const _health = Symbol('health'), _state = Symbol('state');

export const ANEMONE_STATES = {
	IDLE : Symbol('IDLE'),
	DEFENSE : Symbol('DEFENSE'),
	REGEN : Symbol('REGEN'),
	SPLIT : Symbol('SPLIT'),
	ATTACK : Symbol('ATTACK')
}

export default class Anemone {
	constructor({ health = MAX_HEALTH } = {}){
		this[_health] = health;
		this.state = ANEMONE_STATES.IDLE;
	}

	isAlive(){
		return this[_health] > 0;
	}

	regenerate(){
		this[_health] = Math.min(MAX_HEALTH, this[_health] + HEALTH_REGEN);
	}

	attack(target){
		this[_health] += ATTACK_COST;
		//Defenders have an advantage against attackers by taking less damage against an attack
		if(target.state === ANEMONE_STATES.DEFENSE){
			target[_health] += DEFENDED_DAMAGE;
		} else {
			target[_health] += FULL_DAMAGE;
		}

		//Attackers have an advantage against regeneraters by cancelling their regeneration
		if(target.state === ANEMONE_STATES.REGEN){
			target[_state] = ANEMONE_STATES.IDLE;
		}
	}

	defend(){
		this[_health] += DEFENSE_COST;
	}

	split(){
		if(this.isAlive() && this.health > 1){
			let health = this.health;
			this.health = Math.ceil(health/2);
			return new Anemone(
				{
					health : Math.floor(health/2)
				}
			);
		} else {
			return null;
		}
	}

	get health(){
		return this[_health];
	}

	get state(){
		return this[_state];
	}

	set state(value){
		if(validStates.has(value)){
			this[_state] = value;
		} else {
			this[_state] = ANEMONE_STATES.IDLE;
		}
	}
}