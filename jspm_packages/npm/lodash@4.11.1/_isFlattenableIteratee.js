/* */ 
var isArray = require('./isArray'),
    isFunction = require('./isFunction');
function isFlattenableIteratee(value) {
  return isArray(value) && !(value.length == 2 && !isFunction(value[0]));
}
module.exports = isFlattenableIteratee;
