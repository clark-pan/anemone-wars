/* */ 
var assignValue = require('./_assignValue');
function copyObject(source, props, object, customizer) {
  object || (object = {});
  var index = -1,
      length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
    assignValue(object, key, newValue);
  }
  return object;
}
module.exports = copyObject;
