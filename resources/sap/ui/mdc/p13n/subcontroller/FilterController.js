/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/condition/FilterOperatorUtil','./BaseController','sap/ui/mdc/p13n/P13nBuilder','sap/ui/mdc/p13n/FlexUtil','sap/base/Log'],function(F,B,P,a,L){"use strict";var b=B.extend("sap.ui.mdc.p13n.subcontroller.FilterController");b.prototype.getCurrentState=function(){var c=this.getAdaptationControl().getCurrentState();return c.hasOwnProperty("filter")?c.filter:{};};b.prototype.getResetEnabled=function(){return true;};b.prototype.getUISettings=function(){return{title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("filter.PERSONALIZATION_DIALOG_TITLE"),tabText:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("p13nDialog.TAB_Filter"),afterClose:function(e){var d=e.getSource();if(d){d.removeAllContent();d.destroy();}}};};b.prototype.getChangeOperations=function(){return{add:"addCondition",remove:"removeCondition"};};b.prototype.getBeforeApply=function(){var A=this.getAdaptationControl().getInbuiltFilter();var p=A?A.createConditionChanges():Promise.resolve([]);return p;};b.prototype.getFilterControl=function(){return this.getAdaptationControl().isA("sap.ui.mdc.IFilter")?this.getAdaptationControl():this.getAdaptationControl()._oP13nFilter;};b.prototype.sanityCheck=function(s){b.checkConditionOperatorSanity(s);return s;};b.checkConditionOperatorSanity=function(c){for(var f in c){var C=c[f];for(var i=0;i<C.length;i++){var o=C[i];var O=o.operator;if(!F.getOperator(O)){C.splice(i,1);if(c[f].length==0){delete c[f];}L.warning("The provided conditions for field '"+f+"' contain unsupported operators - these conditions will be neglected.");}}}};b.prototype.getAdaptationUI=function(p,w){var A=this._getP13nModel(p);return this.getAdaptationControl().retrieveInbuiltFilter().then(function(o){o.setP13nModel(A);o.setLiveMode(false);this._oAdaptationFB=o;return o.createFilterFields().then(function(){return o;});}.bind(this));};b.prototype.update=function(){B.prototype.update.apply(this,arguments);this.getAdaptationControl().getInbuiltFilter().createFilterFields();};b.prototype.getDelta=function(p){return a.getConditionDeltaChanges(p);};b.prototype.model2State=function(){var i={},f=this.getCurrentState();this._oAdaptationModel.getProperty("/items").forEach(function(I){if(I.isFiltered&&Object.keys(f).includes(I.name)){i[I.name]=f[I.name];}});return i;};b.prototype.mixInfoAndState=function(p){var e=this.getCurrentState()||{};var o=P.prepareAdaptationData(p,function(i,c){var n=c.name;var E=e[n];i.isFiltered=E&&E.length>0?true:false;return!(c.filterable===false);});P.sortP13nData({visible:undefined,position:undefined},o.items);return o;};return b;});
