/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
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
var _reactEventListener = require('react-event-listener');
var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
var _keycode = require('keycode');
var _keycode2 = _interopRequireDefault(_keycode);
var _autoPrefix = require('../utils/autoPrefix');
var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _Overlay = require('../internal/Overlay');
var _Overlay2 = _interopRequireDefault(_Overlay);
var _Paper = require('../Paper/index');
var _Paper2 = _interopRequireDefault(_Paper);
var _propTypes = require('../utils/propTypes');
var _propTypes2 = _interopRequireDefault(_propTypes);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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
var openNavEventHandler = null;
var Drawer = function(_React$Component) {
  _inherits(Drawer, _React$Component);
  function Drawer() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, Drawer);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Drawer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTapOverlay = function(event) {
      event.preventDefault();
      _this.close('clickaway');
    }, _this.handleKeyUp = function(event) {
      if (_this.state.open && !_this.props.docked && (0, _keycode2.default)(event) === 'esc') {
        _this.close('escape');
      }
    }, _this.onBodyTouchStart = function(event) {
      var swipeAreaWidth = _this.props.swipeAreaWidth;
      var touchStartX = event.touches[0].pageX;
      var touchStartY = event.touches[0].pageY;
      if (swipeAreaWidth !== null && !_this.state.open) {
        if (_this.props.openSecondary) {
          if (touchStartX < document.body.offsetWidth - swipeAreaWidth)
            return;
        } else {
          if (touchStartX > swipeAreaWidth)
            return;
        }
      }
      if (!_this.state.open && (openNavEventHandler !== _this.onBodyTouchStart || _this.props.disableSwipeToOpen)) {
        return;
      }
      _this.maybeSwiping = true;
      _this.touchStartX = touchStartX;
      _this.touchStartY = touchStartY;
      document.body.addEventListener('touchmove', _this.onBodyTouchMove);
      document.body.addEventListener('touchend', _this.onBodyTouchEnd);
      document.body.addEventListener('touchcancel', _this.onBodyTouchEnd);
    }, _this.onBodyTouchMove = function(event) {
      var currentX = event.touches[0].pageX;
      var currentY = event.touches[0].pageY;
      if (_this.state.swiping) {
        event.preventDefault();
        _this.setPosition(_this.getTranslateX(currentX));
      } else if (_this.maybeSwiping) {
        var dXAbs = Math.abs(currentX - _this.touchStartX);
        var dYAbs = Math.abs(currentY - _this.touchStartY);
        var threshold = 10;
        if (dXAbs > threshold && dYAbs <= threshold) {
          _this.swipeStartX = currentX;
          _this.setState({swiping: _this.state.open ? 'closing' : 'opening'});
          _this.setPosition(_this.getTranslateX(currentX));
        } else if (dXAbs <= threshold && dYAbs > threshold) {
          _this.onBodyTouchEnd();
        }
      }
    }, _this.onBodyTouchEnd = function(event) {
      if (_this.state.swiping) {
        var currentX = event.changedTouches[0].pageX;
        var translateRatio = _this.getTranslateX(currentX) / _this.getMaxTranslateX();
        _this.maybeSwiping = false;
        var swiping = _this.state.swiping;
        _this.setState({swiping: null});
        if (translateRatio > 0.5) {
          if (swiping === 'opening') {
            _this.setPosition(_this.getMaxTranslateX());
          } else {
            _this.close('swipe');
          }
        } else {
          if (swiping === 'opening') {
            _this.open('swipe');
          } else {
            _this.setPosition(0);
          }
        }
      } else {
        _this.maybeSwiping = false;
      }
      document.body.removeEventListener('touchmove', _this.onBodyTouchMove);
      document.body.removeEventListener('touchend', _this.onBodyTouchEnd);
      document.body.removeEventListener('touchcancel', _this.onBodyTouchEnd);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(Drawer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.maybeSwiping = false;
      this.touchStartX = null;
      this.touchStartY = null;
      this.swipeStartX = null;
      this.setState({
        open: this.props.open !== null ? this.props.open : this.props.docked,
        swiping: null
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enableSwipeHandling();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open !== null) {
        this.setState({open: nextProps.open});
      } else if (this.props.docked !== nextProps.docked) {
        this.setState({open: nextProps.docked});
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.enableSwipeHandling();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.disableSwipeHandling();
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var muiTheme = this.context.muiTheme;
      var theme = muiTheme.navDrawer;
      var x = this.getTranslateMultiplier() * (this.state.open ? 0 : this.getMaxTranslateX());
      var styles = {
        root: {
          height: '100%',
          width: this.props.width || theme.width,
          position: 'fixed',
          zIndex: muiTheme.zIndex.navDrawer,
          left: 0,
          top: 0,
          transform: 'translate3d(' + x + 'px, 0, 0)',
          transition: !this.state.swiping && _transitions2.default.easeOut(null, 'transform', null),
          backgroundColor: theme.color,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'
        },
        overlay: {
          zIndex: muiTheme.zIndex.drawerOverlay,
          pointerEvents: this.state.open ? 'auto' : 'none'
        },
        rootWhenOpenRight: {
          left: 'auto',
          right: 0
        }
      };
      return styles;
    }
  }, {
    key: 'shouldShow',
    value: function shouldShow() {
      return this.state.open || !!this.state.swiping;
    }
  }, {
    key: 'close',
    value: function close(reason) {
      if (this.props.open === null)
        this.setState({open: false});
      if (this.props.onRequestChange)
        this.props.onRequestChange(false, reason);
      return this;
    }
  }, {
    key: 'open',
    value: function open(reason) {
      if (this.props.open === null)
        this.setState({open: true});
      if (this.props.onRequestChange)
        this.props.onRequestChange(true, reason);
      return this;
    }
  }, {
    key: 'getMaxTranslateX',
    value: function getMaxTranslateX() {
      var width = this.props.width || this.context.muiTheme.navDrawer.width;
      return width + 10;
    }
  }, {
    key: 'getTranslateMultiplier',
    value: function getTranslateMultiplier() {
      return this.props.openSecondary ? 1 : -1;
    }
  }, {
    key: 'enableSwipeHandling',
    value: function enableSwipeHandling() {
      if (!this.props.docked) {
        document.body.addEventListener('touchstart', this.onBodyTouchStart);
        if (!openNavEventHandler) {
          openNavEventHandler = this.onBodyTouchStart;
        }
      } else {
        this.disableSwipeHandling();
      }
    }
  }, {
    key: 'disableSwipeHandling',
    value: function disableSwipeHandling() {
      document.body.removeEventListener('touchstart', this.onBodyTouchStart);
      if (openNavEventHandler === this.onBodyTouchStart) {
        openNavEventHandler = null;
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(translateX) {
      var drawer = _reactDom2.default.findDOMNode(this.refs.clickAwayableElement);
      var transformCSS = 'translate3d(' + this.getTranslateMultiplier() * translateX + 'px, 0, 0)';
      this.refs.overlay.setOpacity(1 - translateX / this.getMaxTranslateX());
      _autoPrefix2.default.set(drawer.style, 'transform', transformCSS);
    }
  }, {
    key: 'getTranslateX',
    value: function getTranslateX(currentX) {
      return Math.min(Math.max(this.state.swiping === 'closing' ? this.getTranslateMultiplier() * (currentX - this.swipeStartX) : this.getMaxTranslateX() - this.getTranslateMultiplier() * (this.swipeStartX - currentX), 0), this.getMaxTranslateX());
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var containerClassName = _props.containerClassName;
      var containerStyle = _props.containerStyle;
      var docked = _props.docked;
      var openSecondary = _props.openSecondary;
      var overlayClassName = _props.overlayClassName;
      var overlayStyle = _props.overlayStyle;
      var style = _props.style;
      var zDepth = _props.zDepth;
      var styles = this.getStyles();
      var overlay = void 0;
      if (!docked) {
        overlay = _react2.default.createElement(_Overlay2.default, {
          ref: 'overlay',
          show: this.shouldShow(),
          className: overlayClassName,
          style: (0, _simpleAssign2.default)(styles.overlay, overlayStyle),
          transitionEnabled: !this.state.swiping,
          onTouchTap: this.handleTouchTapOverlay
        });
      }
      return _react2.default.createElement('div', {
        className: className,
        style: style
      }, _react2.default.createElement(_reactEventListener2.default, {
        elementName: 'window',
        onKeyUp: this.handleKeyUp
      }), overlay, _react2.default.createElement(_Paper2.default, {
        ref: 'clickAwayableElement',
        zDepth: zDepth,
        rounded: false,
        transitionEnabled: !this.state.swiping,
        className: containerClassName,
        style: (0, _simpleAssign2.default)(styles.root, openSecondary && styles.rootWhenOpenRight, containerStyle)
      }, children));
    }
  }]);
  return Drawer;
}(_react2.default.Component);
Drawer.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  containerClassName: _react2.default.PropTypes.string,
  containerStyle: _react2.default.PropTypes.object,
  disableSwipeToOpen: _react2.default.PropTypes.bool,
  docked: _react2.default.PropTypes.bool,
  onRequestChange: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  openSecondary: _react2.default.PropTypes.bool,
  overlayClassName: _react2.default.PropTypes.string,
  overlayStyle: _react2.default.PropTypes.object,
  style: _react2.default.PropTypes.object,
  swipeAreaWidth: _react2.default.PropTypes.number,
  width: _react2.default.PropTypes.number,
  zDepth: _propTypes2.default.zDepth
};
Drawer.defaultProps = {
  disableSwipeToOpen: false,
  docked: true,
  open: null,
  openSecondary: false,
  swipeAreaWidth: 30,
  width: null,
  zDepth: 2
};
Drawer.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = Drawer;
