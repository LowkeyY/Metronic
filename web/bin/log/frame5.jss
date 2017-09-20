(function(){
    
    function getTabs(moduleId){
        return  '<div class="row" id="module_'+moduleId+'"> ' + 
                '    <div class="col-md-12"> ' + 
                '		<div class="portlet box blue"> ' + 
                '		    <div class="portlet-title"> ' + 
                '				<div class="caption"><i class="fa fa-file-o"></i>访问日志</div> ' + 
                '				<div class="tools">' + 
                '					<a href="" class="fullscreen" data-original-title="" title=""></a> ' + 
                '				    <a href="javascript:;" class="reload"></a> ' + 
                '				</div> ' + 
                '		    </div> ' + 
                '		    <div class="portlet-body"> ' + 
                '				<div id="'+moduleId+'" class="tabbable-custom ">' + 
                '					<ul class="nav nav-tabs ">' + 
                '						<li class="">' + 
                '							<a href="#'+moduleId+'_1" data-toggle="tab" aria-expanded="flase">访问统计</a>' + 
                '						</li>' + 
                '						<li class="active">' + 
                '							<a href="#'+moduleId+'_2" data-toggle="tab" aria-expanded="false">访问列表</a>' + 
                '						</li>' + 
                '						<li class="">' + 
                '							<a href="#'+moduleId+'_3" data-toggle="tab" aria-expanded="false">系统访问曲线</a>' +  
                '						</li>' + 
                '						<li class="">' + 
                '							<a href="#'+moduleId+'_4" data-toggle="tab" aria-expanded="false">用户访问统计曲线</a>' + 
                '						</li>' + 
                '					</ul>' + 
                '		<div class="tools">' +
                '                   <a href="" class="fullscreen" data-original-title="" title="">' +
                '                   </a>' +
                '		    <a href="javascript:;" class="reload">' +
                '		    </a>' +
                '		</div>' +
                '           </div>' +
                '	    <div class="portlet-body">' +
                '		<div class="table-toolbar">' +
                '		    <div class="row">' +
                '			<div class="col-md-12">' +
                '                           <div class="col-md-2">' +
                '                               <input class="form-control" id="loglevel_'+conf.id+'" name="loglevel_'+conf.id+'" type="hidden">' +
                '                           </div>' +
                '                           <div class="col-md-3">'+
                '                              <div class="input-group input-large date-picker input-daterange" data-date="2012/10/11" data-date-format="yyyy/mm/dd">'+
                '                                 <input type="text"  id="fTime_'+conf.id+'" class="form-control" name="fTime" placeholder="开始时间">'+
                '                                  <span class="input-group-addon"> 至 </span>'+
                '                                   <input type="text"  id="sTime_'+conf.id+'" class="form-control" name="sTime" placeholder="结束时间">'+
                '                               </div>'+
                '                           </div>'+
		'                           <div class="col-md-2">' +
                '                               <div class="clearfix">' +
                '                                   <button id="btn_' + conf.id + '_search" class="btn yellow">' +
                '                                       过滤 <i class="fa fa-search"></i>' +
                '                                   </button>' +
                '                               </div>' +
                '                           </div>' +  
		'			</div>' +             
                '		    </div>' +
                '		</div>' +
                '						<div class="tab-pane" id="'+moduleId+'_1">' + 
                '						</div>' + 
                '						<div class="tab-pane" id="'+moduleId+'_2">' + 
                '						</div>' + 
                '						<div class="tab-pane" id="'+moduleId+'_3">' + 
                '                                                   <img src="/bin/user/images/34385822676885.jpg"/>' +
                '						</div>' + 
                '						<div class="tab-pane" id="'+moduleId+'_4">' + 
                '                                                   <img src="/bin/user/images/6519327810620.jpg"/>' +
                '						</div>' + 
                '					</div>' + 
                '				</div>' + 
                '			</div>' + 
                '		</div>' + 
                '	</div>' +
                '</div>';
    }
    var maps = {
        1 : "/bin/log/getstastic.jcp",
        2 : "/bin/log/userstat.jcp",
        3 : "/bin/log/Log.jcp",
        4 : "/bin/log/Log.jcp"
    }
    
    function getSeachParam(moduleId){
        var param = {};
        param.combo = $('#loglevel_'+moduleId).val() || "";
        param.conText = $('#content_'+moduleId).val() || "";
        param.fTime = $('#fTime_'+moduleId).val() || "";
        param.sTime = $('#sTime_'+moduleId).val() || "";
        return param;
    }
    
    function getLogLevel2Sel(){
        var LogLevelsSel = [];
        for(var att in LogLevels)
            LogLevelsSel.push({id : att , text : LogLevels[att]});
        return LogLevelsSel;
    }
    
    function getSelectedRows(table){
        var rows =[], cols = ['ENTRY_DATE','CATEGORY','CONTENT','LOG_LEVEL','RECORDER'];
        $('tbody > tr >td:nth-child(1) input[type="checkbox"]:checked',table).each(function (){
            var oData = {};
            $(this).parents('td').siblings('td').each(function () {
                oData[cols.shift()] = $(this).text();
            })
            rows.push(oData);
        });
        return rows;
    }
    
     function doLayoutCheck(){
        if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }
    
    function getHtml(moduleId){
        var tabNum = moduleId && moduleId.substr(moduleId.length - 1) || -1 , url = maps[tabNum] || "";
        if(tabNum > -1 && url){
           $.ajax({
                type: "get",
                dataType: "json",
                url: url,
                success: function (result) {
                    var seletor = $(moduleId);
                    seletor.html(moduleId.endsWith("_1") ? panks(seletor.attr("id") , result.dataItem) : pank(seletor.attr("id") , result.dataItem));
//                     if (jQuery().datepicker) {
//                                $('.date-picker').datepicker({
//                                    rtl: Metronic.isRTL(),
//                                    orientation: "left",
//                                    autoclose: true
//
//                                });
//                            }
            
                    boforeLayout();
                    moduleId.endsWith("_1") ? doLayoutTable(seletor.attr("id")) : doLayoutTable1(seletor.attr("id"));
                    afterLayout(seletor.attr("id"));
                }
            }) 
        }
    }
    
    function boforeLayout(){
         if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }
    
     function infosModal(conf) {
        return '<div id="module_' + conf.id + '_infos" class="modal fade" tabindex="-1">' + infosData() + '</div>';
    }

    function infosUpdateVal(selector, values) {
        for (var att in values)
            $(selector).find('#' + att).html(values[att]);
    }
    
    function infosData() {
        return  '<div class="modal-header">' +
                '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>' +
                '    <h4 class="modal-title">访问日志</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '    <div class="portlet box">' +
                '        <div class="portlet-body form">' +
                '            <!-- BEGIN FORM-->' +
                '            <form class="form-horizontal form-bordered">' +
                '                <div class="form-group">' +
                '                    <label class="control-label col-md-4">日期:</label>' +
                '                    <div class="col-md-8">' +
                '                        <p class="form-control-static" id="ENTRY_DATE"></p>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="form-group">' +
                '                    <label class="control-label col-md-4">当日访问人数:</label>' +
                '                    <div class="col-md-8">' +
                '                        <p class="form-control-static" id="CATEGORY"></p>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="form-group">' +
                '                    <label class="control-label col-md-4">当次访问人数:</label>' +
                '                    <div class="col-md-8">' +
                '                        <p class="form-control-static" id="LOG_LEVEL"></p>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="form-group">' +
                '                    <label class="control-label col-md-4">当日使用时间:</label>' +
                '                    <div class="col-md-8">' +
                '                        <p class="form-control-static" id="RECORDER"></p>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="form-group">' +
                '                    <label class="control-label col-md-2">当次停留时间</label>' +
                '                    <div class="col-md-10">' +
                '                        <p class="form-control-static" id="CONTENT"></p>' +
                '                    </div>' +
                '                </div>' +
                '            </form>' +
                '            <!-- END FORM-->' +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '    <button class="btn blue" data-dismiss="modal" aria-hidden="true">确定</button>' +
                '</div>'
    }
    
    function doLayoutTable(moduleId){
        if(!$().dataTable){
            return;
        }
        var table = $("#table_"+moduleId);
        table.dataTable({
            "searching":false,
            //"lengthChange": false,
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "无数据",
                "info": "显示 _START_ 至 _END_ 条，共 _TOTAL_ 条数据",
                "infoEmpty": "没有数据",
                "infoFiltered": "(从 _MAX_ 条数据中查找)",
                "lengthMenu": "每页显示 _MENU_ 条数据",
                "search": "搜索：",
                "zeroRecords": "无数据",
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页",
                    "last": "末页",
                    "first": "首页"
                }
            },
            "bStateSave": true,
            "columns": [{
                    "orderable": true
                }, {
                    "orderable": true
                }, {
                    "orderable": true
                }, {
                    "orderable": true
                }, {
                    "orderable": true
                }],
            "pageLength": 10,
            "pagingType": "bootstrap_full_number",
            "columnDefs": [{
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }],
            "order": [
                [1, "desc"]
            ]
        });
    }
    
    function doLayoutTable1(moduleId){
        if(!$().dataTable){
            return;
        }
        var table = $("#table_"+moduleId);

appendHTML(panks(conf,[]));
            $("#loglevel_"+ conf.id , "#module_" + conf.id).select2({width: 'resolve',placeholer: "级别", allowClear: true,data: getLogLeve12Sel()});
            if(jQuery().dataTable){
                $.fn.datepicker.defaults.language = "zh-CN";
                doLayoutCheck();
                doLayoutDatepicker();
                var table = $('#table_' + moduleId), language = {
                    "aria": {
                        "sortAscending": ":activate to sort column ascending",
                        "sortDescending": ":activate to sort column descending"
                    },
                    "emptyTable": "无数据",
                    "info": "显示_START_至END_,共_TOTAL_条数据",
                    "infoEmpty": "没有数据",
                    "infoFiletered": "(从_MAX_条数据中查找)",
                    "lengthMenu": "每页显示_MENU_条数据",
                    "search": "搜索",
                    "zerokRecords": "无数据",
                    "paginate": {
                        "previous": "上一页",
                        "next": "下一页",
                        "last": "末页",
                        "first": "首页"
                    }
               };
                table.dataTable({
                    language: language,
                    searching: false,
                    bStateSave: true,
                    serverSide: true,
                    ajax: function (data, callback, settings) {
                        var param = getSeachParam(conf.id);
                        param.limit = data.length;
                        param.start = data.start;
                        param.page = (data.start / data.length)+1;
                        $.ajax({
                            type: "GET",
                            url: "/bin/log/getstastic.jcp",
                            cache: false,
                            data: param,
                            dataType: "json",
                            success: function (result) {
                                var returnData = {};
                                returnData.draw = data.draw;
                                returnData.recordsTotal = result.totalNumber;
                                returnData.recordsFiltered = result.totalNumber;
                                returnData.data = result.data;
                                callback(returnData);
                                doLayoutCheck();
                            }
                        });
                    },
                    columns: [{
                            orderable: false,
                            data: null,
                            render: function (data, type, row, meta) {
                                return data = '<input type="checkbox" class="checkboxes" value="1"/>';
                            }
                        },{
                            "data" : "ENTRY_DATE",
                            "orderable": false
                        }, {
                            "data" : "CATEGORY",
                            "orderable": false
                        }, {
                            "data" : "CONTENT",
                            "orderable": false
                        }, {
                            "data" : "LOG_LEVEL",
                            "orderable": false,
                            "render": function(data,type,row,meta){
                                return data = getLogLevel(data);
                            }
                        }, {
                            "data" : "RECORDER",
                            "orderable": false
                        }],
                    "pageLength": 10,
                    "pagingType": "bootstrap_full_number",
                    "order": [
                        [1, "desc"]
                    ]
                });
            }
    }
    
    function afterLayout(moduleId){
        if(!$().dataTable){
            return;
        }
        var table = $("#table_"+moduleId) ,tableWrapper = jQuery('#table_' + moduleId + '_wrapper');
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });
        tableWrapper.find('.dataTables_length select').addClass("form-control input-xsmall input-inline");
    }
    
    function panks(moduleId , items) {
        return  '<table class="table table-striped table-bordered table-hover" id="table_' + moduleId + '">' +
                '    <thead>' +
                '	<tr>' +
                '	    <th>日期</th>' +
                '	    <th>当日访问人数</th>' +
                '	    <th>当日访问人次</th>' +
                '	    <th>当日使用时间(分钟)</th>' +
                '	    <th>单次停留(分钟)</th>' +
                '	</tr>' +
                '    </thead>' +
                '    <tbody>' + panksItems(items) +
                '    </tbody>' +
                '</table>' ;
    }
    
    function panksItems(items) {
        var html = [];
        if (items)
            $.each(items, function (i, item) {
                html.push('<tr class="odd gradeX">' +
                        '   <td>' + item.日期 + '</td>' +
                        '   <td>' + item.当日访问人数 + '</td>' +
                        '   <td>' + item.当日访问人次 + ' </td>' +
                        '   <td>' + item["当日使用时间(分钟)"] + '</td>' +
                        '   <td>' + item["单次停留(分钟)"] + '</td>' +
                        '</tr>');
            });
        return html.join("\n");
    }
    
    function pank(moduleId , items) {
        return  '<table class="table table-striped table-bordered table-hover" id="table_' + moduleId + '">' +
                '    <thead>' +
                '	<tr>' +
                '	    <th>姓名</th>' +
                '	    <th>访问次数</th>' +
                '	    <th>使用时间(分钟)</th>' +
                '	    <th>最后访问时间</th>' +
                '	</tr>' +
                '    </thead>' +
                '    <tbody>' + panksItem(items) +
                '    </tbody>' +
                '</table>' ;
    }
    
    function panksItem(items) {
    
        var html = [];
        if (items)
            $.each(items, function (i, item) {
                html.push('<tr class="odd gradeX">' +
                        '   <td>' + item.姓名 + '</td>' +
                        '   <td>' + item.访问次数 + '</td>' +
                        '   <td>' + item["使用时间(分钟)"] + '</td>' +
                        '   <td>' + item["最后访问时间"] + '</td>' +
                        '</tr>');
            });
        return html.join("\n");
    }

    return {
        init : function(conf , appendHtml){
            PageSystem.loadJS('/metronic/assets/global/plugins/select2/select2.min.js');
            PageSystem.loadJS('/metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js');
            PageSystem.loadJS('/metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js');
            PageSystem.loadJS('/metronic/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js');
            PageSystem.loadJS('/metronic/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js');
            
            
            
            appendHtml(getTabs(conf.id) , function(){
                $('#'+conf.id).on('click', 'li > a', function (el) {
                    var clickId = $(el.target).attr("href") || "" , selector;
                    if(clickId && (selector = $(clickId))){
                        if(clickId.endsWith("_1") || clickId.endsWith("_2"))
                            getHtml(clickId);
                    }
                });
                $('#'+conf.id).find('a:first').trigger("click");
            });
        }
    }
})()