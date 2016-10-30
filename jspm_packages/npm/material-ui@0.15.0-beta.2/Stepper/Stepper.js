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
var _StepConnector = require('./StepConnector');
var _StepConnector2 = _interopRequireDefault(_StepConnector);
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
var getStyles = function getStyles(props) {
  var orientation = props.orientation;
  return {root: {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignContent: 'center',
      alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
      justifyContent: 'space-between'
    }};
};
var Stepper = function(_React$Component) {
  _inherits(Stepper, _React$Component);
  function Stepper() {
    _classCallCheck(this, Stepper);
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Stepper).apply(this, arguments));
  }
  _createClass(Stepper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var orientation = this.props.orientation;
      return {stepper: {orientation: orientation}};
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var activeStep = _props.activeStep;
      var children = _props.children;
      var linear = _props.linear;
      var style = _props.style;
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var styles = getStyles(this.props, this.context);
      var steps = _react2.default.Children.map(children, function(step, index) {
        var controlProps = {index: index};
        if (activeStep === index) {
          controlProps.active = true;
        } else if (linear && activeStep > index) {
          controlProps.completed = true;
        } else if (linear && activeStep < index) {
          controlProps.disabled = true;
        }
        if (index + 1 === children.length) {
          controlProps.last = true;
        }
        return [index > 0 && _react2.default.createElement(_StepConnector2.default, null), _react2.default.cloneElement(step, (0, _simpleAssign2.default)(controlProps, step.props))];
      });
      return _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))}, steps);
    }
  }]);
  return Stepper;
}(_react2.default.Component);
Stepper.propTypes = {
  activeStep: _react.PropTypes.number,
  children: _react.PropTypes.arrayOf(_react.PropTypes.element),
  linear: _react.PropTypes.bool,
  orientation: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  style: _react.PropTypes.object
};
Stepper.defaultProps = {
  orientation: 'horizontal',
  activeStep: 0,
  linear: true
};
Stepper.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
Stepper.childContextTypes = {stepper: _react.PropTypes.object};
exports.default = Stepper;
