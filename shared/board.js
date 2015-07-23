import _ from 'lodash';
import Tile, { TILE_TYPES } from './tile';

const _tiles = Symbol('tiles'),
	_width = Symbol('width'),
	_height = Symbol('height'),
	_tilePositions = Symbol('_tilePositions'),
	_connectTiles = Symbol('connectTiles');

const SIZE_WIDTH = 25,
	SIZE_HEIGHT = 10;

/**
 * This is a hexagonal board orientated as such:
 *
 * 0,0       2,0       4,0
 *      1,0       3,0
 * 0,1       2,1       4,1
 *      1,1       3,1
 * 0,2       2,2       4,2
 *      1,2       3,2  
 */
export default class Board {
	constructor(width = SIZE_WIDTH, height = SIZE_HEIGHT) {
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

		this[_connectTiles]();
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
		if(x >= 0 && x < width && y >= 0 && y < height){
			return this[_tiles][x][y];
		} else {
			return null;
		}
	}

	getTilePosition(tile){
		return this[_tilePositions].get(tile) || [null, null];
	}

	*tileIterator() {
		for(let column of this[_tiles]){
			for(let tile of column){
				yield tile;
			}
		}
	}

	[_connectTiles](){
		//TODO implement linking of the first and last nodes/column
		let previousTopLeft = null, previousBottomLeft = null, firstInRow = null;
		_.each(this[_tiles], function(column, n){
			let previousInRow = null;
			if(firstInRow){
				if(n % 2){
					previousTopLeft = firstInRow;
					previousBottomLeft = firstInRow.bottom;
				} else {
					previousTopLeft = null;
					previousBottomLeft = firstInRow;
				}
				firstInRow = null;
			}
			_.each(column, function(tile){
				if(!firstInRow) firstInRow = tile;
				if(previousInRow){
					tile.top = previousInRow;
					previousInRow.bottom = tile;
				}

				if(previousTopLeft){
					tile.topLeft = previousTopLeft;
					previousTopLeft.bottomRight = tile;
				}

				if(previousBottomLeft){
					tile.bottomLeft = previousBottomLeft;
					previousBottomLeft.topRight = tile;
				}

				previousInRow = tile;
				if(previousBottomLeft){
					previousTopLeft = previousBottomLeft;
					if(previousBottomLeft.bottom){
						previousBottomLeft = previousBottomLeft.bottom;
					}
				}
			});
		});
	}
}