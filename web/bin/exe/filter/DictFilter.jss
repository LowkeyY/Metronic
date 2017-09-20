/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
Ext.grid.filter.DictFilter = Ext.extend(Ext.grid.filter.Filter, {
	updateBuffer: 500,
	init: function() {
		if(!Ext.isDefined(this.editor)){
			this.editor={
				xtype:'textfield'
			};
		}
		this.editor.width=160;
		if(this.editor.xtype=='dicttype'){
			using("lib.DictType.DictType");
			this.editor.comboConfig={
				listClass:'x-menu x-menu-combo-list'
			};
		}else{
			this.editor.listClass='x-menu x-menu-combo-list';
		}
		var editor=Ext.ComponentMgr.create(this.editor,{xtype:'textfield'});
		editor.on("select",this.fireUpdate,this);
		var value = this.value = new Ext.menu.EditableItem({
			editor:editor
		});
		value.on('keyup', this.onKeyUp, this);
		this.menu.add(value);
	},
	
	onKeyUp: function(event) {
		if(event.getKey() == event.ENTER){
			this.menu.hide(true);
			return;
		}
	},
	
	isActivatable: function() {
		return this.value.getValue().length > 0;
	},
	
	fireUpdate: function() {		
		if(this.active) {
			this.fireEvent("update", this);
		}
		this.setActive(this.isActivatable());
	},
	
	setValue: function(value) {
		this.value.setValue(value);
		this.fireEvent("update", this);
	},
	
	getValue: function() {
		return this.value.getValue();
	},
	
	serialize: function() {
		var args = {type: 'string', value: this.getValue()};
		this.fireEvent('serialize', args, this);
		return args;
	},
	
	validateRecord: function(record) {
		var val = record.get(this.dataIndex);
		if(typeof val != "string") {
			return this.getValue().length == 0;
		 }
		return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
	}
});
