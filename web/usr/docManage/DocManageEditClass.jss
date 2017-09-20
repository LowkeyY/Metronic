Ext.ns("usr.docManage");
using("usr.docManage.HtmlFormLayout");
loadcss("usr.docManage.HtmlFormLayout");

usr.docManage.DocManageEditClass = function() {
	this.init.apply(this, arguments);
};

usr.docManage.DocManageEditClass.prototype = {
	init : function(defaultParam) {
		var _this = this;
		this.defaultParam = defaultParam || {};
		this.webOfficeDditTagert = "DMDC_WEBOFFICE_EDIT4WF_TARGET";
		this.frmData = defaultParam.frmData || null;
		this.currentState = this.frmData == null ? "new" : this.frmData.currentState;
		this.flowId = defaultParam.flowId || "";
		this.flowType = defaultParam.flowType || "";
		this.ID_attachPanel = Ext.id();//附件信息
		this.ID_attachTable = Ext.id();//
		this.ID_displayAt = Ext.id();//附件信息，控制div显示或隐藏。
		this.ID_displayRd = Ext.id();//评阅信息，控制整个div是否显示。
		this.ID_displaySms = Ext.id();//
		this.ID_flowPanel = Ext.id();//流程信息
		this.ID_flowTitle = Ext.id();//
		this.ID_formPanel = Ext.id();//表单信息
		this.ID_readerPanel = Ext.id();//评阅信息
		this.ID_readTable = Ext.id();//
		var helpText = "<br />{F}: 此变量表示当前的流程名称。<br>" +
				"{Y}: 此变量表示当前时间的四位年份值，如2008。<br>" +
				"{M}: 此变量表示当前时间的两位月份值，如12。<br>" +
				"{D}: 此变量表示当前时间的两位日期值，如31。<br>" +
				"{N}: 此变量表示系统流程自动编号<br>{N}表示一位流程编号，如1。<br>" +
				"{NNNN}表示四位流水号，如0001。<br>" +
				"<br><b>示例</b>: 如：{F}{Y}{M}{D}{NNNN}，将会被转化为：流程名称200808080008。";
		this.formPanel = new Ext.form.FormPanel({
					id : this.defaultParam.formPanelId || Ext.id(),
					webOfficeDditTagert : this.webOfficeDditTagert,
					fileUpload : false,
					hideBorders : true,
					border : false,
					region : "center",
					autoScroll : true,
					layout : "htmlform",
					defaults : {
						xtype : "displayfield",
						width : 300
					},
					layoutConfig : {
						cache : false,
						template : this.currentState != "new" ? "/usr/docManage/form_view_tplSort3.tpl.html"
								: "/usr/docManage/form_new_tplSort3.tpl.html",
						templateData : {
							id_attachPanel : this.ID_attachPanel,
							id_attachTable : this.ID_attachTable,
							id_displayAt : this.ID_displayAt,
							id_displayRd : this.ID_displayRd,
							id_flowPanel : this.ID_flowPanel,
							id_flowTitle : this.ID_flowTitle,
							id_formPanel : this.ID_formPanel,
							id_readTable : this.ID_readTable,
							id_readerPanel : this.ID_readerPanel
						}
					},
					removeAtt : function(el){
						var domEl = Ext.getDom(el);
						var ids = domEl.id;
						Ext.Msg.confirm("删除附件","确定删除此附件吗？",function(btns){
							if(btns == "yes"){
								while(domEl.parentElement){
									domEl = domEl.parentElement;
									if(domEl.tagName.toLowerCase()=="tbody")
										break;
								}
								domEl.remove();
								Ext.Ajax.request({
									url : "/usr/docManage/DMAttach.jcp",
									method : 'Post',
									params :{
										pmk : ids,
										type : "delete"
									},
									scope : this,
									success : function(response, options) {
										Ext.msg("info", '附件删除成功。'.loc());
									}
								});
								var tb = Ext.getDom(_this.ID_attachTable);
								if(tb.children.length==1){
									Ext.fly(_this.ID_displayAt).dom.style.display = "none";
								}
							}
						})
					},
					addAttach : this.addAttach,
					items : this.currentState != "new" ? [{
								name : "LCBM"
							}, {
								name : "ZDYLCBT"
							}, {
								name : "ZHT"
							}, {
								name : "NGR"
							}, {
								name : "FQSJ"
							}, {
								name : "SQLY",
								cls : "wf-reason wf-reason-view",
								xtype : "textarea",
								readOnly : true
							}, {
								name : "ZYDJ"
							}] : [{
								xtype : "htmltextfield",
								name : "LCBM",
								fieldLabel : "流程编号",
								width : 250,
								readOnly : true,
								editable : false,
								allowBlank : false,
								value : '{F}{Y}{M}{D}{NNNN}',
								tipTitle : "编号规则帮助:",
								tipText : helpText
							}, {
								xtype : "textfield",
								name : "ZDYLCBT",
								fieldLabel : "自定义流程标题",
								allowBlank : false,
								width : 250
							}, {
								xtype : "combo",
								name : "ZYDJ",
								fieldLabel : "重要等级",
								store : new Ext.data.SimpleStore({
											fields : ["value", "level"],
											data : [["0", "普通"], ["1", "重要"],
													["2", "非常重要"]]
										}),
								hiddenName : "ZYDJ",
								valueField : "value",
								displayField : "level",
								mode : "local",
								width : 250,
								allowBlank : false,
								triggerAction : "all",
								forceSelection : true,
								editable : false,
								value : "0"
							}, {
								xtype : "textarea",
								fieldLabel : "申请理由",
								name : "SQLY",
								width : 250,
								cls : "wf-reason"
							}],
					listeners : {
						afterrender : function() {
							if (_this.currentState != "new" && Ext.isDefined(_this.frmData) && Ext.isDefined(_this.frmData.processInfo)) {
								var datas = {};
								var ZYDJData = {"0":"普通","1":"重要","2":"非常重要"}
								for(var d in _this.frmData.processInfo){
									datas[d.toUpperCase()] = d.toUpperCase() =="ZYDJ" ? ZYDJData[_this.frmData.processInfo[d]] :_this.frmData.processInfo[d];
								}
								this.form.setValues(datas);
							}
							setTimeout(function() {
								_this.loadFormPanel()
							}, 200)
						}
					}
				});
		/*this.bottomPanel = new Ext.Panel({
			hideBorders : true,
			border : false,
			region : "south",
			height : 40,
			layout : "fit",
			items : [{
				xtype : "textarea",
				region : "buttom",
				name : "checkAbout",
				height : 40,
				style : "border-bottom-width:0;border-left-width:0;border-right-width:0;",
				emptyText : "请填写您的办理理由:"
			}]
		});*/
		this.mainPanel = new Ext.Panel({
					collapsible : false,
					hideBorders : true,
					border : false,
					layout : "border",
					//items : this.currentState=="edit" ? [this.formPanel,this.bottomPanel] : [this.formPanel],
					items : [this.formPanel],
					tbar : this.getShowBtns(),
					listeners : {
						beforedestroy : function(me){
							if(Ext.getDom(_this.webOfficeDditTagert)!=null){
								Ext.Msg.confirm("是否保存","是否保存对正文内容的修改？",function(btns){
									if(btns == "yes"){
										usr.docManage.WO4WF.save("/sample/getODContent.jcp?ids="+_this.defaultParam.dataId);
										usr.docManage.WO4WF.close();
									}else{
										usr.docManage.WO4WF.close();
									}
								})
							}
						}
					}
		})
	},
	getShowBtns : function(){
		
		var showBtnTexts = this.frmData == null ? "返回" : this.frmData.showBtnTexts;

		if(Ext.isDefined(this.defaultParam.buttonArray) && this.defaultParam.buttonArray.length > 0){
			var btns = [];
			Ext.each(this.defaultParam.buttonArray,function(b){
				if((","+showBtnTexts+",").indexOf(","+b.text+",")!=-1)
					btns.push(b);
			});
			return btns;
		}else{
			return null;
		}
	},
	
	addAttach : function(info,isScrollIntoView) {
		var _this = this;
		Ext.fly(this.ID_displayAt || this.layoutConfig.templateData.id_displayAt).dom.style.display = "block";
		var infs = Ext.isArray(info)?info:[info];
		function getBtn(data){
			var btn = "";
			switch(data.type){
				case "down" : 
					btn = "&nbsp;&nbsp;<a href='/usr/docManage/DMAttach.jcp?pmk="+data.id+"&type=download'>下载</a>&nbsp;&nbsp;";
					break;
				case "delete" :
					btn = '&nbsp;&nbsp;<a id="'
						+ data.id
						+ '" href="javascript:void(0)" onclick="' 
						+ 'Ext.getCmp(\''+(Ext.isDefined(_this.formPanel)?_this.formPanel.id : _this.id)+'\'' 
						+ ').removeAtt(this);">删除</a>&nbsp;&nbsp;' 
					break;
			}
			return btn;	
		}
		Ext.each(infs,function(inf){
			var btns = "";
			Ext.each(inf.hasBtn || [],function(btn){
				btns += getBtn(btn);
			});
			var addEl = '<tr height=24 align="left" bgColor="#FFFFFF"><td bgColor="#FFFFFF">&nbsp;'
					+ inf.fjwjm
					+ '</td><td bgColor="#FFFFFF">&nbsp;'
					+ inf.scz
					+ '</td><td bgColor="#FFFFFF">&nbsp;'
					+ inf.scrq
					+ '</td><td bgColor="#FFFFFF">' +btns + '</td>'
					+ "</tr>";
			Ext.fly(_this.ID_attachTable || _this.layoutConfig.templateData.id_attachTable).createChild(addEl);			
		})
		if(isScrollIntoView)
			Ext.fly(this.ID_attachTable || this.layoutConfig.templateData.id_attachTable).dom.scrollIntoView();
	},
	
	removefile : function(el) {},
	
	loadFormPanel : function(c) {
		var _this = this;
		var frmHtmlSrc = "";
		var updateText = function() {
			var baseUrl = "/sample/getODContent.jcp?ids="+_this.defaultParam.dataId;
			var callbackUrl = "";
			var type = "doc";
			switch(_this.currentState){
				//params, type, targetName, state, realname, callbackParams, element, windowId
				case "new" : 
					frmHtmlSrc = "/usr/docManage/form_text_new.html";
				case "edit":
				case "return2me":
					frmHtmlSrc = frmHtmlSrc==""?"/usr/docManage/form_text_view.html":frmHtmlSrc;
					Ext.fly("wf_formct_body").update("<div onclick=\"usr.docManage.WO4WF.edit('"
							+ baseUrl + "', '" + type + "','"+ _this.webOfficeDditTagert + "','"+_this.currentState+"','" +_this.frmData.realName + "','',this,'"
							+ _this.defaultParam.windowId
							+ '\')" style="height:250px;cursor:pointer;line-height:250px;text-align:center;'
							+ 'border:1px solid #ACACAC;background-color:#C8C8C8;font-size:20px;">点击这里编辑表单</div>');
					break;
				default :
					frmHtmlSrc = "/usr/docManage/form_text_view.html";
					Ext.fly("wf_formct_body").update("<div onclick=\"usr.docManage.WO4WF.view('"
							+ baseUrl
							+ "', '"
							+ type
							+ "','"
							+ _this.defaultParam.windowId
							+ '\')" style="height:250px;cursor:pointer;line-height:250px;text-align:center;'
							+ 'border:1px solid #ACACAC;background-color:#C8C8C8;font-size:20px;">点击这里查看表单</div>');
					break;
			}
		};
		updateText();
		var frmHtml = usr.docManage.syncRequest(frmHtmlSrc);
		Ext.fly(_this.ID_formPanel).update(frmHtml + '<div style="clear:both;"></div>');
		if(Ext.isDefined(this.frmData)){
			if(Ext.isDefined(this.frmData.attachsInfo))
				_this.addAttach(this.frmData.attachsInfo);
			if(Ext.isDefined(this.frmData.textInfo)){
				for(var att in this.frmData.textInfo){
					if(Ext.getDom("dm_field_"+att)!=null || Ext.getDom("dmo_field_"+att)!=null){
						var attDom = Ext.getDom((Ext.getDom("dm_field_"+att)!=null?"dm_field_":"dmo_field_")+att);
						if(attDom.tagName.toUpperCase()=="SPAN"){
							attDom.innerHTML = this.frmData.textInfo[att];
						}else
							attDom.value = this.frmData.textInfo[att];
					}
				}
			}
			if(Ext.isDefined(this.frmData.stepDatas) && _this.currentState!="new"){
				var stConf = this.frmData.stepDatas;
				if(Ext.isDefined(stConf.historyArr) && Ext.isArray(stConf.historyArr)){
					Ext.fly("dm_the_dispatch_list").dom.style.display = "block";
					Ext.each(stConf.historyArr,function(hArr){
						var addEl = '<tr><td bgcolor="#FFFFFF">' +
								'<p><span style="color:#ff0000">'+ hArr.stepName+':</span><span>'+hArr.userName+'</span></p>'+
								'<p>'+ hArr.detail+'</p></td>'
								+ "</tr>";
						Ext.fly("dm_the_dispatch_list_tbody").createChild(addEl);			
					})
				}
				if(_this.currentState=="edit" || _this.currentState=="return2me"){
					if(Ext.isDefined(stConf.currentArr) && Ext.isArray(stConf.currentArr)) {
					Ext.fly("dm_the_dispatch_list").dom.style.display = "block";
					Ext.each(stConf.currentArr,function(cArr){
						var addEl = '<tr><td bgcolor="#FFFFFF"><p>' +
								'<span style="color:#ff0000">'+ cArr.stepName+':</span>' +
								'<input type="text" value='+cArr.userName+' class="wf_field" ext:qtip="'+cArr.stepName+'" style="width:80px;" readonly="readonly">'+
								'</p><textarea id="theOperatorComment" name="theOperatorComment" ext:qtip="意见" otype="textarea" ' +
								'class="wf_field wf_field_write" style="width:80%;height:120px;"></textarea><br></p></td></tr>';
						Ext.fly("dm_the_dispatch_list_tbody").createChild(addEl);			
					})
				}			
				}

			}
		}
	}
}