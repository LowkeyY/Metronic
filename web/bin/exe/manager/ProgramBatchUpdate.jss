using("bin.exe.manager.Input");
CPM.manager.ProgramBatchUpdate = Ext.extend(CPM.manager.Input, {
			programType : 'ProgramBatchUpdate',
			className : 'CPM.manager.ProgramBatchUpdate',
			buttonMap : {
				'%save' : {
					handler : function(btn) {
							var panel = Ext.getCmp(btn.panelId);
							panel.param['action'] = btn.action;
							if (panel.form.isValid()) {
								var p = Ext.apply({
											_method:'PUT'
										}, panel.param)
								CPM.doAction({
											form : panel.form,
											params : p,
											method : 'POST',
											success : function(form, action) {
												Ext.msg("info", '保存成功'.loc());
												if (action.result && action.result.dataId) {
													var ps = action.result.exportInfo.split(",");
													Ext.apply(panel.param, {
																dataId : action.result.dataId,
																pTab : ps.shift(),
																pItem : ps.join(","),
																pData : action.result.dataId
															})
												}
												if (btn.target.targets) {
													CPM.replaceTarget(panel, panel.ownerCt,panel.param, btn.target);
												}
											}
										}, this);
							}
					}
				}
			}
		});