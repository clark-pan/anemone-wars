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
var _simpleAssign = require('simple-assign');
var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _ClickAwayListener = require('../internal/ClickAwayListener');
var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);
var _FlatButton = require('../FlatButton/index');
var _FlatButton2 = _interopRequireDefault(_FlatButton);
var _styleResizable = require('../utils/styleResizable');
var _styleResizable2 = _interopRequireDefault(_styleResizable);
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
function getStyles(props, context, state) {
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var snackbar = _context$muiTheme.snackbar;
  var zIndex = _context$muiTheme.zIndex;
  var open = state.open;
  var _baseTheme$spacing = baseTheme.spacing;
  var desktopGutter = _baseTheme$spacing.desktopGutter;
  var desktopSubheaderHeight = _baseTheme$spacing.desktopSubheaderHeight;
  var isSmall = state.deviceSize === _styleResizable2.default.statics.Sizes.SMALL;
  var styles = {
    root: {
      position: 'fixed',
      left: 0,
      display: 'flex',
      right: 0,
      bottom: 0,
      zIndex: zIndex.snackbar,
      visibility: open ? 'visible' : 'hidden',
      transform: open ? 'translate3d(0, 0, 0)' : 'translate3d(0, ' + desktopSubheaderHeight + 'px, 0)',
      transition: _transitions2.default.easeOut('400ms', 'transform') + ', ' + _transitions2.default.easeOut('400ms', 'visibility')
    },
    body: {
      backgroundColor: snackbar.backgroundColor,
      padding: '0 ' + desktopGutter + 'px',
      height: desktopSubheaderHeight,
      lineHeight: desktopSubheaderHeight + 'px',
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      flexGrow: isSmall ? 1 : 0,
      margin: 'auto'
    },
    content: {
      fontSize: 14,
      color: snackbar.textColor,
      opacity: open ? 1 : 0,
      transition: open ? _transitions2.default.easeOut('500ms', 'opacity', '100ms') : _transitions2.default.easeOut('400ms', 'opacity')
    },
    action: {
      color: snackbar.actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent'
    }
  };
  return styles;
}
var Snackbar = _react2.default.createClass({
  displayName: 'Snackbar',
  propTypes: {
    action: _react2.default.PropTypes.string,
    autoHideDuration: _react2.default.PropTypes.number,
    bodyStyle: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    message: _react2.default.PropTypes.node.isRequired,
    onActionTouchTap: _react2.default.PropTypes.func,
    onRequestClose: _react2.default.PropTypes.func,
    open: _react2.default.PropTypes.bool.isRequired,
    style: _react2.default.PropTypes.object
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object.isRequired},
  mixins: [_styleResizable2.default],
  getInitialState: function getInitialState() {
    return {
      open: this.props.open,
      message: this.props.message,
      action: this.props.action
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
      this.setTransitionTimer();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;
    if (this.state.open && nextProps.open === this.props.open && (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({open: false});
      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(function() {
        _this.setState({
          message: nextProps.message,
          action: nextProps.action,
          open: true
        });
      }, 400);
    } else {
      var open = nextProps.open;
      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message,
        action: nextProps.action
      });
    }
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
        this.setTransitionTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
  },
  componentClickAway: function componentClickAway() {
    if (this.timerTransitionId)
      return;
    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({open: false});
    }
  },
  setAutoHideTimer: function setAutoHideTimer() {
    var _this2 = this;
    var autoHideDuration = this.props.autoHideDuration;
    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(function() {
        if (_this2.props.open !== null && _this2.props.onRequestClose) {
          _this2.props.onRequestClose('timeout');
        } else {
          _this2.setState({open: false});
        }
      }, autoHideDuration);
    }
  },
  setTransitionTimer: function setTransitionTimer() {
    var _this3 = this;
    this.timerTransitionId = setTimeout(function() {
      _this3.timerTransitionId = undefined;
    }, 400);
  },
  render: function render() {
    var _props = this.props;
    var onActionTouchTap = _props.onActionTouchTap;
    var style = _props.style;
    var bodyStyle = _props.bodyStyle;
    var others = _objectWithoutProperties(_props, ['onActionTouchTap', 'style', 'bodyStyle']);
    var _state = this.state;
    var action = _state.action;
    var message = _state.message;
    var open = _state.open;
    var prepareStyles = this.context.muiTheme.prepareStyles;
    var styles = getStyles(this.props, this.context, this.state);
    var actionButton = action && _react2.default.createElement(_FlatButton2.default, {
      style: styles.action,
      label: action,
      onTouchTap: onActionTouchTap
    });
    return _react2.default.createElement(_ClickAwayListener2.default, {onClickAway: open && this.componentClickAway}, _react2.default.createElement('div', _extends({}, others, {style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))}), _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)(styles.body, bodyStyle))}, _react2.default.createElement('div', {style: prepareStyles(styles.content)}, _react2.default.createElement('span', null, message), actionButton))));
  }
});
exports.default = Snackbar;
