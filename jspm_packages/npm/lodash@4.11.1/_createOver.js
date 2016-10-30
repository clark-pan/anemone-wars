/* */ 
var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseFlatten = require('./_baseFlatten'),
    baseIteratee = require('./_baseIteratee'),
    baseUnary = require('./_baseUnary'),
    isArray = require('./isArray'),
    isFlattenableIteratee = require('./_isFlattenableIteratee'),
    rest = require('./rest');
function createOver(arrayFunc) {
  return rest(function(iteratees) {
    iteratees = (iteratees.length == 1 && isArray(iteratees[0])) ? arrayMap(iteratees[0], baseUnary(baseIteratee)) : arrayMap(baseFlatten(iteratees, 1, isFlattenableIteratee), baseUnary(baseIteratee));
    return rest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}
module.exports = createOver;
