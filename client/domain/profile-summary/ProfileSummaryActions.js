import GithubService from 'client/services/GithubService.js';

export const FETCH_PROFILE_SUMMARY_SUCCESS = Symbol('FETCH_PROFILE_SUMMARY_SUCCESS');
function fetchProfileSummarySuccess(searchText, profiles) {
	return {
		type: FETCH_PROFILE_SUMMARY_SUCCESS,
		searchText: searchText,
		profiles: profiles
	};
}

export const SET_PROFILE_SUMMARY_SEARCH = Symbol('SET_PROFILE_SUMMARY_SEARCH');
function setProfileSummarySearch(searchText) {
	return {
		type: SET_PROFILE_SUMMARY_SEARCH,
		searchText: searchText
	};
}

export function fetchProfileSummary(searchText) {
	return async (dispatch) => {
		dispatch(setProfileSummarySearch(searchText));
		let profiles = await GithubService.getAvailableUserProfilesAsync(searchText);
		dispatch(fetchProfileSummarySuccess(searchText, profiles));
	};
}
