/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _dateUtils = require('./dateUtils');
var _EnhancedButton = require('../internal/EnhancedButton');
var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function getStyles(props, context) {
  var date = props.date;
  var disabled = props.disabled;
  var selected = props.selected;
  var hover = context.hover;
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var datePicker = _context$muiTheme.datePicker;
  var labelColor = baseTheme.palette.textColor;
  var buttonStateOpacity = 0;
  var buttonStateTransform = 'scale(0)';
  if (hover || selected) {
    labelColor = datePicker.selectTextColor;
    buttonStateOpacity = selected ? 1 : 0.6;
    buttonStateTransform = 'scale(1)';
  } else if ((0, _dateUtils.isEqualDate)(date, new Date())) {
    labelColor = datePicker.color;
  }
  return {
    root: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      position: 'relative',
      float: 'left',
      width: 41,
      padding: '4px 2px',
      opacity: disabled && '0.6'
    },
    label: {
      position: 'relative',
      color: labelColor
    },
    buttonState: {
      position: 'absolute',
      height: 36,
      width: 36,
      top: 2,
      opacity: buttonStateOpacity,
      borderRadius: '50%',
      transform: buttonStateTransform,
      transition: _transitions2.default.easeOut(),
      backgroundColor: datePicker.selectColor
    }
  };
}
var DayButton = function(_React$Component) {
  _inherits(DayButton, _React$Component);
  function DayButton() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, DayButton);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DayButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {hover: false}, _this.handleMouseEnter = function() {
      if (!_this.props.disabled)
        _this.setState({hover: true});
    }, _this.handleMouseLeave = function() {
      if (!_this.props.disabled)
        _this.setState({hover: false});
    }, _this.handleTouchTap = function(event) {
      if (!_this.props.disabled && _this.props.onTouchTap)
        _this.props.onTouchTap(event, _this.props.date);
    }, _this.handleKeyboardFocus = function(event, keyboardFocused) {
      if (!_this.props.disabled && _this.props.onKeyboardFocus) {
        _this.props.onKeyboardFocus(event, keyboardFocused, _this.props.date);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(DayButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var date = _props.date;
      var onTouchTap = _props.onTouchTap;
      var selected = _props.selected;
      var other = _objectWithoutProperties(_props, ['date', 'onTouchTap', 'selected']);
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var styles = getStyles(this.props, this.context);
      return this.props.date ? _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
        style: styles.root,
        hoverStyle: styles.hover,
        disabled: this.props.disabled,
        disableFocusRipple: true,
        disableTouchRipple: true,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onTouchTap: this.handleTouchTap,
        onKeyboardFocus: this.handleKeyboardFocus
      }), _react2.default.createElement('div', {style: prepareStyles(styles.buttonState)}), _react2.default.createElement('span', {style: prepareStyles(styles.label)}, this.props.date.getDate())) : _react2.default.createElement('span', {style: prepareStyles(styles.root)});
    }
  }]);
  return DayButton;
}(_react2.default.Component);
DayButton.propTypes = {
  date: _react2.default.PropTypes.object,
  disabled: _react2.default.PropTypes.bool,
  onKeyboardFocus: _react2.default.PropTypes.func,
  onTouchTap: _react2.default.PropTypes.func,
  selected: _react2.default.PropTypes.bool
};
DayButton.defaultProps = {
  selected: false,
  disabled: false
};
DayButton.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = DayButton;
