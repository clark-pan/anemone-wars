/* */ 
(function(process) {
  'use strict';
  var ReactDOMContainerInfo = require('./ReactDOMContainerInfo');
  var ReactDefaultBatchingStrategy = require('./ReactDefaultBatchingStrategy');
  var ReactElement = require('./ReactElement');
  var ReactMarkupChecksum = require('./ReactMarkupChecksum');
  var ReactServerBatchingStrategy = require('./ReactServerBatchingStrategy');
  var ReactServerRenderingTransaction = require('./ReactServerRenderingTransaction');
  var ReactUpdates = require('./ReactUpdates');
  var emptyObject = require('fbjs/lib/emptyObject');
  var instantiateReactComponent = require('./instantiateReactComponent');
  var invariant = require('fbjs/lib/invariant');
  function renderToStringImpl(element, makeStaticMarkup) {
    var transaction;
    try {
      ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
      transaction = ReactServerRenderingTransaction.getPooled(makeStaticMarkup);
      return transaction.perform(function() {
        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(transaction, null, ReactDOMContainerInfo(), emptyObject);
        if (!makeStaticMarkup) {
          markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
        }
        return markup;
      }, null);
    } finally {
      ReactServerRenderingTransaction.release(transaction);
      ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    }
  }
  function renderToString(element) {
    !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : invariant(false) : void 0;
    return renderToStringImpl(element, false);
  }
  function renderToStaticMarkup(element) {
    !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(false) : void 0;
    return renderToStringImpl(element, true);
  }
  module.exports = {
    renderToString: renderToString,
    renderToStaticMarkup: renderToStaticMarkup
  };
})(require('process'));
