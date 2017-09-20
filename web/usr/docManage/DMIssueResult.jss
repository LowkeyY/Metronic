Ext.ns("usr.docManage");
loadcss("usr.docManage.HtmlFormLayout");

usr.docManage.DMIssueResult = function() {
	this.load = function(framePanel, parentPanel, param, prgInfo) {
		var dataId = "";
		var win = parentPanel.findParentByType(Ext.Window);
		if (Ext.isDefined(win.hasPanelDataConfig)) {
			dataId = win.hasPanelDataConfig.dataId;
			if (win.hasPanelDataConfig.exportInfo) {
				var ps = win.hasPanelDataConfig.exportInfo.split(",");
				ps.shift();
				Ext.apply(parentPanel.param, {
							dataId : dataId,
							exportData : dataId,
							exportItem : ps.join(",")
						})
			}
			delete win.hasPanelDataConfig;
		}
		dataId = dataId.length > 0 ? dataId : param.dataId;
		if (dataId.length > 0) {
			
			win.getEl().mask("加载中...");
			
			Ext.Ajax.request({
				url : '/usr/docManage/DMIssue.jcp?dataId='+dataId,
				scope : this,
				method : 'Get',
				success : function(response, options) {
					win.getEl().unmask();
					var result = Ext.decode(response.responseText);
					if (result.success){
						var resultItems = Ext.isObject(result.items) ? result.items : Ext.decode(result.items);
						var typeObj={
							0 : "正文信息" ,1 : "发文单" ,2: "附件信息"
						}
						var formItems = [];
						for(var att in resultItems){
							var t = typeObj[att];
							var its = resultItems[att].items;
							var obj = {xtype : 'fieldset',title : t};
							var p = new Ext.Panel({
												border : false
											});
							var pHtml = "没有" + t;
							switch(att){
								case "0" :
									pHtml = '<div class ="wf_div_ct" style="border:0px;"><table class="attachTable" '
											+ 'width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:5px 0;">'
											+ '<tr><td width="40" height="40" align="center" valign="bottom" style="border:0;">'
											+ '<img src="/themes/icon/48all/gnome-mime-application-vnd.'
											+ 'openxmlformats-officedocument.wordprocessingml.document.png" width="48" height="48" />'
											+ '</td><td valign="bottom" style="border:0;">'
											+ '<div style="float:none;">[正文]'
											+ its.name
											+ '<span style="color:#999">('
											+ Ext.util.Format.fileSize(its.size)
											+ ')</span>'
											+ '</div><div style="float:none;"><a href=\'/usr/docManage/DMAttach.jcp?pmk='
											+ its.ids
											+ '&type=download&froms=text\'>下载</a></div>'
											+ '</td></tr></table></div>';
								break;
								case "1":
									var cpHtml = "";
										cpHtml = '<table width="698px" border="2" bgcolor="#FFFFFF" align="center" '
											+ 'style="border-collapse:collapse;border-color:black;">'
											+ '<tbody><tr><td rowspan="1" colspan="3" bgcolor="#FFFFFF" style="height:30px;">'
											+ '<span style="color:#ff0000">发文字号:</span><span class="wf_readonly" '
											+ 'style="display:inline-block;width:200px;text-align:left;">'
											+ its.textInfo.fwzh
											+ '</span>'
											+ '</td><td rowspan="1" colspan="2" bgcolor="#FFFFFF" style="height:30px;">'
											+ '<span style="color:#ff0000">密级:</span><span class="wf_readonly" '
											+ 'style="display:inline-block;width:100px;text-align:left;">'
											+ its.textInfo.mj
											+ '</span>'
											+ '</td></tr><tr><td rowspan="1" colspan="5" bgcolor="#FFFFFF" style="height:40px;">'
											+ '<span style="color:#ff0000">标题：</span><span class="wf_readonly" '
											+ 'style="display:inline-block;width:622px;text-align:left;">'
											+ its.textInfo.bt
											+ '</span>'
											+ '</td></tr><tr><td rowspan="1" colspan="5" bgcolor="#FFFFFF" style="height:40px;">'
											+ '<span style="color:#ff0000">主题词：</span><span class="wf_readonly" '
											+ 'style="display:inline-block;width:600px;text-align:left;">'
											+ its.textInfo.ztc
											+ '</span>'
											+ '</td></tr><tr><td rowspan="1" colspan="5" bgcolor="#FFFFFF" style="height:30px;">'
											+ '<span style="color:#ff0000">拟稿人:</span><span class="wf_readonly" '
											+ 'style="display:inline-block;width:100px;">'
											+ its.textInfo.ngr
											+ '</span>'
											+ '</td></tr></tbody></table>';
									if (Ext.isDefined(its.stepDatas) && Ext.isArray(its.stepDatas)) {
										cpHtml += '<table width="698px" border="2" bgcolor="#FFFFFF" align="center" '
												+ 'style="border-collapse:collapse;border-color:black;'
												+ 'border-top-width:0px;"><tbody>'
												+ '<tr style="border-top-width:0px;">'
												+ '<td style="width:100px;border-top-width:1px;" rowspan="1" colspan="1" '
												+ 'width="120px" bgcolor="#FFFFFF">'
												+ '<span style="color:#ff0000">办理者及意见</span></td>'
												+ '<td style="width:578px;border-top-width:0px;padding-left:0;" bgcolor="#FFFFFF">'
												+ '<table border="1" bgcolor="#FFFFFF" style="border-collapse:collapse;'
												+ 'border-color:black;width:100%;border-top-width:0px;">'
												+ '<tbody>';
										Ext.each(its.stepDatas, function(it) {
											cpHtml += '<tr><td bgcolor="#FFFFFF"><p><span style="color:#ff0000">'
													+ it.stepName
													+ ':</span><span>'
													+ it.userName
													+ '</span></p><p>'
													+ it.detail
													+ '</p></td></tr>';
										})
										cpHtml += '</tbody></table></td></tr></tbody></table>';
									}
									if (cpHtml.length > 0) {
										cpHtml = '<p style="text-align:center;"><span style="font-size:36px;'
												+ 'font-family:宋体, simsun;color:#ff0000">发文单</span></p>'
												+ cpHtml + '<p><br/></p>';
										pHtml = '<div class ="wf_div_ct" style="margin-top:10px">'
												+ cpHtml + '</div>';
									}
								break;
								case "2":
									if(Ext.isArray(its)){
										pHtml = ' <div class ="wf_div_ct" style="border:0px;"><table class="attachTable" '
											+ 'style="border-collapse:separate;border-width: 1px;" '
											+ 'width="100%" border="0" cellspacing="1" cellpadding="0" bgcolor="#CDCDCD">'
											+ '<tr><td height="24" align="center" bgcolor="#F6F6F6" width="20%">附件名称</td>'
											+ '<td align="center" bgcolor="#F6F6F6" width="20%">附件大小</td>'
											+ '<td align="center" bgcolor="#F6F6F6" width="20%">上传时间</td>'
											+ '<td align="center" bgcolor="#F6F6F6" width="20%">操作</td></tr>';
										Ext.each(its, function(it) {
											pHtml += '<tr height=24 align="left" bgColor="#FFFFFF"><td bgColor="#FFFFFF">&nbsp;'
													+ it.name
													+ '</td><td bgColor="#FFFFFF">&nbsp;'
													+ Ext.util.Format.fileSize(it.size)
													+ '</td><td bgColor="#FFFFFF">&nbsp;'
													+ it.date
													+ '</td><td bgColor="#FFFFFF">&nbsp;&nbsp;'
													+ '<a href=\'/usr/docManage/DMAttach.jcp?pmk='
													+ it.ids
													+ '&type=download\'>下载</a>'
													+ '&nbsp;&nbsp;</td></tr>';
										});
										pHtml += "</table></div>";								
									}
								break;
							}
							p.html = pHtml;
							obj.items = [p];
							formItems.push(obj);
						}
						var mainPanel = new Ext.FormPanel({
									autoScroll : true,
									bodyStyle : 'padding:15px',
									items : formItems
								});
						parentPanel.add(mainPanel);
						framePanel.add(parentPanel);
						framePanel.doLayout();
					}else{
						var mainPanel = new Ext.FormPanel({
									autoScroll : true,
									bodyStyle : 'padding:15px',
									items : [{
											xtype : 'fieldset',
											items : [new Ext.Panel({
														border : false,
														html : result.message
													})]
										}]
								})
					}
				},
				failure : function(response, options) {
					win.getEl().unmask();
					var mainPanel = new Ext.Panel({
								html : response.responseText
							})
					parentPanel.add(mainPanel);
					framePanel.add(parentPanel);
					framePanel.doLayout();
				}
			});
		} else {
			Ext.msg("warn", "参数丢失。");
		}

	}
}