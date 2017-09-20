Ext.namespace("dev.script");

using("lib.jsvm.MenuTree");
using("dev.script.NavPanel");
using("lib.CachedPanel.CachedPanel");

dev.script.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
			id:'ScriptMain',
			statusBar:true,
			region:'center',
			split:true
		}); 
		this.frames.set('Script',this);
		this.frames.set('params',{type:'',name:'',currentDirectory:''});
		this.navPanel =new dev.script.NavPanel(this.frames);
		this.Frame = new Ext.Panel({
				border: false,
				layout: 'border',
				items: [this.navPanel,this.mainPanel]
		});
		return this.Frame;
	},
	doWinLayout:function(win){
		this.navPanel.init();
	}
});