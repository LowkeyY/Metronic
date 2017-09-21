(function () {
    var datatableHead = "", numberCounts = 1, currentSelectDeptId = "";
    positionArray = [{"text": "副省级", "id": "26"}, {"text": "正省级", "id": "25"}, {
        "text": "正厅级",
        "id": "50"
    }, {"text": "厅级", "id": "60"}, {"text": "正处级", "id": "70"}, {"text": "副处级", "id": "80"}, {
        "text": "科员",
        "id": "100"
    }], roleNameArray = [{"text": "办公厅用户", "id": "8"}, {"text": "省长", "id": "1"}, {
        "text": "副省长",
        "id": "2"
    }, {"text": "秘书长", "id": "3"}, {"text": "副秘书长", "id": "4"}, {"text": "厅级领导", "id": "5"}, {
        "text": "一般干部",
        "id": "6"
    }, {"text": "处长", "id": "7"}];
    var userPageHtml = '                <div class="alert alert-danger display-hide" style="display: none;">                    <button class="close" data-close="alert"></button>                    <span>您的输入信息有误，请检查并修改。</span>                </div>                <div class="alert alert-success display-hide" style="display: none;">                    <button class="close" data-close="alert"></button>                    您输入的信息完全正确。                </div>                <div class="row">                    <div class="col-md-6">                        <div class="form-group">                            <div class="controls">                                <input type="text" class="form-control" name="roles" placeholder="职位名称">                            </div>                        </div>                    </div>                </div>                <div class="row">                    <div class="col-md-6">                        <div class="form-group">                            <div class="controls">                                称谓:<input class="form-control" id="roleName" name="roleName" type="hidden" placeholder="选择或输入称谓">          </div>        </div>                        <div class="form-group">                            <div class="controls">                                级别:<input class="form-control" id="positionId" name="positionId" type="hidden" placeholder="选择或输入职位">                            </div>                        </div>                    </div>                </div>                <div class="row">                    <div class="col-md-4">                        <div class="form-group">                            <div class="controls">                                <input type="text" class="form-control" name="sortId" placeholder="优先顺序">                            </div>                        </div>                    </div>                </div>                <div class="row">                    <div class="col-md-12">                        <div class="form-group">                            <div class="controls">                                <textarea class="form-control" id="textarea" rows="3" placeholder="职责说明" name="duty"></textarea>                            </div>                        </div>                    </div>                </div>';

    function getToolsId(id, type) {
        return "tools_" + (id ? id : numberCounts++) + (type ? "_" + type : "");
    }

    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">    <div class="col-md-12">	<div class="portlet">	    <div class="portlet-title">		<div class="caption">		    <i class="fa fa-user"></i>职位管理		</div>		<div class="tools">                   <a href="" class="fullscreen" data-original-title="" title="">                   </a>		</div>	    </div>	    <div class="portlet-body">' + panksRight() + "           </div>       </div>   </div></div>" + panksToolsPage(conf, "create", "新建职位") + panksToolsPage(conf, "edit", "修改职位") + deleteModal(conf, "delete");
    }

    function panksToolsPage(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>        <h4 class="modal-title">' + name + '</h4>    </div>    <form action="#" class="horizontal-form" novalidate="novalidate">       <div class="modal-body">' + toolsPageBody(type) + '       </div>       <div class="modal-footer">           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>           <button class="btn green-meadow" type="submit">保存</button>       </div>   </form></div>';
    }

    function deleteModal(conf, type) {
        if (!conf || !type) {
            return "";
        }
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>          </div>          <div class="modal-body"><h4>确定删除？</h4></div>       <div class="modal-footer">           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>   <button class="btn green-meadow" id="deleteBtn">确定</button> </div> </div>';
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
        var successInfo = $(".alert-success", form);
        form.validate({
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
                var roleId = $('#datatable_36 input[type="checkbox"]:checked').parents("tr").children().last().text();
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
    }

    function deleteList() {
        var roleId = $('#datatable_36 input[type="checkbox"]:checked').parents("tr").children().last().text();
        $.ajax({
            type: "post",
            url: "/bin/user/rolecreate.jcp?dept_id=0" + "&type=delete" + "&roleId=" + roleId,
            success: function () {
                toastr.success("删除成功");
            }
        });
    }

    function getData() {
        var listIndex = $('#datatable_36 input[type="checkbox"]:checked').parents("tr").children().last().text();
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
                if (tagName == "INPUT") {
                    if (type == "radio") {
                        $(this).attr("checked", $(this).val() == value);
                    } else {
                        if (type == "checkbox") {
                            arr = value.split(",");
                            for (var i = 0; i < arr.length; i++) {
                                if ($(this).val() == arr[i]) {
                                    $(this).attr("checked", true);
                                    break;
                                }
                            }
                        } else {
                            $(this).val(value);
                        }
                    }
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
                }, {name: "删除职位", icon: "times", id: getToolsId(conf.id, "delete")}],
                columns: ["职位名称", "称谓", "级别", "注册日期", "序号"],
                portletCss: "box red-pink",
                portletTitleCss: "user"
            });
            appendHtml(panks(conf), function () {
                table.initDatatable({
                    columns: [{
                        render: function () {
                            return '<input type="checkbox" class="checkboxes" value="1">';
                        }
                    }, {data: "职位名称", orderable: true}, {data: "称谓", orderable: false}, {
                        data: "级别",
                        orderable: true
                    }, {data: "注册日期", orderable: true}, {data: "序号", orderable: true}],
                    pageLength: 10,
                    pagingType: "bootstrap_full_number",
                    columnDefs: [{targets: 5, searchable: false, orderable: false, visible: true,}],
                    order: [[1, "desc"]],
                    ajax: function (data, callback, settings) {
                        $.ajax({
                            type: "GET",
                            url: "/bin/user/rolelist.jcp?dept_id=0&start=" + data.start + "&limit=" + data.length,
                            dataType: "json",
                            success: function (result) {
                                var returnData = {};
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
                    var tag = $(this).attr("href"), wapper = $("#datatable_" + conf.id + "_wrapper");
                    if (tag === "#" + getToolsId(conf.id, "delete")) {
                        var deleteRows = table.selects("职位名称");
                        if (deleteRows.length === 1) {
                            $(tag).modal("show");
                            initRoleForm(tag, {}, "#datatable_" + conf.id);
                            $("#deleteBtn").on("click", function () {
                                $(tag).modal("hide");
                                deleteList(currentSelectDeptId);
                                var dt = $("#datatable_" + conf.id).DataTable();
                                dt.ajax.reload();
                            });
                        } else {
                            Metronic.alert({
                                type: "danger",
                                icon: "warning",
                                message: (!deleteRows || !deleteRows.length) ? "请选择需要删除的数据" : "只能选择一条数据",
                                container: wapper,
                                place: "prepend"
                            });
                        }
                    } else {
                        if (tag === "#" + getToolsId(conf.id + "_edit")) {
                            var rows = table.selects("职位名称");
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
                                    positionId: positionArray[0].id,
                                }, "#datatable_" + conf.id);
                            }
                        }
                    }
                    return false;
                });
                $(".select-box").hide();
            });
        }
    };
})();