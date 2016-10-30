/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseSortedIndexBy = require('./_baseSortedIndexBy');
function sortedLastIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee), true);
}
module.exports = sortedLastIndexBy;
