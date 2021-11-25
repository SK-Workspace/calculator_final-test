/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ComboBoxTextField','./ComboBoxBase','./List','./library','sap/ui/Device','sap/ui/core/Item','./ComboBoxRenderer',"sap/ui/dom/containsOrEquals","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/inputsDefaultFilter","sap/m/inputUtils/typeAhead","sap/m/inputUtils/filterItems","sap/m/inputUtils/ListHelpers","sap/m/inputUtils/itemsVisibilityHandler","sap/m/inputUtils/selectionRange","sap/m/inputUtils/calculateSelectionStart","sap/ui/events/KeyCodes","sap/ui/core/Core","sap/base/Log","sap/ui/dom/jquery/control"],function(C,a,L,l,D,I,b,c,s,i,t,f,d,g,h,j,K,k,m,q){"use strict";var n=l.ListMode;var o=a.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},dnd:{draggable:false,droppable:true}}});function S(e){var p=this.getSelectedItem(),r=d.getListItem(p),u=p&&r&&r.getDomRef(),v=u&&u.offsetTop,w=u&&u.offsetHeight,P=this.getPicker(),x=P.getDomRef("cont"),y=x.clientHeight;if(p&&((v+w)>(y))){if(!e){this._getList().$().css("visibility","hidden");}else{x.scrollTop=v-w/2;this._getList().$().css("visibility","visible");}}}o.prototype._getSelectedItemText=function(v){v=v||this.getSelectedItem();if(!v){v=this.getDefaultSelectedItem();}if(v){return v.getText();}return"";};o.prototype.setSelectedIndex=function(e,_){var p;_=_||this.getItems();e=(e>_.length-1)?_.length-1:Math.max(0,e);p=_[e];if(p){this.setSelection(p);}};o.prototype.revertSelection=function(){var p,P=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){p=this._sValueBeforeOpen;}else{p=this._oSelectedItemBeforeOpen.getText();}P&&P.setValue(p);};o.prototype._filterStartsWithItems=function(e,M){var p=e.toLowerCase();var r=this.getItems(),F=r.filter(function(u){return u[M]&&u[M]().toLowerCase().startsWith(p);});return F;};o.prototype.setSelection=function(v){var e=this._getList(),p,r;this.setAssociation("selectedItem",v);this._setPropertyProtected("selectedItemId",(v instanceof I)?v.getId():v,true);if(typeof v==="string"){v=k.byId(v);}if(e){p=d.getListItem(v);if(p){e.setSelectedItem(p,true);}else{e.removeSelections(true);}}r=v?v.getKey():"";this._setPropertyProtected("selectedKey",r);};o.prototype.isSelectionSynchronized=function(){var v=this.getSelectedItem();return this.getSelectedKey()===(v&&v.getKey());};o.prototype.isItemSelected=function(v){return v&&(v.getId()===this.getAssociation("selectedItem"));};o.prototype.setAssociation=function(A,e,p){var r=this._getList();if(r&&(A==="selectedItem")){if(!(e instanceof I)){e=this.findItem("id",e);}r.setSelectedItem(d.getListItem(e),true);}return a.prototype.setAssociation.apply(this,arguments);};o.prototype.removeAllAssociation=function(A,e){var p=this._getList();if(p&&(A==="selectedItem")){L.prototype.removeAllAssociation.apply(p,arguments);}return a.prototype.removeAllAssociation.apply(this,arguments);};o.prototype.init=function(){this._oRb=k.getLibraryResourceBundle("sap.m");a.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;if(D.system.phone){this.attachEvent("_change",this.onPropertyChange,this);}this.setLastFocusedListItem(null);};o.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);var e=this.getItems();if(this.getRecreateItems()){d.fillList(e,this._getList(),this._mapItemToListItem.bind(this));this.setRecreateItems(false);}this.synchronizeSelection();if(!this.isOpen()&&document.activeElement===this.getFocusDomRef()&&this.getEnabled()){this.addStyleClass("sapMFocus");}if(this.getSelectedItem()&&e.indexOf(this.getSelectedItem())===-1){var v=this.getValue();this.clearSelection();this.setValue(v);}};o.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._oRb=null;this._oSelectedItemBeforeOpen=null;this.setLastFocusedListItem(null);};o.prototype.onBeforeRenderingPicker=function(){var O=this["onBeforeRendering"+this.getPickerType()];O&&O.call(this);};o.prototype.onBeforeRenderingDropdown=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";if(p){p.setContentMinWidth(w);}};o.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this._getList(),F=this.getFocusDomRef();if(e){e.setBusy(true);}if(F){F.setAttribute("aria-busy","true");}}};o.prototype.onAfterRenderingPicker=function(){var O=this["onAfterRendering"+this.getPickerType()];O&&O.call(this);S.call(this,false);};o.prototype.onAfterRenderingList=function(){var e=this.getSelectedItem(),p=d.getListItem(e);if(this.bProcessingLoadItemsEvent&&(this.getItems().length===0)){return;}var r=this._getList(),F=this.getFocusDomRef();this.highlightList(this._sInputValueBeforeOpen);if(e){r.setSelectedItem(p);this.setLastFocusedListItem(p);}if(r){r.setBusy(false);}if(F){F.removeAttribute("aria-busy");}};o.prototype.filterItems=function(v){return f(this,this.getItems(),v,true,this.getFilterSecondaryValues(),this.fnFilter||i);};o.prototype._mapItemToListItem=function(e){var p=d.createListItemFromCoreItem(e,this.getShowSecondaryValues());if(e.isA("sap.ui.core.Item")){this.setSelectable(e,e.getEnabled());}if(e.isA("sap.ui.core.SeparatorItem")){p.addAriaLabelledBy(this._getGroupHeaderInvisibleText().getId());}p.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"NonInteractiveItem");return p;};o.prototype.oninput=function(e){a.prototype.oninput.apply(this,arguments);this.syncPickerContent();if(e.isMarked("invalid")){return;}this.loadItems(function(){this.handleInputValidation(e);},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&(this.getPickerType()==="Dropdown")){this.open();}if(this.getLastFocusedListItem()){this.getLastFocusedListItem().removeStyleClass("sapMLIBFocused");this.setLastFocusedListItem(null);}this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");if(this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true);}};o.prototype.handleInputValidation=function(e){var v,p,F,r,u=this.getSelectedItem(),V=e.target.value,E=V==="",w=e.srcControl,T=(this.getPickerType()==="Dropdown"),x=d.getListItem(u),y=this.filterItems(V);if(E&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){v=this.getItems();}else{v=y.items;g(this.getItems(),y);}F=v[0];r=v.some(function(z){return z.getKey()===this.getSelectedKey();},this);p=this.intersectItems(this._filterStartsWithItems(V,'getText'),v);if(F&&this.getSelectedKey()&&!r){this.setSelection(null);}if(!E&&w&&w._bDoTypeAhead){this.handleTypeAhead(w,v,V);}else if(!E&&p[0]&&V===p[0].getText()){this.setSelection(p[0]);}else{this.setSelection(null);}if(u!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});x=d.getListItem(this.getSelectedItem());}this._sInputValueBeforeOpen=V;if(this.isOpen()){setTimeout(function(){this.highlightList(V);}.bind(this));}if(F){if(E&&!this.bOpenedByKeyboardOrButton){this.close();}else if(T){this.open();s(x,this.getPicker());}}else if(this.isOpen()){if(T&&!this.bOpenedByKeyboardOrButton){this.close();}}else{this.clearFilter();}};o.prototype.handleTypeAhead=function(e,p,v){var r,u=this.getFilterSecondaryValues(),M=t(v,e,p,function(w){r=[w.getText()];if(u){r.push(w.getAdditionalText());}return r;});this.setSelection(M[0]);this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");};o.prototype.onSelectionChange=function(e){var p=d.getItemByListItem(this.getItems(),e.getParameter("listItem")),P=this.getChangeEventParams(),r=(p!==this.getSelectedItem());p&&this.updateDomValue(p.getText());this.setSelection(p);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(r){P.itemPressed=true;this.onChange(null,P);}};o.prototype.onItemPress=function(e){var p=e.getParameter("listItem"),T=p.getTitle(),P=this.getChangeEventParams(),r=(p!==d.getListItem(this.getSelectedItem()));if(p.isA("sap.m.GroupHeaderListItem")){return;}this.setLastFocusedListItem(p);this.updateDomValue(T);if(!r){P.itemPressed=true;this.onChange(null,P);}this._setPropertyProtected("value",T,true);if(this.getPickerType()==="Dropdown"&&!this.isPlatformTablet()){this.selectText.bind(this,this.getValue().length,this.getValue().length);}this.close();};o.prototype.onBeforeOpen=function(){a.prototype.onBeforeOpen.apply(this,arguments);var p=this["onBeforeOpen"+this.getPickerType()],e=this.getFocusDomRef();this.setProperty("open",true);if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems();}if(e){e.setAttribute("aria-controls",this.getPicker().getId());}this.addContent();p&&p.call(this);};o.prototype.onBeforeOpenDialog=function(){var p=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();this.getSelectedItem()&&g(this.getItems(),this.filterItems(""));p.setValue(this._sValueBeforeOpen);};o.prototype.onAfterOpen=function(){var e=this.getSelectedItem(),p=h(this.getFocusDomRef()),T=this.isPlatformTablet();this.closeValueStateMessage();S.call(this,true);if(!T&&e&&p.start===p.end&&p.start>1){setTimeout(function(){this.selectText(0,p.end);}.bind(this),0);}};o.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);var e=this.getFocusDomRef();this.setProperty("open",false);if(e){e.removeAttribute("aria-controls");}if(document.activeElement===e){this.updateFocusOnClose();}this.toggleIconPressedStyle(false);};o.prototype.onAfterClose=function(){this.clearFilter();this._sInputValueBeforeOpen="";if(this.isPickerDialog()){a.prototype.closeValueStateMessage.apply(this,arguments);}};o.prototype.onItemChange=function(e){var p=this.getAssociation("selectedItem"),N=e.getParameter("newValue"),P=e.getParameter("name");if(p===e.getParameter("id")){switch(P){case"text":if(!this.isBound("value")){this.setValue(N);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(N);}break;}}return a.prototype.onItemChange.call(this,e,this.getShowSecondaryValues());};o.prototype.onkeydown=function(e){var p=e.srcControl;a.prototype.onkeydown.apply(p,arguments);if(!p.getEnabled()||!p.getEditable()){return;}var r=K;p._bDoTypeAhead=!D.os.android&&(e.which!==r.BACKSPACE)&&(e.which!==r.DELETE);};o.prototype.oncut=function(e){var p=e.srcControl;a.prototype.oncut.apply(p,arguments);p._bDoTypeAhead=false;};o.prototype.onsapenter=function(e){var p=e.srcControl,r=p.getSelectedItem();if(r&&this.getFilterSecondaryValues()){p.updateDomValue(r.getText());}a.prototype.onsapenter.apply(p,arguments);if(!p.getEnabled()||!p.getEditable()){return;}if(p.isOpen()&&!this.isComposingCharacter()){p.close();}};["onsapup","onsapdown","onsappageup","onsappagedown","onsaphome","onsapend"].forEach(function(N){o.prototype[N]=function(e){this.handleListNavigation(e,N);};});o.prototype.handleListNavigation=function(e,N){var p=e.srcControl;if(!p.getEnabled()||!p.getEditable()){return;}e.preventDefault();this.loadItems(function(){this.syncPickerContent();if(!this.isOpen()){this.handleInlineListNavigation(N);}else{var r=this._getSuggestionsPopover();r&&r.handleListNavigation(this,e,N);}e.setMarked();});};o.prototype.handleInlineListNavigation=function(N){var e=this.getItems(),p=d.getSelectableItems(e),r=this.getSelectedItem(),u;switch(N){case"onsapdown":u=p.indexOf(r)+1;break;case"onsapup":u=r?p.indexOf(r)-1:p.length-1;break;case"onsapend":u=p.length-1;break;case"onsaphome":u=0;break;case"onsappagedown":u=Math.min(p.length-1,p.indexOf(r)+10);break;case"onsappageup":u=Math.max(0,p.indexOf(r)-10);break;}this.handleSelectionFromList(p[u]);};o.prototype.handleSelectionFromList=function(e){if(!e){return;}var p=this.getFocusDomRef(),T=p.value.substring(0,p.selectionStart),r=this.getSelectedItem(),u=this.getLastFocusedListItem(),v,w,x,y;if(e.isA("sap.m.StandardListItem")||e.isA("sap.m.GroupHeaderListItem")){v=e;e=d.getItemByListItem(this.getItems(),e);}else{v=d.getListItem(e);}this.setSelection(e);this.setLastFocusedListItem(v);if(e.isA("sap.ui.core.SeparatorItem")){this.setSelectedItem(null);this.updateDomValue(T);this.fireSelectionChange({selectedItem:null});this._getGroupHeaderInvisibleText().setText(this._oRb.getText("LIST_ITEM_GROUP_HEADER")+" "+e.getText());return;}if(e!==r){w=e.getText();y=u&&u.isA("sap.m.GroupHeaderListItem");x=j(h(p,y),w,T,y);this.updateDomValue(w);this.fireSelectionChange({selectedItem:e});e=this.getSelectedItem();this.selectText(x,p.value.length);}};o.prototype.setLastFocusedListItem=function(e){this._oLastFocusedListItem=e;};o.prototype.getLastFocusedListItem=function(){return this._oLastFocusedListItem;};o.prototype.onsapshow=function(e){var p,r,E=this.getEditable(),u;a.prototype.onsapshow.apply(this,arguments);this.syncPickerContent();if(!this.getValue()&&E){p=d.getSelectableItems(this.getItems());r=p[0];if(r){u=d.getListItem(r);if(this.isOpen()){this._getSuggestionsPopover().updateFocus(this,u);this.setLastFocusedListItem(u);}else{this.addStyleClass("sapMFocus");}this.setSelection(r);this.updateDomValue(r.getText());this.fireSelectionChange({selectedItem:r});setTimeout(function(){this.selectText(0,r.getText().length);}.bind(this),0);}}};o.prototype.onsaphide=o.prototype.onsapshow;o.prototype.ontap=function(e){if(!this.getEnabled()){return;}this.updateFocusOnClose();};o.prototype.updateFocusOnClose=function(){var e=this.getFocusDomRef(),p=this._getSuggestionsPopover();this.setLastFocusedListItem(null);if(p){p.setValueStateActiveState(false);p.updateFocus(this);}e.removeAttribute("aria-activedescendant");};o.prototype.onmouseup=function(){if(this.getPickerType()==="Dropdown"&&document.activeElement===this.getFocusDomRef()&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}};o.prototype.onfocusin=function(e){var p=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return;}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(p&&!this.isPlatformTablet()){this.focus();}}else{if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}this.bOpenValueStateMessage=true;}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this._getList().hasStyleClass("sapMListFocus"))){this.addStyleClass("sapMFocus");}};o.prototype.onsapfocusleave=function(e){var T,p,r,F,u=this.getSelectedItem();if(u&&this.getFilterSecondaryValues()){this.updateDomValue(u.getText());}a.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return;}p=this.getPicker();if(!e.relatedControlId||!p){return;}T=this.isPlatformTablet();r=k.byId(e.relatedControlId);F=r&&r.getFocusDomRef();if(c(p.getFocusDomRef(),F)&&!T&&!(this._getSuggestionsPopover().getValueStateActiveState())){this.focus();}};o.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var e=this.getSelectedKey(),v=this.getItemByKey(""+e);if(v&&(e!=="")){this.setAssociation("selectedItem",v,true);this._setPropertyProtected("selectedItemId",v.getId(),true);this.setValue(v.getText());this._sValue=this.getValue();}};o.prototype.configPicker=function(p){var r=this.getRenderer(),e=r.CSS_CLASS_COMBOBOXBASE;p.setHorizontalScrolling(false).addStyleClass(e+"Picker").addStyleClass(e+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this);};o.prototype._configureList=function(e){var r=this.getRenderer();if(!e){return;}e.setMode(n.SingleSelectMaster).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_COMBOBOX+"List");e.attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);e.addEventDelegate({onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this);};o.prototype.getDefaultSelectedItem=function(){return null;};o.prototype.getChangeEventParams=function(){return{itemPressed:false};};o.prototype.clearSelection=function(){this.setAssociation("selectedItem",null);this.setSelectedItemId("");this.setSelectedKey("");};o.prototype.selectText=function(e,p){a.prototype.selectText.apply(this,arguments);return this;};o.prototype.clone=function(e){var p=a.prototype.clone.apply(this,arguments),r=this._getList();p.setAssociation("selectedItem",null);if(!this.isBound("items")&&r){p.syncPickerContent();p.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return p;};o.prototype.open=function(){this.syncPickerContent();a.prototype.open.call(this);this._getSuggestionsPopover()&&this._getSuggestionsPopover().updateFocus(this,d.getListItem(this.getSelectedItem()));return this;};o.prototype.syncPickerContent=function(){var p,P=this.getPicker(),e=this.getInputForwardableProperties();if(!P){var r,G;P=this.createPicker(this.getPickerType());p=this.getPickerTextField();d.fillList(this.getItems(),this._getList(),this._mapItemToListItem.bind(this));g(this.getItems(),this.filterItems(""));if(p){e.forEach(function(u){u=u.charAt(0).toUpperCase()+u.slice(1);r="set"+u;G="get"+u;if(p[r]){p[r](this[G]());}},this);}this._getSuggestionsPopover().updateValueState(this.getValueState(),this.getValueStateText(),this.getShowValueStateMessage());}this.synchronizeSelection();return P;};o.prototype.findAggregatedObjects=function(){var e=this._getList();if(e){return L.prototype.findAggregatedObjects.apply(e,arguments);}return[];};o.prototype.setSelectedItem=function(v){if(typeof v==="string"){this.setAssociation("selectedItem",v,true);v=k.byId(v);}if(!(v instanceof I)&&v!==null){return this;}if(!v){v=this.getDefaultSelectedItem();}this.setSelection(v);this.setValue(this._getSelectedItemText(v));return this;};o.prototype.setSelectedItemId=function(v){v=this.validateProperty("selectedItemId",v);if(!v){v=this.getDefaultSelectedItem();}this.setSelection(v);v=this.getSelectedItem();this.setValue(this._getSelectedItemText(v));return this;};o.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var p=(e===""),r=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(p){this.setSelection(null);if(!r){this.setValue("");}return this;}var u=this.getItemByKey(e);if(u){this.setSelection(u);if(!r){this.setValue(this._getSelectedItemText(u));}return this;}this._sValue=this.getValue();return this._setPropertyProtected("selectedKey",e);};o.prototype._setPropertyProtected=function(p,v,r){try{return this.setProperty(p,v,r);}catch(e){m.warning("setSelectedKey update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e};});}};o.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:k.byId(v)||null;};o.prototype._decoratePopupInput=function(e){a.prototype._decoratePopupInput.apply(this,arguments);if(!e||!e.isA(["sap.m.InputBase"])){return;}e.addEventDelegate({onsapenter:function(){var T=e.getValue();this.updateDomValue(T);this.onChange();if(T){this.updateDomValue(T);this.onChange();this.close();}}},this);return e;};o.prototype.applyShowItemsFilters=function(){var p,P;this.syncPickerContent();p=this.getPicker();P=function(){p.detachBeforeOpen(P,this);p=null;g(this.getItems(),this.filterItems(this.getValue()||"_"));};p.attachBeforeOpen(P,this);};o.prototype.showItems=function(F){var e,p,r=Array.prototype.slice.call(arguments),u=this.fnFilter,v=function(){this.setFilterFunction(F||function(){return true;});p=this.filterItems(this.getValue()||"_");g(this.getItems(),p);this.setFilterFunction(u);e=p.items;if(e&&e.length){a.prototype.showItems.apply(this,r);}}.bind(this);this.attachLoadItems(v);this.loadItems(v);};o.prototype._getFormattedValueStateText=function(){if(this.isOpen()){return this._getSuggestionsPopover()._getValueStateHeader().getFormattedText();}else{return C.prototype.getFormattedValueStateText.call(this);}};return o;});