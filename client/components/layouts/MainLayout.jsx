import React from 'react';
import _ from 'lodash';
import Promise from 'bluebird';

//Views
import BoardComponent from '/client/components/Board';
import Controls from '/client/components/Controls';
import mui from 'material-ui';

import Game from '/shared/game/engine.js';
import Board from '/shared/game/board.js';
import Player from '/shared/game/player.js';
import Bot from '/client/bot/bot.js';

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

export default class MainLayout extends React.Component {
	constructor(props){
		super(props);

		//checking if react working
		let board = new Board();
		let players = _.times(6, (n) => new Player(n));
		let game = new Game(board, players);
		game.setupGame();

		this.state = {
			board : board,
			players : players,
			game : game
		};

		let bots = null;
		Promise.all(_.map(players, (player) => {
			return Bot.createBot('/shared/bots/beginner.js');
		})).then(function(results){
			bots = new Map(_.zip(players, results));
			//test();
		});

		let test = () => {
			let inputs = [];
			for(let [player, bot] of bots.entries()){
				inputs.push(bot.getMoves(game.getPlayerState(player)));
			}
			Promise.settle(inputs).then((results) =>{
				let moves = _.chain(results)
					.map((x) => x.value())
					.flatten()
					.value();
				game.resolve(moves);
				this.setState({
					game : game
				});
				setTimeout(test, 0);
			});
		}
	}

	getChildContext(){
		return {
			muiTheme : ThemeManager.getCurrentTheme()
		};
	}

	render(){
		return (
			<div>
				<BoardComponent game={this.state.game} />
				<div className="overlay">
					<Controls />
				</div>
			</div>
		);
	}
}

MainLayout.childContextTypes = {
	muiTheme : React.PropTypes.object
}