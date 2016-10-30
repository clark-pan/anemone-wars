/* */ 
var arrayConcat = require('./_arrayConcat'),
    baseFlatten = require('./_baseFlatten'),
    castArray = require('./castArray'),
    copyArray = require('./_copyArray');
function concat() {
  var length = arguments.length,
      array = castArray(arguments[0]);
  if (length < 2) {
    return length ? copyArray(array) : [];
  }
  var args = Array(length - 1);
  while (length--) {
    args[length - 1] = arguments[length];
  }
  return arrayConcat(array, baseFlatten(args, 1));
}
module.exports = concat;
