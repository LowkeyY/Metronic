Ext.namespace("dev.potal");

using("lib.jsvm.MenuTree");
using("dev.potal.NavPanel");
using("dev.potal.MenuMainPanel");
using("lib.CachedPanel.CachedPanel");


dev.potal.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.mainPanel=new lib.CachedPanel.CachedPanel({
				id:'PotalsMain',
				statusBar:true,
				region:'center',
				split:true
				
		}); 
		this.frames.set('Potals',this);
		this.frames.set('params',{});
		this.navPanel =new dev.potal.NavPanel(this.frames);
		this.Frame = new Ext.Panel({
				border: false,
				layout: 'border',
				items: [this.navPanel,this.mainPanel]
		});
		Ext.Ajax.request({
			url : '/potal/model/defaultMenu.json?'+Math.random(),
			method : 'get',
			scope : this,
			success : function(response, options) {
				var result = Ext.decode(response.responseText);
				this.MenuMianPanel = this.frames.createPanel(new dev.potal.MenuMainPanel(result));
				this.mainPanel.add(this.MenuMianPanel.MainTabPanel);
				this.mainPanel.setActiveTab(this.MenuMianPanel.MainTabPanel);
			}
		});
		return this.Frame;
	},
	doWinLayout:function(win){
		this.navPanel.init();
	}
});