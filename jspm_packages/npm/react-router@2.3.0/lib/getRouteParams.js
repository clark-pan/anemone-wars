/* */ 
'use strict';
exports.__esModule = true;
var _PatternUtils = require('./PatternUtils');
function getRouteParams(route, params) {
  var routeParams = {};
  if (!route.path)
    return routeParams;
  var paramNames = _PatternUtils.getParamNames(route.path);
  for (var p in params) {
    if (Object.prototype.hasOwnProperty.call(params, p) && paramNames.indexOf(p) !== -1) {
      routeParams[p] = params[p];
    }
  }
  return routeParams;
}
exports['default'] = getRouteParams;
module.exports = exports['default'];
