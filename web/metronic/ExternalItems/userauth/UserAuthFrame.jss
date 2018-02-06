(function () {
    var datatableHead = "", currentSelectDeptId = "", datas = [], portletColor = PageSystem.getColor(),flag=false;

    function panks(conf) {
        return '<div class="row" id="module_' + conf.id + '">\n' +
            '    <div class="col-md-12">\n' +
            '        <div class="portlet">\n' +
            '            <div class="portlet-title">\n' +
            '                <div class="caption"><i class="fa fa-unlock-alt"></i>用户权限</div>\n' +
            '                <div class="tools"><a href="javascript;" class="fullscreen" data-original-title="" title=""> </a></div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksLeft(conf) + panksRight() + '</div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">\n' +
            '    <div class="portlet '+portletColor+' box">\n' +
            '        <div class="portlet-title">\n' +
            '            <div class="caption"><i class="fa fa-sitemap"></i>省政府办公厅</div>\n' +
            '            <div class="tools"><a href="javascript:;" class="collapse"> </a></div>\n' +
            '        </div>\n' +
            '        <div class="portlet-body">\n' +
            '            <div id="tree_' + conf.id + '" class="tree-demo"></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
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
                    var item = [{data: "index"}, {data: "real_name"}, {data: "dept_name"}];
                    arr.map(function (i) {
                        col.push(i.text);
                        item.push({
                            render: function (data, type, row, meta) {
                                return '<input type="checkbox" class="check" ' + (row[i.id] === true ? "checked" : "") + ' value="' + i.id + '" >';
                            }
                        });
                    });
                    var table = new PageDatatable(conf.id);
                    datatableHead = table.initHead({
                        title: "用户权限",
                        tools: [{name: "保存",icon:"edit", id: "authSave"}, {name: "还原", icon: "reply", id: "return"}],
                        columns: col,
                        portletCss: "box "+portletColor,
                        portletTitleCss: "unlock-alt",
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
                                },
                                work:false
                            },
                            types: {
                                "default": {icon: "fa fa-folder icon-state-warning icon-lg"},
                                file: {icon: "fa fa-file icon-state-warning icon-lg"}
                            },
                            state: {key: "organization"},
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
                            ordering: false,
                             id: conf.id,
                            ajax: function (data, callback, settings) {
                                if (!currentSelectDeptId) {
                                    return;
                                }
                                 var param = {};
                                if(flag==false){
                             param.limit = data.length;
                        param.start = data.start;
                        param.page = (data.start / data.length) + 1;
                        param.dept_id = currentSelectDeptId;
                        }else{
                            var searchText = $("#searchText" + conf.id).val(),
                                searchType = $("#form_control_1" + conf.id).val();
                             param.dept_id = "99999";
                                param.org_id = "0";
                                param.query_type = searchType;
                                param.keyword = searchText;
                               
                        }
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
                                    },
                                    error:function(data){
                                       
                                    }
                                });
                            }
                        });
                            $("a[href='#authSave']").on("click", function (e) {
                            e.preventDefault();
                            var tb = $("#datatable_b6c6e3bb-0aea-4e7a-a878-9d61fb27b7a0 tbody"),
                                value = [];
                            tb.find("tr").each(function (i) {
                                var userId=tb.find("tr").eq(i).children().eq(0).text();
                                var inputs = $(this).find(".check");
                                var inputChecked=$(this).find(".check");
                                var arrs=[];
                                for (j = 0; j < inputs.length; j++) {
                                    if (inputs[j].checked === true) {
                                        arrs.push(inputs[j].defaultValue);
                                        var arr = arrs.join(",");
                                    }
                                }
                                 value.push({"userId":userId,"value":arrs.length?arr:""});
                            });
                                value= JSON.stringify(value);
                            $.ajax({
                                type: "post",
                                url: "/ExternalItems/userauth/putMenuAuth.jcp",
                                data: {data: value},
                                success: function (data) {
                                         value = [];
                                    toastr.success("修改成功");
                                    }
                            });
                            return false;
                        });

                        $("a[href='#return']").on("click", function (e) {
                            var tb = $("#datatable_" + conf.id).DataTable();
                            bootbox.confirm("<h4>确定还原本次修改？</h4>",function(result){
                                if(result){
                                    tb.ajax.reload();
                                }
                            });
                        });
                         $("#searchBtn" + conf.id).on("click", function (){
                         flag=true;
                          var dt = $("#datatable_" + conf.id).DataTable();
                           dt.ajax.reload();
                           flag=false;
                       });
                    });
                }
            });
        }
    };
})();