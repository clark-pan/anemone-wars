/* */ 
(function(process) {
  'use strict';
  var DOMProperty = require('./DOMProperty');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactDefaultPerfAnalysis = require('./ReactDefaultPerfAnalysis');
  var ReactMount = require('./ReactMount');
  var ReactPerf = require('./ReactPerf');
  var performanceNow = require('fbjs/lib/performanceNow');
  var warning = require('fbjs/lib/warning');
  function roundFloat(val) {
    return Math.floor(val * 100) / 100;
  }
  function addValue(obj, key, val) {
    obj[key] = (obj[key] || 0) + val;
  }
  var compositeIDMap;
  var compositeIDCounter = 17000;
  function getIDOfComposite(inst) {
    if (!compositeIDMap) {
      compositeIDMap = new WeakMap();
    }
    if (compositeIDMap.has(inst)) {
      return compositeIDMap.get(inst);
    } else {
      var id = compositeIDCounter++;
      compositeIDMap.set(inst, id);
      return id;
    }
  }
  function getID(inst) {
    if (inst.hasOwnProperty('_rootNodeID')) {
      return inst._rootNodeID;
    } else {
      return getIDOfComposite(inst);
    }
  }
  function stripComplexValues(key, value) {
    if (typeof value !== 'object' || Array.isArray(value) || value == null) {
      return value;
    }
    var prototype = Object.getPrototypeOf(value);
    if (!prototype || prototype === Object.prototype) {
      return value;
    }
    return '<not serializable>';
  }
  function wrapLegacyMeasurements(measurements) {
    return {__unstable_this_format_will_change: measurements};
  }
  function unwrapLegacyMeasurements(measurements) {
    return measurements && measurements.__unstable_this_format_will_change || measurements;
  }
  var warnedAboutPrintDOM = false;
  var warnedAboutGetMeasurementsSummaryMap = false;
  var ReactDefaultPerf = {
    _allMeasurements: [],
    _mountStack: [0],
    _compositeStack: [],
    _injected: false,
    start: function() {
      if (!ReactDefaultPerf._injected) {
        ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
      }
      ReactDefaultPerf._allMeasurements.length = 0;
      ReactPerf.enableMeasure = true;
    },
    stop: function() {
      ReactPerf.enableMeasure = false;
    },
    getLastMeasurements: function() {
      return wrapLegacyMeasurements(ReactDefaultPerf._allMeasurements);
    },
    printExclusive: function(measurements) {
      measurements = unwrapLegacyMeasurements(measurements || ReactDefaultPerf._allMeasurements);
      var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Component class name': item.componentName,
          'Total inclusive time (ms)': roundFloat(item.inclusive),
          'Exclusive mount time (ms)': roundFloat(item.exclusive),
          'Exclusive render time (ms)': roundFloat(item.render),
          'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
          'Render time per instance (ms)': roundFloat(item.render / item.count),
          'Instances': item.count
        };
      }));
    },
    printInclusive: function(measurements) {
      measurements = unwrapLegacyMeasurements(measurements || ReactDefaultPerf._allMeasurements);
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Inclusive time (ms)': roundFloat(item.time),
          'Instances': item.count
        };
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    getMeasurementsSummaryMap: function(measurements) {
      process.env.NODE_ENV !== 'production' ? warning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.') : void 0;
      warnedAboutGetMeasurementsSummaryMap = true;
      return ReactDefaultPerf.getWasted(measurements);
    },
    getWasted: function(measurements) {
      measurements = unwrapLegacyMeasurements(measurements);
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
      return summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Wasted time (ms)': item.time,
          'Instances': item.count
        };
      });
    },
    printWasted: function(measurements) {
      measurements = unwrapLegacyMeasurements(measurements || ReactDefaultPerf._allMeasurements);
      console.table(ReactDefaultPerf.getWasted(measurements));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    printDOM: function(measurements) {
      process.env.NODE_ENV !== 'production' ? warning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.') : void 0;
      warnedAboutPrintDOM = true;
      return ReactDefaultPerf.printOperations(measurements);
    },
    printOperations: function(measurements) {
      measurements = unwrapLegacyMeasurements(measurements || ReactDefaultPerf._allMeasurements);
      var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
      console.table(summary.map(function(item) {
        var result = {};
        result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
        result.type = item.type;
        result.args = JSON.stringify(item.args, stripComplexValues);
        return result;
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    _recordWrite: function(id, fnName, totalTime, args) {
      var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
      var writes = entry.writes;
      writes[id] = writes[id] || [];
      writes[id].push({
        type: fnName,
        time: totalTime,
        args: args
      });
    },
    measure: function(moduleName, fnName, func) {
      return function() {
        for (var _len = arguments.length,
            args = Array(_len),
            _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var totalTime;
        var rv;
        var start;
        var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
        if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
          ReactDefaultPerf._allMeasurements.push(entry = {
            exclusive: {},
            inclusive: {},
            render: {},
            counts: {},
            writes: {},
            displayNames: {},
            hierarchy: {},
            totalTime: 0,
            created: {}
          });
          start = performanceNow();
          rv = func.apply(this, args);
          entry.totalTime = performanceNow() - start;
          return rv;
        } else if (fnName === '_mountImageIntoNode' || moduleName === 'ReactDOMIDOperations' || moduleName === 'CSSPropertyOperations' || moduleName === 'DOMChildrenOperations' || moduleName === 'DOMPropertyOperations' || moduleName === 'ReactComponentBrowserEnvironment') {
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (fnName === '_mountImageIntoNode') {
            ReactDefaultPerf._recordWrite('', fnName, totalTime, args[0]);
          } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
            args[1].forEach(function(update) {
              var writeArgs = {};
              if (update.fromIndex !== null) {
                writeArgs.fromIndex = update.fromIndex;
              }
              if (update.toIndex !== null) {
                writeArgs.toIndex = update.toIndex;
              }
              if (update.content !== null) {
                writeArgs.content = update.content;
              }
              ReactDefaultPerf._recordWrite(args[0]._rootNodeID, update.type, totalTime, writeArgs);
            });
          } else {
            var id = args[0];
            if (moduleName === 'EventPluginHub') {
              id = id._rootNodeID;
            } else if (fnName === 'replaceNodeWithMarkup') {
              id = ReactDOMComponentTree.getInstanceFromNode(args[1].node)._rootNodeID;
            } else if (fnName === 'replaceDelimitedText') {
              id = getID(ReactDOMComponentTree.getInstanceFromNode(args[0]));
            } else if (typeof id === 'object') {
              id = getID(ReactDOMComponentTree.getInstanceFromNode(args[0]));
            }
            ReactDefaultPerf._recordWrite(id, fnName, totalTime, Array.prototype.slice.call(args, 1));
          }
          return rv;
        } else if (moduleName === 'ReactCompositeComponent' && (fnName === 'mountComponent' || fnName === 'updateComponent' || fnName === '_renderValidatedComponent')) {
          if (this._currentElement.type === ReactMount.TopLevelWrapper) {
            return func.apply(this, args);
          }
          var rootNodeID = getIDOfComposite(this);
          var isRender = fnName === '_renderValidatedComponent';
          var isMount = fnName === 'mountComponent';
          var mountStack = ReactDefaultPerf._mountStack;
          if (isRender) {
            addValue(entry.counts, rootNodeID, 1);
          } else if (isMount) {
            entry.created[rootNodeID] = true;
            mountStack.push(0);
          }
          ReactDefaultPerf._compositeStack.push(rootNodeID);
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          ReactDefaultPerf._compositeStack.pop();
          if (isRender) {
            addValue(entry.render, rootNodeID, totalTime);
          } else if (isMount) {
            var subMountTime = mountStack.pop();
            mountStack[mountStack.length - 1] += totalTime;
            addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
            addValue(entry.inclusive, rootNodeID, totalTime);
          } else {
            addValue(entry.inclusive, rootNodeID, totalTime);
          }
          entry.displayNames[rootNodeID] = {
            current: this.getName(),
            owner: this._currentElement._owner ? this._currentElement._owner.getName() : '<root>'
          };
          return rv;
        } else if ((moduleName === 'ReactDOMComponent' || moduleName === 'ReactDOMTextComponent') && (fnName === 'mountComponent' || fnName === 'receiveComponent')) {
          rv = func.apply(this, args);
          entry.hierarchy[getID(this)] = ReactDefaultPerf._compositeStack.slice();
          return rv;
        } else {
          return func.apply(this, args);
        }
      };
    }
  };
  module.exports = ReactDefaultPerf;
})(require('process'));
