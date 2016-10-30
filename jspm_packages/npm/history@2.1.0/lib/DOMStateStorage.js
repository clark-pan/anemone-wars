/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports.saveState = saveState;
  exports.readState = readState;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var KeyPrefix = '@@History/';
  var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];
  var SecurityError = 'SecurityError';
  function createKey(key) {
    return KeyPrefix + key;
  }
  function saveState(key, state) {
    try {
      if (state == null) {
        window.sessionStorage.removeItem(createKey(key));
      } else {
        window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
      }
    } catch (error) {
      if (error.name === SecurityError) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
        return;
      }
      if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
        return;
      }
      throw error;
    }
  }
  function readState(key) {
    var json = undefined;
    try {
      json = window.sessionStorage.getItem(createKey(key));
    } catch (error) {
      if (error.name === SecurityError) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
        return null;
      }
    }
    if (json) {
      try {
        return JSON.parse(json);
      } catch (error) {}
    }
    return null;
  }
})(require('process'));
