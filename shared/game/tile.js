export const TILE_TYPES = {
	NORMAL : Symbol('NORMAL'),
	//Maybe we'll want to do different types of tiles later?
	//Like maybe tiles that provide defense or attack benefits
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
		this.type = TILE_TYPES.NORMAL;
	};
}