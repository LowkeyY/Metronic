(function () {
    var isFirstLoad = true;

    function getDatas(moduleId) {
        return '<div class="row" id="module_' + moduleId + '">     <div class="col-md-12"> 		<div class="portlet box blue"> 		    <div class="portlet-title"> 				<div class="caption"><i class="fa fa-file-o"></i>统计分析</div> 				<div class="tools">					<a href="" class="fullscreen" data-original-title="" title=""></a> 				    <a href="javascript:;" class="reload"></a> 				</div> 		    </div> 		    <div class="portlet-body"> 				<div id="' + moduleId + '" class="tabbable-custom ">					<ul class="nav nav-tabs ">						<li class="">							<a href="#' + moduleId + '_1" data-toggle="tab" aria-expanded="false">全站访问量</a>						</li>						<li class="active">							<a href="#' + moduleId + '_2" data-toggle="tab" aria-expanded="false">时段分布统计</a>						</li>						<li class="">							<a href="#' + moduleId + '_3" data-toggle="tab" aria-expanded="false">操作系统比例</a>						</li>						<li class="">							<a href="#' + moduleId + '_4" data-toggle="tab" aria-expanded="false">浏览器统计</a>						</li>						<li class="">							<a href="#' + moduleId + '_5" data-toggle="tab" aria-expanded="false">语言统计</a>						</li>						<li class="">							<a href="#' + moduleId + '_6" data-toggle="tab" aria-expanded="false">分辨率统计</a>						</li>					</ul>					<div class="tab-content">						<div class="tab-pane" id="' + moduleId + '_1">' + getRiQi(moduleId + "_1") + '						</div>						<div class="tab-pane" id="' + moduleId + '_2">' + getRiQi(moduleId + "_2") + '						</div>						<div class="tab-pane" id="' + moduleId + '_3">' + getRiQi(moduleId + "_3") + '						</div>						<div class="tab-pane" id="' + moduleId + '_4">' + getRiQi(moduleId + "_4") + '						</div>						<div class="tab-pane" id="' + moduleId + '_5">' + getRiQi(moduleId + "_5") + '						</div>						<div class="tab-pane" id="' + moduleId + '_6">' + getRiQi(moduleId + "_6") + "						</div>					</div>				</div>			</div>		</div>	</div></div>";
    }

    function getRiQi(moduleId) {
        return '		<div class="table-toolbar">		    <div class="row">			<div class="col-md-12">                           <div class="col-md-3">                              <div class="input-group input-large date-picker input-daterange" data-date="2012/10/11" data-date-format="yyyy/mm/dd">                                 <input type="text"  id="fTime_' + moduleId + '" class="form-control" name="fTime" placeholder="开始时间">                                  <span class="input-group-addon"> 至 </span>                                   <input type="text"  id="sTime_' + moduleId + '" class="form-control" name="sTime" placeholder="结束时间">                               </div>                           </div>                           <div class="col-md-2">                               <div class="clearfix">                                   <button id="btn_' + moduleId + '_search" class="btn yellow">                                       过滤 <i class="fa fa-search"></i>                                   </button>                               </div>                           </div>			</div>		    </div>		</div>               <div id="content_' + moduleId + '"></div>';
    }

    function getDate2Str(d) {
        d = d || new Date();
        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    }

    function getFilters(moduleId) {
        var first = $("#fTime_" + moduleId).val() || "", second = $("#sTime_" + moduleId).val() || "";
        if (!first && !second) {
            first = getDate2Str(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));
            $("#fTime_" + moduleId).val(first);
            second = getDate2Str(new Date());
            $("#sTime_" + moduleId).val(second);
        }
        var param = {};
        param.first = first;
        param.second = second;
        return param;
    }

    function doLayoutCheck(moduleId) {
        if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)", $("#" + moduleId));
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }

    function doLayoutDatepicker() {
        if (jQuery().datepicker) {
            $(".date-picker").datepicker({rtl: Metronic.isRTL(), orientation: "left", autoclose: true});
        }
    }

    var defaultConfig = {
        1: {url: "/dev/statistics/quanzhandianjiliang.jcp"},
        2: {url: "/dev/statistics/shiduanfenbu.jcp"},
        3: {url: "/dev/statistics/caozuoxitong.jcp"},
        4: {url: "/dev/statistics/liulanqitongji.jcp"},
        5: {url: "/dev/statistics/yuyantongji.jcp"},
        6: {url: "/dev/statistics/fenbianlvtongji.jcp"}
    };

    function getImageSrc(moduleId) {
        var param = getFilters(moduleId);
        var tabNum = moduleId && moduleId.substr(moduleId.length - 1) || -1, options = defaultConfig[tabNum] || "";
        if (options) {
            var w = $("#" + moduleId).parent().width();
            return options.url + "&firtim=" + param.first + "&sectim=" + param.second + "&height=800&width=" + w + "&ran=" + Math.random();
        }
        return "";
    }

    function getImage(moduleId) {
        var src;
        return (src = getImageSrc(moduleId)) && "<img src=" + src + "/>" || "";
    }

    function afterLayout(moduleId) {
        if (!$().dataTable) {
            return;
        }
        var table = $("#table_" + moduleId), tableWrapper = jQuery("#table_" + moduleId + "_wrapper");
        table.find(".group-checkable").change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents("tr").addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents("tr").removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        table.on("change", "tbody tr .checkboxes", function () {
            $(this).parents("tr").toggleClass("active");
        });
        tableWrapper.find(".dataTables_length select").addClass("form-control input-xsmall input-inline");
    }

    function getHtml(moduleId) {
        doLayoutCheck(moduleId);
        var tabNum = moduleId && moduleId.substr(moduleId.length - 1) || -1, options = defaultConfig[tabNum] || "";
        if ($().dataTable && tabNum > -1 && options) {
            var table = $("#table_" + moduleId);
            table.dataTable({
                bStateSave: true,
                columns: options.columns,
                searching: false,
                serverSide: true,
                ajax: function (data, callback, settings) {
                    var param = getFilters(moduleId);
                    param.limit = data.length;
                    if (isFirstLoad) {
                        isFirstLoad = false;
                        param.start = 0;
                    } else {
                        param.start = data.start;
                    }
                    param.page = (data.start / data.length) + 1;
                    $.ajax({
                        type: "post",
                        url: options.url,
                        cache: false,
                        data: param,
                        dataType: "json",
                        success: function (result) {
                            var returnData = {};
                            returnData.draw = data.draw;
                            returnData.recordsTotal = result.totalCount;
                            returnData.recordsFiltered = result.totalCount;
                            returnData.data = result.dataItem;
                            callback(returnData);
                            doLayoutCheck(moduleId);
                            afterLayout(moduleId);
                        }
                    });
                },
                pageLength: 10,
                pagingType: "bootstrap_full_number",
                columnDefs: [{orderable: false, targets: [0]}, {searchable: false, targets: [0]}],
                order: [[1, "desc"]]
            });
            $("#" + moduleId).on("click", "button", function (e) {
                e.preventDefault();
                var btnId;
                if (btnId = $(e.target).attr("id")) {
                    if (btnId.endsWith("_search")) {
                        table.api().draw();
                    }
                }
            });
        }
    }

    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js");
            appendHtml(getDatas(conf.id), function () {
                $.fn.datepicker.defaults.language = "zh-CN";
                doLayoutDatepicker();
                $("#" + conf.id).on("click", "li > a", function (el) {
                    var clickId = $(el.target).attr("href") || "", selector;
                    if (clickId && (selector = $(clickId))) {
                        var content = $("#content_" + selector.attr("id"), selector);
                        if (!content) {
                            return;
                        }
                        if (clickId.endsWith("_1|_2")) {

                        } else {
                            if (clickId.endsWith("_3|_4")) {
                            } else {
                                if (clickId.endsWith("_5|_6")) {
                                }
                            }
                        }
                    }
                });
                $("#" + conf.id).find("a:first").trigger("click");
            });
        }
    };
})();