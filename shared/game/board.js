import _ from 'lodash';

/**
 * @typedef {Array.<Array.<Tile>>} Board
 * @description
 *
 * This is a hexagonal board orientated as such:
 *
 * 0,0       2,0       4,0
 *      1,0       3,0       5,0
 * 0,1       2,1       4,1
 *      1,1       3,1       5,1
 * 0,2       2,2       4,2
 *      1,2       3,2       5,2
 *
 * The edges connect to each other, and thus the width needs to be an even number.
 *
 * Each tile looks like such:
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

/**
 * @typedef {Object} Tile
 * @description - A tile
 *
 * @property {String} occupantId - Id to anemone
 * @property {int} x - x position
 * @property {int} y - y position
 * @example
 * {
 *     occupantId : '123',
 *     x : 0,
 *     y : 0
 * }
 */
function positiveMod(x, n) {
	return ((x % n) + n) % n;
}

export function createTile(x, y, occupantId = null) {
	return {
		x: x,
		y: y,
		occupantId: occupantId
	};
}

export function createBoard(width, height) {
	if (width % 2) throw new Error('Board width must be even');

	return _.times(width, (x) => {
		return _.times(height, (y) => createTile(x, y));
	});
}

export function getTileFromPosition(board, [x, y]) {
	return board[x][y];
}

export function setTileFromPosition(board, [x, y], tile) {
	board[x][y] = tile;
}

export function getPositionFromDirection(board, position, direction) {
	const width = board.length, height = board[0].length,
		[x, y] = position;
	let x2, y2;
	switch (direction) {
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
			return null;
	}

	return [positiveMod(x2, width), positiveMod(y2, height)];
}
