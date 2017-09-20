(function () {
    var datatableHead = "", numberCounts = 1, currentSelectDeptId = "", moveId = "",
        paramRoles = [{"id": "21212", "text": "办公厅用户"}, {"id": "20661", "text": "省长"}, {
            "id": "21007",
            "text": "厅级干部"
        }, {"id": "21197", "text": "秘书长"}, {"id": "21175", "text": "副省长"}],
        paramUsertypes = [{"text": "架构师", "id": 2}, {"text": "开发人员", "id": 5}, {
            "text": "定制人员",
            "id": 10
        }, {"text": "部门管理员", "id": 20}, {"text": "普通用户", "id": 100}];
    var userPageHtml = '<div class="alert alert-danger display-hide" style="display: none;">' + '    <button class="close" data-close="alert"></button>' + "    <span>您的输入信息有误，请检查并修改。</span></div>" + '<div class="alert alert-success display-hide" style="display: none;">' + '    <button class="close" data-close="alert"></button>' + "    您输入的信息完全正确。" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="userName" id="userName"' + '                                         placeholder="用户名"></div>' + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="realName" id="realName"' + '                                         placeholder="真实姓名"></div>' + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input class="form-control" id="roleId" name="roleId" type="hidden"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input class="form-control" id="userType" name="userType" type="hidden"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls input-icon right"><i class="fa"></i> <input type="text" class="form-control"' + '                            name="email" placeholder="电子邮件" id="email">' + "            </div>" + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="celler" placeholder="手机"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="phone" placeholder="办公电话"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="phoneHome" placeholder="家庭电话"></div>' + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="fileinput fileinput-new" data-provides="fileinput">' + '            <div class="fileinput-preview thumbnail" data-trigger="fileinput"' + '                 style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">' + '                <img id="e" src="" alt="" style="width:100%;height:100%"></div>' + '            <span class="btn red fileinput-button">                    <i class="fa fa-plus"></i>   <span>选择图片</span>   <input' + '                    type="file" data-type="default_icon_url" name="file">    <input' + '                    type="hidden" value="" name="default_icon_url" id="">                </span> <a href="javascript:;"' + '  class="btn red fileinput-exists"' + '  data-dismiss="fileinput">' + "            取消 </a></div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="password" class="form-control" id="passwd" name="passwd"' + '                                         placeholder="密码"></div>' + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="password" class="form-control" id="confirm_passwd" name="confirm_passwd"' + '                                         placeholder="再次输入密码"></div>' + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls">' + '                <div class="form-group form-md-checkboxes">' + '                    <div class="md-checkbox-inline">' + '                        <div class="md-checkbox has-success"><input type="checkbox" id="inActive" name="inActive" class="md-check" value="y" > <label' + '   for="inActive">激活 <span class="inc"></span> <span class="check"></span> <span class="box"></span>' + "                        </label></div>" + "                    </div>" + "                </div>" + "            </div>" + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls">' + '                <div class="form-group form-md-checkboxes">' + '                    <div class="md-checkbox-inline">' + '                        <div class="md-checkbox has-success"><input type="checkbox" id="isCreateMaster" name="isMaster"  class="md-check" value="y"> <label for="isCreateMaster">是否部门业务主管' + '    <span class="inc"></span> <span class="check"></span> <span class="box"></span> </label></div>' + "                    </div>" + "                </div>" + "            </div>" + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-4">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="sortId" placeholder="优先顺序"></div>' + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-12">' + '        <div class="form-group">' + '            <div class="controls"><textarea class="form-control" id="textarea" rows="3" placeholder="职责说明"' + '                                            name="duty"></textarea></div>' + "        </div>" + "    </div>" + "</div>";
    var updataPage = '<div class="alert alert-danger display-hide" style="display: none;">' + '    <button class="close" data-close="alert"></button>' + "    <span>您的输入信息有误，请检查并修改。</span></div>" + '<div class="alert alert-success display-hide" style="display: none;">' + '    <button class="close" data-close="alert"></button>' + "    您输入的信息完全正确。" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="userName" id="userName"' + '                                         placeholder="用户名"></div>' + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="realName" id="realName"' + '                                         placeholder="真实姓名"></div>' + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls"><input class="form-control" id="roleId" name="roleId" type="hidden"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input class="form-control" id="userType" name="userType" type="hidden"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls input-icon right"><i class="fa"></i> <input type="text" class="form-control"' + '                            name="email" placeholder="电子邮件" id="email">' + "            </div>" + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="celler" placeholder="手机"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="phone" placeholder="办公电话"></div>' + "        </div>" + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="phoneHome" placeholder="家庭电话"></div>' + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="fileinput fileinput-new" data-provides="fileinput">' + '            <div class="fileinput-preview thumbnail" data-trigger="fileinput"' + '                 style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">' + '                <img id="e" src="" alt="" style="width:100%;height:100%"></div>' + '            <span class="btn red fileinput-button">                    <i class="fa fa-plus"></i>   <span>选择图片</span> <input' + '  type="file" data-type="default_icon_url" name="file">    <input' + '  type="hidden" value="" name="default_icon_url" id="">                </span> <a href="javascript:;"' + '            class="btn red fileinput-exists"' + '        data-dismiss="fileinput">' + "            取消 </a></div>" + "    </div>" + "</div>" + '       <div class="row">' + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls">' + '                <div class="form-group form-md-checkboxes">' + '                    <div class="md-checkbox-inline">' + '                        <div class="md-checkbox has-success"><input type="checkbox" id="inActive" name="inActive" class="md-check" value="y" > <label' + '                                for="inActive">激活 <span></span> <span class="check"></span> <span class="box"></span>' + "                        </label></div>" + "                    </div>" + "                </div>" + "            </div>" + "        </div>" + "    </div>" + '    <div class="col-md-6">' + '        <div class="form-group">' + '            <div class="controls">' + '                <div class="form-group form-md-checkboxes">' + '                    <div class="md-checkbox-inline">' + '                        <div class="md-checkbox has-success"><input type="checkbox" id="isUpdataMaster" name="isMaster" class="md-check" value="y" text="y"> <label for="isMaster">是否部门业务主管' + '                            <span></span> <span class="check"></span> <span class="box"></span> </label></div>' + "                    </div>" + "                </div>" + "            </div>" + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-4">' + '        <div class="form-group">' + '            <div class="controls"><input type="text" class="form-control" name="sortId" placeholder="优先顺序"></div>' + "        </div>" + "    </div>" + "</div>" + '<div class="row">' + '    <div class="col-md-12">' + '        <div class="form-group">' + '            <div class="controls"><textarea class="form-control" id="textarea" rows="3" placeholder="职责说明"' + '                                            name="duty"></textarea></div>' + "        </div>" + "    </div>" + "</div>";

    function getToolsId(id, type) {
        return "tools_" + (id ? id : numberCounts++) + (type ? "_" + type : "");
    }

    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">' + '    <div class="col-md-12">' + '	<div class="portlet">' + '	    <div class="portlet-title">' + '		<div class="caption">' + '		    <i class="fa fa-user"></i>用户管理' + "		</div>" + '		<div class="tools">' + '                   <a href="" class="fullscreen" data-original-title="" title="">' + "                   </a>" + "		</div>" + "	    </div>" + '	    <div class="portlet-body">' + panksLeft(conf) + panksRight() + "           </div>" + "       </div>" + "   </div>" + "</div>" + panksToolsPage(conf, "create", "新建用户") + panksToolsPage(conf, "edit", "修改用户") + deleteModal(conf, "delete") + panksToolsPage(conf, "move", "调动用户") + passwordModal(conf, "reset", "重置密码");
    }

    function panksToolsPage(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">' + '    <div class="modal-header">' + '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>' + '        <h4 class="modal-title">' + name + "</h4>" + "    </div>" + '    <form action="#" class="horizontal-form" novalidate="novalidate">' + '       <div class="modal-body">' + toolsPageBody(type, conf) + "       </div>" + '       <div class="modal-footer">' + '           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>' + '           <button class="btn green-meadow" type="submit">保存</button>' + "       </div>" + "   </form>" + "</div>";
    }

    function toolsPageBody(type, conf) {
        if (type === "move") {
            return '<div class="row"><div id="moveTree_' + conf.id + '" class="tree-demo col-md-offset-2" style="margin-bottom:20px"></div><div id="moveSelect" class=" col-md-5" style="padding:0;margin-left:80px"></div></div>';
        } else {
            if (type === "create") {
                return userPageHtml;
            } else {
                return updataPage;
            }
        }
    }

    function deleteModal(conf, type) {
        if (!conf || !type) {
            return "";
        }
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>          </div>          <div class="modal-body"><h4>确定删除？</h4></div>       <div class="modal-footer">           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>   <button class="btn green-meadow" id="deleteUserBtn">确定</button> </div> </div>';
    }

    function passwordModal(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h4 class="modal-title">' + name + '</h4> </div> <div class="modal-body"> <form id="resetForm" class="form-horizontal" role="form"> <div class="form-body"> <div class="form-group"> <label  for="passwd" class="col-md-5 control-label">请输入新的密码：</label> <div class="col-md-7"> <input type="password" id="passwd" name="passwd" class="form-control input-inline input-medium"> </div> </div> <div class="form-group"> <label for="confirm_passwd" class="col-md-5 control-label">请再次输入新的密码：</label> <div class="col-md-7"> <input type="password" id="confirm_passwd" name="confirm_passwd" class="form-control input-inline input-medium"> </div> </div><div class="modal-footer"> <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button> <button class="btn green-meadow" id="resetPasswd">确定</button> </div> </div> </form> </div> </div>';
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">' + '    <div class="portlet red-pink box">' + '        <div class="portlet-title">' + '            <div class="caption">' + '                <i class="fa fa-users"></i>组织结构导' + "            </div>" + '            <div class="tools">' + '                <a href="javascript:;" class="collapse">' + "                </a>" + "            </div>" + "        </div>" + '        <div class="portlet-body">' + '            <div id="tree_' + conf.id + '" class="tree-demo">' + "            </div>" + "        </div>" + "    </div>" + "</div>";
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
                } else {
                    if (tag.endsWith("_move")) {
                        type = "moveTo";
                    } else {
                        if (tag.endsWith("_reset")) {
                            type = "updatePassword";
                        }
                    }
                }
            }
        }
        return type;
    }

    function initSelect(datas) {
        var form = $("form"), defaultParam = datas || {};
        $("#roleId", form).select2({width: "resolve", placeholder: "职位", allowClear: true, data: paramRoles});
        $("#userType", form).select2({width: "resolve", placeholder: "用户类别", allowClear: true, data: paramUsertypes});
        for (var att in defaultParam) {
            if (att === "roleName") {
                $("#roleName", form).select2("val", defaultParam.roleName);
            } else {
                if (att === "userType") {
                    $("#userType", form).select2("val", defaultParam.userType);
                }
            }
        }
    }

    function initUeserForm(selector, datas, moduleId) {
        var form = $("form", $(selector)), defaultParam = datas || {};
        $("#roleId", form).select2({width: "resolve", placeholder: "职位", allowClear: true, data: paramRoles});
        $("#userType", form).select2({width: "resolve", placeholder: "用户类别", allowClear: true, data: paramUsertypes});
        $("#moveSelect", form).select2({width: "resolve", placeholder: "职位", allowClear: true, data: paramRoles});
        form.find("input").each(function () {
            fieldSetValue(this);
        });
        for (var att in defaultParam) {
            if (att === "roleId") {
                $("#roleId", form).select2("val", defaultParam.roleId);
                $("#moveSelect").select2("val", defaultParam.roleId);
            } else {
                if (att === "userType") {
                    $("#userType", form).select2("val", defaultParam.userType);
                } else {
                    fieldSetValue(selector + " #" + att, defaultParam[att]);
                }
            }
        }
        var errorInfo = $(".alert-danger", form);
        var successInfo = $(".alert-success", form);
        var resetVaildate = form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: false,
            ignore: "",
            rules: {
                userName: {minlength: 2, required: true, isZipCode: true},
                realName: {required: true},
                email: {email: true},
                passwd: {required: true},
                confirm_passwd: {equalTo: selector + " #passwd"},
                sortId: {number: true}
            },
            messages: {
                userName: {minlength: jQuery.validator.format("登录名不能小于 {0} 个字符"), required: "登录名必须填写。"},
                realName: {required: "真实名称必须填写。"},
                email: {email: "必须输入邮件格式。"},
                passwd: {required: "登录密码必须填写."},
                confirm_passwd: {equalTo: "两次输入密码不一致。"},
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
                var userId = $('#datatable_35 input[type="checkbox"]:checked').parents("tr").children().last().text();
                console.log(userId);
                var sendType = getActionsType(selector);
                var roleId = $("#moveSelect").val();
                var dataUrl = "";
                if (sendType === "updatesave") {
                    dataUrl = $(form).serialize() + "&type=" + getActionsType(selector) + "&dept_id=" + currentSelectDeptId + "&userId=" + userId;
                } else {
                    if (sendType === "save") {
                        dataUrl = $(form).serialize() + "&type=" + getActionsType(selector) + "&dept_id=" + currentSelectDeptId;
                    } else {
                        dataUrl = {type: "moveTo", deptId: moveId, userId: userId, roleId: roleId};
                    }
                }
                $.ajax({
                    type: "POST", data: dataUrl, url: "/bin/user/usercreate.jcp", success: function (data, status) {
                        resetVaildate.resetForm();
                        var result = JSON.parse(data);
                        if (result.success) {
                            $(selector).modal("hide");
                            var dt = $(moduleId).DataTable();
                            dt.ajax.reload();
                            if (sendType === "updatesave") {
                                toastr.success("修改用户信息成功");
                            } else {
                                if (sendType === "save") {
                                    toastr.success("新建用户成功");
                                } else {
                                    toastr.success("用户调动成功");
                                }
                            }
                        } else {
                            $(".alert-danger", $(form)).show().find("span").html(result && result.message || "新建用户失败，请联系管理员。");
                        }
                    }, error: function (result) {
                        $(".alert-danger", $(form)).show().find("span").html(result && result.message || "新建用户失败，请联系管理员。");
                    }
                });
            }
        });
        $("a[href='#tools_35_edit'],a[href='#tools_35_create']").on("click", function () {
            resetVaildate.resetForm();
        });
    }

    function initReset(selector) {
        var form = $("#resetForm");
        var resetVaildate = form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: false,
            ignore: "",
            rules: {passwd: {required: true}, confirm_passwd: {equalTo: selector + " #passwd"}},
            messages: {passwd: {required: "用户密码必须填写."}, confirm_passwd: {equalTo: "两次输入密码不一致。"},},
            highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
            submitHandler: function (form) {
                var id = $('#datatable_35 input[type="checkbox"]:checked').parents("tr").children().last().text();
                var data = $(form).serialize() + "&type=" + getActionsType(selector) + "&userId=" + id;
                $.ajax({
                    type: "post", url: "/bin/user/usercreate.jcp", data: data, success: function () {
                        $(selector).modal("hide");
                        toastr.success("密码重置成功");
                    }
                });
            }
        });
        $("a[href='#tools_35_reset']").on("click", function () {
            $("#resetForm input").val("");
            resetVaildate.resetForm();
        });
    }

    function getData(id) {
        var listIndex = $('input[type="checkbox"]:checked').parents("tr").children().last().text();
        $.ajax({
            type: "get",
            url: "/bin/user/usercreate.jcp?dept_id=" + id + "&type=edit" + "&userId=" + listIndex,
            dataType: "json",
            success: function (data) {
                var res = data[0];
                loadData(res);
                initSelect(res);
                $("#moveSelect").select2("val", res.roleId);
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
                                if ($(this).val() == "y") {
                                    $(this).attr("checked", true);
                                    break;
                                }
                            }
                        } else {
                            $(this).val(value);
                        }
                    }
                } else {
                    $(this).val(value);
                }
            });
        }
    }

    function deleteList() {
        var userId = $('input[type="checkbox"]:checked').parents("tr").children().last().text();
        $.ajax({
            type: "post",
            url: "/bin/user/usercreate.jcp?dept_id=" + currentSelectDeptId + "&type=delete" + "&userId=" + userId,
            success: function () {
                toastr.success("删除成功");
            }
        });
    }

    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/jstree/dist/jstree.min.js");
            PageSystem.loadJS("/newhome/PageDatatable.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-select/bootstrap-select.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/additional-methods.js");
            var table = new PageDatatable(conf.id);
            datatableHead = table.initHead({
                title: "用户管理",
                tools: [{name: "新建用户", id: getToolsId(conf.id, "create")}, {
                    name: "修改用户",
                    icon: "edit",
                    id: getToolsId(conf.id, "edit")
                }, {name: "删除用户", icon: "times", id: getToolsId(conf.id, "delete")}, {
                    name: "调动",
                    icon: "edit",
                    id: getToolsId(conf.id, "move")
                }, {name: "重置密码", id: getToolsId(conf.id, "reset")}],
                columns: ["姓名", "部门", "角色", "登录名", "电话", "注册时间", "用户ID"],
                portletCss: "box red-pink",
                portletTitleCss: "user",
                id: conf.id
            });
            appendHtml(panks(conf), function () {
                $("#tree_" + conf.id).jstree({
                    "core": {
                        "themes": {"responsive": false},
                        "check_callback": true,
                        "data": {
                            "url": "/bin/user/_getOrg.jjs", "data": function (node) {
                                return {"parent": node.id};
                            }
                        }
                    },
                    "types": {
                        "default": {"icon": "fa fa-folder icon-state-warning icon-lg"},
                        "file": {"icon": "fa fa-file icon-state-warning icon-lg"}
                    },
                    "state": {"key": "demo3"},
                    "plugins": ["state", "types"]
                }).on("changed.jstree", function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        currentSelectDeptId = data.selected[0];
                        var dt = $("#datatable_" + conf.id).DataTable();
                        dt.ajax.reload();
                    }
                });
                $("#moveTree_" + conf.id).jstree({
                    "core": {
                        "themes": {"responsive": false},
                        "check_callback": true,
                        "data": {
                            "url": "/bin/user/_getOrg.jjs", "data": function (node) {
                                return {"parent": node.id};
                            }
                        }
                    },
                    "types": {
                        "default": {"icon": "fa fa-folder icon-state-warning icon-lg"},
                        "file": {"icon": "fa fa-file icon-state-warning icon-lg"}
                    },
                    "state": {"key": "demo3"},
                    "plugins": ["state", "types"]
                }).on("changed.jstree", function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        moveId = data.selected[0];
                    }
                }).on("loaded.jstree", function (e, data) {
                    var inst = data.instance;
                    var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
                    inst.select_node(obj);
                });
                table.initDatatable({
                    "columns": [{
                        "render": function () {
                            return '<input type="checkbox" class="checkboxes" value="1">';
                        }
                    }, {"data": "real_name", "orderable": true}, {"data": "dept_name", "orderable": false}, {
                        "data": "roles",
                        "orderable": true
                    }, {"data": "user_name", "orderable": true}, {"data": "phone", "orderable": false}, {
                        "data": "entry_time",
                        "orderable": false
                    }, {"data": "index", "orderable": false, "searchable": false}],
                    "pageLength": 10,
                    "pagingType": "bootstrap_full_number",
                    "order": [[1, "desc"]],
                    "ajax": function (data, callback) {
                        if (!currentSelectDeptId) {
                            return;
                        }
                        var param = {};
                        param.limit = data.length;
                        param.start = data.start;
                        param.page = (data.start / data.length) + 1;
                        param.dept_id = currentSelectDeptId;
                        $.ajax({
                            type: "GET",
                            url: "/bin/user/userlist.jcp",
                            cache: false,
                            data: param,
                            dataType: "json",
                            success: function (result) {
                                var returnData = {};
                                returnData.draw = 0;
                                returnData.recordsTotal = result.totalCount;
                                returnData.data = result.dataItem;
                                callback(returnData);
                                table.reUniform();
                            }
                        });
                        $("#searchBtn" + conf.id).on("click", function () {
                            var searchText = $("#searchText" + conf.id).val(),
                                searchType = $("#form_control_1" + conf.id).val();
                            var param = {};
                            param.dept_id = "99999";
                            param.org_id = "0";
                            param.query_type = searchType;
                            param.keyword = searchText;
                            $.ajax({
                                type: "GET",
                                url: "/bin/user/userlist.jcp",
                                cache: false,
                                data: param,
                                dataType: "json",
                                success: function (result) {
                                    var returnData = {};
                                    returnData.draw = 0;
                                    returnData.recordsTotal = result.totalCount;
                                    returnData.data = result.dataItem;
                                    callback(returnData);
                                    table.reUniform();
                                }
                            });
                        });
                    }
                });
                $("a.btn", "#module_" + conf.id + " .profile-content").on("click", function (e) {
                    e.preventDefault();
                    var tag = $(this).attr("href"), wapper = $("#datatable_" + conf.id + "_wrapper");
                    if (!currentSelectDeptId) {
                        Metronic.alert({
                            type: "danger",
                            icon: "warning",
                            message: "请选选择一个部门。",
                            container: wapper,
                            place: "prepend"
                        });
                        return false;
                    }
                    if (tag === "#" + getToolsId(conf.id, "delete")) {
                        var deleteRows = table.selects("real_name");
                        if (deleteRows.length === 1) {
                            $(tag).modal("show");
                            $("#deleteUserBtn").on("click", function () {
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
                            var rows = table.selects("real_name");
                            if (rows.length === 1) {
                                $(tag).modal("show");
                                initUeserForm(tag, {}, "#datatable_" + conf.id);
                                getData(currentSelectDeptId);
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
                                initUeserForm(tag, {
                                    roleId: paramRoles[0].id,
                                    userType: 100,
                                    inActive: "y"
                                }, "#datatable_" + conf.id);
                            } else {
                                if (tag === "#" + getToolsId(conf.id + "_move")) {
                                    var moveRows = table.selects("real_name");
                                    if (moveRows.length === 1) {
                                        $(tag).modal("show");
                                        initUeserForm(tag, {roleId: paramRoles[0].id}, "#datatable_" + conf.id);
                                        getData(currentSelectDeptId);
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
                                    if (tag === "#" + getToolsId(conf.id + "_reset")) {
                                        var passRows = table.selects("real_name");
                                        if (passRows.length === 1) {
                                            $(tag).modal("show");
                                            initReset(tag);
                                        } else {
                                            Metronic.alert({
                                                type: "danger",
                                                icon: "warning",
                                                message: (!rows || !rows.length) ? "请选择需要修改的数据" : "只能选择一条数据",
                                                container: wapper,
                                                place: "prepend"
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return false;
                });
            });
        }
    };
})();