/* */ 
var apply = require('./_apply'),
    isError = require('./isError'),
    rest = require('./rest');
var attempt = rest(function(func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});
module.exports = attempt;
