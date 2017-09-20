Ext.ns("ExternalItems.haiwaizhishigongxiang.folderMove");
using("lib.ComboTree.ComboTree");

ExternalItems.haiwaizhishigongxiang.folderMove.FolderMoveBeforeInit = function(mySelfConfig, json, param, parentPanel) {
	var packingChild = function(c){
		c.loader = new Ext.tree.TreeLoader({
					url : '/ExternalItems/haiwaizhishigongxiang/folderMove/FolderMoveBeforeInit.jcp',
					method : 'Post',
					baseParams : {
						nodeId : param.dataId,
						dirId : param.currentDirId
					}
				});
		var rootNode = new Ext.tree.AsyncTreeNode({
					text : 'root',
					id : 'root'
				});
		Ext.apply(c, {
				editable : false,
				mode : 'local',
				rootVisible : false,
				treeConfig : {
					panelId : mySelfConfig.id
				},
				root : rootNode
		});
	}
	var fn = function(c) {
		if (c.items) {
			Ext.each(c.items, fn);
		} else {
			if (c.name == 'SELECT_NODE'){
				c.beforeRelation = true;
				c.oldType = c.xtype;
				c.xtype = "combotree";
				packingChild(c);
				c.listeners = {
					'select' : function(combo , node, e) {
						var path = "" , pathText = "" , frm , field;
						do{
							path = node.id + (path.length > 0 ? "/" : "") + path;
							pathText = node.text  + (pathText.length > 0 ? "/" : "") + pathText; 
							node = node.parentNode;
						}while(node && !node.isRoot);
						if((frm = combo.findParentByType("form")) && (field = frm.form.findField("NEW_FILE_PATH")))
							field.setValue(path);
						if(frm && (field = frm.form.findField("SELECT_SPACE")))
							field.setValue(pathText);
					}
				};
			}
			if(c.name == 'NEW_FILE_PATH')
				c.hidden = true;
			if(c.name == 'SELECT_SPACE')
				c.hidden = true;
		}
	}
	Ext.each(json.model, fn);
}
