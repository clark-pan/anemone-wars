import React from 'react';
import ReactDOM from 'react-dom';

import 'codemirror/lib/codemirror.css!';

import MainLayout from '/client/components/layouts/MainLayout';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<MainLayout />, document.getElementById('app'));
