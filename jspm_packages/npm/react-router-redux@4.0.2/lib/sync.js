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
exports['default'] = syncHistoryWithStore;
var _reducer = require('./reducer');
var defaultSelectLocationState = function defaultSelectLocationState(state) {
  return state.routing;
};
function syncHistoryWithStore(history, store) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var _ref$selectLocationSt = _ref.selectLocationState;
  var selectLocationState = _ref$selectLocationSt === undefined ? defaultSelectLocationState : _ref$selectLocationSt;
  var _ref$adjustUrlOnRepla = _ref.adjustUrlOnReplay;
  var adjustUrlOnReplay = _ref$adjustUrlOnRepla === undefined ? true : _ref$adjustUrlOnRepla;
  if (typeof selectLocationState(store.getState()) === 'undefined') {
    throw new Error('Expected the routing state to be available either as `state.routing` ' + 'or as the custom expression you can specify as `selectLocationState` ' + 'in the `syncHistoryWithStore()` options. ' + 'Ensure you have added the `routerReducer` to your store\'s ' + 'reducers via `combineReducers` or whatever method you use to isolate ' + 'your reducers.');
  }
  var initialLocation = void 0;
  var currentLocation = void 0;
  var isTimeTraveling = void 0;
  var unsubscribeFromStore = void 0;
  var unsubscribeFromHistory = void 0;
  var getLocationInStore = function getLocationInStore(useInitialIfEmpty) {
    var locationState = selectLocationState(store.getState());
    return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
  };
  if (adjustUrlOnReplay) {
    var handleStoreChange = function handleStoreChange() {
      var locationInStore = getLocationInStore(true);
      if (currentLocation === locationInStore) {
        return;
      }
      isTimeTraveling = true;
      currentLocation = locationInStore;
      history.transitionTo(_extends({}, locationInStore, {action: 'PUSH'}));
      isTimeTraveling = false;
    };
    unsubscribeFromStore = store.subscribe(handleStoreChange);
    handleStoreChange();
  }
  var handleLocationChange = function handleLocationChange(location) {
    if (isTimeTraveling) {
      return;
    }
    currentLocation = location;
    if (!initialLocation) {
      initialLocation = location;
      if (getLocationInStore()) {
        return;
      }
    }
    store.dispatch({
      type: _reducer.LOCATION_CHANGE,
      payload: location
    });
  };
  unsubscribeFromHistory = history.listen(handleLocationChange);
  return _extends({}, history, {
    listen: function listen(listener) {
      var lastPublishedLocation = getLocationInStore(true);
      var unsubscribed = false;
      var unsubscribeFromStore = store.subscribe(function() {
        var currentLocation = getLocationInStore(true);
        if (currentLocation === lastPublishedLocation) {
          return;
        }
        lastPublishedLocation = currentLocation;
        if (!unsubscribed) {
          listener(lastPublishedLocation);
        }
      });
      listener(lastPublishedLocation);
      return function() {
        unsubscribed = true;
        unsubscribeFromStore();
      };
    },
    unsubscribe: function unsubscribe() {
      if (adjustUrlOnReplay) {
        unsubscribeFromStore();
      }
      unsubscribeFromHistory();
    }
  });
}
