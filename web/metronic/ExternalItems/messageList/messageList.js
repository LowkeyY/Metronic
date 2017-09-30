+function ($) {
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js');
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js');

    function messageList(list){
        $.each(list,function (i) {
            var resultData=list[i].msg;
            for(var j=0; j<resultData.length;j++){
                var html="";
                html+=' <li class="message-box row">\n' +
                    '      <a href="'+resultData[j].url+'" target="_blank" id="message-link">'+
                    '           <div class="message-img-box">\n' +
                    '                <i class=" icon-envelope"></i>\n' +
                    '           </div>\n' +
                    '                   <div class="message-content clearfix">\n' +
                    '                       <h4 class="message-title">'+resultData[j].title+'</h4>\n' +
                    '                       <div class="message-time">'+resultData[j].date+'</div>\n' +
                    '            </div>\n' +
                    '            <span class="badge badge-danger message-counts">0</span>\n' +
                    '      </a>'+
                    '    </li>';
                $("#message-container").append(html);
            }
        });
    }
    function getTotals() {
        var total=0;
        $.ajax({
            type:"post",
            url:"../ExternalItems/messageList/messageList.jcp",
            async:false,
            success:function (result) {
                var res=eval('('+result+')');
                var list=res.datas;
                console.log(list)
                $.each(list,function (i) {
                    total+=list[i].msg.length;
                    $("#"+list.appid).children(".details").children(".number").find("span").html(list)
                })
            }
        });
        $(".message-count").html(total===0?"":total)
    }
    getTotals();
    $(document).on("click","#message-button",function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"../ExternalItems/messageList/messageList.jcp",
            beforeSend:function () {
                Metronic.blockUI({
                    target: '.page-quick-sidebar-wrapper',
                    animate: true
                });
            },
            success:function (result) {
                Metronic.unblockUI('.page-quick-sidebar-wrapper');
                var res=eval('('+result+')');
                var list=res.datas;
                messageList(list)
            }
        });
    });
    $(document).on("click",".message-box a",function (e) {
            $(this).find(".message-img-box").children("i").removeClass().addClass("icon-envelope-open")

    })

}(jQuery);