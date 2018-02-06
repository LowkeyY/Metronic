(function () {
    var portletColor = PageSystem.getColor() , currentSelectDeptId = 0,
        currentSelectDeptId2="" , moveTreeRender = false , 
        rightHtml =  '<form class="form-horizontal" role="form" id="deptform">\n' +
            '<div class="portlet box '+portletColor+' ">\n' +
            '    <div class="portlet-title row" style="margin-left:0;margin-right:0">\n' +
            '        <div class="caption col-md-4"><i class="fa fa-sitemap"></i> 组织机构管理</div>\n' +
            '                <div class="col-md-8 clearfix" style="padding-top: 5px;">\n' +
            '                    <div style="float:right">\n' +
            '                        <div>\n' +
            '                            <button type="button" class="btn default" id="create"><i class="fa fa-plus"></i>新建</button>\n' +
            '                            <button type="button" class="btn default" id="save" style="display: none"><i class="fa fa-edit"></i>保存</button>\n' +
            '                            <button class="btn default" id="goback" style="display: none" type="button">返回</button>\n' +
            '                            <button class="btn default" id="delete" type="button" data-toggle="modal"><i class="fa fa-trash"></i>删除</button>\n' +
            '                            <button type="submit" class="btn default" id="update-save"><i class="fa fa-edit"></i>保存</button>\n' +
            '                            <button class="btn default" id="dept-move" type="button"><i class="fa fa-exchange"></i>移动</button>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '    </div>\n' +
            '    <div class="portlet-body form">\n' +
            '        <form class="form-horizontal" role="form" id="deptform">\n' +
            '            <div class="form-body">\n' +
            '                <div class="form-group"><label class="col-md-3 control-label">名称：<span class="required"\n' +
            '                                                                                       aria-required="true">*</span></label>\n' +
            '                    <div class="col-md-3">\n' +
            '                        <div class="input-icon right"><i class=""></i><input type="text" class="form-control"\n' +
            '                                                             id="name" name="shortName"></div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="form-group"><label class="col-md-3 control-label">单位类型：<span class="required"\n' +
            '                                                                                         aria-required="true">*</span></label>\n' +
            '                    <div class="col-md-3"><select class="form-control" id="type" name="deptType"></select>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="form-group"><label class="col-md-3 control-label">优先顺序：</label>\n' +
            '                    <div class="col-md-3"><input type="text" class="form-control" id="order"\n' +
            '                                                 name="sort_id"></div>\n' +
            '                </div>\n' +
            '                <div class="form-group"><label class="col-md-3 control-label">创建时间：</label>\n' +
            '                    <div class="col-md-3"><input type="text" class="form-control"\n' +
            '                                                 readonly="true " id="create-time" name="createDate" placeholder="系统自动生成"></div>\n' +
            '                </div>\n' +
            '                <div class="form-group"><label class="col-md-3 control-label">单位全称：<span class="required"\n' +
            '                                                                                         aria-required="true">*</span></label>\n' +
            '                    <div class="col-md-3"> <div class="input-icon right"><i class=""></i><input type="text" class="form-control"\n' +
            '                                                 id="companyName" name="deptName"></div></div>\n' +
            '                </div>\n' +
            '            </div>\n' +

            '    </div>\n' +
            '</div>'+
            '        </form>\n';
    function panks(conf) {
        return '<div class="row" id="module_\' + conf.id + \'">\n' +
            '    <div class="col-md-12">\n' +
            '        <div class="portlet">\n' +
            '            <div class="portlet-title">\n' +
            '                <div class="caption"><i class="fa fa-sitemap"></i>组织机构管理</div>\n' +
            '                <div class="tools"><a href="" class="fullscreen" data-original-title="" title=""> </a></div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksLeft(conf) + panksRight() + '</div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' + deleteModal(conf, "delete")+deptMoveModal(conf);
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">\n' +
            '    <div class="portlet box '+portletColor+'">\n' +
            '        <div class="portlet-title">\n' +
            '            <div class="caption"><i class="fa fa-sitemap"></i>组织机构导航</div>\n' +
            '            <div class="tools"><a href="javascript:;" class="collapse"> </a></div>\n' +
            '        </div>\n' +
            '        <div class="portlet-body">\n' +
            '            <div id="tree_' + conf.id + '" class="tree-demo"></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n';
    }

    function panksRight() {
        return '<div class="profile-content">' + rightHtml + "</div>";
    }

    function deleteModal(conf, type) {
        if (!conf || !type) {
            return "";
        }
        return '<div id="deleteModal" class="modal fade bs-modal-sm" tabindex="-1">\n' +
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '    </div>\n' +
            '    <div class="modal-body"><h4>确定删除？</h4></div>\n' +
            '    <div class="modal-footer">\n' +
            '        <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '        <button type="button" class="btn green-meadow" id="deleteDepartmentBtn">确定</button>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>';
    }
    
    function getDate(id) {
        $.ajax({
            type: "get",
            url: "/bin/user/create.jcp?dept_id=" + id + "&type=view",
            dataType: "json",
            success: function (data) {
                $("#name").val(data.shortName);
                $("#order").val(data.sort_id);
                $("#create-time").val(data.createDateModify);
                $("#companyName").val(data.deptName);
                var options = $.parseJSON(data.dept);
                var html = "";
                if(options.length){
                     for (var i = 0; i < options.length; i++) {
                    html += "<option value='" + options[i][0] + "'>" + options[i][1] + "</option>";
                }
                    $("#type").html(html);
                    $("#type").val(data.deptType);
                }
                if (id==0) {
                    var option = '<option value="0">企业</option><option value="1">政府</option>';
                    $("#type").html(option);
                     $("#type").val(data.deptType);
                    $("#create").on("click", function () {
                        $("#type").html(html);
                    });
                } 
            }
        });
    }
    function btnShow(){//控制按钮隐藏
         $("#delete,#update-save,#dept-move").show();
    }
    function btnHide(){//控制按钮隐藏
            $("#save,#goback").hide();
    }
    function renderTree(conf) {
        $("#tree_" + conf.id).jstree({
            core: {
                themes: {stripes: true},
                check_callback: true,
                data: {
                    url: "/bin/user/_getOrg.jjs", data: function (node) {
                        return {parent: node.id};
                    }
                },
                worker : false
            },
            types: {
                "default": {icon: "fa fa-folder icon-state-warning icon-lg"},
                file: {icon: "fa fa-file icon-state-warning icon-lg"}
            },
            state: {key: "nav_"+conf.id},
            plugins: [ "state", "types"]
        }).on("changed.jstree", function (e, data) {
            if (data && data.selected && data.selected.length) {
                currentSelectDeptId = data.selected[0];
                if (data.selected) {
                }
                getDate(currentSelectDeptId);
                $("#create,#update-save,#delete,#dept-move").show();
                $("#goback,#save").hide();
                $("#save").attr("type","button");//切换按钮类型
            }
        }).on("loaded.jstree", function (e, data) {
            var inst = data.instance;
            var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
            inst.select_node(obj);
        });
    }
    
    function vaildate(form){
        $(".form-group",form).removeClass("has-success");
        $(".form-group",form).find("i").removeClass();
    }
    
    function initDeptForm(conf, type) {
        realType = type;
        var form = $("#deptform");
        var resetVaildate = form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusCleanup: false,
            rules: {
                shortName: {minlength: 2, required: true},
                deptType: {required: true},
                deptName: {minlength: 2, required: true}
            },
            messages: {
                shortName: {minlength: jQuery.validator.format("名称不能小于 {0} 个字符"), required: "名称必须填写。"},
                deptType: {required: "请选择一个部门"},
                deptName: {minlength: jQuery.validator.format("单位全称不能小于 {0} 个字符"), required: "单位全称必须填写。"}
            },
            highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
                $(element).parent(".input-icon").children("i").removeClass().addClass("fa fa-warning");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
             success: function (label, element) {
                var icon = $(element).parent(".input-icon").children("i");
                $(element).closest(".form-group").removeClass("has-error").addClass("has-success");
                icon.removeClass().addClass("fa fa-check");
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            submitHandler: function (form) {
                var data = "";
                if(currentSelectDeptId!="0"||realType=='save'){
                        if (realType == "save") {
                    data = $(form).serialize() + "&type=save&dept_id=" + currentSelectDeptId+"&time="+Math.random();
                } else {
                         data = $(form).serialize() + "&type=updatesave&dept_id=" + currentSelectDeptId+"&time="+Math.random();
                }
                $.ajax({
                    type: "post", url: "/bin/user/create.jcp", data: data, success: function () {
                        btnShow();
                        btnHide();
                        $.jstree.reference("#tree_" + conf.id).refresh();
                        if (realType == "save") {
                              vaildate(form);//清除表单
                            toastr.success("创建成功");
                        } else {
                            vaildate(form);
                            toastr.success("数据修改成功");
                        }
                    }
                });
                }else{
                     if (realType == "update-save") {
                         var shortName = $("#name",form).val(),
                             orgType=$("#type",form).children("option:selected").val(),
                             orgName=$("#companyName",form).val(), 
                             param={};
                             param.shortName=shortName;
                             param.orgType=orgType;
                             param.orgName=orgName;
                             param.time=Math.random();
                             param.type="updatesave";
                             param.dept_id=currentSelectDeptId;
                             param.org_id=currentSelectDeptId;
                      $.ajax({
                    type: "post", url: "/bin/user/createOrg.jcp", data: param, success: function () {
                       btnShow();
                       btnHide();
                        $.jstree.reference("#tree_" + conf.id).refresh();
                            vaildate(form);
                            toastr.success("数据修改成功");
                    }
                });
                }
                }
            
            }
        });
        $("#goback").on("click", function () {//清除样式
            resetVaildate.resetForm();
            vaildate(form);
        });
        $("#tree_" + conf.id).on("click", "li", function () {//清除样式
             vaildate(form);
            resetVaildate.resetForm();
        });
    }
    
    function sendMoveTree(conf){
          if(currentSelectDeptId!==currentSelectDeptId2){
                $.ajax({
                type: "post",
                url: "/bin/user/create.jcp",
                data: {type: "move", dept_id:currentSelectDeptId, parent_dept_id: currentSelectDeptId2},
                success: function (data) {
                       $("#deptMoveModal").modal("hide");
                        toastr.success("移动部门成功");
                       $.jstree.reference("#tree_" + conf.id).refresh();
                    }
                     });
                     }else{
                         toastr.error("请选择其他部门");
                     }
    }
    
    function deptMoveModal(conf) {
       return '<div id="deptMoveModal" class="modal fade bs-modal-sm" tabindex="-1">\n' +
        '<div class="modal-dialog modal-sm">'+
        '<div class="modal-content">'+
        '    <div class="modal-header">\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
        '         <h4 class="modal-title"> 移动部门 </h4>' +
        '    </div>\n' +
        '    <div class="modal-body">'+deptMoveTree(conf)+'</h4></div>\n' +
        '    <div class="modal-footer">\n' +
        '        <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
        '        <button type="button" class="btn green-meadow" id="dept-move-submit">确定</button>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '</div>';
    }
    function deptMoveTree(conf) {
        return '<div class="row">\n' + '<div id="deptMoveTree_' + conf.id + '" class="tree-demo col-md-offset-2" style="margin-bottom:20px"></div>\n' + '<div id="moveSelect" class=" col-md-5" style="padding:0;margin-left:80px"></div>\n' + "</div>";
    }
    function renderMoveTree(conf){
            $("#deptMoveTree_" + conf.id).jstree({
                    core: {
                        themes: {responsive: false},
                        check_callback: true,
                        data: {
                            url: "/bin/user/_getOrg.jjs", 
                            data: function (node) {
                                return {parent: node.id};
                            }
                        },
                        worker : false
                    },
                    types: {
                        "default": {icon: "fa fa-folder icon-state-warning icon-lg"},
                        file: {icon: "fa fa-file icon-state-warning icon-lg"}
                    },
                    state: {key: "move_"+conf.id},
                    plugins: ["state","types"]
                }).on("changed.jstree", function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        currentSelectDeptId2 = data.selected[0];
                    }
                }).on("loaded.jstree", function (e, data) {
                    var inst = data.instance;
                    var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
                    inst.select_node(obj);
                }).on("before_open.jstree" , function(e , node){
                    $("#"+currentSelectDeptId , e.target).hide();
                    $(".jstree-node" , e.target).not("#"+currentSelectDeptId).show();
                });
    }
    function hiddenNode(treeNode,conf) {
        $("#"+treeNode,"#deptMoveTree_"+conf.id).hide();
        $(".jstree-node","#deptMoveTree_"+conf.id).not("#"+treeNode).show();
    } 
    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/jstree/dist/jstree.min.js");
            PageSystem.loadJS("/newhome/PageDatatable.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-select/bootstrap-select.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");
            appendHtml(panks(conf), function () {
                
                renderTree(conf);

                $("#create").on("click", function (e) {
                    e.preventDefault();
                    $(this).hide();
                    $("input").val("");
                    $("#delete,#update-save,#dept-move").hide();
                    $("#save,#goback").show();
                    $("#save").attr("type","submit");//切换按钮类型
                });
                $("#goback").on("click", function (e) {
                    e.preventDefault();
                   btnShow();
                    $("#save").hide();
                     $("#save").attr("type","button");//切换按钮类型
                    $("#create,#dept-move").show();
                    $(this).hide();
                    getDate(currentSelectDeptId);
                });
                $("#delete").on("click", function (e) {
                    e.preventDefault();
                    var tag = $("#deleteModal");
                    tag.modal("show");
                });
                $("#deleteDepartmentBtn").on("click", function () {
                    var tag = $("#deleteModal");
                    if(currentSelectDeptId!=0){
                          $.ajax({
                        type: "post",
                        url: "/bin/user/create.jcp",
                        data: {type: "delete", dept_id: currentSelectDeptId},
                        success: function (res) {
                            var deptRes = eval("(" + res + ")");
                            if (deptRes.success) {
                                toastr.success("数据删除成功");
                                 $.jstree.reference("#tree_" + conf.id).refresh();
                                   getDate(0);
                            } else {
                                toastr.error(deptRes.message, "删除失败");
                            }
                        }
                    });
                    
                    }else{
                          toastr.error("根部门不能删除");
                    }
                    tag.modal("hide");
                  
                });
                $("#save").on("click", function () {
                    initDeptForm(conf, this.id);
                    
                });
                $("#update-save").on("click", function () {
                    initDeptForm(conf, this.id);
                });
                $("#dept-move").on("click",function (e) {
                    if(!currentSelectDeptId){
                        toastr.error("请选择一个部门");
                     }else if(currentSelectDeptId=="0"){
                        toastr.error("此部门不能移动");
                     }else{
                        if(!moveTreeRender){
                            moveTreeRender = true;
                            renderMoveTree(conf);
                        }
                        hiddenNode(currentSelectDeptId,conf);
                        $("#deptMoveModal").modal("show");
                     }
                });
                $("#dept-move-submit").on("click",function(){
                    sendMoveTree(conf);
                });
            });
        }
    };
})();