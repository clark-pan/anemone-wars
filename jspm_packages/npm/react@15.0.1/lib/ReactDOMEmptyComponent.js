/* */ 
'use strict';
var _assign = require('object-assign');
var DOMLazyTree = require('./DOMLazyTree');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactDOMEmptyComponent = function(instantiate) {
  this._currentElement = null;
  this._nativeNode = null;
  this._nativeParent = null;
  this._nativeContainerInfo = null;
  this._domID = null;
};
_assign(ReactDOMEmptyComponent.prototype, {
  mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
    var domID = nativeContainerInfo._idCounter++;
    this._domID = domID;
    this._nativeParent = nativeParent;
    this._nativeContainerInfo = nativeContainerInfo;
    var nodeValue = ' react-empty: ' + this._domID + ' ';
    if (transaction.useCreateElement) {
      var ownerDocument = nativeContainerInfo._ownerDocument;
      var node = ownerDocument.createComment(nodeValue);
      ReactDOMComponentTree.precacheNode(this, node);
      return DOMLazyTree(node);
    } else {
      if (transaction.renderToStaticMarkup) {
        return '';
      }
      return '<!--' + nodeValue + '-->';
    }
  },
  receiveComponent: function() {},
  getNativeNode: function() {
    return ReactDOMComponentTree.getNodeFromInstance(this);
  },
  unmountComponent: function() {
    ReactDOMComponentTree.uncacheNode(this);
  }
});
module.exports = ReactDOMEmptyComponent;
