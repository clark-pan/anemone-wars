/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  function runTransitionHook(hook, location, callback) {
    var result = hook(location, callback);
    if (hook.length < 2) {
      callback(result);
    } else {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
    }
  }
  exports['default'] = runTransitionHook;
  module.exports = exports['default'];
})(require('process'));
