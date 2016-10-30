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
var _reactEventListener = require('react-event-listener');
var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
var _keycode = require('keycode');
var _keycode2 = _interopRequireDefault(_keycode);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _CalendarMonth = require('./CalendarMonth');
var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);
var _CalendarYear = require('./CalendarYear');
var _CalendarYear2 = _interopRequireDefault(_CalendarYear);
var _CalendarToolbar = require('./CalendarToolbar');
var _CalendarToolbar2 = _interopRequireDefault(_CalendarToolbar);
var _DateDisplay = require('./DateDisplay');
var _DateDisplay2 = _interopRequireDefault(_DateDisplay);
var _SlideIn = require('../internal/SlideIn');
var _SlideIn2 = _interopRequireDefault(_SlideIn);
var _ClearFix = require('../internal/ClearFix');
var _ClearFix2 = _interopRequireDefault(_ClearFix);
var _dateUtils = require('./dateUtils');
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
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0,
        arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var daysArray = [].concat(_toConsumableArray(Array(7)));
var Calendar = function(_React$Component) {
  _inherits(Calendar, _React$Component);
  function Calendar() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, Calendar);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Calendar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      displayDate: undefined,
      displayMonthDay: true,
      selectedDate: undefined,
      transitionDirection: 'left',
      transitionEnter: true
    }, _this.handleDayTouchTap = function(event, date) {
      _this.setSelectedDate(date);
      if (_this.props.onDayTouchTap)
        _this.props.onDayTouchTap(event, date);
    }, _this.handleMonthChange = function(months) {
      _this.setState({
        transitionDirection: months >= 0 ? 'left' : 'right',
        displayDate: (0, _dateUtils.addMonths)(_this.state.displayDate, months)
      });
    }, _this.handleYearTouchTap = function(event, year) {
      var date = (0, _dateUtils.cloneDate)(_this.state.selectedDate);
      date.setFullYear(year);
      _this.setSelectedDate(date, event);
    }, _this.handleTouchTapMonthDay = function() {
      _this.setState({displayMonthDay: true});
    }, _this.handleTouchTapClick = function() {
      _this.setState({displayMonthDay: false});
    }, _this.handleKeyDown = function(event) {
      if (_this.props.open) {
        switch ((0, _keycode2.default)(event)) {
          case 'up':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-7);
            }
            break;
          case 'down':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(7);
            }
            break;
          case 'right':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(1);
            }
            break;
          case 'left':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-1);
            }
            break;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        displayDate: (0, _dateUtils.getFirstDayOfMonth)(this.props.initialDate),
        selectedDate: this.props.initialDate
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.initialDate !== this.props.initialDate) {
        var d = nextProps.initialDate || new Date();
        this.setState({
          displayDate: (0, _dateUtils.getFirstDayOfMonth)(d),
          selectedDate: d
        });
      }
    }
  }, {
    key: 'yearSelector',
    value: function yearSelector() {
      if (this.props.disableYearSelection)
        return;
      return _react2.default.createElement(_CalendarYear2.default, {
        key: 'years',
        displayDate: this.state.displayDate,
        onYearTouchTap: this.handleYearTouchTap,
        selectedDate: this.state.selectedDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate
      });
    }
  }, {
    key: 'getSelectedDate',
    value: function getSelectedDate() {
      return this.state.selectedDate;
    }
  }, {
    key: 'isSelectedDateDisabled',
    value: function isSelectedDateDisabled() {
      if (!this.state.displayMonthDay) {
        return false;
      }
      return this.refs.calendar.isSelectedDateDisabled();
    }
  }, {
    key: 'addSelectedDays',
    value: function addSelectedDays(days) {
      this.setSelectedDate((0, _dateUtils.addDays)(this.state.selectedDate, days));
    }
  }, {
    key: 'addSelectedMonths',
    value: function addSelectedMonths(months) {
      this.setSelectedDate((0, _dateUtils.addMonths)(this.state.selectedDate, months));
    }
  }, {
    key: 'addSelectedYears',
    value: function addSelectedYears(years) {
      this.setSelectedDate((0, _dateUtils.addYears)(this.state.selectedDate, years));
    }
  }, {
    key: 'setDisplayDate',
    value: function setDisplayDate(d, newSelectedDate) {
      var newDisplayDate = (0, _dateUtils.getFirstDayOfMonth)(d);
      var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';
      if (newDisplayDate !== this.state.displayDate) {
        this.setState({
          displayDate: newDisplayDate,
          transitionDirection: direction,
          selectedDate: newSelectedDate || this.state.selectedDate
        });
      }
    }
  }, {
    key: 'setSelectedDate',
    value: function setSelectedDate(date) {
      var adjustedDate = date;
      if ((0, _dateUtils.isBeforeDate)(date, this.props.minDate)) {
        adjustedDate = this.props.minDate;
      } else if ((0, _dateUtils.isAfterDate)(date, this.props.maxDate)) {
        adjustedDate = this.props.maxDate;
      }
      var newDisplayDate = (0, _dateUtils.getFirstDayOfMonth)(adjustedDate);
      if (newDisplayDate !== this.state.displayDate) {
        this.setDisplayDate(newDisplayDate, adjustedDate);
      } else {
        this.setState({selectedDate: adjustedDate});
      }
    }
  }, {
    key: 'getToolbarInteractions',
    value: function getToolbarInteractions() {
      return {
        prevMonth: (0, _dateUtils.monthDiff)(this.state.displayDate, this.props.minDate) > 0,
        nextMonth: (0, _dateUtils.monthDiff)(this.state.displayDate, this.props.maxDate) < 0
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var yearCount = (0, _dateUtils.yearDiff)(this.props.maxDate, this.props.minDate) + 1;
      var weekCount = (0, _dateUtils.getWeekArray)(this.state.displayDate, this.props.firstDayOfWeek).length;
      var toolbarInteractions = this.getToolbarInteractions();
      var isLandscape = this.props.mode === 'landscape';
      var styles = {
        root: {fontSize: 12},
        calendarContainer: {
          width: isLandscape ? 320 : '100%',
          height: weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
          float: isLandscape ? 'right' : 'none',
          transition: _transitions2.default.easeOut('150ms', 'height'),
          overflow: 'hidden'
        },
        yearContainer: {
          width: 280,
          overflow: 'hidden',
          height: yearCount < 6 ? yearCount * 56 + 10 : weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
          float: isLandscape ? 'right' : 'none'
        },
        dateDisplay: {
          width: isLandscape ? 120 : '',
          height: isLandscape ? weekCount === 5 ? 238 : weekCount === 6 ? 278 : 198 : 'auto',
          float: isLandscape ? 'left' : 'none'
        },
        weekTitle: {
          padding: '0 14px',
          lineHeight: '12px',
          opacity: '0.5',
          height: 12,
          fontWeight: '500',
          margin: 0
        },
        weekTitleDay: {
          listStyle: 'none',
          float: 'left',
          width: 37,
          textAlign: 'center',
          margin: '0 2px'
        }
      };
      var weekTitleDayStyle = prepareStyles(styles.weekTitleDay);
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var locale = _props.locale;
      var firstDayOfWeek = _props.firstDayOfWeek;
      return _react2.default.createElement(_ClearFix2.default, {style: styles.root}, _react2.default.createElement(_reactEventListener2.default, {
        elementName: 'window',
        onKeyDown: this.handleKeyDown
      }), _react2.default.createElement(_DateDisplay2.default, {
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        disableYearSelection: this.props.disableYearSelection,
        style: styles.dateDisplay,
        selectedDate: this.state.selectedDate,
        onTouchTapMonthDay: this.handleTouchTapMonthDay,
        onTouchTapYear: this.handleTouchTapClick,
        monthDaySelected: this.state.displayMonthDay,
        mode: this.props.mode,
        weekCount: weekCount
      }), this.state.displayMonthDay && _react2.default.createElement('div', {style: prepareStyles(styles.calendarContainer)}, _react2.default.createElement(_CalendarToolbar2.default, {
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        displayDate: this.state.displayDate,
        onMonthChange: this.handleMonthChange,
        prevMonth: toolbarInteractions.prevMonth,
        nextMonth: toolbarInteractions.nextMonth
      }), _react2.default.createElement(_ClearFix2.default, {
        elementType: 'ul',
        style: styles.weekTitle
      }, daysArray.map(function(event, i) {
        return _react2.default.createElement('li', {
          key: i,
          style: weekTitleDayStyle
        }, (0, _dateUtils.localizedWeekday)(DateTimeFormat, locale, i, firstDayOfWeek));
      })), _react2.default.createElement(_SlideIn2.default, {direction: this.state.transitionDirection}, _react2.default.createElement(_CalendarMonth2.default, {
        key: this.state.displayDate.toDateString(),
        ref: 'calendar',
        displayDate: this.state.displayDate,
        onDayTouchTap: this.handleDayTouchTap,
        selectedDate: this.state.selectedDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        shouldDisableDate: this.props.shouldDisableDate,
        firstDayOfWeek: this.props.firstDayOfWeek
      }))), !this.state.displayMonthDay && _react2.default.createElement('div', {style: prepareStyles(styles.yearContainer)}, this.yearSelector()));
    }
  }]);
  return Calendar;
}(_react2.default.Component);
Calendar.propTypes = {
  DateTimeFormat: _react2.default.PropTypes.func.isRequired,
  disableYearSelection: _react2.default.PropTypes.bool,
  firstDayOfWeek: _react2.default.PropTypes.number,
  initialDate: _react2.default.PropTypes.object,
  locale: _react2.default.PropTypes.string.isRequired,
  maxDate: _react2.default.PropTypes.object,
  minDate: _react2.default.PropTypes.object,
  mode: _react2.default.PropTypes.oneOf(['portrait', 'landscape']),
  onDayTouchTap: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  shouldDisableDate: _react2.default.PropTypes.func
};
Calendar.defaultProps = {
  disableYearSelection: false,
  initialDate: new Date(),
  minDate: (0, _dateUtils.addYears)(new Date(), -100),
  maxDate: (0, _dateUtils.addYears)(new Date(), 100)
};
Calendar.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = Calendar;
