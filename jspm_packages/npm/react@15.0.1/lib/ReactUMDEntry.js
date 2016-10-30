/* */ 
'use strict';
var _assign = require('object-assign');
var ReactDOM = require('./ReactDOM');
var ReactDOMServer = require('./ReactDOMServer');
var React = require('./React');
var ReactUMDEntry = _assign({
  __SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactDOM,
  __SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactDOMServer
}, React);
module.exports = ReactUMDEntry;
