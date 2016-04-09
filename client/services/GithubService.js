const { atob, fetch } = self;

export class GithubService {
	async getUserProfileAsync(username) {
		let res = await fetch(`https://api.github.com/repos/${username}/anemone-bot/contents/anemone.json`);
		if (res.status === 200) {
			let json = await res.json();
			let profile = JSON.parse(atob(json.content));
			profile.id = username;
			return profile;
		}

		throw new Error('something went wrong');
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
}

export default new GithubService();
