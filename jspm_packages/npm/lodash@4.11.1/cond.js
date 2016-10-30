/* */ 
var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    rest = require('./rest');
var FUNC_ERROR_TEXT = 'Expected a function';
function cond(pairs) {
  var length = pairs ? pairs.length : 0,
      toIteratee = baseIteratee;
  pairs = !length ? [] : arrayMap(pairs, function(pair) {
    if (typeof pair[1] != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return [toIteratee(pair[0]), pair[1]];
  });
  return rest(function(args) {
    var index = -1;
    while (++index < length) {
      var pair = pairs[index];
      if (apply(pair[0], this, args)) {
        return apply(pair[1], this, args);
      }
    }
  });
}
module.exports = cond;
