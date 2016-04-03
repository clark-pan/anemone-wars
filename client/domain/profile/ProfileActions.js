import _ from 'lodash';
import Promise from 'bluebird';

export const FETCH_PROFILE = Symbol('FETCH_PROFILE');
export function fetchProfile(profileId) {
	return async function(dispatch) {
		dispatch(createProfile);
	};
}
