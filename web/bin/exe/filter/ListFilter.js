/*
 * Ext JS Library 3.2.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.grid.filter.ListFilter=Ext.extend(Ext.grid.filter.Filter,{phpMode:false,init:function(config){this.dt=new Ext.util.DelayedTask(this.fireUpdate,this);if(this.menu){this.menu.destroy();}this.menu=new Ext.ux.menu.ListMenu(config);this.menu.on("checkchange",this.onCheckChange,this);},getValue:function(){return this.menu.getSelected();},setValue:function(value){this.menu.setSelected(value);this.fireEvent("update",this);},isActivatable:function(){return this.getValue().length>0;},getSerialArgs:function(){var args={type:"list",value:this.phpMode?this.getValue().join(","):this.getValue()};return args;},onCheckChange:function(){this.dt.delay(this.updateBuffer);},validateRecord:function(record){return this.getValue().indexOf(record.get(this.dataIndex))>-1;}});