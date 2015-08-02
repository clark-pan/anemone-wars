import _ from 'lodash';
import Tile, { TILE_TYPES } from './tile';

const _tiles = Symbol('tiles'),
	_width = Symbol('width'),
	_height = Symbol('height'),
	_tilePositions = Symbol('_tilePositions');

const SIZE_WIDTH = 48,
	SIZE_HEIGHT = 20;

function positiveMod(x, n){
	return ((x % n) + n) % n;
}

/**
 * This is a hexagonal board orientated as such:
 *
 * 0,0       2,0       4,0
 *      1,0       3,0       5,0
 * 0,1       2,1       4,1
 *      1,1       3,1       5,1
 * 0,2       2,2       4,2
 *      1,2       3,2       5,2
 *
 * The edges connect to each other, and thus the width needs to be an even number
 */
export default class Board {
	constructor(width = SIZE_WIDTH, height = SIZE_HEIGHT) {
		if(width % 2){
			throw new Error('Board width must be even');
		}
		this[_width] = width;
		this[_height] = height;

		let tiles = this[_tiles] = [];
		let positionMap = this[_tilePositions] = new WeakMap();
		for(let x = 0; x < width; x++){
			let column = [];
			tiles.push(column);
			for(let y = 0; y < height; y++){
				let tile = new Tile();
				column.push(tile);
				positionMap.set(tile, [x, y]);
			}
		}
	}

	getSize(){
		return {
			width : this[_width],
			height : this[_height]
		}
	}

	getRandomTile(){
		let x = ~~(Math.random() * this[_width]),
			y = ~~(Math.random() * this[_height]);
		return this.getTile(x, y);
	}

	getTile(x, y) {
		if(x >= 0 && x < this[_width] && y >= 0 && y < this[_height]){
			return this[_tiles][x][y];
		} else {
			return null;
		}
	}

	getTilePosition(tile){
		return this[_tilePositions].get(tile);
	}

	getNeighbours(tile){
		return _.times(6, (n) => this.getRelativeTile(tile, n));
	}

	getRelativeTile(tile, direction){
		let position = this.getTilePosition(tile);
		if(!position){
			throw new Error('tile not part of board');
		}
		let [x, y] = position,
			x2, y2;
		switch(direction){
			case 0:
				x2 = x;
				y2 = y - 1;
			break;
			case 1:
				x2 = x + 1;
				y2 = y + ((x % 2) ? 0 : -1);
			break;
			case 2:
				x2 = x + 1;
				y2 = y + ((x % 2) ? 1 : 0);
			break;
			case 3:
				x2 = x;
				y2 = y + 1;
			break;
			case 4:
				x2 = x - 1;
				y2 = y + ((x % 2) ? 1 : 0);
			break;
			case 5:
				x2 = x - 1;
				y2 = y + ((x % 2) ? 0 : -1);
			break;
			default:
				throw new Error('Invalid tile direction');
		}

		//Make the world loop around on itself
		x2 = positiveMod(x2, this[_width]);
		y2 = positiveMod(y2, this[_height]);

		return this.getTile(x2, y2);
	}

	getTileTop(tile){
		return this.getRelativeTile(tile, 0);
	}

	getTileTopRight(tile){
		return this.getRelativeTile(tile, 1);
	}

	getTileBottomRight(tile){
		return this.getRelativeTile(tile, 2);
	}

	getTileBottom(tile){
		return this.getRelativeTile(tile, 3);
	}

	getTileBottomLeft(tile){
		return this.getRelativeTile(tile, 4);
	}

	getTileTopLeft(tile){
		return this.getRelativeTile(tile, 5);
	}

	*tiles() {
		for(let column of this[_tiles]){
			for(let tile of column){
				yield tile;
			}
		}
	}

	*columns() {
		for(let column of this[_tiles]){
			yield function *(){
				for(let tile of column){
					yield tile;
				}
			}
		}
	}
}