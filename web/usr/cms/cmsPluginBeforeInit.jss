Ext.ns("usr.cms");
usr.cms.cmsPluginBeforeInit = function(mySelfConfig, json, param, parentPanel) {

	var win = parentPanel.findParentByType(Ext.Window);

	mySelfConfig.loadResult = function(result) {
		if (Ext.isDefined(result.disabledButton)) {
			var referenceStr = "," + result.disabledButton;
			this.getTopToolbar().items.each(function(item) {
						item.setDisabled((item.text && referenceStr.indexOf(","
								+ item.text + ",") != -1));
					});
		}
		this.form.setValues(result.data);

		var canshu = Ext.decode(result.data.CJ_CANSHU) || "";
		var frm = this.form;
		if (Ext.isObject(canshu) && Ext.isDefined(canshu.relatedColumn)) {
			Ext.each(canshu.relatedColumn, function(c) {
						var field = frm.findField(c.name);
						if (Ext.isDefined(field)) {
							field.setVisible(c.xtype != "hidden");
							field.allowBlank = (c.xtype == "hidden");
						}
					})
		}
	}
};

// using("usr.cms.cmsPluginBeforeInit");
// usr.cms.cmsPluginBeforeInit(mySelfConfig,json,param,parentPanel);
