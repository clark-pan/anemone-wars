/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'), require('../xml/xml'), require('../javascript/javascript'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  function Context(state, mode, depth, prev) {
    this.state = state;
    this.mode = mode;
    this.depth = depth;
    this.prev = prev;
  }
  function copyContext(context) {
    return new Context(CodeMirror.copyState(context.mode, context.state), context.mode, context.depth, context.prev && copyContext(context.prev));
  }
  CodeMirror.defineMode("jsx", function(config, modeConfig) {
    var xmlMode = CodeMirror.getMode(config, {
      name: "xml",
      allowMissing: true,
      multilineTagIndentPastTag: false
    });
    var jsMode = CodeMirror.getMode(config, modeConfig && modeConfig.base || "javascript");
    function flatXMLIndent(state) {
      var tagName = state.tagName;
      state.tagName = null;
      var result = xmlMode.indent(state, "");
      state.tagName = tagName;
      return result;
    }
    function token(stream, state) {
      if (state.context.mode == xmlMode)
        return xmlToken(stream, state, state.context);
      else
        return jsToken(stream, state, state.context);
    }
    function xmlToken(stream, state, cx) {
      if (cx.depth == 2) {
        if (stream.match(/^.*?\*\//))
          cx.depth = 1;
        else
          stream.skipToEnd();
        return "comment";
      }
      if (stream.peek() == "{") {
        xmlMode.skipAttribute(cx.state);
        var indent = flatXMLIndent(cx.state),
            xmlContext = cx.state.context;
        if (xmlContext && stream.match(/^[^>]*>\s*$/, false)) {
          while (xmlContext.prev && !xmlContext.startOfLine)
            xmlContext = xmlContext.prev;
          if (xmlContext.startOfLine)
            indent -= config.indentUnit;
          else if (cx.prev.state.lexical)
            indent = cx.prev.state.lexical.indented;
        } else if (cx.depth == 1) {
          indent += config.indentUnit;
        }
        state.context = new Context(CodeMirror.startState(jsMode, indent), jsMode, 0, state.context);
        return null;
      }
      if (cx.depth == 1) {
        if (stream.peek() == "<") {
          xmlMode.skipAttribute(cx.state);
          state.context = new Context(CodeMirror.startState(xmlMode, flatXMLIndent(cx.state)), xmlMode, 0, state.context);
          return null;
        } else if (stream.match("//")) {
          stream.skipToEnd();
          return "comment";
        } else if (stream.match("/*")) {
          cx.depth = 2;
          return token(stream, state);
        }
      }
      var style = xmlMode.token(stream, cx.state),
          cur = stream.current(),
          stop;
      if (/\btag\b/.test(style)) {
        if (/>$/.test(cur)) {
          if (cx.state.context)
            cx.depth = 0;
          else
            state.context = state.context.prev;
        } else if (/^</.test(cur)) {
          cx.depth = 1;
        }
      } else if (!style && (stop = cur.indexOf("{")) > -1) {
        stream.backUp(cur.length - stop);
      }
      return style;
    }
    function jsToken(stream, state, cx) {
      if (stream.peek() == "<" && jsMode.expressionAllowed(stream, cx.state)) {
        jsMode.skipExpression(cx.state);
        state.context = new Context(CodeMirror.startState(xmlMode, jsMode.indent(cx.state, "")), xmlMode, 0, state.context);
        return null;
      }
      var style = jsMode.token(stream, cx.state);
      if (!style && cx.depth != null) {
        var cur = stream.current();
        if (cur == "{") {
          cx.depth++;
        } else if (cur == "}") {
          if (--cx.depth == 0)
            state.context = state.context.prev;
        }
      }
      return style;
    }
    return {
      startState: function() {
        return {context: new Context(CodeMirror.startState(jsMode), jsMode)};
      },
      copyState: function(state) {
        return {context: copyContext(state.context)};
      },
      token: token,
      indent: function(state, textAfter, fullLine) {
        return state.context.mode.indent(state.context.state, textAfter, fullLine);
      },
      innerMode: function(state) {
        return state.context;
      }
    };
  }, "xml", "javascript");
  CodeMirror.defineMIME("text/jsx", "jsx");
});
