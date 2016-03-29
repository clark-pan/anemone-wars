import Promise from 'bluebird';

const _messages = Symbol('messages'), _worker = Symbol('worker'), _counter = Symbol('counter'),
	_workerError = Symbol('workerError'),
	_onMessage = Symbol('onMessage'), _onError = Symbol('onError'), _postMessage = Symbol('postMessage');

function defer() {
	var resolve, reject;
	var promise = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	return {
		resolve: resolve,
		reject: reject,
		promise: promise
	};
}

export class MoveService {
	constructor() {
		this[_messages] = new Map();
		this[_worker] = new Worker('/client/services/MoveServiceWorker.js');
		this[_worker].addEventListener('message', this[_onMessage].bind(this));
		this[_worker].addEventListener('error', this[_onError].bind(this));
		this[_workerError] = null;
		this[_counter] = 0;
	}

	getPlayerMoveAsync(state, playerId, playerCode) {
		return this[_postMessage]('getMoves', state, playerId, playerCode);
	}

	destroy() {
		if (this[_worker]) {
			this[_worker].terminate();
			delete this[_worker];
		}
	}

	[_postMessage](action, ...args) {
		if (this[_workerError]) return Promise.reject(this[_workerError]);

		const message = {
			id: this[_counter]++,
			deferred: defer()
		};
		this[_messages].set(message.id, message);
		this[_worker].postMessage([action, message.id].concat(args));

		return message.deferred.promise;
	}

	[_onMessage](e) {
		const [messageId, ret] = e.data,
			message = this[_messages].get(messageId);
		if (message) {
			message.deferred.resolve(ret);
			this[_messages].delete(messageId);
		}
	}

	[_onError]() {
		this[_workerError] = new Error('Unable to instantiate worker');
		this[_messages].forEach((message) => {
			message.deferred.reject(this[_workerError]);
		});
		this[_messages] = new Map();
	}
}

export default new MoveService();
