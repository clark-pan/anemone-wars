/* */ 
var createMathOperation = require('./_createMathOperation');
var subtract = createMathOperation(function(minuend, subtrahend) {
  return minuend - subtrahend;
});
module.exports = subtract;
