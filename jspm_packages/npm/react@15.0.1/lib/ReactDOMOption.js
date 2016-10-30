/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var ReactChildren = require('./ReactChildren');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactDOMSelect = require('./ReactDOMSelect');
  var warning = require('fbjs/lib/warning');
  var ReactDOMOption = {
    mountWrapper: function(inst, props, nativeParent) {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : void 0;
      }
      var selectValue = null;
      if (nativeParent != null && nativeParent._tag === 'select') {
        selectValue = ReactDOMSelect.getSelectValueContext(nativeParent);
      }
      var selected = null;
      if (selectValue != null) {
        selected = false;
        if (Array.isArray(selectValue)) {
          for (var i = 0; i < selectValue.length; i++) {
            if ('' + selectValue[i] === '' + props.value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === '' + props.value;
        }
      }
      inst._wrapperState = {selected: selected};
    },
    postMountWrapper: function(inst) {
      var props = inst._currentElement.props;
      if (props.value != null) {
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        node.setAttribute('value', props.value);
      }
    },
    getNativeProps: function(inst, props) {
      var nativeProps = _assign({
        selected: undefined,
        children: undefined
      }, props);
      if (inst._wrapperState.selected != null) {
        nativeProps.selected = inst._wrapperState.selected;
      }
      var content = '';
      ReactChildren.forEach(props.children, function(child) {
        if (child == null) {
          return;
        }
        if (typeof child === 'string' || typeof child === 'number') {
          content += child;
        } else {
          process.env.NODE_ENV !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : void 0;
        }
      });
      if (content) {
        nativeProps.children = content;
      }
      return nativeProps;
    }
  };
  module.exports = ReactDOMOption;
})(require('process'));
