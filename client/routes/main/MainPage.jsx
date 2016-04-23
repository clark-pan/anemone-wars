import _ from 'lodash';

import React from 'react';
const { PropTypes, Component } = React;

import { connect } from 'react-redux';
import { updateGamePlayback, SPEED_MAP } from 'client/domain/game/GameActions.js';

// Material UI
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import LightTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';

// Views
import BoardComponent from 'client/components/Board/Board.jsx';
import SpeedControls from 'client/components/SpeedControls/SpeedControls.jsx';
import PlayerControls from 'client/components/PlayerControls/PlayerControls.jsx';

const SPEED_OPTION_TEXT = {
	'slow': 'Slow',
	'fast': 'Fast',
	'faster': 'Faster'
};


class MainPage extends Component {
	constructor(props) {
		super(props);
	}

	getChildContext() {
		return {
			muiTheme: getMuiTheme(LightTheme)
		};
	}

	onSpeedUpdate(speed) {
		this.props.updateGamePlayback(this.props.game.running, speed);
	}

	onPlayStateChange(running) {
		this.props.updateGamePlayback(running, this.props.game.speed);
	}

	render() {
		return (
			<div>
				<BoardComponent game={this.props.game} profiles={this.props.profiles} />
				<div className="overlay">
					<SpeedControls
						onSpeedChange={this.onSpeedUpdate.bind(this)}
						onPlayStateChange={this.onPlayStateChange.bind(this)}
						isPlaying={this.props.game.running}
						speedOptions={SPEED_OPTION_TEXT}
						speedValue={this.props.game.speed}
					/>
					<PlayerControls />
				</div>
			</div>
		);
	}
}

MainPage.displayName = 'MainPage';
MainPage.childContextTypes = {
	muiTheme: PropTypes.object
};
MainPage.propTypes = {
	game: PropTypes.shape({
		gameState: PropTypes.object,
		players: PropTypes.arrayOf(PropTypes.object),
		running: PropTypes.bool,
		speed: PropTypes.oneOf(_.keys(SPEED_MAP))
	}).isRequired,
	profiles: PropTypes.object.isRequired,
	updateGamePlayback: PropTypes.func.isRequired
};

export default connect((state) => {
	return {
		game: state.game,
		profiles: state.profiles
	};
}, (dispatch) => {
	return {
		updateGamePlayback: (running, speed) => {
			dispatch(updateGamePlayback(running, speed));
		}
	};
})(MainPage);
