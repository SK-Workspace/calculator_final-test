/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/base/util/restricted/_isEqual","sap/base/util/each","sap/base/util/includes","sap/base/util/isEmptyObject","sap/base/util/merge","sap/base/util/ObjectPath","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/BusyIndicator","sap/ui/fl/apply/_internal/changes/Reverter","sap/ui/fl/apply/_internal/controlVariants/URLHandler","sap/ui/fl/apply/_internal/flexState/controlVariants/Switcher","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/changeHandler/Base","sap/ui/fl/Change","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/ui/fl/registry/Settings","sap/ui/model/json/JSONModel"],function(_,a,e,i,b,m,O,L,J,B,R,U,S,V,c,d,C,f,g,h,j,k){"use strict";var l={};function n(E,P){return q(function(A,D){var M=D.model;var F=D.vmReference;var G=false;var T=A.key;var H=A.key;return Promise.resolve().then(function(){if(O.get([F,"currentVariant"],M.oData)&&M.oData[F].currentVariant!==M.oData[F].originalCurrentVariant){H=M.oData[F].originalCurrentVariant;G=true;return M.updateCurrentVariant({variantManagementReference:F,newVariantReference:T,appComponent:M.oAppComponent,internallyCalled:true});}}).then(function(){if(O.get([F,"modified"],M.oData)===true){var I=V.getControlChangesForVariant({reference:M.sFlexReference,vmReference:F,vReference:H,changeInstance:true});return o({changes:I,vmReference:F,vReference:H,revert:!G,model:M}).then(function(){M.oData[F].originalCurrentVariant=T;M.oData[F].modified=false;M.checkUpdate(true);});}}).then(function(){if(!G){M._callVariantSwitchListeners(F,M.oData[F].currentVariant);}});}.bind(null,E.getParameters(),P),P.model,P.vmReference);}function o(P){var A=P.model._getDirtyChangesFromVariantChanges(P.changes);A=A.reverse();return Promise.resolve().then(function(){if(P.revert){return R.revertMultipleChanges(A,{appComponent:P.model.oAppComponent,modifier:J,flexController:P.model.oFlexController});}}).then(function(){A.forEach(function(D){V.removeChangeFromVariant({reference:P.model.sFlexReference,change:D,vmReference:P.vmReference,vReference:P.vReference});P.model.oFlexController.deleteChange(D,P.model.oAppComponent);});});}function p(M,A,D){if(D||M.oData[A]){M.oData[A].variantBusy=D;}M.checkUpdate();}function q(A,M,D){M._oVariantSwitchPromise=M._oVariantSwitchPromise.catch(function(){}).then(p.bind(null,M,D,true)).then(A).then(p.bind(null,M,D,false)).catch(function(E){p(M,D,false);throw E;});M.oFlexController.setVariantSwitchPromise(M._oVariantSwitchPromise);return M._oVariantSwitchPromise;}function s(A,D){l[A]=D;}function r(P){return S.switchVariant(P).then(function(){delete this.oData[P.vmReference];}.bind(this)).catch(function(E){L.warning(E.message);});}function t(P,A){return S.switchVariant(P).then(function(){this.oData[P.vmReference].originalCurrentVariant=P.newVReference;this.oData[P.vmReference].currentVariant=P.newVReference;if(this.oData[P.vmReference].updateVariantInURL){U.updateVariantInURL({vmReference:P.vmReference,newVReference:P.newVReference,model:this});}this._callVariantSwitchListeners(P.vmReference,P.newVReference,undefined,A);this.checkUpdate();}.bind(this));}function u(A){j.getInstance().then(function(D){if(!D.isVariantPersonalizationEnabled()){A.remove=false;A.rename=false;A.change=false;}});}function v(A,D,E){var F=E?g.getCurrentLayer():f.USER;if((A.layer===F)&&(A.key!==D)){return true;}return false;}function w(A){return new Promise(function(D){if(A.getDomRef()){D();}else{A.addEventDelegate({onAfterRendering:function(){D();}});}});}var x=k.extend("sap.ui.fl.variants.VariantModel",{constructor:function(D,P){this.pSequentialImportCompleted=Promise.resolve();k.apply(this,[D]);this.sharing={PRIVATE:"private",PUBLIC:"public"};this.oFlexController=P.flexController;this.oChangePersistence=this.oFlexController._oChangePersistence;this.sFlexReference=this.oChangePersistence.getComponentName();this.oAppComponent=P.appComponent;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this._oVariantSwitchPromise=Promise.resolve();this._oVariantAppliedListeners={};if(b(D)){try{D=V.fillVariantModel({reference:this.sFlexReference});}catch(E){L.error("Variants Map was not found: "+E.message);}}if(D&&typeof D==="object"){Object.keys(D).forEach(function(K){D[K].variants.forEach(function(A){if(!D[K].currentVariant&&(A.key===D[K].defaultVariant)){D[K].currentVariant=A.key;}A.originalTitle=A.title;A.originalFavorite=A.favorite;A.originalExecuteOnSelect=A.executeOnSelect;A.originalVisible=A.visible;A.originalContexts=A.contexts;});D[K].originalCurrentVariant=D[K].currentVariant;D[K].originalDefaultVariant=D[K].defaultVariant;});this.setData(D);}}});x.prototype.initialize=function(){return Promise.resolve().then(function(){var A=h.getUshellContainer();if(A){var D=[h.getUShellService("UserInfo"),h.getUShellService("URLParsing"),h.getUShellService("CrossApplicationNavigation"),h.getUShellService("ShellNavigation")];return Promise.all(D).then(function(E){s("UserInfo",E[0]);s("URLParsing",E[1]);s("CrossApplicationNavigation",E[2]);s("ShellNavigation",E[3]);}).catch(function(E){throw new Error("Error getting service from Unified Shell: "+E);});}return undefined;}).then(function(){U.initialize({model:this});}.bind(this));};x.prototype.updateCurrentVariant=function(P){var A={vmReference:P.variantManagementReference,currentVReference:this.oData[P.variantManagementReference].originalCurrentVariant,newVReference:P.newVariantReference,flexController:this.oFlexController,appComponent:P.appComponent||this.oAppComponent,modifier:J,reference:this.sFlexReference};if(P.internallyCalled){return t.call(this,A,P.scenario);}return q(t.bind(this,A,P.scenario),this,P.variantManagementReference);};x.prototype.getCurrentVariantReference=function(A){return this.oData[A].currentVariant;};x.prototype.getVariantManagementReference=function(A){var D="";var I=-1;Object.keys(this.oData).some(function(K){return this.oData[K].variants.some(function(E,F){if(E.key===A){D=K;I=F;return true;}});}.bind(this));return{variantManagementReference:D,variantIndex:I};};x.prototype.getVariant=function(A,D){return V.getVariant({reference:this.sFlexReference,vmReference:D||this.getVariantManagementReference(A).variantManagementReference,vReference:A});};x.prototype.getVariantProperty=function(A,P){return this.getVariant(A).content.content[P];};function y(A,D){var E=V.getVariantChangesForVariant({vmReference:A,reference:this.sFlexReference});var F=this.oData[A].currentVariant;var G=this.oData[A].defaultVariant;if(D.getExecuteOnSelectionForStandardDefault()&&F===G&&F===A&&!E.setExecuteOnSelect){var H=V.getVariant({reference:this.sFlexReference,vmReference:A,vReference:A});H.content.content.executeOnSelect=true;this.oData[A].variants[0].originalExecuteOnSelect=true;this.oData[A].variants[0].executeOnSelect=true;return true;}return false;}x.prototype.attachVariantApplied=function(P){var A=sap.ui.getCore().byId(P.vmControlId);var D=this.getVariantManagementReferenceForControl(A);return this.waitForVMControlInit(D).then(function(D,P){if(!this._oVariantAppliedListeners[D]){this._oVariantAppliedListeners[D]={};}var I=y.call(this,D,A);if(P.callAfterInitialVariant||I){var E={appComponent:this.oAppComponent,reference:this.sFlexReference,vmReference:D,flexController:this.oFlexController};V.waitForInitialVariantChanges(E).then(function(){var F=V.getCurrentVariantReference({vmReference:D,reference:this.sFlexReference});this._callVariantSwitchListeners(D,F,P.callback);}.bind(this));}return w(P.control).then(function(){if(c.getRelevantVariantManagementControlId(P.control,this.getVariantManagementControlIds())===P.vmControlId){this.oData[D].showExecuteOnSelection=true;this.checkUpdate(true);this._oVariantAppliedListeners[D][P.control.getId()]=P.callback;}else{L.error("Error in attachVariantApplied: The passed VariantManagement ID does not match the responsible VariantManagement control");}}.bind(this));}.bind(this,D,P));};x.prototype._callVariantSwitchListeners=function(A,N,D,E){if(this._oVariantAppliedListeners[A]){var F;this.oData[A].variants.some(function(G){if(G.key===N){F=m({},G);return true;}});if(E){F.createScenario=E;}if(D){D(F);}else{e(this._oVariantAppliedListeners[A],function(G,D){D(F);});}}};x.prototype.detachVariantApplied=function(A,D){var E=this.getVariantManagementReferenceForControl(sap.ui.getCore().byId(A));if(this._oVariantAppliedListeners[E]){delete this._oVariantAppliedListeners[E][D];}};x.prototype.addChange=function(A){var D=A.getVariantReference();var E=this.getVariantManagementReference(D).variantManagementReference;if(A.getState()===C.states.NEW){this.oData[E].modified=true;}this.checkUpdate(true);return V.addChangeToVariant({reference:this.sFlexReference,change:A,vmReference:E,vReference:D});};x.prototype.removeChange=function(A){var D=A.getVariantReference();var E=this.getVariantManagementReference(D).variantManagementReference;var F=V.removeChangeFromVariant({reference:this.sFlexReference,change:A,vmReference:E,vReference:D});this.checkDirtyStateForControlModels([E]);return F;};x.prototype._getVariantTitleCount=function(N,A){var D=this.getData();return D[A].variants.reduce(function(E,F){if(N.toLowerCase()===F.title.toLowerCase()&&F.visible){E++;}return E;},0);};x.prototype._duplicateVariant=function(P){var N=P.newVariantReference;var A=P.sourceVariantReference;var D=P.variantManagementReference;var E=this.getVariant(A);var F=V.getControlChangesForVariant({vmReference:D,vReference:A,changeInstance:true,reference:this.sFlexReference}).map(function(M){return M.getDefinition();});var G={content:{},controlChanges:F,variantChanges:{}};var H=g.compareAgainstCurrentLayer(E.content.layer,P.layer);Object.keys(E.content).forEach(function(M){if(M==="fileName"){G.content[M]=N;}else if(M==="variantReference"){if(H===1){var Q=this.getVariant(E.content.variantReference);if(Q.content.layer===P.layer){G.content[M]=Q.content.variantReference;}else{G.content[M]=E.content.variantReference;}}else if(H===0){G.content[M]=E.content.variantReference;}else if(H===-1){G.content[M]=A;}}else if(M==="content"){G.content[M]=JSON.parse(JSON.stringify(E.content[M]));G.content.content.title=P.title;}else{G.content[M]=E.content[M];}}.bind(this));G.content.layer=P.layer;G.content.contexts=P.contexts;F=G.controlChanges.slice();var I={};var K;G.controlChanges=F.reduce(function(M,Q){if(g.compareAgainstCurrentLayer(Q.layer,P.layer)>=0){I=m({},Q);I.layer=P.layer;I.variantReference=G.content.fileName;if(!I.support){I.support={};}I.support.sourceChangeFileName=Q.fileName;I.packageName="$TMP";K=C.createInitialFileContent(I);M.push(new C(K));}return M;},[]);return G;};x.prototype.copyVariant=function(P){var D=this._duplicateVariant(P);D.generator=P.generator;var A={key:D.content.fileName,layer:P.layer,title:D.content.content.title,originalTitle:D.content.content.title,originalExecuteOnSelect:D.content.content.executeOnSelect,executeOnSelect:false,favorite:true,originalFavorite:true,rename:true,change:true,remove:true,visible:true,originalVisible:true,sharing:P.layer===f.USER?this.sharing.PRIVATE:this.sharing.PUBLIC,contexts:D.content.contexts,originalContexts:D.originalContexts};var E=c.createVariant({model:this,variantSpecificData:D});var F=[];[E].concat(E.getControlChanges()).forEach(function(G){F.push(this.oChangePersistence.addDirtyChange(G));}.bind(this));var I=V.addVariantToVariantManagement({variantData:m({},E.getDefinitionWithChanges(),{content:{content:{visible:A.visible,favorite:A.favorite}}}),reference:this.sFlexReference,vmReference:P.variantManagementReference});this.oData[P.variantManagementReference].variants.splice(I,0,A);return this.updateCurrentVariant({variantManagementReference:P.variantManagementReference,newVariantReference:E.getId(),appComponent:P.appComponent,internallyCalled:true,scenario:"saveAs"}).then(function(){return F;});};x.prototype.removeVariant=function(P){var A=this.oChangePersistence.getDirtyChanges().filter(function(D){return(D.getVariantReference&&D.getVariantReference()===P.variant.getId())||D.getId()===P.variant.getId();});return this.updateCurrentVariant({variantManagementReference:P.variantManagementReference,newVariantReference:P.sourceVariantReference,appComponent:P.component}).then(function(){var I=V.removeVariantFromVariantManagement({reference:this.sFlexReference,variant:P.variant,vmReference:P.variantManagementReference});this.oData[P.variantManagementReference].variants.splice(I,1);this.checkUpdate();A.forEach(function(D){this.oChangePersistence.deleteChange(D);}.bind(this));}.bind(this));};x.prototype.collectModelChanges=function(A,D){var E=this.getData()[A];var M=E.variants;var F=[];var P={};M.forEach(function(G){if(G.originalTitle!==G.title){P={variantReference:G.key,changeType:"setTitle",title:G.title,originalTitle:G.originalTitle,layer:D};F.push(P);}if(G.originalFavorite!==G.favorite){P={variantReference:G.key,changeType:"setFavorite",favorite:G.favorite,originalFavorite:G.originalFavorite,layer:D};F.push(P);}if(G.originalExecuteOnSelect!==G.executeOnSelect){P={variantReference:G.key,changeType:"setExecuteOnSelect",executeOnSelect:G.executeOnSelect,originalExecuteOnSelect:G.originalExecuteOnSelect,layer:D};F.push(P);}if(!G.visible&&G.originalVisible){P={variantReference:G.key,changeType:"setVisible",visible:false,layer:D};F.push(P);}if(!a(G.originalContexts,G.contexts)){P={variantReference:G.key,changeType:"setContexts",layer:D,contexts:G.contexts,originalContexts:G.originalContexts};F.push(P);}});if(E.originalDefaultVariant!==E.defaultVariant){P={variantManagementReference:A,changeType:"setDefault",defaultVariant:E.defaultVariant,originalDefaultVariant:E.originalDefaultVariant,layer:D};F.push(P);}return F;};x.prototype.manageVariants=function(A,D,E,F,G){return new Promise(function(H){A.attachEventOnce("manage",{resolve:H,variantManagementReference:D,layer:E},this.fnManageClickRta,this);A.openManagementDialog(true,F,G);}.bind(this));};x.prototype.addVariantChange=function(A,P){var D=this.setVariantProperties(A,P);var N={};var E={vmReference:A,add:true,reference:this.sFlexReference};N.changeType=P.changeType;N.layer=P.layer;N.generator=P.generator;if(P.changeType==="setDefault"){N.fileType="ctrl_variant_management_change";N.selector=J.getSelector(A,P.appComponent);}else{if(P.changeType==="setTitle"){d.setTextInChange(N,"title",P.title,"XFLD");}N.fileType="ctrl_variant_change";N.selector=J.getSelector(P.variantReference,P.appComponent);}var F=this.oFlexController.createBaseChange(N,P.appComponent);F.setContent(D);E.changeContent=F.getDefinition();V.updateChangesForVariantManagementInMap(E);this.oChangePersistence.addDirtyChange(F);return F;};x.prototype.deleteVariantChange=function(A,P,D){var E={vmReference:A,add:false,reference:this.sFlexReference,changeContent:undefined};this.setVariantProperties(A,P,true);E.changeContent=D.getDefinition();V.updateChangesForVariantManagementInMap(E);this.oChangePersistence.deleteChange(D);};x.prototype.setVariantProperties=function(A,P,D){var E=-1;var F;var G=this.getData();if(P.variantReference){E=this.getVariantManagementReference(P.variantReference).variantIndex;F=G[A].variants[E];}var H={};switch(P.changeType){case"setTitle":H.title=P.title;F.title=P.title;F.originalTitle=F.title;break;case"setFavorite":H.favorite=P.favorite;F.favorite=P.favorite;F.originalFavorite=F.favorite;break;case"setExecuteOnSelect":H.executeOnSelect=P.executeOnSelect;if(F){F.executeOnSelect=P.executeOnSelect;F.originalExecuteOnSelect=F.executeOnSelect;}break;case"setVisible":H.visible=P.visible;H.createdByReset=false;F.visible=P.visible;F.originalVisible=F.visible;break;case"setContexts":H.contexts=P.contexts;F.contexts=P.contexts;F.originalContexts=P.contexts;break;case"setDefault":H.defaultVariant=P.defaultVariant;G[A].defaultVariant=P.defaultVariant;G[A].originalDefaultVariant=G[A].defaultVariant;var I=U.getStoredHashParams({model:this});if(I){if(G[A].defaultVariant!==G[A].currentVariant&&I.indexOf(G[A].currentVariant)===-1){U.update({parameters:I.concat(G[A].currentVariant),updateURL:!this._bDesignTimeMode,updateHashEntry:true,model:this});}else if(G[A].defaultVariant===G[A].currentVariant&&I.indexOf(G[A].currentVariant)>-1){I.splice(I.indexOf(G[A].currentVariant),1);U.update({parameters:I,updateURL:!this._bDesignTimeMode,updateHashEntry:true,model:this});}}if(D&&G[A].currentVariant!==P.defaultVariant){this.updateCurrentVariant({variantManagementReference:A,newVariantReference:P.defaultVariant,appComponent:P.appComponent});}break;default:break;}var K=V.getContent(this.sFlexReference);if(E>-1){var M=V.setVariantData({variantData:H,vmReference:A,previousIndex:E,reference:this.sFlexReference});G[A].variants.splice(E,1);G[A].variants.splice(M,0,F);}else if(K[A]){K[A].defaultVariant=P.defaultVariant;}this.setData(G);this.checkUpdate(true);return H;};x.prototype._ensureStandardVariantExists=function(A){var D=this.getData();var E=D[A]||{};var F=_(E,["initPromise"]);if(!D[A]||b(F)){D[A]=m(E,{currentVariant:A,originalCurrentVariant:A,defaultVariant:A,originalDefaultVariant:A,variants:[{key:A,title:this._oResourceBundle.getText("STANDARD_VARIANT_TITLE"),originalTitle:this._oResourceBundle.getText("STANDARD_VARIANT_ORIGINAL_TITLE"),favorite:true,originalFavorite:true,executeOnSelect:false,originalExecuteOnSelect:false,visible:true,originalVisible:true,contexts:{},originalContexts:{},author:c.DEFAULT_AUTHOR}]});this.setData(D);var G={};G[A]={defaultVariant:A,variantManagementChanges:{},variants:[{content:{fileName:A,fileType:"ctrl_variant",variantManagementReference:A,variantReference:"",support:{user:c.DEFAULT_AUTHOR},content:{title:this._oResourceBundle.getText("STANDARD_VARIANT_TITLE"),favorite:true,visible:true,executeOnSelect:false},contexts:{}},controlChanges:[],variantChanges:{}}]};try{V.addFakeStandardVariant(this.sFlexReference,this.oAppComponent.getId(),G);}catch(H){L.error("Variants Map was not found: "+H.message);}}};x.prototype.setModelPropertiesForControl=function(A,D,E){this.oData[A].modified=false;this.oData[A].showFavorites=true;var F=this._bDesignTimeMode;if(F!==D){this._bDesignTimeMode=D;if(D){U.clearAllVariantURLParameters({model:this});}else if(F){U.update({parameters:U.getStoredHashParams({model:this}),updateURL:true,updateHashEntry:false,model:this});}}if(!(typeof this.fnManageClick==="function"&&typeof this.fnManageClickRta==="function")){this._initializeManageVariantsEvents();}E.detachManage(this.fnManageClick,this);if(D&&this.oData[A]._isEditable){this.oData[A].variantsEditable=false;this.oData[A].variants.forEach(function(G){G.rename=true;G.change=true;G.sharing=this.sharing.PUBLIC;G.remove=v(G,A,D);}.bind(this));}else if(this.oData[A]._isEditable){E.attachManage({variantManagementReference:A},this.fnManageClick,this);this.oData[A].variantsEditable=true;this.oData[A].variants.forEach(function(G){G.remove=v(G,A,D);switch(G.layer){case f.USER:G.rename=true;G.change=true;G.sharing=this.sharing.PRIVATE;u(G);break;case f.PUBLIC:var H=this._oUserInfoService&&this._oUserInfoService.getUser();var I=!H||H.getId().toUpperCase()===G.author.toUpperCase()||j.getInstanceOrUndef().isKeyUser();G.remove=I;G.rename=I;G.change=I;G.sharing=this.sharing.PUBLIC;break;default:G.rename=false;G.change=false;G.sharing=this.sharing.PUBLIC;}}.bind(this));}else{this.oData[A].variantsEditable=false;this.oData[A].variants.forEach(function(G){G.remove=false;G.rename=false;G.change=false;});}};x.prototype._initializeManageVariantsEvents=function(){this.fnManageClickRta=function(E,D){var A=this.collectModelChanges(D.variantManagementReference,D.layer);D.resolve(A);};this.fnManageClick=function(E,D){if(!this.oFlexController||!V.getContent(this.sFlexReference)){return;}var A=this.collectModelChanges(D.variantManagementReference,f.USER);var F=[];A.forEach(function(G){G.appComponent=this.oAppComponent;F.push(this.addVariantChange(D.variantManagementReference,G));}.bind(this));this.oChangePersistence.saveDirtyChanges(this.oAppComponent,false,F);};};function z(F,A,D,E){if(!this._bDesignTimeMode){return F.saveSequenceOfDirtyChanges(A,E).then(function(G){if(G){var H=G.response[0];this.oData[D].variants.forEach(function(I){if(I.key===H.fileName){I.author=H.support.user;}});}}.bind(this));}return Promise.resolve();}x.prototype._handleSaveEvent=function(E){if(!this._bDesignTimeMode){var A=E.getSource();var P=E.getParameters();return this._handleSave(A,P);}return Promise.resolve();};x.prototype._handleSave=function(A,P){var D=h.getAppComponentForControl(A);var E=this.getLocalId(A.getId(),D);var N;return q(function(F,D,P){var G=P.def;var H=P.execute;var I=this.getCurrentVariantReference(F);var K=V.getControlChangesForVariant({reference:this.sFlexReference,vmReference:F,vReference:I,changeInstance:true});if(P.overwrite){return this.oFlexController.saveSequenceOfDirtyChanges(this._getDirtyChangesFromVariantChanges(K),D);}var M=P.layer||(P.public?f.PUBLIC:f.USER);var Q=P.newVariantReference||h.createDefaultFileName();var T={variantManagementReference:F,appComponent:D,layer:M,title:P.name,contexts:P.contexts,sourceVariantReference:I,newVariantReference:Q,generator:P.generator};return this.copyVariant(T).then(function(W){if(G){var X={changeType:"setDefault",defaultVariant:Q,originalDefaultVariant:this.oData[F].defaultVariant,appComponent:D,layer:M,variantManagementReference:F};var Y=this.addVariantChange(F,X);W.push(Y);}if(H){var Z={changeType:"setExecuteOnSelect",executeOnSelect:true,variantReference:Q,appComponent:D,layer:M,variantManagementReference:F};var $=this.addVariantChange(F,Z);W.push($);}N=W;return o({changes:K,vmReference:F,vReference:I,model:this}).then(z.bind(this,this.oFlexController,W,F,D));}.bind(this));}.bind(this,E,D,P),this,E).then(function(){this.oData[E].modified=false;this.checkUpdate(true);return N;}.bind(this));};x.prototype.getLocalId=function(I,A){return J.getSelector(I,A).id;};x.prototype.getVariantManagementReferenceForControl=function(A){var D=A.getId();var E=h.getAppComponentForControl(A);return(E&&E.getLocalId(D))||D;};x.prototype.switchToDefaultForVariantManagement=function(A){if(this.oData[A].currentVariant!==this.oData[A].defaultVariant){B.show(200);this.updateCurrentVariant({variantManagementReference:A,newVariantReference:this.oData[A].defaultVariant}).then(function(){B.hide();});}};x.prototype.switchToDefaultForVariant=function(A){Object.keys(this.oData).forEach(function(D){if(!A||this.oData[D].currentVariant===A){this.switchToDefaultForVariantManagement(D);}}.bind(this));};x.prototype.registerToModel=function(A){var D=this.getVariantManagementReferenceForControl(A);this._ensureStandardVariantExists(D);this.oData[D]._isEditable=A.getEditable();this.oData[D].showExecuteOnSelection=false;A.attachEvent("select",{vmReference:D,model:this},n);A.attachSave(this._handleSaveEvent,this);this.setModelPropertiesForControl(D,false,A);var E=A.getUpdateVariantInURL();this.oData[D].updateVariantInURL=E;U.registerControl({vmReference:D,updateURL:!!E,model:this});U.handleModelContextChange({model:this,vmControl:A});if(this.oData[D].initPromise){this.oData[D].initPromise.resolveFunction();delete this.oData[D].initPromise;}this.oData[D].init=true;};x.prototype.waitForVMControlInit=function(A){if(!this.oData[A]){this.oData[A]={};}else if(this.oData[A].init){return Promise.resolve();}this.oData[A].initPromise={};this.oData[A].initPromise.promise=new Promise(function(D){this.oData[A].initPromise.resolveFunction=D;}.bind(this));return this.oData[A].initPromise.promise;};x.prototype._getDirtyChangesFromVariantChanges=function(A){var D=A.map(function(E){return E.getDefinition().fileName;});return this.oChangePersistence.getDirtyChanges().filter(function(E){return i(D,E.getId())&&!E.assignedToVariant;});};x.prototype.checkDirtyStateForControlModels=function(A){A.forEach(function(D){var E=this.oData[D];var F=this.getCurrentVariantReference(D);var G=V.getControlChangesForVariant({reference:this.sFlexReference,vmReference:D,vReference:F,changeInstance:true});var H=this._getDirtyChangesFromVariantChanges(G);E.modified=H.length>0;}.bind(this));this.checkUpdate(true);};x.prototype.getCurrentControlVariantIds=function(){return Object.keys(this.oData||{}).reduce(function(A,D){return A.concat([this.oData[D].currentVariant]);}.bind(this),[]);};x.prototype.getVariantManagementControlIds=function(){var A;return Object.keys(this.oData||{}).reduce(function(D,E){if(this.oAppComponent.byId(E)){A=this.oAppComponent.createId(E);}else{A=E;}D.push(A);return D;}.bind(this),[]);};x.prototype.resetMap=function(A){var D=Object.keys(this.oData);D.forEach(function(E){var P={vmReference:E,currentVReference:this.oData[E].currentVariant||this.oData[E].defaultVariant,newVReference:true,appComponent:this.oAppComponent,flexController:this.oFlexController,modifier:J,reference:this.sFlexReference};return q(r.bind(this,P),this,E);}.bind(this));return this._oVariantSwitchPromise.then(function(){V.clearFakedStandardVariants(this.sFlexReference,this.oAppComponent.getId());V.resetContent(this.sFlexReference,this.oAppComponent.getId());if(!A){U.initialize({model:this});U.update({parameters:[],updateHashEntry:true,model:this});}}.bind(this));};x.prototype.getUShellService=function(A){return h.getUshellContainer()&&l[A];};return x;});
