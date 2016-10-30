/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _events = require('./events');
var _events2 = _interopRequireDefault(_events);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var Sizes = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3
};
exports.default = {
  statics: {Sizes: Sizes},
  getInitialState: function getInitialState() {
    return {deviceSize: Sizes.SMALL};
  },
  componentDidMount: function componentDidMount() {
    this.updateDeviceSize();
    if (!this.manuallyBindResize)
      this.bindResize();
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unbindResize();
  },
  isDeviceSize: function isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },
  updateDeviceSize: function updateDeviceSize() {
    var width = window.innerWidth;
    if (width >= 992) {
      this.setState({deviceSize: Sizes.LARGE});
    } else if (width >= 768) {
      this.setState({deviceSize: Sizes.MEDIUM});
    } else {
      this.setState({deviceSize: Sizes.SMALL});
    }
  },
  bindResize: function bindResize() {
    _events2.default.on(window, 'resize', this.updateDeviceSize);
  },
  unbindResize: function unbindResize() {
    _events2.default.off(window, 'resize', this.updateDeviceSize);
  }
};
