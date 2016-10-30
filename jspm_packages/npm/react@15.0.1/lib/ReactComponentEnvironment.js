/* */ 
(function(process) {
  'use strict';
  var invariant = require('fbjs/lib/invariant');
  var injected = false;
  var ReactComponentEnvironment = {
    unmountIDFromEnvironment: null,
    replaceNodeWithMarkup: null,
    processChildrenUpdates: null,
    injection: {injectEnvironment: function(environment) {
        !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : void 0;
        ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
        ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
        ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
        injected = true;
      }}
  };
  module.exports = ReactComponentEnvironment;
})(require('process'));
