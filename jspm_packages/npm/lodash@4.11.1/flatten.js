/* */ 
var baseFlatten = require('./_baseFlatten');
function flatten(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, 1) : [];
}
module.exports = flatten;
