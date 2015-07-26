import $ from 'jquery';
import _ from 'lodash';
import { MAX_HEALTH } from '../shared/anemone';

const _drawTile = Symbol('drawTile'),
	_drawHex = Symbol('drawHex'),
	_getPlayerStyleInfo = Symbol('getPlayerStyleInfo'),
	_playerCounter = Symbol('playerCounter'),
	_playerStyleInfo = Symbol('playerStyleInfo');

const
	//Sizes and dimensions
	HEX_SIDE_SIZE = 18,
	HEX_WIDTH_RADIUS = HEX_SIDE_SIZE * Math.cos(60*Math.PI/180) + HEX_SIDE_SIZE * 0.5,
	HEX_HEIGHT_RADIUS = HEX_SIDE_SIZE * Math.sin(60*Math.PI/180),
	HALF_HEX_SIZE = HEX_SIDE_SIZE * 0.5,
	//Colors and styling
	PLAYER_COLOURS = [
		'rgba(255, 0, 0, 1)', //red
		'rgba(0, 255, 0, 1)', //green
		'rgba(0, 0, 255, 1)', //blue
		'rgba(255, 255, 0, 1)', //yellow
		'rgba(255, 0, 255, 1)', //magenta
		'rgba(0, 255, 255, 1)' //teal
	];

export default class Renderer {
	constructor($canvas, game) {
		this.$canvas = $canvas;
		this.ctx = $canvas[0].getContext('2d');
		this.game = game;

		this[_playerCounter] = 0;
		this[_playerStyleInfo] = {};
	}

	draw() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (let tile of this.game.board.tiles()){
			this[_drawTile](tile);
		}
	}

	[_drawTile](tile){
		let [x, y] = this.game.board.getTilePosition(tile),
			centerX = x * (HEX_SIDE_SIZE * 0.5 + HEX_WIDTH_RADIUS) + HEX_WIDTH_RADIUS,
			centerY = y * HEX_HEIGHT_RADIUS * 2 + HEX_HEIGHT_RADIUS * (x % 2 ? 2 : 1),
			anemone = this.game.getTileOccupant(tile),
			player = this.game.getAnemoneOwner(anemone),
			styleInfo = player ? this[_getPlayerStyleInfo](player) : null;

		this[_drawHex](centerX, centerY, styleInfo);
		this.ctx.save();
		this.ctx.font = '8px monospace';
		this.ctx.textAlign = 'right';
		this.ctx.textBaseline = 'bottom';
		this.ctx.fillText(x + ',' + y, centerX + HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS - 2);
		this.ctx.restore();
		if(anemone){
			this.ctx.save();
			this.ctx.font = '8px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(anemone.health + '/' + MAX_HEALTH, centerX, centerY, HEX_WIDTH_RADIUS * 2);
			this.ctx.restore();
		}
	}

	[_drawHex](centerX, centerY, styleInfo){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		if(styleInfo){
			this.ctx.fillStyle = styleInfo.color;
		} else {
			this.ctx.fillStyle = 'rgba(0,0,0,0)';
		}
		this.ctx.moveTo(centerX - HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX + HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX + HEX_WIDTH_RADIUS, centerY);
		this.ctx.lineTo(centerX + HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX - HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS);
		this.ctx.lineTo(centerX - HEX_WIDTH_RADIUS, centerY);
		this.ctx.lineTo(centerX - HALF_HEX_SIZE, centerY - HEX_HEIGHT_RADIUS);
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
	}

	[_getPlayerStyleInfo](player){
		if(!this[_playerStyleInfo][player.id]){
			this[_playerStyleInfo][player.id] = {
				color : PLAYER_COLOURS[this[_playerCounter]++]
			}
		}
		return this[_playerStyleInfo][player.id];
	}
}