Ext.ns("ExternalItems.haiwaizhishigongxiang.log");using("ExternalItems.haiwaizhishigongxiang.SystemLog");using("ExternalItems.haiwaizhishigongxiang.log.SysStasticPanel");ExternalItems.haiwaizhishigongxiang.log.SystemLog=function(){};ExternalItems.haiwaizhishigongxiang.log.SystemLog.prototype={load:function(framePanel,parentPanel,param,prgInfo){this.stasticPanel=new ExternalItems.haiwaizhishigongxiang.log.SysStasticPanel();var newpanel=new Ext.Panel({border:false,layout:"border",items:[this.stasticPanel]});parentPanel.add(newpanel);parentPanel.doLayout();}};