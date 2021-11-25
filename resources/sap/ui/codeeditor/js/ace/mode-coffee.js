ace.define("ace/mode/coffee_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;o.inherits(C,T);function C(){var i="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";var k=("this|throw|then|try|typeof|super|switch|return|break|by|continue|"+"catch|class|in|instanceof|is|isnt|if|else|extends|for|own|"+"finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|"+"or|on|unless|until|and|yes|yield|export|import|default");var l=("true|false|null|undefined|NaN|Infinity");var a=("case|const|function|var|void|with|enum|implements|"+"interface|let|package|private|protected|public|static");var s=("Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|"+"Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"+"SyntaxError|TypeError|URIError|"+"ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"+"Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray");var b=("Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|"+"encodeURIComponent|decodeURI|decodeURIComponent|String|");var v=("window|arguments|prototype|document");var c=this.createKeywordMapper({"keyword":k,"constant.language":l,"invalid.illegal":a,"language.support.class":s,"language.support.function":b,"variable.language":v},"identifier");var f={token:["paren.lparen","variable.parameter","paren.rparen","text","storage.type"],regex:/(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()"'\/])*?)(\))(\s*))?([\-=]>)/.source};var d=/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;this.$rules={start:[{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{stateName:"qdoc",token:"string",regex:"'''",next:[{token:"string",regex:"'''",next:"start"},{token:"constant.language.escape",regex:d},{defaultToken:"string"}]},{stateName:"qqdoc",token:"string",regex:'"""',next:[{token:"string",regex:'"""',next:"start"},{token:"paren.string",regex:'#{',push:"start"},{token:"constant.language.escape",regex:d},{defaultToken:"string"}]},{stateName:"qstring",token:"string",regex:"'",next:[{token:"string",regex:"'",next:"start"},{token:"constant.language.escape",regex:d},{defaultToken:"string"}]},{stateName:"qqstring",token:"string.start",regex:'"',next:[{token:"string.end",regex:'"',next:"start"},{token:"paren.string",regex:'#{',push:"start"},{token:"constant.language.escape",regex:d},{defaultToken:"string"}]},{stateName:"js",token:"string",regex:"`",next:[{token:"string",regex:"`",next:"start"},{token:"constant.language.escape",regex:d},{defaultToken:"string"}]},{regex:"[{}]",onMatch:function(g,h,j){this.next="";if(g=="{"&&j.length){j.unshift("start",h);return"paren";}if(g=="}"&&j.length){j.shift();this.next=j.shift()||"";if(this.next.indexOf("string")!=-1)return"paren.string";}return"paren";}},{token:"string.regex",regex:"///",next:"heregex"},{token:"string.regex",regex:/(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/},{token:"comment",regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:["punctuation.operator","text","identifier"],regex:"(\\.)(\\s*)("+a+")"},{token:"punctuation.operator",regex:"\\.{1,3}"},{token:["keyword","text","language.support.class","text","keyword","text","language.support.class"],regex:"(class)(\\s+)("+i+")(?:(\\s+)(extends)(\\s+)("+i+"))?"},{token:["entity.name.function","text","keyword.operator","text"].concat(f.token),regex:"("+i+")(\\s*)([=:])(\\s*)"+f.regex},f,{token:"variable",regex:"@(?:"+i+")?"},{token:c,regex:i},{token:"punctuation.operator",regex:"\\,|\\."},{token:"storage.type",regex:"[\\-=]>"},{token:"keyword.operator",regex:"(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:'.*?///[imgy]{0,4}',next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",regex:"\\S+"}],comment:[{token:"comment",regex:'###',next:"start"},{defaultToken:"comment"}]};this.normalizeRules();}e.CoffeeHighlightRules=C;});ace.define("ace/mode/matching_brace_outdent",[],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/folding/coffee",[],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var R=r("../../range").Range;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.getFoldWidgetRange=function(s,f,a){var b=this.indentationBlock(s,a);if(b)return b;var c=/\S/;var l=s.getLine(a);var d=l.search(c);if(d==-1||l[d]!="#")return;var g=l.length;var h=s.getLength();var i=a;var j=a;while(++a<h){l=s.getLine(a);var k=l.search(c);if(k==-1)continue;if(l[k]!="#")break;j=a;}if(j>i){var n=s.getLine(j).length;return new R(i,g,j,n);}};this.getFoldWidget=function(s,f,a){var l=s.getLine(a);var i=l.search(/\S/);var n=s.getLine(a+1);var p=s.getLine(a-1);var b=p.search(/\S/);var c=n.search(/\S/);if(i==-1){s.foldWidgets[a-1]=b!=-1&&b<c?"start":"";return"";}if(b==-1){if(i==c&&l[i]=="#"&&n[i]=="#"){s.foldWidgets[a-1]="";s.foldWidgets[a+1]="";return"start";}}else if(b==i&&l[i]=="#"&&p[i]=="#"){if(s.getLine(a-2).search(/\S/)==-1){s.foldWidgets[a-1]="start";s.foldWidgets[a+1]="";return"";}}if(b!=-1&&b<i)s.foldWidgets[a-1]="start";else s.foldWidgets[a-1]="";if(i<c)return"start";else return"";};}).call(F.prototype);});ace.define("ace/mode/coffee",[],function(r,a,m){"use strict";var R=r("./coffee_highlight_rules").CoffeeHighlightRules;var O=r("./matching_brace_outdent").MatchingBraceOutdent;var F=r("./folding/coffee").FoldMode;var b=r("../range").Range;var T=r("./text").Mode;var W=r("../worker/worker_client").WorkerClient;var o=r("../lib/oop");function M(){this.HighlightRules=R;this.$outdent=new O();this.foldingRules=new F();}o.inherits(M,T);(function(){var i=/(?:[({[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;this.lineCommentStart="#";this.blockComment={start:"###",end:"###"};this.getNextLineIndent=function(s,l,t){var c=this.$getIndent(l);var d=this.getTokenizer().getLineTokens(l,s).tokens;if(!(d.length&&d[d.length-1].type==='comment')&&s==='start'&&i.test(l))c+=t;return c;};this.checkOutdent=function(s,l,c){return this.$outdent.checkOutdent(l,c);};this.autoOutdent=function(s,d,c){this.$outdent.autoOutdent(d,c);};this.createWorker=function(s){var w=new W(["ace"],"ace/mode/coffee_worker","Worker");w.attachToDocument(s.getDocument());w.on("annotate",function(e){s.setAnnotations(e.data);});w.on("terminate",function(){s.clearAnnotations();});return w;};this.$id="ace/mode/coffee";this.snippetFileId="ace/snippets/coffee";}).call(M.prototype);a.Mode=M;});(function(){ace.require(["ace/mode/coffee"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();