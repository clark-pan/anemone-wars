/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'), require('../../addon/mode/simple'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var instructions = ["from", "maintainer", "run", "cmd", "expose", "env", "add", "copy", "entrypoint", "volume", "user", "workdir", "onbuild"],
      instructionRegex = "(" + instructions.join('|') + ")",
      instructionOnlyLine = new RegExp(instructionRegex + "\\s*$", "i"),
      instructionWithArguments = new RegExp(instructionRegex + "(\\s+)", "i");
  CodeMirror.defineSimpleMode("dockerfile", {
    start: [{
      regex: /#.*$/,
      token: "comment"
    }, {
      regex: instructionOnlyLine,
      token: "variable-2"
    }, {
      regex: instructionWithArguments,
      token: ["variable-2", null],
      next: "arguments"
    }, {
      regex: /./,
      token: null
    }],
    arguments: [{
      regex: /#.*$/,
      token: "error",
      next: "start"
    }, {
      regex: /[^#]+\\$/,
      token: null
    }, {
      regex: /[^#]+/,
      token: null,
      next: "start"
    }, {
      regex: /$/,
      token: null,
      next: "start"
    }, {
      token: null,
      next: "start"
    }],
    meta: {lineComment: "#"}
  });
  CodeMirror.defineMIME("text/x-dockerfile", "dockerfile");
});
