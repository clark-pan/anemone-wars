import React from 'react';
import ReactDOM from 'react-dom';

import mui from 'material-ui';
import CodeMirror from 'JedWatson/react-codemirror';

export default class Controls extends React.Component {
	render(){
		let options = {
			mode:  "javascript",
			lineNumbers: true
		};
		return (
			<div>
				
				<mui.Card className="controls">
					<mui.CardMedia className="controls-codecontainer">
						<CodeMirror options={options} />
					</mui.CardMedia>
					<mui.CardActions>
						<mui.FlatButton label="Update Bot" />
					</mui.CardActions>
				</mui.Card>
			</div>
		);
	}
}