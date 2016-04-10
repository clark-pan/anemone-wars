/**
 * This function is called every turn to ask for the moves for your anemones.
 *
 * Keep in mind, your script is run stateless,
 * so any variables declared outside of the function
 * will not persist until the next turn.
 *
 * @param  {Engine.State} state                  - The state of the game for this turn
 * @param  {int} playerNumber                    - Your player number
 * @param  {Object.<string, Anemone>} myAnemones - Your anemones. The key is the id of the anemone.
 *
 * @return {Object.<string, Engine.Move>}        - Your moves for this turn for all your anemone. The key is the id of your anemone
 */
function getMoves(state, playerNumber, myAnemones) {
	var moves = {};

	// Your code here
	
	return moves;
}

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
  * Each tile looks like such (the number represents the direction):
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

/**
 * @typedef {Object} Anemone
 * @description - An anemone
 *
 * @property {String} id - id of anemone
 * @property {int} health - Health of the anemone
 * @property {Number} playerNumber - the seat number this anemone belongs to
 * @property {Tuple.<int, int>} position - [x, y] position
 *
 * @example
 * {
 *     id : '123',
 *     health : 10,
 *     playerNumber : 0,
 *     position : [0, 0]
 * }
 */