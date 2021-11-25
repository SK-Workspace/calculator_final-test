sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const s=(s,i,a)=>e.html`${s.showSuggestions?t(s,i,a):undefined}${s.hasValueStateMessage?m(s,i,a):undefined} `;const t=(s,t,a)=>e.html`<${e.scopeTag("ui5-responsive-popover",t,a)} hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${e.styleMap(s.styles.suggestionsPopover)}" @ui5-after-open="${e.ifDefined(s._afterOpenPopover)}" @ui5-after-close="${e.ifDefined(s._afterClosePopover)}" @ui5-scroll="${e.ifDefined(s._scroll)}">${s._isPhone?i(s,t,a):undefined}${!s._isPhone?p(s):undefined}<${e.scopeTag("ui5-list",t,a)} separators="${e.ifDefined(s.suggestionSeparators)}">${e.repeat(s.suggestionsTexts,(e,s)=>e._id||s,(e,i)=>f(e,i,s,t,a))}</${e.scopeTag("ui5-list",t,a)}>${s._isPhone?v(s,t,a):undefined}</${e.scopeTag("ui5-responsive-popover",t,a)}>`;const i=(s,t,i)=>e.html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${e.ifDefined(s._headerTitleText)}</span><${e.scopeTag("ui5-button",t,i)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${s._closeRespPopover}"></${e.scopeTag("ui5-button",t,i)}></div><div class="row"><div class="input-root-phone"><input class="ui5-input-inner-phone" type="${e.ifDefined(s.inputType)}" .value="${e.ifDefined(s.value)}" inner-input placeholder="${e.ifDefined(s.placeholder)}" @input="${s._handleInput}" @change="${s._handleChange}" /></div></div>${s.hasValueStateMessage?a(s):undefined}</div>`;const a=(s,t,i)=>e.html`<div class="row ${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.suggestionPopoverHeader)}">${s.shouldDisplayDefaultValueStateMessage?o(s):n(s)}</div>`;const o=(s,t,i)=>e.html`${e.ifDefined(s.valueStateText)}`;const n=(s,t,i)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>l(e))}`;const l=(s,t,i,a,o)=>e.html`${e.ifDefined(s)}`;const p=(s,t,i)=>e.html`${s.hasValueStateMessage?d(s):undefined}`;const d=(s,t,i)=>e.html`<div slot="header" class="ui5-responsive-popover-header ${e.classMap(s.classes.popoverValueState)}" style=${e.styleMap(s.styles.suggestionPopoverHeader)}>${s.shouldDisplayDefaultValueStateMessage?r(s):u(s)}</div>`;const r=(s,t,i)=>e.html`${e.ifDefined(s.valueStateText)}`;const u=(s,t,i)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>c(e))}`;const c=(s,t,i,a,o)=>e.html`${e.ifDefined(s)}`;const f=(s,t,i,a,o)=>e.html`${s.groupItem?$(s,t,i,a,o):g(s,t,i,a,o)}`;const $=(s,t,i,a,o)=>e.html`<${e.scopeTag("ui5-li-groupheader",a,o)} data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}</${e.scopeTag("ui5-li-groupheader",a,o)}>`;const g=(s,t,i,a,o)=>e.html`<${e.scopeTag("ui5-li-suggestion-item",a,o)} image="${e.ifDefined(s.image)}" icon="${e.ifDefined(s.icon)}" additional-text="${e.ifDefined(s.additionalText)}" type="${e.ifDefined(s.type)}" additional-text-state="${e.ifDefined(s.additionalTextState)}" @ui5-_item-press="${e.ifDefined(s.fnOnSuggestionItemPress)}" data-ui5-key="${e.ifDefined(s.key)}">${e.unsafeHTML(s.text)}${s.description?h(s):undefined}</${e.scopeTag("ui5-li-suggestion-item",a,o)}>`;const h=(s,t,i,a,o)=>e.html`<span slot="richDescription">${e.unsafeHTML(s.description)}</span>`;const v=(s,t,i)=>e.html`<div slot="footer" class="ui5-responsive-popover-footer"><${e.scopeTag("ui5-button",t,i)} design="Transparent" @click="${s._closeRespPopover}">OK</${e.scopeTag("ui5-button",t,i)}></div>`;const m=(s,t,i)=>e.html`<${e.scopeTag("ui5-popover",t,i)} skip-registry-update _disable-initial-focus prevent-focus-restore no-padding hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="Left"><div slot="header" class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverHeader)}">${s.shouldDisplayDefaultValueStateMessage?T(s):D(s)}</div></${e.scopeTag("ui5-popover",t,i)}>`;const T=(s,t,i)=>e.html`${e.ifDefined(s.valueStateText)}`;const D=(s,t,i)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>y(e))}`;const y=(s,t,i,a,o)=>e.html`${e.ifDefined(s)}`;return s});