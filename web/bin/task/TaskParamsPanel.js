Ext.namespace("bin.task");bin.task.TaskParamsPanel=function(B,A){this.frames=B;var C=this.frames.get("Task");this.retFn=A;this.buttonArray=[];this.buttonArray.push(new Ext.Toolbar.Button({text:"返回".loc(),icon:"/themes/icon/common/redo.gif",cls:"x-btn-text-icon  bmenu",disabled:false,hidden:false,scope:this,handler:this.retFn}));this.buttonArray.push(new Ext.Toolbar.Button({text:"保存".loc(),icon:"/themes/icon/xp/save.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:false,handler:this.save}));this.ds=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"/bin/task/params.jcp",method:"GET"}),reader:new Ext.data.JsonReader({},[{name:"paramsArray",mapping:"paramsArray"}]),remoteSort:false});this.paramGrid=new Ext.grid.PropertyGrid({closable:false,enableColumnResize:true,clicksToEdit:1,border:false,items:this.paramGrid,tbar:this.buttonArray});};Ext.extend(bin.task.TaskParamsPanel,Ext.Panel,{init:function(A){this.ds.baseParams=A;this.ds.load();this.ds.on("load",function(){var E=this.ds.getAt(0).data.paramsArray;var D={};for(var C=0;C<E.length;C++){for(var B in E[C]){D[B]=E[C][B];}}this.paramGrid.setSource(D);this.frames.get("Task").mainPanel.setStatusValue(["参数设置".loc(),this.ds.baseParams.schedule_id]);},this);},save:function(){var E=this.paramGrid.getSource();var B=this.ds.baseParams;var A=[];var D=[];for(var C in E){A.push(C);D.push(E[C]);}B.key=A;B.field=D;if(A.length>0){Ext.Ajax.request({url:"/bin/task/params.jcp",params:B,method:"post",scope:this,success:function(H,I){var G=H.responseText;var F=Ext.util.JSON.decode(G);if(F.success){Ext.msg("info","完成任务执行定义更新!".loc());}else{Ext.msg("error","数据删除失败!,原因".loc()+":<br>"+F.message);}}});}else{Ext.msg("info","没有参数需要设定!".loc());}}});