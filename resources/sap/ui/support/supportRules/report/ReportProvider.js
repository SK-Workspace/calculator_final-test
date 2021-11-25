/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/support/supportRules/report/Archiver','sap/ui/support/supportRules/report/IssueRenderer'],function(q,A,I){'use strict';var r=q.sap.getResourcePath('sap/ui/support/supportRules/report/resources');var t={line:function(a,i,u,v,w){a.push("<tr><td ",i?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",q.sap.escapeHTML(v||""),"</label></td><td",u?" class='sapUiSupportTechInfoBorder'":"",">");var x=w;if(typeof w==="function"){x=w(a);}a.push(q.sap.escapeHTML(x||""));a.push("</td></tr>");},multiline:function(a,u,w,x,y){var z=this;z.line(a,u,w,x,function(a){a.push("<table border='0' cellspacing='0' cellpadding='3'>");q.each(y,function(i,v){var B="";if(v){if(typeof(v)==="string"||typeof(v)==="string"||typeof(v)==="boolean"){B=v;}else if(Array.isArray(v)||q.isPlainObject(v)){B=JSON.stringify(v);}}z.line(a,false,false,i,""+B);});a.push("</table>");});},subheader:function(a,i){a.push("<tr class='sapUiSupportTitle'><td valign='top' colspan='2'>","<label class='sapUiSupportLabel'>",q.sap.escapeHTML(i||""),"</label></td></tr>");}};function g(a){return q.ajax({type:'GET',url:r+"/"+a,dataType:'text'}).then(function(i){return i;});}function b(a){var u='';if(!a){return u;}try{a.modules.sort();var w=["<div class='sapUiSupportToolbar'>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3'>"];t.subheader(w,"Support Assistant Information");t.line(w,true,true,"Location",a.supportAssistant.location);t.line(w,true,true,"Version",a.supportAssistant.versionAsString);t.subheader(w,"Application Information");t.line(w,true,true,"SAPUI5 Version",function(i){var v=a.sapUi5Version;if(v&&v.version){var V=v.version;var y=q.sap.escapeHTML(V.version||"");i.push(y," (built at ",q.sap.escapeHTML(V.buildTimestamp||""),", last change ",q.sap.escapeHTML(V.scmRevision||""),")");}else{i.push("not available");}});t.line(w,true,true,"Core Version",function(i){return a.version+" (built at "+a.build+", last change "+a.change+")";});t.line(w,true,true,"Loaded jQuery Version",function(i){return a.jquery;});t.line(w,true,true,"User Agent",function(i){return a.useragent+(a.docmode?", Document Mode '"+a.docmode+"'":"");});t.line(w,true,true,"Application",a.appurl);t.multiline(w,true,true,"Configuration (bootstrap)",a.bootconfig);t.multiline(w,true,true,"Configuration (computed)",a.config);if(!q.isEmptyObject(a.libraries)){t.multiline(w,true,true,"Libraries",a.libraries);}t.multiline(w,true,true,"Loaded Libraries",a.loadedLibraries);t.line(w,true,true,"Loaded Modules",function(y){q.each(a.modules,function(i,v){if(v.indexOf("sap.ui.core.support")<0){y.push("<span>",q.sap.escapeHTML(v||""),"</span>");if(i<a.modules.length-1){y.push(", ");}}});});t.multiline(w,true,true,"URI Parameters",a.uriparams);w.push("</table></div>");u=w.join('');}catch(x){q.sap.log.warning('There was a problem extracting technical info.');}return u;}function c(v){var a='<td>';if(v){a+=q.sap.escapeHTML(v);}a+='</td>';return a;}function d(a){var u='';if(!a){return u;}u+='<table class="sapUiTable"><tr><th>Component ID</th><th>Type</th><th>Title</th><th>Subtitle</th><th>Application version</th><th>Description</th><th>BCP Component</th></tr>';try{for(var i=0;i<a.length;i++){var v=a[i];u+='<tr>';u+=c(v.id);u+=c(v.type);u+=c(v.title);u+=c(v.subTitle);if(v.applicationVersion){u+=c(v.applicationVersion.version);}else{u+='<td></td>';}u+=c(v.description);u+=c(v.ach);u+='</tr>';}u+='</table>';}catch(w){q.sap.log.warning('There was a problem extracting app info.');u='';}return u;}function e(a){var i='';i+='<div><span class="sapUiSupportLabel">'+a.displayName+'</span>';i+='<span> ('+a.description+')</span></div>';return i;}function f(a,i){var u='';u+='<div><span class="sapUiSupportLabel">'+i.displayName+' with id:</span> '+a;u+='<span> ('+i.description+')</span></div>';return u;}function h(a,u){var v='';if(a.length>5){v+='<div class="expandable-control collapsed-content" data-expandableElement="execution-scope-components">';v+='<span class="expandable-title"><span class="sapUiSupportLabel">'+u.displayName+'</span>';v+='<span> ('+u.description+')</span></span></div>';}else{v+='<div><span class="sapUiSupportLabel">'+u.displayName+'</span>';v+='<span> ('+u.description+')</span></div>';}v+='<ol id="execution-scope-components" class="top-margin-xsmall">';for(var i=0;i<a.length;i++){v+='<li>'+a[i]+'</li>';}v+='</ol>';return v;}function j(a){var i='';try{var u=a.executionScope.getType();var v=a.scopeDisplaySettings.executionScopes[u];var w=a.scopeDisplaySettings.executionScopeTitle;i+='<div class="sapUiSupportLabel">'+w+': </div>';switch(u){case'global':i+=e(v);break;case'subtree':i+=f(a.executionScope._getContext().parentId,v);break;case'components':i+=h(a.executionScope._getContext().components,v);break;}}catch(x){q.sap.log.warning('There was a problem extracting scope info.');i='';}return i;}function k(a){var i='';if(!a){return i;}try{var u=1;i+='<table class="sapUiTable"><tbody><tr><th>Name</th><th>Description</th><th>Categories</th><th>Audiences</th></tr></tbody>';for(var v in a){var w=a[v];var x='collapsed-content';if(u===1){x='expanded-content';}var y=a[v].selected?' ('+a[v].issueCount+' issues)':'';var z='<span class="'+(a[v].selected?'checked':'unchecked')+'"></span>';i+='<tbody><tr><td colspan="100" ';i+='class="expandable-control '+x+'" data-expandableElement="section-selected-rules-group'+u+'">'+z;i+='<span class="sapUiSupportLabel expandable-title">'+v+y+'</span>';i+='</td></tr></tbody>';var B='';for(var C in w){var D=w[C].selected?' ('+w[C].issueCount+' issues)':'';var E='<span class="'+(w[C].selected?'checked':'unchecked')+'"></span>';B+='<tr>';B+='<td>'+E+w[C].title+D+'</td>';B+='<td>'+w[C].description+'</td>';B+='<td>'+w[C].categories.join(', ')+'</td>';B+='<td>'+w[C].audiences.join(', ')+'</td>';B+='</tr>';}i+='<tbody id="section-selected-rules-group'+u+'">'+B+'</tbody>';u++;}i+='</table>';}catch(F){q.sap.log.warning('There was a problem extracting selected rules info.');i='';}return i;}function l(i){return I.render(i,true);}function m(R){if(!R){return"none";}return"<strong>"+R.title+"/"+R.id+"</strong>";}function n(D,B){if(!B){B=r+"/";}return g("ReportTemplate.html").then(function(T){var C={baseUrl:B,technicalInfo:b(D.technical),issues:l(D.issues),appInfo:d(D.application),rules:k(D.rules),rulePreset:m(D.rulePreset),metadataTitle:D.name+' Analysis Results',metadataTitleTechnicalInfo:'Technical Information',metadataTitleIssues:'Issues',metadataTitleAppInfo:'Application Information',metadataTitleSelectedRules:'Available and (<span class="checked"></span>) Selected Rules',metadataTimestamp:new Date(),metadataScope:j(D.scope),metadataAnalysisDuration:D.analysisDuration,metadataAnalysisDurationTitle:D.analysisDurationTitle};return o(T,C);});}function o(T,C){var P,v;for(P in C){v=C[P];T=T.replace(new RegExp("\{\{"+P+"\}\}","ig"),v);}return T;}function p(D){var P=[this.getReportHtml(D,"./"),g("styles.css"),g("index.js"),g("images/checked.svg"),g("images/collapsed.svg"),g("images/expanded.svg"),g("images/unchecked.svg")];Promise.all(P).then(function(a){var i={'issues':D.issues},u={'appInfos':D.application},v={'technicalInfo':D.technical},w=new A();w.add('technicalInfo.json',v,'json');w.add('issues.json',i,'json');w.add('appInfos.json',u,'json');w.add('report.html',a[0]);w.add('abap.json',D.abap,'json');w.add('styles.css',a[1],'css');w.add('index.js',a[2],'js');w.add('images/checked.svg',a[3],'svg');w.add('images/collapsed.svg',a[4],'svg');w.add('images/expanded.svg',a[5],'svg');w.add('images/unchecked.svg',a[6],'svg');w.download("SupportAssistantReport");w.clear();});}function s(D){var i='';var a=q('<a class="sapUiHidden"></a>');a.on('click',function(){var u=window.open('','_blank');u.opener=null;q(u.document).ready(function(){u.document.documentElement.innerHTML='';u.document.write(i);});});q('body').append(a);this.getReportHtml(D).then(function(u){i=u;a[0].click();a.remove();});}return{getReportHtml:n,downloadReportZip:p,openReport:s};},true);