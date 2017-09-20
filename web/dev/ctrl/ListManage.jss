/*
 * ----1、弹出设定窗口 ----2、显示翻页. ----3、读入表设置 ----4、生成临时store,示例数据生成30条
 * ----5、存入数据库,与老库绑定,扩充字段 ----6、结果即时显示. ----7、弹出窗口动态载入. ----8、排序方式设定或禁止排序
 * ----9、reset,return. ----10、扩充表,实现link1,link2,link3 bug ----1、不能同时对两列使用同一个格式
 */

Ext.namespace("dev.ctrl");

dev.ctrl.ListManage = function(params) {
	var params = this.params = params;
	var grid;
	this.setGrid = function(gd) {
		grid = gd;
	}
	this.loadData(false);

	var formId = Ext.id();

	var targetPanel = new dev.ctrl.TargetPanel({
				parentPanel : formId,
				objectId : params.parent_id
			});

	var form = new Ext.form.FormPanel({
				border : false,
				id : formId,
				bodyStyle : 'padding:20px 0 0 15px;',
				items : targetPanel.getFirstCombo()
			});
	var win = this.win = new Ext.Window({
				title : '选定列目标参数设置'.loc(),
				layout : 'fit',
				height : 200,
				width : 750,
				items : form,
				buttons : [{
							text : '保存设置'.loc(),
							cls : 'x-btn-text-icon',
							icon : '/themes/icon/all/add.gif',
							handler : function() {
								grid.getCurrentConfig().extra = targetPanel
										.getValue();
								win.hide();
							}
						}, {
							text : '删除设置'.loc(),
							cls : 'x-btn-text-icon',
							icon : '/themes/icon/all/delete.gif',
							handler : function() {
								delete(grid.getCurrentConfig().extra);
								win.hide();
							}
						}, {
							text : '关闭窗口'.loc(),
							cls : 'x-btn-text-icon',
							icon : '/themes/icon/all/cross.gif',
							handler : function() {
								this.win.hide();
							},
							scope : this
						}]
			});
	win.setValue = function(value) {
		if (typeof(value) != 'undefined')
			targetPanel.setValue(value);
		else
			targetPanel.setValue(["0", "", "", "", "", "", "", "", "", "", ""]);
	}
	var buttonArray = [new Ext.Toolbar.Button({
		text : '保存'.loc(),
		icon : '/themes/icon/xp/save.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		handler : function() {
			var arr = new Array();
			Ext.each(grid.getView().cm.config, function(item) {
				arr
						.push(Ext
								.copyTo(
										{},
										item,
										"id,tabid,header,sortable,sortType,align,width,renderType,widgetId,hidden,extra"))
			});
			Ext.Ajax.request({
						url : '/dev/ctrl/ListManage.jcp',
						params : {
							object_id : this.params.parent_id,
							cols : Ext.encode(arr)
						},
						method : 'POST',
						scope : this,
						success : function(response, options) {
							Ext.msg("info", '数据保存成功!'.loc());
						},
						failure : function(response, options) {
							Ext.msg("error", '保存失败,原因:'.loc()
											+ response.message);
						}
					})
		}
	}), new Ext.Toolbar.Button({
				text : '重置'.loc(),
				icon : '/themes/icon/xp/refresh.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				handler : function() {
					this.loadData(true);
					Ext.msg("info","重置成功!".loc());
				}
			}), new Ext.Toolbar.Button({
				text : '返回'.loc(),
				icon : '/themes/icon/xp/undo.gif',
				cls : 'x-btn-text-icon  bmenu',
				scope : this,
				handler : function() {
					params.returnFunction();
				}
			})];
	this.MainTabPanel = new Ext.Panel({
				layout : 'fit',
				tbar : buttonArray,
				border : false
			});
	this.MainTabPanel.on("destroy", function() {
				if (targetPanel != null)
					targetPanel.destroy();
				win.destroy();
			}, this)

}

dev.ctrl.ListManage.prototype = {
	hideFormatMenu : false,
	hideAlignMenu : false,
	hideTargetConfigMenu : false,
	hideDeleteColMenu : false,
	hideMainColMenu : true,
	ExampleRows : 20,
	grid : null,
	loadData : function(reset) {
		var isReset = reset;
		Ext.Ajax.request({
			url : '/dev/ctrl/ListManage.jcp?object_id='
					+ ((isReset)
							? this.params.parent_id + "&type=reset"
							: this.params.parent_id),
			scope : this,
			callback : function(options, success, response) {
				if (!success) {
					Ext.msg("error", '服务器无法获取数据'.loc());
				} else {
					var data = Ext.decode(response.responseText);
					if (!data.success) {
						Ext.msg("error", '服务器获取数据错误,原因是:'.loc() + data.message);
					} else {
						var ret = this.parseResponse(data.data);
						if (isReset) {
							var size = this.grid.getSize().width;
							this.grid.reconfigure(ret.store,
									new Ext.grid.ColumnModel(ret.cm));
							this.grid.setWidth(size - 1);
						} else {
							var gd = this.genGrid(ret.store, ret.cm);
							this.setGrid(gd);
							this.MainTabPanel.add(gd);
							this.MainTabPanel.doLayout();
						}
					}
				}
			}
		});
	},
	parseResponse : function(data) {
		var fields = new Array(), fakes = new Array(), columns = new Array(), cof = new Array();
		var tmplen = 0, startValue, increase = false, sortInfo = null;
		for (var i = 0; i < data.length; i++) {
			if (data[i].type == 'varchar')
				data[i].type = 'string';
			fields.push({
						name : data[i].dataIndex,
						type : data[i].type
					});
			if (!data[i].width)
				data[i].width = (data[i].header.length < 3)
						? 60
						: data[i].header.length * 20;
			if (typeof(data[i].sortable) == 'undefined')
				data[i].sortable = true;
			// if (typeof(data[i].renderType) != 'undefined')
			// this.syncRenderer(data[i]);
			if (typeof(data[i].sortType) != 'undefined')
				sortInfo = {
					field : data[i].dataIndex,
					direction : data[i].sortType
				};

			columns.push(data[i]);

			if (data[i].type == "string") {
				cof.push({
							prefix : '示例'.loc(),
							startValue : 1,
							increase : true
						})
			} else if (data[i].type == "date") {
				cof.push({
							prefix : false,
							startValue : new Date(),
							increase : false
						})
			} else {
				cof.push({
							prefix : false,
							startValue : 1,
							increase : true
						})
			}

		}
		tmplen = data.length;
		for (var i = 0; i < this.ExampleRows; i++) {
			fakes[i] = new Array(tmplen);
			for (var j = 0; j < tmplen; j++) {
				fakes[i][j] = (cof[j].prefix) ? cof[j].prefix
						+ cof[j].startValue : cof[j].startValue;
				if (cof[j].increase)
					cof[j].startValue++;
			}
		}
		var gstore = new Ext.data.SimpleStore({
					fields : fields,
					data : fakes,
					sortInfo : sortInfo
				})
		return {
			store : gstore,
			cm : columns
		};
	},
	/*
	 * syncRenderer : function(cfg) { switch (cfg.renderType) { case 0 :
	 * delete(cfg.renderer); delete(cfg.renderType); break; case 1 :
	 * cfg.renderer = Ext.util.Format.usMoney break; case 2 : cfg.renderer =
	 * Ext.util.Format.dateRenderer('Y/m/d'); break; case 3 : cfg.renderer =
	 * Ext.util.Format.dateRenderer('Y/m/d H:i:s') break; case 4 : cfg.renderer =
	 * function(v) { return '<font style=\"font-weight:bold\">' + v + '</font>' }
	 * break; } return cfg; }, applyFormat : function(combo, val) { if
	 * (combo.passedval == val) return false; combo.passedval = val; var cfg =
	 * this.grid.getCurrentConfig(); cfg.renderType = val;
	 * this.syncRenderer(cfg); this.grid.getView().refresh(); },
	 */
	genGrid : function(gstore, cols) {
		var grid = this.grid = new Ext.grid.GridPanel({
					store : gstore,
					region : 'center',
					stripeRows : true,
					sortable : true,
					columns : cols,

					sm : new Ext.grid.RowSelectionModel({
								singleSelect : true
							}),
					height : 250,
					iconCls : 'icon-grid',
					trackMouseOver : false,
					bbar : new Ext.PagingToolbar({
								pageSize : 50,
								store : gstore,
								displayInfo : true,
								displayMsg : '数据'.loc() + ' {0} - {1} of {2}',
								emptyMsg : '无数据'.loc()
							})
				});
		grid.getCurrentConfig = function() {
			var view = this.getView();
			if (!view || view.hdCtxIndex === undefined)
				return null;

			return view.cm.config[view.hdCtxIndex];
		}
		grid.on("render", function() {
			var view = grid.getView();
			var hmenu = view.hmenu;

			/*
			 * var formatComboItem = this.getComboItem({ listeners : { scope :
			 * this, select : function(combo, rec, index) {
			 * this.applyFormat(combo, rec.get("value"));
			 * combo.menu.parentMenu.hide(true); } }, store : new
			 * Ext.data.SimpleStore({ fields : ['text', 'value'], data :
			 * [['粗体'.loc(), 0], ['斜体', 1], ['下划线'.loc(), 2], ['删除线'.loc(), 3],
			 * ['红色'.loc(), 4]] }) }, { menuIcon :
			 * "/themes/icon/xp/autodesk.png" });
			 */
			var colName = new Ext.form.TextField({
						emptyText : '内容可以为HTML格式'.loc()
					})

			colName.on("change", function(obj, newValue) {
						this.grid.getCurrentConfig().header = newValue;
						var view = this.grid.getView();
						if (!view || view.hdCtxIndex === undefined)
							return null;
						this.grid.getColumnModel().setColumnHeader(
								view.hdCtxIndex, newValue);
					}, this);

			var ctrlComboItem = this.getComboItem({
						store : new Ext.data.SimpleStore({
									fields : ['text', 'value'],
									data : [['无'.loc(), 0]]
								}),
						allowBlank : true,
						listeners : {
							scope : this,
							select : function(combo, rec, index) {
								var cfg = this.grid.getCurrentConfig();
								cfg.widgetId = combo.getValue();
								combo.menu.parentMenu.hide(true);
							}
						}
					}, {});

			var alignComboItem = this.getComboItem({
						value : 'justify',
						listeners : {
							select : function(combo, rec, index) {
								var newval = rec.get("value");
								if (newval == 'justify')
									newval = "";
								grid.getCurrentConfig().align = newval;
								view.refresh();
								combo.menu.parentMenu.hide(true);
							}
						},
						store : new Ext.data.SimpleStore({
									fields : ['text', 'value'],
									data : [['两端对齐'.loc(), 'justify'],
											['居左'.loc(), 'left'],
											['居中'.loc(), 'center'],
											['居右'.loc(), 'right']]
								})
					}, {});

			hmenu.items.get(0).on("click", function() {
						grid.getCurrentConfig().sortType = 'ASC'
					});
			hmenu.items.get(1).on("click", function() {
						grid.getCurrentConfig().sortType = 'DESC'
					});
			hmenu.on("beforeshow", function(menu) {
						var cfg = grid.getCurrentConfig();
						menu.items.get('freezeCol').setChecked(!cfg.sortable);
						menu.items.get(1).setDisabled(!cfg.sortable);
						menu.items.get(2).setDisabled(!cfg.sortable);
						menu.items.get(3).setDisabled(!cfg.sortable);
						menu.items.get('setupCol')
								.setChecked((typeof(cfg.extra) != 'undefined'));
						/*
						 * formatComboItem.editor
						 * .setValue((typeof(cfg.renderType) == 'undefined') ? "" :
						 * cfg.renderType); formatComboItem.editor.passedval =
						 * '';
						 */
						var col = menu.items.get('setCtrl');
						var combo = ctrlComboItem.editor;
						if (cfg.res) {
							combo.store.loadData(cfg.res);
							combo.setValue(cfg.widgetId || '');
							col.show();
						} else {
							col.hide();
						}
						alignComboItem.editor
								.setValue((typeof(cfg.align) == 'undefined')
										? "justify"
										: cfg.align);
						colName.setValue(cfg.header);
						return true;
					}, this);
			hmenu.insert(0, new Ext.menu.CheckItem({
								id : 'freezeCol',
								text : '禁止排序功能'.loc(),
								checked : false,
								handler : function(item) {
									var cfg = grid.getCurrentConfig();
									cfg.sortable = item.checked;
									if (!cfg.sortable
											&& typeof(cfg.sortType) != 'undefined') {
										delete(cfg.sortType);
									}
									return true;
								},
								scope : this
							}));
			hmenu.insert(1, new Ext.menu.Item({
								text : '不排序'.loc(),
								handler : function() {

									grid.getCurrentConfig().sortType = '';
									return true;
								},
								scope : this,
								icon : '/themes/icon/all/style.gif'
							}));
			hmenu.add('-', {
						id : 'deleteCol',
						text : '删除此列'.loc(),
						hidden : this.hideDeleteColMenu,
						handler : function() {
							this.getColumnModel().setHidden(
									this.getView().hdCtxIndex, true);
						},
						scope : grid,
						icon : '/themes/icon/all/cross.gif'
					}, {
						id : 'setCol',
						text : '是否标识列'.loc(),
						checked : false,
						hidden : this.hideMainColMenu,
						handler : function(item) {
							this.getColumnModel().flag = item.checked;
						},
						scope : this
					}, {
						id : 'setupCol',
						text : '双击数据行动作'.loc(),
						checked : false,
						hidden : this.hideTargetConfigMenu,
						handler : function() {
							this.win.setValue(grid.getCurrentConfig().extra);
							this.win.show();
							hmenu.hide();
							return false;
						},
						scope : this
					},
					/*
					 * { id : 'setFormat', text : '设置格式'.loc(), hidden :
					 * this.hideFormatMenu, handler : function() { return false; },
					 * menu : [formatComboItem], scope : this, icon :
					 * '/themes/icon/all/text_signature.gif' },
					 */{
						id : 'align',
						text : '对齐'.loc(),
						hidden : this.hideAlignMenu,
						handler : function() {
							return false;
						},
						menu : [alignComboItem],
						scope : this,
						icon : '/themes/icon/all/text_align_justify.gif'
					}, {
						id : 'setCtrl',
						text : '设置控件'.loc(),
						hidden : this.hideFormatMenu,
						handler : function() {
							return false;
						},
						menu : [ctrlComboItem],
						scope : this,
						icon : '/themes/icon/xp/open.gif'
					}, colName);
			if (this.params.prgtype == "3") {
				grid.getColumnModel().on("hiddenchange",
						function(cm, idx, hid) {
							if (hid) {
								var col = cm.config[idx];
								if (col.pkmark) {
									Ext.msg("error", '在列表录入界面中,主键需要录入数据,必须显示.'
													.loc());
									cm.setHidden(idx, false)
									return false;
								}

							}
						});
			}
		}, this);
		return grid;
	},
	onMetaChange : function(store, meta) {
		var c;
		var config = [];
		var lookup = {};
		for (var i = 0, len = meta.fields.length; i < len; i++) {
			c = meta.fields[i];
			if (c.header !== undefined) {
				if (typeof c.dataIndex == "undefined") {
					c.dataIndex = c.name;
				}
				if (typeof c.renderer == "string") {
					c.renderer = Ext.util.Format[c.renderer];
				}
				if (typeof c.id == "undefined") {
					c.id = 'c' + i;
				}
				if (c.editor && c.editor.isFormField) {
					c.editor = new Ext.grid.GridEditor(c.editor);
				}
				c.sortable = true;

				config[config.length] = c;
				lookup[c.id] = c;
			}
		}
		this.colModel.config = config;
		this.colModel.lookup = lookup;

		if (this.rendered) {
			this.view.refresh(true);
		}
		this.view.hmenu.add({
					id : "reset",
					text : "Reset Columns",
					cls : "xg-hmenu-reset-columns"
				});
	},
	saveColumModel : function() {
		var c, config = this.colModel.config;
		var fields = [];
		for (var i = 0, len = config.length; i < len; i++) {
			c = config[i];
			fields[i] = {
				name : c.name,
				width : c.width
			};
			if (c.hidden) {
				fields[i].hidden = true;
			}
		}
		var sortState = this.store.getSortState();
		Ext.Ajax.request({
					url : this.saveUrl,
					params : {
						fields : Ext.encode(fields),
						sort : Ext.encode(sortState)
					}
				});
	},
	getComboItem : function(comboConfig, itemConfig) {
		var combo = new Ext.form.ComboBox(Ext.applyIf(comboConfig, {
					valueField : 'value',
					displayField : 'text',
					triggerAction : 'all',
					listClass : "x-menu x-menu-combo-list",
					mode : 'local',
					width : 110,
					lazyInit : false,
					allowBlank : false
				}));
		combo.on("render", function(obj) {
					if (Ext.isGecko) {
						obj.wrap.setStyle("margin-left", "30px");
					}
				});
		var comboItem = new dev.ctrl.EditableItem(Ext.applyIf(itemConfig, {
					menuIcon : "/themes/icon/all/text_align_center.gif",
					style : 'width:158px',
					editor : combo,
					canActivate : true,
					deactivate : function() {
						combo.collapse();
					},
					activate : function() {
						var li = this.container;
						this.region = li.getRegion().adjust(2, 2, -2, -2);
						return true;
					},
					shouldDeactivate : function(e) {
						return !combo.hasFocus;
					}
				}));
		combo.menu = comboItem;
		return comboItem;
	}
}
