/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/valuehelp/base/Container','sap/ui/mdc/valuehelp/base/DialogTab','sap/ui/mdc/util/loadModules','sap/ui/Device','sap/m/VBox','sap/m/FlexItemData','sap/ui/model/resource/ResourceModel','sap/ui/mdc/util/Common','sap/ui/mdc/enum/SelectType'],function(C,D,l,a,V,F,R,b,S){"use strict";var M,c,B,d,I,e;var P,H,T,f,g;var h=C.extend("sap.ui.mdc.valuehelp.Dialog",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.IDialogContainer"],properties:{_selectedContentKey:{type:"string",visibility:"hidden"},_quickSelectEnabled:{type:"boolean",visibility:"hidden",defaultValue:false}},defaultAggregation:"content"}});function _(){if(a.system.desktop){return"700px";}if(a.system.tablet){return a.orientation.landscape?"600px":"600px";}}function j(){if(a.system.desktop){return"1080px";}if(a.system.tablet){return a.orientation.landscape?"920px":"600px";}}h.prototype.invalidate=function(o){if(o){var i=this.getContent();var k=i.indexOf(o);if(this._oIconTabBar&&k!==-1&&!this._bIsBeingDestroyed){var m=this._oIconTabBar.getItems();if(m[k]){m[k].invalidate(o);}}else{C.prototype.invalidate.apply(this,arguments);}}};h.prototype._getUIAreaForContent=function(){var o=this.getAggregation("_container");if(o){return o.getUIArea();}return C.prototype._getUIAreaForContent.apply(this,arguments);};h.prototype._handleConfirmed=function(E){this.fireConfirm({close:true});};h.prototype._handleClosed=function(E){var i=this.getContent();var o=this._sSelectedKey&&i&&i.find(function(o){return o.getId()===this._sSelectedKey;}.bind(this));if(o){o.onHide();}C.prototype._handleClosed.apply(this,arguments);};h.prototype._getContainer=function(){if(!this.getModel("$i18n")){this.setModel(new R({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");}var o=this.getAggregation("_container");if(!o){return this._retrievePromise("dialog",function(){return l(["sap/m/Dialog","sap/m/Button","sap/ui/model/base/ManagedObjectModel","sap/m/library"]).then(function(m){M=m[0];B=m[1];d=m[2];c=m[3];var i=c.ButtonType;if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");}this.oButtonOK=new B(this.getId()+"-ok",{text:this._oResourceBundle.getText("valuehelp.OK"),enabled:"{$valueHelp>/_valid}",type:i.Emphasized,press:this._handleConfirmed.bind(this),visible:{parts:['$valueHelp>/_config/maxConditions','$help>/_quickSelectEnabled'],formatter:function(n,q){return n!==1||!q;}}});this.oButtonCancel=new B(this.getId()+"-cancel",{text:this._oResourceBundle.getText("valuehelp.CANCEL"),press:this._handleCanceled.bind(this)});this._oManagedObjectModel=new d(this);var o=new M(this.getId()+"-dialog",{contentHeight:_(),contentWidth:j(),horizontalScrolling:false,verticalScrolling:false,title:{parts:['$help>/title','$help>/content'],formatter:function(s,n){if(n.length==1){var p=n[0];var q=p.getFormattedShortTitle()?p.getFormattedShortTitle():p.getTitle();if(q){s=this._oResourceBundle.getText("valuehelp.DIALOGSHORTTITLECOLONTITLE",[q,s]);}}return s;}.bind(this)},stretch:a.system.phone,resizable:true,draggable:true,afterOpen:this._handleOpened.bind(this),afterClose:this._handleClosed.bind(this),buttons:[this.oButtonOK,this.oButtonCancel]});o.setModel(this._oManagedObjectModel,"$help");this.setAggregation("_container",o,true);o.isPopupAdaptationAllowed=function(){return false;};o.addStyleClass("sapMdcValueHelp");o.addStyleClass("sapMdcValueHelpTitle");o.addStyleClass("sapMdcValueHelpTitleShadow");var v=new V({fitContainer:true});v.addStyleClass("sapMdcValueHelpPanel");o.addContent(v);var k=this._getIconTabBar(o);var t=this._getTokenizerPanel();return Promise.all([k,t]).then(function(n){n.forEach(function(p){v.addItem(p);});return o;});}.bind(this));}.bind(this));}return o;};h.prototype._handleSelect=function(E){C.prototype._handleSelect.apply(this,arguments);if(this.getProperty("_quickSelectEnabled")&&this._isSingleSelect()){this.fireConfirm({close:true});}};h.prototype._observeChanges=function(o){if(o.name==="content"){var i=this.getContent();this.setProperty("_quickSelectEnabled",i&&i.every(function(k){return k.isQuickSelectSupported&&k.isQuickSelectSupported();}));}C.prototype._observeChanges.apply(this,arguments);};h.prototype._onTabBarSelect=function(E){var i=this.getContent();var n=E&&E.getParameter("key");var p=this._sSelectedKey&&i&&i.find(function(k){return k.getId()===this._sSelectedKey;}.bind(this));if(p){p.onHide();}this._sSelectedKey=n||this._oIconTabBar&&this._oIconTabBar.getSelectedKey();if(!this._sSelectedKey){var o=this._oIconTabBar.getItems()[0];this._sSelectedKey=o&&o.getKey();if(this._sSelectedKey){this.setProperty("_selectedContentKey",this._sSelectedKey);}}var s=this._sSelectedKey?i&&i.find(function(k){return k.getId()===this._sSelectedKey;}.bind(this)):i[0];if(s){Promise.all([this._retrievePromise("open"),s.getContent()]).then(function(){s.onShow();});}};h.prototype._getIconTabBar=function(o){if(!this._oIconTabBar){return l(["sap/m/IconTabBar","sap/m/IconTabFilter"]).then(function(m){I=m[0];e=m[1];var i=c.IconTabHeaderMode;this._oIconTabBar=new I(this.getId()+"-ITB",{expandable:false,upperCase:false,stretchContentHeight:true,headerMode:i.Inline,select:this._onTabBarSelect.bind(this),layoutData:new F({growFactor:1}),selectedKey:"{$help>/_selectedContentKey}",visible:{parts:['$help>/content'],formatter:function(n){if(n&&n.length==1){this.addStyleClass("sapMdcNoHeader");o.removeStyleClass("sapMdcValueHelpTitleShadow");}else{this.removeStyleClass("sapMdcNoHeader");o.addStyleClass("sapMdcValueHelpTitleShadow");}return true;}}});this._oIconTabBar.addStyleClass("sapUiNoContentPadding");var k=new e(this.getId()+"-ITF",{key:{path:"$help>id"},content:new D(this.getId()+"-DT",{content:{path:"$help>displayContent"}}),text:{parts:['$help>','$valueHelp>/conditions'],formatter:function(n,p){return n?n.getFormattedTitle(n.getCount(p)):"none";}}});this._oIconTabBar.bindAggregation("items",{path:"/content",model:"$help",templateShareable:false,template:k});return this._oIconTabBar;}.bind(this));}return this._oIconTabBar;};h.prototype._getTokenizerPanel=function(o){if(!this.oTokenizerPanel){return l(['sap/m/Panel','sap/m/HBox','sap/m/VBox','sap/m/Tokenizer','sap/m/Token','sap/base/strings/formatMessage','sap/ui/model/Filter','sap/ui/mdc/field/ConditionType']).then(function(m){P=m[0];H=m[1];V=m[2];T=m[3];f=m[4];g=m[5];var k=m[6];var n=m[7];var p=c.BackgroundDesign;var q=c.ButtonType;this.oTokenizerPanel=new P({backgroundDesign:p.Transparent,expanded:true,visible:{parts:['$valueHelp>/_config/maxConditions','$help>/content'],formatter:function(i,x){var y=false;if(x&&x.some(function(z){return z.getRequiresTokenizer();})){y=true;}return y&&i===-1;}},headerText:{parts:['$i18n>valuehelp.TOKENIZERTITLE','$valueHelp>/conditions'],formatter:function(x,y){var z=0;for(var i=0;i<y.length;i++){var A=y[i];if(A.isEmpty!==true){z++;}}if(z===0){x=this._oResourceBundle.getText("valuehelp.TOKENIZERTITLENONUMBER");}return g(x,z);}.bind(this)}});this.oTokenizerPanel.addStyleClass("sapMdcTokenizerPanel");var r=new H({fitContainer:true,width:"100%"});var s=new k({path:'isEmpty',operator:'NE',value1:true});var v=this.getModel("$valueHelp");var t=v?v.getProperty("/_config"):{};var u={maxConditions:-1,valueType:t.dataType,operators:t.operators,display:t.display};var w=new f({text:{path:'$valueHelp>',type:new n(u)}});this.oTokenizer=new T({width:"100%",tokenDelete:function(E){if(E.getParameter("tokens")){var x=E.getParameter("tokens");var y=this.getModel("$valueHelp").getObject("/conditions");var z=[];x.forEach(function(A,i){var G=A.getBindingContext("$valueHelp").sPath;var J=parseInt(G.slice(G.lastIndexOf("/")+1));z.push(y[J]);});this.fireSelect({type:S.Remove,conditions:z});}}.bind(this),tokens:{path:'/conditions',model:"$valueHelp",templateShareable:false,template:w,filters:s},layoutData:new F({growFactor:1,maxWidth:"calc(100% - 2rem)"})});this.oTokenizer.addStyleClass("sapMdcTokenizer");this.oRemoveAllBtn=new B({press:function(E){this.fireSelect({type:S.Set,conditions:[]});}.bind(this),type:q.Transparent,icon:"sap-icon://decline",tooltip:"{$i18n>valuehelp.REMOVEALLTOKEN}",layoutData:new F({growFactor:0,baseSize:"2rem"})});this.oRemoveAllBtn.addStyleClass("sapUiTinyMarginBegin");r.addItem(this.oTokenizer);r.addItem(this.oRemoveAllBtn);this.oTokenizerPanel.addContent(r);return this.oTokenizerPanel;}.bind(this));}return this.oTokenizerPanel;};h.prototype._open=function(o){this._onTabBarSelect();if(o){o.open();}};h.prototype._close=function(){var o=this.getAggregation("_container");if(o){o.close();}};h.prototype.getValueHelpIcon=function(){return"sap-icon://value-help";};h.prototype.getAriaAttributes=function(m){return{contentId:null,ariaHasPopup:"dialog",role:null,roleDescription:null};};h.prototype.isMultiSelect=function(){return this.getMaxConditions()!==1;};h.prototype.exit=function(){b.cleanup(this,["_oManagedObjectModel","_oResourceBundle","oButtonOK","oButtonCancel","oTokenizerPanel","oTokenizer","_oIconTabBar"]);};return h;});
