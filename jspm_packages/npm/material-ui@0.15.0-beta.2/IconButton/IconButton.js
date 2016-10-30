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
var _simpleAssign = require('simple-assign');
var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _propTypes = require('../utils/propTypes');
var _propTypes2 = _interopRequireDefault(_propTypes);
var _EnhancedButton = require('../internal/EnhancedButton');
var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);
var _FontIcon = require('../FontIcon/index');
var _FontIcon2 = _interopRequireDefault(_FontIcon);
var _Tooltip = require('../internal/Tooltip');
var _Tooltip2 = _interopRequireDefault(_Tooltip);
var _childUtils = require('../utils/childUtils');
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
  var baseTheme = context.muiTheme.baseTheme;
  return {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: _transitions2.default.easeOut(),
      padding: baseTheme.spacing.iconSize / 2,
      width: baseTheme.spacing.iconSize * 2,
      height: baseTheme.spacing.iconSize * 2,
      fontSize: 0
    },
    tooltip: {boxSizing: 'border-box'},
    icon: {
      color: baseTheme.palette.textColor,
      fill: baseTheme.palette.textColor
    },
    overlay: {
      position: 'relative',
      top: 0,
      width: '100%',
      height: '100%',
      background: baseTheme.palette.disabledColor
    },
    disabled: {
      color: baseTheme.palette.disabledColor,
      fill: baseTheme.palette.disabledColor
    }
  };
}
var IconButton = function(_React$Component) {
  _inherits(IconButton, _React$Component);
  function IconButton() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, IconButton);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IconButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {tooltipShown: false}, _this.handleBlur = function(event) {
      _this.hideTooltip();
      if (_this.props.onBlur)
        _this.props.onBlur(event);
    }, _this.handleFocus = function(event) {
      _this.showTooltip();
      if (_this.props.onFocus)
        _this.props.onFocus(event);
    }, _this.handleMouseLeave = function(event) {
      if (!_this.refs.button.isKeyboardFocused())
        _this.hideTooltip();
      if (_this.props.onMouseLeave)
        _this.props.onMouseLeave(event);
    }, _this.handleMouseOut = function(event) {
      if (_this.props.disabled)
        _this.hideTooltip();
      if (_this.props.onMouseOut)
        _this.props.onMouseOut(event);
    }, _this.handleMouseEnter = function(event) {
      _this.showTooltip();
      if (_this.props.onMouseEnter)
        _this.props.onMouseEnter(event);
    }, _this.handleKeyboardFocus = function(event, keyboardFocused) {
      if (keyboardFocused && !_this.props.disabled) {
        _this.showTooltip();
        if (_this.props.onFocus)
          _this.props.onFocus(event);
      } else if (!_this.state.hovered) {
        _this.hideTooltip();
        if (_this.props.onBlur)
          _this.props.onBlur(event);
      }
      if (_this.props.onKeyboardFocus)
        _this.props.onKeyboardFocus(event, keyboardFocused);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(IconButton, [{
    key: 'setKeyboardFocus',
    value: function setKeyboardFocus() {
      this.refs.button.setKeyboardFocus();
    }
  }, {
    key: 'showTooltip',
    value: function showTooltip() {
      if (this.props.tooltip) {
        this.setState({tooltipShown: true});
      }
    }
  }, {
    key: 'hideTooltip',
    value: function hideTooltip() {
      if (this.props.tooltip)
        this.setState({tooltipShown: false});
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var disabled = _props.disabled;
      var disableTouchRipple = _props.disableTouchRipple;
      var iconClassName = _props.iconClassName;
      var tooltip = _props.tooltip;
      var touch = _props.touch;
      var iconStyle = _props.iconStyle;
      var other = _objectWithoutProperties(_props, ['disabled', 'disableTouchRipple', 'iconClassName', 'tooltip', 'touch', 'iconStyle']);
      var fonticon = void 0;
      var styles = getStyles(this.props, this.context);
      var tooltipPosition = this.props.tooltipPosition.split('-');
      var tooltipElement = tooltip ? _react2.default.createElement(_Tooltip2.default, {
        ref: 'tooltip',
        label: tooltip,
        show: this.state.tooltipShown,
        touch: touch,
        style: (0, _simpleAssign2.default)(styles.tooltip, this.props.tooltipStyles),
        verticalPosition: tooltipPosition[0],
        horizontalPosition: tooltipPosition[1]
      }) : null;
      if (iconClassName) {
        var iconHoverColor = iconStyle.iconHoverColor;
        var iconStyleFontIcon = _objectWithoutProperties(iconStyle, ['iconHoverColor']);
        fonticon = _react2.default.createElement(_FontIcon2.default, {
          className: iconClassName,
          hoverColor: disabled ? null : iconHoverColor,
          style: (0, _simpleAssign2.default)(styles.icon, disabled && styles.disabled, iconStyleFontIcon)
        }, this.props.children);
      }
      var childrenStyle = disabled ? (0, _simpleAssign2.default)({}, iconStyle, styles.disabled) : iconStyle;
      return _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
        ref: 'button',
        centerRipple: true,
        disabled: disabled,
        style: (0, _simpleAssign2.default)(styles.root, this.props.style),
        disableTouchRipple: disableTouchRipple,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        onMouseOut: this.handleMouseOut,
        onKeyboardFocus: this.handleKeyboardFocus
      }), tooltipElement, fonticon, (0, _childUtils.extendChildren)(this.props.children, {style: childrenStyle}));
    }
  }]);
  return IconButton;
}(_react2.default.Component);
IconButton.muiName = 'IconButton';
IconButton.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  disableTouchRipple: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  iconClassName: _react2.default.PropTypes.string,
  iconStyle: _react2.default.PropTypes.object,
  onBlur: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onKeyboardFocus: _react2.default.PropTypes.func,
  onMouseEnter: _react2.default.PropTypes.func,
  onMouseLeave: _react2.default.PropTypes.func,
  onMouseOut: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object,
  tooltip: _react2.default.PropTypes.node,
  tooltipPosition: _propTypes2.default.cornersAndCenter,
  tooltipStyles: _react2.default.PropTypes.object,
  touch: _react2.default.PropTypes.bool
};
IconButton.defaultProps = {
  disabled: false,
  disableTouchRipple: false,
  iconStyle: {},
  tooltipPosition: 'bottom-center',
  touch: false
};
IconButton.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = IconButton;
