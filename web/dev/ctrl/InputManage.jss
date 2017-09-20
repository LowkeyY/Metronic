/*
 * 需要扩展做的项目 字典: 选择字典,只能选择还是可编辑 自增: 起始值,步长,最大值,超过最大值后值为
 * 
 * 所有控件的控件属性
 * 
 * 
 */
Ext.namespace('dev.ctrl');
dev.ctrl.InputManage = function(params) {
	var params = params;

	this.retFn = params.returnFunction || Ext.emptyFn;

	var editCM = new Ext.grid.CheckColumn({
				id : 'edit_flag',
				header : '可修改'.loc(),
				dataIndex : 'edit_flag',
				tabIndex : 200,
				width : 50
			});
	var hideCM = new Ext.grid.CheckColumn({
				id : 'hide_flag',
				header : '隐藏'.loc(),
				tabIndex : 201,
				dataIndex : 'hide_flag',
				width : 44
			});
	var readonlyCM = new Ext.grid.CheckColumn({
				id : 'readonly_flag',
				header : '只读'.loc(),
				tabIndex : 202,
				dataIndex : 'readonly_flag',
				width : 70
			});
	var wrapCM = new Ext.grid.CheckColumn({
				id : 'wrap_flag',
				header : '折行'.loc(),
				dataIndex : 'wrap_flag',
				tabIndex : 207,
				width : 44
			});
	var ctrlColumn = new dev.ctrl.InputManage.CtrlColumn({
				header : '扩展'.loc(),
				width : 70,
				prgType : params.prgType
			});

	var dataTypeStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : []
			});

	var ctrl_type = new Ext.form.ComboBox({
				tabIndex : 209,
				allowBlank : false,
				store : dataTypeStore,
				valueField : 'value',
				displayField : 'text',
				triggerAction : 'all',
				listWidth : 120,
				id : 'ctrl_type',
				mode : 'local',
				width : 80
			});

	ctrl_type.on("select", function(combo, rec, index, value) {
		var val = (typeof(value) == 'undefined') ? ctrl_type.getValue() : value;
		var r = ds.getAt(this.rIdx);
		var res = r.get("res");
		res = (typeof(res[val]) == 'undefined') ? res.defaultArr : res[val];
		prgStore.loadData(res);
		if (this.rendered && res.length > 0) {
			ColumnPanel.editors[5].setValue(res[0][0]);
			r.set("query_column", (val == 21) ? res[0][0] : "");
			r.set("link_widget", res[0][0]);
		}
	}, ctrl_type)

	var prgStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : []
			});

	var ctrlCombo = new Ext.form.ComboBox({
				tabIndex : 210,
				allowBlank : true,
				store : prgStore,
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				id : 'ctrlCombo',
				mode : 'local',
				value : '0',
				width : 80
			});
	/*
	 * ctrlCombo.on("select", function(combo, rec, index) { if (rec.get("value") ==
	 * "-2") {// 参数导入时,设置只读 var rec =
	 * ColumnPanel.getSelectionModel().getSelected(); rec.set("readonly_flag",
	 * true); } }, this);
	 */
	var mhid = [false, false, false, false, false, false, false, false, false,
			false, false, false];
	if (params.prgType == "3" || params.prgType == "13") {
		mhid[4] = mhid[10] = true;
	} else if (params.prgType == "12") {
		mhid[1] = mhid[2] = mhid[4] = mhid[7] = mhid[8] = mhid[10] = mhid[11] = true;
	} else if (params.subFlag == true) {
		mhid[10] = true;
	}
	var cmArr = [editCM, hideCM, readonlyCM, {
				id : 'lname',
				header : '标签'.loc(),
				dataIndex : 'title',
				width : 100,
				editor : new Ext.form.TextField({
							tabIndex : 203,
							name : 'title'
						})
			}, {
				header : '宽度(px)'.loc(),
				dataIndex : 'width',
				width : 60,
				id : 'width',
				editor : new Ext.form.TextField({
							tabIndex : 204,
							name : 'width'
						})
			}, {
				header : '类型'.loc(),
				defaultValue : "varchar",
				dataIndex : 'data_type',
				width : 50
			}, {
				header : '显示方式'.loc(),
				dataIndex : 'ctrl_type',
				tabIndex : 206,
				width : 80,
				editor : ctrl_type,
				renderer : function(value, parent, rec) {
					var arr = rec.get("res").arr;
					var text = value;
					for (var i = 0; i < arr.length; i++) {
						if (arr[i][0] == value) {
							text = arr[i][1];
							break;
						}
					}
					return "<span>" + text + "</span>";
				}
			}, {
				header : '最大值'.loc() + '/' + '长度'.loc(),
				dataIndex : 'max_length',
				width : 70,
				editor : new Ext.form.TextField({
							tabIndex : 208,
							name : 'max_length'
						})
			}, {
				header : '最小值'.loc() + '/' + '长度'.loc(),
				dataIndex : 'min_length',
				width : 70,
				editor : new Ext.form.NumberField({
							tabIndex : 209,
							name : 'min_length'
						})
			}, {
				header : '控件'.loc(),
				dataIndex : 'link_widget',
				width : 150,
				editor : ctrlCombo,
				renderer : function(value, parent, rec) {
					var res = rec.get("res");
					var ctype = rec.get("ctrl_type");
					if (ctype == '21') {
						text = rec.get("query_column");
					} else if (value == '') {
						text = '无'.loc();
					} else if (value == '-2') {
						text = '参数导入'.loc();
					} else if (res[ctype]) {
						res = res[ctype]
						for (var i = 0; i < res.length; i++) {
							if (res[i][0] == value) {
								text = res[i][1];
								break;
							}
						}
					} else {
						text = value;
					}
					return "<span>" + text + "</span>";
				}
			}, wrapCM, ctrlColumn];
	for (var i = 0; i < cmArr.length; i++) {
		if (mhid[i])
			cmArr[i].hidden = true;
	}

	var cm = new Ext.grid.ColumnModel(cmArr);
	cm.defaultSortable = false;
	var dsUrl = '/dev/ctrl/InputManage.jcp?object_id=' + params.parent_id
			+ '&baseType=' + params.baseType + '&rand=' + Math.random();
	// 处理从表录入
	if (params.subFlag == true) {
		dsUrl += "&subFlag=true"
	}
	var ds = this.ds = new Ext.data.JsonStore({
		url : dsUrl,
		root : 'items',
		method : 'GET',
		fields : [{
					name : "edit_flag",
					type : 'boolean'
				}, "tabitem_id", "data_type", "flength", "special_set",
				"max_length", "ctrl_type", "width", {
					name : "wrap_flag",
					type : 'boolean'
				}, {
					name : "row_index",
					type : 'int'
				}, {
					name : "hide_flag",
					type : 'boolean'
				}, "readonly_flag", "title", "primary_key", "query_id",
				"query_column", "decimaldigits", "textreport_id",
				"link_widget", "annotation", "regex", "regexText",
				"default_value", "option_id", {
					name : "data_type_value",
					type : 'int'
				}, "min_length", "tab_id", "res", "height", "extendAttributes"],
		remoteSort : false,
		sortInfo : {
			field : "row_index",
			direction : "ASC"
		}
	});

	this.ds.smartSet = function() {
		var lastNotHide = null;
		var trip = false;
		this.each(function(rec) {
					if (rec.data.hide_flag) {
						rec.data.wrap_flag = false;
					} else {
						lastNotHide = rec;
						if (rec.data.width >= 400)
							trip = true;
						rec.data.wrap_flag = trip;
						trip = !trip;
					}
				});
		if (lastNotHide != null)
			lastNotHide.data.wrap_flag = true;
	}

	this.ds.on("load", function(st, recs, e) {
				st.suspendEvents();
				ColumnPanel.startEditing.defer(500, ColumnPanel, 0, 0);
				st.resumeEvents();
			});

	this.ds.load();
	var topBar = [new Ext.Toolbar.Button({
		text : '保存'.loc(),
		icon : '/themes/icon/xp/save.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		handler : function() {
			ColumnPanel.stopEditing(true);
			var storeValue = [];
			var allRecords = this.ds.getRange(0);
			for (var i = 0, j = 0; i < allRecords.length; i++) {
				if (allRecords[i].data.edit_flag) {
					storeValue[j++] = Ext
							.copyTo(
									{},
									allRecords[i].data,
									"ctrl_type,link_widget,query_column,wrap_flag,tab_id,tabitem_id,max_length,width,hide_flag,readonly_flag,title,query_id,query_column,min_length,textreport_id,annotation,regex,regexText,default_value,option_id,height,extendAttributes");
				}
			}
			if (mhid[10] === true) {
				this.ds.smartSet();
			} else {
				var i = storeValue.length - 1;
				if (i > -1) {
					while (storeValue[i].hide_flag === true && i > 0)
						i--;
					storeValue[i].wrap_flag = true;
				}
			}
			Ext.Ajax.request({
						url : '/dev/ctrl/InputManage.jcp',
						params : {
							objectType : params.prgType,
							object_id : params.parent_id,
							fields : Ext.encode(storeValue)
						},
						scope : this,
						callback : function(options, success, response) {
							Ext.msg("info", '保存成功'.loc());
							// this.retFn();
						}
					});
		}
	}), new Ext.Toolbar.Button({
		text : '重置'.loc(),
		icon : '/themes/icon/xp/refresh.gif',
		cls : 'x-btn-text-icon',
		scope : this,
		handler : function() {
			var dss = this.ds;
			Ext.msg("confirm", '此操作会清除当前的设置,是否继续?'.loc(), function(answer) {
						if (answer == 'yes') {
							Ext.Ajax.request({
										url : '/dev/ctrl/InputManage.jcp',
										method : 'DELETE',
										params : {
											objectId : params.parent_id
										},
										scope : this,
										success : function(response, options) {
											var o = Ext
													.decode(response.responseText);
											if (!o.success)
												Ext.msg("error", o.message);
											else {
												dss.load();
											}
										}
									});
						}
					});
		}
	}), new Ext.Toolbar.Button({
				text : '智能设置'.loc(),
				icon : '/themes/icon/all/anchor.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				handler : function() {
					ColumnPanel.stopEditing(true);
					this.ds.smartSet();
					ColumnPanel.getView().refresh();
				}
			}), new Ext.Toolbar.Button({
				text : '返回'.loc(),
				icon : '/themes/icon/xp/undo.gif',
				cls : 'x-btn-text-icon',
				scope : this,
				handler : this.retFn
			})];
	if (params.prgtype == "3") {
		topBar[3].hidden = true;
	}
	var ColumnPanel = new lib.RowEditorGrid.RowEditorGrid({
				autoExpandColumn : 'lname',
				autoScroll : true,
				border : false,
				cm : cm,
				tbar : topBar,
				clicksToEdit : 1,
				enableColumnMove : true,
				trackMouseOver : false,
				ddGroup : 'InputManageSort',
				enableColumnMove : false,
				enableColumnResize : false,
				enableHdMenu : false,
				enableDragDrop : true,
				plugins : [editCM, hideCM, readonlyCM, wrapCM, ctrlColumn],
				frame : false,
				selModel : new Ext.grid.CheckboxSelectionModel(),
				stripeRows : true,
				minSize : 180,
				store : this.ds

			});
	ColumnPanel.on("render", function() {
				var drops = new Ext.dd.DropTarget(ColumnPanel.getEl(), {
							ddGroup : 'InputManageSort',
							notifyDrop : function(dd, e, data) {
								if (data.grid.activRow)
									data.grid.stopEditing(true);
								var st = data.grid.getStore();
								st.suspendEvents();
								var cindex = dd.getDragData(e).rowIndex;
								if (cindex == data.rowIndex
										|| cindex == data.rowIndex + 1) {
									return;
								}
								var rec = st.getAt(data.rowIndex);
								for (var i = 0, j = 0; i < st.getCount(); i++) {
									if (i == data.rowIndex)
										continue;
									if (i == cindex)
										rec.set("row_index", j++);
									st.getAt(i).set("row_index", j++);
								}
								st.resumeEvents();
								st.sort("row_index", "ASC");
								data.grid.getSelectionModel().selectRow(rec
										.get("row_index"));
								return true;
							}
						});
				this.getSelectionModel().on("beforerowselect",
						function(obj, r, k, record) {
							ColumnPanel.stopEditing(true);
							this.ddText = record.get("title");
							return true;
						}, this);
			}, ColumnPanel);
	ColumnPanel.on("beforeupdate", function(gd, rec, rowIndex, editors) {
				for (var i = 0; i < editors.length; i++) {
					if (!editors[i].field.validate()) {
						Ext.msg("error", '本行内容有错误,请更正后继续'.loc());
						this.errorStat = true;
						return false;
					}
				}
				if (editors[2].getValue() == '21') {
					rec.set("query_column", editors[5].getValue())
				}
				return true;
			}, ColumnPanel);

	ColumnPanel.on("beforeentryedit", function(gd, rec, rowIndex) {
				if (this.errorStat)
					return false;
				dataTypeStore.loadData(rec.get("res").arr);
				ctrl_type.rIdx = rowIndex;
				ctrl_type.lastQuery = rowIndex;
				if (dataTypeStore.getCount() > 0) {
					if (rec.get("ctrl_type") == '')
						rec.set("ctrl_type", dataTypeStore.getAt(0)
										.get("value"));
					ctrl_type.fireEvent("select", ctrl_type, rec, 0, rec
									.get("ctrl_type"));
					if (rec.get("ctrl_type") == '21') {
						rec.set("link_widget", rec.get("query_column"));
					}
				}
			}, ColumnPanel);
	this.MainTabPanel = ColumnPanel;
}
dev.ctrl.InputManage.CtrlColumn = function(config) {
	Ext.apply(this, config);
	if (!this.id) {
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};
dev.ctrl.InputManage.CtrlColumn.prototype = {
	init : function(grid) {
		this.grid = grid;
		this.grid.on('render', function() {
					var view = this.grid.getView();
					view.mainBody.on('mousedown', this.onMouseDown, this);
				}, this);
	},
	onMouseDown : function(e, t) {
		if (e.button == 2)
			return;
		if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
			e.stopEvent();
			var gd = this.grid;
			var rowIndex = gd.getView().findRowIndex(t);

			using("lib.scripteditor.CodeEditor");
			var id = Ext.id();
			var codeEditor = new lib.scripteditor.CodeEditor({
				fieldLabel : '自定义属性:<br>[按F11键或<br>点<a href="#" onclick="Ext.getCmp(\''
						+ id
						+ '\').codeEditor.setFullScreen(true);">此处</a>进入全屏<br>ESC键退出全屏],<br>注意事项参见<a href="#" title="1、此处定义的属性优先级最高，会覆盖所有已经设定的属性\n2、必须填写格式合法的json,如:{\'style\':\'font-weight:bold\'}" >说明</a>',
				name : 'extendAttributes',
				height : 120,
				id : id,
				allowSearchAndReplace : true,
				allowFormatter : true,
				allowFullScreen : true,
				language : "js"
			});
			var fieldArray = [{
						fieldLabel : '校验正则表达式'.loc(),
						name : 'regex',
						xtype : 'textfield'
					}, {
						fieldLabel : '校验错误提示'.loc(),
						name : 'regexText',
						xtype : 'textfield'
					}, {
						fieldLabel : '即时提示'.loc(),
						name : 'annotation',
						xtype : 'textarea',
						qtip : {
							text : "用冒号分隔的字符串,第一个冒号前是标题,冒号后是提示内容",
							title : "提示"
						}
					}, {
						fieldLabel : '缺省值'.loc(),
						name : 'default_value',
						xtype : 'textfield'
					}, {
						fieldLabel : '控件高度(px)'.loc(),
						name : 'height',
						xtype : 'numberfield'
					}, codeEditor];
			var rec = gd.getStore().getAt(rowIndex);
			if (rec.get('special_set') == '1') {
				var option_id = 0;
				if (rec.get('option_id'))
					option_id = rec.get('option_id');
				var loader = new Ext.tree.TreeLoader({
							dataUrl : '/dev/database/dictTree.jcp?',
							requestMethod : "GET",
							baseParams : {}
						})
				loader.on("beforeload", function(treeLoader, node) {
							this.baseParams.level = node.attributes.level;
						}, loader);
				var dictCombo = new lib.ComboTree.ComboTree({
							fieldLabel : '页面字典'.loc(),
							name : 'option_id',
							width : 200,
							queryParam : "type",
							mode : 'remot',
							root : new Ext.tree.AsyncTreeNode({
										text : '所有选项'.loc(),
										draggable : false,
										id : '0',
										level : 0,
										icon : "/themes/icon/all/plugin.gif"
									}),
							loader : loader
						});
				Ext.Ajax.request({
							url : '/dev/database/dictTree.jcp?',
							method : 'post',
							params : {
								node : option_id
							},
							callback : function(options, success, response) {
								if (response.responseText.length > 12) {
									var o = Ext.decode(response.responseText);
									dictCombo.setValue(o.id, o.name);
								}
							}
						});
				fieldArray.push(dictCombo);
			}
			if (!gd.window) {
				var config = {
					title : '输入扩展项'.loc(),
					width : 450,
					height : 380,
					autoScroll : true,
					modal : true,
					layout : 'fit',
					tbar : ['->', {
								text : '保存'.loc(),
								icon : '/themes/icon/xp/save.gif',
								cls : 'x-btn-text-icon',
								handler : function() {
									var frm = Ext.getCmp("innerSetForm");
									frm.items.each(function(o) {
												frm.rec.set(o.name, o
																.getValue());
											});
									gd.window.hide();
								}
							}, {
								text : '关闭'.loc(),
								icon : '/themes/icon/xp/close.gif',
								cls : 'x-btn-text-icon',
								handler : function() {
									gd.window.hide();
								},
								scope : this
							}],
					items : [{
								xtype : 'form',
								id : 'innerSetForm',
								bodyStyle : 'padding:10 0 0 30;',
								defaults : {
									width : 260
								},
								border : false,
								items : fieldArray
							}],
					shadow : false,
					frame : true
				}
				gd.window = new Ext.Window(config);

				gd.window.on('beforeclose', function() {
							gd.window.hide();
							return false;
						}, gd);
			}
			var y = Ext.lib.Dom.getViewHeight() - e.xy[1]
					+ Ext.getDoc().getScroll().top;
			y = (y < 300) ? e.xy[1] - 226 : e.xy[1] + 16;
			gd.window.setPagePosition(e.xy[0] - gd.window.width + 5, y);
			gd.window.show();
			var frm = Ext.getCmp("innerSetForm");
			frm.rec = gd.getStore().getAt(rowIndex);
			frm.form.setValues(frm.rec.data);
		}
	},

	renderer : function(value, parent, rec) {
		return '<img class="x-grid3-cc-' + this.id
				+ '" src="/themes/icon/all/book_next.gif" />';
	}
};

Ext.grid.CheckColumn = function(config) {
	Ext.apply(this, config);
	if (!this.id) {
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};
Ext.grid.CheckColumn.prototype = {
	init : function(grid) {
		this.grid = grid;
		this.grid.on('render', function() {
					var view = this.grid.getView();
					view.mainBody.on('mousedown', this.onMouseDown, this);
				}, this);
	},

	onMouseDown : function(e, t) {
		if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
			e.stopEvent();
			if (this.grid.viewMode)
				return;
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex, !record.data[this.dataIndex]);
			if (this.id == 'pmkradio' && record.data[this.dataIndex]) {
				record.set("not_null", true);
			}
		}
	},

	renderer : function(v, p, record) {
		p.css += ' x-grid3-check-col-td';
		return '<div class="x-grid3-check-col' + (v ? '-on' : '')
				+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
	}
};
