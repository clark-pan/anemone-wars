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
var _reactDom = require('react-dom');
var _reactDom2 = _interopRequireDefault(_reactDom);
var _events = require('../utils/events');
var _events2 = _interopRequireDefault(_events);
var _propTypes = require('../utils/propTypes');
var _propTypes2 = _interopRequireDefault(_propTypes);
var _Menu = require('../Menu/Menu');
var _Menu2 = _interopRequireDefault(_Menu);
var _Popover = require('../Popover/Popover');
var _Popover2 = _interopRequireDefault(_Popover);
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
var IconMenu = function(_React$Component) {
  _inherits(IconMenu, _React$Component);
  function IconMenu() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, IconMenu);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IconMenu)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      menuInitiallyKeyboardFocused: false,
      open: false
    }, _this.handleItemTouchTap = function(event, child) {
      if (_this.props.touchTapCloseDelay !== 0 && !child.props.hasOwnProperty('menuItems')) {
        (function() {
          var isKeyboard = _events2.default.isKeyboard(event);
          _this.timerCloseId = setTimeout(function() {
            _this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
          }, _this.props.touchTapCloseDelay);
        })();
      }
      _this.props.onItemTouchTap(event, child);
    }, _this.handleRequestClose = function(reason) {
      _this.close(reason);
    }, _this.handleEscKeyDownMenu = function(event) {
      _this.close('escape', event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(IconMenu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open != null) {
        this.setState({
          open: nextProps.open,
          anchorEl: this.refs.iconMenuContainer
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timerCloseId);
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.state.open;
    }
  }, {
    key: 'close',
    value: function close(reason, isKeyboard) {
      var _this2 = this;
      if (!this.state.open) {
        return;
      }
      if (this.props.open !== null) {
        this.props.onRequestChange(false, reason);
      }
      this.setState({open: false}, function() {
        if (isKeyboard) {
          var iconButton = _this2.refs.iconButton;
          _reactDom2.default.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
        }
      });
    }
  }, {
    key: 'open',
    value: function open(reason, event) {
      if (this.props.open !== null) {
        this.props.onRequestChange(true, reason);
        return this.setState({
          menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
          anchorEl: event.currentTarget
        });
      }
      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
        anchorEl: event.currentTarget
      });
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;
      var _props = this.props;
      var anchorOrigin = _props.anchorOrigin;
      var className = _props.className;
      var iconButtonElement = _props.iconButtonElement;
      var iconStyle = _props.iconStyle;
      var onItemTouchTap = _props.onItemTouchTap;
      var onKeyboardFocus = _props.onKeyboardFocus;
      var onMouseDown = _props.onMouseDown;
      var onMouseLeave = _props.onMouseLeave;
      var onMouseEnter = _props.onMouseEnter;
      var onMouseUp = _props.onMouseUp;
      var onTouchTap = _props.onTouchTap;
      var menuStyle = _props.menuStyle;
      var style = _props.style;
      var targetOrigin = _props.targetOrigin;
      var useLayerForClickAway = _props.useLayerForClickAway;
      var other = _objectWithoutProperties(_props, ['anchorOrigin', 'className', 'iconButtonElement', 'iconStyle', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseLeave', 'onMouseEnter', 'onMouseUp', 'onTouchTap', 'menuStyle', 'style', 'targetOrigin', 'useLayerForClickAway']);
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var _state = this.state;
      var open = _state.open;
      var anchorEl = _state.anchorEl;
      var styles = {
        root: {
          display: 'inline-block',
          position: 'relative'
        },
        menu: {position: 'relative'}
      };
      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style);
      var mergedMenuStyles = (0, _simpleAssign2.default)(styles.menu, menuStyle);
      var iconButton = _react2.default.cloneElement(iconButtonElement, {
        onKeyboardFocus: onKeyboardFocus,
        iconStyle: (0, _simpleAssign2.default)({}, iconStyle, iconButtonElement.props.iconStyle),
        onTouchTap: function onTouchTap(event) {
          _this3.open(_events2.default.isKeyboard(event) ? 'keyboard' : 'iconTap', event);
          if (iconButtonElement.props.onTouchTap)
            iconButtonElement.props.onTouchTap(event);
        },
        ref: 'iconButton'
      });
      var menu = _react2.default.createElement(_Menu2.default, _extends({}, other, {
        animateOpen: true,
        initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
        onEscKeyDown: this.handleEscKeyDownMenu,
        onItemTouchTap: this.handleItemTouchTap,
        style: mergedMenuStyles
      }), this.props.children);
      return _react2.default.createElement('div', {
        ref: 'iconMenuContainer',
        className: className,
        onMouseDown: onMouseDown,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
        onMouseUp: onMouseUp,
        onTouchTap: onTouchTap,
        style: prepareStyles(mergedRootStyles)
      }, iconButton, _react2.default.createElement(_Popover2.default, {
        anchorOrigin: anchorOrigin,
        targetOrigin: targetOrigin,
        open: open,
        anchorEl: anchorEl,
        childContextTypes: this.constructor.childContextTypes,
        useLayerForClickAway: useLayerForClickAway,
        onRequestClose: this.handleRequestClose,
        context: this.context
      }, menu));
    }
  }]);
  return IconMenu;
}(_react2.default.Component);
IconMenu.muiName = 'IconMenu';
IconMenu.propTypes = {
  anchorOrigin: _propTypes2.default.origin,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  iconButtonElement: _react2.default.PropTypes.element.isRequired,
  iconStyle: _react2.default.PropTypes.object,
  menuStyle: _react2.default.PropTypes.object,
  multiple: _react2.default.PropTypes.bool,
  onItemTouchTap: _react2.default.PropTypes.func,
  onKeyboardFocus: _react2.default.PropTypes.func,
  onMouseDown: _react2.default.PropTypes.func,
  onMouseEnter: _react2.default.PropTypes.func,
  onMouseLeave: _react2.default.PropTypes.func,
  onMouseUp: _react2.default.PropTypes.func,
  onRequestChange: _react2.default.PropTypes.func,
  onTouchTap: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object,
  targetOrigin: _propTypes2.default.origin,
  touchTapCloseDelay: _react2.default.PropTypes.number,
  useLayerForClickAway: _react2.default.PropTypes.bool
};
IconMenu.defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  multiple: false,
  open: null,
  onItemTouchTap: function onItemTouchTap() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  onMouseDown: function onMouseDown() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseUp: function onMouseUp() {},
  onTouchTap: function onTouchTap() {},
  onRequestChange: function onRequestChange() {},
  targetOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  touchTapCloseDelay: 200,
  useLayerForClickAway: false
};
IconMenu.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = IconMenu;
