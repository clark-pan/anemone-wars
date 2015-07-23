import $ from 'jquery';

import Game from '../shared/game';
import Board from '../shared/board';
import Renderer from './renderer';

let board = new Board();
let game = new Game(board);

$(function(){
	let $canvas = $('#canvas');
	let renderer = new Renderer($canvas, game);

	function draw(){
		$canvas[0].width = Math.ceil(window.innerWidth);
		$canvas[0].height = Math.ceil(window.innerHeight);
		renderer.draw();
	}
	$(window).on('resize', draw);
	draw();
});