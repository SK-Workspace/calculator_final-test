sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const t=(t,o,s)=>e.html`<div class="ui5-page-root"><header class="ui5-page-header-root" id="ui5-page-header"><slot name="header"></slot></header><section class="ui5-page-content-root" style="${e.styleMap(t.styles.content)}"><slot></slot></section><footer class="ui5-page-footer-root" style="${e.styleMap(t.styles.footer)}"><slot name="footer"></slot></footer></div>`;return t});