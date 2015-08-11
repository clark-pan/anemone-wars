import $ from 'jquery';
import _ from 'lodash';
import Promise from 'bluebird';

import Game from '../shared/game/engine';
import Board from '../shared/game/board';
import Player from '../shared/game/player';
import Renderer from './renderer';
import Bot from './bot/bot.js';

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

	var bots = null;
	Promise.all(_.map(players, (player) => {
		return Bot.createBot('/shared/bots/empty.js');
	})).then(function(results){
		bots = new Map(_.zip(players, results));
		test();
	});

	function draw(){
		$canvas[0].width = Math.ceil(window.innerWidth);
		$canvas[0].height = Math.ceil(window.innerHeight);
		renderer.draw();
	}
	$(window).on('resize', draw);

	function test(){
		let inputs = [];
		for(let [player, bot] of bots.entries()){
			inputs.push(bot.getMoves(game.getPlayerState(player)));
		}
		Promise.settle(inputs).then(function(results){
			let moves = _.chain(results)
				.map((x) => x.value())
				.flatten()
				.value();
			game.resolve(moves);
			renderer.draw();
			setTimeout(test, 0);
		});
	}

	draw();
});