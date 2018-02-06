
dev.potal.MenuMainPanel = function (param) {
    var items = [], len = 0, setConf = {
        xtype: 'fieldset',
        width: 800,
        style: 'margin:5px',
        buttonAlign: 'left'
    }, defaultBase = Ext.apply({
        title: '基础属性',
        items: {
            border: false,
            layout: 'form',
            items: []
        }
    }, setConf), defaultShow = Ext.apply({
        title: '显示位置',
        items: {
            border: false,
            layout: 'column',
            items: []
        }
    }, setConf), defaultFace = Ext.apply({
        title: '接口参数',
        items: {
            border: false,
            layout: 'column',
            items: []
        }
    }, setConf);
    this.RelatedDatas = {}, this.RelatedMap = {};

    if (param.default_attributes && (len = param.default_attributes.length)) {
        for (var i = 0; i < len; i++)
            defaultBase.items.items.push(this.packField(param.default_attributes[i]));
        for (var i = 0; i < defaultBase.items.items.length; i++)
            this.packVisible(defaultBase.items.items[i]);
        items.push(Ext.apply({}, defaultBase));
    }

    if (param.show_attributes && (len = param.show_attributes.length)) {
        for (var i = 0; i < len; i++)
            this.packFieldSet(param.show_attributes[i], defaultShow.items.items, len);
        items.push(Ext.apply({}, defaultShow));
    }

    if (param.face_attributes && (len = param.face_attributes.length)) {
        for (var i = 0; i < len; i++)
            this.packFieldSet(param.face_attributes[i], defaultFace.items.items, len);
        items.push(Ext.apply({}, defaultFace));
    }

    if (param.app_remarks && (len = param.app_remarks.length)) {
        for (var i = 0; i < len; i++)
            items.push({xtype: 'label', height: 20, style: 'display:block;'
                , text: param.app_remarks[i].text});
    }

    this.ButtonArray = [];

//	this.ButtonArray.push(new Ext.Toolbar.Button({
//				btnId : 'save',
//				text : '保存'.loc(),
//				icon : '/themes/icon/common/save.gif',
//				cls : 'x-btn-text-icon  bmenu',
//				disabled : false,
//				scope : this,
//				state : 'create',
//				handler : this.onButtonClick
//			}));
    this.ButtonArray.push(new Ext.Toolbar.Button({
        btnId: 'savejjs',
        text: '保存'.loc(),
        icon: '/themes/icon/common/save.gif',
        cls: 'x-btn-text-icon  bmenu',
        disabled: false,
        scope: this,
        state: 'create',
        handler: this.onButtonClick
    }));
    this.ButtonArray.push(new Ext.Toolbar.Button({
        btnId: 'clear',
        text: '清空'.loc(),
        icon: '/themes/icon/xp/clear.gif',
        cls: 'x-btn-text-icon  bmenu',
        disabled: false,
        scope: this,
        state: 'create',
        handler: this.onButtonClick
    }));

    this.deleteBtn = new Ext.Toolbar.Button({
        btnId: 'del',
        text: '删除'.loc(),
        icon: '/themes/icon/common/delete.gif',
        cls: 'x-btn-text-icon  bmenu',
        disabled: false,
        scope: this,
        hidden: true,
        state: 'edit',
        handler: this.onButtonClick
    })
    this.ButtonArray.push(this.deleteBtn);

    this.ButtonArray.push(new Ext.Toolbar.Button({
        btnId: 'sendMessage',
        text: '发送全量数据'.loc(),
        icon: '/themes/icon/xp/forward.gif',
        cls: 'x-btn-text-icon  bmenu',
        disabled: false,
        scope: this,
        state: 'create',
        handler: this.onButtonClick
    }));

    this.ButtonArray.push(new Ext.Toolbar.Button({
        btnId: 'sendArray',
        text: '发送数组'.loc(),
        icon: '/themes/icon/xp/clear.gif',
        cls: 'x-btn-text-icon  bmenu',
        disabled: false,
        scope: this,
        state: 'create',
        handler: this.onButtonClick
    }));
//	this.ButtonArray.push(new Ext.Toolbar.Button({
//			btnId : 'sendArray1',
//			text : '发送数组1'.loc(),
//			icon : '/themes/icon/xp/clear.gif',
//			cls : 'x-btn-text-icon  bmenu',
//			disabled : false,
//			scope : this,
//			state : 'create',
//			handler : this.onButtonClick
//		}));	
    /*	this.ButtonArray.push(new Ext.Toolbar.Button({
     btnId : 'getVal',
     text : '获取值'.loc(),
     icon : '/themes/icon/xp/clear.gif',
     cls : 'x-btn-text-icon  bmenu',
     disabled : false,
     scope : this,
     state : 'create',
     handler : this.onButtonClick
     }));*/

    this.menuForm = new Ext.FormPanel({
        border: false,
        labelWidth: 160,
        labelAlign: 'right',
        autoScroll: true,
        url: '/bin/menu/create.jcp',
        id: 'potalMenuBase',
        cached: false,
        method: 'POST',
        border: false,
        //bodyStyle : 'padding:20px 15px 30px 0px;height:100%;width:100%;background:#FFFFFF;',
        items: items,
        tbar: this.ButtonArray
    });
    this.application_id = -1;
    //this.menuForm.once("afterlayout", this.setVisibles, this);
    this.MainTabPanel = this.menuForm;
};
dev.potal.MenuMainPanel.prototype = {
    defaultCNFType: "textfield",

    hiddenProps: {},

    packFieldSet: function (conf, items, counts) {
        if (!conf || !conf.title || !conf.items || !conf.items.length || !items)
            return;
        var newItems = [], cw = 1 / (counts * 1 || 1);
        for (var i = 0; i < conf.items.length; i++)
            newItems.push(this.packField(conf.items[i]));
        if (newItems.length) {
            for (var i = 0; i < newItems.length; i++)
                this.packVisible(newItems[i]);
            items.push({
                columnWidth: cw,
                border: false,
                style: 'margin : 0 5px;',
                defaults: {
                    bodyStyle: 'padding:10px 0;',
                    labelWidth: 100,
                    labelAlign: 'left'
                },
                items: {
                    title: conf.title,
                    xtype: 'fieldset',
                    layout: 'form',
                    items: newItems
                }
            });
        }
    },

    packField: function (o) {
        o.xtype = getPotalCNFType(o.cntype || this.defaultCNFType);
        if (o.xtype === "iconpicker") {
            o.defaultImage = "/themes/icon/all/transparent.gif";
            o.getValue = function () {
                var v = this.value;
                return (Ext.isDefined(v) && v !== this.defaultImage) ? v : '';
            }
        }
        if (o.title)
            o.fieldLabel = o.title
        else
            o.hideLabel = true;
        this.packRelated(o);
        return o;
    },
    packRelated: function (o) {
        if (o.name && o.belongName && (typeof o.belongValue != "undefined")) {
            this.RelatedMap[o.name] = o.belongName;
            if (!this.RelatedDatas[o.belongName])
                this.RelatedDatas[o.belongName] = [];
            this.RelatedDatas[o.belongName].push(o.name);
        }
    },
    packVisible: function (o) {
        if (o.name) {
            var its;
            if ((its = this.RelatedDatas[o.name]) && its.length) {
                o.relatedItems = its;
                this.fieldAddListen(o, {
                    "change": this.relatedVisible.createDelegate(this)
                });
            }
        }
    },
    relatedVisible: function (comp) {
        if (comp.relatedItems) {
            Ext.each(comp.relatedItems, function (name) {
                var frm, field;
                if ((frm = comp.findParentByType("form")) && (field = frm.form.findField(name))) {
                    var hidden = (comp.getValue() === field.belongValue) && !comp.hidden;
                    field.setVisible(hidden);
                    //field.setDisabled(!hidden);
                    this.relatedVisible(field);
                }
            }, this);
        }
    },
    setVisibles: function () {
        for (var att in this.RelatedDatas) {
            var field;
            if (field = this.menuForm.form.findField(att))
                this.relatedVisible(field);
        }
    },

    fieldAddListen: function (o, add) {
        if (Ext.isObject(add)) {
            if (!o.listeners)
                o.listeners = {};
            Ext.apply(o.listeners, add);
        }
    },

    saveHiddenProps: function (props) {
        for (var att in props) {
            if (att.startsWith("mn_"))
                this.hiddenProps[att] = props[att];
        }
    },

    loadData: function (id) {
        this.application_id = id;
        this.hiddenProps = {};
        Ext.Ajax.request({
            url: '/potal/menu/' + id + '.json?' + Math.random(),
            method: 'get',
            scope: this,
            success: function (response, options) {
                var values = Ext.decode(response.responseText);
                this.saveHiddenProps(values);
                this.menuForm.form.setValues(values);
                this.deleteBtn.show();
            },
            failure: function (form, action) {
                this.menuForm.form.reset();
                this.deleteBtn.setVisible(id != 0);
                if (id != 0)
                    Ext.msg("error", '数据读取失败!<br> 原因:未找到该应用相关的配置文件。');
            }
        });
    },

    onButtonClick: function (item) {
        var Potals = this.frames.get("Potals");
        var frm = this.menuForm.form;
        if (item.btnId == 'save' || item.btnId == 'savejjs') {
            var saveParams = this.menuForm.form.getValues();
            saveParams['sys_version'] = PotalVersion;
            saveParams['sys_app_id'] = this.application_id;
            Ext.apply(saveParams, this.hiddenProps);
            saveParams = Ext.encode(saveParams);
            if (frm.isValid()) {
//                                var url = item.btnId == 'savejjs' ? '/dev/potal/create.jjs' : '/dev/potal/create.jcp'
                var url = '/dev/potal/create.jcp';
                frm.submit({
                    url: url,
                    params: {"data": saveParams},
                    method: 'POST',
                    scope: this,
                    success: function (form, action) {
                        var result = action.result;
                        if (result.success) {
                            Ext.msg("info", "保存成功");
                            if (action.result.type == "save") {
                                Potals.navPanel.getTree().loadSubNode(action.result.id, Potals.navPanel.clickEvent);
                            } else {
                                Potals.navPanel.getTree().loadSelfNode(action.result.id, Potals.navPanel.clickEvent);
                            }
                        } else {
                            Ext.msg("error", "保存数据出错，请联系管理员。");
                        }
                    },
                    failure: function (form, action) {
                    }
                });
            } else {
                Ext.msg("error", '数据不能提交,请修改表单中标识的错误!'.loc());
            }
        } else if (item.btnId == 'clear') {
            try {
                this.menuForm.form.reset();
            } catch (e) {
            }
        } else if (item.btnId == 'getVal') {
            alert(Ext.encode(this.menuForm.form.getValues()));
        } else if (item.btnId == 'del') {
            Ext.msg('confirm', '确认删除?'.loc(), function (answer) {
                if (answer == 'yes') {
                    Ext.Ajax.request({
//								url : '/dev/potal/create.jcp',
                        url: '/dev/potal/create.jjs',
                        params: {id: this.application_id, type: "delete"},
                        method: 'POST',
                        scope: this,
                        timeout: 30000000,
                        success: function (form, action) {
                            Ext.msg("info", '成功。');
                            Potals.navPanel.getTree().loadParentNode(Potals.navPanel.clickEvent);
                        },
                        failure: function (form, action) {
                        }
                    });
                }
            }.createDelegate(this));
        } else if (item.btnId == 'sendMessage') {
            new dev.potal.senMesgWin(this);
        } else if (item.btnId == 'sendArray') {
            var ids = [], names = [];
            for (var i = 0; i < 10; i++) {
                ids.push(i);
                names.push("this,is,name" + i);
            }
            Ext.Ajax.request({
                url: '/dev/potal/demo.jjs',
                params: {
                    ids: ids.join(","),
                    names: names
                },
                method: 'post',
                scope: this,
                success: function (response, options) {
                    var result = Ext.decode(response.responseText);
                    if (result.callback && Ext.isFunction(result.callback)) {
                        result.callback.defer(1, result);
                    }
                    Ext.msg("info", '成功。');
                },
                failure: function (form, action) {
                }
            });
        } else if (item.btnId == 'sendArray1') {
            var ids = [], names = [];
            for (var i = 0; i < 10; i++) {
                ids.push(i);
                names.push("this,is,name" + i);
            }
            Ext.Ajax.request({
                url: '/dev/potal/test.jjs',
                params: {
                    ids: ids.join(","),
                    names: names
                },
                method: 'post',
                scope: this,
                success: function (response, options) {
                    var result = Ext.decode(response.responseText);
                    if (result.callback && Ext.isFunction(result.callback)) {
                        result.callback.defer(1, result);
                    }
                    Ext.msg("info", '成功。');
                },
                failure: function (form, action) {
                }
            });
        }
    }
};
