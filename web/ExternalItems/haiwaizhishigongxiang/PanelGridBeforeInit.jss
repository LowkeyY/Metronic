Ext.ns("ExternalItems.haiwaizhishigongxiang");
using("ExternalItems.haiwaizhishigongxiang.PluginUitls");
using("ExternalItems.haiwaizhishigongxiang.FilePreview");
// using("ExternalItems.haiwaizhishigongxiang.PanelGridBeforeInit");
// ExternalItems.haiwaizhishigongxiang.PanelGridBeforeInit(mySelfConfig, json,
// param, parentPanel);
ExternalItems.haiwaizhishigongxiang.PanelGridBeforeInit = function(mySelfConfig, json, param, parentPanel) {
	delete json.autoExpandColumn;
	var PUS = new ExternalItems.haiwaizhishigongxiang.PluginUitls();
	PUS.addIcon2GridColumn(mySelfConfig.cm, "FILE_INFO_NAME", "FILE_TYPE");
	PUS.bytesToSizeColumn(mySelfConfig.cm, "FILE_SIZE");
	mySelfConfig.getRowContextMenus = function(isSingle){
		//1 仅单独选中是匹配 2 单选或多选匹配
		var btnDefualtConfig = {
			'修改文件属性' : 1,
			'删除文件' : 2,
			'查看详细信息' : 1,
			'资料下载' : 1,
			'推送或移动' : 2
		}
		var rms = [];
		var btnProps = ["panelId" , "icon" , "text" , "handler" , "target" , "button_js"];
		this.getTopToolbar().items.each(function(item){
			if (!item.hidden && Ext.isDefined(btnDefualtConfig[item.text]) && (isSingle || (btnDefualtConfig[item.text] == 2))){
				var btn = {};
				Ext.each(btnProps , function(p){
					if(Ext.isDefined(item[p]))
						btn[p] = item[p];
				});
				rms.push(btn);
			}
		});
		return rms;
	}
	mySelfConfig.listeners = {
		rowdblclick : function(gridPanel, rowIndex, e) {
			var rec = gridPanel.getStore().getAt(rowIndex);
			rec.data.rep_hidden = Ext.isDefined(gridPanel.param.exportItem) && (gridPanel.param.exportItem.match(/my_type|shen_id|s_id/ig) != null);
			ExternalItems.haiwaizhishigongxiang.FilePreview(rec , gridPanel , null);
		},
		rowcontextmenu : function(gridPanel, rowIndex, e){
			if (rowIndex < 0)
				return;
			var selModel = gridPanel.getSelectionModel();
			var isRowSelect = selModel.getSelections().indexOf(gridPanel.store.getAt(rowIndex)) != -1;
			if(!isRowSelect)
				selModel.selectRow(rowIndex);
			var rms = gridPanel.getRowContextMenus(selModel.getSelections().length == 1);
			if(rms.length > 0){
				e.preventDefault();
        		var rightM = new Ext.menu.Menu(rms);
        		rightM.showAt(e.getXY());
        	}
		}
	}
}