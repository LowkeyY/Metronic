Ext.namespace("dev.scraper");
using("lib.scripteditor.CodeEditor");

dev.scraper.DesignPanel = function(params) {

	this.params = params;
	var ButtonArray = [];

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'new',
				text : '新建'.loc(),
				icon : '/themes/icon/xp/newfile.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : false,
				handler : this.onButtonClick
			}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'save',
				text : '保存'.loc(),
				icon : '/themes/icon/xp/save.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : false,
				handler : this.onButtonClick
			}));

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'updatesave',
				text : '保存'.loc(),
				icon : '/themes/icon/xp/save.gif',
				cls : 'x-btn-text-icon  bmenu',
				state : 'edit',
				disabled : false,
				scope : this,
				hidden : true,
				handler : this.onButtonClick
			}));
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'delete',
				text : '删除'.loc(),
				icon : '/themes/icon/xp/delete.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				hidden : true,
				handler : this.onButtonClick
			}));
	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'debug',
				text : '执行'.loc(),
				icon : '/themes/icon/all/control_play_blue.gif',
				cls : 'x-btn-text-icon  bmenu',
				state : 'edit',
				disabled : false,
				scope : this,
				hidden : false,
				handler : this.onButtonClick
			}));

	ButtonArray.push(new Ext.Toolbar.Separator());

	var xmlCodeEditor = new lib.scripteditor.CodeEditor({
				id : 'xmlCodeValue',
				language : 'xml',
				allowFullScreen : true,
				allowFormatter : true,
				hideLabel : true,
				allowSearchAndReplace : true,
				layout : 'fit',
				allowBlank : false,
				blankText : '请输入萃取引擎协议'.loc()
			});
	ButtonArray = ButtonArray.concat(xmlCodeEditor.getButtons());
	ButtonArray.push(new Ext.Toolbar.Separator());

	this.ScraperForm = new Ext.FormPanel({
		labelWidth : 100,
		region : 'center',
		split : true,
		labelAlign : 'right',
		border : true,
		layout : 'fit',
		bodyStyle : 'padding:0px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
		items : [xmlCodeEditor, {
					xtype : 'hidden',
					name : 'tabId'
				}, {
					xtype : 'hidden',
					name : 'objectId'
				}]
	});
	this.ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '/dev/scraper/create.jcp',
							method : 'GET'
						}),
				reader : new Ext.data.JsonReader({}, ["scraper_name",
								"xmlCodeValue", "object_id", "tabId",
								"lastModifyTime", "lastModifyName"]),
				remoteSort : false
			});
	var id = Ext.id();

	this.ctrlPanel = new Ext.Panel({
		id : id,
		split : true,
		collapseMode : 'mini',
		region : 'south',
		border : false,
		height : 300,
		collapsed : true,
		title : '控制台'.loc(),
		collapsible : true,
		html : '<div id="'
				+ id
				+ '-div" style="background-color:black;color:white;font-size:20px;height:100%;width:100%;overflow:auto;"></div>'
	});

	this.MainPanel = new Ext.Panel({
				id : 'scraperDesigner',
				border : false,
				layout : 'border',
				items : [this.ScraperForm, this.ctrlPanel],
				tbar : ButtonArray
			});
};
dev.scraper.DesignPanel.prototype = {
	init : function(params) {
		this.ScraperForm.form.findField('xmlCodeValue').setValue('');
		if (this.MainPanel.rendered) {
			this.frames.get("Scraper").mainPanel.setStatusValue(['网站萃取'.loc(),
					params.object_id, '无'.loc(), '无'.loc()]);
		}
	},
	newScraper : function(params) {
		this.params = params;
		this.toggleToolBar('create');
	},
	editScraper : function() {
		this.toggleToolBar('edit');
	},
	loadData : function(params) {
		this.params = params;
		this.toggleToolBar('edit');
		this.ds.baseParams = params;
		this.ds.on('load', this.renderForm, this);
		this.ds.load({
					params : {
						start : 0,
						limit : 1
					}
				});
	},
	toggleToolBar : function(state) {
		var tempToolBar = this.MainPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.enable();
				}, tempToolBar.items);
		tempToolBar.items.each(function(item) {
					item.hide();
				}, tempToolBar.items);
		tempToolBar.items.each(function(item) {
					if (item.state == state || item.state == null)
						item.show();
				}, tempToolBar.items);
	},
	disableToolBar : function() {
		var tempToolBar = this.MainPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.disable();
				}, tempToolBar.items);
	},
	renderForm : function() {
		var dss = this.ds.getAt(0).data;
		this.params['tabId'] = dss.tabId;
		this.params['searchName'] = dss.scraper_name;
		this.ScraperForm.form.findField('xmlCodeValue')
				.setValue(dss.xmlCodeValue);
		this.frames.get("Scraper").mainPanel.setStatusValue(['网站萃取'.loc(),
				dss.object_id, dss.lastModifyName, dss.lastModifyTime]);
	},
	showScraper : function(objectId, params) {
		var reportWindow = new dev.textreport.ScraperPreview(objectId, params);
		reportWindow.show();
	},
	onButtonClick : function(item) {
		var Scraper = this.frames.get('Scraper');
		var frm = this.ScraperForm.form;
		if (item.btnId == 'new') {
			this.ScraperForm.form.findField('xmlCodeValue').setValue('');
		} else if (item.btnId == 'save') {
			if (this.params['objectId'] == null) {
				Ext.msg("error", '不能完成保存操作!,必须选择一应用下建立萃取引擎定义'.loc());
			} else {
				var xmlDoc = this.ScraperForm.form.findField('xmlCodeValue')
						.getValue();
				if (xmlDoc != '') {
					using("dev.scraper.SaveWindow");
					var saveWindow = new dev.scraper.SaveWindow(this.params,
							xmlDoc, Scraper);
				} else {
					Ext.msg("error", '不能完成保存操作!,必须输入萃取引擎定义'.loc());
				}
			}
		} else if (item.btnId == 'updatesave') {
			var saveParams = this.ds.baseParams;
			saveParams['type'] = 'updatesave';
			saveParams['xmlCodeValue'] = this.ScraperForm.form
					.findField('xmlCodeValue').getValue();
			frm.submit({
						url : '/dev/scraper/create.jcp',
						params : saveParams,
						method : 'post',
						scope : this,
						success : function(form, action) {
							Ext.msg("info", '完成萃取引擎更新!'.loc());
						},
						failure : function(form, action) {
							Ext.msg("error", '数据提交失败!,原因:'.loc() + '<br>'
											+ action.result.message);
						}
					});
		} else if (item.btnId == 'delete') {
			Ext.msg('confirm', '警告:删除萃取引擎定义将不可恢复,确认吗?'.loc(), function(answer) {
				if (answer == 'yes') {
					var delParams = {};
					delParams['type'] = 'delete';
					delParams['objectId'] = this.ds.baseParams['objectId'];
					frm.submit({
						url : '/dev/scraper/create.jcp',
						params : delParams,
						method : 'post',
						scope : this,
						success : function(form, action) {
							Scraper.navPanel
									.getTree()
									.loadParentNode(Scraper.navPanel.clickEvent);
						},
						failure : function(form, action) {
							Ext.msg("error", '数据提交失败!,原因:'.loc() + '<br>'
											+ action.result.message);
						}
					});
				}
			}.createDelegate(this));
		} else if (item.btnId == 'debug') {
			var id = this.ctrlPanel.id;
			Ext.getDom(id + "-div").innerHTML = "";
			this.ctrlPanel.expand(true);

			Ext.Ajax.request({
				url : "/dev/scraper/debug.jcp",
				method : 'POST',
				scope : this,
				params : {
					id : id,
					tabId : this.params.tabId,
					type : "preview",
					objectId : this.params.objectId,
					_XMLSTRING_ : this.ScraperForm.form
							.findField('xmlCodeValue').getValue()
				},
				success : function(response, options) {
					var counter = 30;
					var mk = setInterval(function() {
						if (counter-- < 0) {
							clearInterval(mk);
						}
						Ext.Ajax.request({
							scope : this,
							url : "/dev/scraper/info.jcp?id=" + id,
							method : 'get',
							success : function(response, options) {
								var r = response.responseText;
								if (r) {
									var d = Ext.getDom(id + "-div");
									var arr = r.split("_tz_");
									for (var i = 0, j = arr.length - 1; i < j; i++) {
										if (arr[i] == 'finish') {
											clearInterval(mk);
										} else {
											var el = document
													.createElement("div");
											el.innerHTML = arr[i];
											d.appendChild(el);
											counter = 30;
										}
									}
								}
							}
						});
					}, 1000);
				}
			});

		}
	}
};
