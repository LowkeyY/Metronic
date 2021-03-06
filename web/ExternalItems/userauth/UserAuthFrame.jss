Ext.namespace("ExternalItems.userauth");

using("lib.jsvm.MenuTree");
using("ExternalItems.userauth.UserAuthNavPanel");
loadcss("bin.user.data-view");
using("lib.CachedPanel.CachedPanel");
using("ExternalItems.userauth.UserAuthListPanel");

ExternalItems.userauth.UserAuthFrame = Ext.extend(WorkBench.baseNode, {
	main : function(launcher) {
		this.mainPanel = new lib.CachedPanel.CachedPanel({
			id : 'UserAuthMain',
			statusBar : false,
			region : 'center',
			split : true
		});
		this.frames.set('state', 'list');
		this.frames.set('UserAuth', this);
		this.navPanel = this.frames.createPanel(new ExternalItems.userauth.UserAuthNavPanel(this));
		this.Frame = new Ext.Panel({
			border : false,
			layout : 'border',
			items : [this.navPanel, this.mainPanel]
		});
		Ext.Ajax.request({
			url : '/ExternalItems/userauth/getMenuJson.jcp',
			method : 'post',
			scope : this,
			success : function(response, options) {
				this.menuDatas = Ext.decode(response.responseText).data;
				this.UserAuthListPanel = this.frames.createPanel(new ExternalItems.userauth.UserAuthListPanel(this));
				this.mainPanel.add(this.UserAuthListPanel.MainTabPanel);
				this.mainPanel.setActiveTab(this.UserAuthListPanel.MainTabPanel);
			}
		});
		return this.Frame;

	},
	doWinLayout : function(win) {
		this.navPanel.init();
	}
});