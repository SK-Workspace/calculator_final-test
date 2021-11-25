/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/FlexControllerFactory","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Element","sap/ui/base/ManagedObject","sap/base/util/includes","sap/ui/fl/variants/VariantManagement","sap/ui/fl/apply/_internal/controlVariants/URLHandler","sap/ui/core/Component","sap/base/Log","sap/ui/thirdparty/jquery"],function(L,U,C,F,J,E,M,i,V,a,b,c,q){"use strict";var d={_determineParameters:function(o,I,u){var A=U.getAppComponentForControl(o);var f=F.createForControl(A);var r=A.getRootControl();var p={rootControl:r,flexController:f};if(!I){var v;var e;var g;p.variantModel=A.getModel(U.VARIANT_MODEL_NAME);p.variantManagement={};if(!u){v=q.makeArray(p.rootControl.$().find(".sapUiFlVarMngmt"));}if(u||v.length===0){v=q.makeArray(q(sap.ui.getCore().getStaticAreaRef()).find(".sapUiFlVarMngmt"));}v.map(function(h){e=sap.ui.getCore().byId(h.id);if(e.getMetadata().getName()==="sap.ui.fl.variants.VariantManagement"){g=e.getFor();g.forEach(function(s){p.variantManagement[s]=p.variantModel.getLocalId(h.id,A);});}});}return p;},_getVariantManagement:function(o,p){p=p||this._determineParameters(o);var f=function(o){if(!p.variantManagement[o.getId()]&&o.getParent()&&o.getId()!==p.rootControl.getId()){return f(o.getParent());}else if(!o.getParent()||o.getId()===p.rootControl.getId()){return p.variantManagement[o.getId()]||"";}return p.variantManagement[o.getId()];};return f(o);},clearVariantParameterInURL:function(o){var u;var A=U.getAppComponentForControl(o);var v=A instanceof b?A.getModel(U.VARIANT_MODEL_NAME):undefined;if(!v){c.warning("Variant model could not be found on the provided control");return;}if(o instanceof V){var s=v.getLocalId(o.getId(),A);var m=a.removeURLParameterForVariantManagement({model:v,vmReference:s});u=m.parameters;}a.update({parameters:u||[],updateURL:true,updateHashEntry:!!v,model:v||{},silent:!v});},activateVariant:function(e,v){return Promise.resolve().then(function(){var o;if(typeof e==='string'||e instanceof String){o=b.get(e);if(!(o instanceof b)){o=sap.ui.getCore().byId(e);if(!(o instanceof E)){throw new Error("No valid component or control found for the provided ID");}}}else if(e instanceof b||e instanceof E){o=e;}var A=U.getAppComponentForControl(o);if(!A){throw new Error("A valid variant management control or component (instance or ID) should be passed as parameter");}var f=A.getModel(U.VARIANT_MODEL_NAME);if(!f){throw new Error("No variant management model found for the passed control or application component");}var s=f.getVariantManagementReference(v).variantManagementReference;if(!s){throw new Error("A valid control or component, and a valid variant/ID combination are required");}return f.waitForVMControlInit(s).then(function(){return f.updateCurrentVariant({variantManagementReference:s,newVariantReference:v,appComponent:A});});})["catch"](function(o){c.error(o);return Promise.reject(o);});},_checkChangeSpecificData:function(o,l){if(!o.changeSpecificData){return Promise.reject(new Error("No changeSpecificData available"));}if(!o.changeSpecificData.changeType){return Promise.reject(new Error("No valid changeType"));}if(!(o.selectorControl instanceof E)){return Promise.reject(new Error("No valid selectorControl"));}var s=o.selectorControl.getMetadata().getName();return C.getChangeHandler(o.changeSpecificData.changeType,s,o.selectorControl,J,l);},addPersonalizationChanges:function(p){var A=[];var s=[];var l=L.USER;var P=[];function f(o,m){return d._checkChangeSpecificData(o,l).then(function(){p.params=d._determineParameters(o.selectorControl,p.ignoreVariantManagement,p.useStaticArea);if(!p.ignoreVariantManagement){if(!o.changeSpecificData.variantReference){var v=d._getVariantManagement(o.selectorControl,p.params);if(v){var g=p.params.variantModel.oData[v].currentVariant;o.changeSpecificData.variantReference=g;}}}else{delete o.changeSpecificData.variantReference;}return p.params.flexController.addChange(Object.assign(m,o.changeSpecificData),o.selectorControl);}).then(function(g){o.changeInstance=g;A.push(o);}).catch(function(g){return Promise.reject({change:o,message:g.message});});}function e(o){return p.params.flexController.applyChange(o.changeInstance,o.selectorControl).then(function(){s.push(o.changeInstance);}).catch(function(g){return Promise.reject({change:o,message:g.message});});}p.controlChanges.forEach(function(o){var m={};Object.assign(m,{developerMode:false,layer:l});P.push(f.bind(undefined,o,m));});return U.execPromiseQueueSequentially(P).then(function(){P=[];A.forEach(function(o){P.push(e.bind(undefined,o));});return U.execPromiseQueueSequentially(P);}).then(function(){return s;});},isPersonalized:function(e,f){if(!e||e.length===0){return this._reject("At least one control ID has to be provided as a parameter");}var A=e[0].appComponent||U.getAppComponentForControl(e[0]);if(!A){return this._reject("App Component could not be determined");}var I=e.map(function(g){return g.id||g.getId();});var o=F.createForControl(A);return o.getComponentChanges({currentLayer:L.USER,includeCtrlVariants:true}).then(function(g){return g.filter(this._filterBySelectors.bind(this,A,I)).filter(this._filterByChangeType.bind(this,f)).some(this._ifValidFileType);}.bind(this));},_reject:function(m){c.error(m);return Promise.reject(m);},_filterBySelectors:function(A,I,o){var s=o.getSelector();var e=J.getControlIdBySelector(s,A);return i(I,e);},_filterByChangeType:function(e,o){return(Array.isArray(e)&&e.length>0)?i(e,o.getChangeType()):true;},_ifValidFileType:function(o){return o.getFileType()==="change";},resetChanges:function(e,f){if(!e||e.length===0){return this._reject("At least one control ID has to be provided as a parameter");}var A=e[0].appComponent||U.getAppComponentForControl(e[0]);if(!A){return this._reject("App Component could not be determined");}var s=e.map(function(v){var g=v.id||v.getId();var l=A.getLocalId(g);return l||g;});var o=F.createForControl(A);return o.resetChanges(L.USER,undefined,A,s,f);},saveChanges:function(e,m){if(!(m instanceof M)){var s="A valid sap.ui.base.ManagedObject instance is required as a parameter";c.error(s);return Promise.reject(s);}var p=d._determineParameters(m);var A=U.getAppComponentForControl(m);var v=Object.keys(p.variantManagement).reduce(function(r,f){return r.concat([p.variantManagement[f]]);},[]);return p.flexController.saveSequenceOfDirtyChanges(e,A).then(function(r){p.variantModel.checkDirtyStateForControlModels(v);return r;});},hasVariantManagement:function(o){try{return!!this._getVariantManagement(o);}catch(e){c.error(e.message);return false;}}};return d;},true);
