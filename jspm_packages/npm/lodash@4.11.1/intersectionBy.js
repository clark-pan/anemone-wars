/* */ 
var arrayMap = require('./_arrayMap'),
    baseIntersection = require('./_baseIntersection'),
    baseIteratee = require('./_baseIteratee'),
    castArrayLikeObject = require('./_castArrayLikeObject'),
    last = require('./last'),
    rest = require('./rest');
var intersectionBy = rest(function(arrays) {
  var iteratee = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject);
  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped, baseIteratee(iteratee)) : [];
});
module.exports = intersectionBy;
