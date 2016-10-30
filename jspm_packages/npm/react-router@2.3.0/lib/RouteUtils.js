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
  exports.isReactChildren = isReactChildren;
  exports.createRouteFromReactElement = createRouteFromReactElement;
  exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
  exports.createRoutes = createRoutes;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  function isValidChild(object) {
    return object == null || _react2['default'].isValidElement(object);
  }
  function isReactChildren(object) {
    return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
  }
  function checkPropTypes(componentName, propTypes, props) {
    componentName = componentName || 'UnknownComponent';
    for (var propName in propTypes) {
      if (Object.prototype.hasOwnProperty.call(propTypes, propName)) {
        var error = propTypes[propName](props, propName, componentName);
        if (error instanceof Error)
          process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, error.message) : undefined;
      }
    }
  }
  function createRoute(defaultProps, props) {
    return _extends({}, defaultProps, props);
  }
  function createRouteFromReactElement(element) {
    var type = element.type;
    var route = createRoute(type.defaultProps, element.props);
    if (type.propTypes)
      checkPropTypes(type.displayName || type.name, type.propTypes, route);
    if (route.children) {
      var childRoutes = createRoutesFromReactChildren(route.children, route);
      if (childRoutes.length)
        route.childRoutes = childRoutes;
      delete route.children;
    }
    return route;
  }
  function createRoutesFromReactChildren(children, parentRoute) {
    var routes = [];
    _react2['default'].Children.forEach(children, function(element) {
      if (_react2['default'].isValidElement(element)) {
        if (element.type.createRouteFromReactElement) {
          var route = element.type.createRouteFromReactElement(element, parentRoute);
          if (route)
            routes.push(route);
        } else {
          routes.push(createRouteFromReactElement(element));
        }
      }
    });
    return routes;
  }
  function createRoutes(routes) {
    if (isReactChildren(routes)) {
      routes = createRoutesFromReactChildren(routes);
    } else if (routes && !Array.isArray(routes)) {
      routes = [routes];
    }
    return routes;
  }
})(require('process'));
