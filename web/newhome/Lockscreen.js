var LockScreen=function () {
    var  count=0,
        timeOut=10000*60,//10分钟执行一次
        lockTime=3,//锁定时间30分钟
        timer=null,
        x,
        y;
    //自动锁屏
    function locking() {
        count++;
        if (count === lockTime) {
            PageTopMenu.lockTimeout();
            clearInterval(timer)
        }
    }

    //监听鼠标
    document.onmousemove = function (event) {
        var x1 = event.clientX;
        var y1 = event.clientY;
        if (x != x1 || y != y1) {
            count = 0;
        }
        x = x1;
        y = y1;
    };

    //监听键盘
    document.onkeydown = function () {
        count = 0;
    };

    return {
        doLayout:function () {
            timer=window.setInterval(locking, timeOut);
        }
    }
}();