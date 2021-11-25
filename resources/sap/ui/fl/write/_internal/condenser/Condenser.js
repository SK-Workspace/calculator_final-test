/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/isPlainObject","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/write/_internal/condenser/classifications/LastOneWins","sap/ui/fl/write/_internal/condenser/classifications/Reverse","sap/ui/fl/write/_internal/condenser/UIReconstruction","sap/ui/fl/write/_internal/condenser/Utils","sap/ui/fl/Change","sap/ui/fl/Utils","sap/ui/performance/Measurement"],function(e,i,L,J,C,c,d,R,U,f,g,F,M){"use strict";var h={};var j="unclassified";var N={lastOneWins:d,reverse:R};var P=["affectedControl","sourceContainer","targetContainer"];function k(S,a){var b=S[sap.ui.fl.condenser.Classification.Move];return a.classification===sap.ui.fl.condenser.Classification.Create&&b&&b[b.length-1].targetContainer===a.targetContainer;}function l(S,a){return a.classification===sap.ui.fl.condenser.Classification.Move&&S[sap.ui.fl.condenser.Classification.Destroy];}function m(a,b){return b.classification===sap.ui.fl.condenser.Classification.Create&&a[sap.ui.fl.condenser.Classification.Destroy];}function n(a,b,G,H){if(!l(a,G)&&!m(a,G)){var I=G.classification;if(!a[I]){G.change=H;H.condenserState="select";a[I]=[G];}else{H.condenserState="delete";}a[I][0].updateChange=H;}if(k(a,G)||m(a,G)){if(a[sap.ui.fl.condenser.Classification.Move]){a[sap.ui.fl.condenser.Classification.Move].forEach(function(G){G.change.condenserState="delete";});delete a[sap.ui.fl.condenser.Classification.Move];}if(a[sap.ui.fl.condenser.Classification.Destroy]){a[sap.ui.fl.condenser.Classification.Destroy].forEach(function(G){G.change.condenserState="delete";});delete a[sap.ui.fl.condenser.Classification.Destroy];}}return U.addChange(b,G);}function o(T,a,I,b,G){if(!T[b.type]){T[b.type]={};}var H=T[b.type];if(b.type===f.NOT_INDEX_RELEVANT){if(!H[b.classification]){H[b.classification]={};}var K=H[b.classification];N[b.classification].addToChangesMap(K,b.uniqueKey,G);return Promise.resolve();}I.push(G);return n(H,a,b,G);}function p(T,K,a){if(!T[K]){T[K]=[];}T[K].push(a);a.condenserState="select";}function q(a,b){var G=J.getControlIdBySelector(b.getSelector(),a);var H=C.byId(G);if(H){var I={modifier:J,appComponent:a,view:F.getViewForControl(H)};var K=c.getControlIfTemplateAffected(b,H,I);return Promise.resolve(c.getChangeHandler(b,K,I)).then(function(O){if(O&&typeof O.getCondenserInfo==="function"){return O.getCondenserInfo(b,I);}return undefined;}).then(function(O){if(O&&K.bTemplateAffected){r(O,b);}return O;}).catch(function(){return undefined;});}return Promise.resolve();}function r(a,b){var O=b.getOriginalSelector();var T=b.getSelector();P.forEach(function(G){if(a[G]&&a[G]===T){a[G]=O;}});}function s(a,b,G,H){var I=b!==undefined?b.affectedControl:J.getControlIdBySelector(G.getSelector(),H);if(!a[I]){a[I]={};}return a[I];}function t(a,b,G,I,H){return H.reduce(function(K,O){return K.then(u.bind(this,a,b,G,I,O));}.bind(this),Promise.resolve());}function u(a,b,G,I,H){return q(a,H).then(function(K){w(K,a);var T=s(b,K,H,a);if(K!==undefined){v(K);return o(T,G,I,K,H);}p(T,j,H);b[j]=true;return undefined;});}function v(a){if(N[a.classification]){a.type=f.NOT_INDEX_RELEVANT;}else{a.type=f.INDEX_RELEVANT;}}function w(a,b){P.forEach(function(G){if(a&&a[G]){a[G]=J.getControlIdBySelector(a[G],b);}});}function x(O,a){e(O,function(K,S){if(N[K]&&N[K].getChangesFromMap){N[K].getChangesFromMap(O,K).forEach(function(b){a.push(b);});}else if(i(S)){return x(S,a);}else if(Array.isArray(S)){S.forEach(function(b){if(b instanceof g){a.push(b);}else{a.push(b.change);}});}});return a;}function y(a){return x(a,[]);}function z(a,b){e(a,function(K,S){if(i(S)){z(S,b);}else if(Array.isArray(S)){S.forEach(function(O){if(!(O instanceof g)){b.push(O);}});}});return b;}function A(G,H){H.sort(function(a,b){return G.indexOf(a)-G.indexOf(b);});}function B(G,H){H.sort(function(a,b){return G.indexOf(a.change)-G.indexOf(b.change);});}function D(a,I){var b=a.map(function(G){return G.getId();});I.forEach(function(G){if(b.indexOf(G.getId())===-1){a.push(G);}});}function E(a,b){a.forEach(function(G){var H=G.updateChange;if(H&&H.getState()!==g.states.NEW){var I=G.change;if(H.getFileName()!==I.getFileName()){var K=I.getContent();H.setContent(K);I.condenserState="delete";b=b.map(function(O){if(O.getFileName()===I.getFileName()){return H;}return O;});}else{H.setState(g.states.DIRTY);}H.condenserState="update";}});return b;}h.condense=function(a,b){M.start("Condenser_overall","Condenser overall - CondenserClass",["sap.ui.fl","Condenser"]);var G={};var H={};var I=[];var K=[];var O=[];b.slice(0).reverse().forEach(function(Q){if(Q instanceof g&&Q.isApplyProcessFinished()){O.push(Q);}else{K.push(Q);}});M.start("Condenser_defineMaps","defining of maps - CondenserClass",["sap.ui.fl","Condenser"]);return t(a,G,H,I,O).then(function(){M.end("Condenser_defineMaps");var Q=G[j];if(!Q){U.compareAndUpdate(G,H);}var S=y(G);if(Q){I.forEach(function(Y){Y.condenserState="select";});D(S,I);}S=S.concat(K);A(b,S);if(!Q){M.start("Condenser_handleIndexRelatedChanges","handle index related changes - CondenserClass",["sap.ui.fl","Condenser"]);var T=true;var V=z(G,[]);B(b,V);try{M.start("Condenser_sort","sort index related changes - CondenserClass",["sap.ui.fl","Condenser"]);var W=U.sortIndexRelatedChanges(H,V);}catch(X){L.error("Error during Condensing: "+X.message,"No Condensing performed for index-relevant changes.");T=false;}M.end("Condenser_sort");if(T){U.swapChanges(W,S);S=E(V,S);}else{I.forEach(function(Y){Y.condenserState="select";});D(S,I);A(b,S);}M.end("Condenser_handleIndexRelatedChanges");}M.end("Condenser_overall");return S;});};return h;});
