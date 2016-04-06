import _ from 'lodash';

const { atob, fetch } = self;

export class GithubService {
	async getUserProfileAsync(username) {
		let res;

		res = await fetch(`https://api.github.com/repos/${username}/anemone-bot/contents/anemone.json`);
		if (res.status === 200) {
			let json = await res.json();
			return JSON.parse(atob(json.content));
		}

		throw new Error('something went wrong');
	}
}

export default new GithubService();
