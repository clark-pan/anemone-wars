import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import gameReducer from './game/GameReducer.js';
import profileReducer from './profile/ProfileReducer.js';

const store = createStore(
	combineReducers({
		game: gameReducer,
		profiles: profileReducer
	}),
	compose(
		applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default store;
