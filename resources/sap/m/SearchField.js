/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/Core','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./Suggest','sap/ui/Device','./SearchFieldRenderer',"sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos"],function(l,C,a,E,I,S,D,b,K,q){"use strict";var c=C.extend("sap.m.SearchField",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.f.IShellBar"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},maxLength:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Misc",defaultValue:null},showMagnifier:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},showRefreshButton:{type:"boolean",group:"Behavior",defaultValue:false},refreshButtonTooltip:{type:"string",group:"Misc",defaultValue:null},showSearchButton:{type:"boolean",group:"Behavior",defaultValue:true},enableSuggestions:{type:"boolean",group:"Behavior",defaultValue:false},selectOnFocus:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"suggestionItems",designtime:"sap/m/designtime/SearchField.designtime",aggregations:{suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,singularName:"suggestionItem"}},events:{search:{parameters:{query:{type:"string"},suggestionItem:{type:"sap.m.SuggestionItem"},refreshButtonPressed:{type:"boolean"},clearButtonPressed:{type:"boolean"}}},change:{parameters:{value:{type:"string"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}}});E.call(c.prototype);I.insertFontFaceStyle();c.prototype.init=function(){this._lastValue="";};c.prototype.getFocusDomRef=function(){return this.getInputElement();};c.prototype.getFocusInfo=function(){var F=C.prototype.getFocusInfo.call(this),i=this.getDomRef("I");if(i){q.extend(F,{cursorPos:q(i).cursorPos()});}return F;};c.prototype.applyFocusInfo=function(F){C.prototype.applyFocusInfo.call(this,F);if("cursorPos"in F){this.$("I").cursorPos(F.cursorPos);}return this;};c.prototype.getWidth=function(){return this.getProperty("width")||"100%";};c.prototype.getInputElement=function(){return this.getDomRef("I");};c.prototype.onBeforeRendering=function(){this._unregisterEventListeners();this._updateTranslations();u(this);};c.prototype.onAfterRendering=function(){this._lastValue=this.getValue();this._setToolTips();var i=this.getInputElement();this._resetElement=this.getDomRef("reset");q(i).on("input",this.onInput.bind(this)).on("search",this.onSearch.bind(this)).on("change",this.onChange.bind(this)).on("focus",this.onFocus.bind(this)).on("blur",this.onBlur.bind(this));q(this.getDomRef("F")).on("click",this.onFormClick.bind(this)).on("submit",function(e){e.preventDefault();});if(D.system.desktop||D.system.combi){this.$().on("touchstart mousedown",this.onButtonPress.bind(this));if(D.browser.firefox){this.$().find(".sapMSFB").on("mouseup mouseout",function(e){q(e.target).removeClass("sapMSFBA");});}}if(!a.isThemeApplied()){a.attachThemeChanged(this._handleThemeLoad,this);}};c.prototype._handleThemeLoad=function(){if(this._oSuggest){this._oSuggest.setPopoverMinWidth();}a.detachThemeChanged(this._handleThemeLoad,this);};c.prototype._updateTranslations=function(){var r=a.getLibraryResourceBundle("sap.m");b.oSearchFieldToolTips={SEARCH_BUTTON_TOOLTIP:r.getText("SEARCHFIELD_SEARCH_BUTTON_TOOLTIP"),RESET_BUTTON_TOOLTIP:r.getText("SEARCHFIELD_RESET_BUTTON_TOOLTIP"),REFRESH_BUTTON_TOOLTIP:r.getText("SEARCHFIELD_REFRESH_BUTTON_TOOLTIP")};};c.prototype.clear=function(O){var v=O&&O.value||"";if(!this.getInputElement()||this.getValue()===v){return;}this._updateValue(v);u(this);this.fireLiveChange({newValue:v});this._fireChangeEvent();this.fireSearch({query:v,refreshButtonPressed:false,clearButtonPressed:!!(O&&O.clearButton)});};c.prototype.exit=function(){this._unregisterEventListeners();if(this._oSuggest){this._oSuggest.destroy(true);this._oSuggest=null;}};c.prototype.onButtonPress=function(e){if(e.originalEvent.button===2){return;}var i=this.getInputElement();if(document.activeElement===i&&e.target!==i){e.preventDefault();}if(D.browser.firefox){var g=q(e.target);if(g.hasClass("sapMSFB")){g.addClass("sapMSFBA");}}};c.prototype.ontouchstart=function(e){this._oTouchStartTarget=e.target;};c.prototype.ontouchend=function(e){if(e.originalEvent.button===2){return;}var g=e.target,v=true,i=this.getInputElement();if(this._oTouchStartTarget){v=this._oTouchStartTarget===g;this._oTouchStartTarget=null;}if(g.id==this.getId()+"-reset"&&v){d(this);this._bSuggestionSuppressed=true;var h=!this.getValue();var j=document.activeElement;if((D.system.desktop||h||/(INPUT|TEXTAREA)/i.test(j.tagName)||j===this._resetElement)&&(j!==i)){i.focus();}this.clear({clearButton:true});}else if(g.id==this.getId()+"-search"&&v){d(this);if(D.system.desktop&&!this.getShowRefreshButton()&&(document.activeElement!==i)){i.focus();}this._fireChangeEvent();this.fireSearch({query:this.getValue(),refreshButtonPressed:!!(this.getShowRefreshButton()&&!this.hasStyleClass("sapMFocus")),clearButtonPressed:false});}else{this.onmouseup(e);}};c.prototype.onmouseup=function(e){if(D.system.phone&&this.getEnabled()&&e.target.tagName=="INPUT"&&document.activeElement===e.target&&!f(this)){this.onFocus(e);}};c.prototype.onFormClick=function(e){if(this.getEnabled()&&e.target.tagName=="FORM"){this.getInputElement().focus();}};c.prototype.onSearch=function(e){var v=this.getInputElement().value;this._updateValue(v);this._fireChangeEvent();this.fireSearch({query:v,refreshButtonPressed:false,clearButtonPressed:false});if(!D.system.desktop){this._blur();}};c.prototype._blur=function(){var t=this;window.setTimeout(function(){var i=t.getInputElement();if(i){i.blur();}},13);};c.prototype.onChange=function(e){this._fireChangeEvent();};c.prototype.onsapfocusleave=function(e){this._fireChangeEvent();};c.prototype._fireChangeEvent=function(){var v=this.getInputElement().value;if(this._lastValue===v){return;}this._lastValue=v;this.fireChange({value:v});};c.prototype.onInput=function(){var v=this.getInputElement().value;this._updateValue(v);this.fireLiveChange({newValue:v});if(this.getEnableSuggestions()){if(this._iSuggestDelay){clearTimeout(this._iSuggestDelay);}this._iSuggestDelay=setTimeout(function(){this.fireSuggest({suggestValue:v});u(this);this._iSuggestDelay=null;}.bind(this),400);}};c.prototype.onkeydown=function(e){var g;var h;var v;switch(e.which){case K.F5:case K.ENTER:this.$("search").toggleClass("sapMSFBA",true);e.stopPropagation();e.preventDefault();if(f(this)){d(this);if((g=this._oSuggest.getSelected())>=0){h=this.getSuggestionItems()[g];this._updateValue(h.getSuggestionText());}}this._fireChangeEvent();this.fireSearch({query:this.getValue(),suggestionItem:h,refreshButtonPressed:this.getShowRefreshButton()&&e.which===K.F5,clearButtonPressed:false});break;case K.ESCAPE:if(f(this)){d(this);e.setMarked();}else{v=this.getValue();if(v===this._sOriginalValue){this._sOriginalValue="";}this.clear({value:this._sOriginalValue});if(v!==this.getValue()){e.setMarked();}}e.preventDefault();break;}};c.prototype.onkeyup=function(e){if(e.which===K.F5||e.which===K.ENTER){this.$("search").toggleClass("sapMSFBA",false);}};c.prototype.onFocus=function(e){this.addStyleClass("sapMFocus");this._sOriginalValue=this.getValue();if(this.getEnableSuggestions()){if(!this._bSuggestionSuppressed){this.fireSuggest({suggestValue:this.getValue()});}else{this._bSuggestionSuppressed=false;}}this._setToolTips(e.type);};c.prototype.onBlur=function(e){this.removeStyleClass("sapMFocus");if(this._bSuggestionSuppressed){this._bSuggestionSuppressed=false;}this._setToolTips(e.type);};c.prototype._setToolTips=function(t){var $=this.$("search"),e=this.$("reset");if(this.getShowRefreshButton()){if(t==="focus"){$.attr("title",b.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP);}else if(t==="blur"){var r=this.getRefreshButtonTooltip(),T=r===""?b.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:r;if(T){$.attr("title",T);}}}if(this.getValue()===""){e.attr("title",b.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP);}else{e.attr("title",b.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP);}};c.prototype._updateValue=function(v){v=v||"";var i=this.getInputElement();if(i){if(i.value!==v){i.value=v;}var $=this.$();if($.hasClass("sapMSFVal")==!v){$.toggleClass("sapMSFVal",!!v);}}this.setProperty("value",v,true);this._setToolTips();return this;};c.prototype._unregisterEventListeners=function(){var i=this.getInputElement();if(i){this.$().find(".sapMSFB").off();this.$().off();q(this.getDomRef("F")).off();q(i).off();}};c.prototype.onsapshow=function(e){if(this.getEnableSuggestions()){if(f(this)){d(this);}else{this.fireSuggest({suggestValue:this.getValue()});}}};c.prototype.onsaphide=function(e){this.suggest(false);};function s(e,g,i,r){var h;if(f(e)){h=e._oSuggest.setSelected(i,r);if(h>=0){e._updateValue(e.getSuggestionItems()[h].getSuggestionText());}g.preventDefault();}}c.prototype.onsapdown=function(e){s(this,e,1,true);};c.prototype.onsapup=function(e){s(this,e,-1,true);};c.prototype.onsaphome=function(e){s(this,e,0,false);};c.prototype.onsapend=function(e){var L=this.getSuggestionItems().length-1;s(this,e,L,false);};c.prototype.onsappagedown=function(e){s(this,e,10,true);};c.prototype.onsappageup=function(e){s(this,e,-10,true);};c.prototype._applySuggestionAcc=function(){var A="",n=this.getSuggestionItems().length,r=a.getLibraryResourceBundle("sap.m");if(n===1){A=r.getText("INPUT_SUGGESTIONS_ONE_HIT");}else if(n>1){A=r.getText("INPUT_SUGGESTIONS_MORE_HITS",n);}else{A=r.getText("INPUT_SUGGESTIONS_NO_HIT");}this.$("SuggDescr").text(A);};c.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("F");};function d(e){e._oSuggest&&e._oSuggest.close();}function o(e){if(e.getEnableSuggestions()){if(!e._oSuggest){e._oSuggest=new S(e);}e._oSuggest.open();}}function f(e){return e._oSuggest&&e._oSuggest.isOpen();}c.prototype.suggest=function(e){if(this.getEnableSuggestions()){e=e===undefined||!!e;if(e&&(this.getSuggestionItems().length||D.system.phone)){o(this);}else{d(this);}}return this;};function u(e){e._oSuggest&&e._oSuggest.update();}return c;});