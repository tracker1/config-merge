var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));

module.exports = { sizeOf };