Ext.namespace("dev.script");

using("lib.scripteditor.CodeEditor");

dev.script.EditPanel = function(frames, params) {
	this.frames = frames;
	this.params = params;
	var ButtonArray = [];
	this.rawState = 'create';
	// this.fileType='jss';
	this.fileType = params["fileType"];
	ButtonArray.push(new Ext.Toolbar.Button({
				text : '返回'.loc(),
				icon : '/themes/icon/xp/undo.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : false,
				handler : function() {
					this.pageReturn();
				}
			}));
	ButtonArray.push(new Ext.Toolbar.Button({
				text : '返回'.loc(),
				icon : '/themes/icon/xp/undo.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				hidden : false,
				handler : function() {
					this.pageReturn();
				}
			}));
	ButtonArray.push(new Ext.Toolbar.Separator());

	ButtonArray.push(new Ext.Toolbar.Button({
				btnId : 'newFile',
				text : '新建'.loc(),
				icon : '/themes/icon/xp/newfile.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : false,
				menu : {
					items : [{
								text : 'JSS程序'.loc(),
								menuId : 'jss',
								checked : true,
								scope : this,
								group : 'scriptType',
								checkHandler : this.itemCheck
							}, {
								text : 'JCP程序'.loc(),
								menuId : 'jcp',
								checked : false,
								scope : this,
								group : 'scriptType',
								checkHandler : this.itemCheck
							}, {
								text : 'CSS样式文件'.loc(),
								menuId : 'css',
								checked : false,
								scope : this,
								group : 'scriptType',
								checkHandler : this.itemCheck
							}, {
								text : 'XML文件'.loc(),
								menuId : 'xml',
								checked : false,
								scope : this,
								group : 'scriptType',
								checkHandler : this.itemCheck
							}]
				}
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

	ButtonArray.push(new Ext.Toolbar.Separator());

	this.jssEditor = new lib.scripteditor.jssEditor({
				params : this.params
			});
	this.jssButtonArray = this.jssEditor.getButtons();
	Ext.each(this.jssButtonArray, function(btn) {
				btn.state = 'jss';
			});
	ButtonArray = ButtonArray.concat(this.jssButtonArray);

	this.jcpEditor = new lib.scripteditor.jcpEditor({
				params : this.params
			});
	this.jcpButtonArray = this.jcpEditor.getButtons();
	Ext.each(this.jcpButtonArray, function(btn) {
				btn.state = 'jcp';
				btn.hidden = true;
			});
	ButtonArray = ButtonArray.concat(this.jcpButtonArray);

	this.xmlCodeEditor = new lib.scripteditor.CodeEditor({
				id : 'xmlCodeValue',
				language : 'xml',
				allowSearchAndReplace : true,
				allowFormatter : true,
				allowFullScreen : true,
				hideLabel : true,
				layout : 'fit',
				allowBlank : false,
				blankText : '请输入XML文本'.loc()
			});

	this.xmlButtonArray = this.xmlCodeEditor.getButtons();
	Ext.each(this.xmlButtonArray, function(btn) {
				btn.state = 'xml';
				btn.hidden = true;
			});
	ButtonArray = ButtonArray.concat(this.xmlButtonArray);
	this.xmlForm = new Ext.FormPanel({
		labelWidth : 100,
		labelAlign : 'right',
		border : true,
		layout : 'fit',
		bodyStyle : 'padding:0px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
		items : this.xmlCodeEditor
	});
	
	this.cssCodeEditor = new lib.scripteditor.CodeEditor({
				id : 'cssCodeValue',
				language : 'css',
				hideLabel : true,
				allowSearchAndReplace : true,
				allowFormatter : true,
				layout : 'fit',
				allowBlank : false,
				blankText : '请输入CSS文本'.loc()
			});
	this.cssButtonArray = this.cssCodeEditor.getButtons();
	Ext.each(this.cssButtonArray, function(btn) {
				btn.state = 'css';
				btn.hidden = true;
			});
	ButtonArray = ButtonArray.concat(this.cssButtonArray);
	this.cssForm = new Ext.FormPanel({
		labelWidth : 100,
		labelAlign : 'right',
		border : true,
		layout : 'fit',
		bodyStyle : 'padding:0px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
		items : this.cssCodeEditor
	});
	ButtonArray.push(new Ext.Toolbar.Separator());

	this.MainTabPanel = new Ext.Panel({
				id : 'scriptEditor',
				border : false,
				layout : 'card',
				activeItem : 0,
				layoutConfig : {
					deferredRender : true
				},
				items : [this.jssEditor.MainPanel, this.jcpEditor.MainPanel,
						this.cssForm, this.xmlForm],
				tbar : ButtonArray
			});
};
dev.script.EditPanel.prototype = {
	init : function(params) {
		if (this.MainTabPanel.rendered) {
			this.frames.get("Script").mainPanel.setStatusValue(['扩展程序'.loc(),
					params.object_id, '无'.loc(), '无'.loc()]);
		}
	},
	newScript : function(params) {
		this.params = params;
		this.rawState = 'create';
		this.enableAllToolBar();
		this.toggleToolBar('create');
	},
	editScript : function() {
		this.enableAllToolBar();
		this.rawState = 'edit';
		this.toggleToolBar('edit');
	},
	loadData : function(params) {
		this.params = params;
		this.params['rand'] = Math.random();
		var mainPanel = this.MainTabPanel;
		var fileName = this.params['fullName'];
		Ext.Ajax.request({
					url : '/dev/script/create.jcp?parent_id='
							+ this.params['parent_id'] + '&fullName='
							+ encodeURI(this.params['fullName']) + '&'
							+ Math.random(),
					method : 'get',
					scope : this,
					success : function(response, options) {
						var check = response.responseText;
						if (fileName.indexOf(".") != -1) {
							this.fileType = fileName.substring(fileName
											.indexOf(".")
											+ 1, fileName.length);
							if (this.fileType == 'jss') {
								mainPanel.layout.setActiveItem(0);
								setTimeout(function() {
											this.jssEditor.setValue(check);
										}.createDelegate(this), 1000);
							} else if (this.fileType == 'jcp') {
								mainPanel.layout.setActiveItem(1);
								setTimeout(function() {
											this.jcpEditor.setValue(check);
										}.createDelegate(this), 1000);
							} else if (this.fileType == 'css') {
								mainPanel.layout.setActiveItem(2);
								setTimeout(function() {
											this.cssForm.form
													.findField('cssCodeValue')
													.setValue(check);
										}.createDelegate(this), 1000);
							} else if (this.fileType == 'xml') {
								mainPanel.layout.setActiveItem(3);
								setTimeout(function() {
											this.xmlForm.form
													.findField('xmlCodeValue')
													.setValue(check);
										}.createDelegate(this), 1000);
							} else {
								mainPanel.layout.setActiveItem(4);
								this.fileType == 'upload'
							}
						} else {
							mainPanel.layout.setActiveItem(4);
							this.fileType == 'upload';
						}
						var state = this.fileType;
						var rawState = this.rawState;
						mainPanel.getTopToolbar().items.each(function(item) {
									item
											.setVisible(typeof(item.state) == 'undefined'
													|| item.state == rawState
													|| item.state == state);
								});
					}
				});
	},
	toggleToolBar : function(state) {
		var tempToolBar = this.MainTabPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.hide();
				}, tempToolBar.items);
		tempToolBar.items.each(function(item) {
					if (item.state == state || item.state == null)
						item.show();
				}, tempToolBar.items);
	},
	disableToolBar : function() {
		var tempToolBar = this.MainTabPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.hide();
				}, tempToolBar.items);
	},
	enableAllToolBar : function() {
		var tempToolBar = this.MainTabPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.enable();
				}, tempToolBar.items);
	},
	disableAllToolBar : function() {
		var tempToolBar = this.MainTabPanel.getTopToolbar();
		tempToolBar.items.each(function(item) {
					item.disable();
				}, tempToolBar.items);
	},
	showScript : function(objectId, params) {
		var reportWindow = new dev.textreport.ScriptPreview(objectId, params);
		reportWindow.show();
	},
	onButtonClick : function(item) {
		var mainPanel = this.MainTabPanel;
		if (item.btnId == 'save') {
			var Script = this.frames.get('Script');
			var saveParams = this.params;
			saveParams['type'] = 'save';
			if (this.fileType != 'upload') {
				Ext.Msg.prompt('提示'.loc(), '输入程序文件名称:'.loc(), function(btn,
						text) {
					if (btn == 'ok') {
						var fileName = text;
						if (/[\<\>\'\"\&]/.test(fileName)) {
							Ext.msg("error", '程序文件名称不应含有有'.loc() + '&,<,>,\",'
											+ '字符'.loc());
							return;
						}
						saveParams['fileName'] = fileName;
						if (fileName.substring(fileName.indexOf(this.fileType),
								fileName.length) != this.fileType) {
							Ext.msg("error", '文件名错误!,原因:必须以'.loc()
											+ this.fileType + '为扩展名'.loc());
							return;
						}
						if (this.fileType == 'jss') {
							saveParams['code'] = this.jssEditor.getValue();
						} else if (this.fileType == 'jcp') {
							saveParams['code'] = this.jcpEditor.getValue();
						} else if (this.fileType == 'css') {
							saveParams['code'] = this.cssForm.form
									.findField('cssCodeValue').getValue();
						} else if (this.fileType == 'xml') {
							saveParams['code'] = this.xmlForm.form
									.findField('xmlCodeValue').getValue();
						}
						Ext.Ajax.request({
									url : '/dev/script/create.jcp',
									params : saveParams,
									method : 'post',
									scope : this,
									success : function(response, options) {
										var check = response.responseText;
										var ajaxResult = Ext.util.JSON
												.decode(check)
										if (ajaxResult.success) {
											Script.navPanel
													.getTree()
													.loadSubNode(
															ajaxResult.id,
															Script.navPanel.clickEvent);
										} else {
											Ext
													.msg(
															"error",
															'数据提交失败!,原因:'.loc()
																	+ '<br>'
																	+ ajaxResult.message);
										}
									}
								});
					} else {
						return;
					}
				}.createDelegate(this), this, false, '.' + this.fileType);
			} else {

			}
		} else if (item.btnId == 'updatesave') {
			var Script = this.frames.get('Script');
			var saveParams = this.params;
			saveParams['type'] = 'updatesave';
			if (this.fileType == 'jss') {
				saveParams['code'] = this.jssEditor.getValue();
			} else if (this.fileType == 'jcp') {
				saveParams['code'] = this.jcpEditor.getValue();
			} else if (this.fileType == 'css') {
				saveParams['code'] = this.cssForm.form
						.findField('cssCodeValue').getValue();
			} else if (this.fileType == 'xml') {
				saveParams['code'] = this.xmlForm.form
						.findField('xmlCodeValue').getValue();
			}
			Ext.Ajax.request({
						url : '/dev/script/create.jcp',
						params : saveParams,
						method : 'post',
						scope : this,
						success : function(response, options) {
							var check = response.responseText;
							var ajaxResult = Ext.util.JSON.decode(check)
							if (ajaxResult.success) {
								Ext.msg("info", '完成程序更新!'.loc());
							} else {
								Ext.msg("error", '程序更新失败!,原因:'.loc() + '<br>'
												+ ajaxResult.message);
							}
						}
					});
		} else if (item.btnId == 'delete') {
			var Script = this.frames.get('Script');
			Ext.msg('confirm', '警告:删除程序将不可恢复,确认吗?'.loc(), function(answer) {
				if (answer == 'yes') {
					var delParams = this.params;
					delParams['type'] = 'delete';
					Ext.Ajax.request({
						url : '/dev/script/create.jcp',
						params : delParams,
						method : 'post',
						scope : this,
						success : function(response, options) {
							var check = response.responseText;
							var ajaxResult = Ext.util.JSON.decode(check)
							if (ajaxResult.success) {
								Script.navPanel
										.getTree()
										.loadParentNode(Script.navPanel.clickEvent);
							} else {
								Ext.msg("error", '程序删除失败!,原因:'.loc() + '<br>'
												+ ajaxResult.message);
							}
						}
					});
				}
			}.createDelegate(this));
		}
	},
	itemCheck : function(item, check) {
		if (check) {
			var mainPanel = this.MainTabPanel;
			var state = item.menuId;
			var rawState = this.rawState;
			mainPanel.getTopToolbar().items.each(function(item) {
						item.setVisible(typeof(item.state) == 'undefined'
								|| item.state == rawState
								|| item.state == state);
					});
			this.fileType = item.menuId;
			if (item.menuId == 'jss') {
				mainPanel.layout.setActiveItem(0);
			} else if (item.menuId == 'jcp') {
				mainPanel.layout.setActiveItem(1);
			} else if (item.menuId == 'css') {
				mainPanel.layout.setActiveItem(2);
			} else if (item.menuId == 'xml') {
				mainPanel.layout.setActiveItem(3);
			} else if (item.menuId == 'upload') {
			}
		}
	},
	pageReturn : function() {
		var Script = this.frames.get('Script');
		if (Script.mainPanel.havePanel("scriptEditor")) {
			Script.mainPanel.removeAll(true);
		}
		if (!Script.mainPanel.havePanel("listPanel")) {
			using("dev.script.FileManager");
			Script.listPanel = new dev.script.FileManager(this.frames,
					this.params);
			Script.mainPanel.add(Script.listPanel);
		} else {
			Script.listPanel.loadFiles(this.frames, this.params);
		}

		Script.mainPanel.setActiveTab("listPanel");
	}
};
