import { FETCH_PROFILE_SUCCESS } from './ProfileActions.js';

export default function profileReducer(state = {}, action) {
	switch (action.type) {
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				[action.profile.id]: action.profile
			};
		default: return state;
	}
}
