/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PageTopMenu = function () {
    var information='<div class="portlet box blue">\n' +
        '    <div class="portlet-title">\n' +
        '        <div class="caption">\n' +
        '            <i class=" icon-wrench"></i>个人设置\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="portlet-body">\n' +
        '        <div class="row">\n' +
        '            <div class="col-md-3 col-sm-3 col-xs-3">\n' +
        '                <ul class="nav nav-tabs tabs-left">\n' +
        '                    <li style="font-size: 20px">基础信息</li>\n' +
        '                    <li class="active">\n' +
        '                        <a href="#tab_6_1" data-toggle="tab" aria-expanded="true">\n' +
        '                            <i class=" icon-wrench"></i>修改密码 </a>\n' +
        '                    </li>\n' +
        '                    <li class="">\n' +
        '                        <a href="#tab_6_2" data-toggle="tab" aria-expanded="false">\n' +
        '                            <i class="  icon-user"></i>个人信息 </a>\n' +
        '                    </li>\n' +
        '                </ul>\n' +
        '            </div>\n' +
        '            <div class="col-md-9 col-sm-9 col-xs-9">\n' +
        '                <div class="tab-content">\n' +
        '                    <div class="tab-pane active in" id="tab_6_1">\n' +
        '                        <div class="portlet box">\n' +
        '                            <div class="portlet-title">\n' +
        '                                <div class="caption font-blue-sharp">\n' +
        '                                    <span class="caption-subject">更新密码</span>\n' +
        '                                </div>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <div class="portlet-body form">\n' +
        '                                <form class="form-horizontal" role="form" id="resetPwd">\n' +
        '                                    <div class="form-body">\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label for="oldpasswd" class="col-md-3 control-label">旧密码：</label>\n' +
        '                                            <div class="col-md-9">\n' +
        '                                                <input type="password" id="oldpasswd" name="oldpasswd"\n' +
        '                                                       class="form-control input-inline input-medium">\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label for="passwd" class="col-md-3 control-label">新密码：</label>\n' +
        '                                            <div class="col-md-9">\n' +
        '                                                <input type="password" id="passwd" name="passwd"\n' +
        '                                                       class="form-control input-inline input-medium">\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label for="confirm_passwd" class="col-md-3 control-label">确认密码：</label>\n' +
        '                                            <div class="col-md-9">\n' +
        '                                                <input type="password" id="confirm_passwd" name="confirm_passwd"\n' +
        '                                                       class="form-control input-inline input-medium">\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="form-actions right">\n' +
        '                                            <button type="submit" class="btn blue" id="resetPwdBtn">保存</button>\n' +
        '                                            <button type="button" class="btn default btnClose">关闭</button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </form>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="tab-pane fade" id="tab_6_2">\n' +
        '                        <div class="portlet box">\n' +
        '                            <div class="portlet-title">\n' +
        '                                <div class="caption font-blue-sharp">\n' +
        '                                    <span class="caption-subject">个人信息</span>\n' +
        '                                </div>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <div class="portlet-body form">\n' +
        '                                <form class="form-horizontal" role="form" id="personal">\n' +
        '                                    <div class="form-body">\n' +
        '                                        <div class="left col-md-5">\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="real_name" class="col-md-4 control-label">真实姓名：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <input type="text" id="real_name" name="real_name"\n' +
        '                                                           class="form-control input-inline input-medium">\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="email" class="col-md-4 control-label">电子邮件：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <input type="text" id="email" name="email"\n' +
        '                                                           class="form-control input-inline input-medium">\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="phone" class="col-md-4 control-label">电话：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <input type="text" id="phone" name="phone"\n' +
        '                                                           class="form-control input-inline input-medium">\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="phone_home" class="col-md-4 control-label">家庭电话：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <input type="text" id="phone_home" name="phone_home"\n' +
        '                                                           class="form-control input-inline input-medium">\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="celler" class="col-md-4 control-label">手机：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <input type="text" id="celler" name="celler"\n' +
        '                                                           class="form-control input-inline input-medium">\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="duty" class="col-md-4 control-label">职责说明：</label>\n' +
        '                                                <div class="col-md-8">\n' +
        '                                                    <div class="controls"><textarea class="form-control" id="duty"\n' +
        '                                                                                    rows="3" placeholder="职责说明"\n' +
        '                                                                                    name="duty"></textarea></div>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '\n' +
        '                                        </div>\n' +
        '                                        <div class="col-md-7">\n' +
        '                                            <div class="form-group">\n' +
        '                                                <label for="" class="col-md-3 control-label">照片：</label>\n' +
        '                                                <div class="col-md-9">\n' +
        '                                                    <div class="fileinput fileinput-new" data-provides="fileinput">\n' +
        '                                                        <div class="fileinput-preview thumbnail"\n' +
        '                                                             data-trigger="fileinput"\n' +
        '                                                             style="width: 100px; height: 100px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' +
        '                                                            <img id="e" src="" alt="" style="width:100%;height:100%">\n' +
        '                                                        </div>\n' +
        '                                                        <span class="btn blue fileinput-button">                    <i\n' +
        '                                                                class="fa fa-plus"></i>                                                    <span>选择图片</span>                                                    <input\n' +
        '                                                                type="file" name="file">                                                     <input\n' +
        '                                                                type="hidden" value="" name="default_icon_url" id="">                </span>\n' +
        '                                                        <a href="javascript:;"\n' +
        '                                                           class="btn blue fileinput-exists"\n' +
        '                                                           data-dismiss="fileinput">\n' +
        '                                                            取消 </a></div>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="form-actions right col-md-12 ">\n' +
        '                                            <button type="submit" class="btn blue" id="personalBtn">保存</button>\n' +
        '                                            <button type="button" class="btn default btnClose">关闭</button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </form>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    function personalModal() {
        return '<div class="modal fade bs-modal-full in " id="information"  tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">' +
            '<div class="modal-dialog modal-full" style="margin: 0">\n' +
            '        <div class="modal-content">\n' +
            '          <div class="modal-header">\n' +
            '              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '              <h4 class="modal-title ">个人设置</h4>\n' +
            '          </div>\n' +
            '               <div class="modal-body">'+information+'</div>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '   </div>\n'

    }
    function lockScreen() {
        return ' <div id="overlay">\n' +
            '                <div class="page-lock">\n' +
            '                    <div class="page-body">\n' +
            '                    <img class="page-lock-img" src="../metronic/assets/admin/layout/img/timg.png" alt="">\n' +
            '                        <div class="page-lock-info">\n' +
            '                                    <h1 id="LoginuserName">Locked</h1>\n' +
            '                                    <div class="alert alert-danger display-hide" id="loginalertdiv">\n' +
            '                    <button class="close" data-close="alert"></button>\n' +
            '                    <span id="loginalert"> 请输入密码. </span>\n' +
            '                </div>\n' +
            '                                    <form class="form-inline" id="lockForm">\n' +
            '                                            <div class="input-group input-medium">\n' +
            '                                                    <input type="password" autocomplete="off" class="form-control" placeholder="Password" name="usrPwd" id="usrPwd">\n' +
            '                                                    <span class="input-group-btn">\n' +
            '                                                    <button type="submit" id="unlocked" class="btn blue icn-only"><i class="m-icon-swapright m-icon-white"></i></button>\n' +
            '                                                    </span>\n' +
            '                                            </div>\n' +
            '                                            <!-- /input-group -->\n' +
            '                                            <div class="relogin">\n' +
            '                                                    <a href="/newlogin/index.html">\n' +
            '                                                    其他户用登陆？ </a>\n' +
            '                                            </div>\n' +
            '                                    </form>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '           </div>'
    }
    function messageModal () {
        return '<div class="modal fade bs-modal-lg" id="messageModal" style="display: none;">' +
            '      <div class="modal-dialog modal-lg" style="margin:0;">'+
            '       <div class="modal-content">'+
            '           <div class="modal-header">' +
            '               <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '               <h4 class="modal-title">待处理消息</h4>' +
            "           </div>\n" +
            '        <div class="modal-body" id="messageModal-box">\n' +

            "           </div>\n" +
            "</div>";
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
                $.each(list,function (i) {
                   total+=list[i].msg.length;
                })
            }
        });
        return total===0?"":total
    }
    function packs(config) {
        return '<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">' +
                    '<a href="javascript:;" id="message" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">' +
                        '<i class="icon-speech"></i>' +
                        '<span class="badge badge-default">'+config.total+'</span>' +
                    '</a>'+
                '</li>'+personalModal()+lockScreen()+messageModal();
    }
    function builds(html , selector) {
        if (html && selector)
            $(selector).prepend(html);
    }
    function layoutByConfig(selector) {
        builds(packs({total:getTotals()}) , selector);
    }
    return {
        //main function to initiate the module
        init: function (selector) {
            this.selector = selector || '.top-menu .nav';
            layoutByConfig(this.selector);
        }

    };

}();