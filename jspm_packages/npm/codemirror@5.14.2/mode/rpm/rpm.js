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
  CodeMirror.defineMode("rpm-changes", function() {
    var headerSeperator = /^-+$/;
    var headerLine = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)  ?\d{1,2} \d{2}:\d{2}(:\d{2})? [A-Z]{3,4} \d{4} - /;
    var simpleEmail = /^[\w+.-]+@[\w.-]+/;
    return {token: function(stream) {
        if (stream.sol()) {
          if (stream.match(headerSeperator)) {
            return 'tag';
          }
          if (stream.match(headerLine)) {
            return 'tag';
          }
        }
        if (stream.match(simpleEmail)) {
          return 'string';
        }
        stream.next();
        return null;
      }};
  });
  CodeMirror.defineMIME("text/x-rpm-changes", "rpm-changes");
  CodeMirror.defineMode("rpm-spec", function() {
    var arch = /^(i386|i586|i686|x86_64|ppc64le|ppc64|ppc|ia64|s390x|s390|sparc64|sparcv9|sparc|noarch|alphaev6|alpha|hppa|mipsel)/;
    var preamble = /^[a-zA-Z0-9()]+:/;
    var section = /^%(debug_package|package|description|prep|build|install|files|clean|changelog|preinstall|preun|postinstall|postun|pretrans|posttrans|pre|post|triggerin|triggerun|verifyscript|check|triggerpostun|triggerprein|trigger)/;
    var control_flow_complex = /^%(ifnarch|ifarch|if)/;
    var control_flow_simple = /^%(else|endif)/;
    var operators = /^(\!|\?|\<\=|\<|\>\=|\>|\=\=|\&\&|\|\|)/;
    return {
      startState: function() {
        return {
          controlFlow: false,
          macroParameters: false,
          section: false
        };
      },
      token: function(stream, state) {
        var ch = stream.peek();
        if (ch == "#") {
          stream.skipToEnd();
          return "comment";
        }
        if (stream.sol()) {
          if (stream.match(preamble)) {
            return "header";
          }
          if (stream.match(section)) {
            return "atom";
          }
        }
        if (stream.match(/^\$\w+/)) {
          return "def";
        }
        if (stream.match(/^\$\{\w+\}/)) {
          return "def";
        }
        if (stream.match(control_flow_simple)) {
          return "keyword";
        }
        if (stream.match(control_flow_complex)) {
          state.controlFlow = true;
          return "keyword";
        }
        if (state.controlFlow) {
          if (stream.match(operators)) {
            return "operator";
          }
          if (stream.match(/^(\d+)/)) {
            return "number";
          }
          if (stream.eol()) {
            state.controlFlow = false;
          }
        }
        if (stream.match(arch)) {
          if (stream.eol()) {
            state.controlFlow = false;
          }
          return "number";
        }
        if (stream.match(/^%[\w]+/)) {
          if (stream.match(/^\(/)) {
            state.macroParameters = true;
          }
          return "keyword";
        }
        if (state.macroParameters) {
          if (stream.match(/^\d+/)) {
            return "number";
          }
          if (stream.match(/^\)/)) {
            state.macroParameters = false;
            return "keyword";
          }
        }
        if (stream.match(/^%\{\??[\w \-\:\!]+\}/)) {
          if (stream.eol()) {
            state.controlFlow = false;
          }
          return "def";
        }
        stream.next();
        return null;
      }
    };
  });
  CodeMirror.defineMIME("text/x-rpm-spec", "rpm-spec");
});
