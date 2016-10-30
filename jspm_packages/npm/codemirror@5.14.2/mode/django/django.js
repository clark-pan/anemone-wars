/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'), require('../htmlmixed/htmlmixed'), require('../../addon/mode/overlay'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../../addon/mode/overlay"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.defineMode("django:inner", function() {
    var keywords = ["block", "endblock", "for", "endfor", "true", "false", "filter", "endfilter", "loop", "none", "self", "super", "if", "elif", "endif", "as", "else", "import", "with", "endwith", "without", "context", "ifequal", "endifequal", "ifnotequal", "endifnotequal", "extends", "include", "load", "comment", "endcomment", "empty", "url", "static", "trans", "blocktrans", "endblocktrans", "now", "regroup", "lorem", "ifchanged", "endifchanged", "firstof", "debug", "cycle", "csrf_token", "autoescape", "endautoescape", "spaceless", "endspaceless", "ssi", "templatetag", "verbatim", "endverbatim", "widthratio"],
        filters = ["add", "addslashes", "capfirst", "center", "cut", "date", "default", "default_if_none", "dictsort", "dictsortreversed", "divisibleby", "escape", "escapejs", "filesizeformat", "first", "floatformat", "force_escape", "get_digit", "iriencode", "join", "last", "length", "length_is", "linebreaks", "linebreaksbr", "linenumbers", "ljust", "lower", "make_list", "phone2numeric", "pluralize", "pprint", "random", "removetags", "rjust", "safe", "safeseq", "slice", "slugify", "stringformat", "striptags", "time", "timesince", "timeuntil", "title", "truncatechars", "truncatechars_html", "truncatewords", "truncatewords_html", "unordered_list", "upper", "urlencode", "urlize", "urlizetrunc", "wordcount", "wordwrap", "yesno"],
        operators = ["==", "!=", "<", ">", "<=", ">="],
        wordOperators = ["in", "not", "or", "and"];
    keywords = new RegExp("^\\b(" + keywords.join("|") + ")\\b");
    filters = new RegExp("^\\b(" + filters.join("|") + ")\\b");
    operators = new RegExp("^\\b(" + operators.join("|") + ")\\b");
    wordOperators = new RegExp("^\\b(" + wordOperators.join("|") + ")\\b");
    function tokenBase(stream, state) {
      if (stream.match("{{")) {
        state.tokenize = inVariable;
        return "tag";
      } else if (stream.match("{%")) {
        state.tokenize = inTag;
        return "tag";
      } else if (stream.match("{#")) {
        state.tokenize = inComment;
        return "comment";
      }
      while (stream.next() != null && !stream.match(/\{[{%#]/, false)) {}
      return null;
    }
    function inString(delimiter, previousTokenizer) {
      return function(stream, state) {
        if (!state.escapeNext && stream.eat(delimiter)) {
          state.tokenize = previousTokenizer;
        } else {
          if (state.escapeNext) {
            state.escapeNext = false;
          }
          var ch = stream.next();
          if (ch == "\\") {
            state.escapeNext = true;
          }
        }
        return "string";
      };
    }
    function inVariable(stream, state) {
      if (state.waitDot) {
        state.waitDot = false;
        if (stream.peek() != ".") {
          return "null";
        }
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat(".")) {
          state.waitProperty = true;
          return "null";
        } else {
          throw Error("Unexpected error while waiting for property.");
        }
      }
      if (state.waitPipe) {
        state.waitPipe = false;
        if (stream.peek() != "|") {
          return "null";
        }
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat("|")) {
          state.waitFilter = true;
          return "null";
        } else {
          throw Error("Unexpected error while waiting for filter.");
        }
      }
      if (state.waitProperty) {
        state.waitProperty = false;
        if (stream.match(/\b(\w+)\b/)) {
          state.waitDot = true;
          state.waitPipe = true;
          return "property";
        }
      }
      if (state.waitFilter) {
        state.waitFilter = false;
        if (stream.match(filters)) {
          return "variable-2";
        }
      }
      if (stream.eatSpace()) {
        state.waitProperty = false;
        return "null";
      }
      if (stream.match(/\b\d+(\.\d+)?\b/)) {
        return "number";
      }
      if (stream.match("'")) {
        state.tokenize = inString("'", state.tokenize);
        return "string";
      } else if (stream.match('"')) {
        state.tokenize = inString('"', state.tokenize);
        return "string";
      }
      if (stream.match(/\b(\w+)\b/) && !state.foundVariable) {
        state.waitDot = true;
        state.waitPipe = true;
        return "variable";
      }
      if (stream.match("}}")) {
        state.waitProperty = null;
        state.waitFilter = null;
        state.waitDot = null;
        state.waitPipe = null;
        state.tokenize = tokenBase;
        return "tag";
      }
      stream.next();
      return "null";
    }
    function inTag(stream, state) {
      if (state.waitDot) {
        state.waitDot = false;
        if (stream.peek() != ".") {
          return "null";
        }
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat(".")) {
          state.waitProperty = true;
          return "null";
        } else {
          throw Error("Unexpected error while waiting for property.");
        }
      }
      if (state.waitPipe) {
        state.waitPipe = false;
        if (stream.peek() != "|") {
          return "null";
        }
        if (stream.match(/\.\W+/)) {
          return "error";
        } else if (stream.eat("|")) {
          state.waitFilter = true;
          return "null";
        } else {
          throw Error("Unexpected error while waiting for filter.");
        }
      }
      if (state.waitProperty) {
        state.waitProperty = false;
        if (stream.match(/\b(\w+)\b/)) {
          state.waitDot = true;
          state.waitPipe = true;
          return "property";
        }
      }
      if (state.waitFilter) {
        state.waitFilter = false;
        if (stream.match(filters)) {
          return "variable-2";
        }
      }
      if (stream.eatSpace()) {
        state.waitProperty = false;
        return "null";
      }
      if (stream.match(/\b\d+(\.\d+)?\b/)) {
        return "number";
      }
      if (stream.match("'")) {
        state.tokenize = inString("'", state.tokenize);
        return "string";
      } else if (stream.match('"')) {
        state.tokenize = inString('"', state.tokenize);
        return "string";
      }
      if (stream.match(operators)) {
        return "operator";
      }
      if (stream.match(wordOperators)) {
        return "keyword";
      }
      var keywordMatch = stream.match(keywords);
      if (keywordMatch) {
        if (keywordMatch[0] == "comment") {
          state.blockCommentTag = true;
        }
        return "keyword";
      }
      if (stream.match(/\b(\w+)\b/)) {
        state.waitDot = true;
        state.waitPipe = true;
        return "variable";
      }
      if (stream.match("%}")) {
        state.waitProperty = null;
        state.waitFilter = null;
        state.waitDot = null;
        state.waitPipe = null;
        if (state.blockCommentTag) {
          state.blockCommentTag = false;
          state.tokenize = inBlockComment;
        } else {
          state.tokenize = tokenBase;
        }
        return "tag";
      }
      stream.next();
      return "null";
    }
    function inComment(stream, state) {
      if (stream.match(/^.*?#\}/))
        state.tokenize = tokenBase;
      else
        stream.skipToEnd();
      return "comment";
    }
    function inBlockComment(stream, state) {
      if (stream.match(/\{%\s*endcomment\s*%\}/, false)) {
        state.tokenize = inTag;
        stream.match("{%");
        return "tag";
      } else {
        stream.next();
        return "comment";
      }
    }
    return {
      startState: function() {
        return {tokenize: tokenBase};
      },
      token: function(stream, state) {
        return state.tokenize(stream, state);
      },
      blockCommentStart: "{% comment %}",
      blockCommentEnd: "{% endcomment %}"
    };
  });
  CodeMirror.defineMode("django", function(config) {
    var htmlBase = CodeMirror.getMode(config, "text/html");
    var djangoInner = CodeMirror.getMode(config, "django:inner");
    return CodeMirror.overlayMode(htmlBase, djangoInner);
  });
  CodeMirror.defineMIME("text/x-django", "django");
});
