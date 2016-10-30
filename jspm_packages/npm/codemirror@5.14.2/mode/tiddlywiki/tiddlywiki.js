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
  CodeMirror.defineMode("tiddlywiki", function() {
    var textwords = {};
    var keywords = {
      "allTags": true,
      "closeAll": true,
      "list": true,
      "newJournal": true,
      "newTiddler": true,
      "permaview": true,
      "saveChanges": true,
      "search": true,
      "slider": true,
      "tabs": true,
      "tag": true,
      "tagging": true,
      "tags": true,
      "tiddler": true,
      "timeline": true,
      "today": true,
      "version": true,
      "option": true,
      "with": true,
      "filter": true
    };
    var isSpaceName = /[\w_\-]/i,
        reHR = /^\-\-\-\-+$/,
        reWikiCommentStart = /^\/\*\*\*$/,
        reWikiCommentStop = /^\*\*\*\/$/,
        reBlockQuote = /^<<<$/,
        reJsCodeStart = /^\/\/\{\{\{$/,
        reJsCodeStop = /^\/\/\}\}\}$/,
        reXmlCodeStart = /^<!--\{\{\{-->$/,
        reXmlCodeStop = /^<!--\}\}\}-->$/,
        reCodeBlockStart = /^\{\{\{$/,
        reCodeBlockStop = /^\}\}\}$/,
        reUntilCodeStop = /.*?\}\}\}/;
    function chain(stream, state, f) {
      state.tokenize = f;
      return f(stream, state);
    }
    function tokenBase(stream, state) {
      var sol = stream.sol(),
          ch = stream.peek();
      state.block = false;
      if (sol && /[<\/\*{}\-]/.test(ch)) {
        if (stream.match(reCodeBlockStart)) {
          state.block = true;
          return chain(stream, state, twTokenCode);
        }
        if (stream.match(reBlockQuote))
          return 'quote';
        if (stream.match(reWikiCommentStart) || stream.match(reWikiCommentStop))
          return 'comment';
        if (stream.match(reJsCodeStart) || stream.match(reJsCodeStop) || stream.match(reXmlCodeStart) || stream.match(reXmlCodeStop))
          return 'comment';
        if (stream.match(reHR))
          return 'hr';
      }
      stream.next();
      if (sol && /[\/\*!#;:>|]/.test(ch)) {
        if (ch == "!") {
          stream.skipToEnd();
          return "header";
        }
        if (ch == "*") {
          stream.eatWhile('*');
          return "comment";
        }
        if (ch == "#") {
          stream.eatWhile('#');
          return "comment";
        }
        if (ch == ";") {
          stream.eatWhile(';');
          return "comment";
        }
        if (ch == ":") {
          stream.eatWhile(':');
          return "comment";
        }
        if (ch == ">") {
          stream.eatWhile(">");
          return "quote";
        }
        if (ch == '|')
          return 'header';
      }
      if (ch == '{' && stream.match(/\{\{/))
        return chain(stream, state, twTokenCode);
      if (/[hf]/i.test(ch) && /[ti]/i.test(stream.peek()) && stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i))
        return "link";
      if (ch == '"')
        return 'string';
      if (ch == '~')
        return 'brace';
      if (/[\[\]]/.test(ch) && stream.match(ch))
        return 'brace';
      if (ch == "@") {
        stream.eatWhile(isSpaceName);
        return "link";
      }
      if (/\d/.test(ch)) {
        stream.eatWhile(/\d/);
        return "number";
      }
      if (ch == "/") {
        if (stream.eat("%")) {
          return chain(stream, state, twTokenComment);
        } else if (stream.eat("/")) {
          return chain(stream, state, twTokenEm);
        }
      }
      if (ch == "_" && stream.eat("_"))
        return chain(stream, state, twTokenUnderline);
      if (ch == "-" && stream.eat("-")) {
        if (stream.peek() != ' ')
          return chain(stream, state, twTokenStrike);
        if (stream.peek() == ' ')
          return 'brace';
      }
      if (ch == "'" && stream.eat("'"))
        return chain(stream, state, twTokenStrong);
      if (ch == "<" && stream.eat("<"))
        return chain(stream, state, twTokenMacro);
      stream.eatWhile(/[\w\$_]/);
      return textwords.propertyIsEnumerable(stream.current()) ? "keyword" : null;
    }
    function twTokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "%");
      }
      return "comment";
    }
    function twTokenStrong(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "'" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "'");
      }
      return "strong";
    }
    function twTokenCode(stream, state) {
      var sb = state.block;
      if (sb && stream.current()) {
        return "comment";
      }
      if (!sb && stream.match(reUntilCodeStop)) {
        state.tokenize = tokenBase;
        return "comment";
      }
      if (sb && stream.sol() && stream.match(reCodeBlockStop)) {
        state.tokenize = tokenBase;
        return "comment";
      }
      stream.next();
      return "comment";
    }
    function twTokenEm(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "/");
      }
      return "em";
    }
    function twTokenUnderline(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "_" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "_");
      }
      return "underlined";
    }
    function twTokenStrike(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "-" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "-");
      }
      return "strikethrough";
    }
    function twTokenMacro(stream, state) {
      if (stream.current() == '<<') {
        return 'macro';
      }
      var ch = stream.next();
      if (!ch) {
        state.tokenize = tokenBase;
        return null;
      }
      if (ch == ">") {
        if (stream.peek() == '>') {
          stream.next();
          state.tokenize = tokenBase;
          return "macro";
        }
      }
      stream.eatWhile(/[\w\$_]/);
      return keywords.propertyIsEnumerable(stream.current()) ? "keyword" : null;
    }
    return {
      startState: function() {
        return {tokenize: tokenBase};
      },
      token: function(stream, state) {
        if (stream.eatSpace())
          return null;
        var style = state.tokenize(stream, state);
        return style;
      }
    };
  });
  CodeMirror.defineMIME("text/x-tiddlywiki", "tiddlywiki");
});
