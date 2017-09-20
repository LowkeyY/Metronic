Ext.ns("usr.cms");

usr.cms.editPRadiogroup = function(item) {
	return {
		xtype : "radiogroup",
		ohterFiledsValid : function(checked) {
			var frm = this.findParentByType("form"), box = this;
			if (frm && frm.form) {
				frm.form.items.each(function() {
							if (this != box) {
								this.allowBlank = checked;
								this.validate();
							}
						});
			}
		},
		items : [{
					checked : item.defaultValue && item.defaultValue === 'y',
					boxLabel : '是',
					name : item.name,
					inputValue : 'y'
				}, {
					checked : item.defaultValue && item.defaultValue === 'n',
					boxLabel : '否',
					name : item.name,
					inputValue : 'n'
				}],
		listeners : {
			"change" : function(box, radio) {
				if(box.name.indexOf("暂缓选择")!=-1)
					box.ohterFiledsValid(radio.inputValue === 'y');
			},
			"afterrender" : function(box) {
				if(box.name.indexOf("暂缓选择")!=-1)
					box.ohterFiledsValid(box.getValue() === 'y');
			}
		}
	}
};