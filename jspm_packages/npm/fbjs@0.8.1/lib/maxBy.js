/* */ 
'use strict';
var minBy = require('./minBy');
var compareNumber = function(a, b) {
  return a - b;
};
function maxBy(as, f, compare) {
  compare = compare || compareNumber;
  return minBy(as, f, function(u, v) {
    return compare(v, u);
  });
}
module.exports = maxBy;
