/* */ 
var createWrapper = require('./_createWrapper'),
    getPlaceholder = require('./_getPlaceholder'),
    replaceHolders = require('./_replaceHolders'),
    rest = require('./rest');
var PARTIAL_FLAG = 32;
var partial = rest(function(func, partials) {
  var holders = replaceHolders(partials, getPlaceholder(partial));
  return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders);
});
partial.placeholder = {};
module.exports = partial;
