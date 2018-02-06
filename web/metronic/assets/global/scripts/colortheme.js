+function ($) {
    var obj={
      init:function () {
          this.toggleColorTheme().changeTheme()
      },
      toggleColorTheme:function () {
          $("#theme-panel-color").on("click",function (e) {
              $(".toggler-close,.theme-options").show();
          });
          $(".toggler-close").on("click",function (e) {
              $(".theme-options,.toggler-close").hide();
          });
          return this
      },
        changeTheme:function () {
          $(".theme-option ul").on("click","li",function (e) {
             var themeLi=e.target,
                 theme=$(themeLi)[0].dataset.style,
                 link=$("#style_color")
             $(themeLi).addClass("current").siblings().removeClass("current");
              link.attr("href","/metronic/assets/admin/layout/css/themes/"+theme+".css");

          });
            return this
        },
        ajax:function (e) {
            var themeLi=$(".theme-option ul .current"),
                theme=$(themeLi)[0].dataset.style;

            $.ajax({
                type:"post",
                url:"/home/system/setup.jcp",
                data:{
                    what:"metronicStyleColor",
                    task:"save",
                    ids:theme
                },
                success:function () {
                    $(".theme-options,.toggler-close").hide();
                }
            })
        }
    };
obj.init();
        $("#theme-colors-submit").on("click",function (e) {
            obj.ajax()
        });
        $("#theme-colors-cancel").on("click",function (e) {
            $(".theme-options,.toggler-close").hide();
        })
}(jQuery);