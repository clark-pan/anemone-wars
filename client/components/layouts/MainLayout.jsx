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

		const players = _.times(6, (n) => {
			return {
				id: n.toString()
			};
		}),
			gameState = Engine.getRandomInitialState(48, 20, _.keys(players));

		this.state = {
			gameState: gameState
		};

		let bots = null;
		Promise.all(_.map(players, () => {
			return Bot.createBot('/shared/bots/beginner.js');
		})).then((results) => {
			bots = new Map(_.zip(players, results));
			test();
		});

		let test = () => {
			let inputs = [];
			for(let [player, bot] of bots.entries()){
				inputs.push(bot.getMoves(this.state.gameState, player));
			}
			Promise.settle(inputs).then((results) =>{
				let moves = _.chain(results)
					.map(x => x.value())
					.value();

				moves = _.assign.apply(_, [{}].concat(moves));
				this.setState({
					gameState : Engine.resolve(this.state.gameState, moves)
				});
				setTimeout(test, 0);
			});
		}
	}

	getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	}

	render() {
		return (
			<div>
				<BoardComponent game={this.state.gameState} />
				<div className="overlay">
					{/*<Controls />*/}
				</div>
			</div>
		);
	}
}

MainLayout.displayName = 'MainLayout';
MainLayout.childContextTypes = {
	muiTheme: React.PropTypes.object
};
