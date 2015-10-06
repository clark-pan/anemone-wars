import React from 'react';
import ReactDOM from 'react-dom';

import 'codemirror/lib/codemirror.css!';
import './index.css!';

import MainPage from '/client/routes/main/MainPage';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<MainPage />, document.getElementById('app'));
