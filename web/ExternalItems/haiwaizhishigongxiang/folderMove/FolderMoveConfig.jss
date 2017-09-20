Ext.ns("ExternalItems.haiwaizhishigongxiang.folderMove")

ExternalItems.haiwaizhishigongxiang.folderMove.FolderMoveConfig = function(btn) {
	var panel = Ext.getCmp(btn.panelId) , filed , filedValue;
	if(panel && panel.form && (filed = panel.form.findField("DIR_ID")) && (filedValue = filed.getValue())){
		var getTreePanel = function(panelId){
				var p , fp , fi ,t ;
				if (p = Ext.getCmp(panelId)) {
					var fp = p , counts = 0;
					while(fp && !fp.isFrame){
						fp = fp.ownerCt;
						if(++counts > 30)
							break;
					}
					if(fp && (fi = fp.frameIndex) && fi.west && (t = Ext.getCmp(fi.west))){
						if((t = t.getComponent(0)) && t.nav){
							return t;
						}
					}
					return false;
				}
		};
		var win = panel.findParentByType(Ext.Window) , nav , oldFilePath = "" , oldFilePathText = "";
		if((nav = getTreePanel(btn.panelId)) && (nav = nav.nav)){
			var node = nav.menuTree.getNowNode() , counts = 0;
			if(node){
				while(node && node.prop._id != "top"){
					var nodeId = node.prop._id , pos = -1;
					if((pos = nodeId.indexOf("__")) != -1)
						nodeId = nodeId.substring(0 , pos);
					if(counts > 50)
						break;
					oldFilePath = nodeId + (oldFilePath.length > 0 ? "/" : "") + oldFilePath;
					oldFilePathText = node.prop.title + (oldFilePathText.length > 0 ? "/" : "") + oldFilePathText;
					node = node.parent;
					counts++;
				};
				if(node && node.prop._id == "top")
					oldFilePathText = node.prop.title + (oldFilePathText.length > 0 ? "/" : "") + oldFilePathText;
			}
		}
		if(oldFilePath){
			CPM.openModuleWindow("bfd617b5-7ad0-4936-b434-b637efe398d9", panel, {pageType:"new", dataId : panel.param.dataId , currentDirId : filedValue , oldFilePath : oldFilePath , oldFilePathText : oldFilePathText}, {// 固定ID 模块:海外_移动目录
				icon : btn.icon,
				title : btn.text,
				panelId : btn.panelId,
				currentDirId : filedValue,
				width : 450,
				height : 300,
				getTreePanel : getTreePanel,
				refreshSelfNode : function(path){
					var t , nav ;
					if((t = this.getTreePanel(this.panelId)) && (nav = t.nav)){
						//nav.getTree().loadSelfNodeWithLevel(this.panelDataId, nav.clickEvent.createDelegate(nav));
						nav.getTree().loadRootNode(nav.clickEvent.createDelegate(nav));
						nav.getTree().loadPath(path);
					}
				}
			});
		} else {
			Ext.msg("warn" , "参数丢失，请刷新页面重试。");
		}
	} else {
		Ext.msg("warn" , "参数丢失，请刷新页面重试。");
	}
}