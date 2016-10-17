# bucket_emitter
it is a simple library to make an array of bulk data from data streaming. The data array will be emitted when time has expired or data has filled.
# Usage
```js
var bucket_emitter = require('bucket-emitter')
var bucket = bucket_emitter.create({
	timeout: 1000, //if there's no data input until timeout, emit data forcefully.
	maxSize: 10, //data emitted count
	useInterval: false //if this value is true, data event is emitted even If new data is pushed.
});

for (var i=0; i<1024; ++i) {
	setTimeout(function() {
		bucket.push(++i);
	}, 0);
}

bucket.on('data', function(fulfilled) {
  console.log(fulfilled);
}).on('error', function(err) {
  console.log(err);
});

process.on('beforeExit', function() {
  bucket.close(function(leftData) {
    console.log(leftData);
  });
});
