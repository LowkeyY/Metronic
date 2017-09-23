/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global PageTile, PageSidebar */

var PageSystem = function () {
    var userConfig = {} , PotalVersion = "1.0", colors = ['blue' , 'green', 'yellow', 'purple' , 'red' , 'red-pink' , 'grey-cascade'];

    function getColor(){
        colors = colors.concat(colors[0]);
        return colors.shift(0);
    }

    function isArray(o){
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    function isObject(o){
        return o && Object.prototype.toString.apply(o) === "[object Object]";
    }

    function isPotal(conf){
        return isObject(conf) && conf.hasOwnProperty("sys_app_id");
    }

    function isSystemMenus(conf){
        return isObject(conf) && conf.hasOwnProperty("submenu") && isArray(conf.submenu);
    }

    function isIframe(url){
        if(url && /^((https|http|ftp|rtsp|mms)?:\/\/)/i.test(url))
            return true;
        return false;
    }

    function getPotalBaseConf(conf){
        if(isPotal(conf)){
            var result = getUserBaseConf();
            result["appid"] = conf.sys_app_id;
            result["apptoken"] = conf.default_token;
            return result;
        }
        return {};
    }

    function getUserBaseConf(){
        var o = {} , tk = userConfig.userToken;
        if(tk && (tk = tk.split("::")).length > 1){
            o["username"] = tk[0];
            o["userpwd"] = tk[1];
        }
        return o;
    }

    function replaceBaseParam(url , o){
        if(!o) o = getUserBaseConf();
        while(r = /@\[(.+?)\]/ig.exec(url)){
            var v = r[1];
            if(!(v && (v = o[v.toLowerCase()])))
                v = "";
            url = url.replace(r[0] , v)
        }
        return url;
    }

    function packPotalConfig(conf){
        var o = getPotalBaseConf(conf);
        for(var att in conf)
            if(conf.hasOwnProperty(att) && /(_url|_value)$/i.test(att))
                conf[att] = replaceBaseParam(conf[att] , o);
    }

    function packMenuIcon(icon , defaultIcon){
        return icon || defaultIcon || "tag";
    }

    function packMenu(conf){
        var result = {}
        packPotalConfig(conf);
        result.id = conf.sys_app_id;
        result.title = conf.default_title;
        result.path = conf.default_url;
        result.showAtDesk = conf.show_desktop_isValid === "true";
        result.deskIcon = packMenuIcon(conf.show_desktop_icon_url , conf.default_icon_url);
        result.isImgDeskIcon = /[\/\.]+?/g.test(result.deskIcon);
        result.showAtSide = conf.show_startmenu_isValid === "true";
        result.sideIcon = packMenuIcon(conf.show_startmenu_icon_url , conf.default_icon_url);
        result.isImgSideicon = /[\/\.]+?/g.test(result.sideIcon);
        result.isIframe = isIframe(result.path);
        return result;
    }

    function packSysMenus(conf){
        conf.isIframe = false;
        conf.sideIcon = "settings";
        conf.isImgSideicon = false;
        $.each(conf.submenu, function (i , item) {
            packSysMenu(item);
        });
        return conf;
    }

    function packSysMenu(conf){
        conf.path = 'metronic.'+conf.path;
        conf.isIframe = false;
    }

    function getMenuItems(items){
        var result = [];
        if(items && items.length)
            $.each(items, function (i , item) {
                var is = isPotal(item);
                if(is || isSystemMenus(item))
                    result.push(is ? packMenu(item) : packSysMenus(item))
            });
        return result;
    }

    function getConfig() {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/newhome/system/getMenu.jjs",
            success: function (result) {
                if (result.success) {
                    userConfig = result.config;
                    var menuItems = getMenuItems(result.menu);
                    if (menuItems.length) {
                        PageSidebar.doLayout(menuItems);
                        PageTile.doLayout(menuItems);
                        PageTopMenu.doLayout();
                    }

                    if(userConfig.hasOwnProperty("user_id")){
                        if(userConfig.user_id.match(/^(0|1)$/))
                            $("#person-info-box").hide();
                        else
                            $("#person-info-box").show();
                    }
                    if (userConfig.hasOwnProperty("real_name") && userConfig.real_name){
                        $('.username', '.top-menu .dropdown.dropdown-user').html(userConfig.real_name);
                        $("#LoginuserName").html(userConfig.real_name);
                    }
                    var sysStyleColor = "light2";
                    $("#style_color").attr("href", "/metronic/assets/admin/layout/css/themes/" + sysStyleColor + ".css");
                }
            },
            error: function () {
                location.href = "/newlogin/index.html";
            }
        });
    }

    function load(tag , src){
        if(tag === "s"){
            if(!$('head').find('script[src="'+src+'"]').length)
                $('<script></script>').attr({src: src, type : 'text/javascript'}).appendTo($('head'));
        } else if(tag === "c"){
            if(!$('head').find('link[src="'+src+'"]').length)
                $('<link></link>').attr({src: src, type : 'text/css', rel : 'stylesheet'}).appendTo($('head'));
        }
    }


    function openWithBlank(url){
        try{
            var iframe = document.createElement("iframe") , tagA = document.createElement("a");
            document.body.appendChild(iframe);
            tagA.setAttribute("href", url);
            tagA.setAttribute("target", "_blank");
            iframe.contentWindow.document.body.appendChild(tagA);
            tagA.click();
            setTimeout(function() {
                document.body.removeChild(iframe);
            }, 200);
        } catch(e){
            var curWindow = window.open("" , "_blank");
            curWindow.opener = null;
            curWindow.location = url;
        }
    }

    return {
        init: function () {
            getConfig();

        },
        loadJS: function (src) {
            load('s' , src);
        },
        loadCSS : function(src){
            load('c' , src);
        },
        get:function(key){
            return userConfig[key] || '';
        },
        version : function(){
            return PotalVersion;
        },
        openWithBlank : function (url){
            if(isIframe(url))
                openWithBlank(url);
        },
        getColor : function(){
            return getColor();
        },
        isArray : function(o){
            return isArray(o);
        },
        isObject : function(o){
            return isObject(o);
        }
    };
}();
