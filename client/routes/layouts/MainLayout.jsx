import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// Views
import BoardComponent from 'client/components/Board/Board.jsx';

import './MainLayout.css!';

@connect((state) => {
	return {
		game: state.game,
		profiles: state.profiles
	};
})
export default class MainLayout extends Component {
	static displayName = 'MainLayout';
	static propTypes = {
		game: PropTypes.object.isRequired,
		profiles: PropTypes.object.isRequired,
		children: PropTypes.element
	};
	static childContextTypes = {
		muiTheme: PropTypes.object
	};
	getChildContext() {
		return {
			muiTheme: getMuiTheme(LightTheme)
		};
	}

	render() {
		return (
			<div>
				<div className="background-layer">
					<BoardComponent game={ this.props.game } profiles={ this.props.profiles } />
				</div>
				<div className="foreground-layer">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
