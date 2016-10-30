/* */ 
(function(process) {
  'use strict';
  var BeforeInputEventPlugin = require('./BeforeInputEventPlugin');
  var ChangeEventPlugin = require('./ChangeEventPlugin');
  var DefaultEventPluginOrder = require('./DefaultEventPluginOrder');
  var EnterLeaveEventPlugin = require('./EnterLeaveEventPlugin');
  var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
  var HTMLDOMPropertyConfig = require('./HTMLDOMPropertyConfig');
  var ReactComponentBrowserEnvironment = require('./ReactComponentBrowserEnvironment');
  var ReactDOMComponent = require('./ReactDOMComponent');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactDOMEmptyComponent = require('./ReactDOMEmptyComponent');
  var ReactDOMTreeTraversal = require('./ReactDOMTreeTraversal');
  var ReactDOMTextComponent = require('./ReactDOMTextComponent');
  var ReactDefaultBatchingStrategy = require('./ReactDefaultBatchingStrategy');
  var ReactEventListener = require('./ReactEventListener');
  var ReactInjection = require('./ReactInjection');
  var ReactReconcileTransaction = require('./ReactReconcileTransaction');
  var SVGDOMPropertyConfig = require('./SVGDOMPropertyConfig');
  var SelectEventPlugin = require('./SelectEventPlugin');
  var SimpleEventPlugin = require('./SimpleEventPlugin');
  var alreadyInjected = false;
  function inject() {
    if (alreadyInjected) {
      return;
    }
    alreadyInjected = true;
    ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree);
    ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);
    ReactInjection.EventPluginHub.injectEventPluginsByName({
      SimpleEventPlugin: SimpleEventPlugin,
      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
      ChangeEventPlugin: ChangeEventPlugin,
      SelectEventPlugin: SelectEventPlugin,
      BeforeInputEventPlugin: BeforeInputEventPlugin
    });
    ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
    ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
    ReactInjection.EmptyComponent.injectEmptyComponentFactory(function(instantiate) {
      return new ReactDOMEmptyComponent(instantiate);
    });
    ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
    ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
    if (process.env.NODE_ENV !== 'production') {
      var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
      if (/[?&]react_perf\b/.test(url)) {
        var ReactDefaultPerf = require('./ReactDefaultPerf');
        ReactDefaultPerf.start();
      }
    }
  }
  module.exports = {inject: inject};
})(require('process'));
