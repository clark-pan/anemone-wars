import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import game from './game/GameReducer.js';
import gameRunner from './game/gameRunner.js';
import profiles from './profile/ProfileReducer.js';
import profileSummary from './profile-summary/ProfileSummaryReducer.js';

const store = createStore(
	combineReducers({
		game,
		profiles,
		profileSummary
	}),
	compose(
		applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

gameRunner(store);

export default store;
