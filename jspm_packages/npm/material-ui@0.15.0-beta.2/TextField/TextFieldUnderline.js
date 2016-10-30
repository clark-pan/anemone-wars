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
  disabled: _react2.default.PropTypes.bool,
  disabledStyle: _react2.default.PropTypes.object,
  error: _react2.default.PropTypes.bool,
  errorStyle: _react2.default.PropTypes.object,
  focus: _react2.default.PropTypes.bool,
  focusStyle: _react2.default.PropTypes.object,
  muiTheme: _react2.default.PropTypes.object.isRequired,
  style: _react2.default.PropTypes.object
};
var defaultProps = {
  disabled: false,
  disabledStyle: {},
  error: false,
  errorStyle: {},
  focus: false,
  focusStyle: {},
  style: {}
};
var TextFieldUnderline = function TextFieldUnderline(props) {
  var disabled = props.disabled;
  var disabledStyle = props.disabledStyle;
  var error = props.error;
  var errorStyle = props.errorStyle;
  var focus = props.focus;
  var focusStyle = props.focusStyle;
  var muiTheme = props.muiTheme;
  var style = props.style;
  var errorStyleColor = errorStyle.color;
  var prepareStyles = muiTheme.prepareStyles;
  var _muiTheme$textField = muiTheme.textField;
  var borderColor = _muiTheme$textField.borderColor;
  var disabledTextColor = _muiTheme$textField.disabledTextColor;
  var errorColor = _muiTheme$textField.errorColor;
  var focusColor = _muiTheme$textField.focusColor;
  var styles = {
    root: {
      border: 'none',
      borderBottom: 'solid 1px',
      borderColor: borderColor,
      bottom: 8,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%'
    },
    disabled: {
      borderBottom: 'dotted 2px',
      borderColor: disabledTextColor
    },
    focus: {
      borderBottom: 'solid 2px',
      borderColor: focusColor,
      transform: 'scaleX(0)',
      transition: _transitions2.default.easeOut()
    },
    error: {
      borderColor: errorStyleColor ? errorStyleColor : errorColor,
      transform: 'scaleX(1)'
    }
  };
  var underline = (0, _simpleAssign2.default)({}, styles.root, style);
  var focusedUnderline = (0, _simpleAssign2.default)({}, underline, styles.focus, focusStyle);
  if (disabled)
    underline = (0, _simpleAssign2.default)({}, underline, styles.disabled, disabledStyle);
  if (focus)
    focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, {transform: 'scaleX(1)'});
  if (error)
    focusedUnderline = (0, _simpleAssign2.default)({}, focusedUnderline, styles.error);
  return _react2.default.createElement('div', null, _react2.default.createElement('hr', {style: prepareStyles(underline)}), _react2.default.createElement('hr', {style: prepareStyles(focusedUnderline)}));
};
TextFieldUnderline.propTypes = propTypes;
TextFieldUnderline.defaultProps = defaultProps;
exports.default = TextFieldUnderline;
