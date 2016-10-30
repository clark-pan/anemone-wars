/* */ 
"format cjs";
(function(process) {
  ;
  (function() {
    var undefined;
    var VERSION = '4.11.1';
    var FUNC_ERROR_TEXT = 'Expected a function';
    var BIND_FLAG = 1,
        PARTIAL_FLAG = 32;
    var UNORDERED_COMPARE_FLAG = 1,
        PARTIAL_COMPARE_FLAG = 2;
    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        stringTag = '[object String]';
    var reUnescapedHtml = /[&<>"'`]/g,
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    };
    var objectTypes = {
      'function': true,
      'object': true
    };
    var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : undefined;
    var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : undefined;
    var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : undefined;
    var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
    var freeSelf = checkGlobal(objectTypes[typeof self] && self);
    var freeWindow = checkGlobal(objectTypes[typeof window] && window);
    var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
    var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
    function arrayConcat(array, other) {
      return arrayPush(copyArray(array), values);
    }
    function arrayPush(array, values) {
      array.push.apply(array, values);
      return array;
    }
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;
      while (++index < length) {
        var value = array[index],
            current = iteratee(value);
        if (current != null && (computed === undefined ? current === current : comparator(current, computed))) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseValues(object, props) {
      return baseMap(props, function(key) {
        return object[key];
      });
    }
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsNull = value === null,
            valIsUndef = value === undefined,
            valIsReflexive = value === value;
        var othIsNull = other === null,
            othIsUndef = other === undefined,
            othIsReflexive = other === other;
        if ((value > other && !othIsNull) || !valIsReflexive || (valIsNull && !othIsUndef && othIsReflexive) || (valIsUndef && othIsReflexive)) {
          return 1;
        }
        if ((value < other && !valIsNull) || !othIsReflexive || (othIsNull && !valIsUndef && valIsReflexive) || (othIsUndef && valIsReflexive)) {
          return -1;
        }
      }
      return 0;
    }
    function escapeHtmlChar(chr) {
      return htmlEscapes[chr];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    function iteratorToArray(iterator) {
      var data,
          result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    var arrayProto = Array.prototype,
        objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var idCounter = 0;
    var objectToString = objectProto.toString;
    var oldDash = root._;
    var Reflect = root.Reflect,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        enumerate = Reflect ? Reflect.enumerate : undefined,
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeIsFinite = root.isFinite,
        nativeKeys = Object.keys,
        nativeMax = Math.max;
    var nonEnumShadows = !propertyIsEnumerable.call({'valueOf': 1}, 'valueOf');
    function lodash(value) {
      return value instanceof LodashWrapper ? value : new LodashWrapper(value);
    }
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
    }
    LodashWrapper.prototype = baseCreate(lodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;
    function assignInDefaults(objValue, srcValue, key, object) {
      if (objValue === undefined || (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
        object[key] = value;
      }
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() {
        func.apply(undefined, args);
      }, wait);
    }
    var baseEach = createBaseEach(baseForOwn);
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    var baseFor = createBaseFor();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    function baseFunctions(object, props) {
      return baseFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;
      if (!objIsArr) {
        objTag = objectToString.call(object);
        objTag = objTag == argsTag ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = objectToString.call(other);
        othTag = othTag == argsTag ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object),
          othIsObj = othTag == objectTag && !isHostObject(other),
          isSameTag = objTag == othTag;
      stack || (stack = []);
      var stacked = find(stack, function(entry) {
        return entry[0] === object;
      });
      if (stacked && stacked[1]) {
        return stacked[1] == other;
      }
      stack.push([object, other]);
      if (isSameTag && !objIsObj) {
        var result = (objIsArr || isTypedArray(object)) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
        stack.pop();
        return result;
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;
          var result = equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
          stack.pop();
          return result;
        }
      }
      if (!isSameTag) {
        return false;
      }
      var result = equalObjects(object, other, equalFunc, customizer, bitmask, stack);
      stack.pop();
      return result;
    }
    function baseIteratee(func) {
      if (typeof func == 'function') {
        return func;
      }
      if (func == null) {
        return identity;
      }
      return (typeof func == 'object' ? baseMatches : baseProperty)(func);
    }
    function baseKeys(object) {
      return nativeKeys(Object(object));
    }
    function baseKeysIn(object) {
      object = object == null ? object : Object(object);
      var result = [];
      for (var key in object) {
        result.push(key);
      }
      return result;
    }
    if (enumerate && !propertyIsEnumerable.call({'valueOf': 1}, 'valueOf')) {
      baseKeysIn = function(object) {
        return iteratorToArray(enumerate(object));
      };
    }
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }
    function baseMatches(source) {
      var props = keys(source);
      return function(object) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (length--) {
          var key = props[length];
          if (!(key in object && baseIsEqual(source[key], object[key], undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG))) {
            return false;
          }
        }
        return true;
      };
    }
    function basePick(object, props) {
      object = Object(object);
      return reduce(props, function(result, key) {
        if (key in object) {
          result[key] = object[key];
        }
        return result;
      }, {});
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function copyArray(source) {
      return baseSlice(source, 0, source.length);
    }
    function baseSome(collection, predicate) {
      var result;
      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }
    function baseWrapperValue(value, actions) {
      var result = value;
      return reduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1,
          length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
        assignValue(object, key, newValue);
      }
      return object;
    }
    function createAssigner(assigner) {
      return rest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined;
        customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);
        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function createCtorWrapper(Ctor) {
      return function() {
        var args = arguments;
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      };
    }
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);
      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var index = -1,
          isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
          arrLength = array.length,
          othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var result = true;
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];
        var compared;
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (isUnordered) {
          if (!baseSome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }
      return result;
    }
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case boolTag:
        case dateTag:
          return +object == +other;
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case numberTag:
          return (object != +object) ? other != +other : object == +other;
        case regexpTag:
        case stringTag:
          return object == (other + '');
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var result = true;
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];
        var compared;
        if (!(compared === undefined ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack)) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;
        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      return result;
    }
    var getLength = baseProperty('length');
    function indexKeys(object) {
      var length = object ? object.length : undefined;
      if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
        return baseTimes(length, String);
      }
      return null;
    }
    function isFlattenable(value) {
      return isArrayLikeObject(value) && (isArray(value) || isArguments(value));
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
      return value === proto;
    }
    function compact(array) {
      return baseFilter(array, Boolean);
    }
    function concat() {
      var length = arguments.length,
          array = castArray(arguments[0]);
      if (length < 2) {
        return length ? copyArray(array) : [];
      }
      var args = Array(length - 1);
      while (length--) {
        args[length - 1] = arguments[length];
      }
      return arrayConcat(array, baseFlatten(args, 1));
    }
    function flatten(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, 1) : [];
    }
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, INFINITY) : [];
    }
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else {
        fromIndex = 0;
      }
      var index = (fromIndex || 0) - 1,
          isReflexive = value === value;
      while (++index < length) {
        var other = array[index];
        if ((isReflexive ? other === value : other !== other)) {
          return index;
        }
      }
      return -1;
    }
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      start = start == null ? 0 : +start;
      end = end === undefined ? length : +end;
      return length ? baseSlice(array, start, end) : [];
    }
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }
    function thru(value, interceptor) {
      return interceptor(value);
    }
    function wrapperChain() {
      return chain(this);
    }
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }
    function every(collection, predicate, guard) {
      predicate = guard ? undefined : predicate;
      return baseEvery(collection, baseIteratee(predicate));
    }
    function filter(collection, predicate) {
      return baseFilter(collection, baseIteratee(predicate));
    }
    function find(collection, predicate) {
      return baseFind(collection, baseIteratee(predicate), baseEach);
    }
    function forEach(collection, iteratee) {
      return baseEach(collection, baseIteratee(iteratee));
    }
    function map(collection, iteratee) {
      return baseMap(collection, baseIteratee(iteratee));
    }
    function reduce(collection, iteratee, accumulator) {
      return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
    }
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      collection = isArrayLike(collection) ? collection : keys(collection);
      return collection.length;
    }
    function some(collection, predicate, guard) {
      predicate = guard ? undefined : predicate;
      return baseSome(collection, baseIteratee(predicate));
    }
    function sortBy(collection, iteratee) {
      var index = 0;
      iteratee = baseIteratee(iteratee);
      return baseMap(baseMap(collection, function(value, key, collection) {
        return {
          'value': value,
          'index': index++,
          'criteria': iteratee(value, key, collection)
        };
      }).sort(function(object, other) {
        return compareAscending(object.criteria, other.criteria) || (object.index - other.index);
      }), baseProperty('value'));
    }
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }
    var bind = rest(function(func, thisArg, partials) {
      return createPartialWrapper(func, BIND_FLAG | PARTIAL_FLAG, thisArg, partials);
    });
    var defer = rest(function(func, args) {
      return baseDelay(func, 1, args);
    });
    var delay = rest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }
    function once(func) {
      return before(2, func);
    }
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return func.apply(this, otherArgs);
      };
    }
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }
    function clone(value) {
      if (!isObject(value)) {
        return value;
      }
      return isArray(value) ? copyArray(value) : copyObject(value, keys(value));
    }
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }
    function gt(value, other) {
      return value > other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(getLength(value)) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objectToString.call(value) == boolTag);
    }
    function isDate(value) {
      return isObjectLike(value) && objectToString.call(value) == dateTag;
    }
    function isEmpty(value) {
      if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
        return !value.length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return !(nonEnumShadows && keys(value).length);
    }
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    function isNaN(value) {
      return isNumber(value) && value != +value;
    }
    function isNull(value) {
      return value === null;
    }
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objectToString.call(value) == numberTag);
    }
    function isRegExp(value) {
      return isObject(value) && objectToString.call(value) == regexpTag;
    }
    function isString(value) {
      return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
    }
    function isUndefined(value) {
      return value === undefined;
    }
    function lt(value, other) {
      return value < other;
    }
    function toArray(value) {
      if (!isArrayLike(value)) {
        return values(value);
      }
      return value.length ? copyArray(value) : [];
    }
    var toInteger = Number;
    var toNumber = Number;
    function toString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : (value + '');
    }
    var assign = createAssigner(function(object, source) {
      copyObject(source, keys(source), object);
    });
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties ? assign(result, properties) : result;
    }
    var defaults = rest(function(args) {
      args.push(undefined, assignInDefaults);
      return assignInWith.apply(undefined, args);
    });
    function has(object, path) {
      return object != null && hasOwnProperty.call(object, path);
    }
    function keys(object) {
      var isProto = isPrototype(object);
      if (!(isProto || isArrayLike(object))) {
        return baseKeys(object);
      }
      var indexes = indexKeys(object),
          skipIndexes = !!indexes,
          result = indexes || [],
          length = result.length;
      for (var key in object) {
        if (hasOwnProperty.call(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
          result.push(key);
        }
      }
      return result;
    }
    function keysIn(object) {
      var index = -1,
          isProto = isPrototype(object),
          props = baseKeysIn(object),
          propsLength = props.length,
          indexes = indexKeys(object),
          skipIndexes = !!indexes,
          result = indexes || [],
          length = result.length;
      while (++index < propsLength) {
        var key = props[index];
        if (!(skipIndexes && (key == 'length' || isIndex(key, length))) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    var pick = rest(function(object, props) {
      return object == null ? {} : basePick(object, baseFlatten(props, 1));
    });
    function result(object, path, defaultValue) {
      var value = object == null ? undefined : object[path];
      if (value === undefined) {
        value = defaultValue;
      }
      return isFunction(value) ? value.call(object) : value;
    }
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
    }
    function identity(value) {
      return value;
    }
    var iteratee = baseIteratee;
    function matches(source) {
      return baseMatches(assign({}, source));
    }
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);
      if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);
      baseEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);
              actions.push({
                'func': func,
                'args': arguments,
                'thisArg': object
              });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });
      return object;
    }
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }
    function noop() {}
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }
    function max(array) {
      return (array && array.length) ? baseExtremum(array, identity, gt) : undefined;
    }
    function min(array) {
      return (array && array.length) ? baseExtremum(array, identity, lt) : undefined;
    }
    lodash.assignIn = assignIn;
    lodash.before = before;
    lodash.bind = bind;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.create = create;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.iteratee = iteratee;
    lodash.keys = keys;
    lodash.map = map;
    lodash.matches = matches;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.once = once;
    lodash.pick = pick;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.values = values;
    lodash.extend = assignIn;
    mixin(lodash, lodash);
    lodash.clone = clone;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.forEach = forEach;
    lodash.has = has;
    lodash.head = head;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.last = last;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.reduce = reduce;
    lodash.result = result;
    lodash.size = size;
    lodash.some = some;
    lodash.uniqueId = uniqueId;
    lodash.each = forEach;
    lodash.first = head;
    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), {'chain': false});
    lodash.VERSION = VERSION;
    baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);
      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
    (freeWindow || freeSelf || {})._ = lodash;
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      define(function() {
        return lodash;
      });
    } else if (freeExports && freeModule) {
      if (moduleExports) {
        (freeModule.exports = lodash)._ = lodash;
      }
      freeExports._ = lodash;
    } else {
      root._ = lodash;
    }
  }.call(this));
})(require('process'));
