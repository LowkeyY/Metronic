Ext.namespace("ExternalItems.haiwaizhishigongxiang");ExternalItems.haiwaizhishigongxiang.qingchujilu=function(btn,type){var panel=Ext.getCmp(btn.panelId);var rec=panel.getSelectionModel().getSelections();if(rec.length==0){Ext.msg("warn","请选择要删除的行.");return ;}var p=panel.param;var pmks=new Array();for(var i=0;i<rec.length;i++){pmks.push(rec[i].get("pmk"));}Ext.msg("confirm","确定删除选择的记录?",function(answer){if(answer=="yes"){var module=CPM.getModule(p.programType);var par={data:pmks.join(","),objectId:p.objectId};Ext.Ajax.request({url:"/ExternalItems/haiwaizhishigongxiang/qingchujilu.jcp",method:"POST",params:par,scope:this,callback:function(options,success,response){var check=response.responseText;var ajaxResult=Ext.util.JSON.decode(check);if(ajaxResult.success){Ext.msg("info","清除成功");if(btn.target.targets){CPM.replaceTarget(panel,panel.ownerCt,p,btn.target);}}else{Ext.msg("warn",ajaxResult.message);}}});}});};