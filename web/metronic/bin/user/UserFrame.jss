(function () {
    var datatableHead = "", numberCounts = 1, currentSelectDeptId = "", moveId = "", portletColor = PageSystem.getColor();
    paramRoles = [
        {id: "21212", text: "办公厅用户"},
        {id: "20661", text: "省长"},
        {id: "21007", text: "厅级干部"},
        {id: "21197", text: "秘书长"},
        {id: "21175", text: "副省长"}];
        paramUsertypes = [
            {text: "架构师", id: 2},
            {text: "开发人员", id: 5},
            {text: "定制人员", id: 10},
            {text: "部门管理员", id: 20},
            {text: "普通用户", id: 100}];

    var userPageHtml = '<div class="alert alert-danger display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '    <span>您的输入信息有误，请检查并修改。</span>\n' +
        '</div>\n' +
        '\n' +
        '<div class="alert alert-success display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '    您输入的信息完全正确。\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="userName" id="userName" placeholder="用户名">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="realName" id="realName" placeholder="真实姓名">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input class="form-control" id="roleId" name="roleId" type="hidden">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"><input class="form-control" id="userType" name="userType" type="hidden"></div>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="form-group">\n' +
        '            <div class="controls input-icon right">\n' +
        '                <i class="fa"></i>\n' +
        '                <input type="text" class="form-control" name="email" placeholder="电子邮件" id="email">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"><input type="text" class="form-control" name="celler" placeholder="手机"></div>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"><input type="text" class="form-control" name="phone" placeholder="办公电话"></div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"><input type="text" class="form-control" name="phoneHome" placeholder="家庭电话"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="fileinput fileinput-new" data-provides="fileinput">\n' +
        '            <div class="fileinput-preview thumbnail" data-trigger="fileinput"\n' +
        '                 style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' +
        '                 <img class="user-icon" src="" alt="" style="width:100%;height:100%">\n' +
        '            </div>\n' +
        '             <span class="btn green fileinput-button">\n' +
        '                 <i class="fa fa-plus"></i>\n' +
        '                 <span>选择图片</span>\n' +
        '                 <input type="file"  data-type="photo" name="file"> \n' +
        '                 <input type="hidden" id="photo" name="photo"> \n' +
        '                 <input type="hidden" value="" name="photo_text" id="photo_text">\n' +
        '             </span>\n' +
        '             <a href="javascript:;" class="btn green fileinput-exists usericon-cancel-btn" data-dismiss="fileinput">取消</a></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="password" class="form-control" id="passwd" name="passwd" placeholder="密码"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="password" class="form-control" id="confirm_passwd" name="confirm_passwd" placeholder="再次输入密码">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <div class="form-group form-md-checkboxes">\n' +
        '                    <div class="md-checkbox-inline">\n' +
        '                        <div class="md-checkbox has-success">\n' +
        '                            <input type="checkbox" id="inActive" name="inActive" class="md-check" value="y"> \n' +
        '                            <label for="inActive">激活\n' +
        '                                <span class="inc"></span>\n' +
        '                                <span class="check"></span>\n' +
        '                                <span class="box"></span>\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <div class="form-group form-md-checkboxes">\n' +
        '                    <div class="md-checkbox-inline">\n' +
        '                        <div class="md-checkbox has-success">\n' +
        '                            <input type="checkbox" id="isCreateMaster" name="isMaster" class="md-check" value="y"> \n' +
        '                             <label for="isCreateMaster">是否部门业务主管\n' +
        '                                 <span class="inc"></span>\n' +
        '                                 <span class="check"></span>\n' +
        '                                 <span class="box"></span>\n' +
        '                             </label>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-4">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="sortId" placeholder="优先顺序">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-12">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <textarea class="form-control" id="textarea" rows="3" placeholder="职责说明" name="duty"></textarea>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    var updataPage = '<div class="alert alert-danger display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '     <span>您的输入信息有误，请检查并修改</span>\n' +
        '</div>\n' +
        '<div class="alert alert-success display-hide" style="display: none;">\n' +
        '    <button class="close" data-close="alert"></button>\n' +
        '     您输入的信息完全正确。\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="userName" id="userName" placeholder="用户名">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="realName" id="realName" placeholder="真实姓名">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input class="form-control" id="roleId" name="roleId" type="hidden">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input class="form-control" id="userType" name="userType" type="hidden">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls input-icon right">\n' +
        '                <i class="fa"></i>\n' +
        '                <input type="text" class="form-control" name="email" placeholder="电子邮件" id="email">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="celler" placeholder="手机">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"> \n' +
        '                <input type="text" class="form-control" name="phone" placeholder="办公电话">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"> \n' +
        '                <input type="text" class="form-control" name="phoneHome" placeholder="家庭电话">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="fileinput fileinput-new" data-provides="fileinput">\n' +
        '            <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' +
        '                 <img class="user-icon" src="" alt="" style="width:100%;height:100%">\n' +
        '            </div>\n' +
        '             <span class="btn green fileinput-button">\n' +
        '                 <i class="fa fa-plus"></i> \n' +
        '                 <span>选择图片</span> \n' +
        '                 <input type="file" data-type="photo" name="file">\n' +
        '                 <input type="hidden" value="" name="photo" id="photo">\n' +
        '                 <input type="hidden" value="" name="photo_text" id="photo_text">\n' +
        '             </span>\n' +
        '             <a href="javascript:;" class="btn green fileinput-exists usericon-cancel-btn" data-dismiss="fileinput">取消</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <div class="form-group form-md-checkboxes">\n' +
        '                    <div class="md-checkbox-inline">\n' +
        '                        <div class="md-checkbox has-success"> \n' +
        '                            <input type="checkbox" id="isUpdatainActive" name="inActive" class="md-check" value="y">\n' +
        '                             <label for="isUpdatainActive">激活\n' +
        '                                 <span class="inc"></span> \n' +
        '                                 <span class="check"></span>\n' +
        '                                 <span class="box"></span> \n' +
        '                             </label>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <div class="form-group form-md-checkboxes">\n' +
        '                    <div class="md-checkbox-inline">\n' +
        '                        <div class="md-checkbox has-success">\n' +
        '                            <input type="checkbox" id="isUpdataMaster" name="isMaster" class="md-check" value="y">\n' +
        '                             <label for="isUpdataMaster">是否部门业务主管 \n' +
        '                                 <span class="inc"></span>\n' +
        '                                 <span class="check"></span>\n' +
        '                                 <span class="box"></span>\n' +
        '                             </label>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-4">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls">\n' +
        '                <input type="text" class="form-control" name="sortId" placeholder="优先顺序">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="row">\n' +
        '    <div class="col-md-12">\n' +
        '        <div class="form-group">\n' +
        '            <div class="controls"> \n' +
        '                <textarea class="form-control" id="textarea" rows="3" placeholder="职责说明" name="duty"></textarea>\n' +
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
            '                <div class="caption">\n' +
            '                    <i class="fa fa-user"></i>\n' +
            '                    用户管理\n' +
            '                </div>\n' +
            '                <div class="tools">\n' +
            '                    <a href="" class="fullscreen" data-original-title="" title=""></a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksLeft(conf) + panksRight() +' </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' + panksToolsPage(conf, "create", "新建用户") + panksToolsPage(conf, "edit", "修改用户") + deleteModal(conf, "delete") + panksToolsPage(conf, "move", "调动用户") + passwordModal(conf, "reset", "重置密码");
    }

    function panksToolsPage(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '\n' +
            '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">\n' +
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '         <h4 class="modal-title">' + name + '</h4></div>\n' +
            '    <form action="#" class="horizontal-form" novalidate="novalidate">\n' +
            '        <div class="modal-body">' + toolsPageBody(type, conf) + '</div>\n' +
            '        <div class="modal-footer">\n' +
            '            <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '            <button class="btn green-meadow" type="submit">保存</button>\n' +
            '        </div>\n' +
            '    </form>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>'
    }

    function toolsPageBody(type, conf) {
        if (type === "move") {
            return '<div class="row">\n' +
                '    <div id="moveTree_' + conf.id + '" class="tree-demo col-md-offset-2" style="margin-bottom:20px"></div>\n' +
                '    <div id="moveSelect" class=" col-md-5" style="padding:0;margin-left:80px"></div>\n' +
                '</div>'
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
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade bs-modal-sm in" tabindex="-1">\n' +
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '    </div>\n' +
            '    <div class="modal-body"><h4>确定删除？</h4></div>\n' +
            '    <div class="modal-footer">\n' +
            '        <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '        <button class="btn green-meadow" id="deleteUserBtn">确定</button>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>'
    }

    function passwordModal(conf, type, name) {
        if (!conf || !type) {
            return "";
        }
        name = name || conf.title;
        return '<div id="' + getToolsId(conf.id, type) + '" class="modal fade" tabindex="-1">\n' +
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '         <h4 class="modal-title">' + name + '</h4></div>\n' +
            '    <div class="modal-body">\n' +
            '        <form id="resetForm" class="form-horizontal" role="form">\n' +
            '            <div class="form-body">\n' +
            '                <div class="form-group"> \n' +
            '                    <label for="passwd" class="col-md-5 control-label">请输入新的密码：</label>\n' +
            '                    <div class="col-md-7">\n' +
            '                        <input type="password" id="passwd" name="passwd" class="form-control input-inline input-medium">\n' +
            '                    </div>\n' +
            '                    \n' +
            '                </div>\n' +
            '                \n' +
            '                <div class="form-group"> \n' +
            '                    <label for="confirm_passwd" class="col-md-5 control-label">请再次输入新的密码：</label>\n' +
            '                    <div class="col-md-7"> \n' +
            '                        <input type="password" id="confirm_passwd" name="confirm_passwd" class="form-control input-inline input-medium">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="modal-footer">\n' +
            '                    <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '                    <button class="btn green-meadow" id="resetPasswd">确定</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </form>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>'
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">\n' +
            '    <div class="portlet ' + portletColor + ' box">\n' +
            '        <div class="portlet-title">\n' +
            '            <div class="caption"><i class="fa fa-sitemap"></i>组织结构导航</div>\n' +
            '            <div class="tools"><a href="javascript:;" class="collapse"> </a></div>\n' +
            '        </div>\n' +
            '        <div class="portlet-body">\n' +
            '            <div id="tree_' + conf.id + '" class="tree-demo"></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
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

    function getData(id , selector) {
        var listIndex =$('#datatable_35 input[type="checkbox"]:checked').parents("tr").children().last().text();
        $.ajax({
            type: "get",
            url: "/bin/user/usercreate.jcp?dept_id=" + id + "&type=edit&userId=" + listIndex,
            dataType: "json",
            success: function (data) {
                var res = data[0];
                loadData(res);
                initSelect(res);
                setImageSrc(res.photo || "" , selector);
                $("#moveSelect").select2("val", res.roleId);
            }
        });
    }
    
    function setImageSrc(path , selector){
        if(path){
            var src = "" , name = "";
            if(PageSystem.isObject(path))
                src = "/lib/upload/download.jcp?fileid=" + path.id + "&r=" + Math.random() , name = path.value;
            else
                src = name = path;
            $(".user-icon" , selector).attr("src", src);
            $("#photo_text" , selector).val(name);
        }
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
            url: "/bin/user/usercreate.jcp?dept_id=" + currentSelectDeptId + "&type=delete&userId=" + userId,
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
                }, {name: "删除用户", icon: "trash", id: getToolsId(conf.id, "delete")}, {
                    name: "调动",
                    icon: "exchange",
                    id: getToolsId(conf.id, "move")
                }, {name: "重置密码",icon:"key", id: getToolsId(conf.id, "reset")}],
                columns: ["姓名", "部门", "角色", "登录名", "电话", "注册时间", "用户ID"],
                portletCss: "box " + portletColor,
                portletTitleCss: "user",
                id: conf.id
            });
            appendHtml(panks(conf), function () {
                $("#tree_" + conf.id).jstree({
                    core: {
                        themes: {responsive: false},
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
                    plugins: ["state", "types"]
                }).on("changed.jstree", function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        currentSelectDeptId = data.selected[0];
                        var dt = $("#datatable_" + conf.id).DataTable();
                        dt.ajax.reload();
                    }
                });
                $("#moveTree_" + conf.id).jstree({
                    core: {
                        themes: {responsive: false},
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
                    plugins: ["state", "types"]
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
                    columns: [{
                        render: function () {
                            return '<input type="checkbox" class="checkboxes" value="1">';
                        }
                    }, {data: "real_name", orderable: true}, {data: "dept_name", orderable: false}, {
                        data: "roles",
                        orderable: true
                    }, {data: "user_name", orderable: true}, {data: "phone", orderable: false}, {
                        data: "entry_time",
                        orderable: false
                    }, {data: "index", orderable: false, searchable: false}],
                    pageLength: 10,
                    pagingType: "bootstrap_full_number",
                    order: [[1, "desc"]],
                    ajax: function (data, callback) {
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
                                getData(currentSelectDeptId , tag);
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
                $("input[type='file']").fileupload({
                    type: "post",
                    url: "/bin/upload/upload.jcp",
                    sequentialUploads: true,
                    multipart: true,
                    formData: {file: ""},
                    dataType: "json",
                    done: function (e, data) {
                        switch (e.target.getAttribute("data-type")) {
                            case"photo":
                                $(".user-icon" , $(e.target).parent().parent()).attr("src", data.result.path);
                                $(e.target).siblings("#photo").val(data.result.path);
                                $(e.target).siblings("#photo_text").val(data.result.path);
                                break;
                        }
                    }
                });
                 $(".usericon-cancel-btn").on("click",function(e){
                     e.preventDefault();
                     var $this=e.target;
                     $($this).siblings("div").children("img").attr("src","");
                     $($this).siblings("span").children("#photo_text").val("");
                });
            });
        }
    };
})();