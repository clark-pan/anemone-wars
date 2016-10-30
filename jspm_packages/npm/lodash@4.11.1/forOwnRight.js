/* */ 
var baseForOwnRight = require('./_baseForOwnRight'),
    baseIteratee = require('./_baseIteratee');
function forOwnRight(object, iteratee) {
  return object && baseForOwnRight(object, baseIteratee(iteratee));
}
module.exports = forOwnRight;
