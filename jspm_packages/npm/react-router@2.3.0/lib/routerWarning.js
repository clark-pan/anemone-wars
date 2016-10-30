/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports['default'] = routerWarning;
  exports._resetWarned = _resetWarned;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var warned = {};
  function routerWarning(falseToWarn, message) {
    if (message.indexOf('deprecated') !== -1) {
      if (warned[message]) {
        return;
      }
      warned[message] = true;
    }
    message = '[react-router] ' + message;
    for (var _len = arguments.length,
        args = Array(_len > 2 ? _len - 2 : 0),
        _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    process.env.NODE_ENV !== 'production' ? _warning2['default'].apply(undefined, [falseToWarn, message].concat(args)) : undefined;
  }
  function _resetWarned() {
    warned = {};
  }
})(require('process'));
