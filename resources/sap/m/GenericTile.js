/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/m/Text','sap/ui/core/HTML','sap/ui/core/Icon','sap/ui/core/IconPool','sap/m/Button','sap/m/GenericTileRenderer','sap/m/GenericTileLineModeRenderer','sap/m/Image','sap/ui/Device','sap/ui/core/ResizeHandler',"sap/base/strings/camelize","sap/base/util/deepEqual","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery"],function(l,C,T,H,I,a,B,G,L,b,D,R,c,d,P,q){"use strict";var e=l.GenericTileScope,f=l.LoadState,F=l.FrameType,S=l.Size,g=l.GenericTileMode,h=l.TileSizeBehavior,W=l.WrappingType,U=l.URLHelper;var j="GenericTileDeviceSet";var m={};var n=C.extend("sap.m.GenericTile",{metadata:{library:"sap.m",properties:{mode:{type:"sap.m.GenericTileMode",group:"Appearance",defaultValue:g.ContentMode},header:{type:"string",group:"Appearance",defaultValue:null},subheader:{type:"string",group:"Appearance",defaultValue:null},failedText:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Misc",defaultValue:S.Auto,deprecated:true},frameType:{type:"sap.m.FrameType",group:"Misc",defaultValue:F.OneByOne},systemInfo:{type:"string",group:"Misc",defaultValue:null},appShortcut:{type:"string",group:"Misc",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},headerImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},state:{type:"sap.m.LoadState",group:"Misc",defaultValue:f.Loaded},imageDescription:{type:"string",group:"Accessibility",defaultValue:null},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:e.Display},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:h.Responsive},ariaLabel:{type:"string",group:"Accessibility",defaultValue:null},ariaRole:{type:"string",group:"Accessibility",defaultValue:null},ariaRoleDescription:{type:"string",group:"Accessibility",defaultValue:null},url:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},enableNavigationButton:{type:"boolean",group:"Misc",defaultValue:false},pressEnabled:{type:"boolean",group:"Misc",defaultValue:true},navigationButtonText:{type:"string",group:"Misc",defaultValue:null},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:W.Normal},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},additionalTooltip:{type:"string",group:"Accessibility",defaultValue:null},tileIcon:{type:"sap.ui.core.URI",multiple:false},backgroundColor:{type:"sap.ui.core.CSSColor",group:"Appearance"},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"None"}},defaultAggregation:"tileContent",aggregations:{tileContent:{type:"sap.m.TileContent",multiple:true,bindable:"bindable"},icon:{type:"sap.ui.core.Control",multiple:false,deprecated:true},actionButtons:{type:"sap.m.Button",multiple:true,bindable:"bindable"},_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_failedMessageText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_tileIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_tileIconImage:{type:"sap.m.Image",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}},renderer:{apiVersion:2,render:function(r,o){if(o.getMode()===g.LineMode){L.render(r,o);}else{G.render(r,o);}}}});n._Action={Press:"Press",Remove:"Remove"};n.LINEMODE_SIBLING_PROPERTIES=["state","subheader","header","scope"];n.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!D.media.hasRangeSet(j)){D.media.initRangeSet(j,[450],"px",["small","large"]);}this._oTitle=new T(this.getId()+"-title");this._oTitle.addStyleClass("sapMGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("_titleText",this._oTitle,true);this._oAppShortcut=new T(this.getId()+"-appShortcut");this._oAppShortcut.cacheLineHeight=false;this.addDependent(this._oAppShortcut);this._oSystemInfo=new T(this.getId()+"-systemInfo");this._oSystemInfo.cacheLineHeight=false;this.addDependent(this._oSystemInfo);this._oSubTitle=new T(this.getId()+"-subTitle");this._oSubTitle.cacheLineHeight=false;this.addDependent(this._oSubTitle);this._sFailedToLoad=this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._oRb.getText("INFOTILE_LOADING");this._oFailedText=new T(this.getId()+"-failed-txt",{maxLines:2});this._oFailedText.cacheLineHeight=false;this._oFailedText.addStyleClass("sapMGTFailed");this.setAggregation("_failedMessageText",this._oFailedText,true);this._oWarningIcon=new I(this.getId()+"-warn-icon",{src:"sap-icon://notification",size:"1.375rem"});this._oWarningIcon.addStyleClass("sapMGTFtrFldIcnMrk");this._oBusy=new H(this.getId()+"-overlay");this._oBusy.setBusyIndicatorDelay(0);this._bTilePress=true;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}this._oNavigateAction=new B(this.getId()+"-navigateAction");this.addDependent(this._oNavigateAction);};n.prototype.setWrappingType=function(w){this.setProperty("wrappingType",w,true);this._oTitle.setWrappingType(w);this._oFailedText.setWrappingType(w);this._oSubTitle.setWrappingType(w);this._oAppShortcut.setWrappingType(w);this._oSystemInfo.setWrappingType(w);return this;};n.prototype.setSubheader=function(s){this.setProperty("subheader",s);this._oSubTitle.setText(s);return this;};n.prototype.setAppShortcut=function(A){this.setProperty("appShortcut",A);this._oAppShortcut.setText(A);return this;};n.prototype.setSystemInfo=function(s){this.setProperty("systemInfo",s);this._oSystemInfo.setText(s);return this;};n.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};n.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._oTitle.clampHeight();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};n.prototype._initScopeContent=function(t){if(!this.getState||this.getState()!==f.Disabled){this._oMoreIcon=this._oMoreIcon||a.createControlByURI({id:this.getId()+"-action-more",size:"1rem",useIconTooltip:false,src:"sap-icon://overflow"}).addStyleClass("sapMPointer").addStyleClass(t+"MoreIcon");this._oRemoveButton=this._oRemoveButton||new B({id:this.getId()+"-action-remove",icon:"sap-icon://decline",tooltip:this._oRb.getText("GENERICTILE_REMOVEBUTTON_TEXT")}).addStyleClass("sapUiSizeCompact").addStyleClass(t+"RemoveButton");this._oRemoveButton._bExcludeFromTabChain=true;switch(this.getScope()){case e.Actions:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(true);break;case e.ActionMore:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(false);break;case e.ActionRemove:this._oRemoveButton.setVisible(true);this._oMoreIcon.setVisible(false);break;default:}}};n.prototype._isSmall=function(){return this.getSizeBehavior()===h.Small||window.matchMedia("(max-width: 374px)").matches;};n.prototype.exit=function(){if(this._sParentResizeListenerId){R.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null;}D.media.detachHandler(this._handleMediaChange,this,j);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());this._$RootNode=null;}this._clearAnimationUpdateQueue();this._oWarningIcon.destroy();if(this._oImage){this._oImage.destroy();}this._oBusy.destroy();if(this._oMoreIcon){this._oMoreIcon.destroy();}if(this._oRemoveButton){this._oRemoveButton.destroy();}if(this._oNavigateAction){this._oNavigateAction.destroy();}};n.prototype.onBeforeRendering=function(){var s=!!this.getSubheader();if(this.getMode()===g.HeaderMode||this.getMode()===g.IconMode){this._applyHeaderMode(s);}else{this._applyContentMode(s);}var t=this.getTileContent().length;for(var i=0;i<t;i++){this.getTileContent()[i].setProperty("disabled",this.getState()===f.Disabled,true);}this._initScopeContent("sapMGT");this._generateFailedText();this.$().off("mouseenter");this.$().off("mouseleave");if(this._sParentResizeListenerId){R.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null;}D.media.detachHandler(this._handleMediaChange,this,j);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());}if(this.getFrameType()===F.Auto){this.setProperty("frameType",F.OneByOne,true);}if(this._isNavigateActionEnabled()){var k=this.getNavigationButtonText()?this.getNavigationButtonText():this._oRb.getText("ACTION_READ_MORE");this._oNavigateAction.setText(k);this._oNavigateAction.detachPress(this._navigateEventHandler,this);}};n.prototype.onAfterRendering=function(){this._setupResizeClassHandler();this.$().on("mouseenter",this._updateAriaAndTitle.bind(this));this.$().on("mouseleave",this._removeTooltipFromControl.bind(this));var M=this.getMode();var s=this._isScreenLarge();if(M===g.LineMode){var $=this.$().parent();if(s){this._updateHoverStyle(true);if(this.getParent()instanceof C){this._sParentResizeListenerId=R.register(this.getParent(),this._handleResize.bind(this));}else{this._sParentResizeListenerId=R.register($,this._handleResize.bind(this));}}}if(M===g.LineMode&&this._bUpdateLineTileSiblings){this._updateLineTileSiblings();this._bUpdateLineTileSiblings=false;}if(M===g.LineMode){D.media.attachHandler(this._handleMediaChange,this,j);}if(this._isNavigateActionEnabled()){this._oNavigateAction.attachPress(this._navigateEventHandler,this);}this.onDragComplete();};n.prototype.onDragComplete=function(){if(this.hasStyleClass("sapMGTPressActive")){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive");}if(this.getMode()===g.LineMode){this.removeStyleClass("sapMGTLineModePress");}}};n.prototype._handleResize=function(){if(this.getMode()===g.LineMode&&this._isScreenLarge()&&this.getParent()){this._queueAnimationEnd();}};n.prototype._setupResizeClassHandler=function(){var i=function(){if(this.getSizeBehavior()===h.Small||window.matchMedia("(max-width: 374px)").matches){this.$().addClass("sapMTileSmallPhone");}else{this.$().removeClass("sapMTileSmallPhone");}}.bind(this);q(window).on("resize",i);i();};n.prototype._isCompact=function(){return q("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0;};n.prototype._calculateStyleData=function(){this.$("lineBreak").remove();if(!this._isScreenLarge()||!this.getDomRef()||this.$().is(":hidden")){return null;}var $=this.$(),E=this.$("endMarker"),s=this.$("startMarker");if(E.length===0||s.length===0){return null;}var k=this._getLineCount(),o,r,t=Math.ceil(L._getCSSPixelValue(this,"margin-top")),u,A=this.$().parent().innerWidth(),v=Math.ceil(L._getCSSPixelValue(this,"min-height")),w=L._getCSSPixelValue(this,"line-height"),x=this.$().is(":not(:first-child)")&&k>1,y=q("<span><br></span>"),i=0,z=sap.ui.getCore().getConfiguration().getRTL(),J=E.position();if(x){y.attr("id",this.getId()+"-lineBreak");$.prepend(y);k=this._getLineCount();J=E.position();}var K={rtl:z,lineBreak:x,startOffset:s.offset(),endOffset:E.offset(),availableWidth:A,lines:[]};var M;if(D.browser.msie||D.browser.edge){M=y.find("br").position();}else{M=y.position();}var N=M;if(!(D.browser.mozilla||D.browser.msie||D.browser.edge)&&M.left<J.left){N=J;}K.positionLeft=x?M.left:$.position().left;K.positionRight=x?$.width()-N.left:K.availableWidth-$.position().left;if(!x&&k>1){K.positionRight=s.parent().innerWidth()-(s.position().left+s.width());}for(i;i<k;i++){if(x&&i===0){continue;}if(k===1){o=z?K.availableWidth-K.positionLeft:K.positionLeft;u=$.width();}else if(i===k-1){o=0;u=z?$.width()-J.left:J.left;}else if(x&&i===1){o=0;u=A;}else{o=0;u=A;}r=i*w+t;K.lines.push({offset:{x:o,y:r},width:u,height:v});}return K;};n.prototype._getStyleData=function(){var s=this._calculateStyleData();if(!d(this._oStyleData,s)){delete this._oStyleData;this._oStyleData=s;return true;}return false;};n.prototype._getAnimationEvents=function(){return"transitionend.sapMGT$id animationend.sapMGT$id".replace(/\$id/g,c(this.getId()));};n.prototype._updateHoverStyle=function(i){if(!this._getStyleData()&&!i){return;}this._clearAnimationUpdateQueue();this._cHoverStyleUpdates=-1;this._oAnimationEndCallIds={};if(this._oStyleData&&this._oStyleData.lineBreak&&this.getUIArea()){this._$RootNode=q(this.getUIArea().getRootNode());this._$RootNode.on(this._getAnimationEvents(),this._queueAnimationEnd.bind(this));}this._queueAnimationEnd();};n.prototype._queueAnimationEnd=function(E){if(E){var t=q(E.target);if(t.is(".sapMGT, .sapMGT *")){return false;}}if(typeof this._cHoverStyleUpdates!=="number"){this._cHoverStyleUpdates=-1;}if(!this._oAnimationEndCallIds){this._oAnimationEndCallIds={};}this._cHoverStyleUpdates++;this._oAnimationEndCallIds[this._cHoverStyleUpdates]=setTimeout(this._handleAnimationEnd.bind(this,this._cHoverStyleUpdates),10);};n.prototype._handleAnimationEnd=function(i){delete this._oAnimationEndCallIds[i];if(this._cHoverStyleUpdates===i){this._getStyleData();L._updateHoverStyle.call(this);}};n.prototype._clearAnimationUpdateQueue=function(){for(var k in this._oAnimationEndCallIds){clearTimeout(this._oAnimationEndCallIds[k]);delete this._oAnimationEndCallIds[k];}};n.prototype._getLineCount=function(){var o=this.getDomRef().getBoundingClientRect(),i=L._getCSSPixelValue(this,"line-height");return Math.round(o.height/i);};n.prototype.getBoundingRects=function(){var o=this.$().offset();return[{offset:{x:o.left,y:o.top},width:this.$().outerWidth(),height:this.$().height()}];};n.prototype._updateLineTileSiblings=function(){var o=this.getParent();if(this.getMode()===g.LineMode&&this._isScreenLarge()&&o){var i=o.indexOfAggregation(this.sParentAggregationName,this);var s=o.getAggregation(this.sParentAggregationName).splice(i+1);for(i=0;i<s.length;i++){var k=s[i];if(k instanceof n&&k.getMode()===g.LineMode){k._updateHoverStyle();}}}};n.prototype.ontouchstart=function(){this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive");}if(this.getMode()===g.LineMode){this.addStyleClass("sapMGTLineModePress");}};n.prototype.ontouchcancel=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive");}};n.prototype.ontouchend=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive");}if(this.getMode()===g.LineMode){this.removeStyleClass("sapMGTLineModePress");}};n.prototype.ontap=function(i){if(!_(i,this)){var o;if(this._bTilePress&&this.getState()!==f.Disabled){this.$().trigger("focus");o=this._getEventParams(i);if(!(this.isInActionRemoveScope()&&o.action===n._Action.Press)){this.firePress(o);}i.preventDefault();}}};var p=false;n.prototype.onkeydown=function(i){if(!_(i,this)){p=(i.keyCode===16||i.keyCode===27)?true:false;var k=m[i.keyCode];if(!k){m[i.keyCode]=true;if(m[32]||m[13]){i.preventDefault();}}if(P.events.sapselect.fnCheck(i)&&this.getState()!==f.Disabled){this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive");}i.preventDefault();}}};n.prototype._updateAriaLabel=function(){var A=this._getAriaText(),t=this.$(),i=false;if(t.attr("aria-label")!==A){t.attr("aria-label",A);i=true;}return i;};n.prototype.onkeyup=function(i){if(!_(i,this)){var k=m[i.keyCode];if(k){delete m[i.keyCode];}var o,r=false,s=this.getScope(),A=s===e.Actions||s===e.ActionRemove;if(A&&(P.events.sapdelete.fnCheck(i)||P.events.sapbackspace.fnCheck(i))){o={scope:s,action:n._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};r=true;}if(m[16]&&i.keyCode!==16&&this.getState()!==f.Disabled){p===false;}if((P.events.sapselect.fnCheck(i)||p)&&this.getState()!==f.Disabled){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive");}o=this._getEventParams(i);r=true;}if(!p&&r){this.firePress(o);i.preventDefault();}this._updateAriaLabel();}};n.prototype.setProperty=function(s){C.prototype.setProperty.apply(this,arguments);if(this.getMode()===g.LineMode&&n.LINEMODE_SIBLING_PROPERTIES.indexOf(s)!==-1){this._bUpdateLineTileSiblings=true;}return this;};n.prototype.getHeader=function(){return this._oTitle.getText();};n.prototype.setHeader=function(t){this.setProperty("header",t);this._oTitle.setText(t);return this;};n.prototype.setHeaderImage=function(u){var v=!d(this.getHeaderImage(),u);if(v){if(this._oImage){this._oImage.destroy();this._oImage=undefined;}if(u){this._oImage=a.createControlByURI({id:this.getId()+"-icon-image",src:u},b);this._oImage.addStyleClass("sapMGTHdrIconImage");}}return this.setProperty("headerImage",u);};n.prototype._applyHeaderMode=function(s){var i=this.getFrameType();if(this._isIconMode()){this._oTitle.setProperty("maxLines",2,true);}else if(i===F.TwoByOne&&this.getMode()===g.ActionMode){this._oTitle.setProperty("maxLines",2,true);}else if(i===F.OneByHalf||i===F.TwoByHalf){this._oTitle.setProperty("maxLines",2,true);}else{if(s){this._oTitle.setProperty("maxLines",4,true);}else{this._oTitle.setProperty("maxLines",5,true);}}this._changeTileContentContentVisibility(false);};n.prototype._applyContentMode=function(s){var k=this.getFrameType();var t=this.getTileContent();var o=false;if(k===F.TwoByHalf||k===F.OneByHalf){if(t.length){for(var i=0;i<t.length;i++){var r=t[i].getAggregation('content');if(r!==null){if((k===F.OneByHalf&&r.getMetadata().getName()==="sap.m.ImageContent")){o=true;this._oTitle.setProperty("maxLines",2,true);break;}else{this._oTitle.setProperty("maxLines",1,true);break;}}this._oTitle.setProperty("maxLines",2,true);}}else{this._oTitle.setProperty("maxLines",2,true);}}else if(k===F.TwoByOne&&this.getMode()===g.ActionMode){if(s){this._oTitle.setProperty("maxLines",1,true);}else{this._oTitle.setProperty("maxLines",2,true);}}else if(s){this._oTitle.setProperty("maxLines",2,true);}else{this._oTitle.setProperty("maxLines",3,true);}this._changeTileContentContentVisibility(true,k,o);};n.prototype._changeTileContentContentVisibility=function(v,k,o){var t;t=this.getTileContent();for(var i=0;i<t.length;i++){if(k==F.OneByHalf&&o){t[i].setRenderContent(false);}else{t[i].setRenderContent(v);}}};n.prototype._getHeaderAriaAndTooltipText=function(){var t="";var i=true;if(this.getHeader()){t+=this.getHeader();i=false;}if(this.getSubheader()){t+=(i?"":"\n")+this.getSubheader();i=false;}if(this.getImageDescription()){t+=(i?"":"\n")+this.getImageDescription();}return t;};n.prototype._getContentAriaAndTooltipText=function(){var t="";var k=true;var o=this.getTileContent();var A=this.getAdditionalTooltip();if(!this._isInActionScope()&&this.getMode()===g.ContentMode){for(var i=0;i<o.length;i++){if(typeof o[i]._getAriaAndTooltipText==="function"){t+=(k?"":"\n")+o[i]._getAriaAndTooltipText();}else if(o[i].getTooltip_AsString()){t+=(k?"":"\n")+o[i].getTooltip_AsString();}k=false;}}if(A){t+=(k?"":"\n")+A;}return t;};n.prototype._getAriaAndTooltipText=function(){var A=(this.getTooltip_AsString()&&!this._isTooltipSuppressed())?this.getTooltip_AsString():(this._getHeaderAriaAndTooltipText()+"\n"+this._getContentAriaAndTooltipText());switch(this.getState()){case f.Disabled:return"";case f.Loading:return A+"\n"+this._sLoading;case f.Failed:return A+"\n"+this._oFailedText.getText();default:if(A.trim().length===0){return"";}else{return A;}}};n.prototype._getAriaText=function(){var A=this.getTooltip_Text();var s=this.getAriaLabel();if(!A||this._isTooltipSuppressed()){A=this._getAriaAndTooltipText();}if(this._isInActionScope()){A=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+" "+A;}if(s){A=s+" "+A;}return A;};n.prototype._getTooltipText=function(){var t=this.getTooltip_Text();if(this._isTooltipSuppressed()===true){t=null;}return t;};n.prototype._checkFooter=function(t,i){var s=i.getState();var A=this._isInActionScope()||this._bShowActionsView===true;var k=this.getFrameType();var o=t.getAggregation('content');if(this._isIconMode()){t.setRenderFooter(false);}else if(s===f.Failed||A&&s!==f.Disabled){t.setRenderFooter(false);}else if(k===F.TwoByHalf&&(o!==null||this.getSubheader())){t.setRenderFooter(false);}else if(k===F.OneByHalf&&((o!==null&&o.getMetadata().getName()!=="sap.m.ImageContent")||this.getSubheader())){t.setRenderFooter(false);}else{t.setRenderFooter(true);return true;}};n.prototype._isInActionScope=function(){return this.getScope()===e.Actions||this.getScope()===e.ActionMore||this.getScope()===e.ActionRemove;};n.prototype.isInActionRemoveScope=function(){return this.getScope()===e.ActionRemove;};n.prototype._generateFailedText=function(){var s=this.getFailedText();var i=s?s:this._sFailedToLoad;this._oFailedText.setProperty("text",i,true);this._oFailedText.setAggregation("tooltip",i,true);};n.prototype._isTooltipSuppressed=function(){var t=this.getTooltip_Text();if(t&&t.length>0&&t.trim().length===0){return true;}else{return false;}};n.prototype._isHeaderTextTruncated=function(){var o,M,$,w;if(this.getMode()===g.LineMode){$=this.$("hdr-text");if($.length>0){w=Math.ceil($[0].getBoundingClientRect().width);return($[0]&&w<$[0].scrollWidth);}else{return false;}}else{o=this.getAggregation("_titleText").getDomRef("inner");M=this.getAggregation("_titleText").getClampHeight(o);return(M<o.scrollHeight);}};n.prototype._isSubheaderTextTruncated=function(){var s;if(this.getMode()===g.LineMode){s=this.$("subHdr-text");}else{s=this.$("subTitle");}if(s.length>0){var w=Math.ceil(s[0].getBoundingClientRect().width);return(s[0]&&w<s[0].scrollWidth);}else{return false;}};n.prototype._setTooltipFromControl=function(){var t=this._getAriaAndTooltipText();if(t&&!this._getTooltipText()&&!this._isTooltipSuppressed()){this.$().attr("title",t.trim());this._bTooltipFromControl=true;}};n.prototype._updateAriaAndTitle=function(){var A=this._getAriaAndTooltipText();var s=this._getAriaText();var t=this.$();if(t.attr("title")!==A){t.attr("aria-label",s);}if(this._isInActionScope()){t.find('*:not(.sapMGTRemoveButton)').removeAttr("aria-label").removeAttr("title").off("mouseenter");}else{t.find('*').removeAttr("aria-label").removeAttr("title").off("mouseenter");}this._setTooltipFromControl();};n.prototype._removeTooltipFromControl=function(){if(this._bTooltipFromControl){this.$().removeAttr("title");this._bTooltipFromControl=false;}};n.prototype._isScreenLarge=function(){return this._getCurrentMediaContainerRange(j).name==="large";};n.prototype._getEventParams=function(E){var o,A=n._Action.Press,s=this.getScope(),i=this.getDomRef();if((s===e.Actions||e.ActionRemove)&&E.target.id.indexOf("-action-remove")>-1){A=n._Action.Remove;i=this._oRemoveButton.getPopupAnchorDomRef();}else if(s===e.Actions||s===e.ActionMore){i=this._oMoreIcon.getDomRef();}o={scope:s,action:A,domRef:i};return o;};n.prototype._handleMediaChange=function(){this._bUpdateLineTileSiblings=true;this.invalidate();};n.prototype.setPressEnabled=function(v){this._bTilePress=v;this.setProperty("pressEnabled",v);return this;};n.prototype.showActionsView=function(v){if(this._bShowActionsView!==v){this._bShowActionsView=v;this.invalidate();}};n.prototype._generateIconAggregation=function(i){var A="";this._oIcon=a.createControlByURI({size:this.getFrameType()===F.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:i});if(!this._oIcon){this._oIcon=a.createControlByURI({height:this.getFrameType()===F.OneByOne?"2rem":"1.25rem",width:this.getFrameType()===F.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:i},b).addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon");}this._oIcon.addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon");if(this._oIcon instanceof b){A="_tileIconImage";}else if(this._oIcon instanceof I){A="_tileIcon";}if(A){this.setAggregation(A,this._oIcon);}return A;};n.prototype._isIconMode=function(){if(this.getMode()===g.IconMode&&(this.getFrameType()===F.OneByOne||this.getFrameType()===F.TwoByHalf)&&this.getBackgroundColor()&&this.getTileIcon()){return true;}else{return false;}};n.prototype._isNavigateActionEnabled=function(){return this.getMode()===g.ArticleMode&&this.getUrl()&&this.getEnableNavigationButton();};n.prototype._isActionMode=function(){return this.getFrameType()===F.TwoByOne&&this.getMode()===g.ActionMode&&this.getActionButtons().length;};n.prototype._getNavigateAction=function(){return this._oNavigateAction;};n.prototype._navigateEventHandler=function(E){E.preventDefault();var u=E.getSource().getParent().getUrl();U.redirect(u,true);};function _(i,t){var k=false,o=false;if(t._isActionMode()){var A=document.querySelector("#"+t.getId()+"-actionButtons");k=A&&A!==i.target&&A.contains(i.target);}if(t._isNavigateActionEnabled()){var N=document.querySelector("#"+t.getId()+"-navigateActionContainer");o=N&&N!==i.target&&N.contains(i.target);}return k||o;}return n;});
