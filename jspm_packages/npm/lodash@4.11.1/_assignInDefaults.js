/* */ 
var eq = require('./eq');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined || (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}
module.exports = assignInDefaults;
