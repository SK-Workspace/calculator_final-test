/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/field/FieldValueHelpTableWrapperBase',"sap/ui/mdc/util/loadModules","sap/base/util/deepEqual","sap/ui/mdc/library","sap/ui/mdc/enum/PersistenceMode","sap/ui/mdc/p13n/Engine",'sap/ui/mdc/condition/FilterConverter'],function(F,l,d,a,P,E,b){"use strict";var S=a.SelectionMode;var _={"Table":"sap/ui/mdc/field/FieldValueHelpUITableWrapper","ResponsiveTable":"sap/ui/mdc/field/FieldValueHelpMTableWrapper"};var c=F.extend("sap.ui.mdc.field.FieldValueHelpMdcTableWrapper",{metadata:{library:"sap.ui.mdc",aggregations:{table:{type:"sap.ui.mdc.Table",multiple:false}},defaultAggregation:"table"}});c.prototype.init=function(){F.prototype.init.apply(this,arguments);this.OInnerWrapperClass=null;};c.prototype.setParent=function(p,A){if(p){E.getInstance().defaultProviderRegistry.attach(p,P.Transient);}F.prototype.setParent.apply(this,arguments);};c.prototype._getStringType=function(){var t=this.getTable();var T,o=T=t&&t.getType();if(!o){T="Table";}else if(typeof o==="object"){if(o.isA("sap.ui.mdc.table.ResponsiveTableType")){T="ResponsiveTable";}else{T="Table";}}return T;};c.prototype.fieldHelpOpen=function(s){var t=this.getTable();if(t){if(this.OInnerWrapperClass){return this.OInnerWrapperClass.prototype.fieldHelpOpen.call(this,s);}}return this;};c.prototype._updateInnerWrapperClass=function(){var t=this._getStringType();var M=_[t];if(M&&this._sInnerWrapperType!==t){this._sInnerWrapperType=t;if(this.OInnerWrapperClass){this.OInnerWrapperClass.prototype.dispose.apply(this);this.OInnerWrapperClass=null;}this._oInnerWrapperClassPromise=l(M).then(function(f){this.OInnerWrapperClass=f[0];this.OInnerWrapperClass.prototype.initialize.apply(this);}.bind(this));}};c.prototype._adjustTable=function(s){var t=this.getTable();if(t){var p=this.getParent();if(p){t.setHeight("100%");t.setSelectionMode(this._getMaxConditions()===1?S.Single:S.Multi);var f=this._getFieldHelp();var o=f._getFilterBar();var g=o&&t.getFilter()!==o.getId();if(g){t.setFilter(o);}}if(this.OInnerWrapperClass){this.OInnerWrapperClass.prototype._adjustTable.call(this,s);}}};c.prototype.exit=function(){var p=this.getParent();if(p){E.getInstance().defaultProviderRegistry.detach(p);}this._oCurrentConditions=null;this._bSuggestion=null;if(this._oInnerWrapperClassPromise){this._oInnerWrapperClassPromise=null;}if(this.OInnerWrapperClass){this.OInnerWrapperClass.prototype.dispose.apply(this);this.OInnerWrapperClass=null;}this._sInnerWrapperType=null;this._bSearchTriggered=null;F.prototype.exit.apply(this,arguments);};c.prototype.isSuspended=function(){var t=this.getTable();var L=this.getListBinding();return L?L.isSuspended():t&&!t.getAutoBindOnInit();};c.prototype.getListBinding=function(){var t=this.getTable();return t&&t.getRowBinding();};var m={onmouseover:function(o){var i=jQuery(o.target).control(0);if(i&&i.isA("sap.m.ColumnListItem")){i.setType("Active");}}};var e=function(t,A){if(A){t.addDelegate(m,true,this);return;}t.removeDelegate(m);};c.prototype._handleTableChanged=function(M,t){var i;if(M==="insert"){this._updateInnerWrapperClass();e.call(this,t,true);i=this._getWrappedTable();if(i){this._handleInnerTableChanged("insert",i);}this._oObserver.observe(t,{aggregations:["_content"]});}else{e.call(this,t);i=t._oTable;if(i){this._handleInnerTableChanged(M,i);}this._oObserver.unobserve(t);}};c.prototype._handleToolbarExtensions=function(i){if(i.mAggregations["extension"]&&i.mAggregations["extension"].length){i.getAggregation("extension").forEach(function(o){o.setVisible(false);});}if(i.mAggregations["headerToolbar"]){var t=i.getAggregation("headerToolbar");t.setVisible(false);}};c.prototype._handleInnerTableChanged=function(M,i){if(M==="insert"){this._updateInnerWrapperClass();this._handleToolbarExtensions(i);this._oObserver.observe(i,{bindings:["rows"]});}this._oInnerWrapperClassPromise.then(function(){this.OInnerWrapperClass.prototype._handleTableChanged.call(this,M,i);this.getTable().initialized().then(function(){this.fireDataUpdate({contentChange:true});}.bind(this));}.bind(this));};c.prototype.applyFilters=function(f,s,o){var t=this.getTable();if(t&&o){var L=this.getListBinding();var g=L&&L.isSuspended();var h=this._getFieldHelp();if(L&&!g&&!this._bSearchTriggered){var i=o.getSearch()||"";var B=L.mParameters.$search||"";var C=o.getConditions();var j=h._getTypesForConditions(C);var k=C&&j&&b.createFilters(C,j,undefined,h.getCaseSensitive());var n=k?[].concat(k):[];var p=L.aApplicationFilters.reduce(function(R,u){return R.concat(u._bMultiFilter?u.aFilters:u);},[]);var q=!d(n,p);var r=i!==B;var T=t._oTable&&t._oTable.getShowOverlay&&t._oTable.getShowOverlay();if(q||r||T){this._handleScrolling();o.triggerSearch();this._bSearchTriggered=true;}}if(g){L.resume();}if(!L&&t.getAutoBindOnInit()){this._oTablePromise.then(function(){if(!this._bIsBeingDestroyed){this.applyFilters(f,s,o);}}.bind(this));}}};c.prototype._observeChanges=function(C,n){if(C.name==="_content"){this._handleInnerTableChanged(C.mutation,C.child);}if(this.OInnerWrapperClass){this.OInnerWrapperClass.prototype._observeChanges.call(this,C,true);}else{F.prototype._observeChanges.call(this,C,true);}};c.prototype._handleUpdateFinished=function(o){this._bSearchTriggered=false;return this.OInnerWrapperClass.prototype._handleUpdateFinished.apply(this,arguments);};c.prototype._handleEvents=function(o){if(this.OInnerWrapperClass){return this.OInnerWrapperClass.prototype._handleEvents.apply(this,arguments);}};c.prototype._handleItemPress=function(o){return this.OInnerWrapperClass.prototype._handleItemPress.apply(this,arguments);};c.prototype._handleSelectionChange=function(o){var i=this._isTableReady();return this._bIsModifyingTableSelection||!i||this._bBusy?undefined:this._fireSelectionChange.call(this,false);};c.prototype._getTableItems=function(s,n){return this.OInnerWrapperClass.prototype._getTableItems.apply(this,arguments);};c.prototype._modifyTableSelection=function(i,I,s,f){return this.OInnerWrapperClass.prototype._modifyTableSelection.apply(this,arguments);};c.prototype._getDataFromItem=function(i,I,o){return this.OInnerWrapperClass.prototype._getDataFromItem.apply(this,arguments);};c.prototype._handleTableEvent=function(o){return this.OInnerWrapperClass.prototype._handleTableEvent.apply(this,arguments);};c.prototype._isTableReady=function(){var t=this._getWrappedTable();if(t&&t._bInvalid){return false;}return F.prototype._isTableReady.apply(this,arguments);};c.prototype._getWrappedTable=function(){var t=this.getTable();return t&&t._oTable;};c.prototype._handleScrolling=function(){return this.OInnerWrapperClass.prototype._handleScrolling.apply(this,arguments);};c.prototype.getDialogContent=function(){if(this.OInnerWrapperClass){return this.OInnerWrapperClass.prototype.getDialogContent.apply(this,arguments);}};c.prototype.initialize=function(){if(this.OInnerWrapperClass){return this.OInnerWrapperClass.prototype.initialize.apply(this,arguments);}};c.prototype.getSuggestionContent=function(){return this.getTable();};return c;});