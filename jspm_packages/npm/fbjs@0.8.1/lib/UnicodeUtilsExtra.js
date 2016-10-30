/* */ 
'use strict';
var UnicodeUtils = require('./UnicodeUtils');
function formatCodePoint(codePoint) {
  codePoint = codePoint || 0;
  var codePointHex = codePoint.toString(16).toUpperCase();
  return 'U+' + '0'.repeat(Math.max(0, 4 - codePointHex.length)) + codePointHex;
}
function getCodePointsFormatted(str) {
  var codePoints = UnicodeUtils.getCodePoints(str);
  return codePoints.map(formatCodePoint);
}
var UnicodeUtilsExtra = {
  formatCodePoint: formatCodePoint,
  getCodePointsFormatted: getCodePointsFormatted
};
module.exports = UnicodeUtilsExtra;
