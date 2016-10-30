/* */ 
"format cjs";
(function(process) {
  (function(mod) {
    if (typeof exports == "object" && typeof module == "object")
      mod(require('../../lib/codemirror'));
    else if (typeof define == "function" && define.amd)
      define(["../../lib/codemirror"], mod);
    else
      mod(CodeMirror);
  })(function(CodeMirror) {
    "use strict";
    CodeMirror.defineMode("sas", function() {
      var words = {};
      var isDoubleOperatorSym = {
        eq: 'operator',
        lt: 'operator',
        le: 'operator',
        gt: 'operator',
        ge: 'operator',
        "in": 'operator',
        ne: 'operator',
        or: 'operator'
      };
      var isDoubleOperatorChar = /(<=|>=|!=|<>)/;
      var isSingleOperatorChar = /[=\(:\),{}.*<>+\-\/^\[\]]/;
      function define(style, string, context) {
        if (context) {
          var split = string.split(' ');
          for (var i = 0; i < split.length; i++) {
            words[split[i]] = {
              style: style,
              state: context
            };
          }
        }
      }
      define('def', 'stack pgm view source debug nesting nolist', ['inDataStep']);
      define('def', 'if while until for do do; end end; then else cancel', ['inDataStep']);
      define('def', 'label format _n_ _error_', ['inDataStep']);
      define('def', 'ALTER BUFNO BUFSIZE CNTLLEV COMPRESS DLDMGACTION ENCRYPT ENCRYPTKEY EXTENDOBSCOUNTER GENMAX GENNUM INDEX LABEL OBSBUF OUTREP PW PWREQ READ REPEMPTY REPLACE REUSE ROLE SORTEDBY SPILL TOBSNO TYPE WRITE FILECLOSE FIRSTOBS IN OBS POINTOBS WHERE WHEREUP IDXNAME IDXWHERE DROP KEEP RENAME', ['inDataStep']);
      define('def', 'filevar finfo finv fipname fipnamel fipstate first firstobs floor', ['inDataStep']);
      define('def', 'varfmt varinfmt varlabel varlen varname varnum varray varrayx vartype verify vformat vformatd vformatdx vformatn vformatnx vformatw vformatwx vformatx vinarray vinarrayx vinformat vinformatd vinformatdx vinformatn vinformatnx vinformatw vinformatwx vinformatx vlabel vlabelx vlength vlengthx vname vnamex vnferr vtype vtypex weekday', ['inDataStep']);
      define('def', 'zipfips zipname zipnamel zipstate', ['inDataStep']);
      define('def', 'put putc putn', ['inDataStep']);
      define('builtin', 'data run', ['inDataStep']);
      define('def', 'data', ['inProc']);
      define('def', '%if %end %end; %else %else; %do %do; %then', ['inMacro']);
      define('builtin', 'proc run; quit; libname filename %macro %mend option options', ['ALL']);
      define('def', 'footnote title libname ods', ['ALL']);
      define('def', '%let %put %global %sysfunc %eval ', ['ALL']);
      define('variable', '&sysbuffr &syscc &syscharwidth &syscmd &sysdate &sysdate9 &sysday &sysdevic &sysdmg &sysdsn &sysencoding &sysenv &syserr &syserrortext &sysfilrc &syshostname &sysindex &sysinfo &sysjobid &syslast &syslckrc &syslibrc &syslogapplname &sysmacroname &sysmenv &sysmsg &sysncpu &sysodspath &sysparm &syspbuff &sysprocessid &sysprocessname &sysprocname &sysrc &sysscp &sysscpl &sysscpl &syssite &sysstartid &sysstartname &systcpiphostname &systime &sysuserid &sysver &sysvlong &sysvlong4 &syswarningtext', ['ALL']);
      define('def', 'source2 nosource2 page pageno pagesize', ['ALL']);
      define('def', '_all_ _character_ _cmd_ _freq_ _i_ _infile_ _last_ _msg_ _null_ _numeric_ _temporary_ _type_ abort abs addr adjrsq airy alpha alter altlog altprint and arcos array arsin as atan attrc attrib attrn authserver autoexec awscontrol awsdef awsmenu awsmenumerge awstitle backward band base betainv between blocksize blshift bnot bor brshift bufno bufsize bxor by byerr byline byte calculated call cards cards4 catcache cbufno cdf ceil center cexist change chisq cinv class cleanup close cnonct cntllev coalesce codegen col collate collin column comamid comaux1 comaux2 comdef compbl compound compress config continue convert cos cosh cpuid create cross crosstab css curobs cv daccdb daccdbsl daccsl daccsyd dacctab dairy datalines datalines4 datejul datepart datetime day dbcslang dbcstype dclose ddm delete delimiter depdb depdbsl depsl depsyd deptab dequote descending descript design= device dflang dhms dif digamma dim dinfo display distinct dkricond dkrocond dlm dnum do dopen doptname doptnum dread drop dropnote dsname dsnferr echo else emaildlg emailid emailpw emailserver emailsys encrypt end endsas engine eof eov erf erfc error errorcheck errors exist exp fappend fclose fcol fdelete feedback fetch fetchobs fexist fget file fileclose fileexist filefmt filename fileref  fmterr fmtsearch fnonct fnote font fontalias  fopen foptname foptnum force formatted formchar formdelim formdlim forward fpoint fpos fput fread frewind frlen from fsep fuzz fwrite gaminv gamma getoption getvarc getvarn go goto group gwindow hbar hbound helpenv helploc hms honorappearance hosthelp hostprint hour hpct html hvar ibessel ibr id if index indexc indexw initcmd initstmt inner input inputc inputn inr insert int intck intnx into intrr invaliddata irr is jbessel join juldate keep kentb kurtosis label lag last lbound leave left length levels lgamma lib  library libref line linesize link list log log10 log2 logpdf logpmf logsdf lostcard lowcase lrecl ls macro macrogen maps mautosource max maxdec maxr mdy mean measures median memtype merge merror min minute missing missover mlogic mod mode model modify month mopen mort mprint mrecall msglevel msymtabmax mvarsize myy n nest netpv new news nmiss no nobatch nobs nocaps nocardimage nocenter nocharcode nocmdmac nocol nocum nodate nodbcs nodetails nodmr nodms nodmsbatch nodup nodupkey noduplicates noechoauto noequals noerrorabend noexitwindows nofullstimer noicon noimplmac noint nolist noloadlist nomiss nomlogic nomprint nomrecall nomsgcase nomstored nomultenvappl nonotes nonumber noobs noovp nopad nopercent noprint noprintinit normal norow norsasuser nosetinit  nosplash nosymbolgen note notes notitle notitles notsorted noverbose noxsync noxwait npv null number numkeys nummousekeys nway obs  on open     order ordinal otherwise out outer outp= output over ovp p(1 5 10 25 50 75 90 95 99) pad pad2  paired parm parmcards path pathdll pathname pdf peek peekc pfkey pmf point poisson poke position printer probbeta probbnml probchi probf probgam probhypr probit probnegb probnorm probsig probt procleave prt ps  pw pwreq qtr quote r ranbin rancau ranexp rangam range ranks rannor ranpoi rantbl rantri ranuni read recfm register regr remote remove rename repeat replace resolve retain return reuse reverse rewind right round rsquare rtf rtrace rtraceloc s s2 samploc sasautos sascontrol sasfrscr sasmsg sasmstore sasscript sasuser saving scan sdf second select selection separated seq serror set setcomm setot sign simple sin sinh siteinfo skewness skip sle sls sortedby sortpgm sortseq sortsize soundex  spedis splashlocation split spool sqrt start std stderr stdin stfips stimer stname stnamel stop stopover subgroup subpopn substr sum sumwgt symbol symbolgen symget symput sysget sysin sysleave sysmsg sysparm sysprint sysprintfont sysprod sysrc system t table tables tan tanh tapeclose tbufsize terminal test then timepart tinv  tnonct to today tol tooldef totper transformout translate trantab tranwrd trigamma trim trimn trunc truncover type unformatted uniform union until upcase update user usericon uss validate value var  weight when where while wincharset window work workinit workterm write wsum xsync xwait yearcutoff yes yyq  min max', ['inDataStep', 'inProc']);
      define('operator', 'and not ', ['inDataStep', 'inProc']);
      function tokenize(stream, state) {
        var ch = stream.next();
        if (ch === '/' && stream.eat('*')) {
          state.continueComment = true;
          return "comment";
        } else if (state.continueComment === true) {
          if (ch === '*' && stream.peek() === '/') {
            stream.next();
            state.continueComment = false;
          } else if (stream.skipTo('*')) {
            stream.skipTo('*');
            stream.next();
            if (stream.eat('/'))
              state.continueComment = false;
          } else {
            stream.skipToEnd();
          }
          return "comment";
        }
        var doubleOperator = ch + stream.peek();
        var myString = stream.string;
        var myRegexp = /(?:^\s*|[;]\s*)(\*.*?);/ig;
        var match = myRegexp.exec(myString);
        if (match !== null) {
          if (match.index === 0 && (stream.column() !== (match.index + match[0].length - 1))) {
            stream.backUp(stream.column());
            stream.skipTo(';');
            stream.next();
            return 'comment';
          } else if (match.index + 1 < stream.column() && stream.column() < match.index + match[0].length - 1) {
            stream.backUp(stream.column() - match.index - 1);
            stream.skipTo(';');
            stream.next();
            return 'comment';
          }
        } else if (!state.continueString && (ch === '"' || ch === "'")) {
          state.continueString = ch;
          return "string";
        } else if (state.continueString !== null) {
          if (stream.skipTo(state.continueString)) {
            stream.next();
            state.continueString = null;
          } else {
            stream.skipToEnd();
          }
          return "string";
        } else if (state.continueString !== null && stream.eol()) {
          stream.skipTo(state.continueString) || stream.skipToEnd();
          return "string";
        } else if (/[\d\.]/.test(ch)) {
          if (ch === ".")
            stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/);
          else if (ch === "0")
            stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);
          else
            stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/);
          return "number";
        } else if (isDoubleOperatorChar.test(ch + stream.peek())) {
          stream.next();
          return "operator";
        } else if (isDoubleOperatorSym.hasOwnProperty(doubleOperator)) {
          stream.next();
          if (stream.peek() === ' ')
            return isDoubleOperatorSym[doubleOperator.toLowerCase()];
        } else if (isSingleOperatorChar.test(ch)) {
          return "operator";
        }
        var word;
        if (stream.match(/[%&;\w]+/, false) != null) {
          word = ch + stream.match(/[%&;\w]+/, true);
          if (/&/.test(word))
            return 'variable';
        } else {
          word = ch;
        }
        if (state.nextword) {
          stream.match(/[\w]+/);
          if (stream.peek() === '.')
            stream.skipTo(' ');
          state.nextword = false;
          return 'variable-2';
        }
        if (state.inDataStep) {
          if (word.toLowerCase() === 'run;' || stream.match(/run\s;/)) {
            state.inDataStep = false;
            return 'builtin';
          }
          if ((word) && stream.next() === '.') {
            if (/\w/.test(stream.peek()))
              return 'variable-2';
            else
              return 'variable';
          }
          if (word && words.hasOwnProperty(word.toLowerCase()) && (words[word.toLowerCase()].state.indexOf("inDataStep") !== -1 || words[word.toLowerCase()].state.indexOf("ALL") !== -1)) {
            if (stream.start < stream.pos)
              stream.backUp(stream.pos - stream.start);
            for (var i = 0; i < word.length; ++i)
              stream.next();
            return words[word.toLowerCase()].style;
          }
        }
        if (state.inProc) {
          if (word.toLowerCase() === 'run;' || word.toLowerCase() === 'quit;') {
            state.inProc = false;
            return 'builtin';
          }
          if (word && words.hasOwnProperty(word.toLowerCase()) && (words[word.toLowerCase()].state.indexOf("inProc") !== -1 || words[word.toLowerCase()].state.indexOf("ALL") !== -1)) {
            stream.match(/[\w]+/);
            return words[word].style;
          }
        }
        if (state.inMacro) {
          if (word.toLowerCase() === '%mend') {
            if (stream.peek() === ';')
              stream.next();
            state.inMacro = false;
            return 'builtin';
          }
          if (word && words.hasOwnProperty(word.toLowerCase()) && (words[word.toLowerCase()].state.indexOf("inMacro") !== -1 || words[word.toLowerCase()].state.indexOf("ALL") !== -1)) {
            stream.match(/[\w]+/);
            return words[word.toLowerCase()].style;
          }
          return 'atom';
        }
        if (word && words.hasOwnProperty(word.toLowerCase())) {
          stream.backUp(1);
          stream.match(/[\w]+/);
          if (word.toLowerCase() === 'data' && /=/.test(stream.peek()) === false) {
            state.inDataStep = true;
            state.nextword = true;
            return 'builtin';
          }
          if (word.toLowerCase() === 'proc') {
            state.inProc = true;
            state.nextword = true;
            return 'builtin';
          }
          if (word.toLowerCase() === '%macro') {
            state.inMacro = true;
            state.nextword = true;
            return 'builtin';
          }
          if (/title[1-9]/i.test(word))
            return 'def';
          if (word.toLowerCase() === 'footnote') {
            stream.eat(/[1-9]/);
            return 'def';
          }
          if (state.inDataStep === true && words[word.toLowerCase()].state.indexOf("inDataStep") !== -1)
            return words[word.toLowerCase()].style;
          if (state.inProc === true && words[word.toLowerCase()].state.indexOf("inProc") !== -1)
            return words[word.toLowerCase()].style;
          if (state.inMacro === true && words[word.toLowerCase()].state.indexOf("inMacro") !== -1)
            return words[word.toLowerCase()].style;
          if (words[word.toLowerCase()].state.indexOf("ALL") !== -1)
            return words[word.toLowerCase()].style;
          return null;
        }
        return null;
      }
      return {
        startState: function() {
          return {
            inDataStep: false,
            inProc: false,
            inMacro: false,
            nextword: false,
            continueString: null,
            continueComment: false
          };
        },
        token: function(stream, state) {
          if (stream.eatSpace())
            return null;
          return tokenize(stream, state);
        },
        blockCommentStart: "/*",
        blockCommentEnd: "*/"
      };
    });
    CodeMirror.defineMIME("text/x-sas", "sas");
  });
})(require('process'));
