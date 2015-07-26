import $ from 'jquery';
import _ from 'lodash';

import Game from '../shared/game';
import Board from '../shared/board';
import Player from '../shared/player';
import Renderer from './renderer';

const NUM_PLAYERS = 6;

let board = new Board();
let players = _.times(NUM_PLAYERS, (n) => new Player(n));
let game = new Game(board, players);

// [attack, defend, split, regenerate]

//This generates a completely random set of probility tables for the bot
/*
let probabilityMatrix = _.chain(NUM_PLAYERS - 1)
	.times(() => _.times(4, Math.random))
	.map((m) => {
		let total = _.sum(m);
		return _.reduce(m, (acc, n, i) => {
			let prev = acc[i - 1] || 0;
			acc[i] = prev + n/total;
			return acc;
		}, []);
	})
	.value();

probabilityMatrix.unshift([0.5, 0.5, 0, 0]);
*/
let probabilityMatrix = [
	[1, 0, 0, 0], //red
	[0.5, 0.5, 0, 0], //green
	[0.25, 0.25, 0.25, 0.25], //blue
	[0, 0.5, 0, 0.5], //yellow
	[0, 0, 0.5, 0.5], //magenta
	[0, 0, 0, 1] //teal
];

console.table(probabilityMatrix);

game.setupGame();

$(function(){
	let $canvas = $('#canvas');
	let renderer = new Renderer($canvas, game);
	let rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || setTimeout;
	//rAF = _.partialRight(setTimeout, 100);

	function draw(){
		$canvas[0].width = Math.ceil(window.innerWidth);
		$canvas[0].height = Math.ceil(window.innerHeight);
		renderer.draw();
	}
	$(window).on('resize', draw);

	function test(){
		let moves = [];
		_.each(players, function(player, i){
			let anemones = game.getPlayerAnemones(player);
			for(let anemone of anemones){
				let neighbours = game.getAnemoneNeighbours(anemone);
				let enemyNeighbourIndex = _.findIndex(neighbours, (enemy) => enemy && game.getAnemoneOwner(enemy) !== player);
				if(enemyNeighbourIndex != -1){
					let matrix = probabilityMatrix[i];
					let dice = Math.random();
					let index = _.findIndex(matrix, (n) => n > dice);
					switch(index){
						case 0: //Attack
							moves.push({
								id : game.getAnemoneId(anemone),
								action : 'attack',
								direction : enemyNeighbourIndex
							});
						break;
						case 1: //Defend
							moves.push({
								id : game.getAnemoneId(anemone),
								action : 'defend'
							});
						break;
						case 2: //Split
							moves.push({
								id : game.getAnemoneId(anemone),
								action : 'split',
								direction : enemyNeighbourIndex
							});
						break;
						case 3: //Regen
						default:
							moves.push({
								id : game.getAnemoneId(anemone),
								action : 'regenerate'
							});
					}
				} else {
					let emptyDirection = _.findIndex(neighbours, (potential) => !potential);
					if(emptyDirection != -1 && anemone.health > 1){
						moves.push({
							id : game.getAnemoneId(anemone),
							action : 'split',
							direction : emptyDirection
						});
					} else {
						moves.push({
							id : game.getAnemoneId(anemone),
							action : 'regenerate'
						});
					}
				}
			}
		});

		game.resolve(moves);
		renderer.draw();
		rAF(test);
	};

	rAF(test);

	draw();
});