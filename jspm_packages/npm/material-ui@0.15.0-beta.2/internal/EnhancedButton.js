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
var _childUtils = require('../utils/childUtils');
var _events = require('../utils/events');
var _events2 = _interopRequireDefault(_events);
var _keycode = require('keycode');
var _keycode2 = _interopRequireDefault(_keycode);
var _FocusRipple = require('./FocusRipple');
var _FocusRipple2 = _interopRequireDefault(_FocusRipple);
var _TouchRipple = require('./TouchRipple');
var _TouchRipple2 = _interopRequireDefault(_TouchRipple);
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
var styleInjected = false;
var listening = false;
var tabPressed = false;
function injectStyle() {
  if (!styleInjected) {
    var style = document.createElement('style');
    style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';
    document.body.appendChild(style);
    styleInjected = true;
  }
}
function listenForTabPresses() {
  if (!listening) {
    _events2.default.on(window, 'keydown', function(event) {
      tabPressed = (0, _keycode2.default)(event) === 'tab';
    });
    listening = true;
  }
}
var EnhancedButton = function(_React$Component) {
  _inherits(EnhancedButton, _React$Component);
  function EnhancedButton() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, EnhancedButton);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EnhancedButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {isKeyboardFocused: false}, _this.handleKeyDown = function(event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'enter' && _this.state.isKeyboardFocused) {
          _this.handleTouchTap(event);
        }
      }
      _this.props.onKeyDown(event);
    }, _this.handleKeyUp = function(event) {
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'space' && _this.state.isKeyboardFocused) {
          _this.handleTouchTap(event);
        }
      }
      _this.props.onKeyUp(event);
    }, _this.handleBlur = function(event) {
      _this.cancelFocusTimeout();
      _this.removeKeyboardFocus(event);
      _this.props.onBlur(event);
    }, _this.handleFocus = function(event) {
      if (event)
        event.persist();
      if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
        _this.focusTimeout = setTimeout(function() {
          if (tabPressed) {
            _this.setKeyboardFocus(event);
          }
        }, 150);
        _this.props.onFocus(event);
      }
    }, _this.handleClick = function(event) {
      if (!_this.props.disabled) {
        tabPressed = false;
        _this.props.onClick(event);
      }
    }, _this.handleTouchTap = function(event) {
      _this.cancelFocusTimeout();
      if (!_this.props.disabled) {
        tabPressed = false;
        _this.removeKeyboardFocus(event);
        _this.props.onTouchTap(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(EnhancedButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var disabled = _props.disabled;
      var disableKeyboardFocus = _props.disableKeyboardFocus;
      var keyboardFocused = _props.keyboardFocused;
      if (!disabled && keyboardFocused && !disableKeyboardFocus) {
        this.setState({isKeyboardFocused: true});
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      injectStyle();
      listenForTabPresses();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
        this.setState({isKeyboardFocused: false});
        if (nextProps.onKeyboardFocus) {
          nextProps.onKeyboardFocus(null, false);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.focusTimeout);
    }
  }, {
    key: 'isKeyboardFocused',
    value: function isKeyboardFocused() {
      return this.state.isKeyboardFocused;
    }
  }, {
    key: 'removeKeyboardFocus',
    value: function removeKeyboardFocus(event) {
      if (this.state.isKeyboardFocused) {
        this.setState({isKeyboardFocused: false});
        this.props.onKeyboardFocus(event, false);
      }
    }
  }, {
    key: 'setKeyboardFocus',
    value: function setKeyboardFocus(event) {
      if (!this.state.isKeyboardFocused) {
        this.setState({isKeyboardFocused: true});
        this.props.onKeyboardFocus(event, true);
      }
    }
  }, {
    key: 'cancelFocusTimeout',
    value: function cancelFocusTimeout() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
    }
  }, {
    key: 'createButtonChildren',
    value: function createButtonChildren() {
      var _props2 = this.props;
      var centerRipple = _props2.centerRipple;
      var children = _props2.children;
      var disabled = _props2.disabled;
      var disableFocusRipple = _props2.disableFocusRipple;
      var disableKeyboardFocus = _props2.disableKeyboardFocus;
      var disableTouchRipple = _props2.disableTouchRipple;
      var focusRippleColor = _props2.focusRippleColor;
      var focusRippleOpacity = _props2.focusRippleOpacity;
      var touchRippleColor = _props2.touchRippleColor;
      var touchRippleOpacity = _props2.touchRippleOpacity;
      var isKeyboardFocused = this.state.isKeyboardFocused;
      var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? _react2.default.createElement(_FocusRipple2.default, {
        color: focusRippleColor,
        opacity: focusRippleOpacity,
        show: isKeyboardFocused
      }) : undefined;
      var touchRipple = !disabled && !disableTouchRipple ? _react2.default.createElement(_TouchRipple2.default, {
        centerRipple: centerRipple,
        color: touchRippleColor,
        opacity: touchRippleOpacity
      }, children) : undefined;
      return (0, _childUtils.createChildFragment)({
        focusRipple: focusRipple,
        touchRipple: touchRipple,
        children: touchRipple ? undefined : children
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var centerRipple = _props3.centerRipple;
      var children = _props3.children;
      var containerElement = _props3.containerElement;
      var disabled = _props3.disabled;
      var disableFocusRipple = _props3.disableFocusRipple;
      var disableKeyboardFocus = _props3.disableKeyboardFocus;
      var disableTouchRipple = _props3.disableTouchRipple;
      var focusRippleColor = _props3.focusRippleColor;
      var focusRippleOpacity = _props3.focusRippleOpacity;
      var linkButton = _props3.linkButton;
      var touchRippleColor = _props3.touchRippleColor;
      var touchRippleOpacity = _props3.touchRippleOpacity;
      var onBlur = _props3.onBlur;
      var onClick = _props3.onClick;
      var onFocus = _props3.onFocus;
      var onKeyUp = _props3.onKeyUp;
      var onKeyDown = _props3.onKeyDown;
      var onTouchTap = _props3.onTouchTap;
      var style = _props3.style;
      var tabIndex = _props3.tabIndex;
      var type = _props3.type;
      var other = _objectWithoutProperties(_props3, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'linkButton', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onClick', 'onFocus', 'onKeyUp', 'onKeyDown', 'onTouchTap', 'style', 'tabIndex', 'type']);
      var _context$muiTheme = this.context.muiTheme;
      var prepareStyles = _context$muiTheme.prepareStyles;
      var enhancedButton = _context$muiTheme.enhancedButton;
      var mergedStyles = (0, _simpleAssign2.default)({
        border: 10,
        background: 'none',
        boxSizing: 'border-box',
        display: 'inline-block',
        fontFamily: this.context.muiTheme.baseTheme.fontFamily,
        WebkitTapHighlightColor: enhancedButton.tapHighlightColor,
        cursor: disabled ? 'default' : 'pointer',
        textDecoration: 'none',
        outline: 'none',
        font: 'inherit',
        transform: disableTouchRipple && disableFocusRipple ? null : 'translate3d(0, 0, 0)',
        verticalAlign: other.hasOwnProperty('href') ? 'middle' : null
      }, style);
      if (disabled && linkButton) {
        return _react2.default.createElement('span', _extends({}, other, {style: mergedStyles}), children);
      }
      var buttonProps = _extends({}, other, {
        style: prepareStyles(mergedStyles),
        disabled: disabled,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onFocus: this.handleFocus,
        onTouchTap: this.handleTouchTap,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        tabIndex: tabIndex,
        type: type
      });
      var buttonChildren = this.createButtonChildren();
      var targetLinkElement = buttonProps.hasOwnProperty('href') ? 'a' : 'span';
      return _react2.default.isValidElement(containerElement) ? _react2.default.cloneElement(containerElement, buttonProps, buttonChildren) : _react2.default.createElement(linkButton ? targetLinkElement : containerElement, buttonProps, buttonChildren);
    }
  }]);
  return EnhancedButton;
}(_react2.default.Component);
EnhancedButton.propTypes = {
  centerRipple: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  containerElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  disableFocusRipple: _react2.default.PropTypes.bool,
  disableKeyboardFocus: _react2.default.PropTypes.bool,
  disableTouchRipple: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  focusRippleColor: _react2.default.PropTypes.string,
  focusRippleOpacity: _react2.default.PropTypes.number,
  keyboardFocused: _react2.default.PropTypes.bool,
  linkButton: _react2.default.PropTypes.bool,
  onBlur: _react2.default.PropTypes.func,
  onClick: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onKeyDown: _react2.default.PropTypes.func,
  onKeyUp: _react2.default.PropTypes.func,
  onKeyboardFocus: _react2.default.PropTypes.func,
  onTouchTap: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object,
  tabIndex: _react2.default.PropTypes.number,
  touchRippleColor: _react2.default.PropTypes.string,
  touchRippleOpacity: _react2.default.PropTypes.number,
  type: _react2.default.PropTypes.string
};
EnhancedButton.defaultProps = {
  containerElement: 'button',
  onBlur: function onBlur() {},
  onClick: function onClick() {},
  onFocus: function onFocus() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onTouchTap: function onTouchTap() {},
  tabIndex: 0,
  type: 'button'
};
EnhancedButton.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = EnhancedButton;
