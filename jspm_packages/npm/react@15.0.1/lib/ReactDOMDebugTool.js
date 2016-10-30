/* */ 
(function(process) {
  'use strict';
  var ReactDOMUnknownPropertyDevtool = require('./ReactDOMUnknownPropertyDevtool');
  var warning = require('fbjs/lib/warning');
  var eventHandlers = [];
  var handlerDoesThrowForEvent = {};
  function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
    if (process.env.NODE_ENV !== 'production') {
      eventHandlers.forEach(function(handler) {
        try {
          if (handler[handlerFunctionName]) {
            handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
          }
        } catch (e) {
          process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
          handlerDoesThrowForEvent[handlerFunctionName] = true;
        }
      });
    }
  }
  var ReactDOMDebugTool = {
    addDevtool: function(devtool) {
      eventHandlers.push(devtool);
    },
    removeDevtool: function(devtool) {
      for (var i = 0; i < eventHandlers.length; i++) {
        if (eventHandlers[i] === devtool) {
          eventHandlers.splice(i, 1);
          i--;
        }
      }
    },
    onCreateMarkupForProperty: function(name, value) {
      emitEvent('onCreateMarkupForProperty', name, value);
    },
    onSetValueForProperty: function(node, name, value) {
      emitEvent('onSetValueForProperty', node, name, value);
    },
    onDeleteValueForProperty: function(node, name) {
      emitEvent('onDeleteValueForProperty', node, name);
    }
  };
  ReactDOMDebugTool.addDevtool(ReactDOMUnknownPropertyDevtool);
  module.exports = ReactDOMDebugTool;
})(require('process'));
