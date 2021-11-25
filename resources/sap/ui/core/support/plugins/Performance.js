/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/support/Plugin","sap/ui/performance/Measurement","sap/base/security/encodeXML"],function(C,P,M,c){"use strict";var _=[];var d=0;var f=0;var g=250;var h=false;var j;var k={selectedInterval:{start:0,end:0},nodes:{slider:null,handle:null,leftResizeHandle:null,rightResizeHandle:null},consts:{LEFT_HANDLE_ID:'left',RIGHT_HANDLE_ID:'right'},sizes:{width:0,handleWidth:0,handleMinWidth:10},drag:{handleClickOffsetX:0,handleOffsetLeft:0,isResize:false,whichResizeHandle:''}};var l=P.extend("sap.ui.core.support.plugins.Performance",{constructor:function(o){P.apply(this,["sapUiSupportPerf","Performance",o]);j=this;this._oStub=o;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive"];}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"End",this.getId()+"Activate"];}}});l.prototype.init=function(o){P.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){m.call(this,o);}else{n.call(this,o);}};l.prototype.exit=function(o){P.prototype.exit.apply(this,arguments);};function m(o){var a=C.createRenderManager();a.write(u());a.flush(this.$().get(0));a.destroy();x();}function n(o){p.call(this);}function p(o){var a=M.getAllMeasurements(true);this._oStub.sendEvent(this.getId()+"SetMeasurements",{"measurements":a});}l.prototype.onsapUiSupportPerfSetMeasurements=function(e){var a=e.getParameter("measurements");this.setData(a);};l.prototype.onsapUiSupportPerfRefresh=function(e){p.call(this);};l.prototype.onsapUiSupportPerfClear=function(e){M.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{"measurements":[]});};l.prototype.onsapUiSupportPerfStart=function(e){M.start(this.getId()+"-perf","Measurement by support tool");};l.prototype.onsapUiSupportPerfEnd=function(e){M.end(this.getId()+"-perf");p.call(this);};l.prototype.onsapUiSupportPerfActivate=function(e){M.setActive(true);};l.prototype.setData=function(e){var i=document.querySelector('#sapUiSupportNoDataOverlay');var o=document.querySelector('#slider');var f1=document.querySelector('#sapUiSupportPerfHeaderTimelineOverview .timeline');if(e.length===0){i.style.display='block';o.classList.add('sapUiSupportHidden');f1.innerHTML='';return;}else{o.classList.remove('sapUiSupportHidden');i.style.display='';}_=(JSON.parse(JSON.stringify(e)));_=_.sort(function(a,b){return a.start-b.start;});var g1=e[0].start;_=_.map(function(a){a.start=parseFloat((a.start-g1).toFixed(2));a.end=parseFloat((a.end-g1).toFixed(2));a.uid=w();return a;});f=_[_.length-1].end-_[0].start;k.selectedInterval.start=_[0].start;k.selectedInterval.end=_[_.length-1].end;W();B(_);D(_);U();};var t=10;var q=0;var r;function s(e){clearInterval(r);if(h){h=false;j._oStub.sendEvent(j.getId()+"End");e.target.setAttribute('data-state','Start recording ('+(q/1000).toFixed(2)+' s)');}else{q=0;h=true;j._oStub.sendEvent(j.getId()+"Activate");j._oStub.sendEvent(j.getId()+"Clear");j._oStub.sendEvent(j.getId()+"Start");e.target.setAttribute('data-state','Stop recording ('+(q/1000).toFixed(2)+' s)');r=setInterval(function(){q+=t;e.target.setAttribute('data-state','Stop recording ('+(q/1000).toFixed(2)+' s)');},t);}}function u(){return''+'<section id="sapUiSupportPerf">'+'<section id="sapUiSupportNoDataOverlay"></section>'+'<section id="sapUiSupportPerfHeader">'+'<div class="sapUiSupportToolbar">'+'<label class="sapUiSupportLabel">Order:</label>'+'<select id="sapUiSupportPerfHeaderFilterSort" class="sapUiSupportTxtFld sapUiSupportSelect" name="orderBy">'+'<option value="chronologically">Chronologically</option>'+'<option value="time">By Time</option>'+'<option value="duration">By Duration</option>'+'</select>'+'<label class="sapUiSupportLabel">Min. Duration:</label>'+'<input id="sapUiSupportPerfHeaderFilterMinDuration" type="number" min="0" value="0">'+'<label class="sapUiSupportLabel"> ms.</label>'+'<div class="flex-spacer"></div>'+'<div id="categories"></div>'+'</div>'+'<section id="sapUiSupportPerfHeaderTimelineOverview">'+'<div class="timeline"></div>'+'<button id="sapUiSupportPerfToggleRecordingBtn"></button>'+'<div id="slider">'+'<div id="slideHandle">'+'<span id="leftHandle"></span>'+'<span id="rightHandle"></span>'+'</div>'+'</div>'+'</section>'+'</section>'+'<section id="sapUiSupportPerfHeaderTimeline">'+'<div id="sapUiSupportPerfHeaderTimelineBarInfoWrapper"></div>'+'<div id="sapUiSupportPerfHeaderTimelineBarWrapper"></div>'+'</section>'+'</section>';}function v(i){return _.reduce(function(a,b){if(b.uid===i){a=b;}return a;},null);}function w(){return'uID-'+(w.id!==undefined?++w.id:w.id=0);}function x(){document.querySelector('#sapUiSupportPerfHeaderFilterSort').addEventListener('change',D,false);document.querySelector('#sapUiSupportPerfHeaderFilterMinDuration').addEventListener('change',D,false);document.querySelector('#categories').addEventListener('change',D,false);document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper').addEventListener('mouseover',L,false);document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper').addEventListener('mouseover',L,false);window.addEventListener('resize',function(){D();X();},false);window.addEventListener('keydown',$);jQuery("#slideHandle").on('dblclick',W);jQuery("#sapUiSupportPerfToggleRecordingBtn").on("click",s).attr('data-state','Start recording');}function y(a,b){return'Duration: '+a.toFixed(2)+' ms.\nTime: '+b.toFixed(2)+' ms.';}function z(a){var b=50;var e=f/b;var o=[];for(var i=0;i<b;i++){var f1=e*i;var g1=f1+e;var h1=T({start:f1,end:g1},a);var i1=h1.map(function(m1){return{category:m1.categories[0],duration:m1.duration};});var j1={_total:0};i1.map(function(m1){if(!j1[m1.category]){j1[m1.category]=0;}j1._total+=m1.duration;j1[m1.category]=j1[m1.category]+m1.duration;});var k1=h1.map(function(m1){return{category:m1.categories[0],time:m1.time};});var l1={_total:0};k1.map(function(m1){if(!l1[m1.category]){l1[m1.category]=0;}l1._total+=m1.time;l1[m1.category]=l1[m1.category]+m1.time;});o.push({duration:j1,time:l1});}return o;}function A(a,b,e){Object.keys(b.duration).sort().forEach(function(i){if(i!=='_total'){var o=(b[e][i]/b[e]._total)*100;a.openStart("div").class(I(i)).style("height",o.toFixed(2)+"%").openEnd().close("div");}});}function B(a){var e=document.querySelector('#sapUiSupportPerfHeaderTimelineOverview .timeline');var i=(JSON.parse(JSON.stringify(a)));var o=i.map(function(b){return b.duration;}).reduce(function(j1,b){return j1+b;});var f1=i.map(function(b){return b.time;}).reduce(function(j1,b){return j1+b;});var g1=z(i);var h1={time:{_total:0}};var i1={duration:{_total:0}};g1.forEach(function(b){if(h1.time._total<b.time._total){h1=b;}if(i1.duration._total<b.duration._total){i1=b;}});f1=h1.time._total;o=i1.duration._total;var rm=C.createRenderManager();rm.openStart("ol").openEnd();g1.forEach(function(b){var j1=Math.ceil((b.duration._total/o)*100);var k1=Math.ceil((b.time._total/f1)*100);rm.openStart("li").openEnd();rm.openStart("div").class("bars-wrapper").attr("title",y(b.duration._total,b.time._total)).openEnd();rm.openStart("div").class("duration").style("height",j1+"%");if(j1>0){rm.style("min-height","1px");}rm.openEnd();A(rm,b,"duration");rm.close("div");rm.openStart("div").class("time").style("height",k1+"%");if(k1>0){rm.style("min-height","1px");}rm.openEnd();A(rm,b,"time");rm.close("div");rm.close("div");rm.close("li");});rm.close("ol");rm.flush(e);rm.destroy();}function D(){var b=C.createRenderManager();var a=C.createRenderManager();var e=O();var i=N(_,e);if(i.length===0){b.openStart("li").class("line").class("nodata").attr("data-uid",-1).openEnd().close("li");a.openStart("li").class("line").class("nodata").attr("data-uid",-1).openEnd();a.openStart("div").class("info").class("line").openEnd().text("No data").close("div");a.close("li");}i.forEach(function(o){var f1=v(o.uid);b.openStart("li").class("line").attr("data-uid",o.uid).attr("title",G(f1)).attr("data-item-category",f1.categories[0]).openEnd();b.openStart("div").class("bar").class(J(f1.duration)).style("width",E(o.duration)).style("margin-left",F(o,e.filterByTime.start)).openEnd();b.openStart("div").class("sub-bar").class(J(f1.time)).style("width",E(o.time)).openEnd().close("div");b.close("div");b.close("li");a.openStart("li").class("line").class(I(f1.categories[0])).attr("data-uid",o.uid).attr("title",G(f1)).attr("data-item-category",f1.categories[0]).openEnd();a.openStart("div").class("line").class("info").openEnd().text(H(f1)+" ("+(f1.time).toFixed(0)+" ms)").close("div");a.close("li");});b.close("ol");a.close("ol");b.flush(document.querySelector("#sapUiSupportPerfHeaderTimelineBarWrapper"));a.flush(document.querySelector("#sapUiSupportPerfHeaderTimelineBarInfoWrapper"));b.destroy();a.destroy();V(e);Q();}function E(a){var b=(a*d);var e=Math.max(b,1);return e+'px;';}function F(b,a){var o=(b.start-a)*d;return o.toFixed(0)+'px';}function G(b){return b.info+"\nduration: "+b.duration.toFixed(2)+" ms. \ntime: "+b.time.toFixed(2)+" ms. \nstart: "+b.start.toFixed(2)+" ms.\nend: "+b.end.toFixed(2)+" ms.";}function H(b){var a=b.info;a=a.substring(a.lastIndexOf('/')+1,a.length);a=a.substring(a.lastIndexOf('sap.m.'),a.length);a=a.replace('Rendering of ','');return a;}function I(a){var b='unknownType';if(a.indexOf("require")!==-1){b='requireModuleType';}else if(a.indexOf("xmlhttprequest")!==-1){b='requestType';}else if(a.indexOf("javascript")!==-1){b='afterRenderingType';}else if(a.indexOf("rendering")!==-1){b='renderingType';}return c(b);}function J(a){var b='';if(a>200){b='oneTimeStyle';}if(a>500){b='twoTimeStyle';}if(a>1000){b='threeTimeStyle';}if(a>2000){b='fourTimeStyle';}if(a>3000){b='fiveTimeStyle';}if(a>4000){b='sixTimeStyle';}return b;}function K(a){var b=[];a.forEach(function(i){if(b.indexOf(i.categories[0])===-1){b.push(i.categories[0]);}});return b;}function L(e){var a=e.srcElement;if(a.classList.contains('info')&&a.nodeName==='DIV'){a=a.parentNode;}if(a.nodeName==='LI'){var b=a.getAttribute('data-uid');var i=document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper li.hover');var o=document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper li.hover');if(i&&o){i.classList.remove('hover');o.classList.remove('hover');}var f1=document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper li[data-uid="'+b+'"]');var g1=document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper li[data-uid="'+b+'"]');if(f1&&g1){f1.classList.add('hover');g1.classList.add('hover');}}}function N(a,b){var e=(JSON.parse(JSON.stringify(a)));var i=document.querySelector('#sapUiSupportPerfHeaderTimeline').offsetWidth-document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper').offsetWidth;var o=20;var f1=1;e=T(b.filterByTime,e);e=R(b.orderByValue,e);e=S(b.minValue,e);if(e.length){f1=b.filterByTime.end-b.filterByTime.start;}d=((i-o)/f1);return e;}function O(){var o={};var a=document.querySelector('#sapUiSupportPerfHeaderFilterSort');o.orderByValue=a.options[a.selectedIndex].value;o.minValue=document.querySelector('#sapUiSupportPerfHeaderFilterMinDuration').valueAsNumber||0;o.filterByTime={start:k.selectedInterval.start,end:k.selectedInterval.end};return o;}function Q(){var a=document.querySelectorAll('#categories input');function b(e,f1){var g1=I(e);var h1=document.querySelectorAll('li[data-item-category="'+e+'"]');var i1=document.querySelectorAll('.timeline .bars-wrapper .'+g1);for(var i=0;i<h1.length;i++){h1[i].style.display=f1?'':'none';}for(var o=0;o<i1.length;o++){i1[o].style.display=f1?'':'none';}}for(var i=0;i<a.length;i++){b(a[i].name,a[i].checked);}}function R(o,e){if(o==='time'||o==='duration'){document.querySelector('body').classList.add('flattenBarOffset');}else{document.querySelector('body').classList.remove('flattenBarOffset');}if(o==='time'){e=e.sort(function(a,b){if(a.time>b.time){return-1;}if(a.time<b.time){return 1;}return 0;});}if(o==='duration'){e=e.sort(function(a,b){if(a.duration>b.duration){return-1;}if(a.duration<b.duration){return 1;}return 0;});}return e;}function S(a,b){return b.filter(function(i){return(i.duration>=a);});}function T(o,a){return a.filter(function(i){return!(i.end<=o.start||i.start>=o.end);}).map(function(i){var b=Math.max(o.start-i.start,0);var e=Math.max((i.start+i.time)-o.end,0);i.time=i.time-b-e;var f1=Math.max(o.start-i.start,0);var g1=Math.max((i.start+i.duration)-o.end,0);i.duration=i.duration-f1-g1;i.start=Math.max(i.start,o.start);i.end=Math.min(i.end,o.end);return i;});}function U(){var a='';var b=K(_);b.forEach(function(i){i=c(i);a+='<label title="'+i+'"><input class="'+I(i)+'" checked type="checkbox" name="'+i+'">'+i+'</label>';});var e=document.querySelector('#categories');e.innerHTML=a;}function V(a){var b=document.getElementById('sapUiSupportPerfHeaderTimelineBarWrapper');var e=Math.round(b.offsetWidth/10);var o=a.filterByTime.end-a.filterByTime.start;var f1=parseInt(o/e);if(document.getElementById('grid')){document.getElementById('grid').parentNode.removeChild(document.getElementById('grid'));}var g1=document.createElement('div');g1.innerHTML='<div class="header"></div><div class="body"></div>';g1.id='grid';for(var i=1;i<=e;i++){var h1=document.createElement('div');var i1=document.createElement('div');if(i%5===0||i===1){var j1=parseInt(a.filterByTime.start);if(i!==1){j1+=i*f1;}j1=j1>500?(j1/1000).toFixed(2)+' s':j1+' ms';i1.setAttribute('data-time',j1);}g1.querySelector('.body').appendChild(h1);g1.querySelector('.header').appendChild(i1);}document.querySelector('#sapUiSupportPerf').appendChild(g1);}function W(){k.nodes.slider=k.nodes.slider||document.querySelector('#slider');k.nodes.handle=k.nodes.handle||document.querySelector('#slideHandle');k.nodes.leftResizeHandle=k.nodes.leftResizeHandle||document.querySelector('#leftHandle');k.nodes.rightResizeHandle=k.nodes.rightResizeHandle||document.querySelector('#rightHandle');k.nodes.handle.style.left=0;k.nodes.handle.style.width='100%';X();k.nodes.slider.addEventListener('mousedown',Y);}function X(){var a=window.getComputedStyle(k.nodes.handle).width;var o=k.sizes.width;k.sizes.handleWidth=parseInt(a);k.sizes.width=k.nodes.slider.offsetWidth;if(k.sizes.width!==k.sizes.handleWidth){d1(o);}b1();}function Y(e){var a=e.target.id;var b=g+(k.sizes.handleWidth/2);var i=Math.max(e.clientX-b,0);var o=k.sizes.width-k.sizes.handleWidth;var f1=Math.min(i,o);if(a===k.nodes.slider.id){k.nodes.handle.style.left=f1+'px';k.drag.handleOffsetLeft=k.nodes.handle.offsetLeft;k.drag.isResize=false;}else if(a===k.nodes.handle.id){k.drag.handleClickOffsetX=e.offsetX;k.drag.isResize=false;}else if(a===k.nodes.leftResizeHandle.id){k.drag.whichResizeHandle=k.consts.LEFT_HANDLE_ID;k.drag.isResize=true;}else if(a===k.nodes.rightResizeHandle.id){k.drag.whichResizeHandle=k.consts.RIGHT_HANDLE_ID;k.drag.isResize=true;}else{return;}window.addEventListener('mousemove',Z);window.addEventListener('mouseup',a1);}function Z(e){e.stopImmediatePropagation();var a;var b=e.clientX-g;if(k.drag.isResize){c1(e);return;}var i=k.sizes.width-k.sizes.handleWidth+k.drag.handleClickOffsetX;a=Math.max(Math.min(b,i),k.drag.handleClickOffsetX);k.nodes.handle.style.left=a-k.drag.handleClickOffsetX+'px';}function $(e){var o=0;var a=37;var b=39;var i=5;if(e.keyCode!=a&&e.keyCode!=b){return;}else if(e.keyCode==a){o=-i;}else if(e.keyCode==b){o=i;}var f1=Math.min((k.drag.handleOffsetLeft+o),k.sizes.width-k.sizes.handleWidth);k.drag.handleOffsetLeft=Math.max(f1,0);k.nodes.handle.style.left=k.drag.handleOffsetLeft+'px';e1();D();}function a1(e){e.stopImmediatePropagation();window.removeEventListener('mousemove',Z);window.removeEventListener('mouseup',a1);b1();}function b1(){var a=window.getComputedStyle(k.nodes.handle).width;k.sizes.handleWidth=parseInt(a);k.drag.handleOffsetLeft=k.nodes.handle.offsetLeft;var b='(Double click to expand)';k.nodes.slider.setAttribute('title',b);e1();D();}function c1(e){e.stopImmediatePropagation();var a;var b;var i;var o;var f1;var g1;var h1=e.clientX-g;var i1=9;if(k.drag.whichResizeHandle===k.consts.RIGHT_HANDLE_ID){o=h1-k.drag.handleOffsetLeft;a=Math.max(o,k.sizes.handleMinWidth);b=k.sizes.width-k.drag.handleOffsetLeft;i=Math.min(a,b);k.nodes.handle.style.width=i+'px';}if(k.drag.whichResizeHandle===k.consts.LEFT_HANDLE_ID){a=k.drag.handleOffsetLeft+k.sizes.handleWidth-k.sizes.handleMinWidth;h1=Math.max(Math.min(h1,a),0);b=k.drag.handleOffsetLeft+k.sizes.handleWidth;f1=Math.min(h1,k.sizes.width);g1=Math.max(Math.max(f1,-2*k.sizes.handleMinWidth),i1);i=b-g1+9;if(i<=i1+k.sizes.handleMinWidth){i-=i1;g1+=i1;}k.nodes.handle.style.left=(g1-i1)+'px';k.nodes.handle.style.width=i+'px';}}function d1(o){var a=k.sizes.width-o;var b=k.sizes.width-k.drag.handleOffsetLeft;var e=k.sizes.handleWidth+a;k.sizes.handleWidth=Math.max(k.sizes.handleMinWidth,Math.min(e,b));k.nodes.handle.style.width=k.sizes.handleWidth+'px';if(k.sizes.width<(k.drag.handleOffsetLeft+k.sizes.handleWidth)){k.drag.handleOffsetLeft=k.sizes.width-k.sizes.handleWidth;k.nodes.handle.style.left=k.drag.handleOffsetLeft+'px';}}function e1(){if(!_.length){return;}var a=(k.drag.handleOffsetLeft/k.sizes.width)*100;var b=a+(k.sizes.handleWidth/k.sizes.width)*100;var e=_[_.length-1].end/100;k.selectedInterval.start=(a*e).toFixed(0);k.selectedInterval.end=(b*e).toFixed(0);}return l;});
