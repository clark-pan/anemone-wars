/* */ 
var baseFor = require('./_baseFor'),
    baseIteratee = require('./_baseIteratee'),
    keysIn = require('./keysIn');
function forIn(object, iteratee) {
  return object == null ? object : baseFor(object, baseIteratee(iteratee), keysIn);
}
module.exports = forIn;
