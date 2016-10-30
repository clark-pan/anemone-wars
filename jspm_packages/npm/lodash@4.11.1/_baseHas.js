/* */ 
var getPrototype = require('./_getPrototype');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseHas(object, key) {
  return hasOwnProperty.call(object, key) || (typeof object == 'object' && key in object && getPrototype(object) === null);
}
module.exports = baseHas;
