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
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactEventListener = require('react-event-listener');
var _reactEventListener2 = _interopRequireDefault(_reactEventListener);
var _keycode = require('keycode');
var _keycode2 = _interopRequireDefault(_keycode);
var _Calendar = require('./Calendar');
var _Calendar2 = _interopRequireDefault(_Calendar);
var _Dialog = require('../Dialog/index');
var _Dialog2 = _interopRequireDefault(_Dialog);
var _DatePickerInline = require('./DatePickerInline');
var _DatePickerInline2 = _interopRequireDefault(_DatePickerInline);
var _FlatButton = require('../FlatButton/index');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _dateUtils = require('./dateUtils');
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
var DatePickerDialog = function(_React$Component) {
  _inherits(DatePickerDialog, _React$Component);
  function DatePickerDialog() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, DatePickerDialog);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePickerDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {open: false}, _this.show = function() {
      if (_this.props.onShow && !_this.state.open)
        _this.props.onShow();
      _this.setState({open: true});
    }, _this.dismiss = function() {
      if (_this.props.onDismiss && _this.state.open)
        _this.props.onDismiss();
      _this.setState({open: false});
    }, _this.handleTouchTapDay = function() {
      if (_this.props.autoOk) {
        setTimeout(_this.handleTouchTapOK, 300);
      }
    }, _this.handleTouchTapCancel = function() {
      _this.dismiss();
    }, _this.handleRequestClose = function() {
      _this.dismiss();
    }, _this.handleTouchTapOK = function() {
      if (_this.props.onAccept && !_this.refs.calendar.isSelectedDateDisabled()) {
        _this.props.onAccept(_this.refs.calendar.getSelectedDate());
      }
      _this.dismiss();
    }, _this.handleKeyUp = function(event) {
      switch ((0, _keycode2.default)(event)) {
        case 'enter':
          _this.handleTouchTapOK();
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(DatePickerDialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var cancelLabel = _props.cancelLabel;
      var container = _props.container;
      var initialDate = _props.initialDate;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var locale = _props.locale;
      var okLabel = _props.okLabel;
      var onAccept = _props.onAccept;
      var style = _props.style;
      var wordings = _props.wordings;
      var minDate = _props.minDate;
      var maxDate = _props.maxDate;
      var shouldDisableDate = _props.shouldDisableDate;
      var mode = _props.mode;
      var disableYearSelection = _props.disableYearSelection;
      var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'cancelLabel', 'container', 'initialDate', 'firstDayOfWeek', 'locale', 'okLabel', 'onAccept', 'style', 'wordings', 'minDate', 'maxDate', 'shouldDisableDate', 'mode', 'disableYearSelection']);
      var open = this.state.open;
      var calendarTextColor = this.context.muiTheme.datePicker.calendarTextColor;
      var styles = {
        root: {
          fontSize: 14,
          color: calendarTextColor
        },
        dialogContent: {width: mode === 'landscape' ? 480 : 320},
        dialogBodyContent: {padding: 0},
        actions: {marginRight: 8}
      };
      var actions = [_react2.default.createElement(_FlatButton2.default, {
        key: 0,
        label: wordings ? wordings.cancel : cancelLabel,
        primary: true,
        style: styles.actions,
        onTouchTap: this.handleTouchTapCancel
      })];
      if (!this.props.autoOk) {
        actions.push(_react2.default.createElement(_FlatButton2.default, {
          key: 1,
          label: wordings ? wordings.ok : okLabel,
          primary: true,
          disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
          style: styles.actions,
          onTouchTap: this.handleTouchTapOK
        }));
      }
      var Container = container === 'inline' ? _DatePickerInline2.default : _Dialog2.default;
      return _react2.default.createElement(Container, _extends({}, other, {
        ref: 'dialog',
        style: styles.root,
        contentStyle: styles.dialogContent,
        bodyStyle: styles.dialogBodyContent,
        actions: actions,
        repositionOnUpdate: false,
        open: open,
        onRequestClose: this.handleRequestClose
      }), open && _react2.default.createElement(_reactEventListener2.default, {
        elementName: 'window',
        onKeyUp: this.handleKeyUp
      }), open && _react2.default.createElement(_Calendar2.default, {
        DateTimeFormat: DateTimeFormat,
        firstDayOfWeek: firstDayOfWeek,
        locale: locale,
        ref: 'calendar',
        onDayTouchTap: this.handleTouchTapDay,
        initialDate: initialDate,
        open: true,
        minDate: minDate,
        maxDate: maxDate,
        shouldDisableDate: shouldDisableDate,
        disableYearSelection: disableYearSelection,
        mode: mode
      }));
    }
  }]);
  return DatePickerDialog;
}(_react2.default.Component);
DatePickerDialog.propTypes = {
  DateTimeFormat: _react2.default.PropTypes.func,
  autoOk: _react2.default.PropTypes.bool,
  cancelLabel: _react2.default.PropTypes.node,
  container: _react2.default.PropTypes.oneOf(['dialog', 'inline']),
  disableYearSelection: _react2.default.PropTypes.bool,
  firstDayOfWeek: _react2.default.PropTypes.number,
  initialDate: _react2.default.PropTypes.object,
  locale: _react2.default.PropTypes.string,
  maxDate: _react2.default.PropTypes.object,
  minDate: _react2.default.PropTypes.object,
  mode: _react2.default.PropTypes.oneOf(['portrait', 'landscape']),
  okLabel: _react2.default.PropTypes.node,
  onAccept: _react2.default.PropTypes.func,
  onDismiss: _react2.default.PropTypes.func,
  onShow: _react2.default.PropTypes.func,
  shouldDisableDate: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object,
  wordings: _react2.default.PropTypes.object
};
DatePickerDialog.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  container: 'dialog',
  locale: 'en-US',
  okLabel: 'OK',
  cancelLabel: 'Cancel'
};
DatePickerDialog.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = DatePickerDialog;
