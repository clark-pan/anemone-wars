/* */ 
"format cjs";
export default function thunkMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      return next(action);
    };
  };
}