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
var _Paper = require('../Paper/index');
var _Paper2 = _interopRequireDefault(_Paper);
var _CardExpandable = require('./CardExpandable');
var _CardExpandable2 = _interopRequireDefault(_CardExpandable);
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
var Card = function(_React$Component) {
  _inherits(Card, _React$Component);
  function Card() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, Card);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Card)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {expanded: null}, _this.handleExpanding = function(event) {
      event.preventDefault();
      var newExpandedState = !_this.state.expanded;
      if (_this.props.expanded === null) {
        _this.setState({expanded: newExpandedState});
      }
      if (_this.props.onExpandChange)
        _this.props.onExpandChange(newExpandedState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(Card, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded});
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.expanded !== null)
        this.setState({expanded: nextProps.expanded});
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;
      var lastElement = void 0;
      var expanded = this.state.expanded;
      var newChildren = _react2.default.Children.map(this.props.children, function(currentChild) {
        var doClone = false;
        var newChild = undefined;
        var newProps = {};
        var element = currentChild;
        if (!currentChild || !currentChild.props) {
          return null;
        }
        if (expanded === false && currentChild.props.expandable === true)
          return;
        if (currentChild.props.actAsExpander === true) {
          doClone = true;
          newProps.onTouchTap = _this2.handleExpanding;
          newProps.style = (0, _simpleAssign2.default)({cursor: 'pointer'}, currentChild.props.style);
        }
        if (currentChild.props.showExpandableButton === true) {
          doClone = true;
          newChild = _react2.default.createElement(_CardExpandable2.default, {
            expanded: expanded,
            onExpanding: _this2.handleExpanding
          });
        }
        if (doClone) {
          element = _react2.default.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
        }
        return element;
      }, this);
      var addBottomPadding = lastElement && (lastElement.type.muiName === 'CardText' || lastElement.type.muiName === 'CardTitle');
      var _props = this.props;
      var style = _props.style;
      var other = _objectWithoutProperties(_props, ['style']);
      var mergedStyles = (0, _simpleAssign2.default)({zIndex: 1}, style);
      return _react2.default.createElement(_Paper2.default, _extends({}, other, {style: mergedStyles}), _react2.default.createElement('div', {style: {paddingBottom: addBottomPadding ? 8 : 0}}, newChildren));
    }
  }]);
  return Card;
}(_react2.default.Component);
Card.propTypes = {
  actAsExpander: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  expandable: _react2.default.PropTypes.bool,
  expanded: _react2.default.PropTypes.bool,
  initiallyExpanded: _react2.default.PropTypes.bool,
  onExpandChange: _react2.default.PropTypes.func,
  showExpandableButton: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object
};
Card.defaultProps = {
  expanded: null,
  expandable: false,
  initiallyExpanded: false,
  actAsExpander: false
};
exports.default = Card;
