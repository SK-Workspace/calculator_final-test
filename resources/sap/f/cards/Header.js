/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseHeader","sap/m/library","sap/f/library","sap/m/Text","sap/m/Avatar","sap/f/cards/HeaderRenderer","sap/ui/core/Core","sap/ui/core/InvisibleText"],function(B,l,a,T,A,H,C,I){"use strict";var b=l.AvatarShape;var c=l.AvatarColor;var d=B.extend("sap.f.cards.Header",{metadata:{library:"sap.f",interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",defaultValue:""},subtitle:{type:"string",defaultValue:""},statusText:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:b.Circle},iconSrc:{type:"sap.ui.core.URI",defaultValue:""},iconInitials:{type:"string",defaultValue:""},iconAlt:{type:"string",defaultValue:""},iconBackgroundColor:{type:"sap.m.AvatarColor",defaultValue:c.Transparent}},aggregations:{_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:H});d.prototype.init=function(){B.prototype.init.apply(this,arguments);this._oRb=C.getLibraryResourceBundle("sap.f");this.data("sap-ui-fastnavgroup","true",true);this._oAriaAvatarText=new I({id:this.getId()+"-ariaAvatarText"});this._oAriaAvatarText.setText(this._oRb.getText("ARIA_HEADER_AVATAR_TEXT"));};d.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oAriaAvatarText){this._oAriaAvatarText.destroy();this._oAriaAvatarText=null;}this._oRb=null;};d.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new T({maxLines:3}).addStyleClass("sapFCardTitle");this.setAggregation("_title",t);}return t;};d.prototype._getSubtitle=function(){var s=this.getAggregation("_subtitle");if(!s){s=new T({maxLines:2}).addStyleClass("sapFCardSubtitle");this.setAggregation("_subtitle",s);}return s;};d.prototype._getAvatar=function(){var o=this.getAggregation("_avatar");if(!o){o=new A().addStyleClass("sapFCardIcon");this.setAggregation("_avatar",o);}return o;};d.prototype.onBeforeRendering=function(){B.prototype.onBeforeRendering.apply(this,arguments);var o=this._getAvatar();this._getTitle().setText(this.getTitle());this._getSubtitle().setText(this.getSubtitle());o.setDisplayShape(this.getIconDisplayShape());o.setSrc(this.getIconSrc());o.setInitials(this.getIconInitials());o.setTooltip(this.getIconAlt());o.setBackgroundColor(this.getIconBackgroundColor());};d.prototype._getAriaLabelledBy=function(){var s="",t="",S="",e="",f="",i;if(this.getParent()&&this.getParent()._ariaText){s=this.getParent()._ariaText.getId();}if(this.getTitle()){t=this._getTitle().getId();}if(this.getSubtitle()){S=this._getSubtitle().getId();}if(this.getStatusText()){e=this.getId()+"-status";}if(this.getIconSrc()||this.getIconInitials()){f=this.getId()+"-ariaAvatarText";}i=s+" "+t+" "+S+" "+e+" "+f;return i.replace(/ {2,}/g,' ').trim();};d.prototype.ontap=function(e){var s=e.srcControl;if(s&&s.getId().indexOf("overflowButton")>-1){return;}this.firePress();};d.prototype.onsapselect=function(){this.firePress();};d.prototype.isLoading=function(){return false;};d.prototype.attachPress=function(){var m=Array.prototype.slice.apply(arguments);m.unshift("press");B.prototype.attachEvent.apply(this,m);this.invalidate();return this;};d.prototype.detachPress=function(){var m=Array.prototype.slice.apply(arguments);m.unshift("press");B.prototype.detachEvent.apply(this,m);this.invalidate();return this;};d.prototype._isInsideGridContainer=function(){var p=this.getParent();if(!p){return false;}p=p.getParent();if(!p){return false;}return p.isA("sap.f.GridContainer");};return d;});