import $ from 'jquery';

let _drawHex = Symbol('_drawHex');

const HEX_SIDE_SIZE = 25,
	HEX_WIDTH_RADIUS = HEX_SIDE_SIZE * Math.cos(60*Math.PI/180) + HEX_SIDE_SIZE * 0.5,
	HEX_HEIGHT_RADIUS = HEX_SIDE_SIZE * Math.sin(60*Math.PI/180),
	HALF_HEX_SIZE = HEX_SIDE_SIZE * 0.5;

export default class Renderer {
	constructor($canvas, game) {
		this.$canvas = $canvas;
		this.ctx = $canvas[0].getContext('2d');
		this.game = game;
	}

	draw() {
		for (let tile of this.game.board.tileIterator()){
			this[_drawHex](tile);
		}
	}
	[_drawHex](tile){
		let [x, y] = this.game.board.getTilePosition(tile),
			centerX = x * (HEX_SIDE_SIZE * 0.5 + HEX_WIDTH_RADIUS) + HEX_WIDTH_RADIUS,
			centerY = y * HEX_HEIGHT_RADIUS * 2 + HEX_HEIGHT_RADIUS * (x % 2 ? 2 : 1);

		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(centerX - HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX + HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX + HEX_WIDTH_RADIUS, centerY);
		this.ctx.lineTo(centerX + HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX - HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX - HEX_WIDTH_RADIUS, centerY);
		this.ctx.lineTo(centerX - HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.stroke();
		this.ctx.closePath();
	}
}