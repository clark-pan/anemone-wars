import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';


import game from './game/GameReducer.js';
import gameRunner from './game/gameRunner.js';
import profiles from './profile/ProfileReducer.js';
import profileSummary from './profile-summary/ProfileSummaryReducer.js';

const store = createStore(
	combineReducers({
		game,
		profiles,
		profileSummary,
		routing: routerReducer
	}),
	compose(
		applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export const history = syncHistoryWithStore(browserHistory, store);

gameRunner(store);

export default store;
