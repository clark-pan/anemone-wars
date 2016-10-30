/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'), require('../htmlmixed/htmlmixed'), require('../../addon/mode/multiplex'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../../addon/mode/multiplex"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.defineMode("htmlembedded", function(config, parserConfig) {
    return CodeMirror.multiplexingMode(CodeMirror.getMode(config, "htmlmixed"), {
      open: parserConfig.open || parserConfig.scriptStartRegex || "<%",
      close: parserConfig.close || parserConfig.scriptEndRegex || "%>",
      mode: CodeMirror.getMode(config, parserConfig.scriptingModeSpec)
    });
  }, "htmlmixed");
  CodeMirror.defineMIME("application/x-ejs", {
    name: "htmlembedded",
    scriptingModeSpec: "javascript"
  });
  CodeMirror.defineMIME("application/x-aspx", {
    name: "htmlembedded",
    scriptingModeSpec: "text/x-csharp"
  });
  CodeMirror.defineMIME("application/x-jsp", {
    name: "htmlembedded",
    scriptingModeSpec: "text/x-java"
  });
  CodeMirror.defineMIME("application/x-erb", {
    name: "htmlembedded",
    scriptingModeSpec: "ruby"
  });
});
