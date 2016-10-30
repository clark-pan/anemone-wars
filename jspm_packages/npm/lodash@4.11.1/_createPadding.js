/* */ 
var baseRepeat = require('./_baseRepeat'),
    castSlice = require('./_castSlice'),
    reHasComplexSymbol = require('./_reHasComplexSymbol'),
    stringSize = require('./_stringSize'),
    stringToArray = require('./_stringToArray');
var nativeCeil = Math.ceil;
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : (chars + '');
  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }
  var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
  return reHasComplexSymbol.test(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
}
module.exports = createPadding;
