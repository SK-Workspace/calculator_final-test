sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(e){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var i=t(e);const n={Information:"Information",Positive:"Positive",Negative:"Negative",Warning:"Warning"};class a extends i{static isValid(e){return!!n[e]}}a.generateTypeAccessors(n);return a});