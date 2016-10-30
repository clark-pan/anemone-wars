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
  exports['default'] = matchRoutes;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  var _AsyncUtils = require('./AsyncUtils');
  var _PatternUtils = require('./PatternUtils');
  var _RouteUtils = require('./RouteUtils');
  function getChildRoutes(route, location, callback) {
    if (route.childRoutes) {
      return [null, route.childRoutes];
    }
    if (!route.getChildRoutes) {
      return [];
    }
    var sync = true,
        result = undefined;
    route.getChildRoutes(location, function(error, childRoutes) {
      childRoutes = !error && _RouteUtils.createRoutes(childRoutes);
      if (sync) {
        result = [error, childRoutes];
        return;
      }
      callback(error, childRoutes);
    });
    sync = false;
    return result;
  }
  function getIndexRoute(route, location, callback) {
    if (route.indexRoute) {
      callback(null, route.indexRoute);
    } else if (route.getIndexRoute) {
      route.getIndexRoute(location, function(error, indexRoute) {
        callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
      });
    } else if (route.childRoutes) {
      (function() {
        var pathless = route.childRoutes.filter(function(childRoute) {
          return !childRoute.path;
        });
        _AsyncUtils.loopAsync(pathless.length, function(index, next, done) {
          getIndexRoute(pathless[index], location, function(error, indexRoute) {
            if (error || indexRoute) {
              var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
              done(error, routes);
            } else {
              next();
            }
          });
        }, function(err, routes) {
          callback(null, routes);
        });
      })();
    } else {
      callback();
    }
  }
  function assignParams(params, paramNames, paramValues) {
    return paramNames.reduce(function(params, paramName, index) {
      var paramValue = paramValues && paramValues[index];
      if (Array.isArray(params[paramName])) {
        params[paramName].push(paramValue);
      } else if (paramName in params) {
        params[paramName] = [params[paramName], paramValue];
      } else {
        params[paramName] = paramValue;
      }
      return params;
    }, params);
  }
  function createParams(paramNames, paramValues) {
    return assignParams({}, paramNames, paramValues);
  }
  function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
    var pattern = route.path || '';
    if (pattern.charAt(0) === '/') {
      remainingPathname = location.pathname;
      paramNames = [];
      paramValues = [];
    }
    if (remainingPathname !== null && pattern) {
      var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
      remainingPathname = matched.remainingPathname;
      paramNames = [].concat(paramNames, matched.paramNames);
      paramValues = [].concat(paramValues, matched.paramValues);
      if (remainingPathname === '') {
        var _ret2 = (function() {
          var match = {
            routes: [route],
            params: createParams(paramNames, paramValues)
          };
          getIndexRoute(route, location, function(error, indexRoute) {
            if (error) {
              callback(error);
            } else {
              if (Array.isArray(indexRoute)) {
                var _match$routes;
                process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](indexRoute.every(function(route) {
                  return !route.path;
                }), 'Index routes should not have paths') : undefined;
                (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
              } else if (indexRoute) {
                process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](!indexRoute.path, 'Index routes should not have paths') : undefined;
                match.routes.push(indexRoute);
              }
              callback(null, match);
            }
          });
          return {v: undefined};
        })();
        if (typeof _ret2 === 'object')
          return _ret2.v;
      }
    }
    if (remainingPathname != null || route.childRoutes) {
      var onChildRoutes = function onChildRoutes(error, childRoutes) {
        if (error) {
          callback(error);
        } else if (childRoutes) {
          matchRoutes(childRoutes, location, function(error, match) {
            if (error) {
              callback(error);
            } else if (match) {
              match.routes.unshift(route);
              callback(null, match);
            } else {
              callback();
            }
          }, remainingPathname, paramNames, paramValues);
        } else {
          callback();
        }
      };
      var result = getChildRoutes(route, location, onChildRoutes);
      if (result) {
        onChildRoutes.apply(undefined, result);
      }
    } else {
      callback();
    }
  }
  function matchRoutes(routes, location, callback, remainingPathname) {
    var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
    var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
    if (remainingPathname === undefined) {
      if (location.pathname.charAt(0) !== '/') {
        location = _extends({}, location, {pathname: '/' + location.pathname});
      }
      remainingPathname = location.pathname;
    }
    _AsyncUtils.loopAsync(routes.length, function(index, next, done) {
      matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function(error, match) {
        if (error || match) {
          done(error, match);
        } else {
          next();
        }
      });
    }, callback);
  }
  module.exports = exports['default'];
})(require('process'));
