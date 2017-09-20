CPM.manager.Input = Ext.extend(CPM.manager.CustomizeObject, {
	className : 'CPM.manager.Input',
	/*
	 * 只更新panel中数据,只取数据部分,并完成赋值 @param objectId,dataId,importData
	 */
	updateData : function(panel, param) {
		panel.form.reset();
		this.getData("data", param, function(result) {
					panel.loadResult(result);
					panel.param = param;
				}, this);
	},
	getButton : function(btn, panelId) {
		if (typeof(this.buttonMap[btn.action]) != 'undefined') {
			return CPM.mkButton(btn, panelId, this.buttonMap[btn.action], this);
		} else if (this.getSuper() != null) {
			return this.getSuper().getButton(btn, panelId);
		} else {
			return CPM.mkButton(btn, panelId, {});
		}
	},
	/*
	 * 从服务器端获取数据并render,根据mode值决定取哪一部分 @param objectId,title,dataId,importData
	 */
	load : function(mode, parentPanel, param) {
		this.getData(mode, param, function(result, model) {
					if (Ext.isFunction(result.interceptor)
							&& result.interceptor(this, result, mode,
									parentPanel, param) === false) {
						return;
					}
					var panel;

					if (mode.indexOf("model") != -1) {
						CPM.addModel(param.objectId, model);
						panel = this.createModel(parentPanel, result, param);
						panel.loadResult(result);
						panel.param = param;
					} else {
						if (param.moduleReady == false) {
							param.moduleReady = (function(p, cresult) {
								p.loadResult(cresult);
							}).createCallBackWithArgs(result);
						} else {
							param.moduleReady.loadResult(result);
							delete param.moduleReady;
						}
					}
					Ext.isFunction(result.sequence)
							&& result.sequence(this, result, mode, parentPanel,
									param);
				}, this);
	},
	formEvent : function(form) {
		var eve = form.formEvent;
		delete form.formEvent;
		for (var i = 0; i < eve.length; i++) {
			var obj = form[eve[i][0]] || form.form.findField(eve[i][0]);
			if (obj)
				obj.on(eve[i][1], eve[i][2]);
		}
	},
	/*
	 * 根据model建panel,layout后返回建成的panel @param objectId,title @return panel
	 */
	createModel : function(parentPanel, json, param) {
		if (json.imports) {
			eval(json.imports);
		}
		var id = Ext.id();
		if (parentPanel.ownerCt.xtype == 'tabpanel' && json.title) {
			parentPanel.setTitle(json.title);
		}
		var panel = {
			xtype : 'form',
			labelWidth : json.labelWidth || 140,
			id : id,
			head : false,
			bodyStyle : "padding:20px 0 0 40px;overflow-y:auto;",
			objectId : param.objectId,
			programType : param.programType,
			param : param,
			paramCache : this.getDigest(param),
			loadResult : function(result) {
				if (Ext.isDefined(result.disabledButton)) {
					var referenceStr = "," + result.disabledButton;
					this.getTopToolbar().items.each(function(item) {

								item.setDisabled((item.text && referenceStr
										.indexOf("," + item.text + ",") != -1));
							});
				}
				this.form.setValues(result.data);
			}
		};
		// 处理挂在formPanel上的事件
		if (Ext.isArray(json.formEvent)) {
			var eves = [], e = json.formEvent;
			panel.listeners = {};
			for (var i = 0; i < e.length; i++) {
				if (e[i][0] == '') {
					if (e[i][1] == 'beforeinit') {
						if (e[i][2].call(this, panel, json, param, parentPanel) === false) {
							return;
						}
						continue;
					}
					panel.listeners[e[i][1]] = e[i][2];
				} else {
					eves.push(e[i]);
				}
			}
			if (eves.length > 0) {
				var cf = Ext.isDefined(panel.listeners.render)
						? panel.listeners.render.createSequence(this.formEvent,
								this)
						: this.formEvent;
				panel.listeners.render = cf
				panel.formEvent = eves;
			}
		}

		// view状态所有项目改为viewfield及子类,edit状态锁定主键

		var condition = (param.pageType == 'view') ? "xtype" : "pkmark";
		var fn = function(c) {
			if (c.items) {
				Ext.each(c.items, fn);
			} else {
				if (typeof(c.initPageType) == 'function'
						&& c.initPageType(c, param, json, param.pageType) === false) {
					return;
				}
				if (param.pageType == 'view') {
					if (c[condition] && c.xtype != 'hidden') {
						c.oldXtype = c.xtype;
						c.xtype = 'viewfield';
					}
				}
			}
			if (c.fieldConfig) {
					if (c.fieldConfig.listerners && c.listerners) {
						Ext.apply(c.listerners, c.fieldConfig.listerners);
						delete c.fieldConfig.listerners;
					}
					Ext.apply(c, c.fieldConfig);
				}
		}
		Ext.each(json.model, fn);
		if (param.pageType == 'copy') {
			delete param.dataId;
			param.pageType = 'new';
		}
		panel.items = json.model;
		var ja = json.buttonArray;
		if (Ext.isArray(ja)) {
			var btns = new Array(), cb = null;
			for (var i = 0; i < ja.length; i++) {
				if (ja[i].state == param.pageType || ja[i].state == 'all') {
					cb = this.getButton(ja[i], id);
					btns.push((cb == null) ? ja[i] : cb);
				}
			}
			(btns.length > 0) && (panel.tbar = {
				xtype : 'toolbar',
				enableOverflow : true,
				items : btns
			});
		}
		if (json.showHelpButton) {
			CPM.Help.addHelpButton(panel, param);
		}

		panel = parentPanel.add(panel);
		if (json.fileUpload == true) {
			lib.upload.Uploader.setEnctype(panel);
		}
		parentPanel.doLayout();
		if (param.pageType != 'view') {
			if (!json.NOT_VERIFY_PMK) {
				var checkPmk = function(field) {
					var found = true;
					var values = {};
					panel.form.items.each(function(c) {
								if (c.isFormField && c.pkmark) {
									found = !Ext.isEmpty(c.getValue());
									values[c.name] = c.getValue();
									return found;
								}
							});
					if (found) {
						param.pkvalues = Ext.encode(values);
						this.getData("verifyPMK", param, function(result) {
									if (result.found) {
										if (!this.chkPmkSign) {
											this.form.on("beforeaction",
													function() {
														return this
																.chkPmkSign();
													}, this);
										}
										this.chkPmkSign = function() {
											var f = field;
											Ext.MessageBox.alert("错误",
													"输入记录重复,请更改填写的值",
													function() {
														f.focus();
													}, this);
											return false;
										}
										this.chkPmkSign();
									} else {
										this.chkPmkSign = function() {
											return true;
										}
									}
								}, panel);
					}

				}
				panel.form.items.each(function(c) {
							if (c.isFormField && c.pkmark) {
								c
										.on("blur", checkPmk.createDelegate(
														this, [c]));
							}
						}, this)
			}
			if (json.verifyUnicode) {
				panel.form.items.each(function(c) {
							if (c.getXType() == 'textfield') {
								c.chineseLength = 3;
							}
						}, this)
			}

			Ext.EventManager.addListener(panel.getEl(), "keydown", function(e) {
				if (e.getKey() == 13) {
					var item = Ext.getCmp(e.getTarget().id);
					if (Ext.isObject(item) && item.isFormField
							&& item.xtype != 'textarea'
							&& item.xtype != 'richeditor') {
						var index = item.tabIndex;

						if (!Ext.isDefined(index)
								&& item.getXType() == 'datefield') {
							var p = item.id.split('-');
							index = Ext.getCmp(p[0] + '-' + p[1] + '-'
									+ (p[2] * 1 - 1)).tabIndex;
						}
						if (Ext.isNumber(index)) {
							do {
								item = null;
								index++;
								this.form.items.each(function(c) {
											if (c.isFormField
													&& c.tabIndex == index) {
												item = c;
												return false;
											}
										})
							} while (item != null
									&& (item.readOnly || item.disabled
											|| item.hidden
											|| item.xtype == 'hidden' || item.xtype == 'viewfield'));

							if (item == null) {
								var bar = this.getTopToolbar();
								if (Ext.isDefined(bar)) {
									bar.items.each(function(btn) {
										if (!btn.hidden
												&& Ext.isString(btn.action)
												&& btn.action.indexOf('save') != -1) {
											e.preventDefault();
											btn.handler(btn);
										}
									});
								}
							} else {
								e.preventDefault();
								item.focus();
							}
						}
					}
				}
			}, panel);

		}
		return panel;
	},
	changePageType : function(panel, parentPanel, param) {
		if (panel.pageType != param.pageType) {
			if (param.pageType == 'new') {
				param.reserveDataId = param.dataId;
				delete param.dataId;
			} else if (!param.dataId && Ext.isDefined(param.reserveDataId)) {
				param.dataId = param.reserveDataId;
				delete param.reserveDataId;
			}
			CPM.replacePanel(panel, parentPanel, param);
		}
	},
	getDigest : function(obj) {
		var arr = new Array();
		!obj.objectId || arr.push(obj.objectId);
		!obj.dataId || arr.push(obj.dataId);
		!obj.exportTab || arr.push(obj.exportTab);
		!obj.exportItem || arr.push(obj.exportItem);
		!obj.exportData || arr.push(obj.exportData);
		return arr.join("");
	},
	canUpdateDataOnly : function(panel, parentPanel, param) {
		if (typeof(panel) == 'undefined')
			return false;
		panel.paramCache = this.getDigest(param);
		return panel.param && panel.param.objectId == param.objectId
				&& panel.param.programType == param.programType
				&& panel.param.pageType == param.pageType
				&& !param.forceToRebuild
	},
	buttonMap : {
		'%clear' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				panel.form.reset();
			}
		},
		'%new' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				var p = Ext.applyIf({
							pageType : 'new'
						}, panel.param);
				CPM.getModule(panel.programType).changePageType(panel,
						panel.ownerCt, p);
			}
		},
		'%audit' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				panel.param['buttonId'] = btn.sequence;
				panel.param['action'] = btn.action;
				panel.param['workflowId'] = btn.workflowId;
				if (panel.form.isValid()) {
					var p = Ext.apply({
								_method : (btn.state == 'new') ? 'POST' : 'PUT'
							}, panel.param)
					CPM.doAction({
						form : panel.form,
						params : p,
						method : 'POST',
						success : function(form, action) {
							if (action.result && action.result.dataId) {
								var ps = action.result.exportInfo.split(",");
								Ext.apply(panel.param, {
											dataId : action.result.dataId,
											pTab : ps.shift(),
											pItem : ps.join(","),
											pData : action.result.dataId
										})
								CPM.get({
											method : 'POST',
											params : panel.param,
											url : '/bin/workflow/apply.jcp?',
											success : function(response,
													options) {
												Ext.msg("info", '申请提交成功'.loc());
												if (btn.target.targets) {
													CPM.replaceTarget(panel,
															panel.ownerCt,
															panel.param,
															btn.target);
												}
											}
										}, true);
							}
						}
					}, this);
				}
			}
		},
		'%edit' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				var p = Ext.applyIf({
							pageType : 'edit'
						}, panel.param);
				CPM.getModule(panel.programType).changePageType(panel,
						panel.ownerCt, p);
			}
		},
		'%copy' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				var p = Ext.applyIf({
							pageType : 'copy'
						}, panel.param);
				CPM.getModule(panel.programType).changePageType(panel,
						panel.ownerCt, p);
			}
		},
		'%save' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				panel.param['action'] = btn.action;
				if (panel.form.isValid()) {
					var deferHandel = panel.el.mask.defer(500, panel.el,
							["数据处理中....."]);
					var p = Ext.apply({
								_method : (btn.state == 'new') ? 'POST' : 'PUT'
							}, panel.param)
					CPM.doAction({
						form : panel.form,
						params : p, 
						method : 'POST',
						timeout : 900000,
						success : function(form, action) {
							clearTimeout(deferHandel);
							panel.el.unmask();
							Ext.msg("info", '保存成功'.loc());
							if (action.result) {
								var r = action.result;
								if (Ext.isFunction(r.callback)
										&& r.callback(panel, form, action) === false) {
									return;
								}

								if (r.dataId) {
									var ps = r.exportInfo.split(",");
									Ext.apply(panel.param, {
												dataId : r.dataId,
												pTab : ps.shift(),
												pItem : ps.join(","),
												pData : r.dataId
											})
								}
							}
							if (btn.target.targets) {
								CPM.replaceTarget(panel, panel.ownerCt,
										panel.param, btn.target);
							}

						},
						failure : function() {
							clearTimeout(deferHandel);
							panel.el.unmask();
						}
					}, this);
				}
			}
		},
		'%delete' : {
			handler : function(btn) {
				Ext.msg("confirm", '确定删除本记录?'.loc(), function(answer) {
							if (answer == 'yes') {
								var panel = Ext.getCmp(btn.panelId);
								var p = panel.param;
								var deferHandel = panel.el.mask.defer(500,
										panel.el, ["数据处理中....."]);
								CPM.doAction({
											params : {
												programType : p.programType,
												data : p.dataId,
												objectId : p.objectId
											},
											method : 'DELETE',
											timeout : 900000,
											success : function(form, action) {
												clearTimeout(deferHandel);
												panel.el.unmask();
												Ext.msg("info", '删除成功'.loc());
												if (btn.target.targets) {
													CPM.replaceTarget(panel,
															panel.ownerCt, p,
															btn.target);
												}
											},
											failure : function() {
												clearTimeout(deferHandel);
												panel.el.unmask();
											}
										}, this);
							}
						}.createDelegate(this));
			}
		},
		'%gis' : {
			handler : function(btn) {
				var panel = Ext.getCmp(btn.panelId);
				using("ExternalItems.js.GIS");
				var gisWindow = ExternalItems.js.GIS();
				gisWindow.showAt(panel.param.objectId, panel.param.dataId);
			}
		}
	},
	commands : {
		"new" : function(param, parentPanel) {
			param.pageType = 'new';
			delete param.dataId;
		},
		"view" : function(param, parentPanel) {
			param.pageType = 'view';
		},
		"edit" : function(param, parentPanel) {
			param.pageType = 'edit';
		},
		"copy" : function(param, parentPanel) {
			param.pageType = 'copy';
		},
		"batchupdate" : function(param, parentPanel) {
			param.pageType = 'batchupdate';
		}
	},
	getState : function(owner, panel, param) {
		if (panel.param.objectId != param.objectId) {
			return this.getSuper().getState(owner, panel, param);
		}
	}
});