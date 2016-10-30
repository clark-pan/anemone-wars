/* */ 
var baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    rest = require('./rest');
var pick = rest(function(object, props) {
  return object == null ? {} : basePick(object, baseFlatten(props, 1));
});
module.exports = pick;
