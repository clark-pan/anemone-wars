/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _routerWarning = require('./routerWarning');
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  var _InternalPropTypes = require('./InternalPropTypes');
  var History = {
    contextTypes: {history: _InternalPropTypes.history},
    componentWillMount: function componentWillMount() {
      process.env.NODE_ENV !== 'production' ? _routerWarning2['default'](false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : undefined;
      this.history = this.context.history;
    }
  };
  exports['default'] = History;
  module.exports = exports['default'];
})(require('process'));
