/* */ 
(function(process) {
  var funcToString = Function.prototype.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }
  module.exports = toSource;
})(require('process'));
