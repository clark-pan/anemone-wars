import tinycolor from 'tinycolor';

import { MAX_HEALTH } from '/shared/game/anemone';

import PLAYER_COLOURS from '/client/constants/PlayerColours.js';

const _drawTile = Symbol('drawTile'),
	_drawHex = Symbol('drawHex'),
	_playerCounter = Symbol('playerCounter'),

	// Sizes and dimensions
	HEX_SIDE_SIZE = 20,
	HEX_WIDTH_RADIUS = HEX_SIDE_SIZE * Math.cos(60 * Math.PI / 180) + HEX_SIDE_SIZE * 0.5,
	HEX_HEIGHT_RADIUS = HEX_SIDE_SIZE * Math.sin(60 * Math.PI / 180),
	HALF_HEX_SIZE = HEX_SIDE_SIZE * 0.5;

export default class Renderer {
	constructor(drawingContext) {
		this.ctx = drawingContext;

		this[_playerCounter] = 0;
	}

	draw(game, profiles) {
		const state = game.gameState;
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (let x = 0; x < state.board.length; x++) {
			for (let y = 0; y < state.board[x].length; y++) {
				this[_drawTile](state.board[x][y], state, game.players, profiles);
			}
		}
	}

	[_drawTile](tile, state, players, profiles) {
		const x = tile.x, y = tile.y,
			centerX = x * (HEX_SIDE_SIZE * 0.5 + HEX_WIDTH_RADIUS) + HEX_WIDTH_RADIUS,
			centerY = y * HEX_HEIGHT_RADIUS * 2 + HEX_HEIGHT_RADIUS * (x % 2 ? 2 : 1),
			anemone = state.anemones[tile.occupantId],
			playerNumber = anemone ? anemone.playerNumber : null;

		let colour;
		if (players[playerNumber]) {
			let playerProfile = profiles[players[playerNumber].profileId];
			colour = playerProfile && playerProfile.colour || PLAYER_COLOURS[playerNumber];
		} else {
			colour = null;
		}

		let textColour = tinycolor(colour).isLight() ? '#000000' : '#ffffff';

		this[_drawHex](centerX, centerY, colour);
		this.ctx.save();
		this.ctx.font = '8px monospace';
		this.ctx.textAlign = 'right';
		this.ctx.textBaseline = 'bottom';
		this.ctx.fillStyle = textColour;
		this.ctx.fillText(x + ',' + y, centerX + HALF_HEX_SIZE, centerY + HEX_HEIGHT_RADIUS - 2);
		this.ctx.restore();
		if (anemone) {
			this.ctx.save();
			this.ctx.font = '8px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillStyle = textColour;
			this.ctx.fillText(anemone.health + '/' + MAX_HEALTH, centerX, centerY, HEX_WIDTH_RADIUS * 2);
			this.ctx.restore();
		}
	}

	[_drawHex](centerX, centerY, colour) {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		if (colour) {
			this.ctx.fillStyle = colour;
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
}
