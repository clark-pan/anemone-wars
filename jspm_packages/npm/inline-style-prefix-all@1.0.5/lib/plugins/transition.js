/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = transition;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var _utilsCamelToDashCase = require('../utils/camelToDashCase');
var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);
var _utilsCapitalizeString = require('../utils/capitalizeString');
var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);
var _utilsUnprefixProperty = require('../utils/unprefixProperty');
var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);
var _prefixProps = require('../prefixProps');
var _prefixProps2 = _interopRequireDefault(_prefixProps);
var properties = {
  transition: true,
  transitionProperty: true
};
function transition(property, value) {
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ref2;
    var _ret = (function() {
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
      multipleValues.forEach(function(val, index) {
        multipleValues[index] = Object.keys(_prefixProps2['default']).reduce(function(out, prefix) {
          var dashCasePrefix = '-' + prefix.toLowerCase() + '-';
          Object.keys(_prefixProps2['default'][prefix]).forEach(function(prop) {
            var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(prop);
            if (val.indexOf(dashCaseProperty) > -1) {
              out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
            }
          });
          return out;
        }, val);
      });
      var outputValue = multipleValues.join(',');
      if (unprefixedProperty !== property) {
        return {v: _defineProperty({}, property, outputValue)};
      }
      return {v: (_ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _utilsCapitalizeString2['default'])(property), outputValue.split(',').filter(function(value) {
          return value.match(/-moz-|-ms-/) === null;
        }).join(',')), _defineProperty(_ref2, property, outputValue), _ref2)};
    })();
    if (typeof _ret === 'object')
      return _ret.v;
  }
}
module.exports = exports['default'];
