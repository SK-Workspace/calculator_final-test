sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/types/CSSColor","sap/ui/webc/common/thirdparty/base/types/ItemNavigationBehavior","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/FeaturesRegistry","./generated/templates/ColorPaletteTemplate.lit","./generated/templates/ColorPaletteDialogTemplate.lit","./ColorPaletteItem","./generated/i18n/i18n-defaults","./generated/themes/ColorPalette.css","./generated/themes/ColorPaletteStaticArea.css"],function(e,t,o,r,s,i,l,a,n,c,h,u,C,d){"use strict";function g(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var p=g(e);var m=g(t);var _=g(r);var y=g(s);var f=g(i);const w={tag:"ui5-color-palette",managedSlots:true,properties:{showRecentColors:{type:Boolean},showMoreColors:{type:Boolean},_selectedColor:{type:y}},slots:{default:{propertyName:"colors",type:HTMLElement,invalidateOnChildChange:true,individualSlots:true}},events:{"item-click":{details:{color:{type:String}}}}};class b extends p{static get metadata(){return w}static get render(){return m}static get styles(){return C}static get staticAreaStyles(){return d}static get template(){return n}static get staticAreaTemplate(){return c}static get dependencies(){const e=a.getFeature("ColorPaletteMoreColors");return[h].concat(e?e.dependencies:[])}static async onDefine(){await o.fetchI18nBundle("@ui5/webcomponents")}constructor(){super();this.i18nBundle=o.getI18nBundle("@ui5/webcomponents");this._itemNavigation=new _(this,{getItemsCallback:()=>this.displayedColors,rowSize:5,behavior:f.Cyclic});this._recentColors=[]}onBeforeRendering(){this.displayedColors.forEach((e,t)=>{e.index=t+1});if(this.showMoreColors){const e=a.getFeature("ColorPaletteMoreColors");if(e){this.moreColorsFeature=new e}else{throw new Error(`You have to import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js" module to use the more-colors functionality.`)}}}selectColor(e){e.focus();if(this.displayedColors.includes(e)){this._itemNavigation.setCurrentItem(e)}this._setColor(e.value)}_setColor(e){this._selectedColor=e;if(this._recentColors[0]!==this._selectedColor){if(this._recentColors.includes(this._selectedColor)){this._recentColors.unshift(this._recentColors.splice(this._recentColors.indexOf(this._selectedColor),1)[0])}else{this._recentColors.unshift(this._selectedColor)}}this.fireEvent("item-click",{color:this._selectedColor})}_onclick(e){if(e.target.localName==="ui5-color-palette-item"){this.selectColor(e.target)}}_onkeyup(e){if(l.isSpace(e)){e.preventDefault();this.selectColor(e.target)}}_onkeydown(e){if(l.isEnter(e)){this.selectColor(e.target)}}async _chooseCustomColor(){const e=await this.getColorPicker();this._setColor(e.color);this._closeDialog()}async _closeDialog(){const e=await this._getDialog();e.close()}async _openMoreColorsDialog(){const e=await this._getDialog();e.show()}get selectedColor(){return this._selectedColor}get displayedColors(){return this.colors.filter(e=>e.value).slice(0,15)}get colorContainerLabel(){return this.i18nBundle.getText(u.COLORPALETTE_CONTAINER_LABEL)}get colorPaleteMoreColorsText(){return this.i18nBundle.getText(u.COLOR_PALETTE_MORE_COLORS_TEXT)}get _showMoreColors(){return this.showMoreColors&&this.moreColorsFeature}get recentColors(){if(this._recentColors.length>5){this._recentColors=this._recentColors.slice(0,5)}while(this._recentColors.length<5){this._recentColors.push("")}return this._recentColors}async _getDialog(){const e=await this.getStaticAreaItemDomRef();return e.querySelector("[ui5-dialog]")}async getColorPicker(){const e=await this._getDialog();return e.content[0].querySelector("[ui5-color-picker]")}}b.define();return b});