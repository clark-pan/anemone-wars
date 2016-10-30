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
  var reserve = "><+-.,[]".split("");
  CodeMirror.defineMode("brainfuck", function() {
    return {
      startState: function() {
        return {
          commentLine: false,
          left: 0,
          right: 0,
          commentLoop: false
        };
      },
      token: function(stream, state) {
        if (stream.eatSpace())
          return null;
        if (stream.sol()) {
          state.commentLine = false;
        }
        var ch = stream.next().toString();
        if (reserve.indexOf(ch) !== -1) {
          if (state.commentLine === true) {
            if (stream.eol()) {
              state.commentLine = false;
            }
            return "comment";
          }
          if (ch === "]" || ch === "[") {
            if (ch === "[") {
              state.left++;
            } else {
              state.right++;
            }
            return "bracket";
          } else if (ch === "+" || ch === "-") {
            return "keyword";
          } else if (ch === "<" || ch === ">") {
            return "atom";
          } else if (ch === "." || ch === ",") {
            return "def";
          }
        } else {
          state.commentLine = true;
          if (stream.eol()) {
            state.commentLine = false;
          }
          return "comment";
        }
        if (stream.eol()) {
          state.commentLine = false;
        }
      }
    };
  });
  CodeMirror.defineMIME("text/x-brainfuck", "brainfuck");
});
