Ext.namespace("dev.query");

dev.query.ColumnsWindow = function(query,parent_id,type){
	this.win;
	var importTable;
	that=this;
	this.type=type;
/*	var database= new Object();
	database.reload_forder = function(){
		this.loadXML(Tool.getXML("/dev/query/ListSystemTable.jcp?db_name="+this.prop.title+"&parent_id="+parent_id));
	}*/
	var queryForder = new Object();
	queryForder.reload_forder = function(){
		this.loadXML(Tool.getXML("/dev/query/ListQuery.jcp?forder_id="+this.prop.forder_id+"&parent_id="+parent_id));
	}
//	var sysTab = new Object();
	
	var loadButton=new Ext.Button({
		text:'导入'.loc(),
		scope:this,
		minWidth:90,
		handler:submit
	});
	var closeButton=new Ext.Button({
		text: '关闭'.loc(),
		minWidth:90,
		scope:this,
		handler: this.windowCancel
	});
/*
	sysTab.title_click = function(){
		reset();
		if(!this._loaded)
			this.open();
		importTable = new Object();
		importTable.isSys = true;
		importTable.query_id=-1;
		importTable.level = 0;
		importTable.server = this.prop.server;

		D_table_name.innerHTML = importTable.tableName = this.prop.title;

		var columns = importTable.columns = new Array();
		var son = this.son;

		for(var i=0;i<son.length;i++){
			columns[i] = son[i].prop.name;
		}
		loadButton.enable();
	}*/
	var queryTab = new Object();

	queryTab.title_click = function(){
		reset();
		this.open();
		importTable = new Object();
		importTable.isSys = false;
		importTable.query_id=this.prop._id;
		importTable.level = this.prop.level;
		importTable.server = this.prop.server;

		D_table_name.innerHTML = importTable.tableName = this.prop.title;
		var columns = importTable.columns = new Array();
		var son = this.son[0].son;
		for(var i=0;i<son.length;i++){
			if(that.type=='query'){
				columns[i]=son[i].prop.title;
			}else{
				columns[i]={};
				columns[i].name = son[i].prop.title;
				columns[i].type = son[i].prop.type;
			}
		}
		son = this.son[1].son;
		if(son){
			D_param_table.innerHTML ="";
			var params = importTable.params = new Array();
			str = ['<table width="100%" class="param_table" cellspacing cellpadding>'];
			for(var i=0;i<son.length;i++){
				params[i] = [son[i].prop.title];
				var name = son[i].prop.title;
				var preValue = son[i].prop.defaultvalue;
				if(son[i].prop.defaultvalue ==""){
					 preValue="${"+name+"}";
				}
				
				if(son[i].prop.notnull == "1")
					name = "<font color=red><b>"+name+"</b></font>";
				if(this.type=='query'){
					str.push('<tr><td width=35% valign=bottom align=right>',name,' : </td><td width=65%><input name="I_param',i,'" utype="',son[i].prop.utype,'" notnull="',son[i].prop.notnull,'" value="" title="',son[i].prop.title,'"></td></tr>');
				}else{
					str.push('<tr><td width=35% valign=bottom align=right>',name,' : </td><td width=65%><input name="I_param',i,'" utype="',son[i].prop.utype,'" notnull="',son[i].prop.notnull,'" value="',preValue,'" title="',son[i].prop.title,'"></td></tr>');
				}
			}
			str.push('</table>');
			D_param_table.innerHTML = str.toString();
		}
		loadButton.enable();
	}
	function reset(){
		importTable = null;
		loadButton.disable();
		D_table_name.innerHTML ="";
		D_param_table.innerHTML = "";
	}
	function submit(){
		if(!importTable){
			this.disabled = true;
			return;
		}
		if(importTable.params){   
			for(var i=0;i<importTable.params.length;i++){	
				var param =Ext.DomQuery.selectNode("INPUT[name='I_param"+i+"']");
				var value = param.value;
				var notnull = param.getAttribute("notnull");
				if(notnull==1 && value=="" ){
					Ext.msg("error",'红色参数必须输入!'.loc());
					param.focus();
					return;
				}
				if(this.type=='query'){
					if(value.indexOf('${')!=-1||value.indexOf('}')!=-1){
						Ext.msg("error",'引用参数不能包含'.loc()+'"${"和"}"'+'字符!'.loc());
						return;
					}
				}
				importTable.params[i] = [param.title,value,notnull];
			}
		}
		/*
		if(query.sameServer(importTable.server)){
				Ext.MessageBox.show({
					   title: '输入错误',
					   msg:'应用表和查询必须在同一数据库中!',
					   buttons: Ext.MessageBox.OK,
					   icon: 'ext-mb-error'
				 });
				return ;
		}
		*/
		if(query.isExist(importTable.query_id,importTable.tableName)){
			Ext.msg('confirm', '引用了重复表,确定要添加吗?'.loc(), function(btn){
				if (btn=='yes'){
					var startIndex=query.length();
					var queryIndex=startIndex+query.index;
					importTable.rename = 'tab'+queryIndex++;
					query.add(importTable);
					reset();
				}
			}.createDelegate(this));
		}else{
			var startIndex=query.length();
			var queryIndex=startIndex+query.index;
			importTable.rename = 'tab'+queryIndex++;
			query.add(importTable);
			reset();
		}
	}
	this.SourcePanel=new Ext.Panel({
			layout:'fit',
			border:true,
			region:'west',
			style:"border: 1px solid #7F9DB9",
			split:false,
			width:270,
			collapsible: false,
            margins:'3 3 3 3'
	});  
	this.ColumnsPanel = new Ext.Panel({
		frame:false,
		collapsible:false,
		layout:'fit',
		region:'center',
		html:'<table bgcolor="#FAF9F9" width="100%" cellspacing="5" cellpadding="0" height="100%" style="border: 1px solid #919B9C"><tr><td><table width="100%" height=100%><tr><td height=22>'+'名称'.loc()+' : <b><span id="D_table_name"></span></b></td></tr><tr><td height=22>'+'参数'.loc()+'  </td></tr><tr><td valign=top style="border: 1px solid #7F9DB9; background-color: #FFFFFF;"><div style="width:100%;height:100%;overflow:auto" id="D_param_table"></div></td></tr><tr><td height=20>'+'红色参数必须输入'.loc()+'</td></tr></table></td></tr></table>'
	});
	this.win =  new Ext.Window({
		title:'选择数据表或查询'.loc(),
		layout:'border',
		width:550,
		height:375,
		closeAction:'hide',
		plain: true,
		modal:true,   
		items:[this.SourcePanel,this.ColumnsPanel],
		buttons:[loadButton,closeButton]
	});
	this.win.on('show',function(){
		if(!parent_id)
			parent_id="";
		var str='数据资源'.loc();
		var menuTree = new MenuTree(Tool.parseXML('<root _id="root"><forder _parent="yacus" _hasChild="1"><e _id="200" _parent="root" title="'+str+'" url="/dev/query/ListQuery.jcp?forder_id=200&amp;parent_id='+parent_id+'"/></forder></root>'));
		//var menuTree = new MenuTree(Tool.parseXML('<root _id="root"><forder _parent="yacus" _hasChild="1"><e _id="resource" _parent="root" title="数据资源"/><e _id="_sysdb" _parent="resource" title="系统数据库" url="/dev/query/ListSystemTable.jcp?&amp;parent_id='+parent_id+'"/><e _id="200" _parent="resource" title="高级查询视图" url="/dev/query/ListQuery.jcp?forder_id=200&amp;parent_id='+parent_id+'"/></forder></root>'));
		//menuTree.setEvent("database",database);
		menuTree.setEvent("queryForder",queryForder);
		//menuTree.setEvent("sys_tab",sysTab);
		menuTree.setEvent("query_tab",queryTab);
		menuTree.finish(this.SourcePanel.body.dom,document);
		loadButton.disable();
    }.createDelegate(this));
};
Ext.extend(dev.query.ColumnsWindow, Ext.Window, {
	show : function(){
		this.win.show(this); 
    },
	windowCancel : function(){
		this.win.close();
    }
});

