import _ from 'lodash';

import { SELECT_PLAYER_BOT } from './ProfileActions.js';

function createDefaultBots() {
	return [
		{ id: 'default-1', url: '/shared/bots/empty.js', code: null, text: 'Empty' },
		{ id: 'default-2', url: '/shared/bots/beginner.js', code: null, text: 'Beginner' },
		{ id: 'default-3', url: null, text: 'Custom bot', code: null }
	];
}

const DEFAULT_COLOURS = [
		'rgba(255, 0, 0, 1)', // red
		'rgba(0, 255, 0, 1)', // green
		'rgba(0, 0, 255, 1)', // blue
		'rgba(255, 255, 0, 1)', // yellow
		'rgba(255, 0, 255, 1)', // magenta
		'rgba(0, 255, 255, 1)' // teal
	],
	initialState = _.chain(6)
		.times((n) => {
			return {
				id: n.toString(),
				colour: DEFAULT_COLOURS[n],
				avatar: 'https://avatars.githubusercontent.com/u/1161431?v=3&s=56',
				defaultBots: createDefaultBots(),
				githubId: null,
				bots: null
			};
		})
		.value();

export default function playerReducer(state = initialState, action) {
	switch (action.type) {
		case SELECT_PLAYER_BOT:
			return state;
		default:
			return state;
	}
}
