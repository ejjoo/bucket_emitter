var bucket_emitter = require('./bucket_emitter.js');

var bucket = bucket_emitter.create({
	timeout: 1000,
	maxSize: 10,
});

var idx = 0;
var proc = function() {
	setTimeout(function() {
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		bucket.push(idx++);
		proc();
	});

	bucket.on('data', function(data) {
		console.log(data);
	}).on('error', function(err) {
		console.log(err);
	});
	
}
proc();