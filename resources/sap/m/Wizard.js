/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/delegate/ScrollEnablement","./WizardProgressNavigator","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/Device","./WizardRenderer","sap/ui/core/CustomData","sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(l,C,a,S,W,R,D,b,c,d,L,q){"use strict";var e=l.PageBackgroundDesign;var f=l.WizardRenderMode;var g=C.extend("sap.m.Wizard",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Wizard.designtime",interfaces:["sap.f.IDynamicPageStickyContent"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},showNextButton:{type:"boolean",group:"Behavior",defaultValue:true},finishButtonText:{type:"string",group:"Appearance",defaultValue:"Review"},enableBranching:{type:"boolean",group:"Behavior",defaultValue:false},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:e.Standard},renderMode:{type:"sap.m.WizardRenderMode",group:"Appearance",defaultValue:f.Scroll}},defaultAggregation:"steps",aggregations:{steps:{type:"sap.m.WizardStep",multiple:true,singularName:"step"},_progressNavigator:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{
/**
					 * This association controls the current activated step of the wizard (meaning the last step)
					 * For example if we have A->B->C->D steps, we are on step A and we setCurrentStep(C) A,B and C are going to be activated. D will still remain unvisited.
					 * The parameter needs to be a Wizard step that is part of the current Wizard
					 * @since 1.50
					 */
currentStep:{type:"sap.m.WizardStep",multiple:false}},events:{stepActivate:{parameters:{index:{type:"int"}}},complete:{parameters:{}}},dnd:{draggable:false,droppable:true}}});g.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,ANIMATION_TIME:300,SCROLL_OFFSET:16};R.call(g.prototype,{header:{suffix:"progressNavigator"},content:{suffix:"step-container"}});g.prototype.init=function(){this._iStepCount=0;this._aStepPath=[];this._bScrollLocked=false;this._oScroller=this._initScrollEnablement();this._oResourceBundle=a.getLibraryResourceBundle("sap.m");this._initProgressNavigator();this._initResponsivePaddingsEnablement();};g.prototype.onBeforeRendering=function(){var s=this._getStartingStep();if(!this._isMinStepCountReached()||this._isMaxStepCountExceeded()){L.error("The Wizard is supposed to handle from 3 to 8 steps.");}this._saveInitialValidatedState();if(s&&this._aStepPath.indexOf(s)<0){this._activateStep(s);s._setNumberInvisibleText(1);}};g.prototype.onAfterRendering=function(){if(!this.getCurrentStep()){this.setAssociation("currentStep",this._getStartingStep(),true);}var s=this._getCurrentStepInstance();if(s){this._activateAllPreceedingSteps(s);}this._attachScrollHandler();this._renderPageMode();};g.prototype._renderPageMode=function(s){var i,o,r;if(this.getRenderMode()!==f.Page){return;}if(s){i=this._aStepPath.indexOf(s)+1;o=s;}else{i=this._getProgressNavigator().getCurrentStep();o=this._aStepPath[i-1];}r=a.createRenderManager();r.renderControl(this._updateStepTitleNumber(o,i));r.flush(this.getDomRef("step-container"));r.destroy();};g.prototype._updateStepTitleNumber=function(s,i){var o=s.getCustomData().filter(function(h){return h.getKey()==="stepIndex";})[0];if(o){o.setValue(i);}else{s.addCustomData(new c({key:"stepIndex",value:i}));}return s;};g.prototype.exit=function(){var o=this.getDomRef("step-container");if(o){o.onscroll=null;}this._oScroller.destroy();this._oScroller=null;this._aStepPath=null;this._iStepCount=null;this._bScrollLocked=null;this._oResourceBundle=null;this._bNextButtonPressed=null;};g.prototype.validateStep=function(s){if(!this._containsStep(s)){L.error("The wizard does not contain this step");return this;}s.setValidated(true);return this;};g.prototype.invalidateStep=function(s){if(!this._containsStep(s)){L.error("The wizard does not contain this step");return this;}s.setValidated(false);return this;};g.prototype.nextStep=function(){var i=this._getProgressNavigator().getProgress()-1;var o=this._aStepPath[i];this.validateStep(o);o._complete();return this;};g.prototype.previousStep=function(){var p=this._getProgressNavigator().getProgress()-2;if(p>=0){this.discardProgress(this._aStepPath[p]);}return this;};g.prototype.getProgress=function(){return this._getProgressNavigator().getProgress();};g.prototype.getProgressStep=function(){return this._aStepPath[this.getProgress()-1];};g.prototype.goToStep=function(s,F){var u=function(){var p=this._getProgressNavigator();p&&p._updateCurrentStep(this._aStepPath.indexOf(s)+1);};if(!this.getVisible()||this._aStepPath.indexOf(s)<0){return this;}else if(this.getRenderMode()===f.Page){u.call(this);this._renderPageMode(s);return this;}s._setNumberInvisibleText(this.getProgress());var t=this,m={scrollTop:this._getStepScrollOffset(s)},A={queue:false,duration:g.CONSTANTS.ANIMATION_TIME,start:function(){t._bScrollLocked=true;},complete:function(){t._bScrollLocked=false;u.call(t);if(F||F===undefined){t._focusFirstStepElement(s);}}};q(this.getDomRef("step-container")).animate(m,A);return this;};g.prototype.discardProgress=function(s,p){var P=this.getProgress(),h=this._aStepPath,I=this._aStepPath.indexOf(s),o=this._aStepPath[I],j=I+1;if(j>P||j<=0){L.warning("The given step is either not yet reached, or is not present in the wizard control.");return this;}this._getProgressNavigator().discardProgress(j,true);this._updateProgressNavigator();this._restoreInitialValidatedState(j);for(var i=j;i<h.length;i++){h[i]._deactivate();if(h[i].getSubsequentSteps().length>1){h[i].setNextStep(null);}}this.setAssociation("currentStep",s);o.setWizardContext({sButtonText:this._getNextButtonText(),bLast:true});if(s.getSubsequentSteps().length>1&&!p){s.setNextStep(null);}h.splice(j);return this;};g.prototype.setCurrentStep=function(s){var o=(typeof s==="string")?a.byId(s):s;if(!this.getEnableBranching()){this.setAssociation("currentStep",s,true);}if(o&&this._isStepReachable(o)){this._activateAllPreceedingSteps(o);}else{L.error("The given step could not be set as current step.");}return this;};g.prototype.setShowNextButton=function(v){this.setProperty("showNextButton",v,true);this.getSteps().forEach(function(s){s.setWizardContext({bParentAllowsButtonShow:v});});return this;};g.prototype.getFinishButtonText=function(){if(this.getProperty("finishButtonText")==="Review"){return this._oResourceBundle.getText("WIZARD_FINISH");}else{return this.getProperty("finishButtonText");}};g.prototype.addStep=function(w){if(this._isMaxStepCountExceeded()){L.error("The Wizard is supposed to handle up to 8 steps.");return this;}w.setWizardContext({bParentAllowsButtonShow:this.getShowNextButton()});this._incrementStepCount();return this.addAggregation("steps",w);};g.prototype.setBackgroundDesign=function(B){var s=this.getBackgroundDesign();this.setProperty("backgroundDesign",B,true);this.$().removeClass("sapMWizardBg"+s).addClass("sapMWizardBg"+this.getBackgroundDesign());return this;};g.prototype.insertStep=function(w,i){throw new Error("Dynamic step insertion is not yet supported.");};g.prototype.removeStep=function(w){throw new Error("Dynamic step removal is not yet supported.");};g.prototype.removeAllSteps=function(){this._resetStepCount();return this.removeAllAggregation("steps").map(function(s){return s;},this);};g.prototype.destroySteps=function(){this._resetStepCount();return this.destroyAggregation("steps");};g.prototype._getStickyContent=function(){return this._getProgressNavigator();};g.prototype._returnStickyContent=function(){if(this.bIsDestroyed){return;}this._getStickyContent().$().prependTo(this.$());};g.prototype._setStickySubheaderSticked=function(i){this._bStickyContentSticked=i;};g.prototype._getStickySubheaderSticked=function(){return this._bStickyContentSticked;};g.prototype._activateAllPreceedingSteps=function(s){if(this._aStepPath.indexOf(s)>=0){this.discardProgress(s,true);return;}while(this.getProgressStep()!==s){this.nextStep();}};g.prototype._isNextStepDetermined=function(s,p){if(!this.getEnableBranching()){return true;}s=s||this._getCurrentStepInstance();return this._getNextStep(s,p)!==null;};g.prototype._isStepReachable=function(s){if(this.getEnableBranching()){var o=this._getStartingStep();while(o!==s){o=o._getNextStepReference();if(o==null){return false;}}this.setAssociation("currentStep",s);return true;}else{return this.getSteps().indexOf(s)>=0;}};g.prototype._initScrollEnablement=function(){return new S(this,null,{scrollContainerId:this.getId()+"-step-container",horizontal:false,vertical:true});};g.prototype._initProgressNavigator=function(){var t=this,p=new W(this.getId()+"-progressNavigator",{stepChanged:this._handleStepChanged.bind(this)});p._setOnEnter(function(E,s){var o=t._aStepPath[s];setTimeout(function(){this._focusFirstStepElement(o);}.bind(t),g.CONSTANTS.ANIMATION_TIME);});this.setAggregation("_progressNavigator",p);};g.prototype._handleNextButtonPress=function(){var p=this._getProgressNavigator(),P=p.getProgress(),s=this.isStepFinal();if(s){this.fireComplete();}else{var o=this.getProgressStep();if(!this._isNextStepDetermined(o,P)){throw new Error("The wizard is in branching mode, and the nextStep association is not set.");}this._bNextButtonPressed=true;p.incrementProgress();this._handleStepActivated(p.getProgress());this._handleStepChanged(p.getProgress());}};g.prototype._getStepScrollOffset=function(s){var o=this.getDomRef("step-container"),i=o?o.scrollTop:0,n=this._getNextButton(),p=this._getCurrentStepInstance(),h=0,A=0,j=s.getDomRef()?s.getDomRef().scrollHeight:0,k=o?o.clientHeight:0,m=!!n&&d(p.getDomRef(),n.getDomRef());if(s&&s.$()&&s.$().position()){h=s.$().position().top||0;}if((!D.system.phone&&p&&!m)||(j>k&&this._bNextButtonPressed)){A=n.$().outerHeight();}this._bNextButtonPressed=false;return(i+h)-(g.CONSTANTS.SCROLL_OFFSET+A);};g.prototype._focusFirstStepElement=function(s){var $=s.$();if($&&$.firstFocusableDomRef()){$.firstFocusableDomRef().focus();}};g.prototype._handleStepChanged=function(E){var p=((typeof E==="number")?E:E.getParameter("current"))-2,P=this._aStepPath[p],s=this._getNextStep(P,p),F=D.system.desktop?true:false;this.goToStep(s,F);};g.prototype._handleStepActivated=function(i){var p=i-2,P=this._aStepPath[p],n=this._getNextStep(P,p);this._activateStep(n);this._updateProgressNavigator();this.fireStepActivate({index:i});this.setAssociation("currentStep",this.getProgressStep(),true);this.getProgressStep().setWizardContext({bLast:true,bReviewStep:this.isStepFinal(),sButtonText:this._getNextButtonText()});};g.prototype._isMaxStepCountExceeded=function(){var s=this._getStepCount();if(this.getEnableBranching()){return false;}return s>=g.CONSTANTS.MAXIMUM_STEPS;};g.prototype._isMinStepCountReached=function(){var s=this._getStepCount();return s>=g.CONSTANTS.MINIMUM_STEPS;};g.prototype._getStepCount=function(){return this._iStepCount;};g.prototype._incrementStepCount=function(){this._iStepCount+=1;this._getProgressNavigator().setStepCount(this._getStepCount());};g.prototype._decrementStepCount=function(){this._iStepCount-=1;this._getProgressNavigator().setStepCount(this._getStepCount());};g.prototype._resetStepCount=function(){this._iStepCount=0;this._getProgressNavigator().setStepCount(this._getStepCount());};g.prototype._getProgressNavigator=function(){return this.getAggregation("_progressNavigator");};g.prototype._saveInitialValidatedState=function(){if(this._aInitialValidatedState){return;}this._aInitialValidatedState=this.getSteps().map(function(s){return s.getValidated();});};g.prototype._restoreInitialValidatedState=function(I){var s=this._aStepPath,A=this.getSteps();for(var i=I;i<s.length;i++){var o=s[i],h=A.indexOf(o),j=this._aInitialValidatedState[h];o.setValidated(j);}};g.prototype._getNextStep=function(s,p){if(!this.getEnableBranching()){return this.getSteps()[p+1];}if(p<0){return this._getStartingStep();}var n=s._getNextStepReference();if(n===null){throw new Error("The wizard is in branching mode, and no next step is defined for "+"the current step, please set one.");}if(!this._containsStep(n)){throw new Error("The next step that you have defined is not part of the wizard steps aggregation."+"Please add it to the wizard control.");}var h=s.getSubsequentSteps();if(h.length>0&&!s._containsSubsequentStep(n.getId())){throw new Error("The next step that you have defined is not contained inside the subsequentSteps"+" association of the current step.");}return n;};g.prototype.isStepFinal=function(){var s,i=this._getStepCount(),p=this.getProgress();if(this.getEnableBranching()){s=this._aStepPath[this._aStepPath.length-1]._isLeaf();}else{s=p===i;}return s;};g.prototype._getNextButtonText=function(){if(this.isStepFinal()){return this.getFinishButtonText();}else{return this._oResourceBundle.getText("WIZARD_STEP")+" "+(this.getProgress()+1);}};g.prototype._getNextButton=function(){var s=this._getCurrentStepInstance();if(s){return s.getAggregation("_nextButton");}else{return null;}};g.prototype._updateProgressNavigator=function(){var p=this._getProgressNavigator(),o=this._getStartingStep(),A=this.getSteps(),s=[o.getTitle()],h=[o.getIcon()],i=[o.getOptional()],j=1;if(this.getEnableBranching()){while(!o._isLeaf()&&o._getNextStepReference()!==null){j++;o=o._getNextStepReference();s.push(o.getTitle());i.push(o.getOptional());h.push(o.getIcon());}p.setVaryingStepCount(o._isBranched());p.setStepCount(j);}else{s=A.map(function(k){return k.getTitle();});i=A.map(function(k){return k.getOptional();});h=A.map(function(k){return k.getIcon();});}p.setStepTitles(s);p._aStepOptionalIndication=i;p.setStepIcons(h);};g.prototype._getStartingStep=function(){return this.getSteps()[0];};g.prototype._attachScrollHandler=function(){var o=this.getDomRef("step-container");o.onscroll=this._scrollHandler.bind(this);};g.prototype._scrollHandler=function(E){if(this._bScrollLocked){return;}var s=E.target.scrollTop,p=this._getProgressNavigator(),o=this._aStepPath[p.getCurrentStep()-1],h=o&&o.getDomRef();if(!h){return;}var i=h.clientHeight,j=h.offsetTop,k=100;if(s+k>=j+i&&p._isActiveStep(p._iCurrentStep+1)){p.nextStep();}var m=this.getSteps();for(var n=0;n<m.length;n++){if(s+k<=j){p.previousStep();o=this._aStepPath[p.getCurrentStep()-1];h=o&&o.getDomRef();if(!h){break;}j=h.offsetTop;}}};g.prototype._getCurrentStepInstance=function(){return a.byId(this.getCurrentStep());};g.prototype._containsStep=function(s){return this.getSteps().some(function(o){return o===s;});};g.prototype._checkCircularReference=function(s){if(this._aStepPath.indexOf(s)>=0){throw new Error("The step that you are trying to activate has already been visited. You are creating "+"a loop inside the wizard.");}};g.prototype._activateStep=function(s){this._checkCircularReference(s);this._aStepPath.push(s);s._activate();};return g;});
