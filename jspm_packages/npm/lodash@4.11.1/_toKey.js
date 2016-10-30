/* */ 
var isSymbol = require('./isSymbol');
function toKey(key) {
  return (typeof key == 'string' || isSymbol(key)) ? key : (key + '');
}
module.exports = toKey;
