/* */ 
var baseValues = require('./_baseValues'),
    keys = require('./keys');
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}
module.exports = values;
