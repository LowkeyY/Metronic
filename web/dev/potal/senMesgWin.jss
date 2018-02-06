Ext.namespace("dev.potal");

dev.potal.senMesgWin = function (btn) {
    Ext.Ajax.request({
        url: '/dev/potal/getAddress.jcp',
        method: 'get',
        scope: this,
        success: function (response, options) {
            var result = Ext.decode(response.responseText);
            this.init(btn, result.success ? result.data : []);
        }
    });
}

dev.potal.senMesgWin.prototype = {
    init: function (btn, checkboxItems) {

        var formItems = [];
        if (checkboxItems.length)
            formItems.push({
                xtype: 'checkboxgroup',
                name: 'clickvalue',
                width: '100%', // 宽度220
                columns: 1, // 在上面定义的宽度上展示3列
                fieldLabel: '选择接口',
                items: checkboxItems
            })
        formItems.push(new Ext.form.TextArea({
            fieldLabel: '请输入单独需要推送地址',
            name: 'address',
            height: 60,
            width: '100%'
        }));

        this.form = new Ext.FormPanel({
            border: false,
            bodyStyle: 'padding:20px 15px 30px;height:100%;width:100%;background:#FFFFFF;',
            items: formItems
        }
        );
        var mainPanel = new Ext.Window({
            title: "发送组织机构全量数据",
            icon: '/themes/icon/xp/forward.gif',
            width: 700,
            height: 500,
            layout: 'hbox',
            id: 'formwindow',
            resizable: false,
            defaults: {
                flex: 1,
                border: false
            },
            layoutConfig: {
                align: 'stretch'
            },
            buttons: [{
                    text: "发送",
                    icon: '/themes/icon/xp/forward.gif',
                    scope: this.form,
                    handler: function (btn) {
                        btn.disable();
                        var cbField = this.form.findField("clickvalue"), cbValuse = cbField && cbField.getValue() || [], postPaths = [] , isResultSuccess = function(responseText){
                            postPaths.shift();
                            var isSuccess = false;
                            try{
                               var result = Ext.decode(responseText);
                               isSuccess = result.success === true;
                            }catch(e){}
                            if(postPaths.length == 0)
                                btn.enable();
                            return isSuccess;
                        };
                        
                        Ext.each(cbValuse, function (checkbox) {
                            postPaths.push("");
                            checkbox.wrap.last().dom.innerHTML = checkbox.boxLabel + "&nbsp;&nbsp;&nbsp;<font style=\"color:#EF9B00;\">正在发送，请等待。</font>";
                            Ext.Ajax.request({
                                url: '/dev/potal/SendMessage.jcp?value=' + checkbox.faceUrl,
                                method: 'get',
                                scope: checkbox,
                                success: function (response, options) {
                                    var isSuccess = isResultSuccess(response.responseText);
                                    this.wrap.last().dom.innerHTML = this.boxLabel + (isSuccess === true ? "&nbsp;&nbsp;&nbsp;<font style=\"color:green;\">发送成功</font>" : "&nbsp;&nbsp;&nbsp;<font style=\"color:red;\">发送异常，请检查接口服务器。</font>");
                                    
                                }
                            });
                        }, this);
                        var addrField = this.form.findField("address"), addrValues = addrField && addrField.getValue() || "";
                        if (addrValues.trim().length) {
                            Ext.each(addrValues.split(","), function (addr) {
                                postPaths.push("");
                                var addLable = new Ext.form.Label({
                                    addr: addr,
                                    html: addr + "&nbsp;&nbsp;&nbsp;<font style=\"color:#EF9B00;\">正在发送，请等待。</font><br>"
                                });
                                this.add(addLable);
                                this.doLayout();

                                Ext.Ajax.request({
                                    url: '/dev/potal/SendMessage.jcp?value=' + addr,
                                    method: 'get',
                                    scope: addLable,
                                    success: function (response, options) {
                                        var isSuccess = isResultSuccess(response.responseText);
                                        this.getEl().update(this.addr + (isSuccess === true ? "&nbsp;&nbsp;&nbsp;<font style=\"color:green;\">发送成功</font><br>" : "&nbsp;&nbsp;&nbsp;<font style=\"color:red;\">发送异常，请检查接口服务器。</font><br>"));
                                    }
                                });
                            }, this);
                        }
                        if(postPaths.length == 0)
                            btn.enable();
                    }
                }, {
                    text: "关闭",
                    handler: function () {
                        mainPanel.close();
                    }
                }],
            items: this.form
        });

        mainPanel.show();
    },

    getSecondGridStore: function () {

    },

    saveMySelf: function (isSave) {

    }
}