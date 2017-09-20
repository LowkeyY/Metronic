/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
Ext.menu.EditableItem = Ext.extend(Ext.menu.BaseItem, {
    itemCls : "x-menu-item",
    hideOnClick: false,
    initComponent: function(){
      Ext.menu.EditableItem.superclass.initComponent.call(this);
    	this.addEvents('keyup');
    	
			this.editor = this.editor || new Ext.form.TextField();
			if(this.text) {
				this.editor.setValue(this.text);
      }
    },
    
    onRender: function(container){
        var t = Ext.DomHelper.append(container, {tag:'table',style:'border-collapse:collapse;',children:[
                {tag:'tr',children:[
					{	
						tag:'td',
						cls: this.itemCls,
						html: '<img src="' + this.icon + '" class="x-menu-item-icon" style="margin: 3px 3px 2px 2px;" />'
					},
					{
						tag:'td',
						style:'padding:3px 0 0 0;',
						cls:'x-tz-'+this.id
					}	
				]}
            ]}, true);

        Ext.apply(this.config, {width: 225});
        this.editor.render(t.child('td.x-tz-'+this.id));
        this.el = t;
        this.relayEvents(this.editor.el, ["keyup"]);
        if(Ext.isGecko) {
    			t.setStyle('overflow', 'auto');
        }
    },
    
    getValue: function(){
    	return this.editor.getValue();
    },
    
    setValue: function(value){
    	this.editor.setValue(value);
    },
    
    isValid: function(preventMark){
    	return this.editor.isValid(preventMark);
    }
});