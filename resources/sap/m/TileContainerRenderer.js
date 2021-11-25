/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var T={apiVersion:2};T.DEFAULT_TILES_TO_RENDER=1;T.render=function(r,c){var i=c.getId();r.openStart("div",c).attr("tabindex","-1").style("height",c.getHeight()).style("width",c.getWidth()).class("sapMTC");r.accessibilityState(c,{role:"listbox",multiSelectable:false,activeDescendant:c.getTiles().length>0?c.getTiles()[0].getId():""});r.openEnd();r.openStart("div",i+"-scrl").class("sapMTCScrl").style("height","0");if(!c.bRtl){r.style("overflow","hidden");}r.openEnd();r.openStart("div",i+"-blind").class("sapMTCBlind").openEnd().close("div");r.openStart("div",i+"-cnt").class("sapMTCCnt").class("sapMTCAnim").style("height","0").style("width","0").attr("role","group").openEnd();this.renderTiles(c,r);r.close("div");r.close("div");r.openStart("div",i+"-pager").class("sapMTCPager").openEnd().close("div");r.openStart("div",i+"-leftedge").class("sapMTCEdgeLeft").openEnd().close("div");r.openStart("div",i+"-rightedge").class("sapMTCEdgeRight").openEnd().close("div");r.openStart("div",i+"-leftscroller").class("sapMTCScroller").class("sapMTCLeft").attr("tabindex","-1").openEnd();r.openStart("div").class("sapMTCInner").openEnd().close("div");r.close("div");r.openStart("div",i+"-rightscroller").class("sapMTCScroller").class("sapMTCRight").attr("tabindex","-1").openEnd();r.openStart("div").class("sapMTCInner").openEnd().close("div");r.close("div");r.close("div");};T.renderTiles=function(t,r){var a=t.getTiles(),i=0,R=0,m;if(!a.length){return;}m=this._getCountOfTilesToRender(t,a);if(m===T.DEFAULT_TILES_TO_RENDER){t._bRenderFirstPage=true;}do{if(a[i]&&a[i].getVisible()){a[i]._setVisible(false);r.renderControl(a[i]);R++;}i++;}while(R!==m&&(i<a.length));};T._getCountOfTilesToRender=function(t,a){if(t._iMaxTiles){return t._iMaxTiles;}if(a.length>T.DEFAULT_TILES_TO_RENDER){return T.DEFAULT_TILES_TO_RENDER;}return a.length;};return T;},true);