(function () {
    var isOpen = false, checkInstallTimer = "";
    function overCheck(status, message) {
        if (status === 2 || isOpen)
            return;
        if (checkInstallTimer)
            clearTimeout(checkInstallTimer);
        if (status) {
            openClient();
        } else {
            bootbox.confirm(message + "<br> 是否下载客服端?", function (result) {
                if (result === true) {
                    window.open("/sample/Client_4.1.34.rar");
                } else {
                    openClient();
                }
            });
        }
    }
    ;
    function checkInstall() {
        try {
            var b = new ActiveXObject("ANTSTARTCHECK.AntStartCheckCtrl.1");
            if (b != null) {
                openClient();
                return;
            }
        } catch (d) {
        }

        var host = "ws://localhost:8001/";
        try {
            var socket = new WebSocket(host);
            checkInstallTimer = setTimeout(function () {
                overCheck(0, "检测客户端安装情况，连接超时。")
            }, 1500);
            socket.onopen = function () {
                overCheck(1, "检测客户端安装情况，已安装完成。");
            }
            socket.onclose = function () {
                overCheck(2, "检测客户端安装情况，未安装客户端。");
            }
            socket.onerror = function () {
                overCheck(0, "检测客户端安装情况，未安装客户端。");
            }
        } catch (e) {
            overCheck(0, "检测客户端安装情况，客户端连接失败。");
        }
    }
    ;
    function openClient() {
        isOpen = true;
        var url = 'bigant://login/?server=192.168.0.196&port=81';
        var tk = PageSystem.get('userToken');
        if (tk && tk.indexOf("::") != -1) {
            var token = tk.split("::");
            if (token[0] == "admin") {
                url += ("&loginname=" + token[0] + "&password=123456789&startup=1&pwdtype=0");
            } else {
                url += ("&loginname=" + token[0] + "&password=" + token[1] + "&startup=1&pwdtype=1");
            }
            window.open(url, "_self");
        } else {
            bootbox.alert("获取信息失败，请刷新重试。");
        }
    }
    ;
    return {
        init: function () {
            try {
                if (WebSocket) {
                    checkInstall();
                } else
                    openClient();
            } catch (e) {
                openClient();
            }
        }
    }
})();