import _ from 'lodash';

import React from 'react/addons';
import tinycolor from 'tinycolor';
import { connect } from 'react-redux';
import { selectPlayerProfile, selectPlayerBot, fetchPlayerBotCode, selectPlayerCode } from 'client/domain/game/GameActions.js';
import { fetchProfile } from 'client/domain/profile/ProfileActions.js';
import { fetchProfileSummary } from 'client/domain/profile-summary/ProfileSummaryActions.js';

import {
	Card, CardMedia, CardActions,
	FlatButton, FloatingActionButton, IconMenu,
	Avatar, Badge, FontIcon,
	MenuItem, SelectField, AutoComplete
} from 'material-ui';

import CodeMirror from 'JedWatson/react-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import PLAYER_COLOURS from 'client/constants/PlayerColours.js';

import './PlayerControls.css!';
import 'codemirror/lib/codemirror.css!';

const _renderControls = Symbol('renderControls'),
	_selectedPlayer = Symbol('selectedPlayer'),
	_onPlayerSelect = Symbol('onPlayerSelect'),
	_onBotSelect = Symbol('onBotSelect'),
	_onCodeUpdate = Symbol('onCodeUpdate'),
	_onProfileFieldChange = Symbol('onProfileFieldChange'),
	_onRequestProfileSummary = Symbol('onRequestProfileSummary'),
	_debouncedOnRequestProfileSummary = Symbol('debouncedOnRequestProfileSummary'),
	_onAutocompleteFocus = Symbol('onAutocompleteFocus');

class PlayerControls extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayerNumber: null,
			avatarControlsViewState: null
		};

		this[_debouncedOnRequestProfileSummary] = _.debounce(this[_onRequestProfileSummary], 700);
		this[_onAutocompleteFocus] = _.once(this[_onRequestProfileSummary].bind(this, ''));
	}

	get [_selectedPlayer]() {
		return this.props.players[this.state.selectedPlayerNumber];
	}

	[_onPlayerSelect](player) {
		this.setState({
			selectedPlayerNumber: this.state.selectedPlayerNumber === player.playerNumber ? null : player.playerNumber,
			avatarControlsViewState: null
		});
	}

	[_onBotSelect](event, index, botPath) {
		if (this[_selectedPlayer]) {
			this.props.onPlayerBotUpdate(this[_selectedPlayer], botPath);
		}
	}

	[_onCodeUpdate](code) {
		if (this[_selectedPlayer]) {
			this.props.onPlayerCodeUpdate(this[_selectedPlayer], code);
		}
	}

	[_onProfileFieldChange](chosenRequest) {
		let playerId;

		// Work around bug in material-ui library. https://github.com/callemall/material-ui/pull/4076
		if (typeof chosenRequest === 'object' && chosenRequest.text != null) {
			playerId = chosenRequest.text;
		} else {
			playerId = chosenRequest;
		}

		if (this[_selectedPlayer]) {
			this.props.onPlayerProfileIdChange(this[_selectedPlayer], playerId);
		}
	}

	async [_onRequestProfileSummary](searchTerm) {
		this.props.onRequestProfileSummary(searchTerm);
	}

	[_renderControls](selectedPlayer) {
		return _.map(this.props.players, (player, key) => {
			let isActive = player === selectedPlayer,
				playerProfile = this.props.profiles[player.profileId],
				colour = playerProfile && playerProfile.colour || PLAYER_COLOURS[key],
				{ miniSize } = this.context.muiTheme.floatingActionButton,
				avatar = playerProfile && playerProfile.avatar ?
					<Avatar src={playerProfile.avatar} size={miniSize} style={{display: 'block'}} /> :
					<Avatar icon={<FontIcon className="material-icons">face</FontIcon>} color={tinycolor(colour).isLight() ? 'black' : 'white'} backgroundColor="transparent" size={miniSize} />,
				style = {
					display: 'block',
					marginBottom: '6px',
					transition: 'transform 200ms ease-out',
					border: `solid 3px ${colour}`,
					transform: isActive ? 'translateX(-20px)' : 'translateX(0px)'
				};

			return (
				<FloatingActionButton backgroundColor={colour} style={style} key={key} mini={true} onClick={this[_onPlayerSelect].bind(this, player)}>
					{avatar}
				</FloatingActionButton>
			);
		});
	}

	render() {
		let controls, pane, paneClassName, paneAvatarIconElement,
			selectedPlayer = this.state.selectedPlayerNumber != null ? this.props.players[this.state.selectedPlayerNumber] : null,
			selectedProfile = selectedPlayer ? this.props.profiles[selectedPlayer.profileId] : null,
			selectedPlayerCode = selectedPlayer ? selectedPlayer.code : '',
			avatarControlsComponent, avatarControlsViewState;

		controls = this[_renderControls](selectedPlayer);

		// Using class name transition here instead of css transition group as the code editor inside the pane
		// Causes really bad initial jankiness when animating in
		if (selectedPlayer) {
			let selectedPlayerColour = selectedProfile && selectedProfile.colour || PLAYER_COLOURS[this.state.selectedPlayerNumber],
				playerAvatar = selectedProfile && selectedProfile.avatar ?
					<Avatar
						style={{ border: `solid 3px ${selectedPlayerColour}`, display: 'block'}}
						src={selectedProfile.avatar}
						size={58}
					/> :
					<Avatar
						style={{ border: `solid 3px ${selectedPlayerColour}`}}
						icon={<FontIcon className="material-icons">face</FontIcon>}
						color={tinycolor(selectedPlayerColour).isLight() ? 'black' : 'white'}
						backgroundColor={selectedPlayerColour}
						size={56}
					/>;

			paneClassName = 'player-controls--editor-pane';
			paneAvatarIconElement = (
				<Badge
					style={{ padding: '0', cursor: 'pointer' }}
					badgeStyle={{ top: 'auto', right: 'auto', left: '0px', 'bottom': '0px', 'transform': 'translate(-20%, 20%)' }}
					badgeContent={<FontIcon className="material-icons icon-size-xs" style={{ pointerEvents: 'none' }}>mode_edit</FontIcon>}
				>
					{playerAvatar}
				</Badge>
			);

			avatarControlsViewState = this.state.avatarControlsViewState;
			if (!avatarControlsViewState) {
				avatarControlsViewState = selectedProfile ? 'select-bot' : 'select-profile';
			}

			if (selectedPlayer && selectedProfile && avatarControlsViewState === 'select-bot') {
				avatarControlsComponent = (
					<SelectField
						fullWidth={true}
						floatingLabelText="Bot"
						hintText="Select a bot"
						style={{ overflow: 'hidden' }}
						value={selectedPlayer.botPath}
						onChange={this[_onBotSelect].bind(this)}
					>
						{
							_.map(selectedProfile.bots, (bot) => <MenuItem key={bot.name} value={bot.path} primaryText={bot.name} />)
						}
					</SelectField>
				);
			} else {
				let dataSource = _.map(this.props.profileSummary.summaries, (summary) => {
					return {
						text: summary.id,
						value: (
							<MenuItem
								primaryText={summary.id}
								leftIcon={<Avatar src={summary.avatar} />}
							/>
						)
					};
				});
				avatarControlsComponent = (
					<AutoComplete
						fullWidth={true}
						floatingLabelText="Github account"
						hintText="Choose a user or press enter to select"
						openOnFocus={true}
						filter={_.constant(true)}
						maxSearchResults={10}
						dataSource={dataSource}
						onFocus={this[_onAutocompleteFocus]}
						onNewRequest={this[_onProfileFieldChange].bind(this)}
						onUpdateInput={this[_debouncedOnRequestProfileSummary].bind(this)}
					/>
				);
			}
		} else {
			paneClassName = 'player-controls--editor-pane player-controls--editor-pane-hidden';
			paneAvatarIconElement = (<div />);
		}

		pane = (
			<div className={paneClassName} key="pane">
				<Card>
					<div className="player-controls--editor-header">
						<IconMenu
							className="player-controls--editor-avatar"
							style={{ position: 'absolute'}}
							anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'left' }}
							iconButtonElement={paneAvatarIconElement}
							value={avatarControlsViewState}
							onChange={(event, value) => { this.setState({ avatarControlsViewState: value }); }}
						>
							<MenuItem primaryText="Change Profile" value="select-profile" />
							<MenuItem primaryText="Change Bot" value="select-bot" disabled={!selectedProfile} />
						</IconMenu>
						{avatarControlsComponent}
					</div>
					<CardMedia>
						<CodeMirror
							options={{
								lineNumbers: true,
								mode: 'javascript'
							}}
							onChange={this[_onCodeUpdate].bind(this)}
							value={selectedPlayerCode}
						/>
					</CardMedia>
					<CardActions>
						<FlatButton label="Close" onClick={() => this.setState({selectedPlayerNumber: null})} />
					</CardActions>
				</Card>
			</div>
		);

		return (
			<div className="player-controls">
				<div className="player-controls--list">
					{controls}
				</div>
				{pane}
			</div>
		);
	}
}

PlayerControls.displayName = 'PlayerControls';
PlayerControls.propTypes = {
	players: React.PropTypes.array.isRequired,
	profiles: React.PropTypes.object.isRequired,
	profileSummary: React.PropTypes.object.isRequired,
	onPlayerProfileIdChange: React.PropTypes.func.isRequired,
	onPlayerBotUpdate: React.PropTypes.func.isRequired,
	onPlayerCodeUpdate: React.PropTypes.func.isRequired,
	onRequestProfileSummary: React.PropTypes.func.isRequired

};
PlayerControls.contextTypes = {
	muiTheme: React.PropTypes.object
};

export default connect((state) => {
	return {
		players: state.game.players,
		profiles: state.profiles,
		profileSummary: state.profileSummary
	};
}, (dispatch) => {
	return {
		onPlayerProfileIdChange(player, profileId) {
			dispatch(fetchProfile(profileId));
			dispatch(selectPlayerProfile(player, profileId));
		},
		onPlayerBotUpdate(player, botPath) {
			dispatch(selectPlayerBot(player, botPath));
			dispatch(fetchPlayerBotCode(player, botPath));
		},
		onPlayerCodeUpdate: (player, code) => {
			dispatch(selectPlayerCode(player, code));
		},
		onRequestProfileSummary: (searchTerm) => {
			dispatch(fetchProfileSummary(searchTerm));
		}
	};
})(PlayerControls);
