/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','./Image','./TextView','./Button','./ApplicationHeaderRenderer','sap/ui/core/library'],function(l,C,I,T,B,A,c){"use strict";var a=c.AccessibleRole;var b=C.extend("sap.ui.commons.ApplicationHeader",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{logoSrc:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},logoText:{type:"string",group:"Misc",defaultValue:null},displayLogoff:{type:"boolean",group:"Misc",defaultValue:true},userName:{type:"string",group:"Misc",defaultValue:null},displayWelcome:{type:"boolean",group:"Misc",defaultValue:true}},events:{logoff:{}}}});b.prototype.init=function(){this.initializationDone=false;};b.prototype.exit=function(){this.oLogo&&this.oLogo.destroy();this.oLogoText&&this.oLogoText.destroy();this.oLogoffBtn&&this.oLogoffBtn.destroy();};b.prototype.initControls=function(){var d=this.getId();var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.oLogo&&this.oLogo.destroy();this.oLogo=new I(d+"-logoImg");this.oLogo.setTooltip(r.getText("APPHDR_LOGO_TOOLTIP"));this.oLogo.setParent(this);this.oLogoText&&this.oLogoText.destroy();this.oLogoText=new T(d+"-logoText");this.oLogoText.setAccessibleRole(a.Heading);this.oLogoText.setParent(this);this.oLogoffBtn&&this.oLogoffBtn.destroy();this.oLogoffBtn=new B(d+"-logoffBtn");var L=r.getText("APPHDR_LOGOFF");this.oLogoffBtn.setText(L);this.oLogoffBtn.setTooltip(L);this.oLogoffBtn.attachPress(this.logoff,this);this.oLogoffBtn.setParent(this);this.oLogoffBtn.setLite(true);};b.prototype.logoff=function(e){this.fireLogoff();};b.prototype.setLogoSrc=function(L){this.initializationDone=false;this.setProperty("logoSrc",L);return this;};b.prototype.setLogoText=function(L){this.initializationDone=false;this.setProperty("logoText",L);return this;};b.prototype.setUserName=function(u){this.initializationDone=false;this.setProperty("userName",u);return this;};b.prototype.setDisplayWelcome=function(d){this.initializationDone=false;this.setProperty("displayWelcome",d);return this;};b.prototype.setDisplayLogoff=function(d){this.initializationDone=false;this.setProperty("displayLogoff",d);return this;};return b;});
