/* */ 
var getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike'),
    isString = require('./isString'),
    keys = require('./keys'),
    stringSize = require('./_stringSize');
var mapTag = '[object Map]',
    setTag = '[object Set]';
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike(collection)) {
    var result = collection.length;
    return (result && isString(collection)) ? stringSize(collection) : result;
  }
  if (isObjectLike(collection)) {
    var tag = getTag(collection);
    if (tag == mapTag || tag == setTag) {
      return collection.size;
    }
  }
  return keys(collection).length;
}
module.exports = size;
