/* */ 
(function(process) {
  'use strict';
  var ReactElement = require('./ReactElement');
  var invariant = require('fbjs/lib/invariant');
  var ReactNodeTypes = {
    NATIVE: 0,
    COMPOSITE: 1,
    EMPTY: 2,
    getType: function(node) {
      if (node === null || node === false) {
        return ReactNodeTypes.EMPTY;
      } else if (ReactElement.isValidElement(node)) {
        if (typeof node.type === 'function') {
          return ReactNodeTypes.COMPOSITE;
        } else {
          return ReactNodeTypes.NATIVE;
        }
      }
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unexpected node: %s', node) : invariant(false) : void 0;
    }
  };
  module.exports = ReactNodeTypes;
})(require('process'));
