/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
  }
  ;
  var keywordArray = ["package", "message", "import", "syntax", "required", "optional", "repeated", "reserved", "default", "extensions", "packed", "bool", "bytes", "double", "enum", "float", "string", "int32", "int64", "uint32", "uint64", "sint32", "sint64", "fixed32", "fixed64", "sfixed32", "sfixed64"];
  var keywords = wordRegexp(keywordArray);
  CodeMirror.registerHelper("hintWords", "protobuf", keywordArray);
  var identifiers = new RegExp("^[_A-Za-z\xa1-\uffff][_A-Za-z0-9\xa1-\uffff]*");
  function tokenBase(stream) {
    if (stream.eatSpace())
      return null;
    if (stream.match("//")) {
      stream.skipToEnd();
      return "comment";
    }
    if (stream.match(/^[0-9\.+-]/, false)) {
      if (stream.match(/^[+-]?0x[0-9a-fA-F]+/))
        return "number";
      if (stream.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))
        return "number";
      if (stream.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))
        return "number";
    }
    if (stream.match(/^"([^"]|(""))*"/)) {
      return "string";
    }
    if (stream.match(/^'([^']|(''))*'/)) {
      return "string";
    }
    if (stream.match(keywords)) {
      return "keyword";
    }
    if (stream.match(identifiers)) {
      return "variable";
    }
    ;
    stream.next();
    return null;
  }
  ;
  CodeMirror.defineMode("protobuf", function() {
    return {token: tokenBase};
  });
  CodeMirror.defineMIME("text/x-protobuf", "protobuf");
});
