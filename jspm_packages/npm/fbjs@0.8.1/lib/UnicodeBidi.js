/* */ 
(function(process) {
  'use strict';
  var UnicodeBidiDirection = require('./UnicodeBidiDirection');
  var invariant = require('./invariant');
  var RANGE_BY_BIDI_TYPE = {
    L: 'A-Za-zªµºÀ-ÖØ-öø-ƺƻ' + 'Ƽ-ƿǀ-ǃǄ-ʓʔʕ-ʯʰ-ʸ' + 'ʻ-ˁː-ˑˠ-ˤˮͰ-ͳͶ-ͷ' + 'ͺͻ-ͽͿΆΈ-ΊΌΎ-Ρ' + 'Σ-ϵϷ-ҁ҂Ҋ-ԯԱ-Ֆՙ' + '՚-՟ա-և։ःऄ-हऻऽ' + 'ा-ीॉ-ौॎ-ॏॐक़-ॡ।-॥' + '०-९॰ॱॲ-ঀং-ঃঅ-ঌ' + 'এ-ঐও-নপ-রলশ-হঽ' + 'া-ীে-ৈো-ৌৎৗড়-ঢ়' + 'য়-ৡ০-৯ৰ-ৱ৴-৹৺ਃ' + 'ਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼' + 'ਵ-ਸ਼ਸ-ਹਾ-ੀਖ਼-ੜਫ਼੦-੯' + 'ੲ-ੴઃઅ-ઍએ-ઑઓ-નપ-ર' + 'લ-ળવ-હઽા-ીૉો-ૌૐ' + 'ૠ-ૡ૦-૯૰ଂ-ଃଅ-ଌଏ-ଐ' + 'ଓ-ନପ-ରଲ-ଳଵ-ହଽାୀ' + 'େ-ୈୋ-ୌୗଡ଼-ଢ଼ୟ-ୡ୦-୯' + '୰ୱ୲-୷ஃஅ-ஊஎ-ஐஒ-க' + 'ங-சஜஞ-டண-தந-பம-ஹ' + 'ா-ிு-ூெ-ைொ-ௌௐௗ' + '௦-௯௰-௲ఁ-ఃఅ-ఌఎ-ఐ' + 'ఒ-నప-హఽు-ౄౘ-ౙౠ-ౡ' + '౦-౯౿ಂ-ಃಅ-ಌಎ-ಐಒ-ನ' + 'ಪ-ಳವ-ಹಽಾಿೀ-ೄೆ' + 'ೇ-ೈೊ-ೋೕ-ೖೞೠ-ೡ೦-೯' + 'ೱ-ೲം-ഃഅ-ഌഎ-ഐഒ-ഺഽ' + 'ാ-ീെ-ൈൊ-ൌൎൗൠ-ൡ' + '൦-൯൰-൵൹ൺ-ൿං-ඃඅ-ඖ' + 'ක-නඳ-රලව-ෆා-ෑෘ-ෟ' + '෦-෯ෲ-ෳ෴ก-ะา-ำเ-ๅ' + 'ๆ๏๐-๙๚-๛ກ-ຂຄງ-ຈ' + 'ຊຍດ-ທນ-ຟມ-ຣລວ' + 'ສ-ຫອ-ະາ-ຳຽເ-ໄໆ' + '໐-໙ໜ-ໟༀ༁-༃༄-༒༓༔' + '༕-༗༚-༟༠-༩༪-༳༴༶༸' + '༾-༿ཀ-ཇཉ-ཬཿ྅ྈ-ྌ' + '྾-࿅࿇-࿌࿎-࿏࿐-࿔࿕-࿘' + '࿙-࿚က-ဪါ-ာေးျ-ြဿ' + '၀-၉၊-၏ၐ-ၕၖ-ၗၚ-ၝၡ' + 'ၢ-ၤၥ-ၦၧ-ၭၮ-ၰၵ-ႁ' + 'ႃ-ႄႇ-ႌႎႏ႐-႙ႚ-ႜ' + '႞-႟Ⴀ-ჅჇჍა-ჺ჻ჼ' + 'ჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈ' + 'ኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅ' + 'ወ-ዖዘ-ጐጒ-ጕጘ-ፚ፠-፨' + '፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬ᙭-᙮' + 'ᙯ-ᙿᚁ-ᚚᚠ-ᛪ᛫-᛭ᛮ-ᛰ' + 'ᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱ᜵-᜶' + 'ᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳាើ-ៅ' + 'ះ-ៈ។-៖ៗ៘-៚ៜ០-៩' + '᠐-᠙ᠠ-ᡂᡃᡄ-ᡷᢀ-ᢨᢪ' + 'ᢰ-ᣵᤀ-ᤞᤣ-ᤦᤩ-ᤫᤰ-ᤱ' + 'ᤳ-ᤸ᥆-᥏ᥐ-ᥭᥰ-ᥴᦀ-ᦫ' + 'ᦰ-ᧀᧁ-ᧇᧈ-ᧉ᧐-᧙᧚ᨀ-ᨖ' + 'ᨙ-ᨚ᨞-᨟ᨠ-ᩔᩕᩗᩡᩣ-ᩤ' + 'ᩭ-ᩲ᪀-᪉᪐-᪙᪠-᪦ᪧ᪨-᪭' + 'ᬄᬅ-ᬳᬵᬻᬽ-ᭁᭃ-᭄ᭅ-ᭋ' + '᭐-᭙᭚-᭠᭡-᭪᭴-᭼ᮂᮃ-ᮠ' + 'ᮡᮦ-ᮧ᮪ᮮ-ᮯ᮰-᮹ᮺ-ᯥᯧ' + 'ᯪ-ᯬᯮ᯲-᯳᯼-᯿ᰀ-ᰣᰤ-ᰫ' + 'ᰴ-ᰵ᰻-᰿᱀-᱉ᱍ-ᱏ᱐-᱙' + 'ᱚ-ᱷᱸ-ᱽ᱾-᱿᳀-᳇᳓᳡' + 'ᳩ-ᳬᳮ-ᳱᳲ-ᳳᳵ-ᳶᴀ-ᴫ' + 'ᴬ-ᵪᵫ-ᵷᵸᵹ-ᶚᶛ-ᶿḀ-ἕ' + 'Ἐ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝ' + 'Ὗ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌ' + 'ῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‎' + 'ⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝ' + 'ℤΩℨK-ℭℯ-ℴℵ-ℸℹ' + 'ℼ-ℿⅅ-ⅉⅎ⅏Ⅰ-ↂↃ-ↄ' + 'ↅ-ↈ⌶-⍺⎕⒜-ⓩ⚬⠀-⣿' + 'Ⰰ-Ⱞⰰ-ⱞⱠ-ⱻⱼ-ⱽⱾ-ⳤ' + 'Ⳬ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ' + '⵰ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾ' + 'ⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々〆〇' + '〡-〩〮-〯〱-〵〸-〺〻〼' + 'ぁ-ゖゝ-ゞゟァ-ヺー-ヾヿ' + 'ㄅ-ㄭㄱ-ㆎ㆐-㆑㆒-㆕㆖-㆟' + 'ㆠ-ㆺㇰ-ㇿ㈀-㈜㈠-㈩㈪-㉇' + '㉈-㉏㉠-㉻㉿㊀-㊉㊊-㊰㋀-㋋' + '㋐-㋾㌀-㍶㍻-㏝㏠-㏾㐀-䶵' + '一-鿌ꀀ-ꀔꀕꀖ-ꒌꓐ-ꓷꓸ-ꓽ' + '꓾-꓿ꔀ-ꘋꘌꘐ-ꘟ꘠-꘩ꘪ-ꘫ' + 'Ꙁ-ꙭꙮꚀ-ꚛꚜ-ꚝꚠ-ꛥꛦ-ꛯ' + '꛲-꛷Ꜣ-ꝯꝰꝱ-ꞇ꞉-꞊Ꞌ-ꞎ' + 'Ꞑ-ꞭꞰ-Ʇꟷꟸ-ꟹꟺꟻ-ꠁ' + 'ꠃ-ꠅꠇ-ꠊꠌ-ꠢꠣ-ꠤꠧ꠰-꠵' + '꠶-꠷ꡀ-ꡳꢀ-ꢁꢂ-ꢳꢴ-ꣃ' + '꣎-꣏꣐-꣙ꣲ-ꣷ꣸-꣺ꣻ꤀-꤉' + 'ꤊ-ꤥ꤮-꤯ꤰ-ꥆꥒ-꥓꥟ꥠ-ꥼ' + 'ꦃꦄ-ꦲꦴ-ꦵꦺ-ꦻꦽ-꧀꧁-꧍' + 'ꧏ꧐-꧙꧞-꧟ꧠ-ꧤꧦꧧ-ꧯ' + '꧰-꧹ꧺ-ꧾꨀ-ꨨꨯ-ꨰꨳ-ꨴ' + 'ꩀ-ꩂꩄ-ꩋꩍ꩐-꩙꩜-꩟ꩠ-ꩯ' + 'ꩰꩱ-ꩶ꩷-꩹ꩺꩻꩽꩾ-ꪯꪱ' + 'ꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫜꫝ꫞-꫟' + 'ꫠ-ꫪꫫꫮ-ꫯ꫰-꫱ꫲꫳ-ꫴꫵ' + 'ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮ' + 'ꬰ-ꭚ꭛ꭜ-ꭟꭤ-ꭥꯀ-ꯢꯣ-ꯤ' + 'ꯦ-ꯧꯩ-ꯪ꯫꯬꯰-꯹가-힣' + 'ힰ-ퟆퟋ-ퟻ-豈-舘並-龎' + 'ﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚｦ-ｯｰ' + 'ｱ-ﾝﾞ-ﾟﾠ-ﾾￂ-ￇￊ-ￏ' + 'ￒ-ￗￚ-ￜ',
    R: '֐־׀׃׆׈-׏א-ת׫-ׯ' + 'װ-ײ׳-״׵-׿߀-߉ߊ-ߪ' + 'ߴ-ߵߺ߻-߿ࠀ-ࠕࠚࠤࠨ' + '࠮-࠯࠰-࠾࠿ࡀ-ࡘ࡜-࡝࡞' + '࡟-࢟‏יִײַ-ﬨשׁ-זּ﬷טּ-לּ' + '﬽מּ﬿נּ-סּ﭂ףּ-פּ﭅צּ-ﭏ',
    AL: '؈؋؍؛؜؝؞-؟ؠ-ؿـ' + 'ف-ي٭ٮ-ٯٱ-ۓ۔ەۥ-ۦ' + 'ۮ-ۯۺ-ۼ۽-۾ۿ܀-܍܎܏' + 'ܐܒ-ܯ݋-݌ݍ-ޥޱ޲-޿' + 'ࢠ-ࢲࢳ-ࣣﭐ-ﮱ﮲-﯁﯂-﯒' + 'ﯓ-ﴽ﵀-﵏ﵐ-ﶏ﶐-﶑ﶒ-ﷇ' + '﷈-﷏ﷰ-ﷻ﷼﷾-﷿ﹰ-ﹴ﹵' + 'ﹶ-ﻼ﻽-﻾'
  };
  var REGEX_STRONG = new RegExp('[' + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');
  var REGEX_RTL = new RegExp('[' + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');
  function firstStrongChar(str) {
    var match = REGEX_STRONG.exec(str);
    return match == null ? null : match[0];
  }
  function firstStrongCharDir(str) {
    var strongChar = firstStrongChar(str);
    if (strongChar == null) {
      return UnicodeBidiDirection.NEUTRAL;
    }
    return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
  }
  function resolveBlockDir(str, fallback) {
    fallback = fallback || UnicodeBidiDirection.NEUTRAL;
    if (!str.length) {
      return fallback;
    }
    var blockDir = firstStrongCharDir(str);
    return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
  }
  function getDirection(str, strongFallback) {
    if (!strongFallback) {
      strongFallback = UnicodeBidiDirection.getGlobalDir();
    }
    !UnicodeBidiDirection.isStrong(strongFallback) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Fallback direction must be a strong direction') : invariant(false) : void 0;
    return resolveBlockDir(str, strongFallback);
  }
  function isDirectionLTR(str, strongFallback) {
    return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
  }
  function isDirectionRTL(str, strongFallback) {
    return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
  }
  var UnicodeBidi = {
    firstStrongChar: firstStrongChar,
    firstStrongCharDir: firstStrongCharDir,
    resolveBlockDir: resolveBlockDir,
    getDirection: getDirection,
    isDirectionLTR: isDirectionLTR,
    isDirectionRTL: isDirectionRTL
  };
  module.exports = UnicodeBidi;
})(require('process'));
