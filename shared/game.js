import _ from 'lodash';
import Anemone from './Anemone';

const _cid = Symbol('cid'), _anemoneSets = Symbol('anemoneSets'), _tileOccupants = Symbol('tileOccupants'), _turnCounter = Symbol('turnCounter');

/**
 * A move a player can issue to an anemone
 * @typedef {Object} Move
 * @property {String} id - id of the {@link Anemone}
 * @property {('defend'|'attack'|'regenerate'|'split'|'idle')} [action= 'idle'] - action to take
 * @property {0...5} direction - Used by attack and split to decide which direction to split in
 */
export default class Game {
	constructor(board, players = []) {
		this.board = board;
		this.players = players;
		this.playersHash = _.indexBy(players, 'id');
		this.anemonesHash = {};

		this[_cid] = 0;
		this[_anemoneSets] = new Map();
		this[_tileOccupants] = new Map();
		this[_turnCounter] = -1;

		for(let player of this.players){
			this[_anemoneSets].set(player, new Set());
		}
	}

	setupGame(){
		this[_turnCounter] = 0;
		for(let player of this.playersHash){
			let anemone = new Anemone();
			this.anemonesHash[this.getCID()] = anemone;
			this[_anemoneSets].get(player).add(anemone);

			//Find a random tile to put this anemone on
			//TODO, implement equidistant distribution for fairer game
			do {
				let tile = this.board.getRandomTile(),
					anemones = this[_tileOccupants].get(tile);
			} while(anemones && anemones.has(anemone))
			this.addToTile(anemone, tile);
		}
	}

	addToTile(anemone, tile){
		let anemones;
		if(!this[_tileOccupants].has(tile)){
			anemones = new Set();
			this[_tileOccupants].set(tile, anemones);
		} else {
			anemones = this[_tileOccupants].get(tile);
		}
		anemones.add(anemone);
	}

	getCID(){
		return this[_cid]++;
	}

	/**
	 * Resolves a set of moves
	 * @param  {[Move]} moves - list of moves
	 * @return {void}
	 */
	resolve(moves = []){
		let moveSets = _.groupBy(moves, 'action');

		this.updateAnemoneState(moves);
		this.resolveDefense(moveSets.defend);
		this.resolveAttack(moveSets.attack);
		//The order of the resolution between split and regen is very important
		//If we split after regen, it means that a regenerator will not be able to 'beat' a splitter as he'll be guranteed to take damage
		//Whereas if we split after regen, it means the regenerator can heal any damage taken from the split
		this.resolveSplit(moveSets.split);
		this.resolveRegen(moveSets.regenerate);
		this.resolveDeath();
		this[_turnCounter]++;
	}

	updateAnemoneState(moves){

	}

	resolveDefense(moves){
		
	}

	resolveAttack(moves){

	}

	resolveSplit(moves){

	}

	resolveRegen(moves){

	}

	resolveDeath(){

	}
}