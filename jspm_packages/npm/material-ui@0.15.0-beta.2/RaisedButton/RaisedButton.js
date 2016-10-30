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
var _colorManipulator = require('../utils/colorManipulator');
var _childUtils = require('../utils/childUtils');
var _EnhancedButton = require('../internal/EnhancedButton');
var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);
var _Paper = require('../Paper/index');
var _Paper2 = _interopRequireDefault(_Paper);
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
function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label && !props.icon) {
    return new Error('Required prop label or children or icon was not specified in ' + componentName + '.');
  }
}
function getStyles(props, context, state) {
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var button = _context$muiTheme.button;
  var raisedButton = _context$muiTheme.raisedButton;
  var disabled = props.disabled;
  var disabledBackgroundColor = props.disabledBackgroundColor;
  var disabledLabelColor = props.disabledLabelColor;
  var fullWidth = props.fullWidth;
  var icon = props.icon;
  var label = props.label;
  var labelPosition = props.labelPosition;
  var primary = props.primary;
  var secondary = props.secondary;
  var style = props.style;
  var amount = primary || secondary ? 0.4 : 0.08;
  var backgroundColor = raisedButton.color;
  var labelColor = raisedButton.textColor;
  if (disabled) {
    backgroundColor = disabledBackgroundColor || raisedButton.disabledColor;
    labelColor = disabledLabelColor || raisedButton.disabledTextColor;
  } else if (primary) {
    backgroundColor = raisedButton.primaryColor;
    labelColor = raisedButton.primaryTextColor;
  } else if (secondary) {
    backgroundColor = raisedButton.secondaryColor;
    labelColor = raisedButton.secondaryTextColor;
  } else {
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor;
    }
    if (props.labelColor) {
      labelColor = props.labelColor;
    }
  }
  var buttonHeight = style && style.height || button.height + 'px';
  return {
    root: {
      display: 'inline-block',
      minWidth: fullWidth ? '100%' : button.minWidth,
      height: buttonHeight,
      transition: _transitions2.default.easeOut()
    },
    container: {
      lineHeight: buttonHeight,
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      borderRadius: 2,
      transition: _transitions2.default.easeOut(),
      backgroundColor: backgroundColor,
      textAlign: 'center'
    },
    label: {
      position: 'relative',
      verticalAlign: 'middle',
      opacity: 1,
      fontSize: '14px',
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      color: labelColor
    },
    icon: {
      verticalAlign: 'middle',
      marginLeft: label && labelPosition !== 'before' ? 12 : 0,
      marginRight: label && labelPosition === 'before' ? 12 : 0
    },
    overlay: {
      height: buttonHeight,
      backgroundColor: (state.keyboardFocused || state.hovered) && !disabled && (0, _colorManipulator.fade)(labelColor, amount),
      transition: _transitions2.default.easeOut(),
      top: 0
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16
    }
  };
}
var RaisedButton = function(_React$Component) {
  _inherits(RaisedButton, _React$Component);
  function RaisedButton() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, RaisedButton);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RaisedButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false,
      touched: false,
      initialZDepth: 0,
      zDepth: 0
    }, _this.handleMouseDown = function(event) {
      if (event.button === 0) {
        _this.setState({zDepth: _this.state.initialZDepth + 1});
      }
      if (_this.props.onMouseDown)
        _this.props.onMouseDown(event);
    }, _this.handleMouseUp = function(event) {
      _this.setState({zDepth: _this.state.initialZDepth});
      if (_this.props.onMouseUp)
        _this.props.onMouseUp(event);
    }, _this.handleMouseLeave = function(event) {
      if (!_this.refs.container.isKeyboardFocused())
        _this.setState({
          zDepth: _this.state.initialZDepth,
          hovered: false
        });
      if (_this.props.onMouseLeave)
        _this.props.onMouseLeave(event);
    }, _this.handleMouseEnter = function(event) {
      if (!_this.refs.container.isKeyboardFocused() && !_this.state.touch) {
        _this.setState({hovered: true});
      }
      if (_this.props.onMouseEnter)
        _this.props.onMouseEnter(event);
    }, _this.handleTouchStart = function(event) {
      _this.setState({
        touch: true,
        zDepth: _this.state.initialZDepth + 1
      });
      if (_this.props.onTouchStart)
        _this.props.onTouchStart(event);
    }, _this.handleTouchEnd = function(event) {
      _this.setState({zDepth: _this.state.initialZDepth});
      if (_this.props.onTouchEnd)
        _this.props.onTouchEnd(event);
    }, _this.handleKeyboardFocus = function(event, keyboardFocused) {
      var zDepth = keyboardFocused && !_this.props.disabled ? _this.state.initialZDepth + 1 : _this.state.initialZDepth;
      _this.setState({
        zDepth: zDepth,
        keyboardFocused: keyboardFocused
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(RaisedButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var zDepth = this.props.disabled ? 0 : 1;
      this.setState({
        zDepth: zDepth,
        initialZDepth: zDepth
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var zDepth = nextProps.disabled ? 0 : 1;
      this.setState({
        zDepth: zDepth,
        initialZDepth: zDepth
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var disabled = _props.disabled;
      var icon = _props.icon;
      var label = _props.label;
      var labelPosition = _props.labelPosition;
      var labelStyle = _props.labelStyle;
      var primary = _props.primary;
      var rippleStyle = _props.rippleStyle;
      var secondary = _props.secondary;
      var other = _objectWithoutProperties(_props, ['children', 'className', 'disabled', 'icon', 'label', 'labelPosition', 'labelStyle', 'primary', 'rippleStyle', 'secondary']);
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var styles = getStyles(this.props, this.context, this.state);
      var mergedRippleStyles = (0, _simpleAssign2.default)({}, styles.ripple, rippleStyle);
      var buttonEventHandlers = disabled ? {} : {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyboardFocus: this.handleKeyboardFocus
      };
      var labelElement = label && _react2.default.createElement('span', {style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle))}, label);
      var iconCloned = icon && _react2.default.cloneElement(icon, {
        color: styles.label.color,
        style: styles.icon
      });
      var childrenFragment = labelPosition === 'before' ? {
        labelElement: labelElement,
        iconCloned: iconCloned,
        children: children
      } : {
        children: children,
        iconCloned: iconCloned,
        labelElement: labelElement
      };
      var enhancedButtonChildren = (0, _childUtils.createChildFragment)(childrenFragment);
      return _react2.default.createElement(_Paper2.default, {
        className: className,
        style: (0, _simpleAssign2.default)(styles.root, this.props.style),
        zDepth: this.state.zDepth
      }, _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, buttonEventHandlers, {
        ref: 'container',
        disabled: disabled,
        style: styles.container,
        focusRippleColor: mergedRippleStyles.color,
        touchRippleColor: mergedRippleStyles.color,
        focusRippleOpacity: mergedRippleStyles.opacity,
        touchRippleOpacity: mergedRippleStyles.opacity
      }), _react2.default.createElement('div', {
        ref: 'overlay',
        style: prepareStyles(styles.overlay)
      }, enhancedButtonChildren)));
    }
  }]);
  return RaisedButton;
}(_react2.default.Component);
RaisedButton.muiName = 'RaisedButton';
RaisedButton.propTypes = {
  backgroundColor: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  disabledBackgroundColor: _react2.default.PropTypes.string,
  disabledLabelColor: _react2.default.PropTypes.string,
  fullWidth: _react2.default.PropTypes.bool,
  href: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.node,
  label: validateLabel,
  labelColor: _react2.default.PropTypes.string,
  labelPosition: _react2.default.PropTypes.oneOf(['before', 'after']),
  labelStyle: _react2.default.PropTypes.object,
  linkButton: _react2.default.PropTypes.bool,
  onMouseDown: _react2.default.PropTypes.func,
  onMouseEnter: _react2.default.PropTypes.func,
  onMouseLeave: _react2.default.PropTypes.func,
  onMouseUp: _react2.default.PropTypes.func,
  onTouchEnd: _react2.default.PropTypes.func,
  onTouchStart: _react2.default.PropTypes.func,
  primary: _react2.default.PropTypes.bool,
  rippleStyle: _react2.default.PropTypes.object,
  secondary: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object
};
RaisedButton.defaultProps = {
  disabled: false,
  labelPosition: 'after',
  fullWidth: false,
  primary: false,
  secondary: false
};
RaisedButton.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = RaisedButton;
