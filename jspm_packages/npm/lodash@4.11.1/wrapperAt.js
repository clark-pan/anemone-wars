/* */ 
var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    baseAt = require('./_baseAt'),
    baseFlatten = require('./_baseFlatten'),
    isIndex = require('./_isIndex'),
    rest = require('./rest'),
    thru = require('./thru');
var wrapperAt = rest(function(paths) {
  paths = baseFlatten(paths, 1);
  var length = paths.length,
      start = length ? paths[0] : 0,
      value = this.__wrapped__,
      interceptor = function(object) {
        return baseAt(object, paths);
      };
  if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
    return this.thru(interceptor);
  }
  value = value.slice(start, +start + (length ? 1 : 0));
  value.__actions__.push({
    'func': thru,
    'args': [interceptor],
    'thisArg': undefined
  });
  return new LodashWrapper(value, this.__chain__).thru(function(array) {
    if (length && !array.length) {
      array.push(undefined);
    }
    return array;
  });
});
module.exports = wrapperAt;
