sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(e){"use strict";function n(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var d=n(e);const u={OneColumn:"OneColumn",TwoColumnsStartExpanded:"TwoColumnsStartExpanded",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsStartExpandedEndHidden:"ThreeColumnsStartExpandedEndHidden",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",MidColumnFullScreen:"MidColumnFullScreen",EndColumnFullScreen:"EndColumnFullScreen"};class l extends d{static isValid(e){return!!u[e]}}l.generateTypeAccessors(u);return l});