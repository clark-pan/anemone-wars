/* */ 
var isNative = require('./isNative');
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}
module.exports = getNative;
