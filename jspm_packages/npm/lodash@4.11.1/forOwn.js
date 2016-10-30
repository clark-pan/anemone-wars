/* */ 
var baseForOwn = require('./_baseForOwn'),
    baseIteratee = require('./_baseIteratee');
function forOwn(object, iteratee) {
  return object && baseForOwn(object, baseIteratee(iteratee));
}
module.exports = forOwn;
