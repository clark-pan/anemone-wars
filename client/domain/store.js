import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import gameReducer from './game/GameReducer.js';

const store = createStore(
	combineReducers({
		game: gameReducer
	}),
	applyMiddleware(thunkMiddleware)
);

export default store;
