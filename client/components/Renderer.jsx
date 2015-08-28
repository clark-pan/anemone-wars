import _ from 'lodash';
import { MAX_HEALTH } from '/shared/game/anemone';

const _drawTile = Symbol('drawTile'),
	_drawHex = Symbol('drawHex'),
	_getPlayerStyleInfo = Symbol('getPlayerStyleInfo'),
	_playerCounter = Symbol('playerCounter'),
	_playerStyleInfo = Symbol('playerStyleInfo'),

	// Sizes and dimensions
	HEX_SIDE_SIZE = 20,
	HEX_WIDTH_RADIUS = HEX_SIDE_SIZE * Math.cos(60 * Math.PI / 180) + HEX_SIDE_SIZE * 0.5,
	HEX_HEIGHT_RADIUS = HEX_SIDE_SIZE * Math.sin(60 * Math.PI / 180),
	HALF_HEX_SIZE = HEX_SIDE_SIZE * 0.5,
	// Colors and styling
	PLAYER_COLOURS = [
		'rgba(255, 0, 0, 1)', // red
		'rgba(0, 255, 0, 1)', // green
		'rgba(0, 0, 255, 1)', // blue
		'rgba(255, 255, 0, 1)', // yellow
		'rgba(255, 0, 255, 1)', // magenta
		'rgba(0, 255, 255, 1)' // teal
	];

export default class Renderer {
	constructor(drawingContext) {
		this.ctx = drawingContext;

		this[_playerCounter] = 0;
		this[_playerStyleInfo] = {};
	}

	draw(state) {
		console.log(Object.keys(state.anemones).length);
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (let x = 0; x < state.board.length; x++) {
			for (let y = 0; y < state.board[x].length; y++) {
				this[_drawTile](state.board[x][y], state);
			}
		}
	}

	[_drawTile](tile, state) {
		const x = tile.x, y = tile.y,
			centerX = x * (HEX_SIDE_SIZE * 0.5 + HEX_WIDTH_RADIUS) + HEX_WIDTH_RADIUS,
			centerY = y * HEX_HEIGHT_RADIUS * 2 + HEX_HEIGHT_RADIUS * (x % 2 ? 2 : 1),
			anemone = state.anemones[tile.occupantId],
			playerId = anemone ? anemone.ownerId : null,
			styleInfo = playerId ? this[_getPlayerStyleInfo](playerId) : null;

		this[_drawHex](centerX, centerY, styleInfo);
		this.ctx.save();
		this.ctx.font = '8px monospace';
		this.ctx.textAlign = 'right';
		this.ctx.textBaseline = 'bottom';
		this.ctx.fillText(x + ',' + y, centerX + HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS - 2);
		this.ctx.restore();
		if (anemone) {
			this.ctx.save();
			this.ctx.font = '8px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(anemone.health + '/' + MAX_HEALTH, centerX, centerY, HEX_WIDTH_RADIUS * 2);
			this.ctx.restore();
		}
	}

	[_drawHex](centerX, centerY, styleInfo) {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		if (styleInfo) {
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

	[_getPlayerStyleInfo](playerId) {
		if (!this[_playerStyleInfo][playerId]) {
			this[_playerStyleInfo][playerId] = {
				color: PLAYER_COLOURS[this[_playerCounter]++]
			};
		}
		return this[_playerStyleInfo][playerId];
	}
}
