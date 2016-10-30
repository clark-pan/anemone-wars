/* */ 
(function(process) {
  'use strict';
  var invariant = require('fbjs/lib/invariant');
  function getLowestCommonAncestor(instA, instB) {
    !('_nativeNode' in instA) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : invariant(false) : void 0;
    !('_nativeNode' in instB) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : invariant(false) : void 0;
    var depthA = 0;
    for (var tempA = instA; tempA; tempA = tempA._nativeParent) {
      depthA++;
    }
    var depthB = 0;
    for (var tempB = instB; tempB; tempB = tempB._nativeParent) {
      depthB++;
    }
    while (depthA - depthB > 0) {
      instA = instA._nativeParent;
      depthA--;
    }
    while (depthB - depthA > 0) {
      instB = instB._nativeParent;
      depthB--;
    }
    var depth = depthA;
    while (depth--) {
      if (instA === instB) {
        return instA;
      }
      instA = instA._nativeParent;
      instB = instB._nativeParent;
    }
    return null;
  }
  function isAncestor(instA, instB) {
    !('_nativeNode' in instA) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : invariant(false) : void 0;
    !('_nativeNode' in instB) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : invariant(false) : void 0;
    while (instB) {
      if (instB === instA) {
        return true;
      }
      instB = instB._nativeParent;
    }
    return false;
  }
  function getParentInstance(inst) {
    !('_nativeNode' in inst) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getParentInstance: Invalid argument.') : invariant(false) : void 0;
    return inst._nativeParent;
  }
  function traverseTwoPhase(inst, fn, arg) {
    var path = [];
    while (inst) {
      path.push(inst);
      inst = inst._nativeParent;
    }
    var i;
    for (i = path.length; i-- > 0; ) {
      fn(path[i], false, arg);
    }
    for (i = 0; i < path.length; i++) {
      fn(path[i], true, arg);
    }
  }
  function traverseEnterLeave(from, to, fn, argFrom, argTo) {
    var common = from && to ? getLowestCommonAncestor(from, to) : null;
    var pathFrom = [];
    while (from && from !== common) {
      pathFrom.push(from);
      from = from._nativeParent;
    }
    var pathTo = [];
    while (to && to !== common) {
      pathTo.push(to);
      to = to._nativeParent;
    }
    var i;
    for (i = 0; i < pathFrom.length; i++) {
      fn(pathFrom[i], true, argFrom);
    }
    for (i = pathTo.length; i-- > 0; ) {
      fn(pathTo[i], false, argTo);
    }
  }
  module.exports = {
    isAncestor: isAncestor,
    getLowestCommonAncestor: getLowestCommonAncestor,
    getParentInstance: getParentInstance,
    traverseTwoPhase: traverseTwoPhase,
    traverseEnterLeave: traverseEnterLeave
  };
})(require('process'));
