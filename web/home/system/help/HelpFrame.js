Ext.namespace("home.system.help");using("lib.jsvm.MenuTree");useJS(["/lib/FCKeditor/fckeditor.js","/lib/FCKeditor/ExtFckeditor.js"],function(){});using("home.system.help.HelpPanel");using("home.system.help.HelpNavPanel");using("home.system.help.HelpPublishPanel");using("home.system.help.HelpDetailPanel");home.system.help.HelpFrame=Ext.extend(WorkBench.baseNode,{init:function(launcher){},main:function(){this.mainPanel=new Ext.Panel({id:"HelpMain",region:"center",collapsible:false,split:true,layout:"fit",margins:"0 0 0 0",items:[{id:"welcome.html",title:"欢迎".loc(),closable:false,autoScroll:true,autoLoad:{url:"/home/system/help/welcome.html",scripts:true}}]});this.frames.set("Help",this);this.frames.set("params",{});this.navPanel=new home.system.help.HelpNavPanel(this.frames);this.Frame=new Ext.Panel({border:false,layout:"border",items:[this.navPanel,this.mainPanel]});this.navPanel.on("render",function(){this.navPanel.init();},this);return this.Frame;}});