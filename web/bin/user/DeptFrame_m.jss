(function () {
    var rightHtml = '<div class="portlet box red-pink "><div class="portlet-title"><div class="caption"><i class="fa fa-gift"></i> 组织机构管理</div></div><div class="portlet-body form"><form class="form-horizontal" role="form" id="form"><div class="form-body"><div style="margin-bottom:20px"><div class="row"><div class="col-md-offset-1 col-md-9"><button type="button" class="btn red-pink " id="create" >新建</button><button type="submit" class="btn red-pink" id="save" style="display: none">保存</button><button  class="btn red-pink" id="goback" style="display: none" type="button">返回</button><button  class="btn red-pink" id="delete" type="button" data-toggle="modal">删除</button><button  class="btn red-pink" id="update-save" type="submit">保存</button></div></div></div><div class="form-group"><label class="col-md-3 control-label">名称：<span class="required" aria-required="true">*</span></label><div class="col-md-9"><div class="input-icon right"><input type="text" class="form-control input-inline input-medium " id="name" name="shortName" ></div></div></div><div class="form-group"><label class="col-md-3 control-label">单位类型：<span class="required" aria-required="true">*</span></label><div class="col-md-9"><select class="form-control input-medium" id="type" name="deptType"></select></div></div><div class="form-group"><label class="col-md-3 control-label">优先顺序：</label><div class="col-md-9"><input type="text" class="form-control input-inline input-medium " id="order" name="sort_id"></div></div><div class="form-group"><label class="col-md-3 control-label">创建时间：</label><div class="col-md-9"><input type="text" class="form-control input-inline input-medium "  readonly= "true " id="create-time" name="createDate"></div></div><div class="form-group"><label class="col-md-3 control-label">单位全称：<span class="required" aria-required="true">*</span></label><div class="col-md-9"><input type="text" class="form-control input-inline input-medium" id="companyName" name="deptName"></div></div></div></form></div></div>';



    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">    <div class="col-md-12">	<div class="portlet">	    <div class="portlet-title">		<div class="caption">		    <i class="fa fa-user"></i>组织机构管理	</div>		<div class="tools">                   <a href="" class="fullscreen" data-original-title="" title="">                   </a>		</div>	    </div>	    <div class="portlet-body">' + panksLeft(conf) + panksRight() + " </div></div></div></div>" + deleteModal(conf, "delete");
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">    <div class="portlet red-pink box">        <div class="portlet-title">            <div class="caption">                <i class="fa fa-users"></i>组织结构导航          </div>            <div class="tools">                <a href="javascript:;" class="collapse">                </a>            </div>        </div>        <div class="portlet-body">            <div id="tree_' + conf.id + '" class="tree-demo">            </div>        </div>    </div></div>';
    }

    function panksRight() {
        return '<div class="profile-content">' + rightHtml + "</div>";
    }

    function deleteModal(conf, type) {
        if (!conf || !type) {
            return "";
        }
        return '<div id="deleteModal" class="modal fade" tabindex="-1">    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>          </div>          <div class="modal-body"><h4>确定删除？</h4></div>       <div class="modal-footer">           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>   <button type="button" class="btn green-meadow" id="deleteDepartmentBtn">确定</button> </div> </div>';
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
                for (var i = 0; i < options.length; i++) {
                    html += "<option value='" + options[i][0] + "'>" + options[i][1] + "</option>";
                }
                if (currentSelectDeptId == 0) {
                    var option = '<option value="0">企业</option><option value="1">政府</option>';
                    $("#type").html(option);
                    $("#create").on("click", function () {
                        $("#type").html(html);
                    });
                } else {
                    $("#type").html(html);
                    $("#type").val(data.deptType);
                }
            }
        });
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
                }
            },
            types: {
                "default": {icon: "fa fa-folder icon-state-warning icon-lg"},
                file: {icon: "fa fa-file icon-state-warning icon-lg"}
            },
            state: {key: "demo3"},
            plugins: ["dnd", "state", "types"]
        }).on("changed.jstree", function (e, data) {
            if (data && data.selected && data.selected.length) {
                currentSelectDeptId = data.selected[0];
                if (data.selected) {
                }
                getDate(currentSelectDeptId);
                $("#create,#update-save,#delete").show(200);
                $("#goback,#save").hide(200);
            }
        }).on("move_node.jstree", function (e, data) {
            $.ajax({
                type: "post",
                url: "/bin/user/create.jcp",
                data: {type: "move", dept_id: data.node.id, parent_dept_id: data.parent},
                success: function () {
                    $("#" + data.node.id).on("loaded.jstree", function (event, data) {
                        $("#jstree").jstree("open_all");
                    });
                    toastr.success("移动部门成功");
                }
            });
        }).on("loaded.jstree", function (e, data) {
            var inst = data.instance;
            var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
            inst.select_node(obj);
        });
    }

    function initDeptForm(conf, type) {
        realType = type;
       
        var form = $("#form");
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
                deptName: {minlength: jQuery.validator.format("单位全称不能小于 {0} 个字符"), required: "单位全称必须填写。"},
            },
             highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
            
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
             
            submitHandler: function (form) {
                var data = "";
                if (realType == "save") {
                    data = $(form).serialize() + "&type=save&dept_id=" + currentSelectDeptId;
                } else {
                        data = $(form).serialize() + "&type=updatesave&dept_id=" + currentSelectDeptId;
                }
                $.ajax({
                    type: "post", url: "/bin/user/create.jcp", data: data, success: function () {
                        $("#delete,#update-save").show(200);
                        $("#save,#goback").hide(200);
                        var tree = $.jstree.reference("#tree_" + conf.id);
                        tree.refresh();
                        if (realType == "save") {
                            toastr.success("创建成功");
                        } else {
                                toastr.success("修改成功");
                        }
                    }
                });
                 
            }
        });
        $("#goback").on("click", function () {
           resetVaildate.resetForm();
        });
         $("#tree_" + conf.id).on("click","li",function(){
               resetVaildate.resetForm()
           })
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
                    $(this).hide(200);
                    $("input").val("");
                    $("#delete,#update-save").hide(200);
                    $("#save,#goback").show(200);
                });
                $("#goback").on("click", function (e) {
                    e.preventDefault();
                    $("#delete,#update-save").show(200);
                    $("#save").hide(200);
                    $("#create").show(200);
                    $(this).hide(200);
                    getDate(currentSelectDeptId);
                });
                $("#delete").on("click", function (e) {
                    e.preventDefault();
                    var tag = $("#deleteModal");
                    tag.modal("show");
                });
                $("#deleteDepartmentBtn").on("click", function () {
                    var tag = $("#deleteModal");
                    $.ajax({
                        type: "post",
                        url: "/bin/user/create.jcp",
                        data: {type: "delete", dept_id: currentSelectDeptId},
                        success: function (res) {
                            var deptRes = eval("(" + res + ")");
                            if (deptRes.success) {
                                toastr.success("删除成功");
                                var tree = $.jstree.reference("#tree_" + conf.id);
                                tree.refresh();
                            } else {
                                toastr.error(deptRes.message, "删除失败");
                            }
                        }
                    });
                    tag.modal("hide");
                    getDate(0);
                });
                $("#save").on("click", function (){
                    initDeptForm(conf, this.id);
                });
                $("#update-save").on("click", function() {
                    initDeptForm(conf, this.id);
                });
            });
        }
    };
})();