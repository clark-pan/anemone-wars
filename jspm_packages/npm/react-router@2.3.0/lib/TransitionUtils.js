/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports.runEnterHooks = runEnterHooks;
  exports.runChangeHooks = runChangeHooks;
  exports.runLeaveHooks = runLeaveHooks;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _AsyncUtils = require('./AsyncUtils');
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  function createTransitionHook(hook, route, asyncArity) {
    return function() {
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      hook.apply(route, args);
      if (hook.length < asyncArity) {
        var callback = args[args.length - 1];
        callback();
      }
    };
  }
  function getEnterHooks(routes) {
    return routes.reduce(function(hooks, route) {
      if (route.onEnter)
        hooks.push(createTransitionHook(route.onEnter, route, 3));
      return hooks;
    }, []);
  }
  function getChangeHooks(routes) {
    return routes.reduce(function(hooks, route) {
      if (route.onChange)
        hooks.push(createTransitionHook(route.onChange, route, 4));
      return hooks;
    }, []);
  }
  function runTransitionHooks(length, iter, callback) {
    if (!length) {
      callback();
      return;
    }
    var redirectInfo = undefined;
    function replace(location, deprecatedPathname, deprecatedQuery) {
      if (deprecatedPathname) {
        process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : undefined;
        redirectInfo = {
          pathname: deprecatedPathname,
          query: deprecatedQuery,
          state: location
        };
        return;
      }
      redirectInfo = location;
    }
    _AsyncUtils.loopAsync(length, function(index, next, done) {
      iter(index, replace, function(error) {
        if (error || redirectInfo) {
          done(error, redirectInfo);
        } else {
          next();
        }
      });
    }, callback);
  }
  function runEnterHooks(routes, nextState, callback) {
    var hooks = getEnterHooks(routes);
    return runTransitionHooks(hooks.length, function(index, replace, next) {
      hooks[index](nextState, replace, next);
    }, callback);
  }
  function runChangeHooks(routes, state, nextState, callback) {
    var hooks = getChangeHooks(routes);
    return runTransitionHooks(hooks.length, function(index, replace, next) {
      hooks[index](state, nextState, replace, next);
    }, callback);
  }
  function runLeaveHooks(routes) {
    for (var i = 0,
        len = routes.length; i < len; ++i) {
      if (routes[i].onLeave)
        routes[i].onLeave.call(routes[i]);
    }
  }
})(require('process'));
