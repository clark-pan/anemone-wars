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
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _invariant = require('invariant');
  var _invariant2 = _interopRequireDefault(_invariant);
  var _createMemoryHistory = require('./createMemoryHistory');
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  var _createTransitionManager = require('./createTransitionManager');
  var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
  var _RouteUtils = require('./RouteUtils');
  var _RouterUtils = require('./RouterUtils');
  function match(_ref, callback) {
    var history = _ref.history;
    var routes = _ref.routes;
    var location = _ref.location;
    var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);
    !(history || location) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'match needs a history or a location') : _invariant2['default'](false) : undefined;
    history = history ? history : _createMemoryHistory2['default'](options);
    var transitionManager = _createTransitionManager2['default'](history, _RouteUtils.createRoutes(routes));
    var unlisten = undefined;
    if (location) {
      location = history.createLocation(location);
    } else {
      unlisten = history.listen(function(historyLocation) {
        location = historyLocation;
      });
    }
    var router = _RouterUtils.createRouterObject(history, transitionManager);
    history = _RouterUtils.createRoutingHistory(history, transitionManager);
    transitionManager.match(location, function(error, redirectLocation, nextState) {
      callback(error, redirectLocation, nextState && _extends({}, nextState, {
        history: history,
        router: router,
        matchContext: {
          history: history,
          transitionManager: transitionManager,
          router: router
        }
      }));
      if (unlisten) {
        unlisten();
      }
    });
  }
  exports['default'] = match;
  module.exports = exports['default'];
})(require('process'));
