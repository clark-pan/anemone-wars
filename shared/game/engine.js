import _ from 'lodash';
import Anemone, { ANEMONE_STATES } from './anemone';

const _cid = Symbol('cid'),
	_anemones = Symbol('anemones'),
	_anemoneIds = Symbol('anemoneIds'),
	_playerAnemones = Symbol('playerAnemones'),
	_anemoneOwner = Symbol('anemoneOwner'),
	_tileOccupant = Symbol('tileOccupant'),
	_anemoneLocations = Symbol('anemoneLocations'),
	_turnCounter = Symbol('turnCounter'),

	//Methods
	_getNextId = Symbol('getNextId'),
	_registerAnemone = Symbol('registerAnemone'),
	_removeAnemone = Symbol('removeAnemone'),
	_updateAnemoneState = Symbol('updateAnemoneState'),
	_resolveDefense = Symbol('resolveDefense'),
	_resolveAttack = Symbol('resolveAttack'),
	_resolveSplit = Symbol('resolveSplit'),
	_resolveRegen = Symbol('resolveRegen'),
	_resolveDeath = Symbol('resolveDeath');

//Read description of resolve split for the reasoning behind this method
function splitHealthAccumulator(sum, anemone, i){
	if(i === 0){
		return sum + anemone.health;
	} else if( i === 1) {
		return sum + Math.min(anemone.health, 3);
	} else {
		return sum + Math.min(anemone.health, 1);
	}
}

/**
 * Game engine
 */
export default class Game {
	constructor(board, players = []) {
		this.board = board;
		this.players = new Map(_.map(players, (v) => [v.id, v]));

		this[_cid] = 0;
		this[_anemones] = new Map();
		this[_anemoneIds] = new WeakMap();
		this[_playerAnemones] = new WeakMap();
		this[_anemoneOwner] = new WeakMap();
		this[_tileOccupant] = new WeakMap();
		this[_anemoneLocations] = new WeakMap();
		this[_turnCounter] = -1;

		for(let player of this.players.values()){
			this[_playerAnemones].set(player, new Set());
		}
	}

	setupGame(){
		var tile;
		this[_turnCounter] = 0;
		for(let player of this.players.values()){
			let anemone = new Anemone();
			//Find a random tile to put this anemone on
			//TODO, implement equidistant distribution for fairer game
			do {
				tile = this.board.getRandomTile();
			} while(this[_tileOccupant].has(tile))
			this[_registerAnemone](anemone, tile, player);
		}
	}

	//TODO, use a binary format that would be more efficiently transferred into web worker/child process
	getPlayerState(player){
		let _this = this;
		if(!this.players.has(player.id)) return null;
		let serialized = {
			turn : this[_turnCounter],
			players : {},
			anemones : {},
			tiles : []
		};

		for(let player of this.players.values()){
			serialized.players[player.id] = {
				id : player.id,
				name : player.name
			};
		}

		for(let anemone of this[_playerAnemones].get(player).values()){
			let position = this.board.getTilePosition(this[_anemoneLocations].get(anemone)),
				id = this[_anemoneIds].get(anemone);
			serialized.anemones[id] = createSerializedAnemone(anemone);
		}

		let x = 0, y = 0;
		for(let column of this.board.columns()){
			let currentColumn = [];
			y = 0;
			serialized.tiles.push(currentColumn);
			for(let tile of column()){
				let serializedTile = {
					occupant : null,
					x : x,
					y : y
				};
				let anemone = this.getTileOccupant(tile);
				if(anemone){
					serializedTile.occupant = createSerializedAnemone(anemone);
				}
				currentColumn.push(serializedTile);
				y++;
			}
			x++;
		}
		return serialized;

		function createSerializedAnemone(anemone){
			let id = _this.getAnemoneId(anemone);
			if(serialized.anemones[id]){
				return serialized.anemones[id];
			}
			let position = _this.board.getTilePosition(_this.getAnemoneLocation(anemone)),
				player = serialized.players[_this.getAnemoneOwner(anemone).id];
			return {
				id : id,
				owner : player,
				position : position,
				health : anemone.health
			};
		}
	}

	getAnemone(id){
		return this[_anemones].get(id);
	}

	getAnemoneId(anemone){
		return this[_anemoneIds].get(anemone);
	}

	getPlayerAnemones(player){
		return this[_playerAnemones].get(player);
	}

	getAnemoneOwner(anemone){
		return this[_anemoneOwner].get(anemone);
	}

	getTileOccupant(tile){
		return this[_tileOccupant].get(tile);
	}

	getAnemoneLocation(anemone){
		return this[_anemoneLocations].get(anemone);
	}

	getTileOwner(tile){
		return this.getAnemoneOwner(this.getTileOccupant(tile));
	}

	getAnemoneNeighbours(anemone){
		return _.map(this.board.getNeighbours(this.getAnemoneLocation(anemone)), (tile) => this.getTileOccupant(tile));
	}

	[_getNextId](){
		return (this[_cid]++).toString();
	}

	[_registerAnemone](anemone, tile, player){
		let anemones, id;
		if(this[_anemones].has(anemone)){
			throw new Error('Trying to add an anemone that already exists');
		}

		id = this[_getNextId]();
		this[_anemones].set(id, anemone);
		this[_anemoneIds].set(anemone, id);

		this[_anemoneOwner].set(anemone, player);
		this[_playerAnemones].get(player).add(anemone);

		this[_tileOccupant].set(tile, anemone);
		this[_anemoneLocations].set(anemone, tile);
	}

	[_removeAnemone](anemone){
		if(this[_anemoneIds].has(anemone)){
			let id = this.getAnemoneId(anemone);
			this[_anemones].delete(id);
			this[_anemoneIds].delete(anemone);

			let player = this.getAnemoneOwner(anemone);
			this[_anemoneOwner].delete(anemone);
			this[_playerAnemones].get(player).delete(anemone);

			let tile = this.getAnemoneLocation(anemone);
			if(tile){
				this[_tileOccupant].delete(tile);
				this[_anemoneLocations].delete(anemone);
			}
		}
	}

	/**
	 * @typedef {Object} Move
	 * @description - A move a player can issue to an anemone
	 * 
	 * @property {String} id - id of the {@link Anemone}
	 * @property {('defend'|'attack'|'regenerate'|'split'|'idle')} [action= 'idle'] - action to take
	 * @property {0...5} direction - Used by attack and split to decide which direction to split in
	 */
	/**
	 * Resolves a set of moves
	 * @param  {[Move]} moves - list of moves
	 * @return {void}
	 */
	resolve(moves = []){
		console.log('turn: ', this[_turnCounter]);
		let moveSets = _.chain(moves)
			.filter((move) => move && _.isString(move.id))
			.unique((move) => move && move.id)
			.groupBy('action').value();

		this[_updateAnemoneState](moves);
		this[_resolveDefense](moveSets.defend);
		this[_resolveAttack](moveSets.attack);
		//The order of the resolution between split and regen is very important
		//If we split after regen, it means that a regenerator will not be able to 'beat' a splitter as he'll be guranteed to take damage
		//Whereas if we split after regen, it means the regenerator can heal any damage taken from the split
		this[_resolveSplit](moveSets.split);
		this[_resolveRegen](moveSets.regenerate);
		this[_resolveDeath]();
		this[_turnCounter]++;
	}

	[_updateAnemoneState](moves){
		for(let move of moves){
			let anemone = this.getAnemone(move.id);
			if(anemone){
				switch(move.action){
					case 'defend': anemone.state = ANEMONE_STATES.DEFENSE; break;
					case 'attack': anemone.state = ANEMONE_STATES.ATTACK; break;
					case 'regenerate': anemone.state = ANEMONE_STATES.REGEN; break;
					case 'split': anemone.state = ANEMONE_STATES.SPLIT; break;
					default : anemone.state = ANEMONE_STATES.IDLE;
				}
			}
		}
	}

	[_resolveDefense](moves = []){
		for(let move of moves){
			let anemone = this.getAnemone(move.id);
			if(anemone){
				anemone.defend();
			}
		}
	}

	[_resolveAttack](moves = []){
		for(let move of moves){
			let anemone = this.getAnemone(move.id),
				tile = this.getAnemoneLocation(anemone),
				direction = move.direction;

			if(tile && direction >= 0 && direction <= 5){
				let target = this.getTileOccupant(this.board.getRelativeTile(tile, direction));
				if(target){
					anemone.attack(target);
				}
			}
		}
	}

	/**
	 * Split resolves as follows:
	 *
	 * - All anemone splits happen simultaneously, and are grouped by the tiles they split onto
	 * - A health number is calculated with by adding the anemone belonging to each player in a tile
	 * - The largest health number remaining stays on the tile, with the rest dying.
	 * - The lone anemone has its health reduced by the second largest health group.
	 * - If theres a tie for most health on a tile, then no one is left, and the tile becomes/stays empty
	 *
	 * THOUGHTS
	 * The logic of adding together the health is important and needs to be balanced for game play.
	 * If its a simple addition, then I predict the dominate strategy would be to form a 'supply chain'
	 * where the backline anemone constantly split/regen their health towards the front.
	 * This would pretty much guarantee that, if two players adopt this strategy, the player with the
	 * largest surface area would win every time.
	 * 
	 * @param  {[Moves]} moves - moves that have been filtered down to just split moves
	 * @returns {Object} - returns any created/removed anemone in the form of: { created = Set<Anemone>, removed = Set<anemone> }
	 */
	[_resolveSplit](moves = []){
		let unresolvedTiles = new Map();
		let changes = {
			created : [],
			removed : []
		};

		for(let move of moves){
			let anemone = this.getAnemone(move.id),
				tile = this.getAnemoneLocation(anemone),
				direction = move.direction;

			if(tile && direction >= 0 && direction <= 5){
				let targetTile = this.board.getRelativeTile(tile, direction);
				let newAnemone = anemone.split();
				if(!newAnemone) continue;


				let anemones;
				//If this is a new tile to unresolved, initialise it as an array of the current occupant of that tile
				if(unresolvedTiles.has(targetTile)){
					anemones = unresolvedTiles.get(targetTile);
				} else {
					anemones = new Map();
					unresolvedTiles.set(targetTile, anemones);
					let currentOccupant = this.getTileOccupant(targetTile);
					if(currentOccupant){
						anemones.set(this.getAnemoneOwner(currentOccupant), [currentOccupant]);
					}
				}

				//Add this new anemone to the list of anemone on a tile
				let anemoneOwner = this.getAnemoneOwner(anemone);
				if(anemones.has(anemoneOwner)){
					anemones.get(anemoneOwner).push(newAnemone);
				} else {
					anemones.set(anemoneOwner, [newAnemone]);
				}
			}
		}

		for(let [tile, anemoneSets] of unresolvedTiles){
			let largestAnemoneGroup, nextLargestHealth;
			for(let [player, anemones] of anemoneSets){
				let health = _.chain(anemones)
					.sortBy('health')
					.reduceRight(splitHealthAccumulator, 0)
					.value();

				if(!largestAnemoneGroup || largestAnemoneGroup.health < health){
					nextLargestHealth = largestAnemoneGroup ? largestAnemoneGroup.health : 0;
					largestAnemoneGroup = {
						health : health,
						player : player,
						anemones : anemones
					};
				} else if (largestAnemoneGroup && largestAnemoneGroup.health === health){
					nextLargestHealth = health;
				}
			}

			//If the largest group's health is the same as the next largest, then everyone dies
			if(nextLargestHealth === largestAnemoneGroup.health){
				let tileOccupant = this.getTileOccupant(tile);
				changes.removed.push(tileOccupant);
				this[_removeAnemone](tileOccupant);
			} else {
				let winnerAnemone = largestAnemoneGroup.anemones[0];
				let tileOccupant = this.getTileOccupant(tile);
				if(winnerAnemone !== tileOccupant){
					if(tileOccupant){
						changes.removed.push(tileOccupant);
						this[_removeAnemone](tileOccupant);
					}
					changes.created.push(winnerAnemone);
					this[_registerAnemone](winnerAnemone, tile, largestAnemoneGroup.player);
				}

				let finalHealth = largestAnemoneGroup.health - nextLargestHealth;
				winnerAnemone.health = finalHealth;
			}
		}

		return changes;
	}

	[_resolveRegen](moves = []){
		for(let move of moves){
			let anemone = this.getAnemone(move.id);
			if(anemone){
				anemone.regenerate();
			}
		}
	}

	[_resolveDeath](){
		let removed = [];
		for(let anemone of this[_anemones].values()){
			if(anemone.health <= 0){
				this[_removeAnemone](anemone);
				removed.push(anemone);
			}
		}
		return removed;
	}

	get turn() {
		return this[_turnCounter];
	}
}