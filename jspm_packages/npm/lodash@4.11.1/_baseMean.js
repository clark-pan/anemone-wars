/* */ 
var baseSum = require('./_baseSum');
var NAN = 0 / 0;
function baseMean(array, iteratee) {
  var length = array ? array.length : 0;
  return length ? (baseSum(array, iteratee) / length) : NAN;
}
module.exports = baseMean;
