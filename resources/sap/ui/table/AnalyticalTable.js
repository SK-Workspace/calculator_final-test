/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./AnalyticalColumn','./Column','./Table','./TreeTable',"./TableRenderer",'./library','sap/ui/model/analytics/ODataModelAdapter','sap/ui/model/SelectionModel','sap/ui/model/Sorter','sap/ui/unified/Menu','sap/ui/unified/MenuItem','./utils/TableUtils',"./plugins/BindingSelection","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(A,C,T,a,b,c,O,S,d,M,e,f,B,L,g,q){"use strict";var G=c.GroupEventType;var h=c.SortOrder;var k=c.TreeAutoExpandMode;var _=f.createWeakMapFacade();var m=T.extend("sap.ui.table.AnalyticalTable",{metadata:{library:"sap.ui.table",properties:{sumOnTop:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},numberOfExpandedLevels:{type:"int",group:"Misc",defaultValue:0,deprecated:true},autoExpandMode:{type:"string",group:"Misc",defaultValue:"Bundled",deprecated:true},columnVisibilityMenuSorter:{type:"any",group:"Appearance",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true,deprecated:true},dirty:{type:"boolean",group:"Appearance",defaultValue:null,deprecated:true}},designtime:"sap/ui/table/designtime/AnalyticalTable.designtime"},renderer:"sap.ui.table.TableRenderer"});m.prototype._getFixedBottomRowContexts=function(){var o=this.getBinding();if(o){return[o.getGrandTotalNode()];}};m.prototype._getContexts=a.prototype._getContexts;m.prototype._getRowContexts=a.prototype._getRowContexts;m.prototype.init=function(){T.prototype.init.apply(this,arguments);this.addStyleClass("sapUiAnalyticalTable");this.setShowColumnVisibilityMenu(true);this.setEnableColumnFreeze(true);this.setEnableCellFilter(true);this.setProperty("rowCountConstraints",{fixedTop:false,fixedBottom:false});this._aGroupedColumns=[];this._bSuspendUpdateAnalyticalInfo=false;this._mGroupHeaderMenuItems=null;f.Grouping.setToDefaultGroupMode(this);f.Hook.register(this,f.Hook.Keys.Row.UpdateState,u,this);f.Hook.register(this,f.Hook.Keys.Table.OpenMenu,r,this);f.Hook.register(this,f.Hook.Keys.Row.Expand,n,this);f.Hook.register(this,f.Hook.Keys.Row.Collapse,p,this);};m.prototype.exit=function(){T.prototype.exit.apply(this,arguments);this._cleanupGroupHeaderMenuItems();};m.prototype._adaptLocalization=function(R,l){return T.prototype._adaptLocalization.apply(this,arguments).then(function(){if(l){this._cleanupGroupHeaderMenuItems();}}.bind(this));};m.prototype.setFixedRowCount=function(){L.error("The property fixedRowCount is not supported by control sap.ui.table.AnalyticalTable!");return this;};m.prototype.setFixedBottomRowCount=function(){L.error("The property fixedBottomRowCount is managed by control sap.ui.table.AnalyticalTable!");return this;};m.prototype.setDirty=function(D){L.error("The property dirty of control sap.ui.table.AnalyticalTable is deprecated. Please use showOverlay instead.");this.setProperty("dirty",D,true);this.setShowOverlay(this.getDirty());return this;};m.prototype.setEnableGrouping=function(){L.error("The property enableGrouping is not supported by the sap.ui.table.AnalyticalTable control");return this;};m.prototype.setGroupBy=function(){L.warning("The groupBy association is not supported by the sap.ui.table.AnalyticalTable control");return this;};m.prototype.getModel=function(N){var o=T.prototype.getModel.apply(this,arguments);var R=this.getBindingInfo("rows");if(o&&R&&R.model==N){O.apply(o);}return o;};m.prototype._onBindingChange=function(E){T.prototype._onBindingChange.apply(this,arguments);var R=typeof(E)==="object"?E.getParameter("reason"):E;if(R!=="sort"){this._invalidateColumnMenus();}};m.prototype._bindRows=function(o){delete _(this).bPendingRequest;this._applyAnalyticalBindingInfo(o);T.prototype._bindRows.call(this,o);};m.prototype._bindAggregation=function(N,o){if(N==="rows"){this._invalidateColumnMenus();this._applyODataModelAnalyticalAdapter(o.model);this._setFirstVisibleRowIndex(0,{onlySetProperty:true});}T.prototype._bindAggregation.call(this,N,o);if(N==="rows"){this._updateTotalRow(true);f.Binding.metadataLoaded(this).then(function(){this._updateColumns(true);}.bind(this));}};m.prototype._applyAnalyticalBindingInfo=function(o){var j=this.getColumns();for(var i=0,l=j.length;i<l;i++){if(j[i].getSorted()){o.sorter=o.sorter||[];o.sorter.push(new d(j[i].getSortProperty()||j[i].getLeadingProperty(),j[i].getSortOrder()===h.Descending));}}o.parameters=o.parameters||{};o.parameters.analyticalInfo=this._getColumnInformation();if(!o.parameters.hasOwnProperty("sumOnTop")){o.parameters.sumOnTop=this.getSumOnTop();}if(!o.parameters.hasOwnProperty("numberOfExpandedLevels")){o.parameters.numberOfExpandedLevels=this.getNumberOfExpandedLevels();}if(o.parameters.numberOfExpandedLevels>this._aGroupedColumns.length){o.parameters.numberOfExpandedLevels=0;}if(!o.parameters.hasOwnProperty("autoExpandMode")){var E=this.getAutoExpandMode();if(E!=k.Bundled&&E!=k.Sequential){E=k.Bundled;}o.parameters.autoExpandMode=E;}};m.prototype._applyODataModelAnalyticalAdapter=function(o){if(o){O.apply(o);}};m.prototype._getColumnInformation=function(){var j=[],t=this.getColumns();for(var i=0;i<this._aGroupedColumns.length;i++){var o=sap.ui.getCore().byId(this._aGroupedColumns[i]);if(!o){continue;}j.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}for(var i=0;i<t.length;i++){var o=t[i];if(this._aGroupedColumns.indexOf(o.getId())>-1){continue;}if(!(o instanceof A)){L.error("You have to use AnalyticalColumns for the Analytical table");}j.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}return j;};function u(s){var o=this.getBinding();var i=this.getBindingInfo("rows");var N=s.context;s.context=N.context;if(!s.context){return;}if(o.nodeHasChildren(N)){s.type=s.Type.GroupHeader;s.expandable=true;}else if(N.nodeState.sum){s.type=s.Type.Summary;}s.level=N.level+(s.type===s.Type.Summary?1:0);s.expanded=N.nodeState.expanded;s.contentHidden=s.expanded&&!i.parameters.sumOnTop;s.title=s.type===s.Type.GroupHeader?o.getGroupName(N.context,N.level):"";}function n(R){this.expand(R.getIndex());}function p(R){this.collapse(R.getIndex());}m.prototype.onRowsUpdated=function(P){T.prototype.onRowsUpdated.apply(this,arguments);var R=this.getRows();var o=this.getBinding();var F=this._getVisibleColumns()[0];for(var i=0;i<R.length;i++){var j=R[i];var l=j.getCells();var s=l.length;for(var t=0;t<s;t++){var v=C.ofCell(l[t]);var I=o?o.isMeasure(v.getLeadingProperty()):false;var $=q(l[t].$().closest("td"));var H=false;if(j.isSummary()&&I){H=!v.getSummed();}else if(j.isGroupHeader()&&v===F){H=!I;}$.toggleClass("sapUiTableCellHidden",H);}}};function r(o,i){var R=o.isOfType(f.CELLTYPE.ANYCONTENTCELL)?this.getRows()[o.rowIndex]:null;if(!R||!R.isGroupHeader()){this._removeGroupHeaderMenuItems(i);return;}this._iGroupedLevel=R.getLevel();this._addGroupHeaderMenuItems(i);}m.prototype._addGroupHeaderMenuItems=function(o){var t=this;function j(){var i=t._iGroupedLevel-1;if(t._aGroupedColumns[i]){var v=t.getColumns().filter(function(s){return t._aGroupedColumns[i]===s.getId();})[0];return{column:v,index:i};}else{return undefined;}}if(!this._mGroupHeaderMenuItems){this._mGroupHeaderMenuItems={};}if(!this._mGroupHeaderMenuItems["visibility"]){this._mGroupHeaderMenuItems["visibility"]=new e({text:f.getResourceText("TBL_SHOW_COLUMN"),select:function(){var l=j();if(l){var s=l.column,i=s.getShowIfGrouped();s.setShowIfGrouped(!i);t.fireGroup({column:s,groupedColumns:s.getParent()._aGroupedColumns,type:(!i?G.showGroupedColumn:G.hideGroupedColumn)});}}});}o.addItem(this._mGroupHeaderMenuItems["visibility"]);if(!this._mGroupHeaderMenuItems["ungroup"]){this._mGroupHeaderMenuItems["ungroup"]=new e({text:f.getResourceText("TBL_UNGROUP"),select:function(){var l=j();if(l&&l.column){var U=l.column;U.setGrouped(false);t.fireGroup({column:U,groupedColumns:t._aGroupedColumns,type:G.ungroup});}}});}o.addItem(this._mGroupHeaderMenuItems["ungroup"]);if(!this._mGroupHeaderMenuItems["ungroupall"]){this._mGroupHeaderMenuItems["ungroupall"]=new e({text:f.getResourceText("TBL_UNGROUP_ALL"),select:function(){var v=t.getColumns();t.suspendUpdateAnalyticalInfo();for(var i=0;i<v.length;i++){v[i].setGrouped(false);}t.resumeUpdateAnalyticalInfo();t.fireGroup({column:undefined,groupedColumns:[],type:G.ungroupAll});}});}o.addItem(this._mGroupHeaderMenuItems["ungroupall"]);if(!this._mGroupHeaderMenuItems["moveup"]){this._mGroupHeaderMenuItems["moveup"]=new e({text:f.getResourceText("TBL_MOVE_UP"),select:function(){var l=j();if(l){var s=l.column;var i=t._aGroupedColumns.indexOf(s.getId());if(i>0){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i-1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:s,groupedColumns:s.getParent()._aGroupedColumns,type:G.moveUp});}}},icon:"sap-icon://arrow-top"});}o.addItem(this._mGroupHeaderMenuItems["moveup"]);if(!this._mGroupHeaderMenuItems["movedown"]){this._mGroupHeaderMenuItems["movedown"]=new e({text:f.getResourceText("TBL_MOVE_DOWN"),select:function(){var l=j();if(l){var s=l.column;var i=t._aGroupedColumns.indexOf(s.getId());if(i<t._aGroupedColumns.length){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i+1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:s,groupedColumns:s.getParent()._aGroupedColumns,type:G.moveDown});}}},icon:"sap-icon://arrow-bottom"});}o.addItem(this._mGroupHeaderMenuItems["movedown"]);if(!this._mGroupHeaderMenuItems["sortasc"]){this._mGroupHeaderMenuItems["sortasc"]=new e({text:f.getResourceText("TBL_SORT_ASC"),select:function(){var l=j();if(l){var s=l.column;s.sort(false);}},icon:"sap-icon://up"});}o.addItem(this._mGroupHeaderMenuItems["sortasc"]);if(!this._mGroupHeaderMenuItems["sortdesc"]){this._mGroupHeaderMenuItems["sortdesc"]=new e({text:f.getResourceText("TBL_SORT_DESC"),select:function(){var l=j();if(l){var s=l.column;s.sort(true);}},icon:"sap-icon://down"});}o.addItem(this._mGroupHeaderMenuItems["sortdesc"]);if(!this._mGroupHeaderMenuItems["collapse"]){this._mGroupHeaderMenuItems["collapse"]=new e({text:f.getResourceText("TBL_COLLAPSE_LEVEL"),select:function(){t.getBinding().collapseToLevel(t._iGroupedLevel-1);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}});}o.addItem(this._mGroupHeaderMenuItems["collapse"]);if(!this._mGroupHeaderMenuItems["collapseall"]){this._mGroupHeaderMenuItems["collapseall"]=new e({text:f.getResourceText("TBL_COLLAPSE_ALL"),select:function(){t.getBinding().collapseToLevel(0);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}});}o.addItem(this._mGroupHeaderMenuItems["collapseall"]);if(!this._mGroupHeaderMenuItems["expand"]){this._mGroupHeaderMenuItems["expand"]=new e({text:f.getResourceText("TBL_EXPAND_LEVEL"),select:function(){t.getBinding().expandToLevel(t._iGroupedLevel);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}});}o.addItem(this._mGroupHeaderMenuItems["expand"]);if(!this._mGroupHeaderMenuItems["expandall"]){this._mGroupHeaderMenuItems["expandall"]=new e({text:f.getResourceText("TBL_EXPAND_ALL"),select:function(){t.expandAll();}});}o.addItem(this._mGroupHeaderMenuItems["expandall"]);var l=j();if(l){var s=l.column;if(s.getShowIfGrouped()){this._mGroupHeaderMenuItems["visibility"].setText(f.getResourceText("TBL_HIDE_COLUMN"));}else{this._mGroupHeaderMenuItems["visibility"].setText(f.getResourceText("TBL_SHOW_COLUMN"));}this._mGroupHeaderMenuItems["moveup"].setEnabled(l.index>0);this._mGroupHeaderMenuItems["movedown"].setEnabled(l.index<this._aGroupedColumns.length-1);}else{this._mGroupHeaderMenuItems["moveup"].setEnabled(true);this._mGroupHeaderMenuItems["movedown"].setEnabled(true);}};m.prototype._removeGroupHeaderMenuItems=function(o){if(!this._mGroupHeaderMenuItems){return;}for(var i in this._mGroupHeaderMenuItems){o.removeItem(this._mGroupHeaderMenuItems[i]);}};m.prototype._cleanupGroupHeaderMenuItems=function(){for(var i in this._mGroupHeaderMenuItems){this._mGroupHeaderMenuItems[i].destroy();}this._mGroupHeaderMenuItems=null;};m.prototype.getContextByIndex=function(i){var o=this.getBinding();return i>=0&&o?o.getContextByIndex(i):null;};m.prototype.getContextInfoByIndex=function(i){var o=this.getBinding();return i>=0&&o?o.getNodeByIndex(i):null;};m.prototype.suspendUpdateAnalyticalInfo=function(){this._bSuspendUpdateAnalyticalInfo=true;};m.prototype.resumeUpdateAnalyticalInfo=function(s,F){this._bSuspendUpdateAnalyticalInfo=false;this._updateColumns(s,F);};m.prototype.addColumn=function(v,s){var o=this._getColumn(v);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.addColumn.call(this,o,s);this._updateColumns(s);return this;};m.prototype.insertColumn=function(v,i,s){var o=this._getColumn(v);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.insertColumn.call(this,o,i,s);this._updateColumns(s);return this;};m.prototype.removeColumn=function(v,s){var R=T.prototype.removeColumn.apply(this,arguments);if(!this._bReorderInProcess){this._aGroupedColumns=q.grep(this._aGroupedColumns,function(V){if(v.getId){return V!=v.getId();}else{return V==v;}});}this.updateAnalyticalInfo(s);return R;};m.prototype.removeAllColumns=function(s){this._aGroupedColumns=[];var R=T.prototype.removeAllColumns.apply(this,arguments);this._updateColumns(s);return R;};m.prototype._getColumn=function(v){if(typeof v==="string"){var o=new A({leadingProperty:v,template:v,managed:true});return o;}else if(v instanceof A){return v;}else{throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject");}};m.prototype._updateColumns=function(s,F){if(!this._bSuspendUpdateAnalyticalInfo){this._updateTableColumnDetails();this.updateAnalyticalInfo(s,F);if(this.bOutput){this.invalidate();}}};m.prototype.updateAnalyticalInfo=function(s,F){if(this._bSuspendUpdateAnalyticalInfo){return;}var o=this.getBinding();if(o){var i=this._getColumnInformation();var N=o.getNumberOfExpandedLevels()||0;if(N>this._aGroupedColumns.length){o.setNumberOfExpandedLevels(0);}o.updateAnalyticalInfo(i,F);this._updateTotalRow(s);if(!s){this._getRowContexts();}}};m.prototype.refreshRows=function(){T.prototype.refreshRows.apply(this,arguments);this._updateTotalRow();};m.prototype._updateTotalRow=function(s){var o=this.getBinding();this.setProperty("rowCountConstraints",{fixedTop:false,fixedBottom:o?o.providesGrandTotal()&&o.hasTotaledMeasures():false},s);};m.prototype._updateTableColumnDetails=function(){if(this._bSuspendUpdateAnalyticalInfo){return;}var l=this.getBinding(),R=l&&l.getAnalyticalQueryResult();if(R){var t=this.getColumns(),v=[],U=[],D=[],w={},x,y;for(var i=0;i<t.length;i++){x=t[i];x._isLastGroupableLeft=false;x._bLastGroupAndGrouped=false;x._bDependendGrouped=false;if(!x.getVisible()){continue;}var z=x.getLeadingProperty();y=R.findDimensionByPropertyName(z);if(y){var E=y.getName();if(!w[E]){w[E]={dimension:y,columns:[x]};}else{w[E].columns.push(x);}if(x.getGrouped()&&v.indexOf(E)==-1){v.push(E);}if(D.indexOf(E)==-1){D.push(E);}}}U=q.grep(D,function(s){return v.indexOf(v,s)==-1;});if(v.length>0){q.each(v,function(i,s){q.each(w[s].columns,function(j,o){if(!o.getGrouped()){o._bDependendGrouped=true;}});});if(v.length==D.length){y=R.findDimensionByPropertyName(sap.ui.getCore().byId(this._aGroupedColumns[this._aGroupedColumns.length-1]).getLeadingProperty());var F=w[y.getName()].columns;q.each(F,function(i,o){o._bLastGroupAndGrouped=true;});}}if(U.length==1){q.each(w[U[0]].columns,function(j,o){o._isLastGroupableLeft=true;});}}};m.prototype._getFirstMeasureColumnIndex=function(){var o=this.getBinding(),R=o&&o.getAnalyticalQueryResult(),j=this._getVisibleColumns();if(!R){return-1;}for(var i=0;i<j.length;i++){var l=j[i],s=l.getLeadingProperty();if(R.findMeasureByName(s)||R.findMeasureByPropertyName(s)){return i;}}};m.prototype.getTotalSize=function(){var o=this.getBinding();if(o){return o.getTotalSize();}return 0;};m.prototype._onPersoApplied=function(){T.prototype._onPersoApplied.apply(this,arguments);this._aGroupedColumns=[];var j=this.getColumns();for(var i=0,l=j.length;i<l;i++){if(j[i].getGrouped()){this._addGroupedColumn(j[i].getId());}}this._updateColumns();};m.prototype._addGroupedColumn=function(s){if(this._aGroupedColumns.indexOf(s)===-1){this._aGroupedColumns.push(s);}};m.prototype._removeGroupedColumn=function(s){var i=this._aGroupedColumns.indexOf(s);if(i>=0){this._aGroupedColumns.splice(i,1);}};m.prototype.getGroupedColumns=function(){return this._aGroupedColumns;};m.prototype.setCollapseRecursive=function(i){var o=this.getBinding();if(o){g(o.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(o.setCollapseRecursive){o.setCollapseRecursive(i);}}this.setProperty("collapseRecursive",!!i,true);return this;};m.prototype.expand=a.prototype.expand;m.prototype.collapse=a.prototype.collapse;m.prototype.expandAll=function(){var o=this.getBinding();if(o){o.expandToLevel(this._aGroupedColumns.length);this.setFirstVisibleRow(0);this._getSelectionPlugin().clearSelection();}return this;};m.prototype.collapseAll=a.prototype.collapseAll;m.prototype.isExpanded=a.prototype.isExpanded;m.prototype.getAnalyticalInfoOfRow=function(R){var o=this.getBinding();var j=R?R.getRowBindingContext():null;if(!f.isA(R,"sap.ui.table.Row")||R.getParent()!==this||!o||!j){return null;}var I=j===o.getGrandTotalContext();var l=null;var s=-1;if(I){l=o.getGrandTotalContextInfo();s=0;}else{l=this.getContextInfoByIndex(R.getIndex());if(l){s=l.level;}}var t=l&&o.nodeHasChildren&&o.nodeHasChildren(l);var v=!t&&!I&&l&&l.nodeState&&l.nodeState.sum;var w=[];if(v||t){var x=this.getGroupedColumns();if(x.length>0&&s>0&&s<=x.length){for(var i=0;i<s;i++){w.push(x[i]);}}}return{grandTotal:I,group:t,groupTotal:v,level:s,context:j,groupedColumns:w};};m.prototype._createLegacySelectionPlugin=function(){return new B();};m.prototype._setRowCountConstraints=function(){};m.prototype._onBindingDataRequested=function(E){if(E.getParameter("__simulateAsyncAnalyticalBinding")){return;}var o=this.getBinding();if(!o.bUseBatchRequests){_(this).bPendingRequest=true;}T.prototype._onBindingDataRequested.apply(this,arguments);};m.prototype._onBindingDataReceived=function(E){if(E.getParameter("__simulateAsyncAnalyticalBinding")){return;}var o=this.getBinding();if(!o.bUseBatchRequests){_(this).bPendingRequest=false;}T.prototype._onBindingDataReceived.apply(this,arguments);};m.prototype._hasPendingRequests=function(){if(_(this).hasOwnProperty("bPendingRequest")){return _(this).bPendingRequest;}else{return T.prototype._hasPendingRequests.apply(this,arguments);}};return m;});
