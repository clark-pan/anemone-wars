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
  CodeMirror.defineMode("verilog", function(config, parserConfig) {
    var indentUnit = config.indentUnit,
        statementIndentUnit = parserConfig.statementIndentUnit || indentUnit,
        dontAlignCalls = parserConfig.dontAlignCalls,
        noIndentKeywords = parserConfig.noIndentKeywords || [],
        multiLineStrings = parserConfig.multiLineStrings,
        hooks = parserConfig.hooks || {};
    function words(str) {
      var obj = {},
          words = str.split(" ");
      for (var i = 0; i < words.length; ++i)
        obj[words[i]] = true;
      return obj;
    }
    var keywords = words("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind " + "bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config " + "const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable " + "dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup " + "endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask " + "enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin " + "function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import " + "incdir include initial inout input inside instance int integer interconnect interface intersect join join_any " + "join_none large let liblist library local localparam logic longint macromodule matches medium modport module " + "nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed " + "parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup " + "pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg " + "reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime " + "s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify " + "specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on " + "table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior " + "trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void " + "wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor");
    var isOperatorChar = /[\+\-\*\/!~&|^%=?:]/;
    var isBracketChar = /[\[\]{}()]/;
    var unsignedNumber = /\d[0-9_]*/;
    var decimalLiteral = /\d*\s*'s?d\s*\d[0-9_]*/i;
    var binaryLiteral = /\d*\s*'s?b\s*[xz01][xz01_]*/i;
    var octLiteral = /\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i;
    var hexLiteral = /\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i;
    var realLiteral = /(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i;
    var closingBracketOrWord = /^((\w+)|[)}\]])/;
    var closingBracket = /[)}\]]/;
    var curPunc;
    var curKeyword;
    var blockKeywords = words("case checker class clocking config function generate interface module package" + "primitive program property specify sequence table task");
    var openClose = {};
    for (var keyword in blockKeywords) {
      openClose[keyword] = "end" + keyword;
    }
    openClose["begin"] = "end";
    openClose["casex"] = "endcase";
    openClose["casez"] = "endcase";
    openClose["do"] = "while";
    openClose["fork"] = "join;join_any;join_none";
    openClose["covergroup"] = "endgroup";
    for (var i in noIndentKeywords) {
      var keyword = noIndentKeywords[i];
      if (openClose[keyword]) {
        openClose[keyword] = undefined;
      }
    }
    var statementKeywords = words("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while");
    function tokenBase(stream, state) {
      var ch = stream.peek(),
          style;
      if (hooks[ch] && (style = hooks[ch](stream, state)) != false)
        return style;
      if (hooks.tokenBase && (style = hooks.tokenBase(stream, state)) != false)
        return style;
      if (/[,;:\.]/.test(ch)) {
        curPunc = stream.next();
        return null;
      }
      if (isBracketChar.test(ch)) {
        curPunc = stream.next();
        return "bracket";
      }
      if (ch == '`') {
        stream.next();
        if (stream.eatWhile(/[\w\$_]/)) {
          return "def";
        } else {
          return null;
        }
      }
      if (ch == '$') {
        stream.next();
        if (stream.eatWhile(/[\w\$_]/)) {
          return "meta";
        } else {
          return null;
        }
      }
      if (ch == '#') {
        stream.next();
        stream.eatWhile(/[\d_.]/);
        return "def";
      }
      if (ch == '"') {
        stream.next();
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      }
      if (ch == "/") {
        stream.next();
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        }
        if (stream.eat("/")) {
          stream.skipToEnd();
          return "comment";
        }
        stream.backUp(1);
      }
      if (stream.match(realLiteral) || stream.match(decimalLiteral) || stream.match(binaryLiteral) || stream.match(octLiteral) || stream.match(hexLiteral) || stream.match(unsignedNumber) || stream.match(realLiteral)) {
        return "number";
      }
      if (stream.eatWhile(isOperatorChar)) {
        return "meta";
      }
      if (stream.eatWhile(/[\w\$_]/)) {
        var cur = stream.current();
        if (keywords[cur]) {
          if (openClose[cur]) {
            curPunc = "newblock";
          }
          if (statementKeywords[cur]) {
            curPunc = "newstatement";
          }
          curKeyword = cur;
          return "keyword";
        }
        return "variable";
      }
      stream.next();
      return null;
    }
    function tokenString(quote) {
      return function(stream, state) {
        var escaped = false,
            next,
            end = false;
        while ((next = stream.next()) != null) {
          if (next == quote && !escaped) {
            end = true;
            break;
          }
          escaped = !escaped && next == "\\";
        }
        if (end || !(escaped || multiLineStrings))
          state.tokenize = tokenBase;
        return "string";
      };
    }
    function tokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "*");
      }
      return "comment";
    }
    function Context(indented, column, type, align, prev) {
      this.indented = indented;
      this.column = column;
      this.type = type;
      this.align = align;
      this.prev = prev;
    }
    function pushContext(state, col, type) {
      var indent = state.indented;
      var c = new Context(indent, col, type, null, state.context);
      return state.context = c;
    }
    function popContext(state) {
      var t = state.context.type;
      if (t == ")" || t == "]" || t == "}") {
        state.indented = state.context.indented;
      }
      return state.context = state.context.prev;
    }
    function isClosing(text, contextClosing) {
      if (text == contextClosing) {
        return true;
      } else {
        var closingKeywords = contextClosing.split(";");
        for (var i in closingKeywords) {
          if (text == closingKeywords[i]) {
            return true;
          }
        }
        return false;
      }
    }
    function buildElectricInputRegEx() {
      var allClosings = [];
      for (var i in openClose) {
        if (openClose[i]) {
          var closings = openClose[i].split(";");
          for (var j in closings) {
            allClosings.push(closings[j]);
          }
        }
      }
      var re = new RegExp("[{}()\\[\\]]|(" + allClosings.join("|") + ")$");
      return re;
    }
    return {
      electricInput: buildElectricInputRegEx(),
      startState: function(basecolumn) {
        var state = {
          tokenize: null,
          context: new Context((basecolumn || 0) - indentUnit, 0, "top", false),
          indented: 0,
          startOfLine: true
        };
        if (hooks.startState)
          hooks.startState(state);
        return state;
      },
      token: function(stream, state) {
        var ctx = state.context;
        if (stream.sol()) {
          if (ctx.align == null)
            ctx.align = false;
          state.indented = stream.indentation();
          state.startOfLine = true;
        }
        if (hooks.token)
          hooks.token(stream, state);
        if (stream.eatSpace())
          return null;
        curPunc = null;
        curKeyword = null;
        var style = (state.tokenize || tokenBase)(stream, state);
        if (style == "comment" || style == "meta" || style == "variable")
          return style;
        if (ctx.align == null)
          ctx.align = true;
        if (curPunc == ctx.type) {
          popContext(state);
        } else if ((curPunc == ";" && ctx.type == "statement") || (ctx.type && isClosing(curKeyword, ctx.type))) {
          ctx = popContext(state);
          while (ctx && ctx.type == "statement")
            ctx = popContext(state);
        } else if (curPunc == "{") {
          pushContext(state, stream.column(), "}");
        } else if (curPunc == "[") {
          pushContext(state, stream.column(), "]");
        } else if (curPunc == "(") {
          pushContext(state, stream.column(), ")");
        } else if (ctx && ctx.type == "endcase" && curPunc == ":") {
          pushContext(state, stream.column(), "statement");
        } else if (curPunc == "newstatement") {
          pushContext(state, stream.column(), "statement");
        } else if (curPunc == "newblock") {
          if (curKeyword == "function" && ctx && (ctx.type == "statement" || ctx.type == "endgroup")) {} else if (curKeyword == "task" && ctx && ctx.type == "statement") {} else {
            var close = openClose[curKeyword];
            pushContext(state, stream.column(), close);
          }
        }
        state.startOfLine = false;
        return style;
      },
      indent: function(state, textAfter) {
        if (state.tokenize != tokenBase && state.tokenize != null)
          return CodeMirror.Pass;
        if (hooks.indent) {
          var fromHook = hooks.indent(state);
          if (fromHook >= 0)
            return fromHook;
        }
        var ctx = state.context,
            firstChar = textAfter && textAfter.charAt(0);
        if (ctx.type == "statement" && firstChar == "}")
          ctx = ctx.prev;
        var closing = false;
        var possibleClosing = textAfter.match(closingBracketOrWord);
        if (possibleClosing)
          closing = isClosing(possibleClosing[0], ctx.type);
        if (ctx.type == "statement")
          return ctx.indented + (firstChar == "{" ? 0 : statementIndentUnit);
        else if (closingBracket.test(ctx.type) && ctx.align && !dontAlignCalls)
          return ctx.column + (closing ? 0 : 1);
        else if (ctx.type == ")" && !closing)
          return ctx.indented + statementIndentUnit;
        else
          return ctx.indented + (closing ? 0 : indentUnit);
      },
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      lineComment: "//"
    };
  });
  CodeMirror.defineMIME("text/x-verilog", {name: "verilog"});
  CodeMirror.defineMIME("text/x-systemverilog", {name: "verilog"});
  var tlvchScopePrefixes = {
    ">": "property",
    "->": "property",
    "-": "hr",
    "|": "link",
    "?$": "qualifier",
    "?*": "qualifier",
    "@-": "variable-3",
    "@": "variable-3",
    "?": "qualifier"
  };
  function tlvGenIndent(stream, state) {
    var tlvindentUnit = 2;
    var rtnIndent = -1,
        indentUnitRq = 0,
        curIndent = stream.indentation();
    switch (state.tlvCurCtlFlowChar) {
      case "\\":
        curIndent = 0;
        break;
      case "|":
        if (state.tlvPrevPrevCtlFlowChar == "@") {
          indentUnitRq = -2;
          break;
        }
        if (tlvchScopePrefixes[state.tlvPrevCtlFlowChar])
          indentUnitRq = 1;
        break;
      case "M":
        if (state.tlvPrevPrevCtlFlowChar == "@") {
          indentUnitRq = -2;
          break;
        }
        if (tlvchScopePrefixes[state.tlvPrevCtlFlowChar])
          indentUnitRq = 1;
        break;
      case "@":
        if (state.tlvPrevCtlFlowChar == "S")
          indentUnitRq = -1;
        if (state.tlvPrevCtlFlowChar == "|")
          indentUnitRq = 1;
        break;
      case "S":
        if (state.tlvPrevCtlFlowChar == "@")
          indentUnitRq = 1;
        if (tlvchScopePrefixes[state.tlvPrevCtlFlowChar])
          indentUnitRq = 1;
        break;
    }
    var statementIndentUnit = tlvindentUnit;
    rtnIndent = curIndent + (indentUnitRq * statementIndentUnit);
    return rtnIndent >= 0 ? rtnIndent : curIndent;
  }
  CodeMirror.defineMIME("text/x-tlv", {
    name: "verilog",
    hooks: {
      "\\": function(stream, state) {
        var vxIndent = 0,
            style = false;
        var curPunc = stream.string;
        if ((stream.sol()) && ((/\\SV/.test(stream.string)) || (/\\TLV/.test(stream.string)))) {
          curPunc = (/\\TLV_version/.test(stream.string)) ? "\\TLV_version" : stream.string;
          stream.skipToEnd();
          if (curPunc == "\\SV" && state.vxCodeActive) {
            state.vxCodeActive = false;
          }
          ;
          if ((/\\TLV/.test(curPunc) && !state.vxCodeActive) || (curPunc == "\\TLV_version" && state.vxCodeActive)) {
            state.vxCodeActive = true;
          }
          ;
          style = "keyword";
          state.tlvCurCtlFlowChar = state.tlvPrevPrevCtlFlowChar = state.tlvPrevCtlFlowChar = "";
          if (state.vxCodeActive == true) {
            state.tlvCurCtlFlowChar = "\\";
            vxIndent = tlvGenIndent(stream, state);
          }
          state.vxIndentRq = vxIndent;
        }
        return style;
      },
      tokenBase: function(stream, state) {
        var vxIndent = 0,
            style = false;
        var tlvisOperatorChar = /[\[\]=:]/;
        var tlvkpScopePrefixs = {
          "**": "variable-2",
          "*": "variable-2",
          "$$": "variable",
          "$": "variable",
          "^^": "attribute",
          "^": "attribute"
        };
        var ch = stream.peek();
        var vxCurCtlFlowCharValueAtStart = state.tlvCurCtlFlowChar;
        if (state.vxCodeActive == true) {
          if (/[\[\]{}\(\);\:]/.test(ch)) {
            style = "meta";
            stream.next();
          } else if (ch == "/") {
            stream.next();
            if (stream.eat("/")) {
              stream.skipToEnd();
              style = "comment";
              state.tlvCurCtlFlowChar = "S";
            } else {
              stream.backUp(1);
            }
          } else if (ch == "@") {
            style = tlvchScopePrefixes[ch];
            state.tlvCurCtlFlowChar = "@";
            stream.next();
            stream.eatWhile(/[\w\$_]/);
          } else if (stream.match(/\b[mM]4+/, true)) {
            stream.skipTo("(");
            style = "def";
            state.tlvCurCtlFlowChar = "M";
          } else if (ch == "!" && stream.sol()) {
            style = "comment";
            stream.next();
          } else if (tlvisOperatorChar.test(ch)) {
            stream.eatWhile(tlvisOperatorChar);
            style = "operator";
          } else if (ch == "#") {
            state.tlvCurCtlFlowChar = (state.tlvCurCtlFlowChar == "") ? ch : state.tlvCurCtlFlowChar;
            stream.next();
            stream.eatWhile(/[+-]\d/);
            style = "tag";
          } else if (tlvkpScopePrefixs.propertyIsEnumerable(ch)) {
            style = tlvkpScopePrefixs[ch];
            state.tlvCurCtlFlowChar = state.tlvCurCtlFlowChar == "" ? "S" : state.tlvCurCtlFlowChar;
            stream.next();
            stream.match(/[a-zA-Z_0-9]+/);
          } else if (style = tlvchScopePrefixes[ch] || false) {
            state.tlvCurCtlFlowChar = state.tlvCurCtlFlowChar == "" ? ch : state.tlvCurCtlFlowChar;
            stream.next();
            stream.match(/[a-zA-Z_0-9]+/);
          }
          if (state.tlvCurCtlFlowChar != vxCurCtlFlowCharValueAtStart) {
            vxIndent = tlvGenIndent(stream, state);
            state.vxIndentRq = vxIndent;
          }
        }
        return style;
      },
      token: function(stream, state) {
        if (state.vxCodeActive == true && stream.sol() && state.tlvCurCtlFlowChar != "") {
          state.tlvPrevPrevCtlFlowChar = state.tlvPrevCtlFlowChar;
          state.tlvPrevCtlFlowChar = state.tlvCurCtlFlowChar;
          state.tlvCurCtlFlowChar = "";
        }
      },
      indent: function(state) {
        return (state.vxCodeActive == true) ? state.vxIndentRq : -1;
      },
      startState: function(state) {
        state.tlvCurCtlFlowChar = "";
        state.tlvPrevCtlFlowChar = "";
        state.tlvPrevPrevCtlFlowChar = "";
        state.vxCodeActive = true;
        state.vxIndentRq = 0;
      }
    }
  });
});
