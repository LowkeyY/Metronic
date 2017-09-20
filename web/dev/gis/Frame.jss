Ext.namespace("dev.gis");

using("lib.jsvm.MenuTree");


loadcss("lib.RowEditorGrid.ListInput");
using("lib.RowEditorGrid.RowEditorGrid");
using("lib.RowEditorGrid.ListInput");

using("lib.ListValueField.ListValueField");
loadcss("lib.IconPicker.IconPicker");
using("lib.IconPicker.IconPicker");
using("dev.gis.IconPicker");

using("lib.ColorField.ColorField");
loadcss("lib.multiselect.Multiselect");
using("lib.multiselect.Multiselect");
using("lib.ComboTree.ComboTree");

using("dev.gis.GisNavPanel");
using("lib.CachedPanel.CachedPanel");


dev.gis.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				id:'GisMain',
				statusBar:true,
				region:'center',
				split:true
		}); 
		this.frames.set('Gis',this);
		this.navPanel =new dev.gis.GisNavPanel(this.frames);
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