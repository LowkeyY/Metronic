

(function () {
    var datatableHead = "", numberCounts = 1, currentSelectDeptId = "",portletColor = PageSystem.getColor();
    positionArray = [{text: "副省级", id: "26"}, {text: "正省级", id: "25"}, {text: "正厅级", id: "50"}, {
        text: "厅级",
        id: "60"
    }, {text: "正处级", id: "70"}, {text: "副处级", id: "80"}, {text: "科员", id: "100"}], roleNameArray = [{
        text: "办公厅用户",
        id: "8"
    }, {text: "省长", id: "1"}, {text: "副省长", id: "2"}, {text: "秘书长", id: "3"}, {text: "副秘书长", id: "4"}, {
        text: "厅级领导",
        id: "5"
    }, {text: "一般干部", id: "6"}, {text: "处长", id: "7"}];
    var userPageHtml ='<div class="alert alert-danger display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '    <span>您的输入信息有误，请检查并修改。</span></div>\n' +
        '<div class="alert alert-success display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '    您输入的信息完全正确。\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">职位名称:<input type="text" class="form-control" name="roles" placeholder="职位名称"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"> 称谓:<input class="form-control" id="roleName" name="roleName" type="hidden" placeholder="选择或输入称谓">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"> 级别:<input class="form-control" id="positionId" name="positionId" type="hidden" placeholder="选择或输入职位">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-4">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">顺序:<input type="text" class="form-control" name="sortId" placeholder="优先顺序"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-12">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                职责说明:<textarea class="form-control" id="textarea" rows="3" placeholder="职责说明" name="duty"></textarea>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    function getToolsId(id, type) {
        return "tools_" + (id ? id : numberCounts++) + (type ? "_" + type : "");
    }

    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">\n' +
            '    <div class="col-md-12">\n' +
            '        <div class="portlet">\n' +
            '            <div class="portlet-title">\n' +
            '                <div class="caption"><i class="fa fa-suitcase"></i>职位管理</div>\n' +
            '                <div class="tools"><a href="" class="fullscreen" data-original-title="" title=""></a></div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksRight() + '</div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' + panksToolsPage(conf, "create", "新建职位") + panksToolsPage(conf, "edit", "修改职位") + deleteModal(conf, "delete");
    }
    function panksToolsPage(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">\n' +
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '        <h4 class="modal-title">' + name + '</h4></div>\n' +
            '    <form action="#" class="horizontal-form" novalidate="novalidate">\n' +
            '        <div class="modal-body">' + toolsPageBody(type) + '</div>\n' +
            '        <div class="modal-footer">\n' +
            '            <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '            <button class="btn green-meadow" type="submit">保存</button>\n' +
            '        </div>\n' +
            '        </div>\n' +
            '        </div>\n' +
            '    </form>\n' +
            '</div>\n';
    }
   
    function deleteModal(conf, type) {
        if (!conf || !type) {
            return "";
        }
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade bs-modal-sm" tabindex="-1">\n' +
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '    </div>\n' +
            '    <div class="modal-body"><h4>确定删除？</h4></div>\n' +
            '    <div class="modal-footer">\n' +
            '        <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '        <button class="btn green-meadow" id="deleteRoleBtn">确定</button>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>';
    }

    function toolsPageBody(type) {
        return userPageHtml;
    }

    function panksRight() {
        return '<div class="profile-content">' + datatableHead + "</div>";
    }

    function fieldSetValue(el, v) {
        var selector = $(el), value = v || "";
        if (selector.length) {
            selector.attr("text", value);
            selector.attr("value", value);
            selector.attr("checked", !!value);
        }
    }

    function getActionsType(tag) {
        var type = "";
        if (tag.endsWith("_create")) {
            type = "save";
        } else {
            if (tag.endsWith("_edit")) {
                type = "updatesave";
            } else {
                if (tag.endsWith("_delete")) {
                    type = "delete";
                }
            }
        }
        return type;
    }

    function initSelect(datas) {
        var form = $("form"), defaultParam = datas || {};
        $("#roleName", form).select2({width: "resolve", placeholder: "称谓", allowClear: true, data: roleNameArray});
        $("#positionId", form).select2({width: "resolve", placeholder: "职位", allowClear: true, data: positionArray});
        for (var att in defaultParam) {
            if (att === "roleName") {
                $("#roleName", form).select2("val", defaultParam.roleName);
            } else {
                if (att === "positionId") {
                    $("#positionId", form).select2("val", defaultParam.positionId);
                }
            }
        }
    }

    function initRoleForm(selector, datas, moduleId) {
        var form = $("form", $(selector)), defaultParam = datas || {};
        $("#roleName", form).select2({width: "resolve", placeholder: "称谓", allowClear: true, data: roleNameArray});
        $("#positionId", form).select2({width: "resolve", placeholder: "职位", allowClear: true, data: positionArray});
        form.find("input").each(function () {
            fieldSetValue(this);
        });
        for (var att in defaultParam) {
            if (att === "roleName") {
                $("#roleName", form).select2("val", defaultParam.roleName);
            } else {
                if (att === "positionId") {
                    $("#positionId", form).select2("val", defaultParam.positionId);
                } else {
                    fieldSetValue(selector + " #" + att, defaultParam[att]);
                }
            }
        }
        var errorInfo = $(".alert-danger", form);
        errorInfo.hide();
        var successInfo = $(".alert-success", form);
         var resetVaildate =form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: false,
            ignore: "",
            rules: {roles: {minlength: 2, required: true}, sortId: {number: true}},
            messages: {
                roles: {minlength: jQuery.validator.format("职位名称不能小于 {0} 个字符"), required: "职位名称必须填写。"},
                sortId: {number: "只能输入数字。"}
            },
            invalidHandler: function (event, validator) {
                successInfo.hide();
                errorInfo.show();
                Metronic.scrollTo(errorInfo, -200);
            },
            highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
            success: function (label, element) {
                var icon = $(element).parent(".input-icon").children("i");
                $(element).closest(".form-group").removeClass("has-error").addClass("has-success");
                icon.removeClass("fa-warning").addClass("fa-check");
            },
            submitHandler: function (form) {
                var roleId = $('#datatable_36 tbody').find(".selected").children().last().text();
                var sendType = getActionsType(selector);
                var dataUrl = "";
                if (sendType === "updatesave") {
                    dataUrl = $(form).serialize() + "&type=" + getActionsType(selector) + "&dept_id=0&roleId=" + roleId;
                } else {
                    dataUrl = $(form).serialize() + "&type=" + getActionsType(selector) + "&dept_id=0";
                }
                $.ajax({
                    type: "post", data: dataUrl, url: "/bin/user/rolecreate.jcp", success: function (data, status) {
                        $(selector).modal("hide");
                        var dt = $(moduleId).DataTable();
                        dt.ajax.reload();
                        if (sendType === "updatesave") {
                            toastr.success("修改职位成功");
                        } else {
                            toastr.success("创建职位成功");
                        }
                    }, error: function (result) {
                        $(".alert-danger", $(form)).show().find("span").html(result && result.message || "新建职位失败，请联系管理员!");
                    }
                });
            }
        });
             $("a[href='#tools_36_edit'],a[href='#tools_36_create']").on("click", function () {
               resetVaildate.resetForm();
               $("#textarea",form).val("");
        });
    }

    function deleteList(conf) {
         var selectedTr=$('#datatable_36 tbody').find(".selected"),
            params={},
             roleIdArr=[];
            for(var i=0;i<selectedTr.length;i++){
                var  roleId = $(selectedTr).eq(i).children().last().text();
                     roleIdArr.push(roleId);
            }
            params["dept_id"]="0";
            params["type"]='delete';
            params["roleId"]=roleIdArr;
        $.ajax({
            type: "post",
            url: "/bin/user/rolecreate.jcp",
            data:params,
            traditional:true,
            success: function (data) {
                var res=eval('('+data+')');
                if(res.success){
                      toastr.success("数据删除成功");
                      var dt = $("#datatable_" + conf.id).DataTable();
                      dt.ajax.reload();
                }else{
                    bootbox.alert("<h4>"+res.message+"</h4>");
                }
            }
        });
    }

    function getData() {
        var listIndex =  $('#datatable_36 tbody').find(".selected").children().last().text();
        $.ajax({
            type: "get",
            url: "/bin/user/rolecreate.jcp?dept_id=0&type=edit &roleId=" + listIndex,
            dataType: "json",
            success: function (data) {
                var roleData = data[0];
                initSelect(roleData);
                loadData(roleData);
            }
        });
    }

    function loadData(jsonStr) {
        var obj = jsonStr;
        var key, value, tagName, type, arr;
        for (x in obj) {
            key = x;
            value = obj[x];
            $("[name='" + key + "'],[name='" + key + "[]']").each(function () {
                tagName = $(this)[0].tagName;
                type = $(this).attr("type");
                if (tagName === "INPUT") {
                    if (type === "radio") {
                        $(this).attr("checked", $(this).val() === value);
                    } else {
                        if (type === "checkbox") {
                            arr = value.split(",");
                            for (var i = 0; i < arr.length; i++) {
                                if ($(this).val() === arr[i]) {
                                    $(this).attr("checked", true);
                                    break;
                                }
                            }
                        } else {
                            $(this).val(value);
                        }
                    }
                }else {
                    $(this).val(value);
                }
            });
        }
    }

    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/jstree/dist/jstree.min.js");
            PageSystem.loadJS("/newhome/PageDatatable.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-select/bootstrap-select.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");
            var table = new PageDatatable(conf.id);
            datatableHead = table.initHead({
                title: "职位管理",
                tools: [{name: "新建职位", id: getToolsId(conf.id, "create")}, {
                    name: "修改职位",
                    icon: "edit",
                    id: getToolsId(conf.id, "edit")
                }, {name: "删除职位", icon: "trash", id: getToolsId(conf.id, "delete")}],
                columns: ["职位名称", "称谓", "级别", "注册日期", "序号"],
                portletCss: "box "+ portletColor,
                portletTitleCss: "suitcase"
            });
            appendHtml(panks(conf), function () {
                table.initDatatable({
                    columns: [{data: "职位名称"}, {data: "称谓"}, {data: "级别"}, {data: "注册日期"}, {data: "序号"}],
                    pageLength: 10,
                    ordering: false,
                    pagingType: "bootstrap_full_number",
                    ajax: function (data, callback, settings) {
                        $.ajax({
                            type: "GET",
                            url: "/bin/user/rolelist.jcp?dept_id=0&start=" + data.start + "&limit=" + data.length,
                            dataType: "json",
                            success: function (result) {
                                var returnData = {};
                                var arr=result.dataItem;
                                returnData.draw = 0;
                                returnData.recordsTotal = result.totalCount;
                                returnData.recordsFiltered = result.totalCount;
                                returnData.data = result.dataItem;
                                callback(returnData);
                                table.reUniform();
                               
                            }
                        });
                    }
                });
                $("a.btn", "#module_" + conf.id + " .profile-content").on("click", function (e) {
                    e.preventDefault();
                    var tag = $(this).attr("href"), wapper = $("#datatable_" + conf.id + "_wrapper"),tableId="#datatable_" + conf.id;
                    if (tag === "#" + getToolsId(conf.id, "delete")) {
                        var deleteRows = table.selects("职位名称",tableId);
                        if (deleteRows.length>=1) {
                            $(tag).modal("show");
                            initRoleForm(tag, {}, "#datatable_" + conf.id);
                        } else {
                            Metronic.alert({
                                type: "danger",
                                icon: "warning",
                                message:"请选择需要删除的数据",
                                container: wapper,
                                place: "prepend"
                            });
                        }
                    } else {
                        if (tag === "#" + getToolsId(conf.id + "_edit")) {
                            var rows = table.selects("职位名称",tableId);
                            if (rows.length === 1) {
                                $(tag).modal("show");
                                initRoleForm(tag, {}, "#datatable_" + conf.id);
                                getData();
                            } else {
                                Metronic.alert({
                                    type: "danger",
                                    icon: "warning",
                                    message: (!rows || !rows.length) ? "请选择需要修改的数据" : "只能选择一条数据",
                                    container: wapper,
                                    place: "prepend"
                                });
                            }
                        } else {
                            if (tag === "#" + getToolsId(conf.id + "_create")) {
                                $(tag).modal("show");
                                initRoleForm(tag, {
                                    roleName: roleNameArray[0].id,
                                    positionId: positionArray[0].id
                                }, "#datatable_" + conf.id);
                            }
                        }
                    }
                    return false;
                });
                $(".select-box").hide();
                  $("#deleteRoleBtn").on("click", function () {
                                var tag="#" + getToolsId(conf.id, "delete");
                                $(tag).modal("hide");
                                deleteList(conf);
                            });
            });
        }
    };
})();