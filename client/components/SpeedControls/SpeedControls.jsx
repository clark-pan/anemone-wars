import _ from 'lodash';

import React from 'react';
const { PropTypes, Component } = React;

import mui from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';

import './SpeedControls.css!';

export default class SpeedControls extends Component {
	render() {
		const btnStyle = {
			height: this.context.muiTheme.baseTheme.spacing.iconSize * 2,
			verticalAlign: 'top'
		};


		let playOrPauseBtn;
		if (this.props.isPlaying) {
			playOrPauseBtn = <mui.IconButton onTouchTap={() => this.props.onPlayStateChange(false)} iconClassName="material-icons icon-size-m" style={btnStyle}>play_arrow</mui.IconButton>;
		} else {
			playOrPauseBtn = <mui.IconButton onTouchTap={() => this.props.onPlayStateChange(true)} iconClassName="material-icons icon-size-m" style={btnStyle}>pause_arrow</mui.IconButton>;
		}


		let speedOptions = _.map(this.props.speedOptions, (text, value) => {
			return <MenuItem primaryText={text} value={value} key={value} />;
		});
		let speedBtnLabel = _.find(this.props.speedOptions, (text, value) => value === this.props.speedValue) || '';
		let speedBtn = <mui.FlatButton label={speedBtnLabel} style={btnStyle}></mui.FlatButton>;

		return (
			<mui.Paper className="speed-controls">
				{playOrPauseBtn}
				<mui.IconMenu iconButtonElement={speedBtn} openDirection="top-right" value={this.props.speedValue} onChange={(e, value) => this.props.onSpeedChange(value)}>
					{speedOptions}
				</mui.IconMenu>
			</mui.Paper>
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
