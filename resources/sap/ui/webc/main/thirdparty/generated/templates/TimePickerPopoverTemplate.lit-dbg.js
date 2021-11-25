sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => litRender.html`<${litRender.scopeTag("ui5-responsive-popover", tags, suffix)} id="${litRender.ifDefined(context._id)}-responsive-popover" class="ui5-time-picker-popover" placement-type="Bottom" horizontal-align="Left" allow-target-overlap _hide-header hide-arrow no-stretch stay-open-on-scroll @ui5-after-close="${litRender.ifDefined(context.onResponsivePopoverAfterClose)}" @wheel="${context._handleWheel}"><${litRender.scopeTag("ui5-time-selection", tags, suffix)} id="${litRender.ifDefined(context._id)}-time-sel" value="${litRender.ifDefined(context._timeSelectionValue)}" format-pattern="${litRender.ifDefined(context._formatPattern)}" .hideHours="${litRender.ifDefined(context.hideHours)}" .hideMinutes="${litRender.ifDefined(context.hideMinutes)}" .hideSeconds="${litRender.ifDefined(context.hideSeconds)}" .minutesStep="${litRender.ifDefined(context.minutesStep)}" .secondsStep="${litRender.ifDefined(context.secondsStep)}" .maxHours="${litRender.ifDefined(context.maxHours)}" .maxMinutes="${litRender.ifDefined(context.maxMinutes)}" .maxSeconds="${litRender.ifDefined(context.maxSeconds)}" @ui5-change="${litRender.ifDefined(context.onTimeSelectionChange)}"></${litRender.scopeTag("ui5-time-selection", tags, suffix)}><div slot="footer" class="ui5-time-picker-footer" @keydown=${context._onfooterkeydown}><${litRender.scopeTag("ui5-button", tags, suffix)} id="submit" design="Emphasized" @click="${context.submitPickers}">${litRender.ifDefined(context.submitButtonLabel)}</${litRender.scopeTag("ui5-button", tags, suffix)}><${litRender.scopeTag("ui5-button", tags, suffix)} id="close" design="Transparent" @click="${context.closePicker}">${litRender.ifDefined(context.cancelButtonLabel)}</${litRender.scopeTag("ui5-button", tags, suffix)}></div></${litRender.scopeTag("ui5-responsive-popover", tags, suffix)}>`;

	return block0;

});