/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/Change","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/write/_internal/Versions","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/changes/Reverter","sap/ui/fl/apply/_internal/controlVariants/URLHandler","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/util/reflection/XmlTreeModifier","sap/ui/core/Component","sap/base/Log"],function(C,U,L,a,b,V,A,R,c,J,X,d,e){"use strict";function r(o,h){return Promise.resolve().then(function(){if(h.length!==0){h.reverse();return R.revertMultipleChanges(h,{appComponent:o,modifier:J,flexController:this});}}.bind(this)).then(function(){if(o){var m=o.getModel(U.VARIANT_MODEL_NAME);if(m){h.forEach(function(i){var v=i.getVariantReference();if(v){m.removeChange(i);}});c.update({parameters:[],updateURL:true,updateHashEntry:true,model:m});}}return h;});}var F=function(s){this._oChangePersistence=undefined;this._sComponentName=s||"";if(this._sComponentName){this._createChangePersistence();}};F.prototype.getComponentName=function(){return this._sComponentName;};F.prototype.setVariantSwitchPromise=function(p){this._oVariantSwitchPromise=p;};F.prototype.waitForVariantSwitch=function(){if(!this._oVariantSwitchPromise){this._oVariantSwitchPromise=Promise.resolve();}return this._oVariantSwitchPromise;};F.prototype.createBaseChange=function(o,h){var i;var j;if(!h){throw new Error("No application component found. To offer flexibility a valid relation to its owning component must be present.");}o.reference=this.getComponentName();o.packageName="$TMP";i=a.createInitialFileContent(o);j=new a(i);if(o.variantReference){j.setVariantReference(o.variantReference);}return j;};F.prototype._createChange=function(o,h,i){var s=i&&(i.controlType||U.getControlType(i));var j=this.createBaseChange(o,h);return this._getChangeHandler(j,s,i,J).then(function(k){if(k){return k.completeChangeContent(j,o,{modifier:J,appComponent:h,view:U.getViewForControl(i)});}throw new Error("Change handler could not be retrieved for change "+JSON.stringify(o)+".");}).then(function(){return j;}).catch(function(E){return Promise.reject(E);});};F.prototype.createChangeWithExtensionPointSelector=function(o,E){return Promise.resolve().then(function(){if(!E){throw new Error("A flexibility change on extension point cannot be created without a valid extension point reference.");}var v=E.view;var h=U.getAppComponentForControl(v);o.selector={name:E.name,viewSelector:J.getSelector(v.getId(),h)};return h;}).then(function(h){return this._createChange(o,h);}.bind(this));};F.prototype.createChangeWithControlSelector=function(o,h){var i;return new U.FakePromise().then(function(){if(!h){throw new Error("A flexibility change cannot be created without a targeted control.");}var s=h.id||h.getId();if(!o.selector){o.selector={};}i=h.appComponent||U.getAppComponentForControl(h);if(!i){throw new Error("No application component found. To offer flexibility, the control with the ID '"+s+"' has to have a valid relation to its owning application component.");}Object.assign(o.selector,J.getSelector(s,i));return i;}).then(function(i){return this._createChange(o,i,h);}.bind(this));};F.prototype.addChange=function(o,h){return this.createChangeWithControlSelector(o,h).then(function(i){var j=U.getAppComponentForControl(h);i._ignoreOnce=true;this.addPreparedChange(i,j);i.setQueuedForApply();return i;}.bind(this));};F.prototype.addPreparedChange=function(o,h){if(o.getVariantReference()){var m=h.getModel(U.VARIANT_MODEL_NAME);m.addChange(o);}this._oChangePersistence.addChange(o,h);return o;};F.prototype.deleteChange=function(o,h){this._oChangePersistence.deleteChange(o);if(o.getVariantReference()){h.getModel(U.VARIANT_MODEL_NAME).removeChange(o);}};F.prototype.applyChange=function(o,h){var p={modifier:J,appComponent:U.getAppComponentForControl(h),view:U.getViewForControl(h)};return A.applyChangeOnControl(o,h,p).then(function(i){if(!i.success){var E=i.error||new Error("The change could not be applied.");this._oChangePersistence.deleteChange(o,true);throw E;}return o;}.bind(this));};function f(o,D,m,h,j){var k=g(o,h);if(!k){return[];}j.push(o);var s=o.getId();var l=D[s]&&D[s].dependencies||[];for(var i=0,n=l.length;i<n;i++){var p=U.getChangeFromChangesMap(m,l[i]);k=f(p,D,m,h,j);if(k.length===0){j=[];break;}delete D[s];}return j;}function g(o,h){var s=o.getDependentControlSelectorList();s.push(o.getSelector());return!s.some(function(S){return!J.bySelector(S,h);});}F.prototype.waitForChangesToBeApplied=function(s){var p=s.map(function(S){return this._waitForChangesToBeApplied(S);}.bind(this));return Promise.all(p).then(function(){return undefined;});};F.prototype._waitForChangesToBeApplied=function(p){function h(q){return!q.isCurrentProcessFinished()&&(p.changeTypes.length===0||p.changeTypes.includes(q.getChangeType()));}p.changeTypes=p.changeTypes||[];var o=p.selector.id&&sap.ui.getCore().byId(p.selector.id)||p.selector;var m=this._oChangePersistence.getChangesMapForComponent();var P=[];var D=Object.assign({},m.mDependencies);var i=m.mChanges;var j=i[o.getId()]||[];var n=j.filter(h);var k=p.selector.appComponent||U.getAppComponentForControl(o);var l=[];n.forEach(function(q){var s=f(q,D,m.mChanges,k,[]);s.forEach(function(t){if(l.indexOf(t)===-1){l.push(t);}});});l.forEach(function(q){P=P.concat(q.addChangeProcessingPromises());},this);P.push(this.waitForVariantSwitch());return Promise.all(P);};F.prototype.saveAll=function(o,s,D){var n=D?V.getVersionsModel({reference:U.normalizeReference(this._sComponentName),layer:L.CUSTOMER}).getProperty("/persistedVersion"):undefined;return this._oChangePersistence.saveDirtyChanges(o,s,undefined,n).then(function(h){if(D&&h&&h.response){var v=h.response;if(Array.isArray(v)){v=v[0];}V.onAllChangesSaved({reference:v.reference,layer:v.layer});}return h;});};F.prototype.processXmlView=function(v,p){var o=d.get(p.componentId);var h=U.getAppComponentForControl(o);p.appComponent=h;p.modifier=X;p.view=v;return this._oChangePersistence.getChangesForView(p).then(A.applyAllChangesForXMLView.bind(A,p)).catch(this._handlePromiseChainError.bind(this,p.view));};F.prototype._handlePromiseChainError=function(v,E){e.error("Error processing view "+E+".");return v;};F.prototype._getChangeHandler=function(o,s,h,m){var i=o.getChangeType();var l=o.getLayer();return C.getChangeHandler(i,s,h,m,l);};F.prototype.getComponentChanges=function(p,i){return this._oChangePersistence.getChangesForComponent(p,i);};F.prototype.checkForOpenDependenciesForControl=function(s,o){return this._oChangePersistence.checkForOpenDependenciesForControl(s,o);};F.prototype._createChangePersistence=function(){this._oChangePersistence=b.getChangePersistenceForComponent(this.getComponentName());return this._oChangePersistence;};F.prototype.resetChanges=function(l,G,o,s,h){return this._oChangePersistence.resetChanges(l,G,s,h).then(r.bind(this,o));};F.prototype.removeDirtyChanges=function(l,o,h,G,i){return this._oChangePersistence.removeDirtyChanges(l,o,h,G,i).then(r.bind(this,o));};F.prototype.applyVariantChanges=function(h,o){var i;return h.reduce(function(p,j){return p.then(function(){var P={modifier:J,appComponent:o};this._oChangePersistence._addRunTimeCreatedChangeAndUpdateDependencies(o,j);i=P.modifier.bySelector(j.getSelector(),o);if(i){return A.applyChangeOnControl(j,i,P);}e.error("A flexibility change tries to change a nonexistent control.");}.bind(this));}.bind(this),new U.FakePromise());};F.prototype.saveSequenceOfDirtyChanges=function(D,o){return this._oChangePersistence.saveDirtyChanges(o,false,D);};F.prototype.getResetAndPublishInfo=function(p){p.reference=this._sComponentName;return this._oChangePersistence.getResetAndPublishInfo(p);};return F;},true);