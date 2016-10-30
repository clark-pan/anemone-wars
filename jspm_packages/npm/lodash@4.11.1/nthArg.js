/* */ 
var baseNth = require('./_baseNth'),
    rest = require('./rest'),
    toInteger = require('./toInteger');
function nthArg(n) {
  n = toInteger(n);
  return rest(function(args) {
    return baseNth(args, n);
  });
}
module.exports = nthArg;
