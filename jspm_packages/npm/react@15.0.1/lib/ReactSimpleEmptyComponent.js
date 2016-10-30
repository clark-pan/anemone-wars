/* */ 
'use strict';
var _assign = require('object-assign');
var ReactReconciler = require('./ReactReconciler');
var ReactSimpleEmptyComponent = function(placeholderElement, instantiate) {
  this._currentElement = null;
  this._renderedComponent = instantiate(placeholderElement);
};
_assign(ReactSimpleEmptyComponent.prototype, {
  mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
    return ReactReconciler.mountComponent(this._renderedComponent, transaction, nativeParent, nativeContainerInfo, context);
  },
  receiveComponent: function() {},
  getNativeNode: function() {
    return ReactReconciler.getNativeNode(this._renderedComponent);
  },
  unmountComponent: function() {
    ReactReconciler.unmountComponent(this._renderedComponent);
    this._renderedComponent = null;
  }
});
module.exports = ReactSimpleEmptyComponent;
