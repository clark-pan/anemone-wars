import _ from 'lodash';

import React from 'react';
const { PropTypes, Component } = React;

import { IconButton, IconMenu, MenuItem, FlatButton, Paper } from 'material-ui';

import './SpeedControls.css!';

export default class SpeedControls extends Component {
	render() {
		const btnStyle = {
			height: this.context.muiTheme.baseTheme.spacing.iconSize * 2,
			verticalAlign: 'top'
		};


		let playOrPauseBtn;
		if (this.props.isPlaying) {
			playOrPauseBtn = <IconButton onTouchTap={ () => this.props.onPlayStateChange(false) } iconClassName="material-icons icon-size-m" style={ btnStyle }>pause_arrow</IconButton>;
		} else {
			playOrPauseBtn = <IconButton onTouchTap={ () => this.props.onPlayStateChange(true) } iconClassName="material-icons icon-size-m" style={ btnStyle }>play_arrow</IconButton>;
		}


		let speedOptions = _.map(this.props.speedOptions, (text, value) => {
			return <MenuItem primaryText={ text } value={ value } key={ value } />;
		});
		let speedBtnLabel = _.find(this.props.speedOptions, (text, value) => value === this.props.speedValue) || ' ';
		let speedBtn = <FlatButton label={ speedBtnLabel } style={ btnStyle } />;

		return (
			<Paper className="speed-controls">
				{ playOrPauseBtn }
				<IconMenu
					iconButtonElement={ speedBtn }
					value={ this.props.speedValue }
					onChange={ (e, value) => this.props.onSpeedChange(value) }
					anchorOrigin={ {horizontal: 'left', vertical: 'bottom'} }
					targetOrigin={ {horizontal: 'left', vertical: 'bottom'} }
				>
					{ speedOptions }
				</IconMenu>
			</Paper>
		);
	}
}

SpeedControls.displayName = 'SpeedControls';
SpeedControls.contextTypes = {
	muiTheme: PropTypes.object
};
SpeedControls.propTypes = {
	onSpeedChange: PropTypes.func.isRequired,
	onPlayStateChange: PropTypes.func.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	speedValue: PropTypes.string,
	speedOptions: PropTypes.objectOf(PropTypes.string)
};
SpeedControls.defaultProps = {
	onSpeedChange: () => {},
	onPlayStateChange: () => {}
};
