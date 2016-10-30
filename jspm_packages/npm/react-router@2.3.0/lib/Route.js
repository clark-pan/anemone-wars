/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _invariant = require('invariant');
  var _invariant2 = _interopRequireDefault(_invariant);
  var _RouteUtils = require('./RouteUtils');
  var _InternalPropTypes = require('./InternalPropTypes');
  var _React$PropTypes = _react2['default'].PropTypes;
  var string = _React$PropTypes.string;
  var func = _React$PropTypes.func;
  var Route = _react2['default'].createClass({
    displayName: 'Route',
    statics: {createRouteFromReactElement: _RouteUtils.createRouteFromReactElement},
    propTypes: {
      path: string,
      component: _InternalPropTypes.component,
      components: _InternalPropTypes.components,
      getComponent: func,
      getComponents: func
    },
    render: function render() {
      !false ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
    }
  });
  exports['default'] = Route;
  module.exports = exports['default'];
})(require('process'));
