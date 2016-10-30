/* */ 
var arrayMap = require('./_arrayMap'),
    baseIntersection = require('./_baseIntersection'),
    castArrayLikeObject = require('./_castArrayLikeObject'),
    rest = require('./rest');
var intersection = rest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped) : [];
});
module.exports = intersection;
