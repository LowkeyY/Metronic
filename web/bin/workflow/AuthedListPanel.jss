Ext.namespace("bin.workflow");

bin.workflow.AuthedListPanel = function(frames){
	this.frames=frames;
    this.xg = Ext.grid;

	var listButton=[];
	listButton.push(new Ext.Toolbar.Button({
				btnId:'refresh',
				text: '刷新'.loc(),
				icon: '/themes/icon/all/arrow_refresh.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.onButtonClick
	}));
	listButton.push(new Ext.Toolbar.Separator());


   this.ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url:"/bin/workflow/list.jcp",
			method:'GET'
		}),
        reader: new Ext.data.JsonReader({
            root: 'dataItem',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
			{name: 'workFlowType', mapping: 'workFlowType'},
			{name: 'instanceName', mapping: 'instanceName'},
			{name: 'applyCode', mapping: 'applyCode'},
			{name: 'applier', mapping: 'applier'},
			{name: 'applyDatetime', mapping: 'applyDatetime'},
			{name: 'id', mapping: 'id'},
			{name: 'entryId', mapping: 'entryId'},
			{name: 'instanceId', mapping: 'instanceId'},
			{name: 'stepId', mapping: 'stepId'},
			{name: 'objectId', mapping: 'objectId'},
			{name: 'Status', mapping: 'Status'},
			{name: 'stepName', mapping: 'stepName'}
        ]),
        remoteSort: true
    });
    this.ds.setDefaultSort('applyDatetime', 'desc');

    this.cm = new Ext.grid.ColumnModel([ new this.xg.RowNumberer(),{
           id: 'workFlowType', 
           header: '类别'.loc(),
           dataIndex: 'workFlowType',
		   sortable: true,
           align: 'left'
        },{
           header: '工作流'.loc(),
           dataIndex: 'instanceName',
           sortable: true,
           align: 'left'
        },{
           header: '申请编号'.loc(),
           dataIndex: 'applyCode',
           sortable: true,
           align: 'left'
        },{
           header: '申请人'.loc(),
           dataIndex: 'applier',
		   sortable: true,
           align: 'right'
        },{
           header: '申请时间'.loc(),
           dataIndex: 'applyDatetime',
		   sortable: true,
           align: 'right'
        },{
           header: '当前环节'.loc(),
           dataIndex: 'stepName',
		   sortable: false,
           align: 'right'
        },{
           header: '状态'.loc(),
           dataIndex: 'Status',
		   sortable: true,
           align: 'right'
        }]);

    this.cm.defaultSortable = true;
	this.WorkFlowGrid = new Ext.grid.GridPanel({
		title:'已审核工作'.loc(),
        store: this.ds,
        cm: this.cm,
        trackMouseOver:false,
        loadMask: {msg:'数据载入中...'.loc()},
        viewConfig: {
			forceFit:true, 
            enableRowBody:true, 
            showPreview:true, 
            getRowClass : this.applyRowClass 
        },
		listeners : {
			rowclick : function(grid, rowIndex, e) {
				var parentPanel=grid.ownerCt.ownerCt;
		 		parentPanel.hideStatus();
				var tempParams=this.ds.baseParams;
		 		parentPanel.returnFn=function(){
		 			var Workflow=parentPanel.frames.get('Workflow');
		 			parentPanel.remove(parentPanel.getComponent(0));
					Workflow.mainPanel.hideStatus();
					if(!Workflow.mainPanel.havePanel("AuthedListPanel")){
						var authedListPanel = new bin.workflow.AuthedListPanel(this.frames);
						Workflow.mainPanel.add(authedListPanel.MainTabPanel);
						authedListPanel.showList(tempParams);
					}
					Workflow.navPanel.ds.reload();
					Workflow.mainPanel.setActiveTab("AuthedListPanel");
		 		}
				var rec = grid.getStore().getAt(rowIndex);
				var params={};
				params['flowType']=3;
				params['workflowId']=rec.data.objectId;
				params['instanceId']=rec.data.instanceId;
				params['entryId']=rec.data.entryId;
				params['stepId']=rec.data.stepId;
				Ext.Ajax.request({
						url : '/bin/workflow/flowframe.jcp',
						params : params,
						method : 'GET',
						success : function(response, options) {
							var moduleJson=Ext.decode(response.responseText);
							if(moduleJson.sucess){
								var panels=CPM.Frame.getFrame(moduleJson);	
								var panel=new Ext.Panel({
									layout:'border',
									border:false,
									items:panels
								});
								if(moduleJson.modType*1==3){
									for(i=0;i<panels.length;i++){
										var p=panels[i];
										var pa=p.items?(Ext.isArray(p.items)?p.items[0]:p.items):p;
										var param={
												flowType:3,
												stepId:rec.data.stepId,
												entryId:rec.data.entryId,
												pageType:pa.pageType,
												workflowId:pa.workflowId,
												objectId:pa.objectId,
												instanceId:pa.instanceId,
												programType:pa.programType,
												exportTab:pa.exportTable,
												exportItem:pa.exportItem,
												exportData:pa.exportData,
												dataId:pa.dataId
										};		
										var frameIndex=p.frameIndex;
										for(var i in frameIndex){
											var np=Ext.getCmp(frameIndex[i]);
											np.on("afterlayout",function(cpanel){
												if(!cpanel.isPrgLoaded){
													cpanel.isPrgLoaded=true;
													cpanel.loadProgram.defer(10,cpanel,[param,true]);
												}
											})
										}
									}
								}
								parentPanel.add(panel);
								parentPanel.setActiveTab(panel);
							}else{
								Ext.msg("error",moduleJson.message);
							}
						}
				});
			}.createDelegate(this)
		},
        bbar: new Ext.PagingToolbar({
            pageSize: 1000,
            store: this.ds,
            displayInfo: true,
            displayMsg: '{0}-{1}条 共:{2}条'.loc(),
            emptyMsg:'没有数据'.loc()
        }),
		tbar:listButton
    });
	this.MainTabPanel=new Ext.TabPanel({
			id: 'AuthedListPanel',
			activeTab:0,
			tabPosition:'bottom',
			defaults:{autoScroll:true},
			items:[this.WorkFlowGrid]
	});
};

bin.workflow.AuthedListPanel.prototype={
	showList: function(params){	
		this.ds.baseParams = params;
		this.ds.load({params:{start:0, limit:1000}});
	},
	onButtonClick : function(item){
		if(item.btnId=='refresh'){
			this.ds.load({params:{start:0, limit:1000}});
		}
    }
};

