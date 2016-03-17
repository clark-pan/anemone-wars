import React from 'react';

import mui from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';

import './SpeedControls.css!';

export default class SpeedControls extends React.Component {
	render() {
		const btnStyle = {
				height: this.context.muiTheme.baseTheme.spacing.iconSize * 2,
				verticalAlign: 'top'
			},
			speedBtn = <mui.FlatButton label={this.props.speed + 'x'} style={btnStyle}></mui.FlatButton>;
		let playOrPauseBtn;

		if (this.props.isPlaying) {
			playOrPauseBtn = <mui.IconButton onTouchTap={() => this.props.onPlayStateChange(false)} iconClassName="material-icons" style={btnStyle}>play_arrow</mui.IconButton>;
		} else {
			playOrPauseBtn = <mui.IconButton onTouchTap={() => this.props.onPlayStateChange(true)} iconClassName="material-icons" style={btnStyle}>pause_arrow</mui.IconButton>;
		}
		return (
			<mui.Paper className="speed-controls">
				{playOrPauseBtn}
				<mui.IconMenu iconButtonElement={speedBtn} openDirection="top-right" value={this.props.speed} onChange={(e, value) => this.props.onSpeedChange(value)}>
					<MenuItem primaryText="1x" value="1" />
					<MenuItem primaryText="2x" value="2" />
					<MenuItem primaryText="3x" value="3" />
				</mui.IconMenu>
			</mui.Paper>
		);
	}
}

SpeedControls.displayName = 'SpeedControls';
SpeedControls.contextTypes = {
	muiTheme: React.PropTypes.object
};
SpeedControls.propTypes = {
	onSpeedChange: React.PropTypes.func.isRequired,
	onPlayStateChange: React.PropTypes.func.isRequired,
	isPlaying: React.PropTypes.bool.isRequired,
	speed: React.PropTypes.oneOf(['1', '2', '3'])
};
SpeedControls.defaultProps = {
	onSpeedChange: () => {},
	onPlayStateChange: () => {}
};
