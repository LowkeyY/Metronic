

bin.user.RoleListPanel = function(frames){
	this.frames = frames;

    this.xg = Ext.grid;
	var Role = this.frames.get("Role");
	this.retFn =function(main){
		main.setActiveTab("RoleListPanel");
		main.hideStatus();
	}.createCallback(Role.mainPanel);

	this.listButton=[];
	this.listButton.push(new Ext.Toolbar.Button({
				btnId:'new',
				text: '新建'.loc(),
				icon: '/themes/icon/xp/newfile.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.onButtonClick
	}));
	this.listButton.push(new Ext.Toolbar.Separator());
	this.listButton.push(new Ext.Toolbar.Button({
				btnId:'edit',
				text: '修改'.loc(),
				icon: '/themes/icon/common/update.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.onButtonClick
	}));
	this.listButton.push(new Ext.Toolbar.Separator());
	this.listButton.push(new Ext.Toolbar.Button({
				btnId:'deleteList',
				text: '删除'.loc(),
				icon: '/themes/icon/common/delete.gif',
				cls: 'x-btn-text-icon  bmenu',
				disabled:false,
				scope: this,
				hidden : false,
				handler :this.onButtonClick
	}));
   this.ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url:"/bin/user/rolelist.jcp",
			method:'GET'
		}),
        reader: new Ext.data.JsonReader({
            root: 'dataItem',
            totalProperty: 'totalCount',
            id: '序号'
        }, [
			{name: '序号'.loc(), mapping: '序号'},
			{name: '职位名称'.loc(), mapping: '职位名称'},
			{name: '称谓'.loc(), mapping: '称谓'},
			{name: '级别'.loc(), mapping: '级别'},
			{name: '注册日期'.loc()},
			{name: '优先显示'.loc()}
        ]),
        remoteSort: true
    });
    //this.ds.setDefaultSort('职位名称'.loc(), 'desc');

    this.cm = new Ext.grid.ColumnModel([ new this.xg.RowNumberer(),{
           id: '职位名称', 
           header: '职位名称'.loc(),
           dataIndex: '职位名称'.loc(),
		   sortable: true,
           align: 'left'
        },{
           header: '称谓'.loc(),
           dataIndex: '称谓'.loc(),
           sortable: true,
           align: 'left'
        },{
           header: '级别'.loc(),
           dataIndex: '级别'.loc(),
		   sortable: true,
           align: 'left'
        },{
           header: '注册日期'.loc(),
           dataIndex: '注册日期'.loc(),
		   sortable: true,
           align: 'left'
        }]);

    this.cm.defaultSortable = true;
	this.RoleListGrid = new Ext.grid.GridPanel({
        store: this.ds,
        cm: this.cm,
		border:false,
        trackMouseOver:false,
        loadMask: {msg:'数据载入中...'.loc()},
        ddGroup : 'RoleListDDGroup',
		enableDragDrop : true,
        viewConfig: {
			forceFit:true, 
            enableRowBody:true, 
            showPreview:true, 
            getRowClass : this.applyRowClass 
        },
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this.ds,
            displayInfo: true,
            displayMsg: '{0}-{1}条 共:{2}条'.loc(),
            emptyMsg:'没有数据'.loc()
        }),
		tbar:this.listButton,
		listeners : {
			afterrender : function(){
				if(!this.gridDropTarget)
					this.gridDropTarget = new Ext.dd.DropTarget(this.getView().scroller.dom, {
					  ddGroup    : 'RoleListDDGroup',
					  notifyDrop : function(ddSource, e, data){
					         var grid = data.grid , store = grid.store , rows = data.selections;
					         if((store.baseParams && store.baseParams.keyword) || !rows.length || rows.length == store.getCount()){
					         	e.cancel = true;
					            return;
					         }
					         var cindex = ddSource.getDragData(e).rowIndex;
					         if (cindex == undefined || cindex < 0) {
					             e.cancel = true;
					             return;
					         }
					         //纪录拖放后被拖放纪录的新rowIndex
					         var dragDropedRowIndexs = new Array() , changes = new Array();
					         var newRowIndex = cindex;
					         var total = store.getTotalCount();
					         //当在选中多行拖动调整时，计算新的行索引起始位置
					         if ((cindex + rows.length) > total) {
					             newRowIndex = total - rows.length;
					         }
					         if(newRowIndex == data.rowIndex){
					         	e.cancel = true;
					            return;
					         }
					         for (var i = 0; i < rows.length; i++) {
					             var rowdata = store.getById(rows[i].id);
					             if (!this.copy) {
					                 store.remove(store.getById(rows[i].id));
					                 store.insert(cindex, rowdata);
					                 dragDropedRowIndexs[i] = newRowIndex + i;
					                 changes.push(rows[i].id);
					             }
					         }
					         var preSortId = -1 , nextSortId = -1;
					         if(newRowIndex - 1 > 0 && store.getAt(newRowIndex - 1))
					         	preSortId = store.getAt(newRowIndex - 1).get("优先显示");
					         if(newRowIndex + rows.length <= store.getCount() - 1 && store.getAt(newRowIndex + rows.length))
					         	nextSortId = store.getAt(newRowIndex + rows.length).get("优先显示");
					         	
					         Ext.Ajax.request({
					                url : '/bin/user/sortchange.jcp',
					                method : 'POST',
					                scope : this,
					                params : {
					                  changeType : "role",
					                  changes : changes.join(",") ,
					                  preSortId : preSortId,
					                  nextSortId : nextSortId
					                },
					                success:function(){
					                  store.reload();
					                  grid.getView().refresh();
					                  grid.getSelectionModel().selectRows(dragDropedRowIndexs);
					                }
					          });
					         return true
					      }
					});
			}
		}
    });
	this.MainTabPanel=new Ext.Panel({
			id: 'RoleListPanel',
			border:false,
			cached:true,
			layout:'fit',
			defaults:{autoScroll:true},
			items:[this.RoleListGrid]
	});
};

bin.user.RoleListPanel.prototype={
	showList: function(params){	
		this.ds.baseParams = params;
		this.ds.load({params:{start:0, limit:40}});
		this.frames.get("Role").mainPanel.hideStatus();
	},
	showCreatePanel: function(){	
		using("bin.user.RolePanel");
		var Role=this.frames.get('Role');
		Role.rolePanel=this.frames.createPanel("rolePanel",new bin.user.RolePanel(this.retFn));
		Role.mainPanel.add(Role.rolePanel.MainTabPanel);
		Role.mainPanel.setActiveTab(Role.rolePanel.MainTabPanel);
		Role.mainPanel.showStatus();   
	},
	onButtonClick : function(item){
		Role=this.frames.get('Role');
		if(item.btnId=='new'){
			var newParams={};
			newParams['dept_id']=this.ds.baseParams['dept_id'];
			newParams['type']='new';
			this.showCreatePanel();
			Role.rolePanel.formCreate(newParams);
		}else if(item.btnId=='deleteList'){
			 Ext.msg('confirm', '确认删除?'.loc(), function (answer){
                   if (answer == 'yes') {
						var delParams=this.ds.baseParams
						delParams['type']='delete';
						
						var oldSelections = this.RoleListGrid.getSelectionModel().getSelections();
						this.RoleListGrid.getSelectionModel().clearSelections();
						var roleArray=[];
						Ext.each(oldSelections, function(selection){
							roleArray.push(selection.get('序号'.loc()));
						});
						delParams['roleId']=roleArray;
                        Ext.Ajax.request({ 
							url:'/bin/user/rolecreate.jcp',
							params:delParams,
							method: 'post',  
							scope:this,
							success:function(form, action){ 
								var listParams={};
								listParams['dept_id']= this.ds.baseParams['dept_id'];
								this.ds.baseParams = listParams;
								this.ds.load({params:{start:0, limit:40}});
							},								
							failure: function(form, action) {
								    Ext.msg("error",'数据删除失败!,原因'.loc()+':<br>'+action.result.message);
							}
                        });  
				  } 
               }.createDelegate(this));
		}else if(item.btnId=='edit'){
				var oldSelections = this.RoleListGrid.getSelectionModel().getSelections();
				this.RoleListGrid.getSelectionModel().clearSelections();
				if(oldSelections.length!=1){
					    Ext.msg("error",'必须且只能选择一条数据进行编辑!'.loc());
				}else{
					this.showCreatePanel();
					var editParams={};
					editParams['dept_id']=this.ds.baseParams['dept_id'];
					var roleArray=[];
					Ext.each(oldSelections, function(selection){
						roleArray.push(selection.get('序号'.loc()));
					});
					editParams['roleId']=roleArray[0];
					editParams['type']='edit';
					Role.rolePanel.loadData(editParams);
					Role.rolePanel.formEdit(editParams);
				}
		}
    }
};

