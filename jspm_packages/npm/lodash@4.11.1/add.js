/* */ 
var createMathOperation = require('./_createMathOperation');
var add = createMathOperation(function(augend, addend) {
  return augend + addend;
});
module.exports = add;
