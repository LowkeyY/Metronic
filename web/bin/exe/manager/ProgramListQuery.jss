using("bin.exe.manager.List");
using("lib.GroupHeaderGrid.GroupHeaderGrid");
CPM.manager.ProgramListQuery = Ext.extend(CPM.manager.List, {
	className : 'CPM.manager.ProgramListQuery',
	programType : 'ProgramListQuery',
	updateData : function(panel, param) {
		panel.store.load({
					params : param
				});
		Ext.apply(panel.store.baseParams, param);
	},
	createModel : function(parentPanel, json, param, config) {

		this.headerArray = [];
		var row = {};
		var leaf = {};
		this.headLoad = false;
		for (var i = 0; i < json.cm.length; i++) {
			var cols = json.cm[i];

			var title = cols.header;
			var headerGroup = cols.headerGroup;

			if (headerGroup && headerGroup != '') {
				var t = headerGroup.split('::');
				row[title] = t;
			}
		}
		var level = 0;
		for (var i = 0; i < json.cm.length; i++) {
			var cols = json.cm[i];
			var title = cols.header;
			if (row[title]) {
				var t = row[title];
				if (t.length > level) {
					level = t.length;
				}
			}
		}

		for (var i = 0; i < level; i++) {
			var childArray = [];
			childArray.push({});
			var colSpan = 0;
			var headTitle = "";
			for (var j = 0; j < json.cm.length; j++) {
				var cols = json.cm[j];
				var title = cols.header;
				var t = row[title];
				if ((typeof(t) != "undefined") && t[i]) {
					if (headTitle == t[i]) {
						colSpan++;
						if (j == json.fields.length - 1) {
							if (headTitle != "") {
								var headerSpan = {};
								headerSpan['header'] = headTitle;
								headerSpan['colspan'] = colSpan + 1;
								headerSpan['align'] = 'center';
								childArray.push(headerSpan);
								colSpan = 0;
							}
						}
					} else {
						if (headTitle != "") {
							var headerSpan = {};
							headerSpan['header'] = headTitle;
							headerSpan['colspan'] = colSpan + 1;
							headerSpan['align'] = 'center';
							childArray.push(headerSpan);
							colSpan = 0;
						}
						headTitle = t[i];
					}
				} else {
					if (headTitle != "") {
						var headerSpan = {};
						headerSpan['header'] = headTitle;
						headerSpan['colspan'] = colSpan + 1;
						headerSpan['align'] = 'center';
						childArray.push(headerSpan);
					}
					colSpan = 0;
					headTitle = "";
					childArray.push({});
				}
			}
			if (!this.headLoad) {
				this.headerArray.push(childArray);
			}
			if (level - 1 == i) {
				this.headLoad = true;
			}
		}
		this.headerGroup = new lib.GroupHeaderGrid.GroupHeaderGrid({
					rows : this.headerArray,
					hierarchicalColMenu : true
				});
		if (parentPanel.ownerCt.xtype == 'tabpanel' && json.title) {
			parentPanel.setTitle(json.title);
		}
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : CPM.action,
								method : "GET"
							}),
					sortInfo : json.sortInfo,
					reader : new bin.exe.PureArrayReader({}, Ext.data.Record
									.create(json.fields)),
					baseParams : Ext.applyIf({
								DataPartMode : 'data'
							}, param),
					sort : function(fieldName, dir) {
						if (this.lastOptions) {
							if (!this.lastOptions.params)
								this.lastOptions.params = {};
							this.lastOptions.params.DataPartMode = 'puredata';
						}
						return this.singleSort(fieldName, dir);
					},
					autoLoad : false,
					remoteSort : true
				});

		var id = Ext.id();
		var plugins = [];
		var hasFilter = Ext.isDefined(json.filters)
				&& !Ext.isDefined(json.searchEditor); // 定义了搜索框时，过滤器失效。

		if (hasFilter) {
			json.filters = new Ext.grid.GridFilters({
						filters : json.filters
					});
			plugins.push(json.filters);
		}

		var pageBar = new Ext.PagingToolbar({
					store : store,
					plugins : plugins,
					displayInfo : true,
					pageSize : json.PageSize,
					displayMsg : '{0}-{1}条 共:{2}条'.loc(),
					emptyMsg : '没有数据'.loc()
				});
		pageBar.on("beforechange", function(bar, o) {
					o.DataPartMode = 'puredata';
				});

		plugins.push(this.headerGroup);

		var panel = {
			xtype : 'grid',
			cm : this.createColumnModel(json),
			border : false,
			stripeRows : true,
			store : store,
			id : id,
			exportInfo : json.exportInfo,
			head : false,
			plugins : plugins,
			objectId : param.objectId,
			height : 250,
			loadMask : true,
			iconCls : 'icon-grid',
			programType : param.programType,
			loadResult : this.loadResult,
			listeners : {
				rowdblclick : function(panel, rowIndex, e) {
					var tar = panel.getColumnModel().target;
					if (typeof(tar) == 'undefined') {
						return false;
					}
					var rec = panel.getStore().getAt(rowIndex);
					var module = CPM.getModule(panel.param.programType);
					var p = module.getExportParams(panel, rec, {
								pData : rec.get("pmk"),
								dataId : rec.get("pmk"),
								pageType : 'view',
								programType : "ProgramInput"
							});

					var p = Ext.applyIf(p, panel.param);
					if (typeof(p.sort) != 'undefined') {
						delete p.dir;
						delete p.sort;
					}
					CPM.replaceTarget(panel, panel.ownerCt, p, tar);
				}
			},
			bbar : pageBar
		};
		if (Ext.isDefined(json.events)) {
			if (Ext.isFunction(json.events.beforeinit)) {
				if (json.events.beforeinit.call(this, panel, json, param,
						parentPanel) === false) {
					return;
				}
				delete json.events.beforeinit;
			}
			Ext.apply(panel.listeners, json.events);
		}
		if (hasFilter) {
			panel.filters = json.filters;
			delete json.filters;
		}

		if (json.gridGroupHead) {
			using("lib.GroupHeaderGrid.GroupHeaderGrid");
			panel.plugins.push(new lib.GroupHeaderGrid.GroupHeaderGrid({
						rows : json.gridGroupHead,
						hierarchicalColMenu : true
					}));
		}

		if (json.haveUnit) {
			var units = new Array();
			Ext.each(json.cm, function(item) {
						if (item.unit)
							units.push(item);
					})
			var up = new bin.exe.UnitPlugin(units);
			panel.plugins.push(up);
		}

		if (typeof(json.autoExpandColumn) != 'undefined') {
			panel.autoExpandColumn = json.autoExpandColumn;
		}
		if (typeof(config) != 'undefined') {
			Ext.apply(panel, config);
		}

		if (Ext.isArray(json.buttonArray)) {
			var btns = new Array(), cb = null;
			Ext.each(json.buttonArray, function(btn) {
						cb = this.getButton(btn, id);
						btns.push((cb == null) ? btn : cb);
					}, this);
			if (btns.length > 0) {
				if (Ext.isDefined(json.disabledButton)) {
					Ext.each(btns, function(btn) {
						if (json.disabledButton.indexOf("," + btn.text + ",") != -1) {
							btn.disabled = true;
						}
					})
				}
				panel.tbar = {
					xtype : 'toolbar',
					enableOverflow : true,
					items : btns
				}
			};
		}
		if (Ext.isDefined(json.searchEditor)) {
			this.appendSearchEditor(panel, json, param);
		}
		if (json.showHelpButton) {
			CPM.Help.addHelpButton(panel, param);
		}
		panel = this.adjustPanel(panel, param, json);

		panel = parentPanel.add(panel);

		if (json.logHistroy === true) {
			panel.on("beforedestroy", function(grid) {
						CPM.History.add(this.getState());
						CPM.History.addFunction(parentPanel);
					}, this);
		}
		parentPanel.doLayout();
		panel = this.fixPanel(panel, param, json);
		return panel;
	},
	adjustPanel : function(panel, param, json) {
		// 导出参数
		var cm = json.cm;
		var exportArray = new Array();
		for (var i = 0; i < cm.length; i++) {
			if (cm[i].isExport) {
				exportArray.push([cm[i].export_name, cm[i].dataIndex,
						+cm[i].export_seq]);
			}
		}
		if (exportArray.length > 0) {
			exportArray.sort(function(a, b) {
						return a[2] - b[2];
					});
			panel.exportArray = exportArray;
		}
		// pks
		if (json.mainTab) {
			panel.pks = [json.mainTab, json.mainPk];
		}
		if (json.enableChartMenu) {// 添加绘图菜单
			panel.listeners.afterrender = function(grid) {
				var chartMenu = new Ext.menu.Menu({
							id : grid.id + "-charts-menu"
						});
				var self = CPM.getModule('ProgramListQuery');
				chartMenu.on("beforeshow", self.beforeChartMenuShow, grid);
				chartMenu.on("itemclick", self.handleChartMenuClick, grid);
				grid.view.hmenu.on("hide", self.handleChartMenuHide, grid);
				grid.view.hmenu.add({
							text : '绘图'.loc(),
							menu : chartMenu,
							hideOnClick : false,
							cls : "xg-hmenu-reset-columns"
						});
				grid.view.chartMenu = chartMenu;
			}

		}
		return panel;
	},
	appendSearchEditor : function(panel, json, param) {
		var arr = Ext.isDefined(panel.tbar) ? panel.tbar.items : [];
		arr.push("->");
		if (Ext.isDefined(json.searchEditor.libs)) {
			eval(json.searchEditor.libs);
		}
		var editors = json.searchEditor.editors;

		if (param.filter) {// 判断param.filter否存在,存在则改变默认过滤值
			var f=Ext.decode(param.filter);
			for (var i = 0; i < editors.length; i++) {
				if (Ext.isDefined(f[editors[i].xtitleList])) {
					editors[i].value = f[editors[i].xtitleList];
				}
			}
		}

		for (var i = 0; i < editors.length; i++) {
			arr.push(editors[i]);
			arr.push(" ");
		}
		arr.push(new Ext.Toolbar.Button({
					text : '查询'.loc(),
					panelId : panel.id,
					icon : '/themes/icon/xp/selectlink.gif',
					cls : 'x-btn-text-icon bmenu',
					handler : function(btn) {
						var cbk = function() {
							var result = {};
							var eds = [];
							var panel = Ext.getCmp(btn.panelId);
							panel.getEl().mask('数据载入中'.loc(), "x-mask-loading");
							panel.getTopToolbar().items.each(function(item) {
										if (Ext.isDefined(item.xtitleList))
											eds.push(item);
									});
							var store = panel.getStore();
							var v;
							for (var i = 0; i < eds.length; i++) {
								if (!eds[i].validate()) {
									panel.getEl().unmask();
									Ext.msg("error", '请改正标示出的错误.'.loc());
									return false;
								}
								v=eds[i].getValue();
								if(v instanceof Date){
									v=v.format(eds[i].format);
								}
								result[eds[i].xtitleList] = v;
							}

							if (Ext.isDefined(panel.beforeFilter)) {
								if (panel.beforeFilter(panel, eds, result) === false) {
									panel.getEl().unmask();
									return;
								}
							}
							Ext.apply(store.baseParams, {
										meta : false,
										filter : Ext.encode(result)
									});
							store.load({
										params : {
											start : 0,
											limit : panel.pageSize
										},
										scope : this,
										callback : function() {
											panel.getEl().unmask();
										}
									})
						};
						cbk.defer(30, this);
					}
				}));
		arr.push(new Ext.Toolbar.Button({
					text : '还原'.loc(),
					scope : this,
					panelId : panel.id,
					icon : '/themes/icon/all/magifier_zoom_out.gif',
					cls : 'x-btn-text-icon bmenu',
					handler : function(btn) {
						var panel = Ext.getCmp(btn.panelId);
						var eds = [];
						panel.getTopToolbar().items.each(function(item) {
									if (Ext.isDefined(item.xtitleList))
										eds.push(item);
								});

						for (var i = 0; i < eds.length; i++) {
							eds[i].reset();
						}
						if (Ext.isDefined(panel.beforeFilterReset)) {
							if (panel.beforeFilterReset(panel, eds, result) === false)
								return;
						}
						var store = panel.getStore();
						Ext.apply(store.baseParams, {
									meta : false,
									filter : "{}"
								});
						store.load({
									params : {
										start : 0,
										limit : panel.pageSize
									}
								})
					}
				}));
		panel.tbar = arr;
		delete json.searchEditor;
	},
	createColumnModel : function(json) {
		var cm = json.cm, tar = null;
		for (var i = 0; i < cm.length; i++) {
			if (typeof(cm[i].target) != 'undefined') {
				tar = cm[i].target;
				delete cm[i].target;
				break;
			}
			if (Ext.isString(cm[i].renderer)) {
				cm[i].renderer = eval(cm[i].renderer);
			}

		}
		if (json.modelPatch) {
			var len = Math.min(json.modelPatch.length, cm.length)
			for (var i = 0; i < len; i++) {
				Ext.apply(cm[i], json.modelPatch[i]);
			}
		}

		cm.unshift(new Ext.grid.RowNumberer());
		cm = this.getSuper().createColumnModel(json);
		if (tar != null)
			cm.target = tar;

		return cm;
	},
	beforeChartMenuShow : function() {
		var cm = this.view.cm, colCount = cm.getColumnCount();
		this.view.chartMenu.removeAll();
		this.selectedChartCol = {};
		this.selectedChartColUnit = {};
		this.chartCol = [];
		this.seq = 0;
		for (var i = 0; i < colCount; i++) {
			if (cm.config[i].fixed !== true && cm.config[i].hideable !== false) {

				this.view.chartMenu.add(new Ext.menu.CheckItem({
							// id : "chart-" + cm.getColumnId(i),
							text : cm.getColumnById(cm.getColumnId(i)).dataIndex,// cm.getColumnById(cm.getColumnId(i)).header,
							checked : false,
							hideOnClick : false,
							disabled : cm.isHidden(i)
						}));

				if (!cm.isHidden(i)) {
					var col = new Array();
					// col[0] = cm.getColumnHeader(i);
					// col[1] = cm.getColumnHeader(i);
					var str1 = cm.getColumnHeader(i); // 带单位列头？
					col[0] = cm.getDataIndex(i); // 'text'
					col[1] = cm.getDataIndex(i); // 'value'
					col[2] = ""; // 'titleUnit'
					if (str1.length > col[1].length) {
						var n = str1.indexOf("(");
						if (n == -1) {
							n = str1.indexOf("（");
						}

						if (n != -1) {
							col[2] = str1.substring(n + 1, str1.length - 1)
						}

					}
					this.chartCol.push(col);
				}
			}
		}
	},

	handleChartMenuHide : function(menu, grid) {
		var baseParams = Ext.apply({}, this.param);
		if (this.store.baseParams.filter) {
			baseParams.query = this.store.baseParams.filter;
		}

		function isEmty(s) {
			for (var i in s)
				return false;
			return true;
		}

		if (!isEmty(this.selectedChartCol) && this.seq > 0) {
			using("lib.ColorField.ColorField");
			using("lib.RowEditorGrid.RowEditorGrid");
			using("bin.bi.ChartManager");
			var chartSet = {};
			chartSet['query_id'] = baseParams['objectId'];
			// chartSet['Combine_Num'] = this.seq - 1;
			chartSet['Combine_Num'] = 1;
			chartSet['checkGrid'] = '0';
			chartSet['AxisXFormat'] = '20';
			chartSet['view3DDepth'] = '0';
			chartSet['sameScale'] = '1';
			chartSet['Iner_Color'] = '#FFFFFF';
			chartSet['checkLineMark'] = '1';
			chartSet['checkGrid'] = '1';
			chartSet['line_Color'] = '#FFFFFF';
			chartSet['plotType'] = 'CategorizedVertical';
			chartSet['chartColArray'] = this.chartCol;

			var unitArray = new Array();
			var k = 0;
			/*
			 * for (var i in this.selectedChartCol) { if
			 * (this.selectedChartCol[i] != 0) { var unit = new Array(); var
			 * unitId = k + 1; unit[1] = unitId; unit[0] = unitId + '单元';
			 * unitArray[k] = unit; k++; } }
			 */
			var unit = new Array();
			var unitId = 1;
			unit[1] = unitId;
			unit[0] = unitId + '单元'.loc();
			unitArray[0] = unit;

			chartSet['unitArray'] = unitArray;

			// 生成随机颜色
			function randomColor() {
				var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
				if (rand.length == 6) {
					return '#' + rand;
				} else {
					return '#' + randomColor();
				}
			}

			var selectColArray = new Array();
			var aaa = new Array;
			k = 0;
			var cm = this.view.cm

			for (var i in this.selectedChartCol) {

				if (this.selectedChartCol[i] * 1 > 0) {
					var unitt = cm.getColumnHeader(cm.findColumnIndex(i));
					var chartColumn = {};
					chartColumn['SERIES_ID'] = i;
					// chartColumn['UNIT_ID'] = this.selectedChartCol[i];
					chartColumn['UNIT_ID'] = '1';
					chartColumn['AXISYVALUE'] = i;
					chartColumn['yAxisTitle'] = unitt;
					chartColumn['yLegendTitle'] = unitt;
					chartColumn['TYPE_ID'] = 6;
					chartColumn['TYPE_ID_TXT'] = '曲线'.loc();
					chartColumn['yAxisStart'] = '0';
					chartColumn['yAxisType'] = '0';
					chartColumn['AXISYFORMAT'] = '1';
					chartColumn['AXIS_POSITION'] = '0';
					chartColumn['SERIES_COLOR'] = randomColor();
					selectColArray[k] = chartColumn;
					k++;
				} else {
					chartSet['AxisXValue'] = baseParams['xColumn'] = i;
					chartSet['xTitle'] = cm.getColumnHeader(cm
							.findColumnIndex(i));
				}

			}
			baseParams['filter'] = this.store.baseParams['filter'];
			chartSet['chartColumn'] = selectColArray;
			var setChartWindow = new bin.bi.ChartManager(baseParams);
			setChartWindow.load(chartSet, baseParams);
		}
	},
	handleChartMenuClick : function(item) {
		if (!item.checked) {
			this.selectedChartCol[item.text] = this.seq;
			this.seq++;
		} else {
			this.seq--;
			delete this.selectedChartCol[item.text];
		}
	},
	getExportParams : function(panel, record, config) {
		var param = panel.param;
		var data = record.data;
		if (Ext.isArray(panel.exportArray)) {
			var exportArray = panel.exportArray;
			var expItem = "";
			var expData = "";
			var p = {};
			for (var i = 0; i < exportArray.length; i++) {
				p[exportArray[i][0]] = true;
				expItem += exportArray[i][0] + ",";
				expData += data[exportArray[i][1]] + "::";
			}
			if (param.exportItem) {
				var itemArray = param.exportItem.split(",");
				var dataArray = param.exportData.split("::");

				for (var i = 0; i < itemArray.length; i++) {
					if (typeof(p[itemArray[i]]) == 'undefined') {
						expItem += itemArray[i] + ",";
						expData += dataArray[i] + "::";
					}
				}
			}
			config.exportItem = expItem.substring(0, expItem.length - 1);
			config.exportData = expData.substring(0, expData.length - 2);
		}
		if (Ext.isArray(panel.pks)) {
			config.exportTab = panel.pks[0];
			var pks = panel.pks[1].split("::");
			for (var i = 0, m; i < pks.length; i++) {
				m = data[pks[i]];
				pks[i] = Ext.isObject(m) ? m.value : m;
			}
			config.dataId = pks.length > 1 ? pks.join("::") : pks[0];
		}

		return Ext.applyIf(config, param);
	},
	fixPanel : function(panel, param, json) {
		var cm = panel.getColumnModel();
		var fn = this.saveColumModel.createCallback(panel);
		panel.on("columnresize", fn);
		panel.on("sortchange", fn);
		cm.on("widthchange", fn);
		cm.on("hiddenchange", fn);
		cm.on("columnmoved", fn);
		cm.on("columnlockchange", fn);
		return this.getSuper().fixPanel(panel, param, json);
	},
	saveColumModel : function(grid) {
		var c, config = grid.getColumnModel().config;
		var fields = [];
		for (var i = 1, len = config.length; i < len; i++) {
			c = config[i];
			fields[i] = {
				header : c.dataIndex,
				width : c.width
			};
			if (c.hidden) {
				fields[i].hidden = true;
			}
		}
		var sortState = grid.getStore().getSortState();

		var SaveParams = Ext.apply({
					'fields' : Ext.encode(fields)
				}, {
					'sort' : sortState ? Ext.encode(sortState) : sortState
				});
		SaveParams = Ext.apply(SaveParams, grid.param);

		Ext.Ajax.request({
					url : '/bin/bi/saveconfig.jcp',
					params : SaveParams
				});
	},
	buttonMap : {

		'%batchupdate' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				var rec = panel.getSelectionModel().getSelections();
				if (rec.length == 0) {
					Ext.msg("error", '请选择要更新的行.'.loc());
					return;
				}
				var p = panel.param;
				var ps = panel.exportInfo.split(",");
				var pmks = new Array();
				for (var i = 0; i < rec.length; i++) {
					pmks.push(rec[i].get(id));
				}
				var p = Ext.applyIf({
							pTab : ps.shift(),
							pItem : ps.join(","),
							pageType : 'batchupdate',
							data : pmks.join(",")
						}, panel.param);
				Ext.msg("confirm", '确定更新选择的记录?'.loc(), function(answer) {
							if (answer == 'yes') {
								CPM.replaceTarget(panel, panel.ownerCt, p,
										btn.target);
							}
						}.createDelegate(this));
			}
		},
		'%map' : {
			handler : function(btn) {
				Ext.msg("warn", '暂时未实现,请等待...'.loc());
			}
		}
	}
});