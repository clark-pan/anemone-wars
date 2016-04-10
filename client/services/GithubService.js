import Promise from 'bluebird';

const { atob, fetch } = self;

const _getUserAnemoneJSONAsync = Symbol('getUserAnemoneJSON'),
	_getUserAsync = Symbol('getUserAsync');

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

	async getUserProfileBotCode(username, botPath) {
		let res = await fetch(`https://api.github.com/repos/${username}/anemone-bot/contents/${botPath}`);
		if (res.status === 200) {
			let json = await res.json();
			let code = atob(json.content);
			return code;
		}

		throw new Error('something went wrong');
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
}

export default new GithubService();
