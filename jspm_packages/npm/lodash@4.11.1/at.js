/* */ 
var baseAt = require('./_baseAt'),
    baseFlatten = require('./_baseFlatten'),
    rest = require('./rest');
var at = rest(function(object, paths) {
  return baseAt(object, baseFlatten(paths, 1));
});
module.exports = at;
