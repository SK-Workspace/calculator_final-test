/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/mdc/link/Factory'],function(q,F){"use strict";function a(){}a.enableFakeConnector=function(s){if(a.getServiceReal){return;}a.getServiceReal=F.getService;F.getService=a._createFakeService(s);};a.enableFakeConnectorForTesting=function(s,t){if(a.getServiceReal){return;}a.getServiceReal=F.getService;F.getService=a._createFakeService(s,t);};a._createFakeService=function(s,t){return function(S){switch(S){case"CrossApplicationNavigation":return{hrefForExternal:function(T,c){if(t){t.hrefForExternal=t.hrefForExternal||{calls:[]};t.hrefForExternal.calls.push({target:T,comp:c});}if(!T){return null;}return T.target.shellHash;},getDistinctSemanticObjects:function(){var b=[];for(var c in s){b.push(c);}var d=q.Deferred();setTimeout(function(){d.resolve(b);},0);return d.promise();},getLinks:function(p){var l=[];if(!Array.isArray(p)){s[p.semanticObject]?l=s[p.semanticObject].links:l=[];}else{p.forEach(function(P){s[P[0].semanticObject]?l.push([s[P[0].semanticObject].links]):l.push([[]]);});}var d=q.Deferred();setTimeout(function(){d.resolve(l);},0);return d.promise();}};case"URLParsing":return{parseShellHash:function(i){var f=function(L){var c=L.filter(function(l){return l.intent===i;});return c[0];};for(var b in s){var l=f(s[b].links);if(l){return{semanticObject:b,action:l.action};}}return{semanticObject:null,action:null};}};default:return a.getServiceReal(S);}};};a.disableFakeConnector=function(){if(a.getServiceReal){F.getService=a.getServiceReal;a.getServiceReal=undefined;}};return a;},true);
