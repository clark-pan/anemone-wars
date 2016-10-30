/* */ 
(function(process) {
  'use strict';
  var ReactComponentEnvironment = require('./ReactComponentEnvironment');
  var ReactMultiChildUpdateTypes = require('./ReactMultiChildUpdateTypes');
  var ReactCurrentOwner = require('./ReactCurrentOwner');
  var ReactReconciler = require('./ReactReconciler');
  var ReactChildReconciler = require('./ReactChildReconciler');
  var flattenChildren = require('./flattenChildren');
  var invariant = require('fbjs/lib/invariant');
  function makeInsertMarkup(markup, afterNode, toIndex) {
    return {
      type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
      content: markup,
      fromIndex: null,
      fromNode: null,
      toIndex: toIndex,
      afterNode: afterNode
    };
  }
  function makeMove(child, afterNode, toIndex) {
    return {
      type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
      content: null,
      fromIndex: child._mountIndex,
      fromNode: ReactReconciler.getNativeNode(child),
      toIndex: toIndex,
      afterNode: afterNode
    };
  }
  function makeRemove(child, node) {
    return {
      type: ReactMultiChildUpdateTypes.REMOVE_NODE,
      content: null,
      fromIndex: child._mountIndex,
      fromNode: node,
      toIndex: null,
      afterNode: null
    };
  }
  function makeSetMarkup(markup) {
    return {
      type: ReactMultiChildUpdateTypes.SET_MARKUP,
      content: markup,
      fromIndex: null,
      fromNode: null,
      toIndex: null,
      afterNode: null
    };
  }
  function makeTextContent(textContent) {
    return {
      type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
      content: textContent,
      fromIndex: null,
      fromNode: null,
      toIndex: null,
      afterNode: null
    };
  }
  function enqueue(queue, update) {
    if (update) {
      queue = queue || [];
      queue.push(update);
    }
    return queue;
  }
  function processQueue(inst, updateQueue) {
    ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
  }
  var ReactMultiChild = {Mixin: {
      _reconcilerInstantiateChildren: function(nestedChildren, transaction, context) {
        if (process.env.NODE_ENV !== 'production') {
          if (this._currentElement) {
            try {
              ReactCurrentOwner.current = this._currentElement._owner;
              return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
            } finally {
              ReactCurrentOwner.current = null;
            }
          }
        }
        return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
      },
      _reconcilerUpdateChildren: function(prevChildren, nextNestedChildrenElements, removedNodes, transaction, context) {
        var nextChildren;
        if (process.env.NODE_ENV !== 'production') {
          if (this._currentElement) {
            try {
              ReactCurrentOwner.current = this._currentElement._owner;
              nextChildren = flattenChildren(nextNestedChildrenElements);
            } finally {
              ReactCurrentOwner.current = null;
            }
            ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
            return nextChildren;
          }
        }
        nextChildren = flattenChildren(nextNestedChildrenElements);
        ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
        return nextChildren;
      },
      mountChildren: function(nestedChildren, transaction, context) {
        var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
        this._renderedChildren = children;
        var mountImages = [];
        var index = 0;
        for (var name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name];
            var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._nativeContainerInfo, context);
            child._mountIndex = index++;
            mountImages.push(mountImage);
          }
        }
        return mountImages;
      },
      updateTextContent: function(nextContent) {
        var prevChildren = this._renderedChildren;
        ReactChildReconciler.unmountChildren(prevChildren, false);
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : invariant(false) : void 0;
          }
        }
        var updates = [makeTextContent(nextContent)];
        processQueue(this, updates);
      },
      updateMarkup: function(nextMarkup) {
        var prevChildren = this._renderedChildren;
        ReactChildReconciler.unmountChildren(prevChildren, false);
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : invariant(false) : void 0;
          }
        }
        var updates = [makeSetMarkup(nextMarkup)];
        processQueue(this, updates);
      },
      updateChildren: function(nextNestedChildrenElements, transaction, context) {
        this._updateChildren(nextNestedChildrenElements, transaction, context);
      },
      _updateChildren: function(nextNestedChildrenElements, transaction, context) {
        var prevChildren = this._renderedChildren;
        var removedNodes = {};
        var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, removedNodes, transaction, context);
        if (!nextChildren && !prevChildren) {
          return;
        }
        var updates = null;
        var name;
        var lastIndex = 0;
        var nextIndex = 0;
        var lastPlacedNode = null;
        for (name in nextChildren) {
          if (!nextChildren.hasOwnProperty(name)) {
            continue;
          }
          var prevChild = prevChildren && prevChildren[name];
          var nextChild = nextChildren[name];
          if (prevChild === nextChild) {
            updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            prevChild._mountIndex = nextIndex;
          } else {
            if (prevChild) {
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            }
            updates = enqueue(updates, this._mountChildAtIndex(nextChild, lastPlacedNode, nextIndex, transaction, context));
          }
          nextIndex++;
          lastPlacedNode = ReactReconciler.getNativeNode(nextChild);
        }
        for (name in removedNodes) {
          if (removedNodes.hasOwnProperty(name)) {
            updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
          }
        }
        if (updates) {
          processQueue(this, updates);
        }
        this._renderedChildren = nextChildren;
      },
      unmountChildren: function(safely) {
        var renderedChildren = this._renderedChildren;
        ReactChildReconciler.unmountChildren(renderedChildren, safely);
        this._renderedChildren = null;
      },
      moveChild: function(child, afterNode, toIndex, lastIndex) {
        if (child._mountIndex < lastIndex) {
          return makeMove(child, afterNode, toIndex);
        }
      },
      createChild: function(child, afterNode, mountImage) {
        return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
      },
      removeChild: function(child, node) {
        return makeRemove(child, node);
      },
      _mountChildAtIndex: function(child, afterNode, index, transaction, context) {
        var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._nativeContainerInfo, context);
        child._mountIndex = index;
        return this.createChild(child, afterNode, mountImage);
      },
      _unmountChild: function(child, node) {
        var update = this.removeChild(child, node);
        child._mountIndex = null;
        return update;
      }
    }};
  module.exports = ReactMultiChild;
})(require('process'));
