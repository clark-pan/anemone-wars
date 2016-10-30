/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  var _invariant = require('invariant');
  var _invariant2 = _interopRequireDefault(_invariant);
  var _RouteUtils = require('./RouteUtils');
  var _InternalPropTypes = require('./InternalPropTypes');
  var func = _react2['default'].PropTypes.func;
  var IndexRoute = _react2['default'].createClass({
    displayName: 'IndexRoute',
    statics: {createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
        if (parentRoute) {
          parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
        } else {
          process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
        }
      }},
    propTypes: {
      path: _InternalPropTypes.falsy,
      component: _InternalPropTypes.component,
      components: _InternalPropTypes.components,
      getComponent: func,
      getComponents: func
    },
    render: function render() {
      !false ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
    }
  });
  exports['default'] = IndexRoute;
  module.exports = exports['default'];
})(require('process'));
