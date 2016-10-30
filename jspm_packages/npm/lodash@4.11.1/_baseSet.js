/* */ 
var assignValue = require('./_assignValue'),
    castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    isObject = require('./isObject');
function baseSet(object, path, value, customizer) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;
  while (nested != null && ++index < length) {
    var key = path[index];
    if (isObject(nested)) {
      var newValue = value;
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = objValue == null ? (isIndex(path[index + 1]) ? [] : {}) : objValue;
        }
      }
      assignValue(nested, key, newValue);
    }
    nested = nested[key];
  }
  return object;
}
module.exports = baseSet;
