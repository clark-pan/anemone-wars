import _ from 'lodash';

import React from 'react';
const { PropTypes, Component } = React;

import { connect } from 'react-redux';
import { updateGamePlayback, SPEED_MAP, selectPlayerProfile } from '/client/domain/game/GameActions.js';
import { fetchProfile } from '/client/domain/profile/ProfileActions.js';

// Material UI
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import LightTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';

// Views
import BoardComponent from '/client/components/Board/Board';
import SpeedControls from '/client/components/SpeedControls/SpeedControls';
import PlayerControls from '/client/components/PlayerControls/PlayerControls';

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

	onPlayerProfileUpdate(player, value) {
		this.props.fetchProfile(value);
		this.props.selectPlayerProfile(player, value);
	}

	render() {
		return (
			<div>
				<BoardComponent game={this.props.game} />
				<div className="overlay">
					<SpeedControls
						onSpeedChange={this.onSpeedUpdate.bind(this)}
						onPlayStateChange={this.onPlayStateChange.bind(this)}
						isPlaying={this.props.game.running}
						speedOptions={SPEED_OPTION_TEXT}
						speedValue={this.props.game.speed}
					/>
					<PlayerControls
						players={this.props.game.players}
						onPlayerProfileUpdate={this.onPlayerProfileUpdate.bind(this)}
					/>
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
	updateGamePlayback: PropTypes.func.isRequired,
	selectPlayerProfile: PropTypes.func.isRequired,
	fetchProfile: PropTypes.func.isRequired
};

export default connect((state) => {
	return {
		game: state.game
	};
}, (dispatch) => {
	return {
		updateGamePlayback: (running, speed) => {
			dispatch(updateGamePlayback(running, speed));
		},
		selectPlayerProfile: (player, profileId) => {
			dispatch(selectPlayerProfile(player, profileId));
		},
		fetchProfile: (profileId) => {
			dispatch(fetchProfile(profileId));
		}
	};
})(MainPage);
