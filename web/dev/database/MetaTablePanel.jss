Ext.namespace("dev.database");

dev.database.MetaTablePanel = function(panelId, editMode, enableCtrl,
		showCombo, frames, pcpid, describe, object_id, rangeRow) {

	if (!editMode)
		editMode = false;
	if (!Ext.isDefined(rangeRow))
		rangeRow = true;
	this.frames = frames;
	var MetaTable = this.frames.get("MetaTable");
	this.retFn = function(main, id) {
		main.setStatusValue(['表基本信息'.loc()]);
		main.getStatusBar().show();
		main.setActiveTab(id);
	}.createCallback(MetaTable.mainPanel, panelId);

	this.ButtonArray = [];
	this.params = {};
	this.textChangeFlag = false;

	this.booleanDs = new Ext.data.SimpleStore({
				fields : ['id', 'label'],
				data : [['y', '是'.loc()], ['n', '否'.loc()]]
			});

	var spfc;
	if (showCombo) {
		var appUrl = '/dev/database/applicationTree.jcp';
		if (!enableCtrl) {
			appUrl += "?dlk=" + pcpid;
		}
		spfc = new lib.ComboTree.ComboTree({
					fieldLabel : '所属应用'.loc(),
					forceLeaf : true,
					width : 200,
					height : 400,
					queryParam : "type",
					name : 'application_id',
					mode : 'remot',
					qtip : {
						"text" : '当前列表只显示在和被描述表拥有相同数据库连接的应用,如果没有可选项,请先建立包含当前数据库连接的应用'
								.loc(),
						"title" : '填写说明'.loc()
					},
					allowBlank : false,
					root : new Ext.tree.AsyncTreeNode({
								text : '所有应用'.loc(),
								draggable : false,
								id : '0',
								icon : "/themes/icon/all/plugin.gif"
							}),
					loader : new Ext.tree.TreeLoader({
								dataUrl : appUrl,
								requestMethod : "GET"
							})
				});
	} else
		spfc = {
			xtype : 'hidden',
			name : 'application_id',
			value : '-1'
		};

	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '保存'.loc(),
				icon : '/themes/icon/xp/save.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				hidden : false,
				handler : function(btn) {
					var fm = this.metaTableForm.form;
					if (!fm.isValid()) {
						Ext.msg('error', '表单数据填写有误,请根据错误提示修改'.loc());
						return;
					}
					var lname = fm.findField("lname").getValue();
					var pname = fm.findField("pname").getValue();
					var haveAuth = fm.findField('have_auth').getValue();
					var havePmk = false;
					var myGrid = this.columnForm;
					var allRecords = myGrid.store.getRange(0);
					var mlen = (myGrid.enableAppend)
							? allRecords.length - 1
							: allRecords.length;
					for (var i = 0; i < mlen; i++) {
						if (allRecords[i].get("pmk"))
							havePmk = true;
					}
					if (haveAuth && !havePmk) {
						Ext.msg('error', '如果本表需设置数据权限,本表必须有主键'.loc());
						return;
					}
					Ext.Ajax.request({
								url : '/dev/database/create.jcp',
								method : 'PUT',
								params : {
									lname : lname,
									pname : pname,
									haveAuth : haveAuth,
									objectId : this.object_id
								},
								scope : this,
								callback : function(options, success, response) {
									if (success) {
										var ret = Ext
												.decode(response.responseText);
										if (ret.success) {
											Ext.msg("info", '更改成功!'.loc());
											var tree = MetaTable.navPanel
													.getTree();
											tree.loadSelfNode(ret.id,
													Ext.emptyFn);
										} else {
											Ext.msg("error", '更改错误,原因是:'.loc()
															+ ret.messge);
										}
									} else {
										Ext.msg("error", '更改错误,服务器错误!'.loc());
									}
								}
							});
				}
			}));

	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '保存'.loc(),
		icon : '/themes/icon/xp/save.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		state : 'create',
		scope : this,
		hidden : false,
		handler : function() {

			var fm = this.metaTableForm.form;
			if (!fm.isValid()) {
				Ext.msg('error', '表单数据填写有误,请根据错误提示修改'.loc());
				return;
			}

			var storeValue = [];
			var myGrid = this.columnForm;
			var isDescrib = myGrid.editors.length == 3
			myGrid.stopEditing(true);

			var allRecords = myGrid.store.getRange(0);
			if (myGrid.enableAppend) {
				if (allRecords.length < 2) {
					Ext.msg("warn", '必须添加列,在填写完列定义后点击左侧的对勾.'.loc(), {
								fn : function() {
									myGrid.startEditing(0, 0);
								}
							});
					return false;
				}
			} else if (isDescrib) {
				for (var i = 0; i < allRecords.length; i++) {
					if (allRecords[i].data.lname == '') {
						var pap = i;
						Ext.msg("warn", '逻辑列名不能为空'.loc(), {
									fn : function() {
										myGrid.startEditing(pap, 0);
									}
								});
					}
				}
			}
			var havePmk = false;
			var mlen = (myGrid.enableAppend)
					? allRecords.length - 1
					: allRecords.length;
			for (var i = 0; i < mlen; i++) {
				if (allRecords[i].get("pmk"))
					havePmk = true;
				storeValue[i] = allRecords[i].data;
			}
			var haveAuth = fm.findField('have_auth').getValue();
			if (haveAuth && !havePmk) {
				Ext.msg('error', '如果本表需设置数据权限,本表必须有主键'.loc());
				return;
			}

			var returnJson = {
				lname : fm.findField('lname').getValue(),
				pname : fm.findField('pname').getValue(),
				isCreate : fm.findField('isCreate').getValue(),
				constraintConfig : Ext.encode(this.constraintConfig || {}),
				ppid : this.ppid,
				haveAuth : haveAuth,
				application_id : fm.findField('application_id').getValue(),
				fields : Ext.encode(storeValue)
			};
			Ext.Ajax.request({
				url : '/dev/database/create.jcp',
				params : returnJson,
				scope : this,
				callback : function(options, success, response) {
					try {
						var o = Ext.decode(response.responseText);
						if (o.success) {
							var tree = MetaTable.navPanel.getTree();
							if (enableCtrl) {
								var id = Ext.decode(response.responseText).id;
								tree.loadSubNode(id,
										MetaTable.navPanel.clickEvent);
							} else if (describe) {
								var id = Ext.decode(response.responseText).id;
								tree.loadSelfNode(id,
										MetaTable.navPanel.clickTableEvent);
							} else {
								var id = (returnJson.application_id == -1)
										? returnJson.ppid
										: returnJson.application_id;
								tree
										.loadParentNode(MetaTable.navPanel.clickTableEvent);
							}
						} else {
							Ext.msg("error", o.message);
							this.columnForm.startEditing(0, 0);
						}
					} catch (e) {
					}
				}
			});
		}
	}));
	// this.ButtonArray.push(new Ext.Toolbar.Separator(state['caeate'],'-'))

	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '清空'.loc(),
				icon : '/themes/icon/xp/clear.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : false,

				handler : function() {
					var fm = this.metaTableForm.form;
					fm.reset();
	(function		() {
						fm.clearInvalid();
					}).defer(60);
					this.columnForm.clearAll();
				}
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '文档建表'.loc(),
		icon : '/themes/icon/all/page_word.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		state : 'create',
		scope : this,
		hidden : true,
		handler : function() {
			useJS(	['/lib/FCKeditor/fckeditor.js',
							'/lib/FCKeditor/ExtFckeditor.js'], function() {
						using("dev.database.DocFormPanel");
						using("dev.database.docCreatePanel");

						MetaTable.metaDocPanel = this.frames
								.createPanel(new dev.database.DocFormPanel(
										this.frames, this.ppid, this.retFn));
						MetaTable.mainPanel
								.add(MetaTable.metaDocPanel.MainTabPanel);
						MetaTable.mainPanel.getStatusBar().hide();
						MetaTable.mainPanel
								.setActiveTab(MetaTable.metaDocPanel.MainTabPanel);
						var params = {};
						params['parent_id'] = this.ppid;
						MetaTable.metaDocPanel.init(params);
					}.createDelegate(this));
		}
	}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '数据字典下载'.loc(),
				icon : '/themes/icon/all/arrow_down.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'create',
				scope : this,
				hidden : true,
				handler : function(btn) {
					try {
						var param = {
							parent_id : this.ppid
						};
						CPM.popWin('/dev/database/DownDictionary.jcp', param);
					} catch (e) {
						Ext.msg("error", e);
					}
				}

			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '类似创建'.loc(),
				icon : '/themes/icon/all/page_copy.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				tooltip : '创建一个同样级别的数据库表'.loc(),
				hidden : true,
				handler : function() {

					var panelId = Ext.id();
					if (!MetaTable.mainPanel.havePanel(panelId)) {
						var MM;
						MetaTable.metaTablePanel = this.frames
								.createPanel(new dev.database.MetaTablePanel(
										panelId, false, true, true,
										this.frames, MM, MM, MM, false));
						MetaTable.mainPanel
								.add(MetaTable.metaTablePanel.MainTabPanel);
						this.frames.set(panelId, MetaTable.metaTablePanel);
						MetaTable.metaTablePanel.MainTabPanel.on("hide",
								function() {
									this.columnForm.stopEditing(false);
								}, MetaTable.metaTablePanel);
						MetaTable.metaTablePanel.MainTabPanel.on("show",
								function() {
									if (this.columnForm.rendered) {
										var st = this.columnForm.store;
										var total = st.getCount();
										if (total > 1) {
											var rec = st.getAt(total - 1);
											st.removeAll();
											st.add([rec]);
										}
										this.columnForm.startEditing(0);
										this.metaTableForm.form.reset();
									}
								}, MetaTable.metaTablePanel);
					} else {
						MetaTable.metaTablePanel = this.frames.get(panelId);
					}
					MetaTable.mainPanel.setActiveTab(panelId);

					var oid = this.object_id;
					MetaTable.metaTablePanel.init({
								parent_id : oid
							})
					var grid = MetaTable.metaTablePanel.columnForm;
					var st = grid.getStore();
					st.load({
								params : {
									object_id : oid,
									submitType : 'columns'
								},
								scope : this,
								callback : function() {
									grid.appendNewRow();
								}

							});
					var tree = MetaTable.navPanel.getTree();
					tree.moveLeft();
				}
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '同步查询'.loc(),
				icon : '/themes/icon/all/table_refresh.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				tooltip : '同步到查询设计里'.loc(),
				hidden : true,
				handler : function() {
					var tempToolBar = this.metaTableForm.getTopToolbar();
					var citem = null;
					if (tempToolBar) {
						tempToolBar.items.each(function(item) {
									if (item.text == '同步查询'.loc())
										citem = item;
								}, tempToolBar.items);
						citem.disable();
					}
					Ext.Ajax.request({
								url : '/dev/database/queryCreate.jcp?objectId='
										+ this.object_id + "&isTable=true&"
										+ Math.random(),
								method : 'GET',
								scope : this,
								success : function(response, options) {
									var check = response.responseText;
									var ajaxResult = Ext.util.JSON
											.decode(check)
									if (ajaxResult.success) {
										if (tempToolBar) {
											tempToolBar.items.each(function(
															item) {
														if (item.text == '同步查询'
																.loc())
															item.enable();
													}, tempToolBar.items);
										}
										Ext.msg("info", '完成查询同步!'.loc());
									} else {
										Ext.msg('ERROR', '查询同步失败!,原因:'.loc()
														+ '<br>'
														+ ajaxResult.message);
									}
									citem.enable();
								}
							});
				}
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '约束管理'.loc(),
				icon : '/themes/icon/all/table_relationship.gif',
				cls : 'x-btn-text-icon  bmenu',
				disabled : false,
				state : 'edit',
				scope : this,
				tooltip : '对数据库进行主外键，规范化管理'.loc(),
				hidden : true,
				handler : function() {
					using("dev.database.ConstraintColumnPanel");
					using("dev.database.ConstraintPanel");

					MetaTable.metaTablePanel = new dev.database.ConstraintPanel(
							this.object_id, this.ppid, this.frames, this.retFn);
					MetaTable.mainPanel
							.add(MetaTable.metaTablePanel.MainTabPanel);
					MetaTable.mainPanel
							.setActiveTab(MetaTable.metaTablePanel.MainTabPanel);
				}
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '删除数据表'.loc(),
		icon : '/themes/icon/all/table_delete.gif',
		cls : 'x-btn-text-icon  bmenu',
		disabled : false,
		state : 'edit',
		scope : this,
		hidden : true,
		handler : function(btn) {
			var fm = this.metaTableForm.form;
			var id = this.object_id;
			var lname = fm.findField('lname').getValue();
			var kid = Ext.id();
			Ext.msg("confirm", '您确认删除表'.loc() + '(' + lname
							+ ')?<br>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;'
							+ '只删除元数据'.loc() + '(' + '表描述'.loc()
							+ ')&nbsp;<input type="checkbox" id=' + kid
							+ '><br>&nbsp;', function(btns) {
						if (btns == 'yes') {
							var metaOnly = Ext.get(kid).dom.checked;
							Ext.Ajax.request({
								url : '/dev/database/create.jcp?ctype=delete&object_id='
										+ id
										+ "&ra="
										+ Math.random()
										+ "&metaOnly=" + metaOnly,
								method : 'get',
								callback : function(opt, success, response) {
									try {
										var obj = Ext.decode(response.responseText);
										if (!obj.success)
											Ext.msg('error', '删除失败,原因是:'.loc()
															+ obj.msg);
									} catch (e) {
									}
									var tree = MetaTable.navPanel.getTree();
									if (describe) {
										tree.loadParentNode(function() {
											MetaTable.mainPanel
													.setActiveTab(new Ext.Panel(
															{}));
										});
									} else {
										tree
												.loadParentNode(MetaTable.navPanel.clickEvent);
									}
								}
							});
						}
					});
		}
	}));

	if (showCombo) {

		this.ButtonArray.push(new Ext.Toolbar.Button({
			text : '删除数据库中原始表'.loc(),
			icon : '/themes/icon/all/table_delete.gif',
			cls : 'x-btn-text-icon  bmenu',
			disabled : false,
			state : 'create',
			scope : this,
			hidden : true,
			handler : function(btn) {
				var fm = this.metaTableForm.form;
				var pname = this.object_id;
				var schema = this.ppid;
				var dbLink = this.dbLink;
				Ext.msg("confirm", '您确认删除数据库中的原始表[' + schema + '.' + pname
								+ ']?<br>删除后无法恢复!'.loc(), function(btns) {
							if (btns == 'yes') {
								Ext.Ajax.request({
									url : '/dev/database/create.jcp?ctype=rdelete&name='
											+ pname
											+ "&ra="
											+ Math.random()
											+ "&dbLink="
											+ dbLink
											+ "&schema="
											+ schema,
									method : 'get',
									callback : function(opt, success, response) {
										try {
											var obj = Ext.decode(response.responseText);
											if (!obj.success) {
												Ext.msg('error', '删除失败,原因是:'
																.loc()
																+ obj.msg);
												return;
											} else {
												Ext.msg('info', '删除成功');
											}
										} catch (e) {
										}
										var tree = MetaTable.navPanel.getTree();
										tree.loadParentNode(function() {
											MetaTable.mainPanel
													.setActiveTab(new Ext.Panel(
							  								{}));
										});
									}
								});
							}
						});
			}
		}));
	}

	this.ButtonArray.push(new Ext.Toolbar.Separator({
				state : 'edit'
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '添加字段'.loc(),
				icon : '/themes/icon/all/table_row_insert.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				tooltip : '给数据库表插入新字段'.loc(),
				state : 'edit',
				cid : 'add',
				hidden : true,
				handler : function(btn) {
					this.columnForm.editColumn(btn);
				}

			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '修改字段'.loc(),
				icon : '/themes/icon/all/table_row_insert.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				tooltip : '对数据库字段进行修改'.loc(),
				state : 'edit',
				cid : 'edit',
				hidden : true,
				handler : function(btn) {
					this.columnForm.editColumn(btn);
				}
			}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '生成测试数据'.loc(),
		icon : '/themes/icon/all/arrow_in.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		tooltip : '给数据库插入模拟数据'.loc(),
		state : 'edit',
		hidden : true,
		handler : function() {
			Ext.MessageBox.show({
				title : '测试数据条数'.loc(),
				msg : '请输入生成测试数据条数'.loc() + '(' + '将删除原有记录'.loc() + '):',
				width : 300,
				buttons : Ext.MessageBox.OKCANCEL,
				scope : this,
				prompt : true,
				fn : function(btn, txt) {
					if (btn == 'ok') {
						if (txt != '' && /^(\-|\+)?\d+$/.test(txt)) {
							var saveParams = {};
							saveParams['object_id'] = this.object_id;
							saveParams['type'] = 'test';
							saveParams['totalNum'] = txt;
							Ext.Ajax.request({
										url : '/dev/database/randominput.jcp',
										method : 'POST',
										params : saveParams,
										scope : this,
										success : function(response, options) {
											var check = response.responseText;
											var ajaxResult = Ext.util.JSON
													.decode(check);
											if (ajaxResult.success) {
												Ext
														.msg(
																"info",
																'成功插入'.loc()
																		+ ajaxResult.totalNum
																		+ '条模拟测试数据!'
																				.loc());
											} else {
												Ext
														.msg(
																"error",
																'数据保存失败!,原因:'
																		.loc()
																		+ '<br>'
																		+ ajaxResult.message);
											}
										},
										scope : this
									});
						} else {
							Ext.msg("error", '必须填写整数且不能为空'.loc());
						}
					}
				},
				animEl : 'navtoolbar'
			});
		}
	}));
	this.ButtonArray.push(new Ext.Toolbar.Separator({
				state : 'edit'
			}));

	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '结构一致性检查'.loc(),
		icon : '/themes/icon/common/setSearch.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		tooltip : '检查元数据描述与数据库中存在的物理结构是否一致'.loc(),
		state : 'edit',
		hidden : true,
		handler : function() {
			Ext.Ajax.request({
				url : '/dev/database/CompareMetadata.jcp',
				method : 'POST',
				params : {
					object_id : this.object_id
				},
				scope : this,
				callback : function(options, success, response) {
					var result = Ext.decode(response.responseText);
					if (result.totalCount == 0) {
						Ext.msg("msg", '元数据结构与物理数据结构一致'.loc(), {
									type : 'INFO'
								});
					} else {
						var result = Ext.decode(response.responseText);
						using("dev.database.DataBaseCompare");
						var showDiff = new dev.database.DataBaseCompare(
								this.object_id, result, this.frames, this.retFn);
						MetaTable.mainPanel.add(showDiff.MainTabPanel);
						MetaTable.mainPanel.setActiveTab(showDiff.MainTabPanel);
					}
				}
			})
		}
	}));

	this.ButtonArray.push(new Ext.Toolbar.Button({
		text : '数据同步'.loc(),
		icon : '/themes/icon/all/date_go.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		tooltip : '将元数据插入目标表'.loc(),
		state : 'edit',
		hidden : true,
		handler : function() {
			var str = '连接数据表导航'.loc();
			var id = this.object_id;
			this.tree = new MenuTree(Tool
					.parseXML('<root _id="root"><forder _hasChild="1"><e  _id="0"  _parent="root" title="'
							+ str
							+ '" url="/dev/database/tree.jcp"  icon0="/themes/icon/xp/alias.gif" icon1="/themes/icon/xp/alias.gif"/></forder></root>'));
			this.queryList = [];
			this.queryList.push(new Ext.Toolbar.Button({
						text : '同步'.loc(),
						icon : '/themes/icon/xp/move.gif',
						cls : 'x-btn-text-icon  bmenu',
						disabled : false,
						scope : this,
						hidden : false,
						handler : this.onMoveButtonClick
					}));
			this.queryList.push(new Ext.Toolbar.Button({
						text : '取消'.loc(),
						icon : '/themes/icon/xp/cancel.png',
						cls : 'x-btn-text-icon  bmenu',
						disabled : false,
						scope : this,
						hidden : false,
						handler : function() {
							this.window.close();
						}
					}));
			this.panel = new Ext.Panel({
						bodyStyle : 'background:#FFFFFF;'
					});
			this.window = new Ext.Window({
						title : '数据同步'.loc(),
						width : 300,
						height : 400,
						autoScroll : false,
						layout : 'fit',
						modal : true,
						plain : true,
						items : this.panel,
						buttons : this.queryList
					})
			this.window.on("show", function() {
						this.tree.finish(this.panel.body.dom, document);
					}, this);
			this.window.show();
		}
	}));
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '查看数据'.loc(),
				icon : '/themes/icon/all/application_view_list.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				state : 'edit',
				hidden : true,
				handler : function() {
					using("dev.database.DataList");
					var showData = new dev.database.DataList(this.object_id);
					showData.show();
				}
			}));
		
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '生成CPK文件',
				icon : '/themes/icon/all/package.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				state : 'edit',
				hidden : false,
				handler : function() {
					window.location = "/dev/system/createInstallCPK.jcp?type=toXml&object_id="
							+ this.object_id + "&phy_name=" + pnameField.getValue()+"&cn_name="+lnameField.getValue();
				}
	}));
	
	this.ButtonArray.push(new Ext.Toolbar.Button({
				text : '安装CPK文件',
				icon : '/themes/icon/common/install.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				state : 'create',
				hidden : false,
				handler : function() {
					loadcss("lib.upload.Base");
					using("lib.upload.Base");
					using("lib.upload.File");

					this.cpkButtonArrays = [];
					this.cpkButtonArrays.push(new Ext.Toolbar.Button({
								text : '安装'.loc(),
								icon : '/themes/icon/common/install.gif',
								cls : 'x-btn-text-icon  bmenu',
								disabled : false,
								scope : this,
								hidden : false,
								handler : this.onUploadButtonClick
							}));
					this.cpkButtonArrays.push(new Ext.Toolbar.Button({
								text : '取消'.loc(),
								icon : '/themes/icon/xp/cancel.png',
								cls : 'x-btn-text-icon  bmenu',
								disabled : false,
								scope : this,
								hidden : false,
								handler : function() {
									this.cpkWindow.close();
								}
							}));
					this.cpkUploadPanel = new Ext.FormPanel({
							labelWidth : 100,
							cached : true,
							labelAlign : 'right',
							url : '/etc/install/install.jcp',
							method : 'POST',
							border : false,
							bodyStyle : 'padding:20px 0px 0px 0px;height:100%;width:100%;background:#FFFFFF;',
							items : [{
										layout : 'column',
										border : false,
										items : [{
													columnWidth : 1.0,
													layout : 'form',
													border : false,
													items : [{
																xtype : 'fileupload',
																fieldLabel : '上传安装文件'.loc(),
																name : 'installCpkFile',
																pattern : '*.cpk',
																state : 'new',
																allowBlank : false,
																maxSize : 40 * 1024 * 1024,
																width : 350
															}]
												}]
									}]
						});
					this.cpkWindow = new Ext.Window({
								title : '选择CPK文件'.loc(),
								width : 550,
								height : 200,
								autoScroll : false,
								layout : 'fit',
								modal : true,
								plain : true,
								items : this.cpkUploadPanel,
								buttons : this.cpkButtonArrays
							})
					this.cpkWindow.show();
				}
	}));
	this.onUploadButtonClick = function(){
		var frm = this.cpkUploadPanel.form;
		var saveParams = {};
		saveParams['type'] = 'install';
		if (frm.isValid()) {
			var form = Ext.getDom(this.cpkUploadPanel.form.el.dom);
			form.target = "installConsole";
			form.method = 'POST';
			form.enctype = form.encoding = 'multipart/form-data';
			form.action = '/etc/install/installCPK.jcp';
			form.submit();
		} else {
			Ext.msg("error", '数据不能提交,请修改表单中标识的错误!'.loc());
		}
	}
	this.onMoveButtonClick = function() {
		Ext.msg('confirm', '确认同步?'.loc(), function(answer) {
					if (answer == 'yes') {
						var selectedNode = this.tree.getNowNode();
						var Params = {};
						Params['from_id'] = this.object_id;
						Params['to_name'] = selectedNode.prop.tableName;
						Params['server'] = selectedNode.prop.server;
						Ext.Ajax.request({
									url : '/dev/database/dataMigrate.jcp',
									params : Params,
									method : 'POST',
									scope : this,
									success : function() {
										this.window.close();
										Ext.msg("success", '数据同步成功!'.loc());
									},
									failure : function(response) {
										var check = response.responseText;
										var ajaxResult = Ext.util.JSON
												.decode(check);
										this.window.close();
										Ext.msg("error", '数据同步失败!,原因:'.loc()
														+ '<br>'
														+ ajaxResult.message);
									}
								});
					}
				}.createDelegate(this));
	}

	var pnameField = new Ext.form.TextField({
				fieldLabel : '物理名称'.loc(),
				tabIndex : 102,
				name : 'pname',
				width : 160,
				style : 'ime-mode:disabled;',
				maxLength : 30,
				allowBlank : false,
				regex : new RegExp("^[a-zA-Z][0-9a-zA-Z_]*$"),
				regexText : '物理列名只能由数字,字母,下划线组成并且首字符不能为数字'.loc(),
				maxLengthText : '物理名称不能超过{0}个字符!'.loc(),
				blankText : '物理名称必须提供.'.loc()
			});
	var lnameField = new Ext.form.TextField({
				tabIndex : 101,
				fieldLabel : '逻辑名称'.loc(),
				name : 'lname',
				width : 160,
				maxLength : 30,
				regex : /^[^\<\>\'\"\&]+$/,
				regexText : '逻辑名称中不应有'.loc() + '&,<,>,\",' + '字符'.loc(),
				allowBlank : false,
				maxLengthText : '逻辑名称不能超过{0}个字符!'.loc(),
				blankText : '逻辑名称必须提供.'.loc()
			});
	lnameField.on("change", function() {
		var val = lnameField.getValue();
			// if(val!="")
			// pnameField.setValue(getPinyin(val));

		});
	this.metaTableForm = new Ext.FormPanel({
		labelWidth : 160,
		labelAlign : 'right',
		layout : 'column',
		region : 'north',
		url : '/dev/database/table.jcp',
		height : 100,
		method : 'POST',
		border : false,
		bodyStyle : 'padding:20px 0px 0px 0px;height:100%;width:100%;height:250px;background:#FFFFFF;',
		tbar : this.ButtonArray,
		items : [{
					columnWidth : 0.40,
					layout : 'form',
					clear : true,
					border : false,
					items : [lnameField, {
								xtype : 'checkbox',
								tabIndex : 103,
								name : 'have_auth',
								fieldLabel : '数据权限'.loc()
							}

					]
				}, {
					columnWidth : 0.40,
					layout : 'form',
					clear : true,
					border : false,
					items : [pnameField, spfc, {
								xtype : 'hidden',
								name : 'isCreate',
								value : enableCtrl
							}]
				}]
	});
	this.columnForm = dev.database.ColumnEditor(editMode, enableCtrl,
			this.frames, this, rangeRow);
	this.MainTabPanel = new Ext.Panel({
				layout : 'border',
				id : panelId,
				cached : true,
				border : false,
				items : [this.metaTableForm, this.columnForm]
			});
};

dev.database.MetaTablePanel.prototype = {
	init : function(param) {
		this.ppid = param.parent_id;
		var fm = this.metaTableForm.form;
		fm.reset();
		(function() {
			fm.clearInvalid();
		}).defer(60);
		this.columnForm.clearAll();
		if (this.MainTabPanel.rendered) {
			this.toggleToolBar('create');
			this.frames.get("MetaTable").mainPanel.setStatusValue([
					'表基本信息'.loc(), '', '', '', '']);
		}
	},
	loadSchema : function(id, ppid, dbLink) {
		id = id.substring(0, id.length - dbLink.length - 1);
		this.object_id = id;
		this.ppid = ppid;
		this.dbLink = dbLink;

		var fm = this.metaTableForm.form;
		fm.findField("pname").setValue(id);
		fm.findField("lname").reset();
		fm.findField('have_auth').setValue(false);
		Ext.Ajax.request({
					url : '/dev/database/table.jcp',
					scope : this,
					method : 'POST',
					params : {
						pname : id,
						schema : ppid,
						dbLink : dbLink,
						submitType : 'rawcolumns',
						ra : Math.random()
					},
					callback : function(options, success, response) {
						var cf = this.columnForm;
						cf.stopEditing(false);
						var result = Ext.decode(response.responseText || "{}");
						if (success == false || !Ext.isDefined(result.success)
								|| result.success == false) {
							Ext.msg("error", result.message || '数据获取错误.'.loc());
							return;
						}
						cf.getStore().loadData(result.data);
						this.constraintConfig = result.constraintConfig;
						cf.object_id = id;
						if (cf.editors.length != 3)
							cf.editors = [cf.editors[0], cf.editors[5],
									cf.editors[6]];
						cf.startEditing(0, 0);
					}
				});
		this.toggleToolBar('create');
	},
	loadForm : function(id, ppid) {
		this.object_id = id;
		this.ppid = ppid;
		this.toggleToolBar('edit');
		this.metaTableForm.load({
					params : {
						object_id : id,
						submitType : 'form',
						ra : Math.random()
					},
					method : 'GET',
					scope : this,
					success : function(frm, action) {
						var data = action.result.data;
						this.frames.get('MetaTable').mainPanel.setStatusValue([
								'表基本信息'.loc(), data.dblink, this.object_id,
								data.lastModifyName, data.lastModifyTime]);
					},
					failure : function(frm, action) {
						Ext.msg("error", '数据载入失败,原因是:'.loc()
										+ action.result.message)
					}
				});
		this.columnForm.getStore().load({
					params : {
						object_id : id,
						submitType : 'columns',
						ra : Math.random()
					}
				});
		this.columnForm.object_id = id;

	},
	toggleToolBar : function(state) {
		var tempToolBar = this.metaTableForm.getTopToolbar();
		if (tempToolBar) {
			tempToolBar.items.each(function(item) {
						item.hide();
					}, tempToolBar.items);
			tempToolBar.items.each(function(item) {
						if (item.state == state)
							item.show();
					}, tempToolBar.items);
		}
	}
};
