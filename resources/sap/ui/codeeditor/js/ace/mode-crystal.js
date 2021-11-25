ace.define("ace/mode/crystal_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var C=function(){var b=("puts|initialize|previous_def|typeof|as|pointerof|sizeof|instance_sizeof");var k=("if|end|else|elsif|unless|case|when|break|while|next|until|def|return|class|new|getter|setter|property|lib"+"|fun|do|struct|private|protected|public|module|super|abstract|include|extend|begin|enum|raise|yield|with"+"|alias|rescue|ensure|macro|uninitialized|union|type|require");var a=("true|TRUE|false|FALSE|nil|NIL|__LINE__|__END_LINE__|__FILE__|__DIR__");var c=("$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|"+"root_url|flash|session|cookies|params|request|response|logger|self");var d=this.$keywords=this.createKeywordMapper({"keyword":k,"constant.language":a,"variable.language":c,"support.function":b},"identifier");var h="(?:0[xX][\\dA-Fa-f]+)";var f="(?:[0-9][\\d_]*)";var g="(?:0o[0-7][0-7]*)";var i="(?:0[bB][01]+)";var j="(?:[+-]?)(?:"+h+"|"+f+"|"+g+"|"+i+")(?:_?[iIuU](?:8|16|32|64))?\\b";var l=/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}})/;var n=/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}}|u{(:?[\da-fA-F]{2}\s)*[\da-fA-F]{2}})/;this.$rules={"start":[{token:"comment",regex:"#.*$"},{token:"string.regexp",regex:"[/]",push:[{token:"constant.language.escape",regex:n},{token:"string.regexp",regex:"[/][imx]*(?=[).,;\\s]|$)",next:"pop"},{defaultToken:"string.regexp"}]},[{regex:"[{}]",onMatch:function(v,s,p){this.next=v=="{"?this.nextState:"";if(v=="{"&&p.length){p.unshift("start",s);return"paren.lparen";}if(v=="}"&&p.length){p.shift();this.next=p.shift();if(this.next.indexOf("string")!=-1)return"paren.end";}return v=="{"?"paren.lparen":"paren.rparen";},nextState:"start"},{token:"string.start",regex:/"/,push:[{token:"constant.language.escape",regex:n},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/"/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/`/,push:[{token:"constant.language.escape",regex:n},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/`/,next:"pop"},{defaultToken:"string"}]},{stateName:"rpstring",token:"string.start",regex:/%[Qx]?\(/,push:[{token:"constant.language.escape",regex:n},{token:"string.start",regex:/\(/,push:"rpstring"},{token:"string.end",regex:/\)/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"spstring",token:"string.start",regex:/%[Qx]?\[/,push:[{token:"constant.language.escape",regex:n},{token:"string.start",regex:/\[/,push:"spstring"},{token:"string.end",regex:/]/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"fpstring",token:"string.start",regex:/%[Qx]?{/,push:[{token:"constant.language.escape",regex:n},{token:"string.start",regex:/{/,push:"fpstring"},{token:"string.end",regex:/}/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"tpstring",token:"string.start",regex:/%[Qx]?</,push:[{token:"constant.language.escape",regex:n},{token:"string.start",regex:/</,push:"tpstring"},{token:"string.end",regex:/>/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"ppstring",token:"string.start",regex:/%[Qx]?\|/,push:[{token:"constant.language.escape",regex:n},{token:"string.end",regex:/\|/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"rpqstring",token:"string.start",regex:/%[qwir]\(/,push:[{token:"string.start",regex:/\(/,push:"rpqstring"},{token:"string.end",regex:/\)/,next:"pop"},{defaultToken:"string"}]},{stateName:"spqstring",token:"string.start",regex:/%[qwir]\[/,push:[{token:"string.start",regex:/\[/,push:"spqstring"},{token:"string.end",regex:/]/,next:"pop"},{defaultToken:"string"}]},{stateName:"fpqstring",token:"string.start",regex:/%[qwir]{/,push:[{token:"string.start",regex:/{/,push:"fpqstring"},{token:"string.end",regex:/}/,next:"pop"},{defaultToken:"string"}]},{stateName:"tpqstring",token:"string.start",regex:/%[qwir]</,push:[{token:"string.start",regex:/</,push:"tpqstring"},{token:"string.end",regex:/>/,next:"pop"},{defaultToken:"string"}]},{stateName:"ppqstring",token:"string.start",regex:/%[qwir]\|/,push:[{token:"string.end",regex:/\|/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/'/,push:[{token:"constant.language.escape",regex:l},{token:"string.end",regex:/'|$/,next:"pop"},{defaultToken:"string"}]}],{token:"text",regex:"::"},{token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"},{token:"variable.fresh",regex:"%[a-zA-Z_\\d]+"},{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},{token:"constant.other.symbol",regex:"[:](?:(?:===|<=>|\\[]\\?|\\[]=|\\[]|>>|\\*\\*|<<|==|!=|>=|<=|!~|=~|<|\\+|-|\\*|\\/|%|&|\\||\\^|>|!|~)|(?:(?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?))"},{token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?(?:_?[fF](?:32|64))?\\b"},{token:"constant.numeric",regex:j},{token:"constant.other.symbol",regex:':"',push:[{token:"constant.language.escape",regex:n},{token:"constant.other.symbol",regex:'"',next:"pop"},{defaultToken:"constant.other.symbol"}]},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"support.function",regex:"(?:is_a\\?|nil\\?|responds_to\\?|as\\?)"},{token:d,regex:"[a-zA-Z_$][a-zA-Z0-9_$!?]*\\b"},{token:"variable.system",regex:"\\$\\!|\\$\\?"},{token:"punctuation.separator.key-value",regex:"=>"},{stateName:"heredoc",onMatch:function(v,p,s){var q="heredoc";var t=v.split(this.splitRegex);s.push(q,t[3]);return[{type:"constant",value:t[1]},{type:"string",value:t[2]},{type:"support.class",value:t[3]},{type:"string",value:t[4]}];},regex:"(<<-)([']?)([\\w]+)([']?)",rules:{heredoc:[{token:"string",regex:"^ +"},{onMatch:function(v,p,s){if(v===s[1]){s.shift();s.shift();this.next=s[0]||"start";return"support.class";}this.next="";return"string";},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(p,s){if(s[0]==="heredoc")return s[0];return p;}},{token:"punctuation.operator",regex:/[.]\s*(?![.])/,push:[{token:"punctuation.operator",regex:/[.]\s*(?![.])/},{token:"support.function",regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{regex:"",token:"empty",next:"pop"}]},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|\\?|\\:|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\^|\\|"},{token:"punctuation.operator",regex:/[?:,;.]/},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}]};this.normalizeRules();};o.inherits(C,T);e.CrystalHighlightRules=C;});ace.define("ace/mode/matching_brace_outdent",[],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/folding/coffee",[],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var R=r("../../range").Range;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.getFoldWidgetRange=function(s,f,a){var b=this.indentationBlock(s,a);if(b)return b;var c=/\S/;var l=s.getLine(a);var d=l.search(c);if(d==-1||l[d]!="#")return;var g=l.length;var h=s.getLength();var i=a;var j=a;while(++a<h){l=s.getLine(a);var k=l.search(c);if(k==-1)continue;if(l[k]!="#")break;j=a;}if(j>i){var n=s.getLine(j).length;return new R(i,g,j,n);}};this.getFoldWidget=function(s,f,a){var l=s.getLine(a);var i=l.search(/\S/);var n=s.getLine(a+1);var p=s.getLine(a-1);var b=p.search(/\S/);var c=n.search(/\S/);if(i==-1){s.foldWidgets[a-1]=b!=-1&&b<c?"start":"";return"";}if(b==-1){if(i==c&&l[i]=="#"&&n[i]=="#"){s.foldWidgets[a-1]="";s.foldWidgets[a+1]="";return"start";}}else if(b==i&&l[i]=="#"&&p[i]=="#"){if(s.getLine(a-2).search(/\S/)==-1){s.foldWidgets[a-1]="start";s.foldWidgets[a+1]="";return"";}}if(b!=-1&&b<i)s.foldWidgets[a-1]="start";else s.foldWidgets[a-1]="";if(i<c)return"start";else return"";};}).call(F.prototype);});ace.define("ace/mode/crystal",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var C=r("./crystal_highlight_rules").CrystalHighlightRules;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var R=r("../range").Range;var a=r("./behaviour/cstyle").CstyleBehaviour;var F=r("./folding/coffee").FoldMode;var b=function(){this.HighlightRules=C;this.$outdent=new M();this.$behaviour=new a();this.foldingRules=new F();};o.inherits(b,T);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(s,l,t){var i=this.$getIndent(l);var c=this.getTokenizer().getLineTokens(l,s);var d=c.tokens;if(d.length&&d[d.length-1].type=="comment"){return i;}if(s=="start"){var f=l.match(/^.*[\{\(\[]\s*$/);var g=l.match(/^\s*(class|def|module)\s.*$/);var h=l.match(/.*do(\s*|\s+\|.*\|\s*)$/);var j=l.match(/^\s*(if|else|when)\s*/);if(f||g||h||j){i+=t;}}return i;};this.checkOutdent=function(s,l,i){return/^\s+(end|else)$/.test(l+i)||this.$outdent.checkOutdent(l,i);};this.autoOutdent=function(s,c,d){var l=c.getLine(d);if(/}/.test(l))return this.$outdent.autoOutdent(c,d);var i=this.$getIndent(l);var p=c.getLine(d-1);var f=this.$getIndent(p);var t=c.getTabString();if(f.length<=i.length){if(i.slice(-t.length)==t)c.remove(new R(d,i.length-t.length,d,i.length));}};this.$id="ace/mode/crystal";}).call(b.prototype);e.Mode=b;});(function(){ace.require(["ace/mode/crystal"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();