/* */ 
(function(process) {
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
  var _reactEventListener = require('react-event-listener');
  var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
  var _keycode = require('keycode');
  var _keycode2 = _interopRequireDefault(_keycode);
  var _transitions = require('../styles/transitions');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _FocusRipple = require('./FocusRipple');
  var _FocusRipple2 = _interopRequireDefault(_FocusRipple);
  var _TouchRipple = require('./TouchRipple');
  var _TouchRipple2 = _interopRequireDefault(_TouchRipple);
  var _Paper = require('../Paper/index');
  var _Paper2 = _interopRequireDefault(_Paper);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
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
        cursor: props.disabled ? 'default' : 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%'
      },
      input: {
        position: 'absolute',
        cursor: props.disabled ? 'default' : 'pointer',
        pointerEvents: 'all',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0,
        boxSizing: 'border-box',
        padding: 0,
        margin: 0
      },
      controls: {
        display: 'flex',
        width: '100%',
        height: '100%'
      },
      label: {
        float: 'left',
        position: 'relative',
        display: 'block',
        width: 'calc(100% - 60px)',
        lineHeight: '24px',
        color: baseTheme.palette.textColor,
        fontFamily: baseTheme.fontFamily
      },
      wrap: {
        transition: _transitions2.default.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'block',
        flexShrink: 0,
        width: 60 - baseTheme.spacing.desktopGutterLess,
        marginRight: props.labelPosition === 'right' ? baseTheme.spacing.desktopGutterLess : 0,
        marginLeft: props.labelPosition === 'left' ? baseTheme.spacing.desktopGutterLess : 0
      },
      ripple: {
        color: props.rippleColor || baseTheme.palette.primary1Color,
        height: '200%',
        width: '200%',
        top: -12,
        left: -12
      }
    };
  }
  var EnhancedSwitch = function(_React$Component) {
    _inherits(EnhancedSwitch, _React$Component);
    function EnhancedSwitch() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, EnhancedSwitch);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EnhancedSwitch)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {isKeyboardFocused: false}, _this.handleChange = function(event) {
        _this.tabPressed = false;
        _this.setState({isKeyboardFocused: false});
        var isInputChecked = _this.refs.checkbox.checked;
        if (!_this.props.hasOwnProperty('checked') && _this.props.onParentShouldUpdate) {
          _this.props.onParentShouldUpdate(isInputChecked);
        }
        if (_this.props.onSwitch) {
          _this.props.onSwitch(event, isInputChecked);
        }
      }, _this.handleKeyDown = function(event) {
        var code = (0, _keycode2.default)(event);
        if (code === 'tab') {
          _this.tabPressed = true;
        }
        if (_this.state.isKeyboardFocused && code === 'space') {
          _this.handleChange(event);
        }
      }, _this.handleKeyUp = function(event) {
        if (_this.state.isKeyboardFocused && (0, _keycode2.default)(event) === 'space') {
          _this.handleChange(event);
        }
      }, _this.handleMouseDown = function(event) {
        if (event.button === 0) {
          _this.refs.touchRipple.start(event);
        }
      }, _this.handleMouseUp = function() {
        _this.refs.touchRipple.end();
      }, _this.handleMouseLeave = function() {
        _this.refs.touchRipple.end();
      }, _this.handleTouchStart = function(event) {
        _this.refs.touchRipple.start(event);
      }, _this.handleTouchEnd = function() {
        _this.refs.touchRipple.end();
      }, _this.handleBlur = function(event) {
        _this.setState({isKeyboardFocused: false});
        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }
      }, _this.handleFocus = function(event) {
        setTimeout(function() {
          if (_this.tabPressed) {
            _this.setState({isKeyboardFocused: true});
          }
        }, 150);
        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(EnhancedSwitch, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var inputNode = this.refs.checkbox;
        if ((!this.props.switched || inputNode.checked !== this.props.switched) && this.props.onParentShouldUpdate) {
          this.props.onParentShouldUpdate(inputNode.checked);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var hasCheckedProp = nextProps.hasOwnProperty('checked');
        var hasToggledProp = nextProps.hasOwnProperty('toggled');
        var hasNewDefaultProp = nextProps.hasOwnProperty('defaultChecked') && nextProps.defaultChecked !== this.props.defaultChecked;
        if (hasCheckedProp || hasToggledProp || hasNewDefaultProp) {
          var switched = nextProps.checked || nextProps.toggled || nextProps.defaultChecked || false;
          this.setState({switched: switched});
          if (this.props.onParentShouldUpdate && switched !== this.props.switched) {
            this.props.onParentShouldUpdate(switched);
          }
        }
      }
    }, {
      key: 'isSwitched',
      value: function isSwitched() {
        return this.refs.checkbox.checked;
      }
    }, {
      key: 'setSwitched',
      value: function setSwitched(newSwitchedValue) {
        if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
          if (this.props.onParentShouldUpdate) {
            this.props.onParentShouldUpdate(newSwitchedValue);
          }
          this.refs.checkbox.checked = newSwitchedValue;
        } else {
          process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Cannot call set method while checked is defined as a property.') : void 0;
        }
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.refs.checkbox.value;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var name = _props.name;
        var value = _props.value;
        var iconStyle = _props.iconStyle;
        var inputStyle = _props.inputStyle;
        var inputType = _props.inputType;
        var label = _props.label;
        var labelStyle = _props.labelStyle;
        var labelPosition = _props.labelPosition;
        var onSwitch = _props.onSwitch;
        var onBlur = _props.onBlur;
        var onFocus = _props.onFocus;
        var onMouseUp = _props.onMouseUp;
        var onMouseDown = _props.onMouseDown;
        var onMouseLeave = _props.onMouseLeave;
        var onTouchStart = _props.onTouchStart;
        var onTouchEnd = _props.onTouchEnd;
        var disabled = _props.disabled;
        var disableTouchRipple = _props.disableTouchRipple;
        var disableFocusRipple = _props.disableFocusRipple;
        var className = _props.className;
        var rippleStyle = _props.rippleStyle;
        var style = _props.style;
        var switched = _props.switched;
        var switchElement = _props.switchElement;
        var thumbStyle = _props.thumbStyle;
        var trackStyle = _props.trackStyle;
        var other = _objectWithoutProperties(_props, ['name', 'value', 'iconStyle', 'inputStyle', 'inputType', 'label', 'labelStyle', 'labelPosition', 'onSwitch', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'disabled', 'disableTouchRipple', 'disableFocusRipple', 'className', 'rippleStyle', 'style', 'switched', 'switchElement', 'thumbStyle', 'trackStyle']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context);
        var wrapStyles = (0, _simpleAssign2.default)(styles.wrap, iconStyle);
        var mergedRippleStyle = (0, _simpleAssign2.default)(styles.ripple, rippleStyle);
        if (thumbStyle) {
          wrapStyles.marginLeft /= 2;
          wrapStyles.marginRight /= 2;
        }
        var labelElement = label && _react2.default.createElement('label', {style: prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle))}, label);
        var showTouchRipple = !disabled && !disableTouchRipple;
        var showFocusRipple = !disabled && !disableFocusRipple;
        var touchRipple = _react2.default.createElement(_TouchRipple2.default, {
          ref: 'touchRipple',
          key: 'touchRipple',
          style: mergedRippleStyle,
          color: mergedRippleStyle.color,
          muiTheme: this.context.muiTheme,
          centerRipple: true
        });
        var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
          key: 'focusRipple',
          innerStyle: mergedRippleStyle,
          color: mergedRippleStyle.color,
          muiTheme: this.context.muiTheme,
          show: this.state.isKeyboardFocused
        });
        var ripples = [showTouchRipple ? touchRipple : null, showFocusRipple ? focusRipple : null];
        var inputElement = _react2.default.createElement('input', _extends({}, other, {
          ref: 'checkbox',
          type: inputType,
          style: prepareStyles((0, _simpleAssign2.default)(styles.input, inputStyle)),
          name: name,
          value: value,
          disabled: disabled,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onChange: this.handleChange,
          onMouseUp: showTouchRipple && this.handleMouseUp,
          onMouseDown: showTouchRipple && this.handleMouseDown,
          onMouseLeave: showTouchRipple && this.handleMouseLeave,
          onTouchStart: showTouchRipple && this.handleTouchStart,
          onTouchEnd: showTouchRipple && this.handleTouchEnd
        }));
        var switchOrThumbElement = !thumbStyle ? _react2.default.createElement('div', {style: prepareStyles(wrapStyles)}, switchElement, ripples) : _react2.default.createElement('div', {style: prepareStyles(wrapStyles)}, _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)({}, trackStyle))}), _react2.default.createElement(_Paper2.default, {
          style: thumbStyle,
          zDepth: 1,
          circle: true
        }, ' ', ripples, ' '));
        var elementsInOrder = labelPosition === 'right' ? _react2.default.createElement('div', {style: styles.controls}, switchOrThumbElement, labelElement) : _react2.default.createElement('div', {style: styles.controls}, labelElement, switchOrThumbElement);
        return _react2.default.createElement('div', {
          ref: 'root',
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }, _react2.default.createElement(_reactEventListener2.default, {
          elementName: 'window',
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp
        }), inputElement, elementsInOrder);
      }
    }]);
    return EnhancedSwitch;
  }(_react2.default.Component);
  EnhancedSwitch.propTypes = {
    checked: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string,
    defaultChecked: _react2.default.PropTypes.bool,
    disableFocusRipple: _react2.default.PropTypes.bool,
    disableTouchRipple: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    iconStyle: _react2.default.PropTypes.object,
    inputStyle: _react2.default.PropTypes.object,
    inputType: _react2.default.PropTypes.string.isRequired,
    label: _react2.default.PropTypes.node,
    labelPosition: _react2.default.PropTypes.oneOf(['left', 'right']),
    labelStyle: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onMouseDown: _react2.default.PropTypes.func,
    onMouseLeave: _react2.default.PropTypes.func,
    onMouseUp: _react2.default.PropTypes.func,
    onParentShouldUpdate: _react2.default.PropTypes.func,
    onSwitch: _react2.default.PropTypes.func,
    onTouchEnd: _react2.default.PropTypes.func,
    onTouchStart: _react2.default.PropTypes.func,
    rippleColor: _react2.default.PropTypes.string,
    rippleStyle: _react2.default.PropTypes.object,
    style: _react2.default.PropTypes.object,
    switchElement: _react2.default.PropTypes.element.isRequired,
    switched: _react2.default.PropTypes.bool.isRequired,
    thumbStyle: _react2.default.PropTypes.object,
    trackStyle: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.string
  };
  EnhancedSwitch.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
  exports.default = EnhancedSwitch;
})(require('process'));
