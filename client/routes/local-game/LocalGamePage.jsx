import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './LocalGamePage.css!';

import { updateGamePlayback, newGame } from 'client/domain/game/GameActions.js';

import SpeedControls from 'client/components/SpeedControls/SpeedControls.jsx';
import PlayerControls from 'client/components/PlayerControls/PlayerControls.jsx';

const SPEED_OPTION_TEXT = {
	'slow': 'Slow',
	'fast': 'Fast',
	'faster': 'Faster'
};

@connect((state) => {
	return {
		game: state.game
	};
}, (dispatch) => {
	return {
		updateGamePlayback: (running, speed) => {
			dispatch(updateGamePlayback(running, speed));
		}
	};
})
export default class LocalGamePage extends Component {
	static displayName = 'LocalGamePage';
	static propTypes = {
		game: PropTypes.object.isRequired,
		updateGamePlayback: PropTypes.func.isRequired
	};

	static onEnter(store) {
		return store.dispatch(newGame());
	}

	onSpeedUpdate(speed) {
		this.props.updateGamePlayback(this.props.game.running, speed);
	}

	onPlayStateChange(running) {
		this.props.updateGamePlayback(running, this.props.game.speed);
	}

	render() {
		return (
			<div className="local-game">
				<SpeedControls
					onSpeedChange={ this.onSpeedUpdate.bind(this) }
					onPlayStateChange={ this.onPlayStateChange.bind(this) }
					isPlaying={ !!this.props.game.running }
					speedOptions={ SPEED_OPTION_TEXT }
					speedValue={ this.props.game.speed }
				/>
				<PlayerControls />
			</div>
		);
	}
}
