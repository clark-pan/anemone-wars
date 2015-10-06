import React from 'react';
import _ from 'lodash';
import Promise from 'bluebird';

// Views
import BoardComponent from '/client/components/Board/Board';
import SpeedControls from '/client/components/SpeedControls/SpeedControls';
import PlayerControls from '/client/components/PlayerControls/PlayerControls';
import mui from 'material-ui';

import * as Engine from '/shared/game/engine.js';
import Bot from '/client/bot/bot.js';

const ThemeManager = new mui.Styles.ThemeManager(),
	PLAYER_COLOURS = [
		'rgba(255, 0, 0, 1)', // red
		'rgba(0, 255, 0, 1)', // green
		'rgba(0, 0, 255, 1)', // blue
		'rgba(255, 255, 0, 1)', // yellow
		'rgba(255, 0, 255, 1)', // magenta
		'rgba(0, 255, 255, 1)' // teal
	];

ThemeManager.setTheme(ThemeManager.types.LIGHT);

export default class MainPage extends React.Component {
	constructor(props) {
		super(props);

		const
			players = _.chain(6)
				.times((n) => {
					return {
						id: n.toString(),
						colour: PLAYER_COLOURS[n],
						avatar: 'https://avatars.githubusercontent.com/u/1161431?v=3&s=56',
						code: {}
					};
				})
				.indexBy('id')
				.value(),
			gameState = Engine.getRandomInitialState(48, 20, _.keys(players));

		this.state = {
			players: players,
			gameState: gameState,
			simulationInfo: {
				isPlaying: false,
				speed: '1'
			}
		};

		this.bot = Bot.createBot();
		this._hasTickQueued = false;
		this._delay = 1000;
	}

	getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	}

	onSpeedUpdate(speed) {
		let delay;
		switch (speed) {
			case '3' : delay = 100; break;
			case '2' : delay = 500; break;
			case '1' : default: delay = 1000; break;
		}
		this.setState(React.addons.update(this.state, {
			simulationInfo: {
				speed: {
					$set: speed
				}
			}
		}));
		this._delay = delay;
	}

	onPlayStateChange(isPlaying) {
		if (isPlaying !== this.state.simulationInfo.isPlaying) {
			this.setState(React.addons.update(this.state, {
				simulationInfo: {
					isPlaying: {
						$set: isPlaying
					}
				}
			}));

			if (isPlaying && !this._hasTickQueued) {
				this.nextTick();
			}
		}
	}

	async nextTick() {
		this._hasTickQueued = true;
		let nextState = await this.getNextState();
		this.setState({
			gameState: nextState
		});
		await Promise.delay(this._delay);
		this._hasTickQueued = false;
		if (this.state.simulationInfo.isPlaying) {
			this.nextTick();
		}
	}

	async getNextState() {
		let moves = await Promise
			.settle(
				_.map(this.state.players, (player) => this.bot.getMoves(this.state.gameState, player, player.code))
			)
			.map((r) => r.isFulfilled() ? r.value() : {})
			.reduce((acc, moreMoves) => _.assign(acc, moreMoves));

		return Engine.resolve(this.state.gameState, moves);
	}

	render() {
		return (
			<div>
				<BoardComponent game={this.state.gameState} players={this.state.players} />
				<div className="overlay">
					<SpeedControls
						onSpeedChange={this.onSpeedUpdate.bind(this)}
						onPlayStateChange={this.onPlayStateChange.bind(this)}
						isPlaying={this.state.simulationInfo.isPlaying}
						speed={this.state.simulationInfo.speed}
					/>
					<PlayerControls players={this.state.players} />
				</div>
			</div>
		);
	}
}

MainPage.displayName = 'MainPage';
MainPage.childContextTypes = {
	muiTheme: React.PropTypes.object
};
