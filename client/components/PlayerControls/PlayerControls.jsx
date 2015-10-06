import _ from 'lodash';

import React from 'react/addons';

import {
	Card, CardMedia, CardActions,
	FlatButton, FloatingActionButton,
	Avatar,
	SelectField
} from 'material-ui';

import CodeMirror from 'JedWatson/react-codemirror';

import './PlayerControls.css!';

export default class PlayerControls extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: '/shared/bots/empty.js',
			selectedPlayer: null
		};
	}

	onPlayerSelect(player) {
		this.setState({
			selectedPlayer: this.state.selectedPlayer === player ? null : player
		});
	}

	render() {
		let controls, pane, menuItems, editorOptions, paneClassName, paneAvatarStyle;

		controls = _.map(this.props.players, (player, key) => {
			let isActive = player === this.state.selectedPlayer,
				style = {
					border: '3px solid ' + player.colour,
					display: 'block',
					marginBottom: '6px',
					transition: 'transform 200ms ease-out',
					transform: isActive ? 'translateX(-20px)' : 'translateX(0px)'
				},
				{ miniSize } = this.context.muiTheme.component.floatingActionButton;

			return (
				<FloatingActionButton style={style} key={key} mini={true} onClick={this.onPlayerSelect.bind(this, player)}>
					<img src={player.avatar} width={miniSize} height={miniSize} />
				</FloatingActionButton>
			);
		});

		menuItems = [
			{ payload: '/shared/bots/empty.js', text: 'Empty'},
			{ payload: '/shared/bots/beginner.js', text: 'Beginner'},
			{ payload: 'custombot', text: 'Custom bot'}
		];

		editorOptions = {
			lineNumbers: true
		};

		// We're using class name transition here instead of css transition group as the code editor inside the pane
		// Causes really bad initial jankiness when animating in
		if (this.state.selectedPlayer) {
			paneClassName = 'player-controls--editor-pane';
			paneAvatarStyle = {
				border: '3px solid ' + this.state.selectedPlayer.colour
			};
		} else {
			paneClassName = 'player-controls--editor-pane player-controls--editor-pane-hidden';
			paneAvatarStyle = {};
		}

		pane = (
			<div className={paneClassName} key="pane">
				<Card>
					<div className="player-controls--editor-header">
						<Avatar src={this.props.players[0].avatar} className="player-controls--editor-avatar" style={paneAvatarStyle} />
						<SelectField
							menuItems={menuItems}
							fullWidth={true}
							floatingLabelText="Select bot"
							value={this.state.selectedValue}
							onChange={(e, selectedIndex, menuItem) => this.setState({
								selectedValue: menuItem.payload
							})}
						/>
					</div>
					<CardMedia>
						<CodeMirror options={editorOptions} />
					</CardMedia>
					<CardActions>
						<FlatButton label="Close" />
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
	players: React.PropTypes.object.isRequired
};
PlayerControls.contextTypes = {
	muiTheme: React.PropTypes.object
};
