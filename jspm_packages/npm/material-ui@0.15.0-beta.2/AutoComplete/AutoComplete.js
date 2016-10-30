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
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
  var _keycode = require('keycode');
  var _keycode2 = _interopRequireDefault(_keycode);
  var _TextField = require('../TextField/index');
  var _TextField2 = _interopRequireDefault(_TextField);
  var _Menu = require('../Menu/index');
  var _Menu2 = _interopRequireDefault(_Menu);
  var _MenuItem = require('../MenuItem/index');
  var _MenuItem2 = _interopRequireDefault(_MenuItem);
  var _Divider = require('../Divider/index');
  var _Divider2 = _interopRequireDefault(_Divider);
  var _Popover = require('../Popover/Popover');
  var _Popover2 = _interopRequireDefault(_Popover);
  var _propTypes = require('../utils/propTypes');
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var _deprecatedPropType = require('../utils/deprecatedPropType');
  var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
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
  function getStyles(props, context, state) {
    var anchorEl = state.anchorEl;
    var fullWidth = props.fullWidth;
    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
        width: fullWidth ? '100%' : 256
      },
      menu: {width: '100%'},
      list: {
        display: 'block',
        width: fullWidth ? '100%' : 256
      },
      innerDiv: {overflow: 'hidden'}
    };
    if (anchorEl && fullWidth) {
      styles.popover = {width: anchorEl.clientWidth};
    }
    return styles;
  }
  var AutoComplete = function(_React$Component) {
    _inherits(AutoComplete, _React$Component);
    function AutoComplete() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, AutoComplete);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AutoComplete)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        anchorEl: null,
        focusTextField: true,
        open: false,
        searchText: undefined
      }, _this.handleRequestClose = function() {
        if (!_this.state.focusTextField) {
          _this.close();
        }
      }, _this.handleMouseDown = function(event) {
        event.preventDefault();
      }, _this.handleItemTouchTap = function(event, child) {
        var dataSource = _this.props.dataSource;
        var index = parseInt(child.key, 10);
        var chosenRequest = dataSource[index];
        var searchText = typeof chosenRequest === 'string' ? chosenRequest : chosenRequest.text;
        _this.props.onNewRequest(chosenRequest, index);
        _this.timerTouchTapCloseId = setTimeout(function() {
          _this.setState({searchText: searchText});
          _this.close();
          _this.timerTouchTapCloseId = null;
        }, _this.props.menuCloseDelay);
      }, _this.handleEscKeyDown = function() {
        _this.close();
      }, _this.handleKeyDown = function(event) {
        if (_this.props.onKeyDown)
          _this.props.onKeyDown(event);
        switch ((0, _keycode2.default)(event)) {
          case 'enter':
            _this.close();
            var searchText = _this.state.searchText;
            if (searchText !== '') {
              _this.props.onNewRequest(searchText, -1);
            }
            break;
          case 'esc':
            _this.close();
            break;
          case 'down':
            event.preventDefault();
            _this.setState({
              open: true,
              focusTextField: false,
              anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
            });
            break;
          default:
            break;
        }
      }, _this.handleChange = function(event) {
        var searchText = event.target.value;
        if (searchText === _this.state.searchText) {
          return;
        }
        _this.setState({
          searchText: searchText,
          open: true,
          anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
        }, function() {
          _this.props.onUpdateInput(searchText, _this.props.dataSource);
        });
      }, _this.handleBlur = function(event) {
        if (_this.state.focusTextField && _this.timerTouchTapCloseId === null) {
          _this.close();
        }
        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }
      }, _this.handleFocus = function(event) {
        if (!_this.state.open && (_this.props.triggerUpdateOnFocus || _this.props.openOnFocus)) {
          _this.setState({
            open: true,
            anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
          });
        }
        _this.setState({focusTextField: true});
        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(AutoComplete, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.requestsList = [];
        this.setState({
          open: this.props.open,
          searchText: this.props.searchText
        });
        this.timerTouchTapCloseId = null;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.searchText !== nextProps.searchText) {
          this.setState({searchText: nextProps.searchText});
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.timerTouchTapCloseId);
      }
    }, {
      key: 'close',
      value: function close() {
        this.setState({
          open: false,
          anchorEl: null
        });
      }
    }, {
      key: 'setValue',
      value: function setValue(textValue) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'setValue() is deprecated, use the searchText property.') : void 0;
        this.setState({searchText: textValue});
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'getValue() is deprecated.') : void 0;
        return this.state.searchText;
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.refs.searchTextField.blur();
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.refs.searchTextField.focus();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
        var _props = this.props;
        var anchorOrigin = _props.anchorOrigin;
        var animated = _props.animated;
        var style = _props.style;
        var errorStyle = _props.errorStyle;
        var floatingLabelText = _props.floatingLabelText;
        var hintText = _props.hintText;
        var fullWidth = _props.fullWidth;
        var menuStyle = _props.menuStyle;
        var menuProps = _props.menuProps;
        var listStyle = _props.listStyle;
        var targetOrigin = _props.targetOrigin;
        var disableFocusRipple = _props.disableFocusRipple;
        var triggerUpdateOnFocus = _props.triggerUpdateOnFocus;
        var openOnFocus = _props.openOnFocus;
        var maxSearchResults = _props.maxSearchResults;
        var dataSource = _props.dataSource;
        var other = _objectWithoutProperties(_props, ['anchorOrigin', 'animated', 'style', 'errorStyle', 'floatingLabelText', 'hintText', 'fullWidth', 'menuStyle', 'menuProps', 'listStyle', 'targetOrigin', 'disableFocusRipple', 'triggerUpdateOnFocus', 'openOnFocus', 'maxSearchResults', 'dataSource']);
        var _state = this.state;
        var open = _state.open;
        var anchorEl = _state.anchorEl;
        var searchText = _state.searchText;
        var focusTextField = _state.focusTextField;
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context, this.state);
        var requestsList = [];
        dataSource.every(function(item, index) {
          switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
            case 'string':
              if (_this2.props.filter(searchText, item, item)) {
                requestsList.push({
                  text: item,
                  value: _react2.default.createElement(_MenuItem2.default, {
                    innerDivStyle: styles.innerDiv,
                    value: item,
                    primaryText: item,
                    disableFocusRipple: disableFocusRipple,
                    key: index
                  })
                });
              }
              break;
            case 'object':
              if (item && typeof item.text === 'string') {
                if (_this2.props.filter(searchText, item.text, item)) {
                  if (item.value.type && (item.value.type.muiName === _MenuItem2.default.muiName || item.value.type.muiName === _Divider2.default.muiName)) {
                    requestsList.push({
                      text: item.text,
                      value: _react2.default.cloneElement(item.value, {
                        key: index,
                        disableFocusRipple: _this2.props.disableFocusRipple
                      })
                    });
                  } else {
                    requestsList.push({
                      text: item.text,
                      value: _react2.default.createElement(_MenuItem2.default, {
                        innerDivStyle: styles.innerDiv,
                        primaryText: item.value,
                        disableFocusRipple: disableFocusRipple,
                        key: index
                      })
                    });
                  }
                }
              }
              break;
            default:
          }
          return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults);
        });
        this.requestsList = requestsList;
        var menu = open && requestsList.length > 0 && _react2.default.createElement(_Menu2.default, _extends({}, menuProps, {
          ref: 'menu',
          autoWidth: false,
          disableAutoFocus: focusTextField,
          onEscKeyDown: this.handleEscKeyDown,
          initiallyKeyboardFocused: false,
          onItemTouchTap: this.handleItemTouchTap,
          onMouseDown: this.handleMouseDown,
          style: (0, _simpleAssign2.default)(styles.menu, menuStyle),
          listStyle: (0, _simpleAssign2.default)(styles.list, listStyle)
        }), requestsList.map(function(i) {
          return i.value;
        }));
        return _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))}, _react2.default.createElement(_TextField2.default, _extends({}, other, {
          ref: 'searchTextField',
          autoComplete: 'off',
          value: searchText,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onKeyDown: this.handleKeyDown,
          floatingLabelText: floatingLabelText,
          hintText: hintText,
          fullWidth: fullWidth,
          multiLine: false,
          errorStyle: errorStyle
        })), _react2.default.createElement(_Popover2.default, {
          style: styles.popover,
          canAutoPosition: false,
          anchorOrigin: anchorOrigin,
          targetOrigin: targetOrigin,
          open: open,
          anchorEl: anchorEl,
          useLayerForClickAway: false,
          onRequestClose: this.handleRequestClose,
          animated: animated
        }, menu));
      }
    }]);
    return AutoComplete;
  }(_react2.default.Component);
  AutoComplete.propTypes = {
    anchorOrigin: _propTypes2.default.origin,
    animated: _react2.default.PropTypes.bool,
    dataSource: _react2.default.PropTypes.array.isRequired,
    disableFocusRipple: _react2.default.PropTypes.bool,
    errorStyle: _react2.default.PropTypes.object,
    errorText: _react2.default.PropTypes.node,
    filter: _react2.default.PropTypes.func,
    floatingLabelText: _react2.default.PropTypes.node,
    fullWidth: _react2.default.PropTypes.bool,
    hintText: _react2.default.PropTypes.node,
    listStyle: _react2.default.PropTypes.object,
    maxSearchResults: _react2.default.PropTypes.number,
    menuCloseDelay: _react2.default.PropTypes.number,
    menuProps: _react2.default.PropTypes.object,
    menuStyle: _react2.default.PropTypes.object,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onKeyDown: _react2.default.PropTypes.func,
    onNewRequest: _react2.default.PropTypes.func,
    onUpdateInput: _react2.default.PropTypes.func,
    open: _react2.default.PropTypes.bool,
    openOnFocus: _react2.default.PropTypes.bool,
    searchText: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    targetOrigin: _propTypes2.default.origin,
    triggerUpdateOnFocus: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.bool, 'Instead, use openOnFocus')
  };
  AutoComplete.defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    animated: true,
    disableFocusRipple: true,
    filter: function filter(searchText, key) {
      return searchText !== '' && key.indexOf(searchText) !== -1;
    },
    fullWidth: false,
    open: false,
    openOnFocus: false,
    onUpdateInput: function onUpdateInput() {},
    onNewRequest: function onNewRequest() {},
    searchText: '',
    menuCloseDelay: 300,
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left'
    }
  };
  AutoComplete.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
  AutoComplete.levenshteinDistance = function(searchText, key) {
    var current = [];
    var prev = void 0;
    var value = void 0;
    for (var i = 0; i <= key.length; i++) {
      for (var j = 0; j <= searchText.length; j++) {
        if (i && j) {
          if (searchText.charAt(j - 1) === key.charAt(i - 1))
            value = prev;
          else
            value = Math.min(current[j], current[j - 1], prev) + 1;
        } else {
          value = i + j;
        }
        prev = current[j];
        current[j] = value;
      }
    }
    return current.pop();
  };
  AutoComplete.noFilter = function() {
    return true;
  };
  AutoComplete.defaultFilter = AutoComplete.caseSensitiveFilter = function(searchText, key) {
    return searchText !== '' && key.indexOf(searchText) !== -1;
  };
  AutoComplete.caseInsensitiveFilter = function(searchText, key) {
    return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  };
  AutoComplete.levenshteinDistanceFilter = function(distanceLessThan) {
    if (distanceLessThan === undefined) {
      return AutoComplete.levenshteinDistance;
    } else if (typeof distanceLessThan !== 'number') {
      throw 'Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!';
    }
    return function(s, k) {
      return AutoComplete.levenshteinDistance(s, k) < distanceLessThan;
    };
  };
  AutoComplete.fuzzyFilter = function(searchText, key) {
    if (searchText.length === 0) {
      return false;
    }
    var subMatchKey = key.substring(0, searchText.length);
    var distance = AutoComplete.levenshteinDistance(searchText.toLowerCase(), subMatchKey.toLowerCase());
    return searchText.length > 3 ? distance < 2 : distance === 0;
  };
  AutoComplete.Item = _MenuItem2.default;
  AutoComplete.Divider = _Divider2.default;
  exports.default = AutoComplete;
})(require('process'));
