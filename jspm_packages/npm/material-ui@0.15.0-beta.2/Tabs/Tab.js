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
  var tabs = context.muiTheme.tabs;
  return {
    root: {
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      fontWeight: 500,
      fontSize: 14,
      width: props.width,
      textTransform: 'uppercase',
      padding: 0
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: props.label && props.icon ? 72 : 48
    }
  };
}
var Tab = function(_React$Component) {
  _inherits(Tab, _React$Component);
  function Tab() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, Tab);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tab)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTap = function(event) {
      if (_this.props.onTouchTap) {
        _this.props.onTouchTap(_this.props.value, event, _this);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var onActive = _props.onActive;
      var onTouchTap = _props.onTouchTap;
      var selected = _props.selected;
      var value = _props.value;
      var width = _props.width;
      var label = _props.label;
      var style = _props.style;
      var icon = _props.icon;
      var other = _objectWithoutProperties(_props, ['onActive', 'onTouchTap', 'selected', 'value', 'width', 'label', 'style', 'icon']);
      var styles = getStyles(this.props, this.context);
      var iconElement = void 0;
      if (icon && _react2.default.isValidElement(icon)) {
        var iconProps = {style: {
            fontSize: 24,
            color: styles.root.color,
            marginBottom: label ? 5 : 0
          }};
        if (icon.type.muiName !== 'FontIcon') {
          iconProps.color = styles.root.color;
        }
        iconElement = _react2.default.cloneElement(icon, iconProps);
      }
      var rippleOpacity = 0.3;
      var rippleColor = this.context.muiTheme.tabs.selectedTextColor;
      return _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
        style: (0, _simpleAssign2.default)(styles.root, style),
        focusRippleColor: rippleColor,
        touchRippleColor: rippleColor,
        focusRippleOpacity: rippleOpacity,
        touchRippleOpacity: rippleOpacity,
        onTouchTap: this.handleTouchTap
      }), _react2.default.createElement('div', {style: styles.button}, iconElement, label));
    }
  }]);
  return Tab;
}(_react2.default.Component);
Tab.muiName = 'Tab';
Tab.propTypes = {
  className: _react2.default.PropTypes.string,
  icon: _react2.default.PropTypes.node,
  label: _react2.default.PropTypes.node,
  onActive: _react2.default.PropTypes.func,
  onTouchTap: _react2.default.PropTypes.func,
  selected: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object,
  value: _react2.default.PropTypes.any,
  width: _react2.default.PropTypes.string
};
Tab.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = Tab;
