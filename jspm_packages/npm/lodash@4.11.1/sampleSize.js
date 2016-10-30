/* */ 
var baseClamp = require('./_baseClamp'),
    baseRandom = require('./_baseRandom'),
    isIterateeCall = require('./_isIterateeCall'),
    toArray = require('./toArray'),
    toInteger = require('./toInteger');
function sampleSize(collection, n, guard) {
  var index = -1,
      result = toArray(collection),
      length = result.length,
      lastIndex = length - 1;
  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = baseClamp(toInteger(n), 0, length);
  }
  while (++index < n) {
    var rand = baseRandom(index, lastIndex),
        value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  result.length = n;
  return result;
}
module.exports = sampleSize;
