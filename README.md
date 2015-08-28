# bucket_emitter
# Usage
```js
var bucket_emitter = require('bucket-emitter')
var bucket = bucket_emitter.create({
	timeout: 1000, //if there's no data input until timeout, emit data forcefully.
	maxSize: 10, //data emitted count
	useInterval: false //if this value is true, data event is emitted even If new data is pushed.
});

bucket.on('data', function(fulfilled) {
  send(fulfilled);
}).on('error', function(err) {
  console.log(err);
});

process.on('beforeExit', function() {
  bucket.close(function(leftData) {
    send(leftData);
  });
});
```
