+function ($) {
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js');
    PageSystem.loadJS('/metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js');

    function messageList(list){
        console.log(list)
        $("#message-container").html("");
        $.each(list,function (i) {
            var resultData=list[i].msg;
            for(var j=0; j<resultData.length;j++){
                var html="";
                html+=' <li class="message-box row">\n' +
                    '      <a href="'+resultData[j].url+'" data-value="'+list[i].appid+'" target="_blank" class="message-link">'+
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
            }
            $("#message-container").append(html);
        });
    }
    
    function getTotals() {
        var total=0;
        PageTile.resetCardNumber();
        $.ajax({
            type:"post",
            url:"/ExternalItems/messageList/messageList.jcp",
//            async:false,
            success:function (result) {
                var res=eval('('+result+')');
                var list=res.datas;
                $.each(list,function (i) {
                    var currentTotal = list[i].msg.length;
                    total+=currentTotal;
                    PageTile.setCardNumber(list[i].appid , list[i].realcount || currentTotal);
                });
                $(".message-count").html(total === 0 ? "" : total);
                PageTile.counterupNumber($("#message-button"));
            }
        });
    }
    getTotals();
    $(document).on("click","#message-button",function (e) {
        e.preventDefault();
        if(!$('body').hasClass('page-quick-sidebar-open')){
            getTotals();   
        } else {
            $.ajax({
            type:"post",
            url:"/ExternalItems/messageList/messageList.jcp",
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
                messageList(list);
                $("#message-button .message-count").html("");
            }
        });
        }
        
    });
    $(document).on("click",".message-box a",function (e) {
        $(this).find(".message-img-box").children("i").removeClass().addClass("icon-envelope-open");
    });
    
    $("#tm_desktop").on("click", function(){
        getTotals();
    });
    $("#quick-sidebar-closeBtn").on("click",function () {
        getTotals();
    })
}(jQuery);
