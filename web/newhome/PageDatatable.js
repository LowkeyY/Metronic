/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var PageDatatable = function (id) {
    
    PageSystem.loadJS('/metronic/assets/global/plugins/select2/select2.min.js');
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js');
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js');

    var selector = id ? '#datatable_' + id : "", isValid = !!selector && jQuery().dataTable , dateTableColumns = [];

    var opt = {
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "无数据",
            "info": "显示 _START_ 至 _END_ ，共 _TOTAL_ 条数据",
            "infoEmpty": "没有数据",
            "infoFiltered": "(从 _MAX_ 条数据中查找)",
            "lengthMenu": "每页显示 _MENU_ 条数据",
            "search": "搜索:",
            "zeroRecords": "无数据",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "last": "末页",
                "first": "首页"
            }
        },

        "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
        "bFilter": false,
        "pagingType": "bootstrap_full_number"
    };

    function uniform(dom) {
        if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)", dom || selector);
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }

    function afterInit(id) {
        if (isValid) {
            var table = $(selector), tableWrapper = $(selector + '_wrapper');
            table.find('.group-checkable').change(function () {
                var set = $(this).attr("data-set");
                var checked = $(this).is(":checked");
                $(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).attr("checked", false);
                        $(this).parents('tr').removeClass("active");
                    }
                });
                $.uniform.update(set);
            });
              if(!id){
                  $("tbody" , table).on("click","tr",function(e){
                $(".Metronic-alerts" , tableWrapper).hide();
                if(e.ctrlKey) {
                         $(this).toggleClass('selected');
                }else {
                        $('tr.selected',table).removeClass('selected');
                        $(this).addClass('selected');
                    }

            });
            }
            tableWrapper.find('.dataTables_length select').addClass("form-control input-xsmall input-inline");
        }
    }
    
    function panksTh(items){
        if($.isArray(items) && items.length){
            var htmls = [];
            $.each(items , function(i , item){
                htmls.push('<th>' +item+'</th>');
            });
            return htmls.join("\n");
        }
        return '';
    }
    function panksTools(items){
        if($.isArray(items) && items.length){
            var htmls = [];
            $.each(items , function(i , item){
                htmls.push('<a href="' + (item.id ? '#' + item.id : 'javascript:void(0);') + '" class="btn'+(item.color ? ' ' + item.color : ' default yellow-stripe') +'" data-toggle="modal" >');
                htmls.push('<i class="fa fa-'+(item.icon ? item.icon : 'plus')+'"></i><span class="hidden-480">' + item.name + '</span></a>');
            });
            return htmls.join("\n");
        }
        return '';
    }
    function panks(o) {
        return  '    <div class="portlet'+(o.portletCss ? ' ' + o.portletCss: '')+'">' +
                '        <div class="portlet-title">' +
                '            <div class="caption">' +
                '                <i class="fa fa-'+(o.portletTitleCss ? o.portletTitleCss : 'tag')+'"></i>' + o.title +
                '            </div>' +
                '            <div class="actions">' + panksTools(o.tools) +
                '            </div>' +
                '        </div>' +
                '        <div class="portlet-body">' +
                '        <div class="select-box row">' +
                             '<div class="form-group form-md-line-input has-info form-md-floating-label" style="margin-bottom:0">\n' +
                                 '<div class="row">'+
                                     '<div class="col-md-7 pull-right">'+
                                           '<div class="col-md-4" style="padding-right: 5px">'+
                                                '<select class="form-control edited" id="form_control_1'+o.id+'" >\n' +
                                                  '\t\t\t\t\t\t\t\t\t\t\t<option value="1" selected="">用户名</option>\n' +
                                                         '\t\t\t\t\t\t\t\t\t\t\t<option value="2">真实姓名</option>\n' +
                                                       '\t\t\t\t\t\t\t\t\t\t\t<option value="3">办公电话</option>\n' +
                                                      '\t\t\t\t\t\t\t\t\t\t\t<option value="4">用户ID</option>\n' +
                                                                  '\t\t\t\t\t\t\t\t\t\t</select>'+
                                           '</div>'+
                                               '<div class="col-md-8" style="padding-left:15px">'+
                           '\t\t\t\t\t\t\t\t\t\t<div class="input-group input-group-sm"  style="margin-top:4px">\n' +
                              '\t\t\t\t\t\t\t\t\t\t\t<div class="input-group-control">\n' +
                                  '\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="form-control input-sm" id="searchText'+o.id+'">\n' +
                                       '\t\t\t\t\t\t\t\t\t\t\t\t<label for="form_control_1">请输入</label>\n' +
                                '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                               '\t\t\t\t\t\t\t\t\t\t\t<span class="input-group-btn btn-right">\n' +
                                        '\t\t\t\t\t\t\t\t\t\t\t<button class="btn green-haze" type="button" id="searchBtn'+o.id+'">搜索</button>\n' +
                            '\t\t\t\t\t\t\t\t\t\t\t</span>\n' +
                        '\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '</div>'+
            '\t\t\t\t\t\t\t\t\t</div>'+
            '</div>'+
            '</div>'+
                '        </div>' +
                '            <div class="table-container">' +
                '                <table class="table table-striped table-bordered table-hover" id="' + selector.substr(1) + '">' +
                '                    <thead>' +
                '                        <tr role="row" class="heading">' + panksTh(o.columns) +
                '                        </tr>' +
                '                    </thead>' +
                '                    <tbody>' +
                '                    </tbody>' +
                '                </table>' +
                '            </div>' +
                '        </div>' +
                '    </div>';
    }
    function getSelectRows(cols,tableId){
        var columnIndex = {};
        $.each(cols , function(i , col){
            $.each(dateTableColumns , function(j , dateTableColumn){
                if(dateTableColumn.data && dateTableColumn.data === col){
                    columnIndex[j] = col; 
                }
            });
        });
        var rows = [];
        $("tbody",tableId).find(".selected").each(function () {
            var $this= $("tbody",tableId).find(".selected");
            $this.children("td").each(function (i) {
                if(columnIndex[i])
                    rows.push( $this.children("td").text());
            });
        });
        return rows;
    }

    return {
        initDatatable: function (options) {
            if (isValid && options) {
                uniform();
                if(options.columns && $.isArray(options.columns))
                    dateTableColumns = options.columns;
                $(selector).dataTable($.extend(true, opt, options));
                afterInit(options.id);
            }
        },
        initHead : function(conf){
            if(isValid && conf){
                return panks(conf);
            }
            return '';
        },
        reUniform : function(){
            uniform();
        },
        selects : function(cols,tableId){
            return isValid && cols ? getSelectRows($.isArray(cols) ? cols : [cols],tableId) : [];
        },
    };
};