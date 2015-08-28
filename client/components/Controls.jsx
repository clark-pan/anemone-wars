import React from 'react';

import mui from 'material-ui';
import CodeMirror from 'JedWatson/react-codemirror';

export default class Controls extends React.Component {
	render() {
		return (
			<div>
				<mui.Card className="controls">
					<mui.CardMedia className="controls-codecontainer">
						<CodeMirror options={Controls.codeMirrorOptions} />
					</mui.CardMedia>
					<mui.CardActions>
						<mui.FlatButton label="Update Bot" />
					</mui.CardActions>
				</mui.Card>
			</div>
		);
	}
}

Controls.displayName = 'Controls';
Controls.codeMirrorOptions = {
	mode: 'javascript',
	lineNumbers: true
};
