sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(t){"use strict";function e(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var r=e(t);const n={Center:"Center",Top:"Top",Bottom:"Bottom",Stretch:"Stretch"};class s extends r{static isValid(t){return!!n[t]}}s.generateTypeAccessors(n);return s});