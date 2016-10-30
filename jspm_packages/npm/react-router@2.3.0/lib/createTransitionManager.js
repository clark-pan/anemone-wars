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
  exports['default'] = createTransitionManager;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  var _historyLibActions = require('history/lib/Actions');
  var _computeChangedRoutes2 = require('./computeChangedRoutes');
  var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
  var _TransitionUtils = require('./TransitionUtils');
  var _isActive2 = require('./isActive');
  var _isActive3 = _interopRequireDefault(_isActive2);
  var _getComponents = require('./getComponents');
  var _getComponents2 = _interopRequireDefault(_getComponents);
  var _matchRoutes = require('./matchRoutes');
  var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
  function hasAnyProperties(object) {
    for (var p in object) {
      if (Object.prototype.hasOwnProperty.call(object, p))
        return true;
    }
    return false;
  }
  function createTransitionManager(history, routes) {
    var state = {};
    function isActive(location) {
      var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var indexOnly = undefined;
      if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
        process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : undefined;
        location = {
          pathname: location,
          query: indexOnlyOrDeprecatedQuery
        };
        indexOnly = deprecatedIndexOnly || false;
      } else {
        location = history.createLocation(location);
        indexOnly = indexOnlyOrDeprecatedQuery;
      }
      return _isActive3['default'](location, indexOnly, state.location, state.routes, state.params);
    }
    function createLocationFromRedirectInfo(location) {
      return history.createLocation(location, _historyLibActions.REPLACE);
    }
    var partialNextState = undefined;
    function match(location, callback) {
      if (partialNextState && partialNextState.location === location) {
        finishMatch(partialNextState, callback);
      } else {
        _matchRoutes2['default'](routes, location, function(error, nextState) {
          if (error) {
            callback(error);
          } else if (nextState) {
            finishMatch(_extends({}, nextState, {location: location}), callback);
          } else {
            callback();
          }
        });
      }
    }
    function finishMatch(nextState, callback) {
      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);
      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
      var changeRoutes = _computeChangedRoutes.changeRoutes;
      var enterRoutes = _computeChangedRoutes.enterRoutes;
      _TransitionUtils.runLeaveHooks(leaveRoutes);
      leaveRoutes.filter(function(route) {
        return enterRoutes.indexOf(route) === -1;
      }).forEach(removeListenBeforeHooksForRoute);
      _TransitionUtils.runChangeHooks(changeRoutes, state, nextState, function(error, redirectInfo) {
        if (error || redirectInfo)
          return handleErrorOrRedirect(error, redirectInfo);
        _TransitionUtils.runEnterHooks(enterRoutes, nextState, finishEnterHooks);
      });
      function finishEnterHooks(error, redirectInfo) {
        if (error || redirectInfo)
          return handleErrorOrRedirect(error, redirectInfo);
        _getComponents2['default'](nextState, function(error, components) {
          if (error) {
            callback(error);
          } else {
            callback(null, null, state = _extends({}, nextState, {components: components}));
          }
        });
      }
      function handleErrorOrRedirect(error, redirectInfo) {
        if (error)
          callback(error);
        else
          callback(null, createLocationFromRedirectInfo(redirectInfo));
      }
    }
    var RouteGuid = 1;
    function getRouteID(route) {
      var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
      return route.__id__ || create && (route.__id__ = RouteGuid++);
    }
    var RouteHooks = Object.create(null);
    function getRouteHooksForRoutes(routes) {
      return routes.reduce(function(hooks, route) {
        hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
        return hooks;
      }, []);
    }
    function transitionHook(location, callback) {
      _matchRoutes2['default'](routes, location, function(error, nextState) {
        if (nextState == null) {
          callback();
          return;
        }
        partialNextState = _extends({}, nextState, {location: location});
        var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, partialNextState).leaveRoutes);
        var result = undefined;
        for (var i = 0,
            len = hooks.length; result == null && i < len; ++i) {
          result = hooks[i](location);
        }
        callback(result);
      });
    }
    function beforeUnloadHook() {
      if (state.routes) {
        var hooks = getRouteHooksForRoutes(state.routes);
        var message = undefined;
        for (var i = 0,
            len = hooks.length; typeof message !== 'string' && i < len; ++i) {
          message = hooks[i]();
        }
        return message;
      }
    }
    var unlistenBefore = undefined,
        unlistenBeforeUnload = undefined;
    function removeListenBeforeHooksForRoute(route) {
      var routeID = getRouteID(route, false);
      if (!routeID) {
        return;
      }
      delete RouteHooks[routeID];
      if (!hasAnyProperties(RouteHooks)) {
        if (unlistenBefore) {
          unlistenBefore();
          unlistenBefore = null;
        }
        if (unlistenBeforeUnload) {
          unlistenBeforeUnload();
          unlistenBeforeUnload = null;
        }
      }
    }
    function listenBeforeLeavingRoute(route, hook) {
      var routeID = getRouteID(route);
      var hooks = RouteHooks[routeID];
      if (!hooks) {
        var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
        RouteHooks[routeID] = [hook];
        if (thereWereNoRouteHooks) {
          unlistenBefore = history.listenBefore(transitionHook);
          if (history.listenBeforeUnload)
            unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
        }
      } else {
        if (hooks.indexOf(hook) === -1) {
          process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : undefined;
          hooks.push(hook);
        }
      }
      return function() {
        var hooks = RouteHooks[routeID];
        if (hooks) {
          var newHooks = hooks.filter(function(item) {
            return item !== hook;
          });
          if (newHooks.length === 0) {
            removeListenBeforeHooksForRoute(route);
          } else {
            RouteHooks[routeID] = newHooks;
          }
        }
      };
    }
    function listen(listener) {
      return history.listen(function(location) {
        if (state.location === location) {
          listener(null, state);
        } else {
          match(location, function(error, redirectLocation, nextState) {
            if (error) {
              listener(error);
            } else if (redirectLocation) {
              history.transitionTo(redirectLocation);
            } else if (nextState) {
              listener(null, nextState);
            } else {
              process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : undefined;
            }
          });
        }
      });
    }
    return {
      isActive: isActive,
      match: match,
      listenBeforeLeavingRoute: listenBeforeLeavingRoute,
      listen: listen
    };
  }
  module.exports = exports['default'];
})(require('process'));
