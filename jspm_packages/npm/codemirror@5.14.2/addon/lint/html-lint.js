/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'), require('htmlhint'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "htmlhint"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var defaultRules = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": false,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true
  };
  CodeMirror.registerHelper("lint", "html", function(text, options) {
    var found = [];
    if (!window.HTMLHint)
      return found;
    var messages = HTMLHint.verify(text, options && options.rules || defaultRules);
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var startLine = message.line - 1,
          endLine = message.line - 1,
          startCol = message.col - 1,
          endCol = message.col;
      found.push({
        from: CodeMirror.Pos(startLine, startCol),
        to: CodeMirror.Pos(endLine, endCol),
        message: message.message,
        severity: message.type
      });
    }
    return found;
  });
});
