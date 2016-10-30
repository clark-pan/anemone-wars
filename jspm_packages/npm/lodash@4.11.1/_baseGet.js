/* */ 
var castPath = require('./_castPath'),
    isKey = require('./_isKey');
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = 0,
      length = path.length;
  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}
module.exports = baseGet;
