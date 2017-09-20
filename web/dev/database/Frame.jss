Ext.namespace("dev.database");

using("lib.jsvm.MenuTree");

loadcss("lib.RowEditorGrid.ListInput");
using("lib.RowEditorGrid.RowEditorGrid");
using("lib.RowEditorGrid.ListInput");
using("lib.ComboTree.ComboTree");
using("dev.database.SpecialSetPanel");
using("dev.database.ColumnEditor");
using("dev.database.ColumnPanel");
using("dev.database.MetaTableNavPanel");

using("lib.CachedPanel.CachedPanel");


dev.database.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				statusBar:true,
				id:'MetaTableMain',
				statusConfig:{
					statusDefine:['数据库连接'.loc(),'ID','修改者'.loc(),'修改时间'.loc()]
				},
				region:'center',
				split:true
		}); 
		this.SpecialSetHash=null;
		Ext.Ajax.request({
				url : '/dev/database/getConstraintName.jcp?catched=true',
				method:"get",
				callback : function(options, success, response) {
					this.SpecialSetHash=Ext.decode(response.responseText);
				}
		});
		this.transSpecialSet=function(value){
		  if(this.SpecialSetHash==null) return false;
			return this.SpecialSetHash[value] || value;
		}
		this.frames.set('SpecialSetHash',this.SpecialSetHash);
		this.frames.set('transSpecialSet',this.transSpecialSet);
		this.frames.set('MetaTable',this);
		this.frames.set('params',{});
		this.navPanel =this.frames.createPanel(new dev.database.MetaTableNavPanel());
		this.Frame = new Ext.Panel({
				border: false,
				layout: 'border',
				items: [this.navPanel,this.mainPanel]
		});
		return this.Frame;
	},
	doWinLayout:function(win){
		this.navPanel.init();
		using("dev.database.KeyWord");
	}
});
