ace.define("ace/mode/doc_comment_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var D=function(){this.$rules={"start":[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},D.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]};};o.inherits(D,T);D.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"};};D.getStartRule=function(s){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:s};};D.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s};};e.DocCommentHighlightRules=D;});ace.define("ace/mode/javascript_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var D=r("./doc_comment_highlight_rules").DocCommentHighlightRules;var T=r("./text_highlight_rules").TextHighlightRules;var i="[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";var J=function(b){var k=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"+"Namespace|QName|XML|XMLList|"+"ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"+"Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"+"Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"+"SyntaxError|TypeError|URIError|"+"decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|"+"isNaN|parseFloat|parseInt|"+"JSON|Math|"+"this|arguments|prototype|window|document","keyword":"const|yield|import|get|set|async|await|"+"break|case|catch|continue|default|delete|do|else|finally|for|function|"+"if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|"+"__parent__|__count__|escape|unescape|with|__proto__|"+"class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier");var d="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";var f="\\\\(?:x[0-9a-fA-F]{2}|"+"u[0-9a-fA-F]{4}|"+"u{[0-9a-fA-F]{1,6}}|"+"[0-2][0-7]{0,2}|"+"3[0-7][0-7]?|"+"[4-7][0-7]?|"+".)";this.$rules={"no_regex":[D.getStartRule("doc-start"),c("no_regex"),{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+i+")(\\.)(prototype)(\\.)("+i+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+i+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"from(?=\\s*('|\"))"},{token:"keyword",regex:"(?:"+d+")\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:k,regex:i},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:i},{regex:"",token:"empty",next:"no_regex"}],"start":[D.getStartRule("doc-start"),c("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],"regex":[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],"regex_character_class":[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],"function_arguments":[{token:"variable.parameter",regex:i},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],"qqstring":[{token:"constant.language.escape",regex:f},{token:"string",regex:"\\\\$",consumeLineEnd:true},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],"qstring":[{token:"constant.language.escape",regex:f},{token:"string",regex:"\\\\$",consumeLineEnd:true},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]};if(!b||!b.noES6){this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(v,s,g){this.next=v=="{"?this.nextState:"";if(v=="{"&&g.length){g.unshift("start",s);}else if(v=="}"&&g.length){g.shift();this.next=g.shift();if(this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1)return"paren.quasi.end";}return v=="{"?"paren.lparen":"paren.rparen";},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:f},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]});if(!b||b.jsx!=false)a.call(this);}this.embedRules(D,"doc-",[D.getEndRule("no_regex")]);this.normalizeRules();};o.inherits(J,T);function a(){var t=i.replace("\\d","\\d\\-");var j={onMatch:function(v,s,d){var f=v.charAt(1)=="/"?2:1;if(f==1){if(s!=this.nextState)d.unshift(this.next,this.nextState,0);else d.unshift(this.next);d[2]++;}else if(f==2){if(s==this.nextState){d[1]--;if(!d[1]||d[1]<0){d.shift();d.shift();}}}return[{type:"meta.tag.punctuation."+(f==1?"":"end-")+"tag-open.xml",value:v.slice(0,f)},{type:"meta.tag.tag-name.xml",value:v.substr(f)}];},regex:"</?"+t+"",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(j);var b={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[b,j,{include:"reference"},{defaultToken:"string"}];this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(v,d,s){if(d==s[0])s.shift();if(v.length==2){if(s[0]==this.nextState)s[1]--;if(!s[1]||s[1]<0){s.splice(0,2);}}this.next=s[0]||"start";return[{type:this.token,value:v}];},nextState:"jsx"},b,c("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:t},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},j];this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}];}function c(n){return[{token:"comment",regex:/\/\*/,next:[D.getTagRule(),{token:"comment",regex:"\\*\\/",next:n||"pop"},{defaultToken:"comment",caseInsensitive:true}]},{token:"comment",regex:"\\/\\/",next:[D.getTagRule(),{token:"comment",regex:"$|^",next:n||"pop"},{defaultToken:"comment",caseInsensitive:true}]}];}e.JavaScriptHighlightRules=J;});ace.define("ace/mode/matching_brace_outdent",[],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/javascript",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var J=r("./javascript_highlight_rules").JavaScriptHighlightRules;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var W=r("../worker/worker_client").WorkerClient;var C=r("./behaviour/cstyle").CstyleBehaviour;var a=r("./folding/cstyle").FoldMode;var b=function(){this.HighlightRules=J;this.$outdent=new M();this.$behaviour=new C();this.foldingRules=new a();};o.inherits(b,T);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$quotes={'"':'"',"'":"'","`":"`"};this.getNextLineIndent=function(s,l,t){var i=this.$getIndent(l);var c=this.getTokenizer().getLineTokens(l,s);var d=c.tokens;var f=c.state;if(d.length&&d[d.length-1].type=="comment"){return i;}if(s=="start"||s=="no_regex"){var g=l.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);if(g){i+=t;}}else if(s=="doc-start"){if(f=="start"||f=="no_regex"){return"";}var g=l.match(/^\s*(\/?)\*/);if(g){if(g[1]){i+=" ";}i+="* ";}}return i;};this.checkOutdent=function(s,l,i){return this.$outdent.checkOutdent(l,i);};this.autoOutdent=function(s,d,c){this.$outdent.autoOutdent(d,c);};this.createWorker=function(s){var w=new W(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");w.attachToDocument(s.getDocument());w.on("annotate",function(c){s.setAnnotations(c.data);});w.on("terminate",function(){s.clearAnnotations();});return w;};this.$id="ace/mode/javascript";this.snippetFileId="ace/snippets/javascript";}).call(b.prototype);e.Mode=b;});ace.define("ace/mode/typescript_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var J=r("./javascript_highlight_rules").JavaScriptHighlightRules;var T=function(a){var t=[{token:["storage.type","text","entity.name.function.ts"],regex:"(function)(\\s+)([a-zA-Z0-9\$_\u00a1-\uffff][a-zA-Z0-9\d\$_\u00a1-\uffff]*)"},{token:"keyword",regex:"(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)"},{token:["keyword","storage.type.variable.ts"],regex:"(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)"},{token:"keyword",regex:"\\b(?:super|export|import|keyof|infer)\\b"},{token:["storage.type.variable.ts"],regex:"(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))"}];var b=new J({jsx:(a&&a.jsx)==true}).getRules();b.no_regex=t.concat(b.no_regex);this.$rules=b;};o.inherits(T,J);e.TypeScriptHighlightRules=T;});ace.define("ace/mode/typescript",[],function(r,e,m){"use strict";var o=r("../lib/oop");var j=r("./javascript").Mode;var T=r("./typescript_highlight_rules").TypeScriptHighlightRules;var C=r("./behaviour/cstyle").CstyleBehaviour;var a=r("./folding/cstyle").FoldMode;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var b=function(){this.HighlightRules=T;this.$outdent=new M();this.$behaviour=new C();this.foldingRules=new a();};o.inherits(b,j);(function(){this.createWorker=function(s){return null;};this.$id="ace/mode/typescript";}).call(b.prototype);e.Mode=b;});(function(){ace.require(["ace/mode/typescript"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
