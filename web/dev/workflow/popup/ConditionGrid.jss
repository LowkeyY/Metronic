Ext.namespace("dev.workflow.popup");

dev.workflow.popup.ConditionGrid = function(parent_id,conditions,wf){
	this.parent_id=parent_id;
	this.conditions=conditions;
	var conditionArray=new Array;
	n=0;
    this.XConditionArgs={};
	this.conditionsType;

	this.functionTypeMap={};
	this.functionTypeMap['class']='java类'.loc();
	this.functionTypeMap['beanshell']='beanshell脚本'.loc();
	if(conditions){
		this.conditionsType=conditions.getType();
		var condition=conditions.getConditions();
		for(var j=0;j<condition.length;j++){
			var conditionName=condition[j].getName();
			conditionArray[n]=new Array;
			conditionArray[n][0]=condition[j].getType();
			conditionArray[n][1]=conditionName;
			conditionArray[n][2]=this.functionTypeMap[condition[j].getType()];
				var tmpArgs=condition[j].getArgs();
				var temArgArr=new Array;
				var m=0;
				for(var k in tmpArgs){
					var tmpArg=tmpArgs[k];
					temArgArr[m]=new Array;
					if(tmpArg.getName()!='class.name'){
						temArgArr[m][0]=tmpArg.getName();
						temArgArr[m][1]=tmpArg.getValue();	
						m++
					}
				}	
				this.addConditionArg(conditionName,temArgArr);
				n++;
		}
	}

//------------------------------EditorGrid 体系------------------------------------------------------

	this.typeDs = new Ext.data.SimpleStore({
		fields:['id', 'label'],
		data:[
			['class', 'java类'.loc()],
			['beanshell', 'beanshell脚本'.loc()]
		]
	});
	var nameArray1=[
			['allow.owner.only', '只允许所有者'.loc()],
			['deny.owner', '禁止所有者'.loc()],
			['check.status', '检查状态'.loc()]
		];
	var nameArray2=[
			['bsh.function', 'beanshell脚本'.loc()]
	];
	this.nameDs = new Ext.data.SimpleStore({
		fields:['id', 'label'],
		data:nameArray1
	});
//---------------------------------------------------------------------------------------------------------

    var condCm = new Ext.grid.ColumnModel([{
           header: '类型'.loc(),
           dataIndex: 'conditionType_txt',
           width: 130,
           editor: this.conditionType=new Ext.form.ComboBox({
               typeAhead: false,
               triggerAction: 'all',
			   store:this.typeDs,
			   valueField:'id',
			   displayField:'label',
			   mode:'local',
               lazyRender:true,
               listClass: 'x-combo-list-small'
            })
        },{
           id:'conditionTitle',
           header: '名称'.loc(),
           dataIndex: 'conditionTitle',
           width: 220,
           editor:this.conditionTitle=new Ext.form.ComboBox({
               typeAhead: false,
               triggerAction: 'all',
			   store:this.nameDs,
			   valueField:'id',
			   displayField:'label',
			   mode:'local',
               lazyRender:true,
               listClass: 'x-combo-list-small'
            })
        }
    ]);
    condCm.defaultSortable = true;

    var condition = Ext.data.Record.create([
           {name: 'conditionType'},
           {name: 'conditionTitle', type: 'string'}
     ]);

    this.conditionStore = new Ext.data.SimpleStore({
		fields:['conditionType', 'conditionTitle','conditionType_txt'],
		data:conditionArray
	});

   var ConditionGrid=this.mainPanel= new Ext.grid.EditorGridPanel({
		id:'ConditionGrid',
		title: '条件'.loc(),
        cm: condCm,
		store: this.conditionStore,
        frame:false,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
        clicksToEdit:1,
        tbar: [{
			text: '增加'.loc(),
			icon: '/themes/icon/xp/add.png',
			cls: 'x-btn-text-icon  bmenu',
			disabled:false,
			scope:this,
            handler : function(){
				var maxId=1;
				if(this.conditionStore)
					maxId=this.conditionStore.getCount()+1;
                var p = new condition({
                    conditionType: 'class',
                    conditionTitle: '',
					conditionType_txt:''
                });
                ConditionGrid.stopEditing();
                this.conditionStore.insert(0, p);
                ConditionGrid.startEditing(0, 0);
				ConditionGrid.selModel.selectRow(0);
            }
        },'-',{
			text: '设定'.loc(),
			icon: '/themes/icon/xp/cog_edit.png',
			cls: 'x-btn-text-icon  bmenu',
			disabled:false,
			scope:this,
            handler : function(){
				var selectedRC=ConditionGrid.selModel.getSelected();
				var tmpName=selectedRC.get('conditionTitle');
				var argArr=this.getConditionArg(tmpName);	
				if(tmpName.indexOf('allow.owner.only')!=-1){
					using("dev.workflow.popup.ArgWindow");
					Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,tmpName,argArr);
					Workflow.argWin.win.on('close',function(){	
						if(Workflow.argWin.argKey){
							this.addConditionArg(tmpName,[['step_id',Workflow.argWin.argKey]]);
						}
					},this);
					Workflow.argWin.show();
				}else if(tmpName.indexOf('deny.owner')!=-1){
					using("dev.workflow.popup.ArgWindow");
					Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,tmpName,argArr);
					Workflow.argWin.win.on('close',function(){	
						if(Workflow.argWin.argKey){
							this.addConditionArg(tmpName,[['step_id',Workflow.argWin.argKey]]);
						}
					},this);
					Workflow.argWin.show();
				}else if(tmpName.indexOf('check.status')!=-1){
					using("dev.workflow.popup.ArgWindow");
					Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,tmpName,argArr);
					Workflow.argWin.win.on('close',function(){	
						if(Workflow.argWin.argKey){
							var param=Workflow.argWin.argKey.split(':');
							this.addConditionArg(tmpName,[['step_id',param[0]],['status',param[1]]]);
						}
					},this);
					Workflow.argWin.show();
				}else if(tmpName.indexOf('bsh.condition')!=-1){
					using("dev.workflow.popup.ArgWindow");
					Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,tmpName,argArr);
					Workflow.argWin.win.on('close',function(){	
						if(Workflow.argWin.argKey){
							this.addConditionArg(tmpName,[['script',Workflow.argWin.argKey]]);
						}
					},this);
					Workflow.argWin.show();
				}else{
					Ext.msg("error",'该列不支持参数设定!'.loc());
				}
            }
        },'-',{
			text: '删除'.loc(),
			icon: '/themes/icon/xp/delete.gif',
			cls: 'x-btn-text-icon  bmenu',
			disabled:false,
			scope:this,
            handler : function(){
				var selectedKeys = ConditionGrid.selModel.selections.keys; 
				if(selectedKeys.length > 0){
					 ConditionGrid.stopEditing();
					this.conditionStore.remove(ConditionGrid.selModel.getSelected()) ;
				}else{
					Ext.msg("warn",'最少选定一条记录进行删除!'.loc());
				}
            }
        }]
    });

	ConditionGrid.on('afteredit',function(e){
		if(e.column==0){
			e.record.set('conditionType_txt',this.conditionType.getEl().dom.value);
			e.record.set('conditionType',e.value)
		}
	},this);

	this.conditionType.on('select', function(){
		var nds=this.nameDs;
		var maxId=1;
		if(this.conditionStore)
			maxId=this.conditionStore.getCount();
		var selectedRC=ConditionGrid.selModel.getSelected();
		if(this.conditionType.getValue()=='beanshell'){
			nds.loadData(nameArray2);
			var tmpName='bsh.condition'+'.'+maxId;
			this.conditionTitle.setValue(tmpName);
			selectedRC.set('conditionTitle',tmpName);
			using("dev.workflow.popup.ArgWindow");
			Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,'beanshell',null);
			Workflow.argWin.win.on('close',function(){	
				if(Workflow.argWin.argKey){
					this.addConditionArg(tmpName,[['script',Workflow.argWin.argKey]]);
					ConditionGrid.stopEditing();
				}
			},this);
			Workflow.argWin.show();
		}else{
			var tmpName='';
			this.conditionTitle.setValue(tmpName);
			selectedRC.set('conditionTitle',tmpName);
			nds.loadData(nameArray1);
		}
	}, this);
	this.conditionTitle.on('select', function(){
		var val=this.conditionTitle.getValue();
		var selectedRC=ConditionGrid.selModel.getSelected();
		var maxId=1;
		if(this.conditionStore)
			maxId=this.conditionStore.getCount();
		var tmpName=val+'.'+maxId;
		this.conditionTitle.setValue(tmpName);
		selectedRC.set('conditionTitle',tmpName);
		using("dev.workflow.popup.ArgWindow");
		Workflow.argWin = new dev.workflow.popup.ArgWindow(parent_id,wf,val,null);
		Workflow.argWin.win.on('close',function(){	
			if(Workflow.argWin.argKey){
				if(tmpName.indexOf('allow.owner.only')!=-1){
					this.addConditionArg(tmpName,[['step_id',Workflow.argWin.argKey]]);
				}else if(tmpName.indexOf('deny.owner')!=-1){
					this.addConditionArg(tmpName,[['step_id',Workflow.argWin.argKey]]);
				}else if(tmpName.indexOf('check.status')!=-1){
					var param=Workflow.argWin.argKey.split(':');
					this.addConditionArg(tmpName,[['step_id',param[0]],['status',param[1]]]);
				}else if(tmpName.indexOf('bsh.condition')!=-1){
					this.addConditionArg(tmpName,[['script',Workflow.argWin.argKey]]);
				}else{
					Ext.msg("warn",'该列不支持参数设定!'.loc());
				}
				ConditionGrid.stopEditing();
			}
		},this);
		Workflow.argWin.show();
	}, this);
};
Ext.extend(dev.workflow.popup.ConditionGrid, Ext.grid.EditorGridPanel, {
	getConditions : function(){
		var conditionArray=[];
		var conditions=new XConditions();
		for(var i=0;i<this.conditionStore.getCount();i++){
			var conditionTmp=new XCondition();
			var rc=this.conditionStore.getAt(i);
			conditionTmp.setType(rc.get('conditionType'));
			var tmpName=rc.get('conditionTitle');
			conditionTmp.setName(tmpName);

			if(tmpName.indexOf('allow.owner.only')!=-1){
				var argTmp=new XArg();
				argTmp.init('class.name','com.kinglib.workflow.util.AllowOwnerOnlyCondition');
				conditionTmp.addArgs(argTmp);
			}else if(tmpName.indexOf('deny.owner')!=-1){
				var argTmp=new XArg();
				argTmp.init('class.name','com.kinglib.workflow.util.DenyOwnerCondition');
				conditionTmp.addArgs(argTmp);
			}else if(tmpName.indexOf('check.status')!=-1){
				var argTmp=new XArg();
				argTmp.init('class.name','com.kinglib.workflow.util.StatusCondition');
				conditionTmp.addArgs(argTmp);
			}
			for(var j in this.XConditionArgs){
				var tmpArgArray=this.getConditionArg(tmpName);
				for(var k=0;k<tmpArgArray.length;k++){	
					var argTmp=new XArg();
					argTmp.init(tmpArgArray[k][0],tmpArgArray[k][1]);	
					conditionTmp.addArgs(argTmp);
				}
			}
			conditionArray.push(conditionTmp);
		}
		return conditionArray;
    },
	addConditionArg: function (name,conditionArgArray) {
		this.XConditionArgs[name]=conditionArgArray;
	},
    getConditionArg:function (name){
			if(this.XConditionArgs[name]){
				return this.XConditionArgs[name];
			}else{
				return null;
			}
    }
});
