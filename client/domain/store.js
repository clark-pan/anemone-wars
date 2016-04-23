import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import gameReducer from './game/GameReducer.js';
import profileReducer from './profile/ProfileReducer.js';
import profileSummaryReducer from './profile-summary/ProfileSummaryReducer.js';

const store = createStore(
	combineReducers({
		game: gameReducer,
		profiles: profileReducer,
		profileSummary: profileSummaryReducer
	}),
	compose(
		applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default store;
