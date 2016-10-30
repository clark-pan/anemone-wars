/* */ 
'use strict';
var ReactNodeTypes = require('./ReactNodeTypes');
function getNativeComponentFromComposite(inst) {
  var type;
  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
    inst = inst._renderedComponent;
  }
  if (type === ReactNodeTypes.NATIVE) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes.EMPTY) {
    return null;
  }
}
module.exports = getNativeComponentFromComposite;
