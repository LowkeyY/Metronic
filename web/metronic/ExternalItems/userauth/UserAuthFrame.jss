(function () {
    var datatableHead = "", currentSelectDeptId = "", datas = [], portletColor = PageSystem.getColor();

    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">\n' +
            '    <div class="col-md-12">\n' +
            '        <div class="portlet">\n' +
            '            <div class="portlet-title">\n' +
            '                <div class="caption"><i class="fa fa-user"></i>用户权限</div>\n' +
            '                <div class="tools"><a href="javascript;" class="fullscreen" data-original-title="" title=""> </a></div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksLeft(conf) + panksRight() + '</div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">\n' +
            '    <div class="portlet '+portletColor+' box">\n' +
            '        <div class="portlet-title">\n' +
            '            <div class="caption"><i class="fa fa-users"></i>省政府办公厅</div>\n' +
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

    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/jstree/dist/jstree.min.js");
            PageSystem.loadJS("/newhome/PageDatatable.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-select/bootstrap-select.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");
            $.ajax({
                type: "get",
                url: "/ExternalItems/userauth/getMenuJson.jcp",
                dataType: "json",
                success: function (data) {
                    var arr = data.data;
                    var col = ["ID", "姓名", "部门"];
                    var item = [{
                        render: function () {
                            return '<input type="checkbox" class="checkboxes"  value="" >';
                        }
                    }, {data: "index", orderable: false}, {data: "real_name", orderable: true}, {
                        data: "dept_name",
                        orderable: false
                    }];
                    arr.map(function (i) {
                        col.push(i.text);
                        item.push({
                            render: function (data, type, row, meta) {
                                return '<input type="checkbox" class="check" ' + (row[i.id] === true ? "checked" : "") + ' value="' + i.id + '" >';
                            }, orderable: false
                        });
                    });
                    var table = new PageDatatable(conf.id);
                    datatableHead = table.initHead({
                        title: "用户权限",
                        tools: [{name: "保存", id: "authSave"}, {name: "还原", icon: "times", id: "return"}],
                        columns: col,
                        portletCss: "box "+portletColor,
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
                        table.initDatatable({
                            columns: item,
                            pageLength: 10,
                            pagingType: "bootstrap_full_number",
                            columnDefs: [{targets: [0], visible: false}],
                            order: [[1, "desc"]],
                            ajax: function (data, callback, settings) {
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
                                    url: "/ExternalItems/userauth/usermenulist.jcp",
                                    cache: false,
                                    data: param,
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
                                        url: "/ExternalItems/userauth/usermenulist.jcp",
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
                        $("a[href='#authSave']").on("click", function (e) {
                            e.preventDefault();
                            var tb = $("#datatable_b6c6e3bb-0aea-4e7a-a878-9d61fb27b7a0 tbody");
                            tb.find("tr").each(function (i) {
                                var arrs = [];
                                var obj = {};
                                var inputs = $(this).find(".check");
                                for (j = 0; j < inputs.length; j++) {
                                    if (inputs[j].checked === true) {
                                        arrs.push(inputs[j].defaultValue);
                                        var arr = arrs.join(",");
                                    }
                                }
                                if (arrs.length === 0) {
                                    datas = [];
                                } else {
                                    obj.userId = tb.find("tr").eq(i).children().eq(0).text();
                                    obj.value = arr;
                                    datas.push(obj);
                                }
                            });
                            datas = JSON.stringify(datas);
                            $.ajax({
                                type: "post",
                                url: "/ExternalItems/userauth/putMenuAuth.jcp",
                                data: {data: datas},
                                success: function () {
                                    datas = [];
                                    toastr.success("修改成功");
                                }
                            });
                            return false;
                        });
                        $("a[href='#return']").on("click", function (e) {
                            var tb = $("#datatable_" + conf.id).DataTable();
                            tb.ajax.reload();
                        });
                    });
                }
            });
        }
    };
})();