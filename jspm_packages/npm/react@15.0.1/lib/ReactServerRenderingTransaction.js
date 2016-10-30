/* */ 
'use strict';
var _assign = require('object-assign');
var PooledClass = require('./PooledClass');
var Transaction = require('./Transaction');
var TRANSACTION_WRAPPERS = [];
var noopCallbackQueue = {enqueue: function() {}};
function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.useCreateElement = false;
}
var Mixin = {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },
  getReactMountReady: function() {
    return noopCallbackQueue;
  },
  destructor: function() {}
};
_assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
PooledClass.addPoolingTo(ReactServerRenderingTransaction);
module.exports = ReactServerRenderingTransaction;
