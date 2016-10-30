/* */ 
(function(process) {
  'use strict';
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactDefaultInjection = require('./ReactDefaultInjection');
  var ReactMount = require('./ReactMount');
  var ReactPerf = require('./ReactPerf');
  var ReactReconciler = require('./ReactReconciler');
  var ReactUpdates = require('./ReactUpdates');
  var ReactVersion = require('./ReactVersion');
  var findDOMNode = require('./findDOMNode');
  var getNativeComponentFromComposite = require('./getNativeComponentFromComposite');
  var renderSubtreeIntoContainer = require('./renderSubtreeIntoContainer');
  var warning = require('fbjs/lib/warning');
  ReactDefaultInjection.inject();
  var render = ReactPerf.measure('React', 'render', ReactMount.render);
  var React = {
    findDOMNode: findDOMNode,
    render: render,
    unmountComponentAtNode: ReactMount.unmountComponentAtNode,
    version: ReactVersion,
    unstable_batchedUpdates: ReactUpdates.batchedUpdates,
    unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      ComponentTree: {
        getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
        getNodeFromInstance: function(inst) {
          if (inst._renderedComponent) {
            inst = getNativeComponentFromComposite(inst);
          }
          if (inst) {
            return ReactDOMComponentTree.getNodeFromInstance(inst);
          } else {
            return null;
          }
        }
      },
      Mount: ReactMount,
      Reconciler: ReactReconciler
    });
  }
  if (process.env.NODE_ENV !== 'production') {
    var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
    if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
          var showFileUrlMessage = window.location.protocol.indexOf('http') === -1 && navigator.userAgent.indexOf('Firefox') === -1;
          console.debug('Download the React DevTools ' + (showFileUrlMessage ? 'and use an HTTP server (instead of a file: URL) ' : '') + 'for a better development experience: ' + 'https://fb.me/react-devtools');
        }
      }
      var testFunc = function testFn() {};
      process.env.NODE_ENV !== 'production' ? warning((testFunc.name || testFunc.toString()).indexOf('testFn') !== -1, 'It looks like you\'re using a minified copy of the development build ' + 'of React. When deploying React apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See https://fb.me/react-minification for more details.') : void 0;
      var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
      process.env.NODE_ENV !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : void 0;
      var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim];
      for (var i = 0; i < expectedFeatures.length; i++) {
        if (!expectedFeatures[i]) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'One or more ES5 shims expected by React are not available: ' + 'https://fb.me/react-warning-polyfills') : void 0;
          break;
        }
      }
    }
  }
  module.exports = React;
})(require('process'));
