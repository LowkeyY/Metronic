
Ext.namespace("dev.quality");

using("lib.jsvm.MenuTree");
loadcss("lib.RowEditorGrid.ListInput");
using("lib.RowEditorGrid.RowEditorGrid");
using("lib.CachedPanel.CachedPanel");
using("dev.quality.QualityNavPanel");
using("lib.ComboTree.ComboTree");
using("lib.ComboRemote.ComboRemote");

dev.quality.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				statusBar:true,
				id:'QaulityMain',
				statusConfig:{
					statusDefine:["成果库".loc(),"ID","修改者".loc(),"修改时间".loc()]
				},
				region:'center',
				split:true
		}); 
		this.frames.set('Quality',this);

		this.navPanel =new dev.quality.QualityNavPanel(this.frames);
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