import _ from 'lodash';

import React from 'react/addons';
import tinycolor from 'tinycolor';

import {
	Card, CardMedia, CardActions,
	FlatButton, FloatingActionButton, IconMenu,
	Avatar, Badge, FontIcon,
	MenuItem, SelectField, TextField
} from 'material-ui';

import CodeMirror from 'JedWatson/react-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import PLAYER_COLOURS from '/client/constants/PlayerColours.js';

import './PlayerControls.css!';
import 'codemirror/lib/codemirror.css!';

const _renderControls = Symbol('renderControls'),
	_selectedPlayer = Symbol('selectedPlayer'),
	_onPlayerSelect = Symbol('onPlayerSelect'),
	_onBotSelect = Symbol('onBotSelect'),
	_onCodeUpdate = Symbol('onCodeUpdate'),
	_onProfileFieldChange = Symbol('onProfileFieldChange'),
	_onProfileFieldKeyDown = Symbol('onProfileFieldKeyDown'),
	_onProfileFieldEnterKey = Symbol('onProfileFieldEnterKey');

export default class PlayerControls extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayerNumber: null,
			avatarControlsViewState: null
		};
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

	[_onProfileFieldKeyDown](event) {
		switch (event.which) {
			case 13: // Enter
				this[_onProfileFieldEnterKey](event);
				break;
			default: // Deliberately empty
		}
	}

	[_onProfileFieldChange](event, value) {
		if (this[_selectedPlayer]) {
			this.props.onPlayerProfileIdChange(this[_selectedPlayer], value);
		}
	}

	[_onProfileFieldEnterKey](event) {
		event.preventDefault();
		this.props.onRequestUpdateProfile(event.target.value);
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
						floatingLabelText="Select bot"
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
				avatarControlsComponent = (
					<TextField
						fullWidth={true}
						floatingLabelText="Select github account"
						hintText="Press enter to search"
						value={selectedPlayer.profileId}
						onChange={this[_onProfileFieldChange].bind(this)}
						onKeyDown={this[_onProfileFieldKeyDown].bind(this)}
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
	onRequestUpdateProfile: React.PropTypes.func,
	onPlayerProfileIdChange: React.PropTypes.func,
	onPlayerBotUpdate: React.PropTypes.func,
	onPlayerCodeUpdate: React.PropTypes.func
};
PlayerControls.defaultProps = {
	onRequestUpdateProfile: _.noop,
	onPlayerProfileIdChange: _.noop,
	onPlayerBotUpdate: _.noop,
	onPlayerCodeUpdate: _.noop
};
PlayerControls.contextTypes = {
	muiTheme: React.PropTypes.object
};
