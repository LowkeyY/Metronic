+(function ($) {
    PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");

    function initResetForm(selector) {
        var form = $("#resetPwd");
        var resetVaildate=form.validate({
            errorElement: "span",
            focusInvalid: false,
            errorClass: "help-block help-block-error",
            ignore: "",
            rules: {
                oldpasswd: {minlength: 2, required: true},
                passwd: {minlength: 2, required: true},
                confirm_passwd: {equalTo: "#passwd"}
            },
            messages: {
                oldpasswd: {minlength: jQuery.validator.format("密码不能小于 {0} 个字符"), required: "旧密码必须填写。"},
                passwd: {minlength: jQuery.validator.format("密码不能小于 {0} 个字符"), required: "密码必须填写。"},
                confirm_passwd: {equalTo: "两次输入密码不一致。"}

            },
            highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            submitHandler: function (form) {
                var oldpwd = $("#oldpasswd").val();
                var pwd = $("#passwd").val();
                var data = {task: "save", what: "password", passwd: pwd, oldpasswd: oldpwd, moduleId: "preferences"};
                $.ajax({
                    type: "post",
                    url: "./system/setup.jcp",
                    data: data,
                    success: function (res) {

                        res = eval("(" + res + ")");
                        if (res.success) {
                            toastr.success("密码修改成功");
                            $(selector).modal("hide");

                        } else {
                            toastr.error(res.message, "密码修改失败");
                        }

                    }
                });
            }
        })
        $("#person").on("click", function () {
            resetVaildate.resetForm();
        });

    }
    function initPersonalForm(selector) {
        var form = $("#personal");
       var resetVaildate= form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: false,
            ignore: "",
            rules: {
                real_name:{required: true},
                email: {email: true}
            },
            messages: {
                real_name:{required:"请输入真实姓名"},
                email: {email: "必须输入邮件格式。"}
            },
            highlight: function (element) {
                $(element).closest(".form-group").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest(".form-group").removeClass("has-error");
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            submitHandler: function (form) {
                var ifm = $(form).serialize() + "&task=save" + "&what=profile";
                $.ajax({
                    type: "post",
                    url: "./system/setup.jcp",
                    data: ifm,
                    success: function (res) {
                        console.log(res);
                        toastr.success("修改成功");
                        $(selector).modal("hide");
                    }
                });

            }
        });
        $("#person").on("click", function () {
            resetVaildate.resetForm();
        });
    }

    function getData() {
        $.ajax({
            type: "post",
            url: "./system/setup.jcp?",
            data: {
                moduleId: "preferences",
                task: "load",
                what: "profile"
            },
            dataType: "json",
            success: function (data) {
                if(data){
                    loadData(data[0])
                }
            }
        });
    }
    function loadData(jsonStr) {
        var obj = jsonStr;
        var key, value, tagName, type, arr;
        for (x in obj) {
            key = x;
            value = obj[x];
            $("[name='" + key + "'],[name='" + key + "[]']").each(function () {
                tagName = $(this)[0].tagName;
                type = $(this).attr("type");
                if (tagName == "INPUT") {
                    if (type == "radio") {
                        $(this).attr("checked", $(this).val() == value);
                    } else {
                        if (type == "checkbox") {
                            arr = value.split(",");
                            for (var i = 0; i < arr.length; i++) {
                                if ($(this).val() == arr[i]) {
                                    $(this).attr("checked", true);
                                    break;
                                }
                            }
                        } else {
                            $(this).val(value);
                        }
                    }
                } else {
                    if (tagName == "SELECT" || tagName == "TEXTAREA") {
                        $(this).val(value);
                    }
                }
            });
        }
    }
    function getSysConf() {

        $.ajax({
            url:"../login/logout.jcp"
        })

    }

    $("#person").on("click", function (e) {
        e.preventDefault();
        $("#resetPwd input").val("");
        var tag = $("#information");
        tag.modal("show");
        getData();
    });

    $(document).on("click", "#resetPwdBtn",function (e) {
            var tag = $("#information");
            initResetForm(tag);
        });
    $(document).on("click","#personalBtn",function (e) {
        var tag = $("#information");
        initPersonalForm(tag);
    });
    $(document).on("click",".btnClose",function (e) {
        var tag = $("#information");
        tag.modal("hide");
    });
    $("#lockScreen").on("click",function (e) {
        getSysConf()
        $("#lockForm input").val("");
        $.blockUI({
            message:$("#overlay"),
            css:{

                opacity:1,
                backgroundColor:'#fff',
                border:'0 none'
            },
            overlayCSS:  {
                backgroundColor: '#000',
                opacity:         0.9,
                cursor:          'wait'
            }
        })
    });
    $(document).on("click","#unlocked",function (e) {

                e.preventDefault()

                var username=PageSystem.userConfig().user_name
                var password = $("#usrPwd").val();
                password=hex_md5(password)
                 console.log(usrPwd)
               var data={
                   username:username,
                   password:password
                };
                $.ajax({
                    type: "post",
                    url: "../newlogin/login.jjs",
                    data: data,
                    dataType:"json",
                    success: function (res) {
                        if(res.success){
                            $.unblockUI()
                        }else{
                            toastr.error("请输入正确的密码");
                        }
                    }
                });
    })


})(jQuery);