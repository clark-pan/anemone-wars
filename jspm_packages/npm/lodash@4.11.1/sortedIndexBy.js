/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseSortedIndexBy = require('./_baseSortedIndexBy');
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee));
}
module.exports = sortedIndexBy;
