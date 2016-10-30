/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
var _inlineStylePrefixAll = require('inline-style-prefix-all');
var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);
var _utilsGetBrowserInformation = require('./utils/getBrowserInformation');
var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);
var _utilsGetPrefixedKeyframes = require('./utils/getPrefixedKeyframes');
var _utilsGetPrefixedKeyframes2 = _interopRequireDefault(_utilsGetPrefixedKeyframes);
var _utilsCapitalizeString = require('./utils/capitalizeString');
var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);
var _utilsAssign = require('./utils/assign');
var _utilsAssign2 = _interopRequireDefault(_utilsAssign);
var _prefixProps = require('./prefixProps');
var _prefixProps2 = _interopRequireDefault(_prefixProps);
var _pluginsCalc = require('./plugins/calc');
var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);
var _pluginsCursor = require('./plugins/cursor');
var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);
var _pluginsFlex = require('./plugins/flex');
var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);
var _pluginsSizing = require('./plugins/sizing');
var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);
var _pluginsGradient = require('./plugins/gradient');
var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);
var _pluginsTransition = require('./plugins/transition');
var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);
var _pluginsFlexboxIE = require('./plugins/flexboxIE');
var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);
var _pluginsFlexboxOld = require('./plugins/flexboxOld');
var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);
var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'], _pluginsFlex2['default']];
var Prefixer = (function() {
  function Prefixer() {
    var _this = this;
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, Prefixer);
    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;
    this._browserInfo = (0, _utilsGetBrowserInformation2['default'])(this._userAgent);
    if (this._browserInfo && this._browserInfo.prefix) {
      this.cssPrefix = this._browserInfo.prefix.css;
      this.jsPrefix = this._browserInfo.prefix.inline;
      this.prefixedKeyframes = (0, _utilsGetPrefixedKeyframes2['default'])(this._browserInfo);
    } else {
      this._usePrefixAllFallback = true;
      return false;
    }
    var data = this._browserInfo.browser && _prefixProps2['default'][this._browserInfo.browser];
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(function(key) {
        return data[key] >= _this._browserInfo.version;
      }).reduce(function(result, name) {
        result[name] = true;
        return result;
      }, {});
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      this._usePrefixAllFallback = true;
    }
  }
  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      var _this2 = this;
      if (this._usePrefixAllFallback) {
        return (0, _inlineStylePrefixAll2['default'])(styles);
      }
      if (!this._hasPropsRequiringPrefix) {
        return styles;
      }
      styles = (0, _utilsAssign2['default'])({}, styles);
      Object.keys(styles).forEach(function(property) {
        var value = styles[property];
        if (value instanceof Object) {
          styles[property] = _this2.prefix(value);
        } else {
          if (_this2._requiresPrefix[property]) {
            styles[_this2.jsPrefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
            if (!_this2._keepUnprefixed) {
              delete styles[property];
            }
          }
          plugins.forEach(function(plugin) {
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: _this2._browserInfo,
              prefix: {
                js: _this2.jsPrefix,
                css: _this2.cssPrefix,
                keyframes: _this2.prefixedKeyframes
              },
              keepUnprefixed: _this2._keepUnprefixed,
              requiresPrefix: _this2._requiresPrefix
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });
      return styles;
    }
  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      return (0, _inlineStylePrefixAll2['default'])(styles);
    }
  }]);
  return Prefixer;
})();
exports['default'] = Prefixer;
module.exports = exports['default'];
