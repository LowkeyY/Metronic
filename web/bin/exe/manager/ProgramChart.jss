CPM.manager.ProgramChart = Ext.extend(CPM.manager.CustomizeObject, {
	className : 'CPM.manager.ProgramChart',
	programType : 'ProgramChart',
	updateData : function(panel, param) {
		param.ra = Math.random();
		param.renderType = "anychart";
		if (panel.params && typeof(panel.params.query) == 'string'
				&& typeof(param.query) == 'undefined') {
			param.query = panel.params.query;
		}
		panel.params = param;
		if (panel.chart) {
			panel.chart.clear();
		}
		Ext.Ajax.request({
					url : '/bin/exe/chart.jcp',
					params : param,
					method : 'GET',
					scope : this,
					callback : function(options, success, response) {
						if (!success) {
							var msg = CPM.getResponeseErrMsg(response);
							Ext.msg("info", '获取图表错误.'.loc() + msg);
							return;
						}

						var res = response.responseText;
						if (res && success) {
							var result = Ext.decode(res);
							if (result.success) {
								var mod = CPM.getModule("ProgramChart");
								mod.dealData(panel, result, mod, param);
							} else {
								panel.chart.clear();
								Ext.msg("error", result.message);
							}
						}

					}
				});
	},
	dealData : function(panel, result, mod, param) {
		if (typeof(panel.barFilled) == 'undefined' && result.buttonArray) {
			panel.barFilled = true;
			var ja = result.buttonArray;
			var btns = new Array(), cb = null;
			for (var i = 0; i < ja.length; i++) {
				cb = this.getButton(ja[i], panel.id);
				btns.push((cb == null) ? ja[i] : cb);
			}
			var tb = panel.getTopToolbar();
			if (Ext.isDefined(result.events)) {
				Ext.iterate(result.events, function(name, event) {
							panel.on(name, event);
						});
				delete result.events;
			}
			tb.add(btns);
			if (result.searchEditor) {
				var editors = result.searchEditor.editors;
				if ((editors instanceof Array) && editors.length > 0) {
					if (result.searchEditor.libs.length > 0) {
						eval(result.searchEditor.libs);
					}
					tb.addFill();
					var eds = [];
					for (var i = 0; i < editors.length; i++) {
						if (editors[i].xtitleList) {
							editors[i] = Ext.ComponentMgr.create(editors[i],
									'textfield')
							eds.push(editors[i]);
						}
						tb.add(editors[i]);
					}
					tb.addButton(new Ext.Toolbar.Button({
								text : '过滤'.loc(),
								scope : this,
								panelId : panel.id,
								icon : '/themes/icon/xp/selectlink.gif',
								cls : 'x-btn-text-icon bmenu',
								handler : function(btn) {
									var result = {};
									for (var i = 0; i < eds.length; i++) {
										if (!eds[i].validate()) {
											Ext.msg("error", '请改正标示出的错误.'.loc());
											return false;
										}
										var v=eds[i].getValue();
										if(v instanceof Date){
											v=v.format(eds[i].format);
										}
										result[eds[i].xtitleList] = v;	
									}
									var mod = CPM.getModule("ProgramChart");
									var tempPanel = Ext.getCmp(btn.panelId)
									var params = tempPanel.params;
									params = Ext.applyIf({
												query : Ext.encode(result)
											}, params);
									mod.updateData(tempPanel, params);
								}
							}));
					tb.addButton(new Ext.Toolbar.Button({
								text : '还原'.loc(),
								scope : this,
								panelId : panel.id,
								icon : '/themes/icon/all/magifier_zoom_out.gif',
								cls : 'x-btn-text-icon bmenu',
								handler : function(btn) {
									var mod = CPM.getModule("ProgramChart");
									var tempPanel = Ext.getCmp(btn.panelId)
									var params = tempPanel.params;
									params = Ext.applyIf({
												query : "{}"
											}, params);
									mod.updateData(tempPanel, params);
									for (var i = 0; i < eds.length; i++) {
										eds[i].reset();
									}
								}
							}));
				}
			}

			panel.doLayout();
		}
		var res = result.xmlString;
		if (result.interval && result.interval > 0) {
			mod.startGetSample(panel, param, result);
		}
		if (panel.cleared) {
			try {
				panel.chart.setData(res);
			} catch (e) {
				Ext.msg("info", '未查到此图表相关的数据!'.loc());
			}
		} else {
			panel.fn = function() {
				try {
					panel.chart.setData(res);
				} catch (e) {
					Ext.msg("info", '未查到此图表相关的数据!'.loc());
				}
				panel.cleared = true;
				delete panel.fn;
			}
		}
	},
	startGetSample : function(panel, param, result) {
		var inParams = {
			objectId : param.objectId,
			renderType : param.renderType
		};
		var remain = result.remain;
		var chartType = result.type;
		panel.interval = setInterval(function() {
					var ca = panel.chart;
					var fn = function(options, success, response) {
						if (!success) {
							var msg = CPM.getResponeseErrMsg(response);
							Ext.msg("info", '获取数据错误.'.loc() + msg);
							return;
						}
						var ret = response.responseText;
						if (ret.length > 1) {
							try {
								ret = Ext.decode(ret);
								for (var i in ret) {
									if (chartType == 'gauge') {
										ca.updatePointData("chart1", i, {
													value : ret[i]
												});
									} else {
										var id = i.substring(1) * 1;
										var info = null;
										try {
											info = ca.getInformation();
										} catch (e) {
											clearInterval(panel.interval);
											Ext.msg("info", '从服务器获取错误数据.'.loc());
											return;
										}
										var se = info.Series[id];
										ca.addPoint(i, "<point id='"
														+ ret[i].id
														+ "' name='"
														+ ret[i].name + "' y='"
														+ ret[i].y + "' />");
										var j = 0;
										if (se.Points.length > remain) {
											j = se.Points.length - remain;
											for (var k = 0; k < j; k++) {
												id = se.Points[k].ID;
												ca.removePoint(i, id);
											}

										}
										ca.refresh();
									}
								}
							} catch (e) {
								Ext.msg("info", '从服务器获取数据后发生错误.'.loc());

							}
						}
					}
					Ext.Ajax.request({
								url : '/bin/exe/chart.jcp',
								params : inParams,
								method : 'POST',
								scope : this,
								callback : fn
							});
				}, result.interval * 1000);
		panel.on("destroy", function() {
					if (typeof(this.interval) != 'undefined') {
						clearInterval(this.interval);
						delete this.interval;
					}
				}, panel);
	},
	load : function(size, parentPanel, param) {
		
		/**
		 * --chartfx更新 <code> var imgId=Ext.id();
		var inner = new Ext.Panel({
			html:"<img  src='"+Ext.BLANK_IMAGE_URL+"' id='"+imgId+"'>"
		});
		parentPanel.add(inner);
		parentPanel.doLayout();
		
		var bx = inner.getBox();
		param.height = bx.height;
		param.width = bx.width;
		Ext.getDom(imgId).src="/bin/exe/chart.jcp?renderType=chartfx&"+Ext.urlEncode(param);
		
		return;
		</code>
		 */
		var config = {};
		if (size.indexOf(",") == -1 && param.showTopToolbar != false) {
			config.tbar = [""];
		} else {
			config.border = false;
		}
		var inner = new Ext.Panel(config);
		var chart = new AnyChart("/lib/chart/AnyChart.swf");

		var initChart = function() {
			var bx;
			if (size && size.indexOf(",") != -1) {
				var vs = size.split(",");
				bx = {
					width : vs[0],
					height : vs[1]
				};
			} else {
				bx = parentPanel.getBox();
			}
			if (bx.width == 0 || typeof(inner.chart) != 'undefined') {
				return;
			}
			
			var desktopWidth = WorkBench.Desk.getDesktop().getViewWidth();
			if(bx.width>desktopWidth){
				initChart.defer(30,this);
				return;
			}
			
			inner.chart = chart;
			this.updateData(inner, Ext.apply(bx, param), true);
			inner.param = param;
			chart.wMode = "transparent";
			chart.width = (bx.width<21)?parentPanel.ownerCt.getWidth():bx.width;
			chart.addEventListener('create', function() {
						if (inner.fn) {
							inner.fn();
						} else {
							inner.cleared = true;
						}
					});
			chart.height = bx.height - 25;
			chart.waitingForDataText = '数据载入中...'.loc();
			chart.write(inner.body.dom);
		};
		inner.once("afterlayout", initChart, this);
		parentPanel.add(inner);
		parentPanel.doLayout();
	},
	canUpdateDataOnly : function(panel, parentPanel, param) {
		return (typeof(panel) != 'undefined')
				&& panel.param.objectId == param.objectId
				&& panel.param.programType == param.programType
	},
	buttonMap : {
		'%showdata' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				CPM
						.replaceTarget(panel, panel.ownerCt, panel.param,
								btn.target);
			}
		},
		'%print' : {
			handler : function(btn) {
				var chart = Ext.getCmp(btn.panelId).chart;
				chart.printChart();
			}
		},
		'%set' : {
			handler : function(btn) {
				loadcss("lib.RowEditorGrid.ListInput");
				using("lib.CachedPanel.CachedPanel");
				using("lib.ComboRemote.ComboRemote");
				using("lib.ChartDefine.ChartDefine");
				using("lib.ColorField.ColorField");
				using("lib.RowEditorGrid.RowEditorGrid");
				using("lib.RowEditorGrid.ListInput");
				var panel = Ext.getCmp(btn.panelId);

				var params = Ext.apply({
							prg_id : panel.param.objectId,
							parent_id : panel.param.objectId,
							saveId : "user"
						}, panel.param);

				var ChartDefineForm = new lib.ChartDefine.ChartDefine(params,undefined, true, undefined,true, true);

				ChartDefineForm.loadData(params);
				var queryList = [];
				queryList.push(new Ext.Toolbar.Button({
					text : '保存'.loc(),
					icon : '/themes/icon/xp/save.gif',
					cls : 'x-btn-text-icon  bmenu',
					disabled : false,
					scope : this,
					hidden : false,
					handler : function() {
						if (ChartDefineForm.params['parent_id'] == null) {
							Ext.msg("error", '不能完成保存操作!,必须选择一应用下建立图表定义'.loc());
						} else {
							var saveParams = ChartDefineForm.params;
							var storeValue = [];
							var myGrid = ChartDefineForm.columnForm;
							var allRecords = myGrid.store.getRange(0);

							if (!ChartDefineForm.checkChart(myGrid.store,
									allRecords))
								return;

				//			for (var i = 0; i < allRecords.length - 1; i++)
							for (var i = 0; i < allRecords.length; i++)
								storeValue[i] = allRecords[i].data;

							saveParams['fields'] = Ext.encode(storeValue);
							saveParams['parent_id'] = ChartDefineForm.params.parent_id;
							saveParams['chart_id'] = ChartDefineForm.curvemagForm.form
									.findField('chart_id').getValue();
							saveParams['type'] = 'save';
							if (ChartDefineForm.frm.isValid()) {
								ChartDefineForm.frm.submit({
									url : '/lib/ChartDefine/CurveUserDefine.jcp',
									params : saveParams,
									method : 'post',
									scope : this,
									success : function(form, action) {
										Ext.msg("info", '完成图表信息更新!'.loc());
										var mod = CPM.getModule("ProgramChart");
										var tempPanel = Ext.getCmp(btn.panelId);
										var params = tempPanel.params;
										mod.updateData(tempPanel, params);
										window.close();
									},
									failure : function(form, action) {
										Ext.msg(
														"error",
														'数据提交失败!,原因:'.loc()+'<br>'
																+ action.result.message);
										window.close();
									}
								});
							} else {
								Ext.msg("error", '数据不能提交,请修改表单中标识的错误!'.loc());
							}
						}

					}
				}));
				queryList.push(new Ext.Toolbar.Button({
					text : '恢复设置'.loc(),
					icon : '/themes/icon/xp/move.gif',
					cls : 'x-btn-text-icon  bmenu',
					disabled : false,
					scope : this,
					hidden : false,
					state : 'edit',
					handler : function() {
						var delParams = ChartDefineForm.params;
						delParams['type'] = 'delete';
						delParams['chart_id'] = ChartDefineForm.curvemagForm.form
								.findField('chart_id').getValue();
						delParams['parent_id'] = ChartDefineForm.params.parent_id;
						ChartDefineForm.curvemagForm.form.submit({
									url : '/lib/ChartDefine/CurveUserDefine.jcp',
									params : delParams,
									method : 'POST',
									scope : this,
									success : function(form, action) {
										Ext.msg("info", '数据提交完毕!'.loc()+'<br>');
										var mod = CPM.getModule("ProgramChart");
										var tempPanel = Ext.getCmp(btn.panelId);
										var params = tempPanel.params;
										mod.updateData(tempPanel, params);
										window.close();
									},
									failure : function(form, action) {
										Ext.msg(
														"error",
														'数据提交失败!,原因:'.loc()+'<br>'
																+ action.result.message);
										window.close();
									}
								});
					}

				}));
				queryList.push(new Ext.Toolbar.Button({
							text : '退出'.loc(),
							icon : '/themes/icon/xp/cancel.png',
							cls : 'x-btn-text-icon  bmenu',
							disabled : false,
							scope : this,
							hidden : false,
							handler : function() {
								window.close();
							}
						}));

				var window = new Ext.Window({
							title : '修改绘图参数'.loc(),
							width : 940,
							height :600,
							autoScroll : false,
							layout : 'fit',
							modal : true,
							plain : true,
							items : ChartDefineForm.MainTabPanel,
							buttons : queryList
						});

				window.show();

			}
		}
	}
});