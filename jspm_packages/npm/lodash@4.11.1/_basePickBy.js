/* */ 
var getAllKeysIn = require('./_getAllKeysIn');
function basePickBy(object, predicate) {
  var index = -1,
      props = getAllKeysIn(object),
      length = props.length,
      result = {};
  while (++index < length) {
    var key = props[index],
        value = object[key];
    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}
module.exports = basePickBy;
