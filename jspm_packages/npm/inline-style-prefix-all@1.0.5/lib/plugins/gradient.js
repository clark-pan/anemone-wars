/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = gradient;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _utilsJoinPrefixedRules = require('../utils/joinPrefixedRules');
var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);
var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value) {
  if (typeof value === 'string' && value.match(values) !== null) {
    return (0, _utilsJoinPrefixedRules2['default'])(property, value);
  }
}
module.exports = exports['default'];
