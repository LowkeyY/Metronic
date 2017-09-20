Ext.namespace("bin.task");

using("lib.jsvm.MenuTree");
using("bin.task.TaskLogListPanel");
using("bin.task.TaskNavPanel");
using("lib.CachedPanel.CachedPanel");
bin.task.LogFrame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				id:'TaskMain',
				region:'center',
				split:true
		}); 
		this.frames.set('TaskLog',this);
		this.frames.set('Task',this);
		this.taskLogListPanel = this.frames.createPanel(new bin.task.TaskLogListPanel());
		this.navPanel =new bin.task.TaskNavPanel('log',this.frames);
		this.Frame = new Ext.Panel({
				border: false,
				layout: 'border',
				items: [this.navPanel,this.mainPanel]
		});
		this.mainPanel.add(this.taskLogListPanel.MainTabPanel);
		this.mainPanel.setActiveTab(this.taskLogListPanel.MainTabPanel);
		return this.Frame;
	},
	doWinLayout:function(win){
		this.navPanel.init();
	}
});