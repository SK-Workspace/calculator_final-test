/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CountMode","./ODataContextBinding","./ODataListBinding","./ODataMetadata","./ODataPropertyBinding","./ODataTreeBinding","./ODataUtils","sap/base/assert","sap/base/Log","sap/base/security/encodeURL","sap/base/util/each","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/isPlainObject","sap/base/util/merge","sap/base/util/uid","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/model/FilterProcessor","sap/ui/model/Model","sap/ui/model/odata/ODataAnnotations","sap/ui/model/odata/ODataMetaModel","sap/ui/thirdparty/datajs","sap/ui/thirdparty/URI"],function(C,O,a,b,c,d,e,f,L,g,h,m,n,o,p,u,B,q,F,M,r,s,t,U){"use strict";var v=M.extend("sap.ui.model.odata.ODataModel",{constructor:function(S,j,i,P,H,T,w,l){M.apply(this,arguments);var k,R,x,A=null,y,z,D,E,G,I,J=this;if(typeof(S)==="object"){j=S;S=j.serviceUrl;}if(typeof j==="object"){i=j.user;P=j.password;H=j.headers;T=j.tokenHandling;l=j.loadMetadataAsync;w=j.withCredentials;x=j.maxDataServiceVersion;k=j.useBatch;R=j.refreshAfterChange;A=j.annotationURI;y=j.loadAnnotationsJoined;D=j.defaultCountMode;z=j.metadataNamespaces;E=j.serviceUrlParams;G=j.metadataUrlParams;I=j.skipMetadataAnnotationParsing;j=j.json;}this.oServiceData={};this.sDefaultBindingMode=B.OneWay;this.mSupportedBindingModes={"OneWay":true,"OneTime":true,"TwoWay":true};this.mUnsupportedFilterOperators={"Any":true,"All":true};this.bCountSupported=true;this.bJSON=j;this.bCache=true;this.aPendingRequestHandles=[];this.oRequestQueue={};this.aBatchOperations=[];this.oHandler;this.bTokenHandling=T!==false;this.bWithCredentials=w===true;this.bUseBatch=k===true;this.bRefreshAfterChange=R!==false;this.sMaxDataServiceVersion=x;this.bLoadMetadataAsync=!!l;this.bLoadAnnotationsJoined=y===undefined?true:y;this.sAnnotationURI=A;this.sDefaultCountMode=D||C.Both;this.oMetadataLoadEvent=null;this.oMetadataFailedEvent=null;this.bSkipMetadataAnnotationParsing=I;this.oHeaders={};this.setHeaders(H);this.oData={};this.oMetadata=null;this.oAnnotations=null;this.aUrlParams=[];if(S.indexOf("?")==-1){this.sServiceUrl=S;}else{var K=S.split("?");this.sServiceUrl=K[0];if(K[1]){this.aUrlParams.push(K[1]);}}if(sap.ui.getCore().getConfiguration().getStatistics()){this.aUrlParams.push("sap-statistics=true");}this.sServiceUrl=this.sServiceUrl.replace(/\/$/,"");var N=this._createRequestUrl("$metadata",undefined,G);if(!v.mServiceData[N]){v.mServiceData[N]={};}this.oServiceData=v.mServiceData[N];if(this.bTokenHandling&&this.oServiceData.securityToken){this.oHeaders["x-csrf-token"]=this.oServiceData.securityToken;}this.sUser=i;this.sPassword=P;this.oHeaders["Accept-Language"]=sap.ui.getCore().getConfiguration().getLanguageTag();if(!this.oServiceData.oMetadata){this.oServiceData.oMetadata=new b(N,{async:this.bLoadMetadataAsync,user:this.sUser,password:this.sPassword,headers:this.mCustomHeaders,namespaces:z,withCredentials:this.bWithCredentials});}this.oMetadata=this.oServiceData.oMetadata;this.pAnnotationsLoaded=this.oMetadata.loaded();if(this.sAnnotationURI||!this.bSkipMetadataAnnotationParsing){var Q=this._getAnnotationParser();if(!this.bSkipMetadataAnnotationParsing){if(!this.bLoadMetadataAsync){this.addAnnotationXML(this.oMetadata.sMetadataBody,!!this.sAnnotationURI);}else{this.pAnnotationsLoaded=this.oMetadata.loaded().then(function(V,W){if(this.bDestroyed){return Promise.reject();}return this.addAnnotationXML(W["metadataString"],V);}.bind(this,!!this.sAnnotationURI));}}if(this.sAnnotationURI){if(this.bLoadMetadataAsync){this.pAnnotationsLoaded=this.pAnnotationsLoaded.then(Q.addUrl.bind(Q,this.sAnnotationURI));}else{this.pAnnotationsLoaded=Promise.all([this.pAnnotationsLoaded,Q.addUrl(this.sAnnotationURI)]);}}}if(E){this.aUrlParams=this.aUrlParams.concat(e._createUrlParamsArray(E));}this.onMetadataLoaded=function(V){J._initializeMetadata();J.initialize();};this.onMetadataFailed=function(V){J.fireMetadataFailed(V.getParameters());};if(!this.oMetadata.isLoaded()){this.oMetadata.attachLoaded(this.onMetadataLoaded);this.oMetadata.attachFailed(this.onMetadataFailed);}if(this.oMetadata.isFailed()){this.refreshMetadata();}if(this.oMetadata.isLoaded()){this._initializeMetadata(true);}if(this.bJSON){if(this.sMaxDataServiceVersion==="3.0"){this.oHeaders["Accept"]="application/json;odata=fullmetadata";}else{this.oHeaders["Accept"]="application/json";}this.oHandler=t.jsonHandler;}else{this.oHeaders["Accept"]="application/atom+xml,application/atomsvc+xml,application/xml";this.oHandler=t.atomHandler;}this.oHeaders["MaxDataServiceVersion"]="2.0";if(this.sMaxDataServiceVersion){this.oHeaders["MaxDataServiceVersion"]=this.sMaxDataServiceVersion;}this.oHeaders["DataServiceVersion"]="2.0";},metadata:{publicMethods:["create","remove","update","submitChanges","getServiceMetadata","read","hasPendingChanges","refresh","refreshMetadata","resetChanges","isCountSupported","setCountSupported","setDefaultCountMode","getDefaultCountMode","forceNoCache","setProperty","getSecurityToken","refreshSecurityToken","setHeaders","getHeaders","setUseBatch"]}});v.M_EVENTS={RejectChange:"rejectChange",MetadataLoaded:"metadataLoaded",MetadataFailed:"metadataFailed",AnnotationsLoaded:"annotationsLoaded",AnnotationsFailed:"annotationsFailed"};v.mServiceData={};v.prototype.fireRejectChange=function(P){this.fireEvent("rejectChange",P);return this;};v.prototype.attachRejectChange=function(D,i,l){this.attachEvent("rejectChange",D,i,l);return this;};v.prototype.detachRejectChange=function(i,l){this.detachEvent("rejectChange",i,l);return this;};v.prototype._initializeMetadata=function(D){var i=this;this.bUseBatch=this.bUseBatch||this.oMetadata.getUseBatch();var j=function(k){if(k){i.metadataLoadEvent=setTimeout(j.bind(i),0);}else{if(i.oMetadata){i.fireMetadataLoaded({metadata:i.oMetadata});L.debug("ODataModel fired metadataloaded");}}};if(this.sAnnotationURI&&this.bLoadAnnotationsJoined){if(this.oAnnotations&&(this.oAnnotations.bInitialized||this.oAnnotations.isFailed())){j(!this.bLoadMetadataAsync);}else{this.oAnnotations.attachEventOnce("loaded",function(){j(true);});}}else{j(D);}};v.prototype.fireAnnotationsLoaded=function(P){if(!this.bLoadMetadataAsync){setTimeout(this.fireEvent.bind(this,"annotationsLoaded",P),0);}else{this.fireEvent("annotationsLoaded",P);}return this;};v.prototype.attachAnnotationsLoaded=function(D,i,l){this.attachEvent("annotationsLoaded",D,i,l);return this;};v.prototype.detachAnnotationsLoaded=function(i,l){this.detachEvent("annotationsLoaded",i,l);return this;};v.prototype.fireAnnotationsFailed=function(P){if(!this.bLoadMetadataAsync){setTimeout(this.fireEvent.bind(this,"annotationsFailed",P),0);}else{this.fireEvent("annotationsFailed",P);}L.debug("ODataModel fired annotationsFailed");return this;};v.prototype.attachAnnotationsFailed=function(D,i,l){this.attachEvent("annotationsFailed",D,i,l);return this;};v.prototype.detachAnnotationsFailed=function(i,l){this.detachEvent("annotationsFailed",i,l);return this;};v.prototype.fireMetadataLoaded=function(P){this.fireEvent("metadataLoaded",P);return this;};v.prototype.attachMetadataLoaded=function(D,i,l){this.attachEvent("metadataLoaded",D,i,l);return this;};v.prototype.detachMetadataLoaded=function(i,l){this.detachEvent("metadataLoaded",i,l);return this;};v.prototype.fireMetadataFailed=function(P){this.fireEvent("metadataFailed",P);return this;};v.prototype.attachMetadataFailed=function(D,i,l){this.attachEvent("metadataFailed",D,i,l);return this;};v.prototype.detachMetadataFailed=function(i,l){this.detachEvent("metadataFailed",i,l);return this;};v.prototype.refreshMetadata=function(){if(this.oMetadata&&this.oMetadata.refresh){this.oMetadata.refresh();}};v.prototype._createRequestUrl=function(P,i,j,k,l){var w,R,x,y="";if(P&&P.indexOf('?')!=-1){x=P.substr(P.indexOf('?')+1);P=P.substr(0,P.indexOf('?'));}R=this._normalizePath(P,i);if(!k){y=this.sServiceUrl+R;}else{y=R.substr(R.indexOf('/')+1);}w=e._createUrlParamsArray(j);if(this.aUrlParams){w=w.concat(this.aUrlParams);}if(x){w.push(x);}if(w.length>0){y+="?"+w.join("&");}if(l===undefined){l=true;}if(l===false){var z=Date.now();var A=y.replace(/([?&])_=[^&]*/,"$1_="+z);y=A+((A===y)?(/\?/.test(y)?"&":"?")+"_="+z:"");}return y;};v.prototype._loadData=function(P,i,S,E,j,H,k){var R,l,w=this;function _(D,G){var I=D,J={};if(G.statusCode==204){if(S){S(null);}if(k){k(null);}w.fireRequestCompleted({url:l.requestUri,type:"GET",async:l.async,info:"Accept headers:"+w.oHeaders["Accept"],infoObject:{acceptHeaders:w.oHeaders["Accept"]},success:true});return;}if(!I){L.fatal("The following problem occurred: No data was retrieved by service: "+G.requestUri);w.fireRequestCompleted({url:l.requestUri,type:"GET",async:l.async,info:"Accept headers:"+w.oHeaders["Accept"],infoObject:{acceptHeaders:w.oHeaders["Accept"]},success:false});return false;}if(w.bUseBatch){var K=w._getBatchErrors(D);if(K.length>0){x(K[0]);return false;}if(I.__batchResponses&&I.__batchResponses.length>0){I=I.__batchResponses[0].data;}else{L.fatal("The following problem occurred: No data was retrieved by service: "+G.requestUri);}}z=z.concat(I.results);if(I.__next){var N=new U(I.__next);l.requestUri=N.absoluteTo(G.requestUri).toString();y(l);}else{if(I.results){var V,Q;for(Q in z){V=z[Q];if(z===V){continue;}I.results[Q]=V;}}if(I.results&&!Array.isArray(I.results)){I=I.results;}w._importData(I,J);if(w.sChangeKey&&J){var T=w.sChangeKey.substr(w.sChangeKey.lastIndexOf('/')+1);if(J[T]){delete w.oRequestQueue[w.sChangeKey];w.sChangeKey=null;}}if(S){S(I);}w.checkUpdate(false,false,J);if(k){k(I);}w.fireRequestCompleted({url:l.requestUri,type:"GET",async:l.async,info:"Accept headers:"+w.oHeaders["Accept"],infoObject:{acceptHeaders:w.oHeaders["Accept"]},success:true});}}function x(D){if(w.bTokenHandling&&D.response){var T=w._getHeader("x-csrf-token",D.response.headers);if(!l.bTokenReset&&D.response.statusCode=='403'&&T&&T.toLowerCase()=="required"){w.resetSecurityToken();l.bTokenReset=true;y();return;}}var G=w._handleError(D);if(E){E(D,R&&R.bAborted);}w.fireRequestCompleted({url:l.requestUri,type:"GET",async:l.async,info:"Accept headers:"+w.oHeaders["Accept"],infoObject:{acceptHeaders:w.oHeaders["Accept"]},success:false,errorobject:G});if(!R||!R.bAborted){G.url=l.requestUri;w.fireRequestFailed(G);}}function y(){if(w.bUseBatch){w.updateSecurityToken();var D=U.parse(l.requestUri).query;var G=w._createRequestUrl(P,null,D,w.bUseBatch);l=w._createRequest(G,"GET",true);if(w.bTokenHandling){delete l.headers["x-csrf-token"];}var I=w._createBatchRequest([l],true);R=w._request(I,_,x,t.batchHandler,undefined,w.getServiceMetadata());}else{R=w._request(l,_,x,w.oHandler,undefined,w.getServiceMetadata());}if(H){var W={abort:function(){R.bAborted=true;R.abort();}};H(W);}}var z=[];var A=this._createRequestUrl(P,null,i,null,j||this.bCache);l=this._createRequest(A,"GET",true);if(w.bTokenHandling){delete l.headers["x-csrf-token"];}this.fireRequestSent({url:l.requestUri,type:"GET",async:l.async,info:"Accept headers:"+this.oHeaders["Accept"],infoObject:{acceptHeaders:this.oHeaders["Accept"]}});y();};v.prototype._importData=function(D,k){var j=this,l,K,R,E;if(D.results){l=[];h(D.results,function(i,w){l.push(j._importData(w,k));});return l;}else{K=this._getKey(D);E=this.oData[K];if(!E){E=D;this.oData[K]=E;}h(D,function(N,P){if(P&&(P.__metadata&&P.__metadata.uri||P.results)&&!P.__deferred){R=j._importData(P,k);if(Array.isArray(R)){E[N]={__list:R};}else{E[N]={__ref:R};}}else if(!P||!P.__deferred){E[N]=P;}});k[K]=true;return K;}};v.prototype._removeReferences=function(D){var j=this,l;if(D.results){l=[];h(D.results,function(i,k){l.push(j._removeReferences(k));});return l;}else{h(D,function(P,i){if(i){if(i["__ref"]||i["__list"]){delete D[P];}}});return D;}};v.prototype._restoreReferences=function(D){var k=this,l,R=[];if(D.results){l=[];h(D.results,function(i,j){l.push(k._restoreReferences(j));});return l;}else{h(D,function(P,i){if(i&&i["__ref"]){var w=k._getObject("/"+i["__ref"]);f(w,"ODataModel inconsistent: "+i["__ref"]+" not found!");if(w){delete i["__ref"];D[P]=w;k._restoreReferences(w);}}else if(i&&i["__list"]){h(i["__list"],function(j,E){var w=k._getObject("/"+i["__list"][j]);f(w,"ODataModel inconsistent: "+i["__list"][j]+" not found!");if(w){R.push(w);k._restoreReferences(w);}});delete i["__list"];i.results=R;R=[];}});return D;}};v.prototype.removeData=function(){this.oData={};};v.prototype.initialize=function(){var i=this.getBindings();h(i,function(I,j){j.initialize();});};v.prototype.refresh=function(i,R){if(R){this.removeData();}this._refresh(i);};v.prototype._refresh=function(i,j,E){var k=this.getBindings();h(k,function(I,l){l.refresh(i,j,E);});};v.prototype.checkUpdate=function(i,A,j,k){if(A){if(!this.sUpdateTimer){this.sUpdateTimer=setTimeout(function(){this.checkUpdate(i,false,j);}.bind(this),0);}return;}if(this.sUpdateTimer){clearTimeout(this.sUpdateTimer);this.sUpdateTimer=null;}var l=this.getBindings();h(l,function(I,w){if(!k||this.isMetaModelPath(w.getPath())){w.checkUpdate(i,j);}}.bind(this));};v.prototype.bindProperty=function(P,i,j){var k=new c(this,P,i,j);return k;};v.prototype.bindList=function(P,i,S,j,k){var l=new a(this,P,i,S,j,k);return l;};v.prototype.bindTree=function(P,i,j,k){var l=new d(this,P,i,j,k);return l;};v.prototype.createBindingContext=function(P,i,j,k,R){var R=!!R,l=this.resolve(P,i);if(typeof i=="function"){k=i;i=null;}if(typeof j=="function"){k=j;j=null;}if(!l){if(k){k(null);}return null;}var D=this._getObject(P,i),K,N,w=this;if(!R){R=this._isReloadNeeded(l,D,j);}if(!R){K=this._getKey(D);N=this.getContext('/'+K);if(k){k(N);}return N;}if(k){var I=!P.startsWith("/");if(l){var x=[],y=this.createCustomParams(j);if(y){x.push(y);}this._loadData(l,x,function(D){K=D?w._getKey(D):undefined;if(K&&i&&I){var z=i.getPath();z=z.substr(1);if(w.oData[z]){w.oData[z][P]={__ref:K};}}N=w.getContext('/'+K);k(N);},function(){k(null);});}else{k(null);}}};v.prototype._isReloadNeeded=function(j,D,P){var N,k=[],S,l=[];if(!j){return false;}if(!D){return true;}if(P&&P["expand"]){N=P["expand"].replace(/\s/g,"");k=N.split(',');}if(k){for(var i=0;i<k.length;i++){var w=k[i].indexOf("/");if(w!==-1){var x=k[i].slice(0,w);var y=k[i].slice(w+1);k[i]=[x,y];}}}for(var i=0;i<k.length;i++){var z=k[i];if(Array.isArray(z)){var A=D[z[0]];var E=z[1];if(!A||(A&&A.__deferred)){return true;}else{if(A){if(A.__list&&A.__list.length>0){for(var G=0;G<A.__list.length;G++){var H="/"+A.__list[G];var I=this.getObject(H);var R=this._isReloadNeeded(H,I,{expand:E});if(R){return true;}}}else if(A.__ref){var H="/"+A.__ref;var I=this.getObject(H);var R=this._isReloadNeeded(H,I,{expand:E});if(R){return true;}}}}}else{if(D[z]===undefined||(D[z]&&D[z].__deferred)){return true;}}}if(P&&P["select"]){S=P["select"].replace(/\s/g,"");l=S.split(',');}for(var i=0;i<l.length;i++){if(D[l[i]]===undefined){return true;}}if(l.length==0){var J=this.oMetadata._getEntityTypeByPath(j);if(!J){return false;}else{for(var i=0;i<J.property.length;i++){if(D[J.property[i].name]===undefined){return true;}}}}return false;};v.prototype.destroyBindingContext=function(i){};v.prototype.createCustomParams=function(P){var i=[],j,S={expand:true,select:true};for(var N in P){if(N in S){i.push("$"+N+"="+g(P[N]));}if(N=="custom"){j=P[N];for(var N in j){if(N.indexOf("$")==0){L.warning("Trying to set OData parameter "+N+" as custom query option!");}else{i.push(N+"="+g(j[N]));}}}}return i.join("&");};v.prototype.bindContext=function(P,i,j){var k=new O(this,P,i,j);return k;};v.prototype.setCountSupported=function(i){this.bCountSupported=i;};v.prototype.isCountSupported=function(){return this.bCountSupported;};v.prototype.setDefaultCountMode=function(i){this.sDefaultCountMode=i;};v.prototype.getDefaultCountMode=function(){return this.sDefaultCountMode;};v.prototype._getKey=function(i,D){var k,j;if(i instanceof q){k=i.getPath().substr(1);}else if(i&&i.__metadata&&i.__metadata.uri){j=i.__metadata.uri;k=j.substr(j.lastIndexOf("/")+1);}if(D){k=decodeURIComponent(k);}return k;};v.prototype.getKey=function(i,D){return this._getKey(i,D);};v.prototype.createKey=function(j,k,D){var E=this.oMetadata._getEntityTypeByPath(j),K=j,l=this,N,V,P;f(E,"Could not find entity type of collection \""+j+"\" in service metadata!");K+="(";if(E.key.propertyRef.length==1){N=E.key.propertyRef[0].name;f(N in k,"Key property \""+N+"\" is missing in object!");P=this.oMetadata._getPropertyMetadata(E,N);V=e.formatValue(k[N],P.type);K+=D?V:encodeURIComponent(V);}else{h(E.key.propertyRef,function(i,w){if(i>0){K+=",";}N=w.name;f(N in k,"Key property \""+N+"\" is missing in object!");P=l.oMetadata._getPropertyMetadata(E,N);V=e.formatValue(k[N],P.type);K+=N;K+="=";K+=D?V:encodeURIComponent(V);});}K+=")";return K;};v.prototype.getProperty=function(P,i,I){var V=this._getObject(P,i);if(I==null||I==undefined){return V;}if(!o(V)){return V;}V=p({},V);if(I==true){return this._restoreReferences(V);}else{return this._removeReferences(V);}};v.prototype._getObject=function(P,i){var N=this.isLegacySyntax()?this.oData:null,R=this.resolve(P,i),S,D,j,k,K,l;if(this.oMetadata&&R&&R.indexOf('/#')>-1){if(this.isMetaModelPath(R)){S=R.indexOf('/##');l=this.getMetaModel();if(!this.bMetaModelLoaded){return null;}D=R.substr(0,S);j=R.substr(S+3);k=l.getMetaContext(D);N=l.getProperty(j,k);}else{N=this.oMetadata._getAnnotation(R);}}else{if(i){K=i.getPath();K=K.substr(1);N=this.oData[K];}if(!P){return N;}var w=P.split("/"),I=0;if(!w[0]){N=this.oData;I++;}while(N&&w[I]){N=N[w[I]];if(N){if(N.__ref){N=this.oData[N.__ref];}else if(N.__list){N=N.__list;}else if(N.__deferred){N=undefined;}}I++;}}return N;};v.prototype.updateSecurityToken=function(){if(this.bTokenHandling){if(!this.oServiceData.securityToken){this.refreshSecurityToken();}if(this.bTokenHandling){this.oHeaders["x-csrf-token"]=this.oServiceData.securityToken;}}};v.prototype.resetSecurityToken=function(){delete this.oServiceData.securityToken;delete this.oHeaders["x-csrf-token"];};v.prototype.getSecurityToken=function(){var T=this.oServiceData.securityToken;if(!T){this.refreshSecurityToken();T=this.oServiceData.securityToken;}return T;};v.prototype.refreshSecurityToken=function(S,E,A){var i=this,j,T;A=A===true;j=this._createRequestUrl("/");var R=this._createRequest(j,"GET",A);R.headers["x-csrf-token"]="Fetch";function _(D,l){if(l){T=i._getHeader("x-csrf-token",l.headers);if(T){i.oServiceData.securityToken=T;i.oHeaders["x-csrf-token"]=T;}else{i.resetSecurityToken();i.bTokenHandling=false;}}if(S){S(D,l);}}function k(l){i.resetSecurityToken();i.bTokenHandling=false;i._handleError(l);if(E){E(l);}}return this._request(R,_,k,undefined,undefined,this.getServiceMetadata());};v.prototype._submitRequest=function(R,i,S,E,H,I){var j=this,k,l={};function _(D,y){if(i&&H){var z=j._getBatchErrors(D);if(z.length>0){w(z[0]);return false;}if(D.__batchResponses&&D.__batchResponses.length>0){k=D.__batchResponses[0].data;if(!k&&D.__batchResponses[0].__changeResponses){k=D.__batchResponses[0].__changeResponses[0].data;}}D=k;}if(I){if(D&&D.__batchResponses){h(D.__batchResponses,function(A,y){if(y&&y.data){j._importData(y.data,l);}});}}j._handleETag(R,y,i);j._updateRequestQueue(R,i);if(j._isRefreshNeeded(R,y)){j._refresh(false,R.keys,R.entityTypes);}if(S){S(D,y);}}function w(y){if(j.bTokenHandling&&y.response){var T=j._getHeader("x-csrf-token",y.response.headers);if(!R.bTokenReset&&y.response.statusCode=='403'&&T&&T.toLowerCase()=="required"){j.resetSecurityToken();R.bTokenReset=true;x();return;}}j._handleError(y);if(E){E(y);}}function x(){if(j.bTokenHandling){delete R.headers["x-csrf-token"];}if(j.bTokenHandling&&R.method!=="GET"){j.updateSecurityToken();if(j.bTokenHandling){R.headers["x-csrf-token"]=j.oServiceData.securityToken;}}if(i){return j._request(R,_,w,t.batchHandler,undefined,j.getServiceMetadata());}else{return j._request(R,_,w,j.oHandler,undefined,j.getServiceMetadata());}}return x();};v.prototype._createBatchRequest=function(w,A){var x,R,y={},P={},K={},E={};P.__batchRequests=w;x=this.sServiceUrl+"/$batch";if(this.aUrlParams.length>0){x+="?"+this.aUrlParams.join("&");}m(y,this.mCustomHeaders,this.oHeaders);delete y["Content-Type"];R={headers:y,requestUri:x,method:"POST",data:P,user:this.sUser,password:this.sPassword,async:A};if(A){R.withCredentials=this.bWithCredentials;}h(w,function(i,z){if(z["__changeRequests"]){h(z["__changeRequests"],function(j,D){if(D.keys&&D.method!="POST"){h(D.keys,function(k,l){K[k]=l;});}else if(D.entityTypes&&D.method=="POST"){h(D.entityTypes,function(l,k){E[l]=k;});}});}});R.keys=K;R.entityTypes=E;return R;};v.prototype._handleETag=function(R,k,l){var w,E,x,y,z,A;if(l){z=R.data.__batchRequests;A=k.data.__batchResponses;if(A&&z){for(var i=0;i<z.length;i++){x=z[i].__changeRequests;if(A[i]){y=A[i].__changeResponses;if(x&&y){for(var j=0;j<x.length;j++){if(x[j].method=="MERGE"||x[j].method=="PUT"){w=x[j].requestUri.replace(this.sServiceUrl+'/','');if(!w.startsWith("/")){w="/"+w;}E=this._getObject(w);if(E&&E.__metadata&&y[j].headers&&y[j].headers.ETag){E.__metadata.etag=y[j].headers.ETag;}}}}}else{L.warning("could not update ETags for batch request: corresponding response for request missing");}}}else{L.warning("could not update ETags for batch request: no batch responses/requests available");}}else{w=R.requestUri.replace(this.sServiceUrl+'/','');if(!w.startsWith("/")){w="/"+w;}E=this._getObject(w);if(E&&E.__metadata&&k.headers.ETag){E.__metadata.etag=k.headers.ETag;}}};v.prototype._handleBatchErrors=function(R,D){this._getBatchErrors(D);this._handleETag();};v.prototype._getBatchErrors=function(D){var E=[],i;h(D.__batchResponses,function(I,j){if(j.message){i="The following problem occurred: "+j.message;if(j.response){i+=j.response.statusCode+","+j.response.statusText+","+j.response.body;}E.push(j);L.fatal(i);}if(j.__changeResponses){h(j.__changeResponses,function(I,k){if(k.message){i="The following problem occurred: "+k.message;if(k.response){i+=k.response.statusCode+","+k.response.statusText+","+k.response.body;}E.push(k);L.fatal(i);}});}});return E;};v.prototype._handleError=function(E){var P={},T;var i="The following problem occurred: "+E.message;P.message=E.message;if(E.response){if(this.bTokenHandling){T=this._getHeader("x-csrf-token",E.response.headers);if(E.response.statusCode=='403'&&T&&T.toLowerCase()=="required"){this.resetSecurityToken();}}i+=E.response.statusCode+","+E.response.statusText+","+E.response.body;P.statusCode=E.response.statusCode;P.statusText=E.response.statusText;P.responseText=E.response.body;}L.fatal(i);return P;};v.prototype.getData=function(P,i,I){return this.getProperty(P,i,I);};v.prototype._getETag=function(P,i,E){var j,k,I;if(E){j=E;}else{if(i&&i.__metadata){j=i.__metadata.etag;}else if(P){k=P.replace(this.sServiceUrl+'/','');I=k.indexOf("?");if(I>-1){k=k.substr(0,I);}if(this.oData.hasOwnProperty(k)){j=this.getProperty('/'+k+'/__metadata/etag');}}}return j;};v.prototype._createRequest=function(i,j,A,P,E){var k={},l;m(k,this.mCustomHeaders,this.oHeaders);l=this._getETag(i,P,E);if(l&&j!="GET"){k["If-Match"]=l;}if(this.bJSON&&j!="DELETE"&&this.sMaxDataServiceVersion==="2.0"){k["Content-Type"]="application/json";}if(j=="MERGE"&&!this.bUseBatch){k["x-http-method"]="MERGE";j="POST";}var R={headers:k,requestUri:i,method:j,user:this.sUser,password:this.sPassword,async:A};if(P){R.data=P;}if(A){R.withCredentials=this.bWithCredentials;}return R;};v.prototype._isRefreshNeeded=function(R,i){var j=false,E,k=[],l=this;if(!this.bRefreshAfterChange){return j;}if(R.data&&Array.isArray(R.data.__batchRequests)){if(i){k=l._getBatchErrors(i.data);h(k,function(I,w){if(w.response&&w.response.statusCode=="412"){E=w.response.statusCode;return false;}});if(E){return false;}}h(R.data.__batchRequests,function(I,w){if(Array.isArray(w.__changeRequests)){h(w.__changeRequests,function(I,x){j=j||l._isRefreshNeeded(x);return!j;});}return!j;});}else{if(R.method==="GET"){return false;}else{if(i&&i.statusCode=="412"){j=false;}else{j=true;}}}return j;};v.prototype.update=function(P,D,i){var S,E,j,R,k,l,w,x,y,z,K,A,G=false;if(i instanceof q||arguments.length>3){l=i;S=arguments[3];E=arguments[4];j=arguments[5];}else{l=i.context||i.oContext;S=i.success||i.fnSuccess;E=i.error||i.fnError;w=i.eTag||i.sETag;j=typeof(i.merge)=="undefined"?i.bMerge===true:i.merge===true;G=typeof(i.async)=="undefined"?i.bAsync===true:i.async===true;A=i.urlParameters;}k=this._createRequestUrl(P,l,A,this.bUseBatch);if(j){R=this._createRequest(k,"MERGE",G,D,w);}else{R=this._createRequest(k,"PUT",G,D,w);}P=this._normalizePath(P,l);z=this._getObject(P);R.keys={};if(z){K=this._getKey(z);R.keys[K]=true;}if(this.bUseBatch){y=this._createBatchRequest([{__changeRequests:[R]}],G);x=this._submitRequest(y,this.bUseBatch,S,E,true);}else{x=this._submitRequest(R,this.bUseBatch,S,E);}return x;};v.prototype.create=function(P,D,i){var R,j,k,l,E,w,S,x,A=false,y;if(i&&typeof(i)=="object"&&!(i instanceof q)){w=i.context;S=i.success;y=i.urlParameters;x=i.error;A=i.async===true;}else{w=i;S=arguments[3];x=arguments[4];}k=this._createRequestUrl(P,w,y,this.bUseBatch);R=this._createRequest(k,"POST",A,D);P=this._normalizePath(P,w);E=this.oMetadata._getEntityTypeByPath(P);R.entityTypes={};if(E){R.entityTypes[E.entityType]=true;}if(this.bUseBatch){j=this._createBatchRequest([{__changeRequests:[R]}],A);l=this._submitRequest(j,this.bUseBatch,S,x,true);}else{l=this._submitRequest(R,this.bUseBatch,S,x);}return l;};v.prototype.remove=function(P,i){var j,E,S,k,l,R,w,x,K,y,_,z,A,D,G=false,H=this;if((i instanceof q)||arguments[2]){j=i;k=arguments[2];l=arguments[3];}else if(i){j=i.context||i.oContext;k=i.success||i.fnSuccess;l=i.error||i.fnError;x=i.eTag||i.sETag;y=i.payload||i.oPayload;G=typeof(i.async)=="undefined"?i.bAsync===true:i.async===true;D=i.urlParameters;}_=function(I,J){E=w.substr(w.lastIndexOf('/')+1);if(E.indexOf('?')!=-1){E=E.substr(0,E.indexOf('?'));}delete H.oData[E];delete H.mContexts["/"+E];if(k){k(I,J);}};w=this._createRequestUrl(P,j,D,this.bUseBatch);R=this._createRequest(w,"DELETE",G,y,x);P=this._normalizePath(P,j);S=this._getObject(P);R.keys={};if(S){K=this._getKey(S);R.keys[K]=true;}if(this.bUseBatch){z=this._createBatchRequest([{__changeRequests:[R]}],G);A=this._submitRequest(z,this.bUseBatch,_,l,true);}else{A=this._submitRequest(R,this.bUseBatch,_,l);}return A;};v.prototype.callFunction=function(i,P){var R,j,k,l,w,x,y,S,E,A,z="GET",D={},G=this;if(P&&typeof(P)=="object"){z=P.method?P.method:z;x=P.urlParameters;y=P.context;S=P.success;E=P.error;A=P.async===true;}else{z=P;x=arguments[2];y=arguments[3];S=arguments[4];E=arguments[5];A=arguments[6]===true;}w=this.oMetadata._getFunctionImportMetadata(i,z);f(w,"Function "+i+" not found in the metadata !");if(w){k=this._createRequestUrl(i,y,null,this.bUseBatch);var H=U(k);if(w.parameter!=null){h(x,function(I,J){var K=w.parameter.filter(function(Q){return Q.name==I&&Q.mode=="In";});if(K.length>0){var N=K[0];D[I]=e.formatValue(J,N.type);}else{L.warning("Parameter "+I+" is not defined for function call "+i+"!");}});}if(z==="GET"){return G.read(i,y,D,true,S,E);}else{h(D,function(I,J){H.addQuery(I,J);});R=this._createRequest(H.toString(),z,A);if(this.bUseBatch){j=this._createBatchRequest([{__changeRequests:[R]}],A);l=this._submitRequest(j,this.bUseBatch,S,E,true);}else{l=this._submitRequest(R,this.bUseBatch,S,E);}return l;}}};v.prototype.read=function(P,i){var R,j,k,l,w,x,A,S,E,y,z,D,G,H,I,J,K;if(i&&typeof(i)=="object"&&!(i instanceof q)){w=i.context;x=i.urlParameters;A=i.async!==false;S=i.success;E=i.error;y=i.filters;z=i.sorters;}else{w=i;x=arguments[2];A=arguments[3]!==false;S=arguments[4];E=arguments[5];}A=A!==false;K=e._createUrlParamsArray(x);G=e.createSortParams(z);if(G){K.push(G);}if(y&&!this.oMetadata){L.fatal("Tried to use filters in read method before metadata is available.");}else{J=this._normalizePath(P,w);I=this.oMetadata&&this.oMetadata._getEntityTypeByPath(J);H=F.groupFilters(y);D=e.createFilterParams(H,this.oMetadata,I);if(D){K.push(D);}}j=this._createRequestUrl(P,w,K,this.bUseBatch);R=this._createRequest(j,"GET",A);if(this.bUseBatch){l=this._createBatchRequest([R],A);k=this._submitRequest(l,this.bUseBatch,S,E,true);}else{k=this._submitRequest(R,this.bUseBatch,S,E);}return k;};v.prototype.createBatchOperation=function(P,i,D,j){var k={},E,S,K,l;m(k,this.mCustomHeaders,this.oHeaders);if(P.startsWith("/")){P=P.substr(1);}if(j){E=j.sETag;}if(i!="GET"){E=this._getETag(P,D,E);if(E){k["If-Match"]=E;}}if(this.bJSON){if(i!="DELETE"&&i!="GET"&&this.sMaxDataServiceVersion==="2.0"){k["Content-Type"]="application/json";}}else{k["Content-Type"]="application/atom+xml";}var R={requestUri:P,method:i.toUpperCase(),headers:k};if(D){R.data=D;}if(i!="GET"&&i!="POST"){if(P&&P.indexOf("/")!=0){P='/'+P;}S=this._getObject(P);if(S){K=this._getKey(S);R.keys={};R.keys[K]=true;}}else if(i=="POST"){var N=P;if(P.indexOf('?')!=-1){N=P.substr(0,P.indexOf('?'));}l=this.oMetadata._getEntityTypeByPath(N);if(l){R.entityTypes={};R.entityTypes[l.entityType]=true;}}return R;};v.prototype.addBatchReadOperations=function(R){if(!Array.isArray(R)||R.length<=0){L.warning("No array with batch operations provided!");return false;}var i=this;h(R,function(I,j){if(j.method!="GET"){L.warning("Batch operation should be a GET operation!");return false;}i.aBatchOperations.push(j);});};v.prototype.addBatchChangeOperations=function(i){if(!Array.isArray(i)||i.length<=0){return false;}h(i,function(I,j){if(j.method!="POST"&&j.method!="PUT"&&j.method!="MERGE"&&j.method!="DELETE"){L.warning("Batch operation should be a POST/PUT/MERGE/DELETE operation!");return false;}});this.aBatchOperations.push({__changeRequests:i});};v.prototype.clearBatch=function(){this.aBatchOperations=[];};v.prototype.submitBatch=function(S,E,A,i){var R,j,k=this;function _(D,x){if(S){S(D,x,k._getBatchErrors(D));}}if(!(typeof(S)=="function")){var l=A;var w=E;A=S;S=w;E=l;}A=A!==false;if(this.aBatchOperations.length<=0){L.warning("No batch operations in batch. No request will be triggered!");return false;}R=this._createBatchRequest(this.aBatchOperations,A);j=this._submitRequest(R,true,_,E,false,i);this.clearBatch();return j;};v.prototype.getServiceMetadata=function(){if(this.oMetadata&&this.oMetadata.isLoaded()){return this.oMetadata.getServiceMetadata();}};v.prototype.getServiceAnnotations=function(){if(this.oAnnotations&&this.oAnnotations.getAnnotationsData){return this.oAnnotations.getAnnotationsData();}};v.prototype.submitChanges=function(S,E,P){var R,i,j=this,k,l,T,w,x,K;if(this.sChangeKey){k=this.sChangeKey.replace(this.sServiceUrl,'');x=this._getObject(k);i=x;if(o(x)){i=p({},x);if(i.__metadata){T=i.__metadata.type;w=i.__metadata.etag;delete i.__metadata;if(T||w){i.__metadata={};}if(T){i.__metadata.type=T;}if(w){i.__metadata.etag=w;}}h(i,function(A,D){if(D&&D.__deferred){delete i[A];}});var y=this.oMetadata._getEntityTypeByPath(k);if(y){var N=this.oMetadata._getNavigationPropertyNames(y);h(N,function(I,A){delete i[A];});}i=this._removeReferences(i);}if(P&&P.sETag){l=P.sETag;}R=this._createRequest(this.sChangeKey,"MERGE",true,i,l);if(this.sUrlParams){R.requestUri+="?"+this.sUrlParams;}R.keys={};if(x){K=this._getKey(x);R.keys[K]=true;}this.oRequestQueue[this.sChangeKey]=R;}if(n(this.oRequestQueue)){return undefined;}if(this.bUseBatch){var z=[];h(this.oRequestQueue,function(K,A){delete A._oRef;var D=p({},A);A._oRef=D;D.requestUri=D.requestUri.replace(j.sServiceUrl+'/','');D.data._bCreate?delete D.data._bCreate:false;z.push(D);});R=this._createBatchRequest([{__changeRequests:z}],true);this._submitRequest(R,this.bUseBatch,S,E,true);}else{h(this.oRequestQueue,function(K,A){delete A._oRef;var D=p({},A);A._oRef=D;if(D.data&&D.data._bCreate){delete D.data._bCreate;}j._submitRequest(D,this.bUseBatch,S,E,true);});}return undefined;};v.prototype._updateRequestQueue=function(R,k){var l,w,x,y=this;if(k){l=R.data.__batchRequests;if(l){for(var i=0;i<l.length;i++){w=l[i].__changeRequests;if(w){for(var j=0;j<w.length;j++){x=w[j];h(this.oRequestQueue,function(K,z){if(z._oRef===x&&K!==y.sChangeKey){delete y.oRequestQueue[K];delete y.oData[K];delete y.mContexts["/"+K];}else if(y.sChangeKey&&K===y.sChangeKey){delete y.oRequestQueue[K];y.sChangeKey=null;}});}}}}}else{h(this.oRequestQueue,function(K,z){if(z._oRef===R&&K!==y.sChangeKey){delete y.oRequestQueue[K];delete y.oData[K];delete y.mContexts["/"+K];}else if(y.sChangeKey&&K===y.sChangeKey){delete y.oRequestQueue[K];y.sChangeKey=null;}});}};v.prototype.resetChanges=function(S,E){var P;if(this.sChangeKey){P=this.sChangeKey.replace(this.sServiceUrl,'');this._loadData(P,null,S,E);}};v.prototype.setProperty=function(P,V,j,A){var k,E={},D={},l=this._createRequestUrl(P,j),w=P.substring(0,P.lastIndexOf("/")),K,x,y={},z=false;if(!this.resolve(P,j)){return false;}l=l.replace(this.sServiceUrl+'/','');l=l.substring(0,l.indexOf("/"));l=this.sServiceUrl+'/'+l;k=P.substr(P.lastIndexOf("/")+1);D=this._getObject(w,j);if(!D){return false;}x=w.split("/");for(var i=x.length-1;i>=0;i--){E=this._getObject(x.join("/"),j);if(E){K=this._getKey(E);if(K){break;}}x.splice(i-1,1);}if(!K){K=this._getKey(j);}if(K){y[K]=true;}if(D._bCreate){D[k]=V;z=true;this.checkUpdate(false,A,y);}else{if(!this.sChangeKey){this.sChangeKey=l;}if(this.sChangeKey==l){D[k]=V;z=true;this.checkUpdate(false,A,y);}else{this.fireRejectChange({rejectedValue:V,oldValue:D[k]});}}return z;};v.prototype._isHeaderPrivate=function(H){switch(H.toLowerCase()){case"accept":case"accept-language":case"maxdataserviceversion":case"dataserviceversion":return true;case"x-csrf-token":return this.bTokenHandling;default:return false;}};v.prototype.setHeaders=function(H){var i={},j=this;if(H){h(H,function(k,l){if(j._isHeaderPrivate(k)){L.warning("Not allowed to modify private header: "+k);}else{i[k]=l;}});this.mCustomHeaders=i;}else{this.mCustomHeaders={};}if(this.oAnnotations){this.oAnnotations.setHeaders(this.mCustomHeaders);}};v.prototype.getHeaders=function(){return m({},this.mCustomHeaders,this.oHeaders);};v.prototype._getHeader=function(i,H){var j;for(j in H){if(j.toLowerCase()===i.toLowerCase()){return H[j];}}return null;};v.prototype.hasPendingChanges=function(){return this.sChangeKey!=null;};v.prototype.updateBindings=function(i){this.checkUpdate(i);};v.prototype.forceNoCache=function(i){this.bCache=!i;};v.prototype.setTokenHandlingEnabled=function(T){this.bTokenHandling=T;};v.prototype.setUseBatch=function(i){this.bUseBatch=i;};v.prototype.formatValue=function(V,T){return e.formatValue(V,T);};v.prototype.deleteCreatedEntry=function(i){if(i){var P=i.getPath();delete this.mContexts[P];if(P.startsWith("/")){P=P.substr(1);}delete this.oRequestQueue[P];delete this.oData[P];}};v.prototype.createEntry=function(P,j){var E={},k,l,R;if(!P.startsWith("/")){P="/"+P;}var w=this.oMetadata._getEntityTypeByPath(P);if(!w){f(w,"No Metadata for collection "+P+" found");return undefined;}if(typeof j==="object"&&!Array.isArray(j)){E=j;}else{for(var i=0;i<w.property.length;i++){var x=w.property[i];var y=j&&j.indexOf(x.name)>-1;if(!j||y){E[x.name]=this._createPropertyValue(x.type);if(y){j.splice(j.indexOf(x.name),1);}}}if(j){f(j.length===0,"No metadata for the following properties found: "+j.join(","));}}E._bCreate=true;k=P.substring(1)+"('"+u()+"')";this.oData[k]=E;E.__metadata={type:""+w.entityType};l=this._createRequestUrl(P);R=this._createRequest(l,"POST",true,E);R.entityTypes={};R.entityTypes[w.entityType]=true;this.oRequestQueue[k]=R;return this.getContext("/"+k);};v.prototype._createPropertyValue=function(T){var j=this.oMetadata._splitName(T);var N=j.namespace;var k=j.name;if(N.toUpperCase()!=='EDM'){var l={};var w=this.oMetadata._getObjectMetadata("complexType",k,N);f(w,"Complex type "+T+" not found in the metadata !");for(var i=0;i<w.property.length;i++){var P=w.property[i];l[P.name]=this._createPropertyValue(P.type);}return l;}else{return this._getDefaultPropertyValue(k,N);}};v.prototype._getDefaultPropertyValue=function(T,N){return undefined;};v.prototype._normalizePath=function(P,i){if(P&&P.indexOf('?')!=-1){P=P.substr(0,P.indexOf('?'));}if(!i&&!P.startsWith("/")){P='/'+P;L.warning(this+" path "+P+" should be absolute if no Context is set");}return this.resolve(P,i);};v.prototype.setRefreshAfterChange=function(R){this.bRefreshAfterChange=R;};v.prototype.isList=function(P,i){var P=this.resolve(P,i);return P&&P.substr(P.lastIndexOf("/")).indexOf("(")===-1;};v.prototype.isMetaModelPath=function(P){return P.indexOf("##")==0||P.indexOf("/##")>-1;};v.prototype._request=function(R,S,E,H,i,j){if(this.bDestroyed){return{abort:function(){}};}var k=this;function w(x){return function(){if(k.aPendingRequestHandles){var I=k.aPendingRequestHandles.indexOf(l);if(I>-1){k.aPendingRequestHandles.splice(I,1);}}if(!(l&&l.bSuppressErrorHandlerCall)){x.apply(this,arguments);}};}var l=t.request(R,w(S||t.defaultSuccess),w(E||t.defaultError),H,i,j);if(R.async!==false){this.aPendingRequestHandles.push(l);}return l;};v.prototype.destroy=function(){this.bDestroyed=true;if(this.aPendingRequestHandles){for(var i=this.aPendingRequestHandles.length-1;i>=0;i--){var R=this.aPendingRequestHandles[i];if(R&&R.abort){R.bSuppressErrorHandlerCall=true;R.abort();}}delete this.aPendingRequestHandles;}if(this.oMetadataLoadEvent){clearTimeout(this.oMetadataLoadEvent);}if(this.oMetadataFailedEvent){clearTimeout(this.oMetadataFailedEvent);}if(this.oMetadata){this.oMetadata.detachLoaded(this.onMetadataLoaded);this.oMetadata.detachFailed(this.onMetadataFailed);if(!this.oMetadata.isLoaded()&&!this.oMetadata.hasListeners("loaded")){this.oMetadata.destroy();delete this.oServiceData.oMetadata;}delete this.oMetadata;}if(this.oAnnotations){this.oAnnotations.detachFailed(this.onAnnotationsFailed);this.oAnnotations.detachLoaded(this.onAnnotationsLoaded);this.oAnnotations.destroy();delete this.oAnnotations;delete this.pAnnotationsLoaded;}M.prototype.destroy.apply(this,arguments);};v.prototype._getAnnotationParser=function(A){if(!this.oAnnotations){this.oAnnotations=new r({annotationData:A,url:null,metadata:this.oMetadata,async:this.bLoadMetadataAsync,headers:this.mCustomHeaders});this.oAnnotations.attachFailed(this.onAnnotationsFailed,this);this.oAnnotations.attachLoaded(this.onAnnotationsLoaded,this);}return this.oAnnotations;};v.prototype.onAnnotationsFailed=function(E){this.fireAnnotationsFailed(E.getParameters());};v.prototype.onAnnotationsLoaded=function(E){this.fireAnnotationsLoaded(E.getParameters());};v.prototype.addAnnotationUrl=function(j){var k=[].concat(j),l=[],A=[],E=[],w=this;h(k,function(i,x){var I=x.indexOf("$metadata");if(I>=0){if(I==0){x=w.sServiceUrl+'/'+x;}l.push(x);}else{A.push(x);}});return this.oMetadata._addUrl(l).then(function(P){return Promise.all(P.map(function(i){E=E.concat(i.entitySets);return w.addAnnotationXML(i["metadataString"]);}));}).then(function(){return w._getAnnotationParser().addUrl(A);}).then(function(P){return{annotations:P.annotations,entitySets:E};});};v.prototype.addAnnotationXML=function(x,S){return new Promise(function(i,j){this._getAnnotationParser().setXML(null,x,{success:i,error:j,fireEvents:!S});}.bind(this));};v.prototype.getMetaModel=function(){var i=this;if(!this.oMetaModel){this.oMetaModel=new s(this.oMetadata,this.oAnnotations,this);this.oMetaModel.loaded().then(function(){i.bMetaModelLoaded=true;i.checkUpdate(false,false,null,true);});}return this.oMetaModel;};v.prototype.annotationsLoaded=function(){return this.oMetadata.isLoaded()&&(!this.oAnnotations||this.oAnnotations.isLoaded())?null:this.pAnnotationsLoaded;};return v;});
