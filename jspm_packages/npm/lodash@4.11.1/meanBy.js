/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseMean = require('./_baseMean');
function meanBy(array, iteratee) {
  return baseMean(array, baseIteratee(iteratee));
}
module.exports = meanBy;
