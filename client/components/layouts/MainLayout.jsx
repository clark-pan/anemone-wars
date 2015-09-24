import React from 'react';
import _ from 'lodash';
import Promise from 'bluebird';

// Views
import BoardComponent from '/client/components/Board';
import Controls from '/client/components/Controls';
import mui from 'material-ui';

import * as Engine from '/shared/game/engine.js';
import Bot from '/client/bot/bot.js';

const ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

export default class MainLayout extends React.Component {
	constructor(props) {
		super(props);

		const
			players = _.times(6, (n) => {
				return {
					id: n.toString(),
					code: fetch('/shared/bots/beginner.js')
						.then((res) => res.text())
				};
			}),
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
		let playerCodes = await Promise.all(this.state.players.map((player) => player.code)),
			moves = await Promise
				.settle(
					this.state.players.map((player, i) => this.bot.getMoves(this.state.gameState, player, playerCodes[i]))
				).map((r) => r.isFulfilled() ? r.value() : {})
				.reduce((acc, moreMoves) => _.assign(acc, moreMoves));

		return Engine.resolve(this.state.gameState, moves);
	}

	render() {
		return (
			<div>
				<BoardComponent game={this.state.gameState} />
				<div className="overlay">
					<Controls
						onSpeedChange={this.onSpeedUpdate.bind(this)}
						onPlayStateChange={this.onPlayStateChange.bind(this)}
						isPlaying={this.state.simulationInfo.isPlaying}
						speed={this.state.simulationInfo.speed}
					/>
				</div>
			</div>
		);
	}
}

MainLayout.displayName = 'MainLayout';
MainLayout.childContextTypes = {
	muiTheme: React.PropTypes.object
};
