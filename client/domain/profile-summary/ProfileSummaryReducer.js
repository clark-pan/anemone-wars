import { FETCH_PROFILE_SUMMARY_SUCCESS, SET_PROFILE_SUMMARY_SEARCH } from './ProfileSummaryActions.js';

function defaultState() {
	return {
		searchText: '',
		summaries: []
	};
}

export default function profileSummaryReducer(state = defaultState(), action) {
	switch (action.type) {
		case SET_PROFILE_SUMMARY_SEARCH:
			return {
				...state,
				searchText: action.searchText
			};
		case FETCH_PROFILE_SUMMARY_SUCCESS:
			if (action.searchText !== state.searchText) return state;
			return {
				...state,
				summaries: action.profiles
			};
		default: return state;
	}
}
