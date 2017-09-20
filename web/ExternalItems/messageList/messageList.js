+function ($) {
    PageSystem.loadJS('../../metronic/assets/global/plugins/datatables/media/js/jquery.dataTables.js');
    PageSystem.loadJS('../../metronic/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js');

    function getTable(result){
        var res=eval('('+result+')');
        var list=res.datas;
        console.log(list);
        $.each(list,function (i) {
            var resultData=list[i].msg;
            var html="";
            html+='<div class="portlet box blue">\n' +
                '<div class="portlet-title">\n' +
                '<div class="caption">'+list[i].title+'</div>\n' +
                '<div class="tools">\n' +
                '<a href="javascript:;" class="collapse" data-original-title="" title="">\n</a>\n' +
                '<a href="javascript:;" class="reload" data-original-title="" title="">\n' + '</a>\n' +
                '<a href="javascript:;" class="remove" data-original-title="" title="">\n' + '</a>\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="portlet-body" style="max-height:215px;overflow: scroll">\n' +
                ' <table class="table table-striped table-bordered table-hover" id="message-'+list[i].appid+'" >' +
                '<thead>'+
                '<tr>'+
                '<td></td>' +
                '<td>标题</td>' +
                '<td>时间</td>' +
                '</tr>'+
                '</thead>'+
                '<tbody id="tbody'+list[i].appid+'"></tbody>'+
                '</table>'+
                '</div>\n' +
                '</div>';

                $("#messageModal-box").append(html);

            for(var j=0; j<resultData.length;j++){
                var tr="",
                    num=j+1;
                tr+='<tr><td>'+num+'</td><td><a href="'+resultData[j].url+'" target="_blank" style="display: block;text-decoration: none;color:black">'+resultData[j].title+'</a></td><td>'+resultData[j].date+'</td></tr>';
                $("#tbody"+list[i].appid).append(tr);
            }

        });


    }


    $(document).on("click","#message",function (e) {

        e.preventDefault();
        var timer=null;
        $.ajax({
            type:"post",
            url:"../ExternalItems/messageList/messageList.jcp",
            async:true,
            beforeSend:function () {
                $(".loading-mask").show();
                var process=0;
                timer= setInterval(function () {
                    process=Math.min(98,++process)
                    console.log(process)
                     $(".loading-process").html(process+"%")
                },50)


            },
            success:function (result) {
                $(".loading-process").html(100+"%");
                clearInterval(timer)
                $(".loading-mask").hide()
                $("#messageModal-box").empty();
                getTable(result);
                var tag=$("#messageModal");
                tag.modal("show");
            }
        });
    });

}(jQuery);