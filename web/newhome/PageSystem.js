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
    var userConfig = {}, PotalVersion = "1.0",
        colors = ['blue', 'green', 'yellow', 'purple', 'red', 'red-pink', 'grey-cascade'],
        roleArray = [];

    function getColor() {
        colors = colors.concat(colors[0]);
        return colors.shift(0);
    }

    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    function isObject(o) {
        return o && Object.prototype.toString.apply(o) === "[object Object]";
    }


    function isPotal(conf) {
        return isObject(conf) && conf.hasOwnProperty("sys_app_id");
    }

    function isSystemMenus(conf) {
        return isObject(conf) && conf.hasOwnProperty("submenu") && isArray(conf.submenu);
    }

    function isIframe(url) {
        if (url && /^((https|http|ftp|rtsp|mms)?:\/\/)/i.test(url))
            return true;
        return false;
    }

    function getPotalBaseConf(conf) {
        if (isPotal(conf)) {
            var result = getUserBaseConf();
            result["appid"] = conf.sys_app_id;
            result["apptoken"] = conf.default_token;
            return result;
        }
        return {};
    }

    function getUserBaseConf() {
        var o = {}, tk = userConfig.userToken;
        if (tk && (tk = tk.split("::")).length > 1) {
            o["username"] = tk[0];
            o["userpwd"] = tk[1];
        }
        return o;
    }

    function replaceBaseParam(url, o) {
        if (!o) o = getUserBaseConf();
        while (r = /@\[(.+?)\]/ig.exec(url)) {
            var v = r[1];
            if (!(v && (v = o[v.toLowerCase()])))
                v = "";
            url = url.replace(r[0], v)
        }
        return url;
    }

    function packPotalConfig(conf) {
        var o = getPotalBaseConf(conf);
        for (var att in conf)
            if (conf.hasOwnProperty(att) && /(_url|_value)$/i.test(att))
                conf[att] = replaceBaseParam(conf[att], o);
    }

    function packMenuIcon(icon, defaultIcon) {
        return icon || defaultIcon || "tag";
    }

    function packMenu(conf) {
        var result = {}
        packPotalConfig(conf);
        result.id = conf.sys_app_id;
        result.title = conf.default_title;
        result.path = conf.default_url;
        result.showAtDesk = conf.show_desktop_isValid === "true";
        result.deskIcon = packMenuIcon(conf.show_desktop_icon_url, conf.default_icon_url);
        result.isImgDeskIcon = /[\/\.]+?/g.test(result.deskIcon);
        result.showAtSide = conf.show_startmenu_isValid === "true";
        result.sideIcon = packMenuIcon(conf.show_startmenu_icon_url, conf.default_icon_url);
        result.isImgSideicon = /[\/\.]+?/g.test(result.sideIcon);
        result.isIframe = isIframe(result.path);
        return result;
    }

    function packSysMenus(conf) {
        conf.isIframe = false;
        conf.sideIcon = "settings";
        conf.isImgSideicon = false;
        $.each(conf.submenu, function (i, item) {
            packSysMenu(item);
        });
        return conf;
    }

    function packSysMenu(conf) {
        conf.path = 'metronic.' + conf.path;
        conf.isIframe = false;
    }

    function getMenuItems(items) {
        var result = [];
        if (items && items.length)
            $.each(items, function (i, item) {
                var is = isPotal(item);
                if (is || isSystemMenus(item))
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
                console.log(result);
                if (result.success) {
                    userConfig = result.config;
                    var menuItems = getMenuItems(result.menu),
                        res = result.config.metronicSets;
                    if (menuItems.length) {
                        PageSidebar.doLayout(menuItems);
                        PageTile.doLayout(menuItems);
                        PageTopMenu.doLayout();
                    }
                    if (userConfig.hasOwnProperty("user_id")) {
                        if (userConfig.user_id.match(/^(0|1)$/))
                            $("#person-info-box").hide();
                        else
                            $("#person-info-box").show();
                    }
                    if (userConfig.hasOwnProperty("real_name") && userConfig.real_name) {
                        $('.username', '.top-menu .dropdown.dropdown-user').html(userConfig.real_name);
                        $("#LoginuserName").html(userConfig.real_name);
                    }
                    if (res) {
                        res = JSON.parse(res);
                        getSettings(res)
                        $("#theme-settings-cancel,#setting-close-btn").on("click", function (e) {
                            getSettings(res);
                            $(".theme-options,.toggler-close").hide();
                        })
                    }
                    if (result.config.photo) {
                        var path = result.config.photo;
                        var src = "/lib/upload/download.jcp?fileid=" + path.id + "&r=" + Math.random();
                        $("#nav-user-icon").attr("src", src);
                        $(".page-lock-img").attr("src", src);
                    }
                }
            },
            error: function () {
                location.href = "/newlogin/index.html";
            }
        });
    }
    //handle theme layout
    var resetLayout = function() {
        $("body").
        removeClass("page-boxed").
        removeClass("page-footer-fixed").
        removeClass("page-sidebar-fixed").
        removeClass("page-header-fixed").
        removeClass("page-sidebar-reversed");

        $('.page-header > .page-header-inner').removeClass("container");

        if ($('.page-container').parent(".container").size() === 1) {
            $('.page-container').insertAfter('body > .clearfix');
        }

        if ($('.page-footer > .container').size() === 1) {
            $('.page-footer').html($('.page-footer > .container').html());
        } else if ($('.page-footer').parent(".container").size() === 1) {
            $('.page-footer').insertAfter('.page-container');
            $('.scroll-to-top').insertAfter('.page-footer');
        }

        $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");

        $('body > .container').remove();
    };
    function getSettings(res) {
        var panel = $('.theme-panel');
        $('.layout-option', panel).val(res.layout);
        $('.sidebar-option', panel).val(res.sidebar);
        $('.layout-style-option', panel).val(res.layoutstyle);
        $('.page-header-option', panel).val(res.pageHeader);
        $('.page-footer-option', panel).val(res.footer);
        $('.sidebar-pos-option', panel).val(res.sidebarPos);
        $('.sidebar-style-option', panel).val(res.sidebarStyle);
        $('.sidebar-menu-option', panel).val(res.sidebarMenu);
        $('.page-header-top-dropdown-style-option', panel).val(res.topDropdown);
        $("#style_color").attr("href", "/metronic/assets/admin/layout/css/themes/" + res.themeColor + ".css");
        var layoutOption = $('.layout-option', panel).val();
        var sidebarOption = $('.sidebar-option', panel).val();
        var layoutStyle = $('.layout-style-option', panel).val();
        var headerOption = $('.page-header-option', panel).val();
        var footerOption = $('.page-footer-option', panel).val();
        var sidebarPosOption = $('.sidebar-pos-option', panel).val();
        var sidebarStyleOption = $('.sidebar-style-option', panel).val();
        var sidebarMenuOption = $('.sidebar-menu-option', panel).val();
        var headerTopDropdownStyle = $('.page-header-top-dropdown-style-option', panel).val();
        //color

        var link = (layoutStyle === 'square' ? 'components' : 'components-rounded' );
        link = (Metronic.isRTL() ? link + '-rtl' : link);

        $('#style_components').attr("href", "/metronic/assets/global/css/" + link + ".css");

        if ($.cookie) {
            $.cookie('layout-style-option', layoutStyle);
        }

        if (sidebarOption == "fixed" && headerOption == "default") {
            bootbox.alert('13');
            $('.page-header-option', panel).val("fixed");
            $('.sidebar-option', panel).val("fixed");
            sidebarOption = 'fixed';
            headerOption = 'fixed';
        }
        resetLayout(); // reset layout to default state

        if (layoutOption === "boxed") {
            $("body").addClass("page-boxed");

            // set header
            $('.page-header > .page-header-inner').addClass("container");
            var cont = $('body > .clearfix').after('<div class="container"></div>');

            // set content
            $('.page-container').appendTo('body > .container');

            // set footer
            if (footerOption === 'fixed') {
                $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
            } else {
                $('.page-footer').appendTo('body > .container');
            }
        }


        //header
        if (headerOption === 'fixed') {
            $("body").addClass("page-header-fixed");
            $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
        } else {
            $("body").removeClass("page-header-fixed");
            $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
        }

        //sidebar
        if ($('body').hasClass('page-full-width') === false) {
            if (sidebarOption === 'fixed') {
                $("body").addClass("page-sidebar-fixed");
                $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                Layout.initFixedSidebarHoverEffect();
            } else {
                $("body").removeClass("page-sidebar-fixed");
                $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");
                $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
            }
        }

        // top dropdown style
        if (headerTopDropdownStyle === 'dark') {
            $(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark");
        } else {
            $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");
        }

        //footer
        if (footerOption === 'fixed') {
            $("body").addClass("page-footer-fixed");
        } else {
            $("body").removeClass("page-footer-fixed");
        }

        //sidebar style
        if (sidebarStyleOption === 'light') {
            $(".page-sidebar-menu").addClass("page-sidebar-menu-light");
        } else {
            $(".page-sidebar-menu").removeClass("page-sidebar-menu-light");
        }

        //sidebar menu
        if (sidebarMenuOption === 'hover') {
            if (sidebarOption == 'fixed') {
                $('.sidebar-menu-option', panel).val("accordion");
                bootbox.alert("14");
            } else {
                $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu");
            }
        } else {
            $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu");
        }

        //sidebar position
        if (Metronic.isRTL()) {
            if (sidebarPosOption === 'left') {
                $("body").addClass("page-sidebar-reversed");
                $('#frontend-link').tooltip('destroy').tooltip({
                    placement: 'right'
                });
            } else {
                $("body").removeClass("page-sidebar-reversed");
                $('#frontend-link').tooltip('destroy').tooltip({
                    placement: 'left'
                });
            }
        } else {
            if (sidebarPosOption === 'right') {
                $("body").addClass("page-sidebar-reversed");
                $('#frontend-link').tooltip('destroy').tooltip({
                    placement: 'left'
                });
            } else {
                $("body").removeClass("page-sidebar-reversed");
                $('#frontend-link').tooltip('destroy').tooltip({
                    placement: 'right'
                });
            }
        }
        //color
        var color = res.themeColor;
        $(".theme-colors > ul > li[data-style=" + color + "]").addClass("current").siblings().removeClass("current");
        Layout.fixContentHeight(); // fix content height
        Layout.initFixedSidebar(); // reinitialize fixed sidebar

    }

    function getRoleArr() {
        $.ajax({
            type: "GET",
            url: "/bin/user/rolelist.jcp?dept_id=0",
            dataType: "json",
            async: false,
            success: function (data) {
                var arr = data.dataItem,
                    len = arr.length;
                roleArray = [];
                for (var i = 0; i < len; i++) {
                    var obj = {};
                    var roleName = arr[i]["职位名称"],
                        roleId = arr[i]["序号"];
                    obj.text = roleName;
                    obj.id = roleId;
                    roleArray.push(obj);
                }

            }
        });
        return roleArray
    }

    function load(tag, src) {
        if (tag === "s") {
            if (!$('head').find('script[src="' + src + '"]').length)
                $('<script></script>').attr({src: src, type: 'text/javascript'}).appendTo($('head'));
        } else if (tag === "c") {
            if (!$('head').find('link[src="' + src + '"]').length)
                $('<link></link>').attr({src: src, type: 'text/css', rel: 'stylesheet'}).appendTo($('head'));
        }
    }

    function openWithBlank(url) {
        try {
            var iframe = document.createElement("iframe"), tagA = document.createElement("a");
            document.body.appendChild(iframe);
            tagA.setAttribute("href", url);
            tagA.setAttribute("target", "_blank");
            iframe.contentWindow.document.body.appendChild(tagA);
            tagA.click();
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 200);
        } catch (e) {
            var curWindow = window.open("", "_blank");
            curWindow.opener = null;
            curWindow.location = url;
        }
    }
    
    function toastrOptions() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    return {
        init: function () {
            getConfig();
            toastrOptions()
        },
        loadJS: function (src) {
            load('s', src);
        },
        loadCSS: function (src) {
            load('c', src);
        },
        get: function (key) {
            return userConfig[key] || '';
        },
        version: function () {
            return PotalVersion;
        },
        openWithBlank: function (url) {
            if (isIframe(url))
                openWithBlank(url);
        },
        getColor: function () {
            return getColor();
        },
        isArray: function (o) {
            return isArray(o);
        },
        isObject: function (o) {
            return isObject(o);
        },
        getRoleName: function () {
            return getRoleArr()
        },
        settings:function (res) {
            getSettings(res)
        }

    };
}();
