/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports['default'] = routerMiddleware;
var _actions = require('./actions');
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0,
        arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function routerMiddleware(history) {
  return function() {
    return function(next) {
      return function(action) {
        if (action.type !== _actions.CALL_HISTORY_METHOD) {
          return next(action);
        }
        var _action$payload = action.payload;
        var method = _action$payload.method;
        var args = _action$payload.args;
        history[method].apply(history, _toConsumableArray(args));
      };
    };
  };
}
