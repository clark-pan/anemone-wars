/* */ 
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}
module.exports = castPath;
