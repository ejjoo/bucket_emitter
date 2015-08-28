var events = require('events');

var bucket = [], 
	timeout = 0,
	maxSize = 0,
	timer = null,
	emitter = null,
	useInterval = false;

function set_timer() {
	if (timer) {
		clearTimeout(timer);
	}

	timer = setTimeout(function() {
		console.log('timeout')
		emit();
		set_timer();
	}, timeout);
}

function emit() {
	if (bucket.length == 0) {
		return;
	}
	emitter.emit('data', bucket.slice());
	bucket = [];
}

function check() {
	if (bucket.length >= maxSize) {
		emit();
		set_timer();
		return;
	}

	if (!useInterval)
		set_timer();
}

var bucket_external = {
	on: function(event, cb) {
		emitter.on(event, cb);
		return this;
	},
	push: function(data, cb) {
		if (data == null) {
			emitter.emit(new Error('data is empty'));
		}

		bucket.push(data);
		check();
	},
	close: function(cb) {
		clearTimeout(timer);
		if (cb && typeof cb == 'function') {
			cb(bucket.slice());
			bucket = [];
		}
	}
}

function create(opts) {
	bucket = [];
	timeout = opts.timeout || 10000,
	maxSize = opts.maxSize || 1000,
	useInterval = opts.useInterval || opts.use_interval || false,
	emitter = new events.EventEmitter();
	if (useInterval) {
		set_timer();
	}
	return bucket_external;
}

module.exports = {
	create: create
}