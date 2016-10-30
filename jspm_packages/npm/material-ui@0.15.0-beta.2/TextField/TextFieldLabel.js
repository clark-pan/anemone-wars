/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _simpleAssign = require('simple-assign');
var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var propTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  disabled: _react2.default.PropTypes.bool,
  shrink: _react2.default.PropTypes.bool,
  htmlFor: _react2.default.PropTypes.string,
  onTouchTap: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object
};
var defaultProps = {
  disabled: false,
  shrink: false
};
var TextFieldLabel = function TextFieldLabel(props) {
  var muiTheme = props.muiTheme;
  var className = props.className;
  var children = props.children;
  var disabled = props.disabled;
  var shrink = props.shrink;
  var htmlFor = props.htmlFor;
  var style = props.style;
  var onTouchTap = props.onTouchTap;
  var styles = {root: {
      position: 'absolute',
      lineHeight: '22px',
      top: 38,
      transition: _transitions2.default.easeOut(),
      zIndex: 1,
      cursor: disabled ? 'default' : 'text',
      transform: shrink ? 'perspective(1px) scale(0.75) translate3d(0, -28px, 0)' : 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top',
      pointerEvents: shrink ? 'none' : 'auto',
      userSelect: 'none'
    }};
  var prepareStyles = muiTheme.prepareStyles;
  return _react2.default.createElement('label', {
    className: className,
    style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, style)),
    htmlFor: htmlFor,
    onTouchTap: onTouchTap
  }, children);
};
TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;
exports.default = TextFieldLabel;
