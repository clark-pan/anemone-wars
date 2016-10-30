/* */ 
(function(process) {
  'use strict';
  var DOMChildrenOperations = require('./DOMChildrenOperations');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactPerf = require('./ReactPerf');
  var ReactDOMIDOperations = {dangerouslyProcessChildrenUpdates: function(parentInst, updates) {
      var node = ReactDOMComponentTree.getNodeFromInstance(parentInst);
      DOMChildrenOperations.processUpdates(node, updates);
    }};
  ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'});
  module.exports = ReactDOMIDOperations;
})(require('process'));
