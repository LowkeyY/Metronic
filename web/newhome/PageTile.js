/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global PageTab */

var PageTile = function () {

    var colors = ['blue', 'green', 'yellow', 'purple', 'red'] , 
            icons = ['envelope' , 'calendar' , 'comment' , 'umbrella'];

    function getColors() {
        colors = colors.concat(colors[0]);
        return colors.shift(0);
    }
    
    function getIcons() {
        icons = icons.concat(icons[0]);
        return icons.shift(0);
    }

    // function packs(config) {
    //     var tile_image_url = config.deskIcon;
    //     var isImgDeskIcon=config.isImgDeskIcon;
    //     var tile_double = config.tile_doblue === "true";
    //     return '<div class="tile ' + (isImgDeskIcon ? 'image' + (tile_double ? ' double' : '') : 'bg-' + getColors()) + '" id="tile_' + config.id + '">' +
    //                 '<div class="tile-body">' +
    //                 (isImgDeskIcon ? '<img src="' + tile_image_url + '"/>' : '<i class="fa fa-' +tile_image_url+ '"></i>') +
    //                 '</div>' +
    //                 '<div class="tile-object">' +
    //                     '<div class="name">' + (config.title || '') + '</div>' +
    //                     '<div class="number">0</div>' +
    //                 '</div>' +
    //             '</div>';
    // }
    
    var minPortletHeight = 300;
    
    function getCardId(id){
        var flag = "desktop-card-";
        return id.startsWith(flag) ? id.substr(flag.length) : flag + id;
    }
    
    function packCards(config){
        var size = config.iconSize;
        return  '<div class="col-lg-' + size + ' col-md-' + size + ' col-sm-6 col-xs-12">' + 
                '	<a class="dashboard-stat dashboard-stat-v2 ' + config.iconColor + '" href="javascript:void(0);" id="' + getCardId(config.id) + '">' + 
                '		<div class="visual" style="padding-top: 35px; margin-bottom: 40px;">' + 
                '                   <i class="fa fa-' + config.deskIcon + '"></i>' + 
                '		</div>' + 
                '		<div class="details">' + 
                '			<div class="number">' + 
                '				<span data-counter="counterup" style=\'font-family: "Open Sans",sans-serif;\'>0</span>' + 
                '			</div>' + 
                '			<div class="desc">' + config.title + '</div>' + 
                '		</div>' + 
                '	</a>' + 
                '</div>'
    }
    
    function getId(id){
        var flag = "desktop-portlet-";
        return id.startsWith(flag) ? id.substr(flag.length) : flag + id;
    }
    
    function packPortletLight(config){
        var color = config.iconColor;
        return  '<div class="portlet portlet-sortable light bordered" id="' + getId(config.id) + '">' + 
                '    <div class="portlet-title ui-sortable-handle">' + 
                '        <div class="caption font-' + color + '">' + 
                '            <i class="fa fa-' + config.deskIcon + ' font-' + color + '"></i>' + 
                '            <span class="caption-subject bold uppercase"> ' + config.title + '</span>' + 
                '        </div>' + 
                '        <div class="actions">' + 
                '            <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="全屏"></a>' + 
                '        </div>' + 
                '    </div>' + 
                '    <div class="portlet-body" minProtletHeight=' + minPortletHeight + ' style="height: ' + minPortletHeight + 'px;">' + 
                '    </div>' + 
                '</div>';
    }
    
    function packPortlet(config){
        var mh = minPortletHeight + 45;
        return  '<div class="portlet portlet-sortable box ' + config.iconColor + '" id="' + getId(config.id) + '">' + 
                '    <div class="portlet-title ui-sortable-handle">' + 
                '        <div class="caption">' + 
                '            <i class="fa fa-' + config.deskIcon + '"></i>'+ config.title + 
                '        </div>' + 
                '        <div class="actions">' + 
                '            <a class="btn btn-sm btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="全屏"></a>' + 
                '        </div>' + 
                '    </div>' + 
                '    <div class="portlet-body" minProtletHeight=' + mh + ' style="height: ' + mh + 'px;"></div>' + 
                '</div>'
    }
    
    function builds(html, selector) {
        if (html && selector)
            $(selector).append(html);
    }
    
    function updates(config, content, html, callback) {
        if (content) {
            content.html(html);
            evalCallbackFn(callback);
        }
    }
    
    function evalCallbackFn(fn){
        if ($.isFunction(fn)) {
            fn.apply(null, arguments);
        }
    }
    // function layoutByCongfig(datas, selector) {
    //     var items = datas || [];
    //     $.each(items, function (i , item) {
    //         if(item.showAtDesk === true)
    //             builds(packs(item), selector);
    //     });
    // }
    
    function layoutCardByCongfig(datas, selector) {
        var items = datas || [];
        $.each(items, function (i , item) {
            if(item.showAtDesk === true)
                builds(packCards(item), selector);
        });
    }
    
    function layoutDraggableInit(selector){
        if (!jQuery().sortable || !selector) {
            return;
        }
        $(selector).sortable({
            connectWith: ".portlet",
            items: ".portlet", 
            opacity: 0.9,
            handle : '.portlet-title',
            coneHelperSize: true,
            placeholder: 'portlet-sortable-placeholder',
            forcePlaceholderSize: true,
            tolerance: "pointer",
            helper: "clone",
            cancel: ".portlet-sortable-empty, .portlet-fullscreen", // cancel dragging if portlet is in fullscreen mode
            revert: 250, // animation in milliseconds
            update: function(event, ui) {
                if (ui.item.prev().hasClass("portlet-sortable-empty")) {
                    ui.item.prev().before(ui.item);
                }
                var columns = ui.item.closest(".row.ui-sortable").find(".column") , result = {};
                columns.each(function(i , column){
                    result[i] = [];
                    $(column).children().each(function(index , portlet){
                        var portletId = $(portlet).attr("id");
                        if(portletId && !$(portlet).hasClass("portlet-sortable-empty"))
                            result[i].push(getId(portletId));
                    });
                });
                console.log(JSON.stringify(result));
                $.ajax({
                    type:"POST",
                    url:"/home/system/setup.jcp",
                    data: {
                        what: "metronicPortletSorts",
                        task: "save",
                        data: JSON.stringify(result)
                    },
                    success:function (data) {
                        console.log(234234)
                    }

                })
            }
        });
    }
    
    function getArrayDataById(datas , id){
        var result = false;
        $.each(datas, function (i , data) {
            if(PageSystem.isObject(data)  && data.hasOwnProperty("id") && data["id"] === id)
                result = data;
        });
        return result;
    }
    
    function getDatasBySort(datas , sorts){
        var items = {0 : [] , 1 : []} , index = 0;
        if(!PageSystem.isArray(datas))
            return items;
        if(sorts && PageSystem.isObject(sorts)){
            for(var att in sorts){
                var array = sorts[att];
                if(PageSystem.isArray(array)){
                    if(!items.hasOwnProperty(att))
                        items[att] = [];
                    $.each(array, function (i , id) {
                        var item = getArrayDataById(datas , id);
                        item && items[att].push(item);
                    });
                }
            }
            return items;
        }
        $.each(datas, function (i , data) {
            if(data.isDesk === true)
                items[(index++ % 2)].push(data);
        });
        return items;
    }
    
    function layoutDraggablePortlets(datas , selector , sorts , add){
        var items = getDatasBySort(datas , sorts);
        if(PageSystem.isObject(items)){
           for(var att in items){
               var column = items[att];
               if(PageSystem.isArray(column)){
                    var currentSelector = att % 2 == 0 ? $(selector).children("div:first-child") : $(selector).children("div:last-child");
                    $.each(column, function (i , item) {
                        if(item.isDesk === true || add === true){
                            builds(i % 2 == 0 ? packPortletLight(item) : packPortlet(item) , currentSelector);
                            packsPortletBody(item , $(selector + " #" + getId(item.id) + " .portlet-body"));
                        }/* else if(item.submenu){
                            layoutDraggablePortlets(item.submenu , selector , sorts , true)
                        }*/ 
                    });
                    builds('<div class="portlet portlet-sortable-empty"></div>' , currentSelector);
               }
           } 
        }
    }
    
    function packsPortletBody(config, content) {
        var url = config.path, currentId = config.id, currentHeight = "100%";
        if (config.isIframe === true || /^((https|http|ftp|rtsp|mms)?:\/\/)/i.test(url)) {
            updates(config, content, "<iframe id=\"portletbdoy_" + currentId + "\" src=\"" + url + "\" style = 'border:0;width: 100%;height:100%;'></iframe>");
        } else {
            var lib = url;
            var paramArray = url.split('?');
            lib = paramArray[0];
            var param = (paramArray.length > 1) ? decodeURIComponent(paramArray[1]) : {};
            for (var att in param)
                config[att] = param[att];
            try{
                var processModule = PageTab.loadJS(lib);
                if (processModule) {
                    config.currentHeight = currentHeight;
                    function fn(html, callback) {
                        updates(config, content, html, callback);
                    }
                    processModule.init(config, fn);
                } else 
                    hidePortlet(config.id);
            }catch(e){
                hidePortlet(config.id);
            }
        }
    }
    
    function hidePortlet(id){
        $("#" + getId(id)).css("display" , "none");
    }
    
    function counterupNumber(selector){
        if($().counterUp){
            if(selector){
                $("[data-counter='counterup']" , $(selector)).counterUp({
                    delay: 10,
                    time: 1000
                });
            } else {
                $("[data-counter='counterup']" , '.page-content .row').counterUp({
                    delay: 10,
                    time: 1000
                });
            }
        }
    }
    
    return {
        //main function to initiate the module
        init: function (selector) {
            this.selector = selector || '.page-content .tiles';
        },
        doLayout: function (items , sorts) {
            // layoutByCongfig(items, this.selector);
            var cardSelector = ".page-content .tab-content .row.cards" , portletSelector = ".page-content #tab_desktop .row.ui-sortable";
            layoutCardByCongfig(items, cardSelector);
            layoutDraggablePortlets(items , portletSelector , sorts);
            layoutDraggableInit(portletSelector);
            // $(this.selector).on('click', '.tile', function (e) {
            //     PageTab.create($(this).attr('id'));
            // });
            $(cardSelector).on('click', '.dashboard-stat', function (e) {
                PageTab.create(getCardId($(this).attr('id')));
            });
            //counterupNumber();
        },
        setCardNumber : function(id , number){
            var selector = $("#" + getCardId(id));
            if(selector.size() && +number){
                selector.find(".number span:first-child").html(number);
                counterupNumber(selector);
            }
        },
        counterupNumber : function(selector){
            counterupNumber(selector);
        },
        resetCardNumber : function(){
            $(".page-content .tab-content .row.cards").find(".number span:first-child").html(0);
        }
    };
}();