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

    function packs(config) {
        var tile_image_url = config.deskIcon;
        var isImgDeskIcon=config.isImgDeskIcon;
        var tile_double = config.tile_doblue === "true";
        return '<div class="tile ' + (isImgDeskIcon ? 'image' + (tile_double ? ' double' : '') : 'bg-' + getColors()) + '" id="tile_' + config.id + '">' +
                    '<div class="tile-body">' +
                    (isImgDeskIcon ? '<img src="' + tile_image_url + '"/>' : '<i class="fa fa-' +tile_image_url+ '"></i>') +
                    '</div>' +
                    '<div class="tile-object">' +
                        '<div class="name">' + (config.title || '') + '</div>' +
                        '<div class="number">0</div>' +
                    '</div>' +
                '</div>';
    }
    
    function packCards(config){
        var title = config.title , id = config.id , isImg = false , src = config.deskIcon;
        return  '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">' + 
                '	<a class="dashboard-stat dashboard-stat-v2 '+getColors()+'" href="javascript:void(0);" id="'+id+'">' + 
                '		<div class="visual" style="padding-top: 35px; margin-bottom: 40px;">' + 
                (isImg ? '<img src="' + src + '"/>' : '<i class="fa fa-' +getIcons()+ '"></i>') + 
                '		</div>' + 
                '		<div class="details">' + 
                '			<div class="number">' + 
                '				<span data-counter="counterup" data-value="20" style=\'font-family: "Open Sans",sans-serif;\'>20</span>' + 
                '			</div>' + 
                '			<div class="desc">'+title+'</div>' + 
                '		</div>' + 
                '	</a>' + 
                '</div>'
    }

    function builds(html, selector) {
        if (html && selector)
            $(selector).append(html);
    }

    function layoutByCongfig(datas, selector) {
        var items = datas || [];
        $.each(items, function (i , item) {
            if(item.showAtDesk === true)
                builds(packs(item), selector);
        });
    }
    
    function layoutCardByCongfig(datas, selector) {
        var items = datas || [];
        $.each(items, function (i , item) {
            if(item.showAtDesk === true)
                builds(packCards(item), selector);
        });
    }

    return {
        //main function to initiate the module
        init: function (selector) {
            this.selector = selector || '.page-content .tiles';
        },
        doLayout: function (items) {
            layoutByCongfig(items, this.selector);
            var cardSelector = ".page-content .tab-content .row";
            layoutCardByCongfig(items, cardSelector);
            $(this.selector).on('click', '.tile', function (e) {
                PageTab.create($(this).attr('id'));
            });
            $(cardSelector).on('click', '.dashboard-stat', function (e) {
                PageTab.create($(this).attr('id'));
            });
            $().counterUp && $("[data-counter='counterup']" , '.page-content .row').counterUp({
                delay: 10,
                time: 1000
            })
        }
    };
}();