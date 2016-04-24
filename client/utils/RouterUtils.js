import Promise from 'bluebird';

export function wrapOnEnter(store, func) {
	return (nextState, replace, callback) => {
		return Promise
			.resolve(func(store, nextState, replace))
			.then(() => callback(), (err) => callback(err));
	}
}