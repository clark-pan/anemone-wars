/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = flex;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _utilsCamelToDashCase = require('../utils/camelToDashCase');
var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);
var values = {
  'flex': true,
  'inline-flex': true
};
function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value].join(';' + (0, _utilsCamelToDashCase2['default'])(property) + ':')};
  }
}
module.exports = exports['default'];
