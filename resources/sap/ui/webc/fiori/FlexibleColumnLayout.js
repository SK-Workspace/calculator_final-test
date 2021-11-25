/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/FlexibleColumnLayout"],function(e,l){"use strict";var t=l.FCLLayout;var o=e.extend("sap.ui.webc.fiori.FlexibleColumnLayout",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-flexible-column-layout-ui5",properties:{accessibilityTexts:{type:"object",defaultValue:{}},height:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},hideArrows:{type:"boolean",defaultValue:false},layout:{type:"sap.ui.webc.fiori.FCLLayout",defaultValue:t.OneColumn},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},aggregations:{endColumn:{type:"sap.ui.core.Control",multiple:false,slot:"endColumn"},midColumn:{type:"sap.ui.core.Control",multiple:false,slot:"midColumn"},startColumn:{type:"sap.ui.core.Control",multiple:false,slot:"startColumn"}},events:{layoutChange:{parameters:{layout:{type:"FCLLayout"},columnLayout:{type:"Array"},startColumnVisible:{type:"boolean"},midColumnVisible:{type:"boolean"},endColumnVisible:{type:"boolean"},arrowsUsed:{type:"boolean"},resize:{type:"boolean"}}}},getters:["columnLayout","endColumnVisible","midColumnVisible","startColumnVisible","visibleColumns"]}});return o});