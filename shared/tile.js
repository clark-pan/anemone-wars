let _neighbours = Symbol('neighbour'),
	_setNeighbour = Symbol('setNeighbour');

export const TILE_TYPES = {
	NORMAL : Symbol('NORMAL'),
	EMPTY : Symbol('EMPTY'),
	ROCK : Symbol('ROCK')
};

/**
 * This is a hexagonal shaped tile oriented as such:
 *
 *    -- 0 --
 *   /       \
 *  5         1
 * /           \
 * \           /
 *  4         2
 *   \       /
 *    -- 3 --
 */
export default class Tile {
	constructor(){
		this[_neighbours] = [null, null, null, null, null, null];
		this.type = TILE_TYPES.EMPTY;
	};

	[_setNeighbour](position, neighbour) {
		if(position < 6 && position >= 0){
			this[_neighbours][position] = neighbour;
		}
	};

	getNeighbour(position){
		return this[_neighbours][position];
	};

	get topLeft() {
		return this.getNeighbour(5);
	}
	get bottomLeft() {
		return this.getNeighbour(4);
	}
	get bottom() {
		return this.getNeighbour(3);
	}
	get bottomRight() {
		return this.getNeighbour(2);
	}
	get topRight(){
		return this.getNeighbour(1);
	}
	get top(){
		return this.getNeighbour(0);
	}

	set topLeft(neighbour) {
		return this[_setNeighbour](5, neighbour);
	}
	set bottomLeft(neighbour) {
		return this[_setNeighbour](4, neighbour);
	}
	set bottom(neighbour) {
		return this[_setNeighbour](3, neighbour);
	}
	set bottomRight(neighbour) {
		return this[_setNeighbour](2, neighbour);
	}
	set topRight(neighbour){
		return this[_setNeighbour](1, neighbour);
	}
	set top(neighbour){
		return this[_setNeighbour](0, neighbour);
	}
}