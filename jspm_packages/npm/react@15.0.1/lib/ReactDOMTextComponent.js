/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var DOMChildrenOperations = require('./DOMChildrenOperations');
  var DOMLazyTree = require('./DOMLazyTree');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactPerf = require('./ReactPerf');
  var escapeTextContentForBrowser = require('./escapeTextContentForBrowser');
  var invariant = require('fbjs/lib/invariant');
  var validateDOMNesting = require('./validateDOMNesting');
  var ReactDOMTextComponent = function(text) {
    this._currentElement = text;
    this._stringText = '' + text;
    this._nativeNode = null;
    this._nativeParent = null;
    this._domID = null;
    this._mountIndex = 0;
    this._closingComment = null;
    this._commentNodes = null;
  };
  _assign(ReactDOMTextComponent.prototype, {
    mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
      if (process.env.NODE_ENV !== 'production') {
        var parentInfo;
        if (nativeParent != null) {
          parentInfo = nativeParent._ancestorInfo;
        } else if (nativeContainerInfo != null) {
          parentInfo = nativeContainerInfo._ancestorInfo;
        }
        if (parentInfo) {
          validateDOMNesting('#text', this, parentInfo);
        }
      }
      var domID = nativeContainerInfo._idCounter++;
      var openingValue = ' react-text: ' + domID + ' ';
      var closingValue = ' /react-text ';
      this._domID = domID;
      this._nativeParent = nativeParent;
      if (transaction.useCreateElement) {
        var ownerDocument = nativeContainerInfo._ownerDocument;
        var openingComment = ownerDocument.createComment(openingValue);
        var closingComment = ownerDocument.createComment(closingValue);
        var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment());
        DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment));
        if (this._stringText) {
          DOMLazyTree.queueChild(lazyTree, DOMLazyTree(ownerDocument.createTextNode(this._stringText)));
        }
        DOMLazyTree.queueChild(lazyTree, DOMLazyTree(closingComment));
        ReactDOMComponentTree.precacheNode(this, openingComment);
        this._closingComment = closingComment;
        return lazyTree;
      } else {
        var escapedText = escapeTextContentForBrowser(this._stringText);
        if (transaction.renderToStaticMarkup) {
          return escapedText;
        }
        return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
      }
    },
    receiveComponent: function(nextText, transaction) {
      if (nextText !== this._currentElement) {
        this._currentElement = nextText;
        var nextStringText = '' + nextText;
        if (nextStringText !== this._stringText) {
          this._stringText = nextStringText;
          var commentNodes = this.getNativeNode();
          DOMChildrenOperations.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);
        }
      }
    },
    getNativeNode: function() {
      var nativeNode = this._commentNodes;
      if (nativeNode) {
        return nativeNode;
      }
      if (!this._closingComment) {
        var openingComment = ReactDOMComponentTree.getNodeFromInstance(this);
        var node = openingComment.nextSibling;
        while (true) {
          !(node != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Missing closing comment for text component %s', this._domID) : invariant(false) : void 0;
          if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
            this._closingComment = node;
            break;
          }
          node = node.nextSibling;
        }
      }
      nativeNode = [this._nativeNode, this._closingComment];
      this._commentNodes = nativeNode;
      return nativeNode;
    },
    unmountComponent: function() {
      this._closingComment = null;
      this._commentNodes = null;
      ReactDOMComponentTree.uncacheNode(this);
    }
  });
  ReactPerf.measureMethods(ReactDOMTextComponent.prototype, 'ReactDOMTextComponent', {
    mountComponent: 'mountComponent',
    receiveComponent: 'receiveComponent'
  });
  module.exports = ReactDOMTextComponent;
})(require('process'));
