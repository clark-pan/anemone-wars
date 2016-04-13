import _ from 'lodash';

import React from 'react';
const { PropTypes, Component } = React;

import { connect } from 'react-redux';
import { updateGamePlayback, SPEED_MAP, selectPlayerProfile, selectPlayerBot, selectPlayerCode, fetchPlayerBotCode } from 'client/domain/game/GameActions.js';
import { fetchProfile } from 'client/domain/profile/ProfileActions.js';

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

	onRequestUpdateProfile(profileId) {
		this.props.fetchProfile(profileId);
	}

	onPlayerProfileIdChange(player, profileId) {
		this.props.selectPlayerProfile(player, profileId);
	}

	onPlayerBotUpdate(player, botPath) {
		this.props.selectPlayerBot(player, botPath);
		this.props.fetchPlayerBotCode(player, botPath);
	}

	onPlayerCodeUpdate(player, code) {
		this.props.selectPlayerCode(player, code);
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
					<PlayerControls
						players={this.props.game.players}
						profiles={this.props.profiles}
						onRequestUpdateProfile={this.onRequestUpdateProfile.bind(this)}
						onPlayerProfileIdChange={this.onPlayerProfileIdChange.bind(this)}
						onPlayerBotUpdate={this.onPlayerBotUpdate.bind(this)}
						onPlayerCodeUpdate={this.onPlayerCodeUpdate.bind(this)}
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
	profiles: PropTypes.object.isRequired,
	updateGamePlayback: PropTypes.func.isRequired,
	selectPlayerProfile: PropTypes.func.isRequired,
	selectPlayerBot: PropTypes.func.isRequired,
	fetchProfile: PropTypes.func.isRequired,
	fetchPlayerBotCode: PropTypes.func.isRequired
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
		},
		selectPlayerProfile: (player, profileId) => {
			dispatch(selectPlayerProfile(player, profileId));
		},
		selectPlayerBot: (player, botPath) => {
			dispatch(selectPlayerBot(player, botPath));
		},
		selectPlayerCode: (player, code) => {
			dispatch(selectPlayerCode(player, code));
		},
		fetchProfile: (profileId) => {
			dispatch(fetchProfile(profileId));
		},
		fetchPlayerBotCode: (player, botPath) => {
			dispatch(fetchPlayerBotCode(player, botPath));
		}
	};
})(MainPage);
