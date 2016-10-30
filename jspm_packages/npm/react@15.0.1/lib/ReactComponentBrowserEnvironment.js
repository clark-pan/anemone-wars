/* */ 
(function(process) {
  'use strict';
  var DOMChildrenOperations = require('./DOMChildrenOperations');
  var ReactDOMIDOperations = require('./ReactDOMIDOperations');
  var ReactPerf = require('./ReactPerf');
  var ReactComponentBrowserEnvironment = {
    processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
    replaceNodeWithMarkup: DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup,
    unmountIDFromEnvironment: function(rootNodeID) {}
  };
  ReactPerf.measureMethods(ReactComponentBrowserEnvironment, 'ReactComponentBrowserEnvironment', {replaceNodeWithMarkup: 'replaceNodeWithMarkup'});
  module.exports = ReactComponentBrowserEnvironment;
})(require('process'));
