/* */ 
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  var type = typeof value;
  if (type == 'number' || type == 'symbol') {
    return true;
  }
  return !isArray(value) && (isSymbol(value) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object)));
}
module.exports = isKey;
