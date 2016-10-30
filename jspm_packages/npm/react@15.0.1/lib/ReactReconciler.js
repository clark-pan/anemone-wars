/* */ 
(function(process) {
  'use strict';
  var ReactRef = require('./ReactRef');
  var ReactInstrumentation = require('./ReactInstrumentation');
  function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement);
  }
  var ReactReconciler = {
    mountComponent: function(internalInstance, transaction, nativeParent, nativeContainerInfo, context) {
      var markup = internalInstance.mountComponent(transaction, nativeParent, nativeContainerInfo, context);
      if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      }
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onMountComponent(internalInstance);
      }
      return markup;
    },
    getNativeNode: function(internalInstance) {
      return internalInstance.getNativeNode();
    },
    unmountComponent: function(internalInstance, safely) {
      ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
      internalInstance.unmountComponent(safely);
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onUnmountComponent(internalInstance);
      }
    },
    receiveComponent: function(internalInstance, nextElement, transaction, context) {
      var prevElement = internalInstance._currentElement;
      if (nextElement === prevElement && context === internalInstance._context) {
        return;
      }
      var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
      if (refsChanged) {
        ReactRef.detachRefs(internalInstance, prevElement);
      }
      internalInstance.receiveComponent(nextElement, transaction, context);
      if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
      }
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance);
      }
    },
    performUpdateIfNecessary: function(internalInstance, transaction) {
      internalInstance.performUpdateIfNecessary(transaction);
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance);
      }
    }
  };
  module.exports = ReactReconciler;
})(require('process'));
