/* */ 
(function(process) {
  'use strict';
  var warning = require('fbjs/lib/warning');
  function warnTDZ(publicInstance, callerName) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
    }
  }
  var ReactNoopUpdateQueue = {
    isMounted: function(publicInstance) {
      return false;
    },
    enqueueCallback: function(publicInstance, callback) {},
    enqueueForceUpdate: function(publicInstance) {
      warnTDZ(publicInstance, 'forceUpdate');
    },
    enqueueReplaceState: function(publicInstance, completeState) {
      warnTDZ(publicInstance, 'replaceState');
    },
    enqueueSetState: function(publicInstance, partialState) {
      warnTDZ(publicInstance, 'setState');
    }
  };
  module.exports = ReactNoopUpdateQueue;
})(require('process'));
