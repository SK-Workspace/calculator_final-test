sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(c){"use strict";function e(c){return c&&typeof c==="object"&&"default"in c?c["default"]:c}var t=e(c);const n={Accent1:"Accent1",Accent2:"Accent2",Accent3:"Accent3",Accent4:"Accent4",Accent5:"Accent5",Accent6:"Accent6",Accent7:"Accent7",Accent8:"Accent8",Accent9:"Accent9",Accent10:"Accent10",Placeholder:"Placeholder"};class A extends t{static isValid(c){return!!n[c]}}A.generateTypeAccessors(n);return A});