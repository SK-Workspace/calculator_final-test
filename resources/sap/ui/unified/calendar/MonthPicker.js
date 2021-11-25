/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/Device','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/library','sap/ui/core/Locale',"./MonthPickerRenderer","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/unified/DateRange",'sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate'],function(C,D,L,I,l,a,M,q,K,c,d,e){"use strict";var f=12,g=2,O={OneYearBackward:-1,OneYearForward:1};var h=C.extend("sap.ui.unified.calendar.MonthPicker",{metadata:{library:"sap.ui.unified",properties:{month:{type:"int",group:"Data",defaultValue:0},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},columns:{type:"int",group:"Appearance",defaultValue:3},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},_firstMonth:{type:"int",group:"Data",visibility:"hidden",defaultValue:0},_focusedMonth:{type:"int",group:"Data",visibility:"hidden"}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{},pageChange:{}}}});h.prototype.init=function(){var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this._iMinMonth=0;this._iMaxMonth=11;};h.prototype.onAfterRendering=function(){_.call(this);m.call(this);this._oItemNavigation.focusItem(this.getProperty("_focusedMonth")%this.getMonths());};h.prototype.setMonth=function(i){this.setProperty("month",i);this.setProperty("_focusedMonth",i);this.setProperty("_firstMonth",Math.floor(i/this.getMonths())*this.getMonths());i=this.getProperty("month");if(i<0||i>11){throw new Error("Property month must be between 0 and 11; "+this);}if(this.getIntervalSelection()){this._oItemNavigation&&this._oItemNavigation.focusItem(i);return this;}if(this.getDomRef()){if(this.getMonths()<12){var s=this.getStartMonth();if(i>=s&&i<=s+this.getMonths()-1){this._selectMonth(i,true);this._oItemNavigation.focusItem(i-s);}else{n.call(this,i);}}else{this._selectMonth(i,true);this._oItemNavigation.focusItem(i);}}return this;};h.prototype.getSelectedDates=function(){if(this._oSelectedDatesControlOrigin){return this._oSelectedDatesControlOrigin.getSelectedDates();}return this.getAggregation("selectedDates");};h.prototype._getSelectedDates=function(){var s=this.getSelectedDates(),o;if(s){return s;}else if(!this._aMPSelectedDates||!this._aMPSelectedDates.length){this._aMPSelectedDates=[new c()];o=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());o.setMonth(this.getMonth(),1);this._iYear&&o.setYear(this._iYear);this._aMPSelectedDates[0].setStartDate(o.toLocalJSDate());return this._aMPSelectedDates;}else{return this._aMPSelectedDates;}};h.prototype.exit=function(){if(this._aMPSelectedDates&&this._aMPSelectedDates.length){this._aMPSelectedDates.forEach(function(o){o.destroy();});this._aMPSelectedDates=undefined;}};h.prototype.getFocusDomRef=function(){return this.getDomRef()&&this._oItemNavigation.getItemDomRefs()[this._oItemNavigation.getFocusedIndex()];};h.prototype._setSelectedDatesControlOrigin=function(o){this._oSelectedDatesControlOrigin=o;};h.prototype._setYear=function(y){this._iYear=y;};h.prototype._getLocale=function(){var p=this.getParent();if(p&&p._getLocale){return p._getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};h.prototype._getLocaleData=function(){var p=this.getParent();if(p&&p._getLocaleData){return p._getLocaleData();}else if(!this._oLocaleData){var s=this._getLocale();var o=new a(s);this._oLocaleData=L.getInstance(o);}return this._oLocaleData;};h.prototype.onsapspace=function(E){E.preventDefault();};h.prototype.onsapselect=function(E){var i=this._oItemNavigation.getFocusedIndex();var b=i+this.getStartMonth();if(b>=this._iMinMonth&&b<=this._iMaxMonth){this._selectMonth(b);this.fireSelect();}};h.prototype.onmousedown=function(E){this._oMousedownPosition={clientX:E.clientX,clientY:E.clientY};};h.prototype.onmouseup=function(E){var t=E.target,s=this._getSelectedDates()[0],S,o,i;if(this._bMousedownChange){this._bMousedownChange=false;if(this.getIntervalSelection()&&t.classList.contains("sapUiCalItem")&&s){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());o=s.getEndDate();i=this._extractMonth(t);if(i!==S.getMonth()&&!o){this._selectMonth(i);this._oItemNavigation.focusItem(i);}}this.fireSelect();}else if(D.support.touch&&this._isValueInThreshold(this._oMousedownPosition.clientX,E.clientX,10)&&this._isValueInThreshold(this._oMousedownPosition.clientY,E.clientY,10)){i=this._oItemNavigation.getFocusedIndex()+this.getStartMonth();if(i>=this._iMinMonth&&i<=this._iMaxMonth){this._selectMonth(i);this.fireSelect();}}};h.prototype.onmouseover=function(E){var t=E.target,s=this._getSelectedDates()[0],S,F;if(!s){return;}if(s.getStartDate()){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());S.setDate(1);}if(t.classList.contains("sapUiCalItem")){F=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());F.setMonth(this._extractMonth(t),1);this._iYear&&F.setYear(this._iYear);if(this._isSelectionInProgress()){this._markInterval(S,F);}}};h.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}if(!this.getDomRef()){return;}var b=this._oItemNavigation.getItemDomRefs(),o=this._getLocaleData(),p=o.getMonthsStandAlone("wide",this.getPrimaryCalendarType()),i,$;this._bNamesLengthChecked=undefined;this._bLongMonth=false;for(i=0;i<b.length;i++){$=q(b[i]);$.text(p[i]);}m.call(this);};h.prototype.nextPage=function(){var s=this.getStartMonth(),i=this._oItemNavigation.getFocusedIndex(),b=i+s,o=this.getMonths();b=b+o;if(b>f-1){b=f-1;}n.call(this,b);this.setProperty("_firstMonth",(this.getStartMonth()+this.getMonths())%f);return this;};h.prototype.previousPage=function(){var s=this.getStartMonth(),i=this._oItemNavigation.getFocusedIndex(),b=i+s,o=this.getMonths();b=b-o;if(b<0){b=0;}n.call(this,b);this.setProperty("_firstMonth",(this.getStartMonth()-this.getMonths())%f);return this;};h.prototype.setMinMax=function(b,o){var p,$,r,i;if(b==this._iMinMonth&&o==this._iMaxMonth){return this;}b=parseInt(b);if(isNaN(b)||b<0||b>11){b=0;}o=parseInt(o);if(isNaN(o)||o<0||o>11){o=11;}if(b<=o){this._iMinMonth=b;this._iMaxMonth=o;}else{this._iMaxMonth=b;this._iMinMonth=o;}if(this.getDomRef()){p=this._oItemNavigation.getItemDomRefs();for(i=0;i<p.length;i++){$=q(p[i]);r=this._extractMonth(p[i]);if(r<this._iMinMonth||r>this._iMaxMonth){$.addClass("sapUiCalItemDsbl");$.attr("aria-disabled",true);}else{$.removeClass("sapUiCalItemDsbl");$.removeAttr("aria-disabled");}}}return this;};h.prototype.getStartMonth=function(){return this.getProperty("_firstMonth");};h.prototype._isValueInThreshold=function(r,v,t){var i=r-t,u=r+t;return v>=i&&v<=u;};function _(){var r=this.getDomRef(),b=this.$().find(".sapUiCalItem"),i=this.getColumns();if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,j,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,k,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setHomeEndColumnMode(true,true);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]});}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(b);this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(i,true);var o=this.getMonth()-this.getStartMonth();this._oItemNavigation.setFocusedIndex(o);this._oItemNavigation.setPageSize(b.length);}h.prototype._handleAfterFocus=function(o){var i=o.getParameter("index"),E=o.getParameter("event"),t=this._oItemNavigation.aItemDomRefs[i],s=this._getSelectedDates()[0],S,F;if(!E){return;}if(E.type==="mousedown"){this._handleMousedown(E,i);}else if(E.type==="sapnext"||E.type==="sapprevious"){if(!s){return;}if(s.getStartDate()){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());S.setDate(1);}F=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());F.setMonth(this._extractMonth(t),1);this._iYear&&F.setYear(this._iYear);if(this._isSelectionInProgress()){this._markInterval(S,F);}}};function j(o){this._handleAfterFocus(o);}h.prototype._isSelectionInProgress=function(){var s=this._getSelectedDates()[0];if(!s){return false;}return this.getIntervalSelection()&&s.getStartDate()&&!s.getEndDate();};h.prototype._extractMonth=function(o){var i=this.getId().length+g;return parseInt(o.id.slice(i));};h.prototype._markInterval=function(s,E){var b=this._oItemNavigation.getItemDomRefs(),o=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType()),i;if(s.isAfter(E)){E=[s,s=E][0];}if(this._bMousedownChange){q(b[E.getMonth()]).addClass("sapUiCalItemSel");q(b[s.getMonth()]).addClass("sapUiCalItemSel");}for(i=0;i<b.length;++i){o.setMonth(this._extractMonth(b[i]),1);this._iYear&&o.setYear(this._iYear);if(d._isBetween(o,s,E)){q(b[i]).addClass("sapUiCalItemSelBetween");}else{q(b[i]).removeClass("sapUiCalItemSelBetween");}if(this._bMousedownChange&&!o.isSame(s)&&!o.isSame(E)){q(b[i]).removeClass("sapUiCalItemSel");}}};h.prototype._handleMousedown=function(E,i){if(E.button||D.support.touch&&!D.system.combi){return;}var b=i+this.getStartMonth();if(b>=this._iMinMonth&&b<=this._iMaxMonth){this._selectMonth(b);this._bMousedownChange=true;}E.preventDefault();E.setMark("cancelAutoClose");};function k(o){var E=o.getParameter("event"),i=this._oItemNavigation.getFocusedIndex()+this.getStartMonth(),b=this.getMonths(),p=this.getColumns(),s=this._getSelectedDates()[0],S,F=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());this._iYear&&F.setYear(this._iYear);if(s&&s.getStartDate()){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());S.setDate(1);}if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode===K.ARROW_DOWN&&p<=b){if(i<f-b){n.call(this,i+p,false,O.OneYearForward);}else if(b===f){this.firePageChange({offset:O.OneYearForward});this._oItemNavigation.focusItem(i%p);F.setMonth(i%p,1);this.setProperty("_focusedMonth",i%p);this._isSelectionInProgress()&&this._markInterval(S,F);}else{n.call(this,i%p,true,O.OneYearForward);}}else{if(i<f-b){n.call(this,i+1,false,O.OneYearForward);}else if(b===f){this.firePageChange({offset:O.OneYearForward});this._oItemNavigation.focusItem(0);F.setMonth(0,1);this._isSelectionInProgress()&&this._markInterval(S,F);}else{n.call(this,0,true,O.OneYearForward);}}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode===K.ARROW_UP&&p<=b){if(i>=b){n.call(this,i-p,false,O.OneYearBackward);}else if(b===f){this.firePageChange({offset:O.OneYearBackward});this._oItemNavigation.focusItem(b-p+i);F.setMonth(b-p+i,1);this.setProperty("_focusedMonth",b-p+i);this._isSelectionInProgress()&&this._markInterval(S,F);}else{n.call(this,f-p+i,true,O.OneYearBackward);}}else{if(i>=b){n.call(this,i-1,false,O.OneYearBackward);}else if(b===f){this.firePageChange({offset:O.OneYearBackward});this._oItemNavigation.focusItem(b-1);F.setMonth(b-1,1);this._isSelectionInProgress()&&this._markInterval(S,F);}else{n.call(this,f-1,true,O.OneYearBackward);}}break;case"sappagedown":if(i<f-b){n.call(this,i+b,false,O.OneYearForward);}else if(b===f){this.firePageChange({offset:O.OneYearForward});}else{n.call(this,i,true,O.OneYearForward);}break;case"sappageup":if(i>b){n.call(this,i-b,false,O.OneYearBackward);}else if(b===f){this.firePageChange({offset:O.OneYearBackward});}else{n.call(this,i,true,O.OneYearBackward);}break;default:break;}}}h.prototype._selectMonth=function(i,b){var s=this._getSelectedDates()[0],o=this.getAggregation("selectedDates"),S,F;this.setProperty("_focusedMonth",i);if(!s){return;}!b&&this.setProperty("month",i);F=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());F.setMonth(i,1);this._iYear&&F.setYear(this._iYear);if(!this._oSelectedDatesControlOrigin){if(!o||!o.length){this.addAggregation("selectedDates",s,true);}!this.getIntervalSelection()&&s.setStartDate(F.toLocalJSDate());}if(this.getIntervalSelection()&&!b){if(!s.getStartDate()){s.setStartDate(F.toLocalJSDate());}else if(!s.getEndDate()){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());if(F.isBefore(S)){s.setEndDate(S.toLocalJSDate());s.setStartDate(F.toLocalJSDate());}else{s.setEndDate(F.toLocalJSDate());}}else{s.setStartDate(F.toLocalJSDate());s.setEndDate(undefined);}}};function m(){if(!this._bNamesLengthChecked){var i=0,o=this._oItemNavigation.getItemDomRefs(),t=false,p=this.getMonths(),B=Math.ceil(f/p),r=p-1;for(var b=0;b<B;b++){if(p<f){n.call(this,r);r=r+p;if(r>f-1){r=f-1;}}for(i=0;i<o.length;i++){var s=o[i];if(Math.abs(s.clientWidth-s.scrollWidth)>1){t=true;break;}}if(t){break;}}if(p<f){r=this.getMonth();n.call(this,r);}if(t){this._bLongMonth=false;var u=this._getLocaleData(),v=this.getPrimaryCalendarType(),w=u.getMonthsStandAlone("abbreviated",v),x=u.getMonthsStandAlone("wide",v);for(i=0;i<o.length;i++){var $=q(o[i]);$.text(w[i]);$.attr("aria-label",x[i]);}}else{this._bLongMonth=true;}this._bNamesLengthChecked=true;}}function n(i,F,o){var s=this._getSelectedDates()[0],S,b;this.setProperty("_focusedMonth",i);if(s&&s.getStartDate()){S=e.fromLocalJSDate(s.getStartDate(),this.getPrimaryCalendarType());S.setDate(1);}if(s&&s.getEndDate()){b=e.fromLocalJSDate(s.getEndDate(),this.getPrimaryCalendarType());b.setDate(1);}else{b=e.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());this._iYear&&b.setYear(this._iYear);b.setMonth(i,1);}this._isSelectionInProgress()&&this._markInterval(S,b);if(F){this.firePageChange({offset:o});}}h.prototype._fnShouldApplySelection=function(o){var s=this._getSelectedDates()[0],S,E;if(!s){return false;}S=s.getStartDate();E=s.getEndDate();if(S){S=e.fromLocalJSDate(S,this.getPrimaryCalendarType());S.setDate(1);}if(this.getIntervalSelection()&&S&&E){E=e.fromLocalJSDate(E,this.getPrimaryCalendarType());E.setDate(1);if(o.isSame(S)||o.isSame(E)){return true;}}else if(S&&o.isSame(S)){return true;}return false;};h.prototype._fnShouldApplySelectionBetween=function(o){var s=this._getSelectedDates()[0],S,E;if(!s){return false;}S=s.getStartDate();E=s.getEndDate();if(this.getIntervalSelection()&&S&&E){S=e.fromLocalJSDate(S,this.getPrimaryCalendarType());S.setDate(1);E=e.fromLocalJSDate(E,this.getPrimaryCalendarType());E.setDate(1);if(d._isBetween(o,S,E)){return true;}}return false;};return h;});