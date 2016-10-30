/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _AsyncUtils = require('./AsyncUtils');
  var _deprecateObjectProperties = require('./deprecateObjectProperties');
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  function getComponentsForRoute(nextState, route, callback) {
    if (route.component || route.components) {
      callback(null, route.component || route.components);
      return;
    }
    var getComponent = route.getComponent || route.getComponents;
    if (!getComponent) {
      callback();
      return;
    }
    var location = nextState.location;
    var nextStateWithLocation = undefined;
    if (process.env.NODE_ENV !== 'production' && _deprecateObjectProperties.canUseMembrane) {
      nextStateWithLocation = _extends({}, nextState);
      var _loop = function(prop) {
        if (!Object.prototype.hasOwnProperty.call(location, prop)) {
          return 'continue';
        }
        Object.defineProperty(nextStateWithLocation, prop, {get: function get() {
            process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'Accessing location properties from the first argument to `getComponent` and `getComponents` is deprecated. That argument is now the router state (`nextState`) rather than the location. To access the location, use `nextState.location`.') : undefined;
            return location[prop];
          }});
      };
      for (var prop in location) {
        var _ret = _loop(prop);
        if (_ret === 'continue')
          continue;
      }
    } else {
      nextStateWithLocation = _extends({}, nextState, location);
    }
    getComponent.call(route, nextStateWithLocation, callback);
  }
  function getComponents(nextState, callback) {
    _AsyncUtils.mapAsync(nextState.routes, function(route, index, callback) {
      getComponentsForRoute(nextState, route, callback);
    }, callback);
  }
  exports['default'] = getComponents;
  module.exports = exports['default'];
})(require('process'));
