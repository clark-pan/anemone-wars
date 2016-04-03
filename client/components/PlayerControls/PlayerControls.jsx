import _ from 'lodash';

import React from 'react/addons';

import {
	Card, CardMedia, CardActions,
	FlatButton, FloatingActionButton, IconMenu,
	Avatar, Badge, FontIcon,
	MenuItem, SelectField, TextField
} from 'material-ui';

import CodeMirror from 'JedWatson/react-codemirror';
import PLAYER_COLOURS from '/client/constants/PlayerColours.js';

import './PlayerControls.css!';

const _renderControls = Symbol('renderControls');

export default class PlayerControls extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayerNumber: null
		};
	}

	onPlayerSelect(player) {
		this.setState({
			selectedPlayerNumber: this.state.selectedPlayerNumber === player.playerNumber ? null : player.playerNumber
		});
	}

	[_renderControls](selectedPlayer) {
		return _.map(this.props.players, (player, key) => {
			let isActive = player === selectedPlayer,
				colour = player.profile.colour || PLAYER_COLOURS[key],
				style = {
					display: 'block',
					marginBottom: '6px',
					transition: 'transform 200ms ease-out',
					transform: isActive ? 'translateX(-20px)' : 'translateX(0px)'
				},
				{ miniSize } = this.context.muiTheme.floatingActionButton,
				avatar = player.profile.avatar ?
					<Avatar style={{border: `solid 3px ${colour}`}} src={player.profile.avatar} size={miniSize} /> :
					<Avatar icon={<FontIcon className="material-icons">face</FontIcon>} color="white" backgroundColor={colour} size={miniSize} />;

			return (
				<FloatingActionButton backgroundColor="transparent" style={style} key={key} mini={true} onClick={this.onPlayerSelect.bind(this, player)}>
					{avatar}
				</FloatingActionButton>
			);
		});
	}

	render() {
		let controls, pane, menuItems, editorOptions, paneClassName, paneAvatarIconElement,
			selectedPlayer = this.state.selectedPlayerNumber != null ? this.props.players[this.state.selectedPlayerNumber] : null;

		controls = this[_renderControls](selectedPlayer);

		menuItems = [
			{ payload: '/shared/bots/empty.js', text: 'Empty'},
			{ payload: '/shared/bots/beginner.js', text: 'Beginner'},
			{ payload: 'custombot', text: 'Custom bot'}
		];

		editorOptions = {
			lineNumbers: true
		};

		// Using class name transition here instead of css transition group as the code editor inside the pane
		// Causes really bad initial jankiness when animating in
		if (selectedPlayer) {
			let selectedPlayerColour = selectedPlayer.profile.colour || PLAYER_COLOURS[this.state.selectedPlayerNumber],
				playerAvatar = selectedPlayer.profile.avatar ?
					<Avatar
						style={{ border: `solid 3px ${selectedPlayerColour}`}}
						src={selectedPlayer.profile.avatar}
						size={56}
					/> :
					<Avatar
						icon={<FontIcon className="material-icons">face</FontIcon>}
						color="white"
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
						>
							<MenuItem primaryText="Change Profile" />
							<MenuItem primaryText="Change Bot" />
						</IconMenu>
						<TextField
							fullWidth={true}
							floatingLabelText="Github account"
							hintText="Press enter to search"
							onEnterKeyDown={(e) => { this.props.onPlayerProfileUpdate(selectedPlayer, e.target.value); }}
						/>
					</div>
					<CardMedia>
						<CodeMirror options={editorOptions} />
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
	onPlayerProfileUpdate: React.PropTypes.func
};
PlayerControls.defaultProps = {
	onPlayerProfileUpdate: _.noop
};
PlayerControls.contextTypes = {
	muiTheme: React.PropTypes.object
};
