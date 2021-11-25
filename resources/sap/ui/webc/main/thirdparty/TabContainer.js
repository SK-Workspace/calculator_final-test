sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/delegate/ScrollEnablement","sap/ui/webc/common/thirdparty/base/animations/slideDown","sap/ui/webc/common/thirdparty/base/animations/slideUp","sap/ui/webc/common/thirdparty/base/types/AnimationMode","sap/ui/webc/common/thirdparty/base/config/AnimationMode","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/MediaRange","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/icons/slim-arrow-up","sap/ui/webc/common/thirdparty/icons/slim-arrow-down","sap/ui/webc/common/thirdparty/icons/slim-arrow-left","sap/ui/webc/common/thirdparty/icons/slim-arrow-right","./generated/i18n/i18n-defaults","./Button","./Icon","./List","./ResponsivePopover","./types/TabContainerTabsPlacement","./generated/templates/TabContainerTemplate.lit","./generated/templates/TabContainerPopoverTemplate.lit","./generated/themes/TabContainer.css","./generated/themes/ResponsivePopoverCommon.css","./types/TabLayout"],function(e,t,i,s,r,o,a,n,l,c,h,d,u,p,_,m,b,f,g,w,y,v,S,C,A,T,R){"use strict";function E(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var I=E(e);var B=E(t);var L=E(i);var N=E(s);var H=E(r);var M=E(o);var P=E(a);var O=E(l);var x=E(h);const k=128;const D=[];const W=[];const q={tag:"ui5-tabcontainer",languageAware:true,managedSlots:true,slots:{default:{propertyName:"items",type:HTMLElement,individualSlots:true,invalidateOnChildChange:{properties:true,slots:false}},overflowButton:{type:HTMLElement}},properties:{fixed:{type:Boolean},collapsed:{type:Boolean},tabsPlacement:{type:v,defaultValue:v.Top},showOverflow:{type:Boolean},tabLayout:{type:String,defaultValue:R.Standard},mediaRange:{type:String},_selectedTab:{type:Object},_scrollable:{type:Boolean,noAttribute:true},_scrollableBack:{type:Boolean,noAttribute:true},_scrollableForward:{type:Boolean,noAttribute:true},_animationRunning:{type:Boolean,noAttribute:true},_contentCollapsed:{type:Boolean,noAttribute:true}},events:{"tab-select":{detail:{tab:{type:HTMLElement},tabIndex:{type:Number}}}}};class F extends I{static get metadata(){return q}static get styles(){return[D,A]}static get staticAreaStyles(){return[T,W]}static get render(){return B}static get template(){return S}static get staticAreaTemplate(){return C}static registerTabStyles(e){D.push(e)}static registerStaticAreaTabStyles(e){W.push(e)}constructor(){super();this._handleResize=this._handleResize.bind(this);this._scrollEnablement=new N(this);this._scrollEnablement.attachEvent("scroll",this._updateScrolling.bind(this));this._itemNavigation=new O(this,{getItemsCallback:()=>this._getTabs()});this.i18nBundle=d.getI18nBundle("@ui5/webcomponents")}onBeforeRendering(){this.items.filter(e=>!e.isSeparator).forEach((e,t,i)=>{e._isInline=this.tabLayout===R.Inline;e._mixedMode=this.mixedMode;e._posinset=t+1;e._setsize=i.length;e._getTabContainerHeaderItemCallback=t=>this.getDomRef().querySelector(`#${e._id}`);e._itemSelectCallback=this._onItemSelect.bind(this)});if(!this._animationRunning){this._contentCollapsed=this.collapsed}}onAfterRendering(){this._scrollEnablement.scrollContainer=this._getHeaderScrollContainer();this._updateScrolling()}onEnterDOM(){L.register(this._getHeader(),this._handleResize)}onExitDOM(){L.deregister(this._getHeader(),this._handleResize)}_onTablistFocusin(e){const t=e.target;if(!this._scrollable||!t.classList.contains("ui5-tab-strip-item")){return}const i=this._getHeaderScrollContainer();const s=this.shadowRoot.querySelector(".ui5-tc__headerArrowLeft").offsetWidth;const r=this.shadowRoot.querySelector(".ui5-tc__headerArrowRight").offsetWidth;if(this._scrollableBack&&t.offsetLeft-s<i.scrollLeft){this._scrollEnablement.move(t.offsetLeft-s-i.scrollLeft,0,true);this._updateScrolling()}else if(this._scrollableForward&&t.offsetLeft+t.offsetWidth>i.scrollLeft+i.offsetWidth-r){this._scrollEnablement.move(t.offsetLeft+t.offsetWidth-i.scrollLeft-i.offsetWidth+r,0,true);this._updateScrolling()}}_onHeaderClick(e){const t=U(e.target);if(!t){return}this._onHeaderItemSelect(t)}_onHeaderKeyDown(e){const t=U(e.target);if(!t){return}if(c.isEnter(e)){this._onHeaderItemSelect(t)}if(c.isSpace(e)){e.preventDefault()}}_onHeaderKeyUp(e){const t=U(e.target);if(!t){return}if(c.isSpace(e)){this._onHeaderItemSelect(t)}}_onHeaderItemSelect(e){if(!e.hasAttribute("disabled")){this._onItemSelect(e)}}_onOverflowListItemSelect(e){this._onItemSelect(e.detail.item);this.responsivePopover.close();this.shadowRoot.querySelector(`#${e.detail.item.id}`).focus()}_onItemSelect(e){const t=$(this.items,t=>t._id===e.id);const i=$(this._getTabs(),t=>t._id===e.id);const s=this.items[t];this.items.forEach((e,i)=>{if(!e.isSeparator){const s=t===i;e.selected=s;if(s){this._itemNavigation.setCurrentItem(e)}}},this);if(this.fixed){this.selectTab(s,i);return}if(!this.animate){this.toggle(s);this.selectTab(s,i);return}this.toggleAnimated(s);this.selectTab(s,i)}async toggleAnimated(e){const t=this.shadowRoot.querySelector(".ui5-tc__content");let i=null;this._animationRunning=true;if(e===this._selectedTab){this.collapsed=!this.collapsed;i=this.collapsed?this.slideContentUp(t):this.slideContentDown(t)}else{i=this.collapsed?this.slideContentDown(t):Promise.resolve();this.collapsed=false}await i;this._contentCollapsed=this.collapsed;this._animationRunning=false}toggle(e){if(e===this._selectedTab){this.collapsed=!this.collapsed}else{this.collapsed=false}}selectTab(e,t){this._selectedTab=e;this.fireEvent("tab-select",{tab:e,tabIndex:t})}slideContentDown(e){return H({element:e}).promise()}slideContentUp(e){return M({element:e}).promise()}async _onOverflowButtonClick(e){const t=this.overflowButton[0]||this.getDomRef().querySelector(".ui-tc__overflowButton > ui5-button");if(e.target!==t){return}this.responsivePopover=await this._respPopover();if(this.responsivePopover.opened){this.responsivePopover.close()}else{this.responsivePopover.showAt(t)}}_onHeaderBackArrowClick(){this._scrollEnablement.move(-k,0).promise().then(e=>this._updateScrolling())}_onHeaderForwardArrowClick(){this._scrollEnablement.move(k,0).promise().then(e=>this._updateScrolling())}_handleResize(){this._updateScrolling();this._updateMediaRange()}async _closeRespPopover(){this.responsivePopover=await this._respPopover();this.responsivePopover.close()}_updateScrolling(){const e=this._getHeaderScrollContainer();this._scrollable=e.offsetWidth<e.scrollWidth;this._scrollableBack=e.scrollLeft>0;this._scrollableForward=Math.ceil(e.scrollLeft)<e.scrollWidth-e.offsetWidth;if(!this._scrollable){this._closeRespPopover()}}_updateMediaRange(){this.mediaRange=x.getCurrentRange(x.RANGESETS.RANGE_4STEPS,this.getDomRef().offsetWidth)}_getHeader(){return this.shadowRoot.querySelector(`#${this._id}-header`)}_getTabs(){return this.items.filter(e=>!e.isSeparator)}_getHeaderScrollContainer(){return this.shadowRoot.querySelector(`#${this._id}-headerScrollContainer`)}async _respPopover(){const e=await this.getStaticAreaItemDomRef();return e.querySelector(`#${this._id}-overflowMenu`)}get shouldShowOverflow(){return this.showOverflow&&this._scrollable}get classes(){return{root:{"ui5-tc-root":true,"ui5-tc--textOnly":this.textOnly},header:{"ui5-tc__header":true,"ui5-tc__header--scrollable":this._scrollable},headerInnerContainer:{"ui5-tc__headerInnerContainer":true},headerScrollContainer:{"ui-tc__headerScrollContainer":true},headerList:{"ui5-tc__headerList":true},separator:{"ui5-tc__separator":true},headerBackArrow:{"ui5-tc__headerArrow":true,"ui5-tc__headerArrowLeft":true,"ui5-tc__headerArrow--visible":this._scrollableBack},headerForwardArrow:{"ui5-tc__headerArrow":true,"ui5-tc__headerArrowRight":true,"ui5-tc__headerArrow--visible":this._scrollableForward},content:{"ui5-tc__content":true,"ui5-tc__content--collapsed":this._contentCollapsed}}}get mixedMode(){return this.items.some(e=>e.icon)&&this.items.some(e=>e.text)}get textOnly(){return this.items.every(e=>!e.icon)}get previousIconACCName(){return this.i18nBundle.getText(b.TABCONTAINER_PREVIOUS_ICON_ACC_NAME)}get nextIconACCName(){return this.i18nBundle.getText(b.TABCONTAINER_NEXT_ICON_ACC_NAME)}get overflowMenuTitle(){return this.i18nBundle.getText(b.TABCONTAINER_OVERFLOW_MENU_TITLE)}get tabsAtTheBottom(){return this.tabsPlacement===v.Bottom}get overflowMenuIcon(){return this.tabsAtTheBottom?"slim-arrow-up":"slim-arrow-down"}get animate(){return n.getAnimationMode()!==P.None}static get dependencies(){return[f,g,w,y]}static async onDefine(){await d.fetchI18nBundle("@ui5/webcomponents")}}const z=e=>e.localName==="li"&&e.getAttribute("role")==="tab";const U=e=>{while(e){if(z(e)){return e}e=e.parentElement}return false};const $=(e,t)=>{for(let i=0;i<e.length;i++){const s=t(e[i]);if(s){return i}}return-1};F.define();return F});