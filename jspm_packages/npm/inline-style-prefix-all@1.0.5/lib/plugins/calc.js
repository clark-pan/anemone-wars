/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = calc;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');
var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);
function calc(property, value) {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value, function(prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
module.exports = exports['default'];
