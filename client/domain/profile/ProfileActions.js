import GithubService from '/client/services/GithubService.js';

export const FETCH_PROFILE_SUCCESS = Symbol('FETCH_PROFILE_SUCCESS');
function fetchProfileSuccess(profile) {
	return {
		type: FETCH_PROFILE_SUCCESS,
		id: profile.id,
		profile: profile
	};
}

export const FETCH_PROFILE = Symbol('FETCH_PROFILE');
export function fetchProfile(profileId) {
	return async (dispatch) => {
		let profileData = await GithubService.getUserProfileAsync(profileId);
		dispatch(fetchProfileSuccess(profileData));
	};
}
