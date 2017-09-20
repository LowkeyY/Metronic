Ext.ux.TaskBar=Ext.extend(Ext.Container,{constructor:function(D){this.app=D;this.el=Ext.getBody().createChild({tag:"div",cls:"ux-taskbar"});var C=this.el.createChild({tag:"div",cls:"ux-taskbar-start"});var B=this.el.createChild({tag:"div"});this.startMenu=new Ext.ux.StartMenu(Ext.apply({iconCls:"user",height:300,shadow:true},this.app.startConfig));this.el.unselectable();this.startMenu.on("render",function(E){E.el.unselectable();});this.startButton=new Ext.Button({text:"开始".loc(),id:"ux-startbutton",iconCls:"start",menu:this.startMenu,menuAlign:"bl-tl",renderTo:C,template:new Ext.Template('<table cellspacing="0" class="x-btn-wrap x-btn {3}">','<tbody><tr class="x-btn-with-menu">','<td class="x-btn-left ux-startbutton-left"><i>&#160;</i></td>','<td class="x-btn-center ux-startbutton-center"><em class="{5} unselectable="on">','<button class="start x-btn-text {2}" type="{1}" style="height:30px;">{0}</button>',"</em></td>",'<td class="x-btn-right ux-startbutton-right"><i>&#160;</i></td>',"</tr></tbody>","</table>")});var A=Ext.get("ux-startbutton")?Ext.get("ux-startbutton").getWidth()+10:100;this.quickStartPanel=new Ext.ux.QuickStartPanel({cls:"ux-quickstart-panel",minWidth:60,region:"west",split:true,width:94});this.taskButtonPanel=new Ext.ux.TaskButtonsPanel({cls:"ux-taskbuttons-panel",region:"center"});Ext.ux.TaskBar.superclass.constructor.call(this,{el:this.el,items:[{el:C,minWidth:A,region:"west",split:false,width:A,xtype:"box"},{el:B,items:[this.quickStartPanel,this.taskButtonPanel],layout:"border",region:"center",xtype:"container"}],layout:"border"});},initComponent:function(){Ext.ux.TaskBar.superclass.initComponent.call(this);this.el=Ext.get(this.el)||Ext.getBody();this.el.setHeight=Ext.emptyFn;this.el.setWidth=Ext.emptyFn;this.el.setSize=Ext.emptyFn;this.el.setStyle({overflow:"hidden",margin:"0",border:"0 none"});this.el.dom.scroll="no";this.allowDomMove=false;this.autoWidth=true;this.autoHeight=true;Ext.EventManager.onWindowResize(this.fireResize,this);this.renderTo=this.el;},fireResize:function(A,B){this.fireEvent("resize",this,A,B,A,B);this.onResize(A,B,A,B);},setActiveButton:function(A){this.taskButtonPanel.setActiveButton(A);}});Ext.ux.TaskButtonsPanel=Ext.extend(Ext.BoxComponent,{activeButton:null,enableScroll:true,scrollIncrement:0,scrollRepeatInterval:400,scrollDuration:0.35,animScroll:true,resizeButtons:true,buttonWidth:168,minButtonWidth:118,buttonMargin:2,buttonWidthSet:false,onRender:function(B,A){Ext.ux.TaskButtonsPanel.superclass.onRender.call(this,B,A);if(!this.el){this.el=B.createChild({id:this.id},A);}this.stripWrap=Ext.get(this.el).createChild({cls:"ux-taskbuttons-strip-wrap",cn:{tag:"ul",cls:"ux-taskbuttons-strip"}});this.stripSpacer=Ext.get(this.el).createChild({cls:"ux-taskbuttons-strip-spacer"});this.strip=new Ext.Element(this.stripWrap.dom.firstChild);this.edge=this.strip.createChild({tag:"li",cls:"ux-taskbuttons-edge"});this.strip.createChild({cls:"x-clear"});},initComponent:function(){Ext.ux.TaskButtonsPanel.superclass.initComponent.call(this);this.on("resize",this.delegateUpdates);this.items=[];},add:function(C){var A=this.strip.createChild({tag:"li"},this.edge);var B=new Ext.ux.TaskBar.TaskButton(C,A);this.items.push(B);if(!this.buttonWidthSet){this.lastButtonWidth=B.container.getWidth();}this.setActiveButton(B);return B;},remove:function(D){var B=document.getElementById(D.container.id);D.destroy();B.parentNode.removeChild(B);var E=[];for(var C=0,A=this.items.length;C<A;C++){if(this.items[C]!=D){E.push(this.items[C]);}}this.items=E;this.delegateUpdates();},setActiveButton:function(A){this.activeButton=A;this.delegateUpdates();},delegateUpdates:function(){if(this.resizeButtons&&this.rendered){this.autoSize();}if(this.enableScroll&&this.rendered){this.autoScroll();}},autoSize:function(){var H=this.items.length;var C=this.el.dom.offsetWidth;var A=this.el.dom.clientWidth;if(!this.resizeButtons||H<1||!A){return ;}var J=Math.max(Math.min(Math.floor((A-4)/H)-this.buttonMargin,this.buttonWidth),this.minButtonWidth);var E=this.stripWrap.dom.getElementsByTagName("button");if(E.length>0){this.lastButtonWidth=Ext.get(E[0].id).findParent("li").offsetWidth;for(var F=0,I=E.length;F<I;F++){var B=E[F];var G=Ext.get(E[F].id).findParent("li").offsetWidth;var D=B.offsetWidth;B.style.width=(J-(G-D))+"px";}}},autoScroll:function(){var F=this.items.length;var D=this.el.dom.offsetWidth;var C=this.el.dom.clientWidth;var E=this.stripWrap;var B=E.dom.offsetWidth;var G=this.getScrollPos();var A=this.edge.getOffsetsTo(this.stripWrap)[0]+G;if(!this.enableScroll||F<1||B<20){return ;}E.setWidth(C);if(A<=C){E.dom.scrollLeft=0;if(this.scrolling){this.scrolling=false;this.el.removeClass("x-taskbuttons-scrolling");this.scrollLeft.hide();this.scrollRight.hide();}}else{if(!this.scrolling){this.el.addClass("x-taskbuttons-scrolling");}C-=E.getMargins("lr");E.setWidth(C>20?C:20);if(!this.scrolling){if(!this.scrollLeft){this.createScrollers();}else{this.scrollLeft.show();this.scrollRight.show();}}this.scrolling=true;if(G>(A-C)){E.dom.scrollLeft=A-C;}else{this.scrollToButton(this.activeButton,true);}this.updateScrollButtons();}},createScrollers:function(){var C=this.el.dom.offsetHeight;var A=this.el.insertFirst({cls:"ux-taskbuttons-scroller-left"});A.setHeight(C);A.addClassOnOver("ux-taskbuttons-scroller-left-over");this.leftRepeater=new Ext.util.ClickRepeater(A,{interval:this.scrollRepeatInterval,handler:this.onScrollLeft,scope:this});this.scrollLeft=A;var B=this.el.insertFirst({cls:"ux-taskbuttons-scroller-right"});B.setHeight(C);B.addClassOnOver("ux-taskbuttons-scroller-right-over");this.rightRepeater=new Ext.util.ClickRepeater(B,{interval:this.scrollRepeatInterval,handler:this.onScrollRight,scope:this});this.scrollRight=B;},getScrollWidth:function(){return this.edge.getOffsetsTo(this.stripWrap)[0]+this.getScrollPos();},getScrollPos:function(){return parseInt(this.stripWrap.dom.scrollLeft,10)||0;},getScrollArea:function(){return parseInt(this.stripWrap.dom.clientWidth,10)||0;},getScrollAnim:function(){return{duration:this.scrollDuration,callback:this.updateScrollButtons,scope:this};},getScrollIncrement:function(){return(this.scrollIncrement||this.lastButtonWidth+2);},scrollToButton:function(E,A){E=E.el.dom.parentNode;if(!E){return ;}var C=E;var G=this.getScrollPos(),D=this.getScrollArea();var F=Ext.fly(C).getOffsetsTo(this.stripWrap)[0]+G;var B=F+C.offsetWidth;if(F<G){this.scrollTo(F,A);}else{if(B>(G+D)){this.scrollTo(B-D,A);}}},scrollTo:function(B,A){this.stripWrap.scrollTo("left",B,A?this.getScrollAnim():false);if(!A){this.updateScrollButtons();}},onScrollRight:function(){var A=this.getScrollWidth()-this.getScrollArea();var C=this.getScrollPos();var B=Math.min(A,C+this.getScrollIncrement());if(B!=C){this.scrollTo(B,this.animScroll);}},onScrollLeft:function(){var B=this.getScrollPos();var A=Math.max(0,B-this.getScrollIncrement());if(A!=B){this.scrollTo(A,this.animScroll);}},updateScrollButtons:function(){var A=this.getScrollPos();this.scrollLeft[A==0?"addClass":"removeClass"]("ux-taskbuttons-scroller-left-disabled");this.scrollRight[A>=(this.getScrollWidth()-this.getScrollArea())?"addClass":"removeClass"]("ux-taskbuttons-scroller-right-disabled");}});Ext.ux.TaskBar.TaskButton=function(B,A){this.win=B;Ext.ux.TaskBar.TaskButton.superclass.constructor.call(this,{icon:B.icon,iconCls:B.iconCls,text:Ext.util.Format.ellipsis(B.title,12),tooltip:B.taskbuttonTooltip||B.title,renderTo:A,handler:function(){if(B.minimized||B.hidden){B.show();}else{if(B==B.manager.getActive()){B.minimize();}else{B.toFront();}}},clickEvent:"mousedown",template:new Ext.Template('<table cellspacing="0" class="x-btn-wrap x-btn {3}">',"<tbody><tr>",'<td class="x-btn-left ux-taskbutton-left"><i>&#160;</i></td>','<td class="x-btn-center ux-taskbutton-center"><em class="{5} unselectable="on">','<button class="x-btn-text {2}" type="{1}" style="height:28px;">{0}</button>',"</em></td>",'<td class="x-btn-right ux-taskbutton-right"><i>&#160;</i></td>',"</tr></tbody>","</table>")});};Ext.extend(Ext.ux.TaskBar.TaskButton,Ext.Button,{onRender:function(){Ext.ux.TaskBar.TaskButton.superclass.onRender.apply(this,arguments);this.cmenu=new Ext.menu.Menu({items:[{text:"恢复".loc(),handler:function(){if(!this.win.isVisible()){this.win.show();}else{this.win.restore();}},scope:this},{text:"最小化".loc(),handler:this.win.minimize,scope:this.win},{text:"最大化".loc(),handler:this.win.maximize,scope:this.win},"-",{text:"关闭".loc(),handler:this.closeWin.createDelegate(this,this.win,true),scope:this.win}]});this.cmenu.on("beforeshow",function(){var B=this.cmenu.items.items;var A=this.win;B[0].setDisabled(A.maximized!==true&&A.hidden!==true);B[1].setDisabled(A.minimized===true);B[2].setDisabled(A.maximized===true||A.hidden===true);B[2].setDisabled(A.maximizable===false);B[3].setDisabled(A.closable===false);},this);this.el.on("contextmenu",function(B){B.stopEvent();if(!this.cmenu.el){this.cmenu.render();}var A=B.getXY();A[1]-=this.cmenu.el.getHeight();this.cmenu.showAt(A);},this);},closeWin:function(A,C,B){if(!B.isVisible()){B.show();}else{B.restore();}B.close(true);},setText:function(A){if(A){this.text=A;if(this.el){this.el.child("td.x-btn-center "+this.buttonSelector).update(Ext.util.Format.ellipsis(A,12));}}},setTooltip:function(B){if(B){this.tooltip=B;var A=this.el.child(this.buttonSelector);Ext.QuickTips.unregister(A.id);if(typeof this.tooltip=="object"){Ext.QuickTips.register(Ext.apply({target:A.id},this.tooltip));}else{A.dom[this.tooltipType]=this.tooltip;}}}});Ext.ux.QuickStartPanel=Ext.extend(Ext.BoxComponent,{enableMenu:true,onRender:function(B,A){Ext.ux.QuickStartPanel.superclass.onRender.call(this,B,A);if(!this.el){this.el=B.createChild({id:this.id},A);}this.stripWrap=Ext.get(this.el).createChild({cls:"ux-quickstart-strip-wrap",cn:{tag:"ul",cls:"ux-quickstart-strip"}});this.stripSpacer=Ext.get(this.el).createChild({cls:"ux-quickstart-strip-spacer"});this.strip=new Ext.Element(this.stripWrap.dom.firstChild);this.edge=this.strip.createChild({tag:"li",cls:"ux-quickstart-edge"});this.strip.createChild({cls:"x-clear"});},initComponent:function(){Ext.ux.QuickStartPanel.superclass.initComponent.call(this);this.on("resize",this.delegateUpdates);this.menu=new Ext.menu.Menu();this.items=[];},add:function(B){var A=this.strip.createChild({tag:"li"},this.edge);var C=new Ext.Button(Ext.apply(B,{cls:"x-btn-icon",menuText:B.text,renderTo:A,text:"",template:new Ext.Template('<table cellspacing="0" class="x-btn-wrap x-btn {3}">',"<tbody><tr>",'<td class="x-btn-left"><i>&#160;</i></td>','<td class="x-btn-center"><em class="{5} unselectable="on">','<button class="x-btn-text {2}" type="{1}">{0}</button>',"</em></td>",'<td class="x-btn-right"><i>&#160;</i></td>',"</tr></tbody>","</table>")}));this.items.push(C);this.delegateUpdates();return C;},remove:function(D){var B=document.getElementById(D.container.id);D.destroy();B.parentNode.removeChild(B);var E=[];for(var C=0,A=this.items.length;C<A;C++){if(this.items[C]!=D){E.push(this.items[C]);}}this.items=E;this.delegateUpdates();},menuAdd:function(A){this.menu.add(A);},delegateUpdates:function(){if(this.enableMenu&&this.rendered){this.showButtons();this.clearMenu();this.autoMenu();}},showButtons:function(){var B=this.items.length;for(var A=0;A<B;A++){this.items[A].show();}},clearMenu:function(){this.menu.removeAll();},autoMenu:function(){var K=this.items.length;var E=this.el.dom.offsetWidth;var J=this.el.dom.clientWidth;var B=this.stripWrap;var H=B.dom.offsetWidth;var G=this.edge.getOffsetsTo(this.stripWrap)[0];if(!this.enableMenu||K<1||H<20){return ;}B.setWidth(J);if(G<=J){if(this.showingMenu){this.showingMenu=false;this.menuButton.hide();}}else{J-=B.getMargins("lr");B.setWidth(J>20?J:20);if(!this.showingMenu){if(!this.menuButton){this.createMenuButton();}else{this.menuButton.show();}}var F=this.getMenuButtonPos();for(var I=K-1;I>=0;I--){var A=this.items[I].el.dom.offsetLeft+this.items[I].el.dom.offsetWidth;if(A>F){this.items[I].hide();var C=this.items[I].initialConfig;var D={iconCls:C.iconCls,handler:C.handler.createDelegate(this.items[I]),scope:C.scope,text:C.menuText};this.menuAdd(D);}else{this.items[I].show();}}this.showingMenu=true;}},createMenuButton:function(){var B=this.el.dom.offsetHeight;var C=this.el.insertFirst({cls:"ux-quickstart-menubutton-wrap"});C.setHeight(B);var A=new Ext.Button({cls:"x-btn-icon",id:"ux-quickstart-menubutton",menu:this.menu,renderTo:C,text:"",menuText:"More",template:new Ext.Template('<table cellspacing="0" class="x-btn-wrap x-btn x-btn-icon">','<tbody><tr class=" x-btn-with-menu">','<td class="x-btn-left"><i>&#160;</i></td>','<td class="x-btn-center"><em  unselectable="on">','<button class="x-btn-text " type="button">{0}</button>',"</em></td>",'<td class="x-btn-right"><i>&#160;</i></td>',"</tr></tbody>","</table>")});A.on("render",function(){C.setWidth(Ext.get("ux-quickstart-menubutton").getWidth());},this);this.menuButton=C;},getMenuButtonPos:function(){return this.menuButton.dom.offsetLeft;}});