/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _invariant = require('invariant');
  var _invariant2 = _interopRequireDefault(_invariant);
  var object = _react2['default'].PropTypes.object;
  var Lifecycle = {
    contextTypes: {
      history: object.isRequired,
      route: object
    },
    propTypes: {route: object},
    componentDidMount: function componentDidMount() {
      process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : undefined;
      !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : _invariant2['default'](false) : undefined;
      var route = this.props.route || this.context.route;
      !route ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : _invariant2['default'](false) : undefined;
      this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
    },
    componentWillUnmount: function componentWillUnmount() {
      if (this._unlistenBeforeLeavingRoute)
        this._unlistenBeforeLeavingRoute();
    }
  };
  exports['default'] = Lifecycle;
  module.exports = exports['default'];
})(require('process'));
