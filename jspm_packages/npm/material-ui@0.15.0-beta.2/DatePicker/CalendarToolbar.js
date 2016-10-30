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
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _IconButton = require('../IconButton/index');
var _IconButton2 = _interopRequireDefault(_IconButton);
var _Toolbar = require('../Toolbar/Toolbar');
var _Toolbar2 = _interopRequireDefault(_Toolbar);
var _ToolbarGroup = require('../Toolbar/ToolbarGroup');
var _ToolbarGroup2 = _interopRequireDefault(_ToolbarGroup);
var _chevronLeft = require('../svg-icons/navigation/chevron-left');
var _chevronLeft2 = _interopRequireDefault(_chevronLeft);
var _chevronRight = require('../svg-icons/navigation/chevron-right');
var _chevronRight2 = _interopRequireDefault(_chevronRight);
var _SlideIn = require('../internal/SlideIn');
var _SlideIn2 = _interopRequireDefault(_SlideIn);
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
var styles = {
  root: {
    position: 'relative',
    padding: 0,
    backgroundColor: 'inherit'
  },
  title: {
    position: 'absolute',
    top: 17,
    lineHeight: '14px',
    fontSize: 14,
    height: 14,
    width: '100%',
    fontWeight: '500',
    textAlign: 'center'
  }
};
var CalendarToolbar = function(_React$Component) {
  _inherits(CalendarToolbar, _React$Component);
  function CalendarToolbar() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, CalendarToolbar);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CalendarToolbar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {transitionDirection: 'up'}, _this.handleTouchTapPrevMonth = function() {
      if (_this.props.onMonthChange && _this.props.prevMonth)
        _this.props.onMonthChange(-1);
    }, _this.handleTouchTapNextMonth = function() {
      if (_this.props.onMonthChange && _this.props.nextMonth)
        _this.props.onMonthChange(1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(CalendarToolbar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.displayDate !== this.props.displayDate) {
        var direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
        this.setState({transitionDirection: direction});
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var locale = _props.locale;
      var displayDate = _props.displayDate;
      var dateTimeFormatted = new DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric'
      }).format(displayDate);
      var nextButtonIcon = this.context.muiTheme.isRtl ? _react2.default.createElement(_chevronRight2.default, null) : _react2.default.createElement(_chevronLeft2.default, null);
      var prevButtonIcon = this.context.muiTheme.isRtl ? _react2.default.createElement(_chevronLeft2.default, null) : _react2.default.createElement(_chevronRight2.default, null);
      return _react2.default.createElement(_Toolbar2.default, {
        style: styles.root,
        noGutter: true
      }, _react2.default.createElement(_SlideIn2.default, {
        style: styles.title,
        direction: this.state.transitionDirection
      }, _react2.default.createElement('div', {key: dateTimeFormatted}, dateTimeFormatted)), _react2.default.createElement(_ToolbarGroup2.default, {
        key: 0,
        float: 'left'
      }, _react2.default.createElement(_IconButton2.default, {
        style: styles.button,
        disabled: !this.props.prevMonth,
        onTouchTap: this.handleTouchTapPrevMonth
      }, nextButtonIcon)), _react2.default.createElement(_ToolbarGroup2.default, {
        key: 1,
        float: 'right'
      }, _react2.default.createElement(_IconButton2.default, {
        style: styles.button,
        disabled: !this.props.nextMonth,
        onTouchTap: this.handleTouchTapNextMonth
      }, prevButtonIcon)));
    }
  }]);
  return CalendarToolbar;
}(_react2.default.Component);
CalendarToolbar.propTypes = {
  DateTimeFormat: _react2.default.PropTypes.func.isRequired,
  displayDate: _react2.default.PropTypes.object.isRequired,
  locale: _react2.default.PropTypes.string.isRequired,
  nextMonth: _react2.default.PropTypes.bool,
  onMonthChange: _react2.default.PropTypes.func,
  prevMonth: _react2.default.PropTypes.bool
};
CalendarToolbar.defaultProps = {
  nextMonth: true,
  prevMonth: true
};
CalendarToolbar.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = CalendarToolbar;
