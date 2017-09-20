Ext.namespace("dev","dev.dictionary");

using("lib.jsvm.MenuTree");
using("dev.dictionary.OptionPanel");
using("dev.dictionary.NavPanel");
loadcss("dev.dictionary.option");
using("lib.CachedPanel.CachedPanel");

dev.dictionary.OptionFrame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				id:'DictionnaryMain',
				statusBar:true,
				region:'center',
				split:true
		}); 
		this.frames.set('Dictionary',this);
		this.frames.set('nowNodeTitle','公用字典'.loc());
		this.frames.set('params',{});
		this.optionPanel = this.frames.createPanel(new dev.dictionary.OptionPanel());
		this.navPanel =this.frames.createPanel(new dev.dictionary.NavPanel());
		this.Frame = new Ext.Panel({
				border: false,
				layout: 'border',
				items: [this.navPanel,this.mainPanel]
		});   
		this.mainPanel.add(this.optionPanel.MainTabPanel);
		this.mainPanel.setActiveTab(this.optionPanel.MainTabPanel);
		return this.Frame;
	},
	doWinLayout:function(win){
		this.navPanel.init();
	}
});