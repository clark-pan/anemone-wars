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
var _reactAddonsTransitionGroup = require('react-addons-transition-group');
var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);
var _dom = require('../utils/dom');
var _dom2 = _interopRequireDefault(_dom);
var _CircleRipple = require('./CircleRipple');
var _CircleRipple2 = _interopRequireDefault(_CircleRipple);
var _reactAddonsUpdate = require('react-addons-update');
var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
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
function push(array, obj) {
  var newObj = Array.isArray(obj) ? obj : [obj];
  return (0, _reactAddonsUpdate2.default)(array, {$push: newObj});
}
function shift(array) {
  return (0, _reactAddonsUpdate2.default)(array, {$splice: [[0, 1]]});
}
var TouchRipple = function(_React$Component) {
  _inherits(TouchRipple, _React$Component);
  function TouchRipple(props, context) {
    _classCallCheck(this, TouchRipple);
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TouchRipple).call(this, props, context));
    _this.handleMouseDown = function(event) {
      if (event.button === 0) {
        _this.start(event, false);
      }
    };
    _this.handleMouseUp = function() {
      _this.end();
    };
    _this.handleMouseLeave = function() {
      _this.end();
    };
    _this.handleTouchStart = function(event) {
      event.stopPropagation();
      if (_this.props.abortOnScroll && event.touches) {
        _this.startListeningForScrollAbort(event);
        _this.startTime = Date.now();
      }
      _this.start(event, true);
    };
    _this.handleTouchEnd = function() {
      _this.end();
    };
    _this.handleTouchMove = function(event) {
      var timeSinceStart = Math.abs(Date.now() - _this.startTime);
      if (timeSinceStart > 300) {
        _this.stopListeningForScrollAbort();
        return;
      }
      var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
      var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);
      if (deltaY > 6 || deltaX > 6) {
        var currentRipples = _this.state.ripples;
        var ripple = currentRipples[0];
        var abortedRipple = _react2.default.cloneElement(ripple, {aborted: true});
        currentRipples = shift(currentRipples);
        currentRipples = push(currentRipples, abortedRipple);
        _this.setState({ripples: currentRipples}, function() {
          _this.end();
        });
      }
    };
    _this.ignoreNextMouseDown = false;
    _this.state = {
      hasRipples: false,
      nextKey: 0,
      ripples: []
    };
    return _this;
  }
  _createClass(TouchRipple, [{
    key: 'start',
    value: function start(event, isRippleTouchGenerated) {
      var theme = this.context.muiTheme.ripple;
      if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        this.ignoreNextMouseDown = false;
        return;
      }
      var ripples = this.state.ripples;
      ripples = push(ripples, _react2.default.createElement(_CircleRipple2.default, {
        key: this.state.nextKey,
        style: !this.props.centerRipple ? this.getRippleStyle(event) : {},
        color: this.props.color || theme.color,
        opacity: this.props.opacity,
        touchGenerated: isRippleTouchGenerated
      }));
      this.ignoreNextMouseDown = isRippleTouchGenerated;
      this.setState({
        hasRipples: true,
        nextKey: this.state.nextKey + 1,
        ripples: ripples
      });
    }
  }, {
    key: 'end',
    value: function end() {
      var currentRipples = this.state.ripples;
      this.setState({ripples: shift(currentRipples)});
      if (this.props.abortOnScroll) {
        this.stopListeningForScrollAbort();
      }
    }
  }, {
    key: 'startListeningForScrollAbort',
    value: function startListeningForScrollAbort(event) {
      this.firstTouchY = event.touches[0].clientY;
      this.firstTouchX = event.touches[0].clientX;
      document.body.addEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'stopListeningForScrollAbort',
    value: function stopListeningForScrollAbort() {
      document.body.removeEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'getRippleStyle',
    value: function getRippleStyle(event) {
      var style = {};
      var el = _reactDom2.default.findDOMNode(this);
      var elHeight = el.offsetHeight;
      var elWidth = el.offsetWidth;
      var offset = _dom2.default.offset(el);
      var isTouchEvent = event.touches && event.touches.length;
      var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
      var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
      var pointerX = pageX - offset.left;
      var pointerY = pageY - offset.top;
      var topLeftDiag = this.calcDiag(pointerX, pointerY);
      var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
      var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      var rippleSize = rippleRadius * 2;
      var left = pointerX - rippleRadius;
      var top = pointerY - rippleRadius;
      style.height = rippleSize + 'px';
      style.width = rippleSize + 'px';
      style.top = top + 'px';
      style.left = left + 'px';
      return style;
    }
  }, {
    key: 'calcDiag',
    value: function calcDiag(a, b) {
      return Math.sqrt(a * a + b * b);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var style = _props.style;
      var _state = this.state;
      var hasRipples = _state.hasRipples;
      var ripples = _state.ripples;
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var rippleGroup = void 0;
      if (hasRipples) {
        var mergedStyles = (0, _simpleAssign2.default)({
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden'
        }, style);
        rippleGroup = _react2.default.createElement(_reactAddonsTransitionGroup2.default, {style: prepareStyles(mergedStyles)}, ripples);
      }
      return _react2.default.createElement('div', {
        onMouseUp: this.handleMouseUp,
        onMouseDown: this.handleMouseDown,
        onMouseLeave: this.handleMouseLeave,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd
      }, rippleGroup, children);
    }
  }]);
  return TouchRipple;
}(_react2.default.Component);
TouchRipple.propTypes = {
  abortOnScroll: _react2.default.PropTypes.bool,
  centerRipple: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  color: _react2.default.PropTypes.string,
  opacity: _react2.default.PropTypes.number,
  style: _react2.default.PropTypes.object
};
TouchRipple.defaultProps = {abortOnScroll: true};
TouchRipple.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = TouchRipple;
