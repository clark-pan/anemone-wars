import Promise from 'bluebird';
import _ from 'lodash';
import Fuse from 'fuse';

const { atob, fetch } = self;

const _getUserAnemoneJSONAsync = Symbol('getUserAnemoneJSONAsync'),
	_getUserAsync = Symbol('getUserAsync'),
	_getAllUserProfilesAsync = Symbol('getAllUserProfilesAsync');

let _allProfilesStorePromise = null;

export class GithubService {
	async getUserProfileAsync(username) {
		let { user, anemoneJSON } = await Promise.props({
			user: this[_getUserAsync](username),
			anemoneJSON: this[_getUserAnemoneJSONAsync](username)
		});

		return {
			id: username,
			avatar: user.avatar_url,
			...anemoneJSON
		};
	}

	async getUserProfileBotCodeAsync(username, botPath) {
		let res = await fetch(`https://api.github.com/repos/${username}/anemone-bot/contents/${botPath}`);
		if (res.status === 200) {
			let json = await res.json();
			let code = atob(json.content);
			return code;
		}

		throw new Error('something went wrong');
	}

	async getAvailableUserProfilesAsync(searchTerm = '') {
		let store = await this[_getAllUserProfilesAsync]();
		return searchTerm ? store.search(searchTerm) : _.clone(store.list);
	}

	async [_getUserAnemoneJSONAsync](username) {
		let res = await fetch(`https://api.github.com/repos/${username}/anemone-bot/contents/anemone.json`);
		if (res.status === 200) {
			let json = await res.json();
			let anemoneJSON = JSON.parse(atob(json.content));
			return anemoneJSON;
		}

		throw new Error('something went wrong');
	}

	async [_getUserAsync](username) {
		let res = await fetch(`https://api.github.com/users/${username}`);
		if (res.status === 200) {
			let json = await res.json();
			return json;
		}

		throw new Error('something went wrong');
	}

	async [_getAllUserProfilesAsync]() {
		// TODO this is only going to work for top 100 repos, eventually this'll have to be crawled on the server

		if (_allProfilesStorePromise) return _allProfilesStorePromise;
		let res = await fetch(`https://api.github.com/search/repositories?per_page=100&sort=updated&q=anemone-bot+language:js+in:name`);
		if (res.status !== 200) throw new Error('something went wrong');
		let json = await res.json();
		let profiles = _.map(json.items, (item) => {
			return {
				id: item.owner.login,
				avatar: item.owner.avatar_url
			};
		});

		let store = new Fuse(profiles, {
			keys: ['id']
		});

		return (_allProfilesStorePromise = Promise.resolve(store));
	}
}

export default new GithubService();
