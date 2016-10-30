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
var _shallowEqual = require('recompose/shallowEqual');
var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
var _colorManipulator = require('../utils/colorManipulator');
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _EnhancedButton = require('../internal/EnhancedButton');
var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);
var _IconButton = require('../IconButton/index');
var _IconButton2 = _interopRequireDefault(_IconButton);
var _expandLess = require('../svg-icons/navigation/expand-less');
var _expandLess2 = _interopRequireDefault(_expandLess);
var _expandMore = require('../svg-icons/navigation/expand-more');
var _expandMore2 = _interopRequireDefault(_expandMore);
var _NestedList = require('./NestedList');
var _NestedList2 = _interopRequireDefault(_NestedList);
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
  var insetChildren = props.insetChildren;
  var leftAvatar = props.leftAvatar;
  var leftCheckbox = props.leftCheckbox;
  var leftIcon = props.leftIcon;
  var nestedLevel = props.nestedLevel;
  var rightAvatar = props.rightAvatar;
  var rightIcon = props.rightIcon;
  var rightIconButton = props.rightIconButton;
  var rightToggle = props.rightToggle;
  var secondaryText = props.secondaryText;
  var secondaryTextLines = props.secondaryTextLines;
  var muiTheme = context.muiTheme;
  var listItem = muiTheme.listItem;
  var textColor = muiTheme.baseTheme.palette.textColor;
  var hoverColor = (0, _colorManipulator.fade)(textColor, 0.1);
  var singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  var singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  var twoLine = secondaryText && secondaryTextLines === 1;
  var threeLine = secondaryText && secondaryTextLines > 1;
  var styles = {
    root: {
      backgroundColor: (state.isKeyboardFocused || state.hovered) && !state.rightIconButtonHovered && !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      transition: _transitions2.default.easeOut()
    },
    innerDiv: {
      marginLeft: nestedLevel * muiTheme.listItem.nestedLevelDepth,
      paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
      paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
      paddingBottom: singleAvatar ? 20 : 16,
      paddingTop: singleNoAvatar || threeLine ? 16 : 20,
      position: 'relative'
    },
    icons: {
      height: 24,
      width: 24,
      display: 'block',
      position: 'absolute',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      margin: 12
    },
    leftIcon: {
      color: listItem.leftIconColor,
      fill: listItem.leftIconColor,
      left: 4
    },
    rightIcon: {
      color: listItem.rightIconColor,
      fill: listItem.rightIconColor,
      right: 4
    },
    avatars: {
      position: 'absolute',
      top: singleAvatar ? 8 : 16
    },
    label: {cursor: 'pointer'},
    leftAvatar: {left: 16},
    rightAvatar: {right: 16},
    leftCheckbox: {
      position: 'absolute',
      display: 'block',
      width: 24,
      top: twoLine ? 24 : singleAvatar ? 16 : 12,
      left: 16
    },
    primaryText: {},
    rightIconButton: {
      position: 'absolute',
      display: 'block',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      right: 4
    },
    rightToggle: {
      position: 'absolute',
      display: 'block',
      width: 54,
      top: twoLine ? 25 : singleAvatar ? 17 : 13,
      right: 8
    },
    secondaryText: {
      fontSize: 14,
      lineHeight: threeLine ? '18px' : '16px',
      height: threeLine ? 36 : 16,
      margin: 0,
      marginTop: 4,
      color: listItem.secondaryTextColor,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: threeLine ? null : 'nowrap',
      display: threeLine ? '-webkit-box' : null,
      WebkitLineClamp: threeLine ? 2 : null,
      WebkitBoxOrient: threeLine ? 'vertical' : null
    }
  };
  return styles;
}
var ListItem = function(_React$Component) {
  _inherits(ListItem, _React$Component);
  function ListItem() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, ListItem);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ListItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false,
      isKeyboardFocused: false,
      open: _this.props.initiallyOpen,
      rightIconButtonHovered: false,
      rightIconButtonKeyboardFocused: false,
      touch: false
    }, _this.handleKeyboardFocus = function(event, isKeyboardFocused) {
      _this.setState({isKeyboardFocused: isKeyboardFocused});
      _this.props.onKeyboardFocus(event, isKeyboardFocused);
    }, _this.handleMouseEnter = function(event) {
      if (!_this.state.touch)
        _this.setState({hovered: true});
      _this.props.onMouseEnter(event);
    }, _this.handleMouseLeave = function(event) {
      _this.setState({hovered: false});
      _this.props.onMouseLeave(event);
    }, _this.handleNestedListToggle = function(event) {
      event.stopPropagation();
      _this.setState({open: !_this.state.open});
      _this.props.onNestedListToggle(_this);
    }, _this.handleRightIconButtonKeyboardFocus = function(event, isKeyboardFocused) {
      if (isKeyboardFocused) {
        _this.setState({
          isKeyboardFocused: false,
          rightIconButtonKeyboardFocused: isKeyboardFocused
        });
      }
      var iconButton = _this.props.rightIconButton;
      if (iconButton && iconButton.props.onKeyboardFocus)
        iconButton.props.onKeyboardFocus(event, isKeyboardFocused);
    }, _this.handleRightIconButtonMouseLeave = function(event) {
      var iconButton = _this.props.rightIconButton;
      _this.setState({rightIconButtonHovered: false});
      if (iconButton && iconButton.props.onMouseLeave)
        iconButton.props.onMouseLeave(event);
    }, _this.handleRightIconButtonMouseEnter = function(event) {
      var iconButton = _this.props.rightIconButton;
      _this.setState({rightIconButtonHovered: true});
      if (iconButton && iconButton.props.onMouseEnter)
        iconButton.props.onMouseEnter(event);
    }, _this.handleRightIconButtonMouseUp = function(event) {
      var iconButton = _this.props.rightIconButton;
      event.stopPropagation();
      if (iconButton && iconButton.props.onMouseUp)
        iconButton.props.onMouseUp(event);
    }, _this.handleRightIconButtonTouchTap = function(event) {
      var iconButton = _this.props.rightIconButton;
      event.stopPropagation();
      if (iconButton && iconButton.props.onTouchTap)
        iconButton.props.onTouchTap(event);
    }, _this.handleTouchStart = function(event) {
      _this.setState({touch: true});
      _this.props.onTouchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(ListItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
    }
  }, {
    key: 'applyFocusState',
    value: function applyFocusState(focusState) {
      var button = this.refs.enhancedButton;
      if (button) {
        var buttonEl = _reactDom2.default.findDOMNode(button);
        switch (focusState) {
          case 'none':
            buttonEl.blur();
            break;
          case 'focused':
            buttonEl.focus();
            break;
          case 'keyboard-focused':
            button.setKeyboardFocus();
            buttonEl.focus();
            break;
        }
      }
    }
  }, {
    key: 'createDisabledElement',
    value: function createDisabledElement(styles, contentChildren, additionalProps) {
      var _props = this.props;
      var innerDivStyle = _props.innerDivStyle;
      var style = _props.style;
      var mergedDivStyles = (0, _simpleAssign2.default)({}, styles.root, styles.innerDiv, innerDivStyle, style);
      return _react2.default.createElement('div', _extends({}, additionalProps, {style: this.context.muiTheme.prepareStyles(mergedDivStyles)}), contentChildren);
    }
  }, {
    key: 'createLabelElement',
    value: function createLabelElement(styles, contentChildren, additionalProps) {
      var _props2 = this.props;
      var innerDivStyle = _props2.innerDivStyle;
      var style = _props2.style;
      var mergedLabelStyles = (0, _simpleAssign2.default)({}, styles.root, styles.innerDiv, innerDivStyle, styles.label, style);
      return _react2.default.createElement('label', _extends({}, additionalProps, {style: this.context.muiTheme.prepareStyles(mergedLabelStyles)}), contentChildren);
    }
  }, {
    key: 'createTextElement',
    value: function createTextElement(styles, data, key) {
      var prepareStyles = this.context.muiTheme.prepareStyles;
      if (_react2.default.isValidElement(data)) {
        var style = (0, _simpleAssign2.default)({}, styles, data.props.style);
        if (typeof data.type === 'string') {
          style = prepareStyles(style);
        }
        return _react2.default.cloneElement(data, {
          key: key,
          style: style
        });
      }
      return _react2.default.createElement('div', {
        key: key,
        style: prepareStyles(styles)
      }, data);
    }
  }, {
    key: 'pushElement',
    value: function pushElement(children, element, baseStyles, additionalProps) {
      if (element) {
        var styles = (0, _simpleAssign2.default)({}, baseStyles, element.props.style);
        children.push(_react2.default.cloneElement(element, _extends({
          key: children.length,
          style: styles
        }, additionalProps)));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var autoGenerateNestedIndicator = _props3.autoGenerateNestedIndicator;
      var children = _props3.children;
      var disabled = _props3.disabled;
      var disableKeyboardFocus = _props3.disableKeyboardFocus;
      var innerDivStyle = _props3.innerDivStyle;
      var insetChildren = _props3.insetChildren;
      var leftAvatar = _props3.leftAvatar;
      var leftCheckbox = _props3.leftCheckbox;
      var leftIcon = _props3.leftIcon;
      var nestedItems = _props3.nestedItems;
      var nestedLevel = _props3.nestedLevel;
      var nestedListStyle = _props3.nestedListStyle;
      var onKeyboardFocus = _props3.onKeyboardFocus;
      var onMouseLeave = _props3.onMouseLeave;
      var onMouseEnter = _props3.onMouseEnter;
      var onTouchStart = _props3.onTouchStart;
      var onTouchTap = _props3.onTouchTap;
      var rightAvatar = _props3.rightAvatar;
      var rightIcon = _props3.rightIcon;
      var rightIconButton = _props3.rightIconButton;
      var rightToggle = _props3.rightToggle;
      var primaryText = _props3.primaryText;
      var primaryTogglesNestedList = _props3.primaryTogglesNestedList;
      var secondaryText = _props3.secondaryText;
      var secondaryTextLines = _props3.secondaryTextLines;
      var style = _props3.style;
      var other = _objectWithoutProperties(_props3, ['autoGenerateNestedIndicator', 'children', 'disabled', 'disableKeyboardFocus', 'innerDivStyle', 'insetChildren', 'leftAvatar', 'leftCheckbox', 'leftIcon', 'nestedItems', 'nestedLevel', 'nestedListStyle', 'onKeyboardFocus', 'onMouseLeave', 'onMouseEnter', 'onTouchStart', 'onTouchTap', 'rightAvatar', 'rightIcon', 'rightIconButton', 'rightToggle', 'primaryText', 'primaryTogglesNestedList', 'secondaryText', 'secondaryTextLines', 'style']);
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var styles = getStyles(this.props, this.context, this.state);
      var contentChildren = [children];
      if (leftIcon) {
        this.pushElement(contentChildren, leftIcon, (0, _simpleAssign2.default)({}, styles.icons, styles.leftIcon));
      }
      if (rightIcon) {
        this.pushElement(contentChildren, rightIcon, (0, _simpleAssign2.default)({}, styles.icons, styles.rightIcon));
      }
      if (leftAvatar) {
        this.pushElement(contentChildren, leftAvatar, (0, _simpleAssign2.default)({}, styles.avatars, styles.leftAvatar));
      }
      if (rightAvatar) {
        this.pushElement(contentChildren, rightAvatar, (0, _simpleAssign2.default)({}, styles.avatars, styles.rightAvatar));
      }
      if (leftCheckbox) {
        this.pushElement(contentChildren, leftCheckbox, (0, _simpleAssign2.default)({}, styles.leftCheckbox));
      }
      var hasNestListItems = nestedItems.length;
      var hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
      var needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;
      if (rightIconButton || needsNestedIndicator) {
        var rightIconButtonElement = rightIconButton;
        var rightIconButtonHandlers = {
          onKeyboardFocus: this.handleRightIconButtonKeyboardFocus,
          onMouseEnter: this.handleRightIconButtonMouseEnter,
          onMouseLeave: this.handleRightIconButtonMouseLeave,
          onTouchTap: this.handleRightIconButtonTouchTap,
          onMouseDown: this.handleRightIconButtonMouseUp,
          onMouseUp: this.handleRightIconButtonMouseUp
        };
        if (needsNestedIndicator) {
          rightIconButtonElement = this.state.open ? _react2.default.createElement(_IconButton2.default, null, _react2.default.createElement(_expandLess2.default, null)) : _react2.default.createElement(_IconButton2.default, null, _react2.default.createElement(_expandMore2.default, null));
          rightIconButtonHandlers.onTouchTap = this.handleNestedListToggle;
        }
        this.pushElement(contentChildren, rightIconButtonElement, (0, _simpleAssign2.default)({}, styles.rightIconButton), rightIconButtonHandlers);
      }
      if (rightToggle) {
        this.pushElement(contentChildren, rightToggle, (0, _simpleAssign2.default)({}, styles.rightToggle));
      }
      if (primaryText) {
        var primaryTextElement = this.createTextElement(styles.primaryText, primaryText, 'primaryText');
        contentChildren.push(primaryTextElement);
      }
      if (secondaryText) {
        var secondaryTextElement = this.createTextElement(styles.secondaryText, secondaryText, 'secondaryText');
        contentChildren.push(secondaryTextElement);
      }
      var nestedList = nestedItems.length ? _react2.default.createElement(_NestedList2.default, {
        nestedLevel: nestedLevel + 1,
        open: this.state.open,
        style: nestedListStyle
      }, nestedItems) : undefined;
      var hasCheckbox = leftCheckbox || rightToggle;
      return _react2.default.createElement('div', null, hasCheckbox ? this.createLabelElement(styles, contentChildren, other) : disabled ? this.createDisabledElement(styles, contentChildren, other) : _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
        disabled: disabled,
        disableKeyboardFocus: disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused,
        linkButton: true,
        onKeyboardFocus: this.handleKeyboardFocus,
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        onTouchStart: this.handleTouchStart,
        onTouchTap: primaryTogglesNestedList ? this.handleNestedListToggle : onTouchTap,
        ref: 'enhancedButton',
        style: (0, _simpleAssign2.default)({}, styles.root, style)
      }), _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)(styles.innerDiv, innerDivStyle))}, contentChildren)), nestedList);
    }
  }]);
  return ListItem;
}(_react2.default.Component);
ListItem.muiName = 'ListItem';
ListItem.propTypes = {
  autoGenerateNestedIndicator: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  disableKeyboardFocus: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  initiallyOpen: _react2.default.PropTypes.bool,
  innerDivStyle: _react2.default.PropTypes.object,
  insetChildren: _react2.default.PropTypes.bool,
  leftAvatar: _react2.default.PropTypes.element,
  leftCheckbox: _react2.default.PropTypes.element,
  leftIcon: _react2.default.PropTypes.element,
  nestedItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element),
  nestedLevel: _react2.default.PropTypes.number,
  nestedListStyle: _react2.default.PropTypes.object,
  onKeyboardFocus: _react2.default.PropTypes.func,
  onMouseEnter: _react2.default.PropTypes.func,
  onMouseLeave: _react2.default.PropTypes.func,
  onNestedListToggle: _react2.default.PropTypes.func,
  onTouchStart: _react2.default.PropTypes.func,
  onTouchTap: _react2.default.PropTypes.func,
  primaryText: _react2.default.PropTypes.node,
  primaryTogglesNestedList: _react2.default.PropTypes.bool,
  rightAvatar: _react2.default.PropTypes.element,
  rightIcon: _react2.default.PropTypes.element,
  rightIconButton: _react2.default.PropTypes.element,
  rightToggle: _react2.default.PropTypes.element,
  secondaryText: _react2.default.PropTypes.node,
  secondaryTextLines: _react2.default.PropTypes.oneOf([1, 2]),
  style: _react2.default.PropTypes.object
};
ListItem.defaultProps = {
  autoGenerateNestedIndicator: true,
  disableKeyboardFocus: false,
  disabled: false,
  initiallyOpen: false,
  insetChildren: false,
  nestedItems: [],
  nestedLevel: 0,
  onKeyboardFocus: function onKeyboardFocus() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onNestedListToggle: function onNestedListToggle() {},
  onTouchStart: function onTouchStart() {},
  primaryTogglesNestedList: false,
  secondaryTextLines: 1
};
ListItem.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
exports.default = ListItem;
