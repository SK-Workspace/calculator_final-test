/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={};}if(typeof window.sap.ui!=="object"){window.sap.ui={};}(function(){"use strict";if(typeof window.sap.ui.Device==="object"||typeof window.sap.ui.Device==="function"){var c="1.96.2";window.sap.ui.Device._checkAPIVersion(c);return;}var D={};var F=0,E=1,W=2,I=3,d=4,T=5;var f=function(){function a(i,w){return("000"+String(i)).slice(-w);}this.defaultComponent='DEVICE';this.sWindowName=(window.top==window)?"":"["+window.location.pathname.split('/').slice(-1)[0]+"] ";this.log=function(i,b,e){e=e||this.defaultComponent||'';var q=new Date(),v={time:a(q.getHours(),2)+":"+a(q.getMinutes(),2)+":"+a(q.getSeconds(),2),date:a(q.getFullYear(),4)+"-"+a(q.getMonth()+1,2)+"-"+a(q.getDate(),2),timestamp:q.getTime(),level:i,message:b||"",component:e||""};if(window.console){var w=v.date+" "+v.time+" "+this.sWindowName+v.message+" - "+v.component;switch(i){case F:case E:console.error(w);break;case W:console.warn(w);break;case I:console.info?console.info(w):console.log(w);break;case d:console.debug(w);break;case T:console.trace(w);break;}}return v;};};var l=new f();l.log(I,"Device API logging initialized");D._checkAPIVersion=function(a){var v="1.96.2";if(v!=a){l.log(W,"Device API version differs: "+v+" <-> "+a);}};var m={};function g(e,a,b){if(!m[e]){m[e]=[];}m[e].push({oListener:b,fFunction:a});}function h(e,a,b){var q=m[e];if(!q){return this;}for(var i=0,v=q.length;i<v;i++){if(q[i].fFunction===a&&q[i].oListener===b){q.splice(i,1);break;}}if(q.length==0){delete m[e];}}function j(e,a){var b=m[e];var q;if(b){b=b.slice();for(var i=0,v=b.length;i<v;i++){q=b[i];q.fFunction.call(q.oListener||window,a);}}}var O={"WINDOWS":"win","MACINTOSH":"mac","LINUX":"linux","IOS":"iOS","ANDROID":"Android","BLACKBERRY":"bb","WINDOWS_PHONE":"winphone"};function k(a,b){a=a||navigator.userAgent;var e,i;function q(){var x=b||navigator.platform;if(x.indexOf("Win")!=-1){var o1=/Windows NT (\d+).(\d)/i;var p1=a.match(o1);var q1="";if(p1){if(p1[1]=="6"){if(p1[2]==1){q1="7";}else if(p1[2]>1){q1="8";}}else{q1=p1[1];}}return{"name":O.WINDOWS,"versionStr":q1};}else if(x.indexOf("Mac")!=-1){return{"name":O.MACINTOSH,"versionStr":""};}else if(x.indexOf("Linux")!=-1){return{"name":O.LINUX,"versionStr":""};}l.log(I,"OS detection returned no result");return null;}e=/Windows Phone (?:OS )?([\d.]*)/;i=a.match(e);if(i){return({"name":O.WINDOWS_PHONE,"versionStr":i[1]});}if(a.indexOf("(BB10;")>0){e=/\sVersion\/([\d.]+)\s/;i=a.match(e);if(i){return{"name":O.BLACKBERRY,"versionStr":i[1]};}else{return{"name":O.BLACKBERRY,"versionStr":'10'};}}e=/\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;i=a.match(e);if(i){var v=/iPhone|iPad|iPod/;var w=/PlayBook|BlackBerry/;if(i[0].match(v)){i[3]=i[3].replace(/_/g,".");return({"name":O.IOS,"versionStr":i[3]});}else if(i[2].match(/Android/)){i[2]=i[2].replace(/\s/g,"");return({"name":O.ANDROID,"versionStr":i[3]});}else if(i[0].match(w)){return({"name":O.BLACKBERRY,"versionStr":i[4]});}}e=/\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;i=a.match(e);if(i){return({"name":O.ANDROID,"versionStr":i.length==3?i[2]:""});}return q();}function s(a,b){D.os=k(a,b)||{};D.os.OS=O;D.os.version=D.os.versionStr?parseFloat(D.os.versionStr):-1;if(D.os.name){for(var e in O){if(O[e]===D.os.name){D.os[e.toLowerCase()]=true;}}}}s();D._setOS=s;var B={"FIREFOX":"ff","CHROME":"cr","SAFARI":"sf","ANDROID":"an"};var u=navigator.userAgent;function n(a,b){
/*!
		 * Taken from jQuery JavaScript Library v1.7.1
		 * http://jquery.com/
		 *
		 * Copyright 2011, John Resig
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * Includes Sizzle.js
		 * http://sizzlejs.com/
		 * Copyright 2011, The Dojo Foundation
		 * Released under the MIT, BSD, and GPL Licenses.
		 *
		 * Date: Mon Nov 21 21:11:03 2011 -0500
		 */
function e(a){var q=(a||u).toLowerCase();var A1=/(webkit)[ \/]([\w.]+)/;var B1=/(opera)(?:.*version)?[ \/]([\w.]+)/;var C1=/(mozilla)(?:.*? rv:([\w.]+))?/;var D1=A1.exec(q)||B1.exec(q)||q.indexOf("compatible")<0&&C1.exec(q)||[];var E1={browser:D1[1]||"",version:D1[2]||"0"};E1[E1.browser]=true;return E1;}var i=e(a);var q=a||u;var v=b||window.navigator;var w;var x;if(i.mozilla){w=/Mobile/;if(q.match(/Firefox\/(\d+\.\d+)/)){var o1=parseFloat(RegExp.$1);x={name:B.FIREFOX,versionStr:""+o1,version:o1,mozilla:true,mobile:w.test(q)};}else{x={mobile:w.test(q),mozilla:true,version:-1};}}else if(i.webkit){var p1=q.toLowerCase().match(/webkit[\/]([\d.]+)/);var q1;if(p1){q1=p1[1];}w=/Mobile/;var r1=q.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);var s1=q.match(/FxiOS\/(\d+\.\d+)/);var t1=q.match(/Android .+ Version\/(\d+\.\d+)/);if(r1||s1||t1){var u1,v1,w1;if(r1){u1=B.CHROME;w1=w.test(q);v1=parseFloat(r1[2]);}else if(s1){u1=B.FIREFOX;w1=true;v1=parseFloat(s1[1]);}else if(t1){u1=B.ANDROID;w1=w.test(q);v1=parseFloat(t1[1]);}x={name:u1,mobile:w1,versionStr:""+v1,version:v1,webkit:true,webkitVersion:q1};}else{var x1=/Version\/(\d+\.\d+).*Safari/;var y1=v.standalone;if(x1.test(q)){var z1=x1.exec(q);var o1=parseFloat(z1[1]);x={name:B.SAFARI,versionStr:""+o1,fullscreen:false,webview:false,version:o1,mobile:w.test(q),webkit:true,webkitVersion:q1};}else if(/iPhone|iPad|iPod/.test(q)&&!(/CriOS/.test(q))&&!(/FxiOS/.test(q))&&(y1===true||y1===false)){x={name:B.SAFARI,version:-1,fullscreen:y1,webview:!y1,mobile:w.test(q),webkit:true,webkitVersion:q1};}else{x={mobile:w.test(q),webkit:true,webkitVersion:q1,version:-1};}}}else{x={name:"",versionStr:"",version:-1,mobile:false};}if((i.chrome||window.Intl&&window.Intl.v8BreakIterator)&&'CSS'in window){x.blink=true;}return x;}D._testUserAgent=n;function o(){D.browser=n();D.browser.BROWSER=B;if(D.browser.name){for(var b in B){if(B[b]===D.browser.name){D.browser[b.toLowerCase()]=true;}}}}o();D.support={};D.support.touch=!!(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(window.DocumentTouch&&document instanceof window.DocumentTouch)||(window.TouchEvent&&D.browser.firefox));D.support.pointer=!!window.PointerEvent;D.support.matchmedia=true;D.support.matchmedialistener=true;D.support.orientation=!!("orientation"in window&&"onorientationchange"in window);D.support.retina=(window.retina||window.devicePixelRatio>=2);D.support.websocket=('WebSocket'in window);D.support.input={};D.support.input.placeholder=('placeholder'in document.createElement("input"));D.media={};var R={"SAP_3STEPS":"3Step","SAP_4STEPS":"4Step","SAP_6STEPS":"6Step","SAP_STANDARD":"Std","SAP_STANDARD_EXTENDED":"StdExt"};D.media.RANGESETS=R;D.media._predefinedRangeSets={};D.media._predefinedRangeSets[R.SAP_3STEPS]={points:[520,960],unit:"px",name:R.SAP_3STEPS,names:["S","M","L"]};D.media._predefinedRangeSets[R.SAP_4STEPS]={points:[520,760,960],unit:"px",name:R.SAP_4STEPS,names:["S","M","L","XL"]};D.media._predefinedRangeSets[R.SAP_6STEPS]={points:[241,400,541,768,960],unit:"px",name:R.SAP_6STEPS,names:["XS","S","M","L","XL","XXL"]};D.media._predefinedRangeSets[R.SAP_STANDARD]={points:[600,1024],unit:"px",name:R.SAP_STANDARD,names:["Phone","Tablet","Desktop"]};D.media._predefinedRangeSets[R.SAP_STANDARD_EXTENDED]={points:[600,1024,1440],unit:"px",name:R.SAP_STANDARD_EXTENDED,names:["Phone","Tablet","Desktop","LargeDesktop"]};var _=R.SAP_STANDARD;var M=D.support.matchmedialistener?0:100;var Q={};var p=null;function r(i,a,b){b=b||"px";var q="all";if(i>0){q=q+" and (min-width:"+i+b+")";}if(a>0){q=q+" and (max-width:"+a+b+")";}return q;}function t(a){if(!D.support.matchmedialistener&&p==C()[0]){return;}if(Q[a].timer){clearTimeout(Q[a].timer);Q[a].timer=null;}Q[a].timer=setTimeout(function(){var b=y(a,false);if(b){j("media_"+a,b);}},M);}function y(a,b,e){function v(p1,q1){var q=Q[p1].queries[q1];var x={from:q.from,unit:Q[p1].unit};if(q.to>=0){x.to=q.to;}if(Q[p1].names){x.name=Q[p1].names[q1];}return x;}e=e||D.media.matches;if(Q[a]){var w=Q[a].queries;var x=null;for(var i=0,o1=w.length;i<o1;i++){var q=w[i];if((q!=Q[a].currentquery||b)&&e(q.from,q.to,Q[a].unit)){if(!b){Q[a].currentquery=q;}if(!Q[a].noClasses&&Q[a].names&&!b){z(a,Q[a].names[i]);}x=v(a,i);}}return x;}l.log(W,"No queryset with name "+a+" found",'DEVICE.MEDIA');return null;}function z(a,b,e){var i="sapUiMedia-"+a+"-";A(i+b,e,i);}function A(a,b,e){var q=document.documentElement;if(q.className.length==0){if(!b){q.className=a;}}else{var v=q.className.split(" ");var w="";for(var i=0;i<v.length;i++){if((e&&v[i].indexOf(e)!=0)||(!e&&v[i]!=a)){w=w+v[i]+" ";}}if(!b){w=w+a;}q.className=w;}}function C(){return[window.innerWidth,window.innerHeight];}function G(i,q,v,w){function x(p1,v){if(v==="em"||v==="rem"){var q1=window.getComputedStyle||function(e){return e.currentStyle;};var r1=q1(document.documentElement).fontSize;var s1=(r1&&r1.indexOf("px")>=0)?parseFloat(r1,10):16;return p1*s1;}return p1;}i=x(i,v);q=x(q,v);var o1=w[0];var a=i<0||i<=o1;var b=q<0||o1<=q;return a&&b;}function H(i,a,b){return G(i,a,b,C());}function J(i,a,b){var q=r(i,a,b);var e=window.matchMedia(q);return e&&e.matches;}D.media.matches=D.support.matchmedia?J:H;D.media.attachHandler=function(a,b,e){var i=e||_;g("media_"+i,a,b);};D.media.detachHandler=function(a,b,e){var i=e||_;h("media_"+i,a,b);};D.media.initRangeSet=function(a,b,e,q,v){var w;if(!a){w=D.media._predefinedRangeSets[_];}else if(a&&D.media._predefinedRangeSets[a]){w=D.media._predefinedRangeSets[a];}else{w={name:a,unit:(e||"px").toLowerCase(),points:b||[],names:q,noClasses:!!v};}if(D.media.hasRangeSet(w.name)){l.log(I,"Range set "+w.name+" has already been initialized",'DEVICE.MEDIA');return;}a=w.name;w.queries=[];w.timer=null;w.currentquery=null;w.listener=function(){return t(a);};var x,to,o1;var p1=w.points;for(var i=0,q1=p1.length;i<=q1;i++){x=(i==0)?0:p1[i-1];to=(i==p1.length)?-1:p1[i];o1=r(x,to,w.unit);w.queries.push({query:o1,from:x,to:to});}if(w.names&&w.names.length!=w.queries.length){w.names=null;}Q[w.name]=w;w.queries.forEach(function(r1){r1.media=window.matchMedia(r1.query);if(r1.media.addEventListener){r1.media.addEventListener("change",w.listener);}else{r1.media.addListener(w.listener);}});w.listener();};D.media.getCurrentRange=function(a,w){if(!D.media.hasRangeSet(a)){return null;}return y(a,true,isNaN(w)?null:function(b,e,i){return G(b,e,i,[w,0]);});};D.media.hasRangeSet=function(a){return a&&!!Q[a];};D.media.removeRangeSet=function(a){if(!D.media.hasRangeSet(a)){l.log(I,"RangeSet "+a+" not found, thus could not be removed.",'DEVICE.MEDIA');return;}for(var x in R){if(a===R[x]){l.log(W,"Cannot remove default rangeset - no action taken.",'DEVICE.MEDIA');return;}}var b=Q[a];var q=b.queries;for(var i=0;i<q.length;i++){if(q[i].media.removeEventListener){q[i].media.removeEventListener("change",b.listener);}else{q[i].media.removeListener(b.listener);}}z(a,"",true);delete m["media_"+a];delete Q[a];};var S={"TABLET":"tablet","PHONE":"phone","DESKTOP":"desktop","COMBI":"combi"};D.system={};function K(a){var b=!!L(a);var e={};e.tablet=b;e.phone=D.support.touch&&!b;e.desktop=!!((!e.tablet&&!e.phone)||D.os.windows||D.os.linux||D.os.macintosh);e.combi=e.desktop&&e.tablet;e.SYSTEMTYPE=S;for(var i in S){A("sap-"+S[i],!e[S[i]]);}return e;}function L(a){var b=a||navigator.userAgent;if(D.os.ios){return/ipad/i.test(b);}else if(D.os.windows||D.os.macintosh||D.os.linux){return D.support.touch;}else{if(D.support.touch){if(D.browser.chrome&&D.os.android&&D.os.version>=4.4){return!/Mobile Safari\/[.0-9]+/.test(b);}else{var e=window.devicePixelRatio?window.devicePixelRatio:1;if(D.os.android&&D.browser.webkit&&(parseFloat(D.browser.webkitVersion)>537.10)){e=1;}var i=(Math.min(window.screen.width/e,window.screen.height/e)>=600);if(k1()&&(window.screen.height===552||window.screen.height===553)&&(/Nexus 7/i.test(b))){i=true;}return i;}}else{var q=(/(?=android)(?=.*mobile)/i.test(b));return D.os.android&&!q;}}}function N(a){D.system=K(a);if(D.system.tablet||D.system.phone){D.browser.mobile=true;}}N();D._getSystem=K;D.orientation={};D.resize={};D.orientation.attachHandler=function(a,b){g("orientation",a,b);};D.resize.attachHandler=function(a,b){g("resize",a,b);};D.orientation.detachHandler=function(a,b){h("orientation",a,b);};D.resize.detachHandler=function(a,b){h("resize",a,b);};function P(i){i.landscape=k1(true);i.portrait=!i.landscape;}function U(){P(D.orientation);j("orientation",{landscape:D.orientation.landscape});}var V=D.resize._update=function(){X(D.resize);j("resize",{height:D.resize.height,width:D.resize.width});};function X(i){i.width=C()[0];i.height=C()[1];}function Y(){var w=D.orientation.landscape;var i=k1();if(w!=i){U();}if(!c1){c1=window.setTimeout(Z,150);}}function Z(){V();c1=null;}var $=false;var a1=false;var b1;var c1;var d1;var e1=C()[1];var f1=C()[0];var g1=false;var h1;var i1=/INPUT|TEXTAREA|SELECT/;var j1=D.os.ios&&D.browser.name==="sf"&&((D.system.phone&&D.os.version>=7&&D.os.version<7.1)||(D.system.tablet&&D.os.version>=7));function k1(b){if(D.support.touch&&D.support.orientation&&D.os.android){if(g1&&b){return!D.orientation.landscape;}if(g1){return D.orientation.landscape;}}else if(D.support.matchmedia&&D.support.orientation){return!!window.matchMedia("(orientation: landscape)").matches;}var a=C();return a[0]>a[1];}function l1(e){if(e.type=="resize"){if(j1&&i1.test(document.activeElement.tagName)&&!$){return;}var w=C()[1];var i=C()[0];var a=new Date().getTime();if(w===e1&&i===f1){return;}a1=true;if((e1!=w)&&(f1==i)){if(!h1||(a-h1>300)){g1=(w<e1);}V();}else{f1=i;}h1=a;e1=w;if(d1){window.clearTimeout(d1);d1=null;}d1=window.setTimeout(n1,1200);}else if(e.type=="orientationchange"){$=true;}if(b1){clearTimeout(b1);b1=null;}b1=window.setTimeout(m1,50);}function m1(){if(a1&&($||(D.system.tablet&&D.os.ios&&D.os.version>=9))){U();V();$=false;a1=false;if(d1){window.clearTimeout(d1);d1=null;}}b1=null;}function n1(){$=false;a1=false;d1=null;}X(D.resize);P(D.orientation);window.sap.ui.Device=D;if(D.support.touch&&D.support.orientation){window.addEventListener("resize",l1,false);window.addEventListener("orientationchange",l1,false);}else{window.addEventListener("resize",Y,false);}D.media.initRangeSet();D.media.initRangeSet(R["SAP_STANDARD_EXTENDED"]);if(sap.ui.define){sap.ui.define("sap/ui/Device",[],function(){return D;});}}());
