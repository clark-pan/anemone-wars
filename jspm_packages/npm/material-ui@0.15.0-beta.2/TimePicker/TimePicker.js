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
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var _TimePickerDialog = require('./TimePickerDialog');
  var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);
  var _TextField = require('../TextField/index');
  var _TextField2 = _interopRequireDefault(_TextField);
  var _timeUtils = require('./timeUtils');
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
  var emptyTime = new Date();
  emptyTime.setHours(0);
  emptyTime.setMinutes(0);
  emptyTime.setSeconds(0);
  emptyTime.setMilliseconds(0);
  var TimePicker = function(_React$Component) {
    _inherits(TimePicker, _React$Component);
    function TimePicker() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, TimePicker);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        time: _this.isControlled() ? _this.getControlledTime() : _this.props.defaultTime,
        dialogTime: new Date()
      }, _this.handleAcceptDialog = function(time) {
        _this.setState({time: time});
        if (_this.props.onChange)
          _this.props.onChange(null, time);
      }, _this.handleFocusInput = function(event) {
        event.target.blur();
        if (_this.props.onFocus)
          _this.props.onFocus(event);
      }, _this.handleTouchTapInput = function(event) {
        event.preventDefault();
        if (!_this.props.disabled)
          _this.openDialog();
        if (_this.props.onTouchTap)
          _this.props.onTouchTap(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(TimePicker, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
          this.setState({time: this.getControlledTime(nextProps)});
        }
      }
    }, {
      key: 'getTime',
      value: function getTime() {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'getTime() method is deprecated. Use the defaultTime property\n    instead. Or use the TimePicker as a controlled component with the value\n    property.') : void 0;
        return this.state.time;
      }
    }, {
      key: 'setTime',
      value: function setTime(time) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'setTime() method is deprecated. Use the defaultTime property\n    instead. Or use the TimePicker as a controlled component with the value\n    property.') : void 0;
        this.setState({time: time ? time : emptyTime});
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.openDialog();
      }
    }, {
      key: 'openDialog',
      value: function openDialog() {
        this.setState({dialogTime: this.state.time});
        this.refs.dialogWindow.show();
      }
    }, {
      key: 'isControlled',
      value: function isControlled() {
        return this.props.value !== null;
      }
    }, {
      key: 'getControlledTime',
      value: function getControlledTime() {
        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
        var result = null;
        if (props.value instanceof Date) {
          result = props.value;
        }
        return result;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var autoOk = _props.autoOk;
        var cancelLabel = _props.cancelLabel;
        var format = _props.format;
        var okLabel = _props.okLabel;
        var onFocus = _props.onFocus;
        var onTouchTap = _props.onTouchTap;
        var onShow = _props.onShow;
        var onDismiss = _props.onDismiss;
        var pedantic = _props.pedantic;
        var style = _props.style;
        var textFieldStyle = _props.textFieldStyle;
        var other = _objectWithoutProperties(_props, ['autoOk', 'cancelLabel', 'format', 'okLabel', 'onFocus', 'onTouchTap', 'onShow', 'onDismiss', 'pedantic', 'style', 'textFieldStyle']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var time = this.state.time;
        return _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)({}, style))}, _react2.default.createElement(_TextField2.default, _extends({}, other, {
          style: textFieldStyle,
          ref: 'input',
          value: time === emptyTime ? null : (0, _timeUtils.formatTime)(time, format, pedantic),
          onFocus: this.handleFocusInput,
          onTouchTap: this.handleTouchTapInput
        })), _react2.default.createElement(_TimePickerDialog2.default, {
          ref: 'dialogWindow',
          initialTime: this.state.dialogTime,
          onAccept: this.handleAcceptDialog,
          onShow: onShow,
          onDismiss: onDismiss,
          format: format,
          okLabel: okLabel,
          cancelLabel: cancelLabel,
          autoOk: autoOk
        }));
      }
    }]);
    return TimePicker;
  }(_react2.default.Component);
  TimePicker.propTypes = {
    autoOk: _react2.default.PropTypes.bool,
    cancelLabel: _react2.default.PropTypes.node,
    defaultTime: _react2.default.PropTypes.object,
    disabled: _react2.default.PropTypes.bool,
    format: _react2.default.PropTypes.oneOf(['ampm', '24hr']),
    okLabel: _react2.default.PropTypes.node,
    onChange: _react2.default.PropTypes.func,
    onDismiss: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onShow: _react2.default.PropTypes.func,
    onTouchTap: _react2.default.PropTypes.func,
    pedantic: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object,
    textFieldStyle: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.object
  };
  TimePicker.defaultProps = {
    defaultTime: null,
    disabled: false,
    format: 'ampm',
    pedantic: false,
    autoOk: false,
    style: {},
    okLabel: 'OK',
    cancelLabel: 'Cancel'
  };
  TimePicker.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
  exports.default = TimePicker;
})(require('process'));
