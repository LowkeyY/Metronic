
(function () {
    PageSystem.loadJS("/metronic/dev/potal/collocation.js");
    var selectSysId = "",portletColor = PageSystem.getColor();
    function rightHtml() {
        return '<form class="form-horizontal" role="form" id="baseForm">\n' +
            '<div class="portlet box '+portletColor+' ">\n' +
            '    <div class="portlet-title row" style="margin-left:0;margin-right:0">\n' +
            '        <div class="caption">\n' +
            '            <i class="fa fa-cubes"></i>\n' +
            '            集成管理\n' +
            '        </div>\n' +
            '        <div class="clearfix" style="padding-top:5px;">\n' +
            '        <div style="float:right">\n' +
            '        <div>\n' +
            '               <button type="submit" class="btn default" id="createSys"><i class="fa fa-edit"></i>保存</button>\n' +
            '               <button type="submit" class="btn default" id="emptySys"><i class="fa fa-reply-all">清空</i></button>\n' +
            '               <button type="button" class="btn default" id="deleteSys"><i class="fa fa-trash"></i>删除</button>\n' +
            '               <button type="submit" class="btn default" id="send-data"><i class="fa fa-send"></i>发送全量数据</button>\n' +
            '         </div>\n' +
            '         </div>\n' +
            '         </div>\n' +
            '    </div>\n' +
            '    <div class="portlet-body form">\n' +
            '            <div class="form-body"style="padding-left:25px">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-md-12">\n' +
            '                        <div class="portlet gray">\n' +
            '                            <div class="portlet-title">\n' +
            '                                <div class="caption"><i class="fa fa-calendar"></i>基础属性</div>\n' +
            '                            </div>\n' +
            '                            <div class="portlet-body">\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label"  for="default_title">导航标题：</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="input-icon right">\n' +
            '                                            <input type="text" class="form-control input-inline input-large " id="default_title" name="default_title">\n' +
            '                                        </div>\n' +
            '                                        \n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label for="default_seq" class="col-md-3 control-label">顺序：</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <input type="text" class="form-control input-inline input-small " id="default_seq" name="default_seq">\n' +
            '                                    </div>\n' +
            '                                    \n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label for="default_token" class="col-md-3 control-label">token:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <input type="text" class="form-control input-inline input-medium " id="default_token" name="default_token" readonly>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">权限模式:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="default_has_auth" name="default_has_auth" value="false" class="md-radiobtn">\n' +
            '                                                    <label for="default_has_auth">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        无权限控制\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="default_no_auth" name="default_has_auth" class="md-radiobtn" value="true" checked="">\n' +
            '                                                    <label for="default_no_auth">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>权限控制\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">启用:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="using" name="default_isValid" value="true" class="md-radiobtn">\n' +
            '                                                    <label for="using">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        是\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="not-use" value="false" name="default_isValid" class="md-radiobtn" checked="">\n' +
            '                                                    <label for="not-use">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        否\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">自动运行:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="default_autoRunRG-open" name="default_autoRunRG" value="true" class="md-radiobtn">\n' +
            '                                                    <label for="default_autoRunRG-open">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        是\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="default_autoRunRG-stop" name="default_autoRunRG" value="false" class="md-radiobtn" checked="">\n' +
            '                                                    <label for="default_autoRunRG-stop">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        否 </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">默认图标(48x48):</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="fileinput fileinput-new" data-provides="fileinput">\n' +
            '                                            <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 48px; height: 48px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' +
            '                                                 <img id="default-icon" src="" alt="" style="width:100%;height:100%">\n' +
            '                                            </div>\n' +
            '                                             <span class="btn '+portletColor+' fileinput-button">\n' +
            '                                                 <i class="fa fa-plus"></i>\n' +
            '                                                 <span>选择图片</span>\n' +
            '                                                 <input type="file" data-type="default_icon_url" name="file"><input type="hidden" value="" name="default_icon_url" id="default_icon_url">\n' +
            '                                             </span>\n' +
            '                                             <a href="javascript:;"  class="btn '+portletColor+' fileinput-exists pic-cancel-btn"\n' +
            'data-dismiss="fileinput"> 取消\n' +
            '                                             </a>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">打开方式:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="new-sys" name="default_open_type" class="md-radiobtn" value="true">\n' +
            '                                                    <label for="new-sys">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        新建系统窗口\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="new-browser" name="default_open_type" value="false"\n' +
            'checked="" class="md-radiobtn">\n' +
            '                                                    <label for="new-browser">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        新建浏览器标签页\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
              '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">桌面显示:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="desk-show" name="mn_default_show_type" class="md-radiobtn" value="true">\n' +
            '                                                    <label for="desk-show">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        是\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="desk-hide" name="mn_default_show_type" value="false"\n' +
            'checked="" class="md-radiobtn">\n' +
            '                                                    <label for="desk-hide">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        否\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label">实时更新页面:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="form-group form-md-radios">\n' +
            '                                            <div class="md-radio-inline">\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="refreshed" name="default_isUpdate" value="true" class="md-radiobtn">\n' +
            '                                                    <label for="refreshed">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        是\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                                <div class="md-radio">\n' +
            '                                                    <input type="radio" id="not- refreshed" name="default_isUpdate" value="false" class="md-radiobtn" checked="">\n' +
            '                                                    <label for="not- refreshed">\n' +
            '                                                        <span class="inc"></span>\n' +
            '                                                        <span class="check"></span>\n' +
            '                                                        <span class="box"></span>\n' +
            '                                                        否\n' +
            '                                                    </label>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="default_update_timer-box" style="display:none">\n' +
            '                                    <div class="form-group">\n' +
            '                                        <label class="col-md-3 control-label" \n' +
            '                                               for="default_update_timer">更新时间间隔(秒):</label>\n' +
            '                                        <div class="col-md-9">\n' +
            '                                            <input type="text" \n' +
            '                                                   class="form-control input-inline input-small " \n' +
            '                                                   id="default_update_timer" \n' +
            '                                                   name="default_update_timer"></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-group">\n' +
            '                                    <label class="col-md-3 control-label" for="default_url">链接地址:</label>\n' +
            '                                    <div class="col-md-9">\n' +
            '                                        <div class="input-icon right">\n' +
            '                                            <input type="text"\n' +
            '                                                   class="form-control input-inline input-large "\n' +
            '                                                   id="default_url" name="default_url">\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="col-md-12">\n' +
            '                        <div class="portlet gray">\n' +
            '                            <div class="portlet-title">\n' +
            '                                <div class="caption">\n' +
            '                                    <i class="fa fa-calendar"></i>\n' +
            '                                    显示位置\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="portlet-body">\n' +
            '                                <div class="row">\n' +
            '                                    <div class="col-md-6 desktop-box">\n' +
            '                                        <fieldset>\n' +
            '                                            <legend style="font-size: 14px">桌面</legend>\n' +
            '                                            <div>\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <div class="row" style="margin:0">\n' +
            '                                                        <label class="col-md-5 control-label">\n' +
            '                                                            是否显示:\n' +
            '                                                        </label>\n' +
            '                                                        <div class="col-md-7">\n' +
            '                                                            <div class="form-group form-md-radios">\n' +
            '                                                                <div class="md-radio-inline">\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio"\n' +
            '                                                                               id="desktop-show"\n' +
            '                                                                               value="true"\n' +
            '                                                                               name="show_desktop_isValid"\n' +
            '                                                                               class="md-radiobtn">\n' +
            '                                                                        <label for="desktop-show">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                            是\n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio"\n' +
            '                                                                               id="desktop-hide"\n' +
            '                                                                               value="false"\n' +
            '                                                                               name="show_desktop_isValid"\n' +
            '                                                                               class="md-radiobtn"\n' +
            '                                                                               checked>\n' +
            '                                                                        <label for="desktop-hide">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                             否\n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                                <div class="desktopImg-box" style="display:none">\n' +
            '                                                    <div class="form-group">\n' +
            '                                                        <div class="row" style="margin:10px">\n' +
            '                                                            <label class="col-md-5 control-label">图标:</label>\n' +
            '                                                            <div class="col-md-7">\n' +
            '                                                                <div class="dev-img-upload clearfix">\n' +
            '                                                                    <div class="dev-img-box">\n' +
            '                                                                         <i class="fa fa-tag" id="uploadimg-icon"></i>'+
            '                                                                    </div>\n' +
            '                                                                     <div class="dev-btn-box" style="display:inline-block;padding-left:5px">'+
            '                                                            <div class="btn-group">\n' +
            '                                                             <button class="btn '+portletColor+' dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" id="dropdown-icons-btn">\n' +
            '                                                                 图片<i class="fa fa-angle-down"></i>\n' +
            '                                                             </button>\n' +
            '              <ul class="dropdown-menu clearfix" role="menu" id="dropdown-icons">\n' +
            '                </ul>\n' +
            '             </div>'+
            '                                                                      <a href="javascript:"\n' +
            '                                                                         class="btn '+portletColor+' fileinput-exists icons-cancel-btn" \n' +
            '                                                                         data-dismiss="fileinput">取消\n' +
            '                                                                      </a>\n' +
            '                                                                      <input type="hidden" value="tag" name="mn_desktop_icon" id="mn_desktop_icon">\n' +
            '                                                                </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="row" style="margin:10px">\n' +
            '                                                            <label class="col-md-5 control-label">卡片颜色:</label>\n' +
            '                                                            <div class="col-md-7">\n' +
            '                                                                <div class="dev-cards-colors-upload clearfix">\n' +
            '                                                                    <div class="dev-cards-colors-box">\n' +
            '                                                                    </div>\n' +
            '                                                                     <div class="dev-btn-box" style="display:inline-block;padding-left:5px">'+
            '                                                            <div class="btn-group">\n' +
            '                                                             <button class="btn '+portletColor+' dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" id="dropdown-colors-btn">\n' +
            '                                                                 颜色<i class="fa fa-angle-down"></i>\n' +
            '                                                             </button>\n' +
            '              <ul class="dropdown-menu clearfix" role="menu" id="dropdown-colors">\n' +
            '                </ul>\n' +
            '             </div>'+
            '                                                                      <a href="javascript:"\n' +
            '                                                                         class="btn '+portletColor+' fileinput-exists color-cancel-btn" \n' +
            '                                                                         data-dismiss="fileinput">取消\n' +
            '                                                                      </a>\n' +
            '                                                                      <input type="hidden" value="blue" name="mn_desktop_color" id="mn_desktop_color">\n' +
            '                                                                </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    <div class="row" style="margin:0">\n' +
            '                                                        <label class="col-md-5 control-label">\n' +
            '                                                            卡片大小:\n' +
            '                                                        </label>\n' +
            '                                                        <div class="col-md-7">\n' +
            '                                                            <div class="form-group form-md-radios">\n' +
            '                                                                <div class="md-radio-inline">\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio"\n' +
            '                                                                               id="card-size-small"\n' +
            '                                                                               value="true"\n' +
            '                                                                               name="mn_card_size"\n' +
            '                                                                               class="md-radiobtn">\n' +
            '                                                                        <label for="card-size-small">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                            小尺寸\n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio"\n' +
            '                                                                               id="card-size-big"\n' +
            '                                                                               value="false"\n' +
            '                                                                               name="mn_card_size"\n' +
            '                                                                               class="md-radiobtn"\n' +
            '                                                                               checked>\n' +
            '                                                                        <label for="card-size-big">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                             大尺寸\n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </fieldset>\n' +
            '                                    </div>\n' +
            '                                    <div class="col-md-6">\n' +
            '                                        <fieldset>\n' +
            '                                            <legend style="font-size: 14px">开始菜单</legend>\n' +
            '                                            <div>\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <div class="row"  style="margin:0" >\n' +
            '                                                        <label class="col-md-5 control-label">是否显示:</label>\n' +
            '                                                        <div class="col-md-7">\n' +
            '                                                            <div class="form-group form-md-radios">\n' +
            '                                                                <div class="md-radio-inline">\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio" \n' +
            '                                                                               id="shortcut-show" \n' +
            '                                                                               value="true" \n' +
            '                                                                               name="show_startmenu_isValid"\n' +
            '                                                                               class="md-radiobtn">\n' +
            '                                                                        <label for="shortcut-show">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                            是\n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="md-radio">\n' +
            '                                                                        <input type="radio" \n' +
            '                                                                               id="shortcut-hide" \n' +
            '                                                                               value="false" \n' +
            '                                                                               name="show_startmenu_isValid"\n' +
            '                                                                               class="md-radiobtn"\n' +
            '                                                                               checked> \n' +
            '                                                                        <label for="shortcut-hide">\n' +
            '                                                                            <span class="inc"></span>\n' +
            '                                                                            <span class="check"></span>\n' +
            '                                                                            <span class="box"></span>\n' +
            '                                                                            否 \n' +
            '                                                                        </label>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
//            '                                                <div class="shortcutImg-box" style="display:none">\n' +
//            '                                                    <div class="form-group">\n' +
//            '                                                        <div class="row" style="margin:0">\n' +
//            '                                                            <label class="col-md-3 control-label">图标:</label>\n' +
//            '                                                            <div class="col-md-9">\n' +
//            '                                                                <div class="dev-img-upload clearfix">\n' +
//            '                                                                    <div class="dev-img-box">\n' +
//            '                                                                         <i class="fa fa-angle-down" id="uploadimg-icon" style="width=100%;height:100%"></i>'+
//            '                                                                    </div>\n' +
//            '                                                                     <div class="dev-btn-box" style="display:inline-block;padding-left:5px">'+
//            '                                                            <div class="btn-group">\n' +
//            '                                                             <button class="btn '+portletColor+' dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">\n' +
//            '                                                                 图片<i class="fa fa-angle-down"></i>\n' +
//            '                                                             </button>\n' +
//            '              <ul class="dropdown-menu" role="menu">\n' +
//            '               <li>\n' +
//            '                <a href="javascript:;">\n' +
//            '                Action </a>\n' +
//            '               </li>\n' +
//            '                </ul>\n' +
//
//            '             </div>'+
//            '                                                                      <a href="javascript:"\n' +
//            '                                                                         class="btn '+portletColor+' fileinput-exists pic-cancel-btn" \n' +
//            '                                                                         data-dismiss="fileinput">取消\n' +
//            '                                                                      </a>\n' +
//            '                                                                </div>\n' +
//            '                                                                </div>\n' +
//            '                                                            </div>\n' +
//            '                                                        </div>\n' +
//            '                                                    </div>\n' +
//            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </fieldset>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="portlet gray">\n' +
            '                            <div class="portlet-title">\n' +
            '                                <div class="caption"><i class="fa fa-calendar"></i>接口参数</div>\n' +
            '                            </div>\n' +
            '                            <div class="portlet-body">\n' +
            '                                <fieldset>\n' +
            '                                    <legend style="font-size: 14px">接收推送(由门户系统发送)</legend>\n' +
            '                                    <div>\n' +
            '                                        <div class="form-group">\n' +
            '                                            <label class="col-md-3 control-label">是否启用:</label>\n' +
            '                                            <div class="col-md-9">\n' +
            '                                                <div class="form-group form-md-radios">\n' +
            '                                                    <div class="md-radio-inline">\n' +
            '                                                        <div class="md-radio">\n' +
            '                                                            <input type="radio" id="face_sys_isValid"\n' +
            '                                                                   name="face_sys_isValid" \n' +
            '                                                                   value="true" class="md-radiobtn">\n' +
            '                                                            <label for="face_sys_isValid">\n' +
            '                                                                <span class="inc"></span>\n' +
            '                                                                <span class="check"></span>\n' +
            '                                                                <span class="box"></span>\n' +
            '                                                                是\n' +
            '                                                            </label>\n' +
            '                                                        </div>\n' +
            '                                                        \n' +
            '                                                        <div class="md-radio">\n' +
            '                                                            <input type="radio" value="false" \n' +
            '                                                                   id="portals-disable" \n' +
            '                                                                   name="face_sys_isValid" \n' +
            '                                                                   class="md-radiobtn" checked="">\n' +
            '                                                            <label for="portals-disable">\n' +
            '                                                                <span class="inc"></span>\n' +
            '                                                                <span class="check"></span>\n' +
            '                                                                <span class="box"></span>\n' +
            '                                                                否\n' +
            '                                                            </label>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="form-group face_sys_url-box" style="display:none">\n' +
            '                                            <label class="col-md-3 control-label" for="face_sys_url">链接地址：</label>\n' +
            '                                            <div class="col-md-9">\n' +
            '                                                <div class="input-icon right">\n' +
            '                                                    <input type="text" class="form-control input-inline input-large "\n' +
            '                                                           id="face_sys_url" \n' +
            '                                                           name="face_sys_url">\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </fieldset>\n' +
            '                                <fieldset>\n' +
            '                                    <legend style="font-size: 14px">获取信息(由集成系统发送)</legend>\n' +
            '                                    <div>\n' +
            '                                        <div class="form-group">\n' +
            '                                            <label class="col-md-3 control-label">是否启用:</label>\n' +
            '                                            <div class="col-md-9">\n' +
            '                                                <div class="form-group form-md-radios">\n' +
            '                                                    <div class="md-radio-inline">\n' +
            '                                                        <div class="md-radio">\n' +
            '                                                            <input type="radio" id="face_app_isValid"\n' +
            '                                                                   value="true" \n' +
            '                                                                   name="face_app_isValid" \n' +
            '                                                                   class="md-radiobtn">\n' +
            '                                                            <label for="face_app_isValid">\n' +
            '                                                                <span class="inc"></span>\n' +
            '                                                                <span class="check"></span>\n' +
            '                                                                <span class="box"></span>\n' +
            '                                                                是\n' +
            '                                                            </label>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="md-radio">\n' +
            '                                                            <input type="radio" value="false" \n' +
            '                                                                   id="system-disable" \n' +
            '                                                                   name="face_app_isValid" \n' +
            '                                                                   class="md-radiobtn" checked="">\n' +
            '                                                            <label for="system-disable">\n' +
            '                                                                <span class="inc"></span>\n' +
            '                                                                <span class="check"></span>\n' +
            '                                                                <span class="box"></span>\n' +
            '                                                                否\n' +
            '                                                            </label>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div id="information-box" style="display:none">\n' +
            '                                            <div class="form-group">\n' +
            '                                                <label class="col-md-3 control-label" \n' +
            '                                                       for="face_app_url">链接地址：</label>\n' +
            '                                                <div class="col-md-9">\n' +
            '                                                    <div class="input-icon right">\n' +
            '                                                        <input type="text" \n' +
            '                                                               class="form-control input-inline input-large "\n' +
            '                                                               id="face_app_url" \n' +
            '                                                               name="face_app_url">\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="form-group">\n' +
            '                                                <label class="col-md-3 control-label">实时更新页面:</label>\n' +
            '                                                <div class="col-md-9">\n' +
            '                                                    <div class="form-group form-md-radios">\n' +
            '                                                        <div class="md-radio-inline">\n' +
            '                                                            <div class="md-radio">\n' +
            '                                                                <input type="radio" id="update" \n' +
            '                                                                       value="true" \n' +
            '                                                                       name="face_app_isUpdate" \n' +
            '                                                                       class="md-radiobtn">\n' +
            '                                                                <label for="update">\n' +
            '                                                                    <span class="inc"></span>\n' +
            '                                                                    <span class="check"></span>\n' +
            '                                                                    <span class="box"></span>\n' +
            '                                                                是\n' +
            '                                                                </label>\n' +
            '                                                            </div>\n' +
            '                                                            \n' +
            '                                                            <div class="md-radio">\n' +
            '                                                                <input type="radio" id="no-update" \n' +
            '                                                                       name="face_app_isUpdate" \n' +
            '                                                                       class="md-radiobtn" \n' +
            '                                                                       value="false" checked="">\n' +
            '                                                                <label for="no-update">\n' +
            '                                                                    <span class="inc"></span>\n' +
            '                                                                    <span class="check"></span>\n' +
            '                                                                    <span class="box"></span> \n' +
            '                                                                    否\n' +
            '                                                                </label>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="form-group face_app_update_timer-box">\n' +
            '                                                <label class="col-md-4 control-label" \n' +
            '                                                       for="face_app_update_timer">更新时间间隔(秒)：\n' +
            '                                                </label>\n' +
            '                                                <div class="col-md-8">\n' +
            '                                                    <input type="text" \n' +
            '                                                           class="form-control input-inline input-small "\n' +
            '                                                           id="face_app_update_timer" \n' +
            '                                                           name="face_app_update_timer">\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="form-group">\n' +
            '                                                <label class="col-md-3 control-label">接口类型:</label>\n' +
            '                                                <div class="col-md-9">\n' +
            '                                                    <div class="form-group form-md-radios">\n' +
            '                                                        <div class="md-radio-inline">\n' +
            '                                                            <div class="md-radio">\n' +
            '                                                                <input type="radio" value="true" \n' +
            '                                                                       id="webservice" \n' +
            '                                                                       name="face_app_types" \n' +
            '                                                                       class="md-radiobtn"> \n' +
            '                                                                <label for="webservice">\n' +
            '                                                                    <span class="inc"></span>\n' +
            '                                                                    <span class="check"></span>\n' +
            '                                                                    <span class="box"></span>\n' +
            '                                                                    webservice\n' +
            '                                                                </label>\n' +
            '                                                            </div>\n' +
            '                                                            <div class="md-radio">\n' +
            '                                                                <input type="radio" value="false" \n' +
            '                                                                       id="others" \n' +
            '                                                                       name="face_app_types" \n' +
            '                                                                       class="md-radiobtn" checked="">\n' +
            '                                                                <label for="others">\n' +
            '                                                                    <span class="inc"></span>\n' +
            '                                                                    <span class="check"></span>\n' +
            '                                                                    <span class="box"></span> \n' +
            '                                                                    其他\n' +
            '                                                                </label>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="api-box">\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <label class="col-md-3 control-label" \n' +
            '                                                           for="face_app_ws_name">接口名称：</label>\n' +
            '                                                    <div class="col-md-9">\n' +
            '                                                        <div class="input-icon right">\n' +
            '                                                            <input type="text" \n' +
            '                                                                   class="form-control input-inline input-large "\n' +
            '                                                                   id="face_app_ws_name" \n' +
            '                                                                   name="face_app_ws_name">\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <label class="col-md-3 control-label" \n' +
            '                                                           for="face_app_ws_p_name">参数名称：</label>\n' +
            '                                                    <div class="col-md-9">\n' +
            '                                                        <div class="input-icon right">\n' +
            '                                                            <input type="text" \n' +
            '                                                                   class="form-control input-inline input-large "\n' +
            '                                                                   id="face_app_ws_p_name"\n' +
            '                                                                   name="face_app_ws_p_name">\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <label class="col-md-3 control-label" \n' +
            '                                                           for="face_app_ws_p_type">参数类型：</label>\n' +
            '                                                    <div class="col-md-9">\n' +
            '                                                        <div class="input-icon right">\n' +
            '                                                            <input type="text" \n' +
            '                                                                   class="form-control input-inline input-large "\n' +
            '                                                                   id="face_app_ws_p_type"\n' +
            '                                                                   name="face_app_ws_p_type">\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                                <div class="form-group">\n' +
            '                                                    <label class="col-md-3 control-label" \n' +
            '                                                           for="face_app_ws_p_value">参数值：</label>\n' +
            '                                                    <div class="col-md-9">\n' +
            '                                                        <div class="input-icon right">\n' +
            '                                                            <input type="text" \n' +
            '                                                                   class="form-control input-inline input-large "\n' +
            '                                                                   id="face_app_ws_p_value"\n' +
            '                                                                   name="face_app_ws_p_value">\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </fieldset>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '             ' + hiddenInfo() + '\n' +
            '    </div>\n' +
            '     <p style="color:#fff">\n' +
            '         （系统提供默认参数值(自动替换链接地址和参数值中匹配的内容)：用户账户: @[username] ; 用户密码(加密后) ：@[userpwd] ; 集成应用ID：@[appid];default_token : @[appdefault_token]）\n' +
            '     </p>\n' +
            '</div>'+
            '        </form>\n'
    }

    function hiddenInfo() {
        return '<div class="hiddenInfo" style="display:none">\n' +
            '    <div class="form-group">\n' +
            '        <label class="col-md-3 control-label">起始位置:</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <div class="form-group form-md-radios">\n' +
            '                <div class="md-radio-inline">\n' +
            '                    <div class="md-radio">\n' +
            '                        <input type="radio" id="postion-left"  name="default_postion" \n' +
            '                               class="md-radiobtn" value="true">\n' +
            '                        <label for="postion-left">\n' +
            '                            <span class="inc"></span>\n' +
            '                            <span class="check"></span>\n' +
            '                            <span class="box"></span> \n' +
            '                            左\n' +
            '                        </label>\n' +
            '                    </div>\n' +
            '                    <div class="md-radio">\n' +
            '                        <input type="radio" id="postion-right"  name="default_postion" value="false"\n' +
            '                               checked="" class="md-radiobtn">\n' +
            '                        <label for="postion-right">\n' +
            '                            <span class="inc"></span> \n' +
            '                            <span class="check"></span>\n' +
            '                            <span class="box"></span> \n' +
            '                            右\n' +
            '                        </label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="form-group">\n' +
            '        <label for="default_x" class="col-md-3 control-label">起始位置（X）：</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <input type="text"  class="form-control input-inline input-small "  id="default_x" name="default_x">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="form-group">\n' +
            '        <label for="default_y" class="col-md-3 control-label">起始位置（X）：</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <input type="text"  class="form-control input-inline input-small "  id="default_y"\n' +
            '                   name="default_y">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="form-group">\n' +
            '        <label for="default_width" class="col-md-3 control-label">起始位置（X）：</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <input type="text"  class="form-control input-inline input-small "  id="default_width"\n' +
            '                   name="default_width">\n' +
            '        </div>\n' +
            '        \n' +
            '    </div>\n' +
            '    <div class="form-group">\n' +
            '        <label for="default_height" class="col-md-3 control-label">起始位置（X）：</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <input type="text"  class="form-control input-inline input-small " \n' +
            '                   id="default_height" name="default_height">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="form-group">\n' +
            '        <label class="col-md-3 control-label">窗口位置:</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <div class="form-group form-md-radios">\n' +
            '                <div class="md-radio-inline">\n' +
            '                    <div class="md-radio">\n' +
            '                        <input type="radio" id="postion-draggable"  name="default_win_postion" \n' +
            '                               class="md-radiobtn" value="true">\n' +
            '                        <label for="postion-draggable">\n' +
            '                            <span class="inc"></span>\n' +
            '                            <span class="check"></span>\n' +
            '                            <span class="box"></span>\n' +
            '                            可拖拽\n' +
            '                        </label>\n' +
            '                    </div>\n' +
            '                    <div class="md-radio">\n' +
            '                        <input type="radio" id="postion-nodrag"  name="default_win_postion"\n' +
            '                               value="false"  checked="" class="md-radiobtn">\n' +
            '                        <label for="postion-nodrag">\n' +
            '                            <span class="inc"></span>\n' +
            '                            <span class="check"></span>\n' +
            '                            <span class="box"></span>右</label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="form-group"><label class="col-md-3 control-label">窗口大小:</label>\n' +
            '        <div class="col-md-9">\n' +
            '            <div class="form-group form-md-radios">\n' +
            '                <div class="md-radio-inline">\n' +
            '                    <div class="md-radio"><input type="radio" id="telescopic"  name="default_win_size" \n' +
            '                                                 class="md-radiobtn" value="true"><label for="telescopic"><span\n' +
            '                            class="inc"></span><span class="check"></span> <span class="box"></span>可伸缩</label>\n' +
            '                    </div>\n' +
            '                    \n' +
            '                    <div class="md-radio">\n' +
            '                        <input type="radio" id="size-fixed"  name="default_win_size" value="false" checked=""                                                class="md-radiobtn"> \n' +
            '                        <label for="size-fixed">\n' +
            '                            <span class="inc"></span>\n' +
            '                            <span class="check"></span>\n' +
            '                            <span class="box"></span>固定</label>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="col-md-6 desktop-box">\n' +
            '        <fieldset>\n' +
            '            <legend style="font-size: 14px">快捷方式</legend>\n' +
            '            <div>\n' +
            '                <div class="form-group">\n' +
            '                    <div class="row">\n' +
            '                        <label class="col-md-5 control-label">是否显示:</label>\n' +
            '                        <div class="col-md-7">\n' +
            '                            <div class="form-group form-md-radios">\n' +
            '                                <div class="md-radio-inline">\n' +
            '                                    <div class="md-radio">\n' +
            '                                        <input type="radio" id="show-fastlink" value="true"\n' +
            '                                               name="show_fastlink_isValid" class="md-radiobtn"\n' +
            '                                               checked="checked"> \n' +
            '                                        <label for="show-fastlink">\n' +
            '                                            <span class="inc"></span>\n' +
            '                                            <span class="check"></span>\n' +
            '                                            <span class="box"></span>\n' +
            '                                                是\n' +
            '                                        </label>\n' +
            '                                    </div>\n' +
            '                                    <div class="md-radio">\n' +
            '                                        <input type="radio" id="hide-fastlink" value="false"\n' +
            '                                               name="show_fastlink_isValid" class="md-radiobtn">\n' +
            '                                        <label for="hide-fastlink">\n' +
            '                                            <span class="inc"></span>\n' +
            '                                            <span class="check"></span>\n' +
            '                                            <span class="box"></span> \n' +
            '                                            否 \n' +
            '                                        </label>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="fastlinkImg-box">\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="row"><label class="col-md-5 control-label">图标:</label>\n' +
            '                            <div class="col-md-7">\n' +
            '                                <div class="fileinput fileinput-new" data-provides="fileinput">\n' +
            '                                    <div class="fileinput-preview thumbnail" data-trigger="fileinput"\n' +
            '                                         style="width: 48px; height: 48px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' +
            '                                         <img class="fastlink-icon" id="fastlink-icon" src="" alt=""\n' +
            '                                                style="width:100%;height:100%">\n' +
            '                                    </div>\n' +
            '                                     <span class="btn red fileinput-button">\n' +
            '                                         <i class="fa fa-plus"></i>\n' +
            '                                         <span>选择图片</span>\n' +
            '                                         <input type="file" name="file" data-type="show_fastlink_icon_url"> \n' +
            '                                         <input type="hidden" value="" name="show_fastlink_icon_url"\n' +
            '                                            id="show_fastlink_icon_url">\n' +
            '                                     </span>\n' +
            '                                    <a href="javascript:" class="btn red fileinput-exists"\n' +
            '                                       data-dismiss="fileinput">\n' +
            '                                        取消\n' +
            '                                    </a>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </fieldset>\n' +
            '    </div>\n' +
            '</div>'+
             '<input type="hidden" value="" name="show_desktop_icon_url" id="show_desktop_icon_url">\n' +
             '<input type="hidden" value="" name="show_startmenu_icon_url" id="show_startmenu_icon_url">\n' ;
    }

    function panks(conf, id) {
        return '<div class="row" id="module_' + conf.id + '">\n' +
            '    <div class="col-md-12">\n' +
            '        <div class="portlet">\n' +
            '            <div class="portlet-title">\n' +
            '                <div class="caption"><i class="fa fa-cubes"></i>集成管理</div>\n' +
            '                <div class="tools"><a href="" class="fullscreen" data-original-title="" title=""> </a></div>\n' +
            '            </div>\n' +
            '            <div class="portlet-body">' + panksLeft(conf) + panksRight(conf) + '</div>'+
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' + deleteSysModal() + sendDataModal();
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">\n' +
            '    <div class="portlet '+portletColor+' box">\n' +
            '        <div class="portlet-title">\n' +
            '            <div class="caption"><i class="fa fa-sitemap"></i>组织结构导航</div>\n' +
            '            <div class="tools"><a href="javascript:;" class="collapse"> </a></div>\n' +
            '        </div>\n' +
            '        <div class="portlet-body">\n' +
            '            <div id="tree_' + conf.id + '" class="tree-demo"></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
    }

    function deleteSysModal(conf, type) {
        return '<div id="deleteSysModal" class="modal fade bs-modal-sm in" tabindex="-1">\n' +
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '    <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '    </div>\n' +
            '    <div class="modal-body"><h4>确定删除？</h4></div>\n' +
            '    <div class="modal-footer">\n' +
            '        <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>\n' +
            '        <button type="button" class="btn green-meadow" id="deleteSysBtn">确定</button>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '    </div>\n' +
            '</div>'
    }

    function sendDataModal() {
        return '<div class="modal fade bs-modal-lg in" id="sendDataModal" role="dialog" style="display: none;">\n' +
            '    <div class="modal-dialog modal-lg" >\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' +
            '                 <h4 class="modal-title">发送组织机构全量数据</h4>\n' +
            '            </div class="row">\n' +
            '            <div class="modal-body">\n' +
            '                <div class="portlet-body form">\n' +
            '                    <form class="form-horizontal" role="form">\n' +
            '                        <div class="form-body" style="padding-left:30px">\n' +
            '                            <div class="form-group"> <label class="col-md-2 control-label">选择接口：</label>\n' +
            '                                <div class="col-md-10 check-box"></div>\n' +
            '                            </div>\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="address"\n' +
            '                                       class="col-md-3 control-label">请输入单独需要推送地址：</label>\n' +
            '                                <div class="col-md-9">\n' +
            '                                    <input type="text" id="address" name="address"\n' +
            '                                           class="form-control input-inline input-medium">\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="result-box"> \n' +
            '                                <span id=\'url-box\'></span>\n' +
            '                                <span id=\'res-box\' style=\'margin-left:10px\'></span>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </form>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="modal-footer">\n' +
            '                <button type="button" class="btn default" data-dismiss="modal">关闭</button>\n' +
            '                <button type="button" id="sendBtn" class="btn green-meadow">发送</button>\n' +
            '            </div>\n' +
            '        </div>'
    }
    function iconsMenu(){
        var iconsArray=collocation.fontIcons,
            iconClass=collocation.iconClass,
            html=''
        $.each(iconsArray,function(i){
            html+='<li class="icons-item"><i class="'+iconClass+''+iconsArray[i]+'"></i></li>'
        })
        $("#dropdown-icons").html(html)
    }
    function colorLibrary(){
        var colorArray=collocation.colorLibrary,
                html='';
        $.each(colorArray,function(i){
             html+='<li class="colors-item" data-value='+colorArray[i].id+' style="background-color:'+colorArray[i].color+'"></li>'
            
        })
         $("#dropdown-colors").html(html)
    }
    var controller = {
        start: function () {
            this.openType().deskImgBox().apiType().shortcutImgBox().faceSysUrlBox().informationBox().faceAppUpdateTimerBox();
        }, openType: function () {
            var isShow = $("input[name='default_isUpdate']:checked").val();
            if (isShow == "false") {
                $(".default_update_timer-box").hide();
            } else {
                $(".default_update_timer-box").show();
            }
            return this;
        }, deskImgBox: function () {
            var isShow = $("input[name='show_desktop_isValid']:checked").val();
            if (isShow == "false") {
                $(".desktopImg-box").hide();
            } else {
                $(".desktopImg-box").show();
            }
            return this;
        }, apiType: function () {
            var isShow = $("input[name='face_app_types']:checked").val();
            if (isShow == "false") {
                $(".api-box").hide();
            } else {
                $(".api-box").show();
            }
            return this;
        }, shortcutImgBox: function () {
            var isShow = $("input[name='show_startmenu_isValid']:checked").val();
            if (isShow == "false") {
                $(".shortcutImg-box").hide();
            } else {
                $(".shortcutImg-box").show();
            }
            return this;
        }, faceSysUrlBox: function () {
            var isShow = $("input[name='face_sys_isValid']:checked").val();
            if (isShow == "false") {
                $(".face_sys_url-box").hide();
            } else {
                $(".face_sys_url-box").show();
            }
            return this;
        }, informationBox: function () {
            var isShow = $("input[name='face_app_isValid']:checked").val();
            if (isShow == "false") {
                $("#information-box").hide();
            } else {
                $("#information-box").show();
            }
            return this;
        }, faceAppUpdateTimerBox: function () {
            var isShow = $("input[name='face_app_isUpdate']:checked").val();
            if (isShow == "false") {
                $(".face_app_update_timer-box").hide();
            } else {
                $(".face_app_update_timer-box").show();
            }
            return this;
        }
    };
    
    function getData(id) {
        $.ajax({
            type: "get",
            url: "/potal/menu/" + id + ".json?" + Math.random(),
            dataType: "json",
            success: function (data) {
                loadData(data);
                getImg(data, id);
                getDesktopInfo(data)
                controller.start();
            }
        });
    }

    function panksRight(conf, id) {
        return '<div class="profile-content">' + rightHtml(conf, id) + "</div>";
    }

    function initSysForm(conf) {
        var form = $("#baseForm");
        var resetVaildate = form.validate({
            errorElement: "span",
            errorClass: "help-block help-block-error",
            focusInvalid: false,
            ignore: "",
            rules: {default_title: {required: true},default_url: {required: true}},
            messages: {default_title: {required: "请输入标题名称"},default_url: {required: "请输入链接地址"}},
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
                var data = $(form).serializeArray();
                var res = {};
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    res[d.name] = d.value;
                }
                res.sys_app_id = selectSysId;
                res = JSON.stringify(res);
                $.ajax({
                    type: "POST", data: {data: res}, url: "/dev/potal/create.jcp", success: function (data) {
                        refreshTree(conf);
                        if (JSON.parse(res).sys_app_id === "0") {
                            toastr.success("创建成功");
                        } else {
                            toastr.success("修改成功");
                        }
                    }
                });
            }
        });
        $("#tree_" + conf.id).on("click", "li", function () {
            resetVaildate.resetForm();
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
    
    function getImg(data) {
        $("#default-icon").attr("src", data.default_icon_url);
        $("#desktop-icon").attr("src", data.show_desktop_icon_url);
        $("#start-icon").attr("src", data.show_startmenu_icon_url);
    }
     function getDesktopInfo(data){
         $(".dev-img-box>i").removeClass().addClass("fa fa-"+data.mn_desktop_icon);
         $(".dev-cards-colors-box").attr("style","background-color:"+data.mn_desktop_color+"")
     }
    function remove(id, conf) {
        $.ajax({
            type: "POST", data: {type: "delete", id: id}, url: "/dev/potal/create.jcp", success: function () {
                toastr.success("删除成功");
                var tree = $.jstree.reference("#tree_" + conf.id);
                tree.refresh();
                $("#baseForm ")[0].reset();
            }
        });
    }

    function refreshTree(conf) {
        var tree = $.jstree.reference("#tree_" + conf.id);
        tree.refresh();
    }

    function getAddress() {
        $.ajax({
            type: "get",
            url: "/dev/potal/getAddress.jcp",
            dataType: "json",
            async: false,
            success: function (data) {
                var html = "";
                var address = data.data;
                $.each(address, function (i) {
                    html += '<div class="md-checkbox ">\n<input type="checkbox" id="checkbox' + i + '" name="' + address[i].name + '" class="md-check" data-index="' + i + '">\n<label for="checkbox' + i + '">\n<span class="inc"></span>\n<span class="check"></span>\n<span class="box"></span>\n' + address[i].boxLabel + "</label></div>";
                });
                $(".check-box").html(html);
            }
        });
    }

    function sendData() {
        var len = $("input[type='checkbox']:checked").length;
        for (var i = 0; i < len; i++) {
            var value = $("input[type='checkbox']:checked").eq(i).attr("name");
            var url = $("#address").val();
            var boxLable = $("input[type='checkbox']:checked").eq(i).next().text().trim();
            var index = $("input[type='checkbox']:checked").eq(i).attr("data-index");
            $.ajax({
                type: "get",
                url: "/dev/potal/SendMessage.jcp?index=" + index + "&value=" + value + "&boxLable=" + boxLable + "&type=click",
                datatType: "json",
                success: function (data) {
                }
            });
        }
        $.ajax({
            type: "get",
            url: "/dev/potal/SendMessage.jcp?index=" + 0 + "&value=" + url + "&boxLable=" + url + "&type=input",
            datatType: "json",
            success: function (data) {
                data = JSON.parse(data);
                $("#url-box").html(url);
                if (data.success) {
                    $("#res-box").css({color: "green"}).html("发送成功");
                } else {
                    $("#res-box").css({color: "red"}).html("发送数据失败");
                }
            }
        });
    }

    return {
        init: function (conf, appendHtml) {
            PageSystem.loadJS("/metronic/assets/global/plugins/jstree/dist/jstree.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/bootstrap-select/bootstrap-select.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/select2/select2.min.js");
            PageSystem.loadJS("/metronic/assets/global/plugins/jquery-validation/js/jquery.validate.min.js");
            appendHtml(panks(conf), function () {
                var baseForm = $("#baseForm");
                $("#tree_" + conf.id).jstree({
                    core: {
                        themes: {stripes: true},
                        check_callback: true,
                        data: {
                            url: "/dev/potal/tree.jjs", data: function (node) {
                                return {parent: node.id};
                            }
                        }
                    },
                    types: {
                        "default": {icon: "fa fa-folder icon-state-warning icon-lg"},
                        file: {icon: "fa fa-file icon-state-warning icon-lg"}
                    },
                    state: {key: "demo3"},
                    plugins: ["state", "types"]
                }).on("changed.jstree", function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        selectSysId = data.selected[0];
                        if (selectSysId === "0") {
                            $("#baseForm ")[0].reset();
                        } else {
                            getData(selectSysId);
                        }
                    }
                }).on("loaded.jstree", function (e, data) {
                    var inst = data.instance;
                    var obj = inst.get_node(e.target.firstChild.firstChild.lastChild);
                    inst.select_node(obj);
                });
                $("input[type='radio']").on("click", function () {
                    controller.start();
                });
                $("#createSys").on("click", function (e) {
                    initSysForm(conf);
                });
                $("#emptySys").on("click", function (e) {
                    e.preventDefault();
                    $("#baseForm")[0].reset();
                });
                $("#deleteSys").on("click", function (e) {
                    e.preventDefault();
                    var tag = $("#deleteSysModal");
                    tag.modal("show");
                });
                $("#deleteSysBtn").on("click", function (e) {
                    remove(selectSysId, conf);
                    var tag = $("#deleteSysModal");
                    tag.modal("hide");
                });
                $("#send-data").on("click", function (e) {
                    e.preventDefault();
                    getAddress();
                    var tag = $("#sendDataModal");
                    tag.modal("show");
                    $("#url-box,#res-box").html("");
                    $("#address").val("");
                });
                $("#sendBtn").on("click", function (e) {
                    e.preventDefault();
                    sendData();
                });
                $("input[type='file']").fileupload({
                    type: "post",
                    url: "/bin/upload/upload.jcp",
                    sequentialUploads: true,
                    multipart: true,
                    formData: {file: ""},
                    dataType: "json",
                    done: function (e, data) {
                        switch (e.target.getAttribute("data-type")) {
                            case"default_icon_url":
                                $("#default-icon").attr("src", data.result.path);
                                document.getElementById("default_icon_url").value = data.result.path;
                                break;
                            case"show_desktop_icon_url":
                                $(".desktop-icon").attr("src", data.result.path);
                                document.getElementById("show_desktop_icon_url").value = data.result.path;
                                break;
                            case"show_startmenu_icon_url":
                                $(".start-icon").attr("src", data.result.path);
                                document.getElementById("show_startmenu_icon_url").value = data.result.path;
                                break;
                        }
                    }
                });
                $(".pic-cancel-btn").on("click",function(e){
                    e.preventDefault();
                    var $this=e.target
                    $($this).siblings("div").children("img").attr("src","");
                    $($this).siblings("span").children("input").eq(1).val("");
                });
                $("#dropdown-icons-btn").on("click",function(e){
                    e.preventDefault();
                    iconsMenu()
                });
                $("#dropdown-icons").on("click","li",function(e){
                         var icon=$(e.currentTarget).children("i")[0].className,
                             value=icon.match(/fa fa-(\S*)/)[1];
                         $(".dev-img-box i").removeClass().addClass(icon)
                         $("#mn_desktop_icon").val(value)
                });
                  $("#dropdown-colors-btn").on("click",function(e){
                    e.preventDefault();
                    colorLibrary()
                });
                 $("#dropdown-colors").on("click","li",function(e){
                        var color=$(e.currentTarget)[0].style.backgroundColor,
                        value=$(e.currentTarget).attr("data-value")
                        $(".dev-cards-colors-box").attr("style","background-color:"+color+"")
                        $("#mn_desktop_color").val(value)
                });
            });
        }
    };
})();