(function () {
    var selectSysId = "";

    function rightHtml() {
        return '<div class="portlet box red-pink ">\n    <div class="portlet-title">\n        <div class="caption"><i class="fa fa-gift"></i>集成管理</div>\n    </div>\n    <div class="portlet-body form">\n        <form class="form-horizontal" role="form" id="baseForm">\n            <div class="form-body">                    <!--submit-start-->\n                <div style="margin-bottom:20px">\n                    <div class="row">\n                        <div class="col-md-offset-1 col-md-9">\n                            <button type="submit" class="btn red-pink " id="createSys">保存</button>\n                            <button type="submit" class="btn red-pink" id="emptySys">清空</button>\n                            <button type="submit" class="btn red-pink" id="deleteSys">删除</button>\n                            <button type="submit" class="btn red-pink" id="send-data">发送全量数据</button>\n     </div>\n                    </div>\n                </div>               <!--submit-end-->\n                <div class="row">                   <!--left-->\n                    <div class="col-md-12">\n                    <div class="portlet gren">\n                            <div class="portlet-title">\n                                <div class="caption"><i class="fa fa-calendar"></i>基础属性</div>\n                            </div>\n                            <div class="portlet-body">\n                                <div class="form-group"><label class="col-md-3 control-label"\n                          for="default_title">导航标题：</label>\n                                 <div class="col-md-9">\n   <div class="input-icon right"><input type="text"\n   class="form-control input-inline input-large "\n              id="default_title" name="default_title">\n   </div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label for="default_seq"\n                    class="col-md-3 control-label">顺序：</label>\n                                    <div class="col-md-9"><input type="text"\n                            class="form-control input-inline input-small "\n                            id="default_seq" name="default_seq"></div>\n                                </div>\n                                <div class="form-group"><label for="default_token" class="col-md-3 control-label">token:</label>\n                                    <div class="col-md-9"><input type="text"\n                            class="form-control input-inline input-medium "\n                            id="default_token" name="default_token" readonly></div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label">权限模式:</label>\n                                    <div class="col-md-9">\n   <div class="form-group form-md-radios">\n       <div class="md-radio-inline">\n           <div class="md-radio"><input type="radio" id="default_has_auth"\n   name="default_has_auth" value="false"\n   class="md-radiobtn"> <label\n                   for="default_has_auth"><span class="inc"></span> <span\n                   class="check"></span><span class="box"></span> 无权限控制 </label>\n           </div>\n           <div class="md-radio"><input type="radio" id="default_no_auth"\n   name="default_has_auth" class="md-radiobtn"\n   value="true" checked=""><label\n                   for="default_no_auth"><span class="inc"></span><span\n                   class="check"></span><span class="box"></span> 权限控制 </label>\n           </div>\n       </div>\n   </div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label">默认图标(48x48):</label>\n                                    <div class="col-md-9">\n   <div class="fileinput fileinput-new" data-provides="fileinput">\n       <div class="fileinput-preview thumbnail" data-trigger="fileinput"\n            style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee" >\n           <img id="default-icon" src="" alt="" style="width:100%;height:100%">\n       </div>\n            <span class="btn red fileinput-button">\n                    <i class="fa fa-plus"></i>\n               <span>选择图片</span>\n                <input  type="file" data-type="default_icon_url" name="file" >\n                <input type="hidden" value="" name="default_icon_url" id="default_icon_url">\n                </span>\n\n       <a href="javascript:;"\n           class="btn red fileinput-exists"\n           data-dismiss="fileinput"> 取消 </a>\n   </div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label">打开方式:</label>\n                                    <div class="col-md-9">\n   <div class="form-group form-md-radios">\n       <div class="md-radio-inline">\n           <div class="md-radio"><input type="radio" id="new-sys"\n   name="default_open_type"\n   class="md-radiobtn" value="true"><label\n                   for="new-sys"><span class="inc"></span><span\n                   class="check"></span><span class="box"></span> 新建系统窗口</label>\n           </div>\n           <div class="md-radio"><input type="radio" id="new-browser"\n   name="default_open_type" value="false"\n   checked="" class="md-radiobtn"> <label\n                   for="new-browser"><span class="inc"></span> <span\n                   class="check"></span><span class="box"></span> 新建浏览器标签页 </label>\n           </div>\n       </div>\n   </div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label">实时更新页面:</label>\n                                    <div class="col-md-9">\n   <div class="form-group form-md-radios">\n       <div class="md-radio-inline">\n           <div class="md-radio"><input type="radio" id=" refreshed"\n   name="default_isUpdate" value="true"\n   class="md-radiobtn"><label\n                   for=" refreshed"><span class="inc"></span><span\n                   class="check"></span><span class="box"></span> 是 </label></div>\n           <div class="md-radio"><input type="radio" id="not- refreshed"\n   name="default_isUpdate" value="false"\n   class="md-radiobtn" checked=""> <label\n                   for="not- refreshed"><span class="inc"></span> <span\n                   class="check"></span><span class="box"></span> 否 </label></div>\n       </div>\n   </div>\n                                    </div>\n                                </div>\n                                <div class="default_update_timer-box">\n                                    <div class="form-group"><label class="col-md-4 control-label"\n                              for="default_update_timer">更新时间间隔(秒):</label>\n   <div class="col-md-8"><input type="text"\n                                class="form-control input-inline input-small "\n                                id="default_update_timer"\n                                name="default_update_timer"></div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label">启用:</label>\n                                    <div class="col-md-9">\n   <div class="form-group form-md-radios">\n       <div class="md-radio-inline">\n           <div class="md-radio"><input type="radio" id=" using"\n   name="default_isValid" value="true"\n   class="md-radiobtn"><label\n                   for=" using"><span class="inc"></span><span\n                   class="check"></span><span class="box"></span> 是 </label></div>\n           <div class="md-radio"><input type="radio" id="not-use" value="false"\n   name="default_isValid" class="md-radiobtn"\n   checked=""> <label for="not-use"><span\n                   class="inc"></span> <span class="check"></span><span\n                class="box"></span> 否 </label></div>\n       </div>\n               </div>\n                                    </div>\n                                </div>\n       <div class="form-group"><label class="col-md-3 control-label">自动运行:</label>\n                                    <div class="col-md-9">\n   <div class="form-group form-md-radios">\n       <div class="md-radio-inline">\n    <div class="md-radio"><input type="radio" id="default_autoRunRG-open"\n    name="default_autoRunRG" value="true"\n   class="md-radiobtn"><label\n            for="default_autoRunRG-open"><span class="inc"></span> <span\n                   class="check"></span><span class="box"></span> 是 </label></div>\n           <div class="md-radio"><input type="radio" id="default_autoRunRG-stop"\n   name="default_autoRunRG" value="false"\n   class="md-radiobtn" checked=""> <label\n                   for="default_autoRunRG-stop"><span class="inc"></span> <span\n                   class="check"></span><span class="box"></span> 否 </label></div>\n       </div>\n   </div>\n                                    </div>\n                                </div>\n                                <div class="form-group"><label class="col-md-3 control-label"\n                          for="default_url">链接地址:</label>\n                                    <div class="col-md-9">\n   <div class="input-icon right"><input type="text"\n   class="form-control input-inline input-large "\n   id="default_url" name="default_url"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>                   <!--right-->\n                    <div class="col-md-12">\n                        <div class="portlet gren">\n                            <div class="portlet-title">\n                                <div class="caption"><i class="fa fa-calendar"></i>显示位置</div>\n                            </div>\n                            <div class="portlet-body">\n                                <div class="row">\n                                    <div class="col-md-6 desktop-box">\n   <fieldset>\n       <legend style="font-size: 14px">桌面</legend>\n       <div>\n           <div class="form-group">\n               <div class="row"><label class="col-md-5 control-label">是否显示:</label>\n                   <div class="col-md-7">\n                       <div class="form-group form-md-radios">\n   <div class="md-radio-inline">\n  <div class="md-radio"><input type="radio"  id="desktop-show" value="true" name="show_desktop_isValid" class="md-radiobtn">\n   <label for="desktop-show"><span\n      class="inc"></span><span\n      class="check"></span><span\n      class="box"></span> 是</label></div>\n        <div class="md-radio"><input type="radio"\n   id="desktop-hide"\n  value="false"\n   name="show_desktop_isValid"\n    class="md-radiobtn"\n   checked> <label\n   for="desktop-hide"><span class="inc"></span><span\n  class="check"></span><span\n                               class="box"></span> 否 </label></div>\n   </div>\n    </div>\n     </div>\n    </div>\n    </div>\n    <div class="desktopImg-box" style="display:none">\n  <div class="form-group">\n                   <div class="row"><label\n                           class="col-md-5 control-label">图标:</label>\n                       <div class="col-md-7">\n                           <div class="fileinput fileinput-new"\n                                data-provides="fileinput">\n                               <div class="fileinput-preview thumbnail" data-trigger="fileinput"\n                                    style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee" >\n                                   <img class="desktop-icon" id="desktop-icon" src="" alt="" style="width:100%;height:100%">\n                               </div>\n                               <span class="btn red fileinput-button">\n                    <i class="fa fa-plus"></i>\n               <span>选择图片</span>\n                <input type="file" name="file" data-type="show_desktop_icon_url">\n                <input type="hidden" value="" name="show_desktop_icon_url" id="show_desktop_icon_url">\n                </span>\n                               <a href="javascript:" class="btn red fileinput-exists"\n                                   data-dismiss="fileinput"> 取消</a>\n                           </div>\n                       </div>\n                   </div>\n   </div>\n           </div>\n       </div>\n   </fieldset>\n                                    </div>\n                                    <div class="col-md-6">\n   <fieldset>\n       <legend style="font-size: 14px">开始菜单</legend>\n       <div>\n           <div class="form-group">\n               <div class="row"><label class="col-md-5 control-label">是否显示:</label>\n                   <div class="col-md-7">\n                       <div class="form-group form-md-radios">\n                           <div class="md-radio-inline">\n                               <div class="md-radio"><input type="radio"\n                       id="shortcut-show"\n       value="true"\n                       name="show_startmenu_isValid"\n                  class="md-radiobtn">\n                                   <label for="shortcut-show"><span\n                   class="inc"></span><span\n      class="check"></span><span\n      class="box"></span> 是</label></div>\n                               <div class="md-radio"><input type="radio"\n                                    id="shortcut-hide"\n                       value="false"\n                       name="show_startmenu_isValid"\n                  class="md-radiobtn"\n                       checked> <label\n        for="shortcut-hide"><span\n  class="inc"></span><span\n             class="check"></span><span\n  class="box"></span> 否 </label></div>\n           </div>\n           </div>\n                   </div>\n               </div>\n           </div>\n           <div class="shortcutImg-box">\n               <div class="form-group">\n                   <div class="row"><label\n                           class="col-md-5 control-label">图标:</label>\n                       <div class="col-md-7">\n                           <div class="fileinput fileinput-new"\n                                data-provides="fileinput">\n                               <div class="fileinput-preview thumbnail"\n                                    data-trigger="fileinput"\n                                    style="width: 20px; height: 20px; line-height: 150px; border: 2px solid #eeeeee; padding: 0">\n                                   <img class="start-icon" id="start-icon" src="" alt="" style="width:100%;height:100%">\n                               </div>\n                               <span class="btn red fileinput-button">\n                    <i class="fa fa-plus"></i>\n               <span>选择图片</span>\n                <input id="fileUpload" type="file" name="file" data-type="show_startmenu_icon_url">\n                <input type="hidden" value="" name="show_startmenu_icon_url" id="show_startmenu_icon_url">\n                </span>\n                               <a\n                                   href="javascript:;"\n                                   class="btn red fileinput-exists"\n                                   data-dismiss="fileinput"> 取消 </a></div>\n                       </div>\n                   </div>\n               </div>\n           </div>\n       </div>\n   </fieldset>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="portlet gren">\n                            <div class="portlet-title">\n                                <div class="caption"><i class="fa fa-calendar"></i>接口参数</div>\n                            </div>\n                            <div class="portlet-body">\n                                <fieldset>\n                                    <legend style="font-size: 14px">接收推送(由门户系统发送)</legend>\n                                    <div>\n   <div class="form-group"><label class="col-md-3 control-label">是否启用:</label>\n       <div class="col-md-9">\n           <div class="form-group form-md-radios">\n               <div class="md-radio-inline">\n                   <div class="md-radio"><input type="radio" id="face_sys_isValid"\n           name="face_sys_isValid"\n           value="true" class="md-radiobtn">\n                       <label for="face_sys_isValid"><span class="inc"></span><span\n                               class="check"></span><span class="box"></span>\n                           是</label></div>\n                   <div class="md-radio"><input type="radio" value="false"\n           id="portals-disable"\n           name="face_sys_isValid"\n           class="md-radiobtn" checked="">\n                       <label for="portals-disable"><span class="inc"></span><span\n                               class="check"></span><span class="box"></span> 否\n                       </label></div>\n               </div>\n           </div>\n       </div>\n   </div>\n   <div class="form-group face_sys_url-box"><label class="col-md-3 control-label"\n              for="face_sys_url">链接地址：</label>\n       <div class="col-md-9">\n           <div class="input-icon right"><input type="text"\n           class="form-control input-inline input-large "\n           id="face_sys_url"\n           name="face_sys_url"></div>\n       </div>\n   </div>\n                                    </div>\n                                </fieldset>\n                                <fieldset>\n                                    <legend style="font-size: 14px">获取信息(由集成系统发送)</legend>\n                                    <div>\n   <div class="form-group"><label class="col-md-3 control-label">是否启用:</label>\n       <div class="col-md-9">\n           <div class="form-group form-md-radios">\n               <div class="md-radio-inline">\n                   <div class="md-radio"><input type="radio" id="face_app_isValid"\n           value="true"\n           name="face_app_isValid"\n           class="md-radiobtn"> <label\n                           for="face_app_isValid"><span class="inc"></span><span\n                           class="check"></span><span class="box"></span> 是</label>\n                   </div>\n                   <div class="md-radio"><input type="radio" value="false"\n           id="system-disable"\n           name="face_app_isValid"\n           class="md-radiobtn" checked="">\n                       <label for="system-disable"><span class="inc"></span><span\n                               class="check"></span><span class="box"></span> 否\n                       </label></div>\n               </div>\n           </div>\n       </div>\n   </div>\n   <div id="information-box" style="display:block">\n       <div class="form-group"><label class="col-md-3 control-label"\n for="face_app_url">链接地址：</label>\n           <div class="col-md-9">\n               <div class="input-icon right"><input type="text"\n               class="form-control input-inline input-large "\n               id="face_app_url"\n               name="face_app_url"></div>\n           </div>\n       </div>\n       <div class="form-group"><label\n               class="col-md-3 control-label">实时更新页面:</label>\n           <div class="col-md-9">\n               <div class="form-group form-md-radios">\n                   <div class="md-radio-inline">\n                       <div class="md-radio"><input type="radio" id="update"\n               value="true"\n               name="face_app_isUpdate"\n               class="md-radiobtn"> <label\n                               for="update"><span class="inc"></span><span\n                               class="check"></span><span class="box"></span>\n                           是</label></div>\n                       <div class="md-radio"><input type="radio" id="no-update"\n               name="face_app_isUpdate"\n               class="md-radiobtn"\n               value="false" checked="">\n                           <label for="no-update"><span class="inc"></span><span\n                                   class="check"></span><span class="box"></span> 否\n                           </label></div>\n                   </div>\n               </div>\n           </div>\n       </div>\n       <div class="form-group face_app_update_timer-box"><label\n               class="col-md-4 control-label" for="face_app_update_timer">更新时间间隔(秒)：</label>\n           <div class="col-md-8"><input type="text"\n   class="form-control input-inline input-small "\n   id="face_app_update_timer"\n   name="face_app_update_timer"></div>\n       </div>\n       <div class="form-group"><label class="col-md-3 control-label">接口类型:</label>\n           <div class="col-md-9">\n               <div class="form-group form-md-radios">\n                   <div class="md-radio-inline">\n                       <div class="md-radio"><input type="radio" value="true"\n               id="webservice"\n               name="face_app_types"\n               class="md-radiobtn"> <label\n                               for="webservice"><span class="inc"></span><span\n                               class="check"></span><span class="box"></span>webservice</label>\n                       </div>\n                       <div class="md-radio"><input type="radio" value="false"\n               id="others"\n               name="face_app_types"\n               class="md-radiobtn" checked="">\n     <label for="others"><span class="inc"></span><span\n                                   class="check"></span><span class="box"></span>\n                               其他 </label></div>\n                   </div>\n               </div>\n           </div>\n       </div>\n       <div class="api-box">\n           <div class="form-group"><label class="col-md-3 control-label"\n     for="face_app_ws_name">接口名称：</label>\n               <div class="col-md-9">\n         <div class="input-icon right"><input type="text"\n                   class="form-control input-inline input-large "\n                                 id="face_app_ws_name"\n                   name="face_app_ws_name">\n                   </div>\n               </div>\n           </div>\n           <div class="form-group"><label class="col-md-3 control-label"\n     for="face_app_ws_p_name">参数名称：</label>\n               <div class="col-md-9">\n                   <div class="input-icon right"><input type="text"\n                   class="form-control input-inline input-large "\n     id="face_app_ws_p_name"\n  name="face_app_ws_p_name">\n                   </div>\n               </div>\n           </div>\n           <div class="form-group"><label class="col-md-3 control-label"\n     for="face_app_ws_p_type">参数类型：</label>\n               <div class="col-md-9">\n    <div class="input-icon right"><input type="text"\n                   class="form-control input-inline input-large "\n        id="face_app_ws_p_type"\n     name="face_app_ws_p_type">\n                   </div>\n               </div>\n           </div>\n           <div class="form-group"><label class="col-md-3 control-label"\n     for="face_app_ws_p_value">参数值：</label>\n     <div class="col-md-9">\n                   <div class="input-icon right"><input type="text"\n    class="form-control input-inline input-large "\n                   id="face_app_ws_p_value"\n                   name="face_app_ws_p_value">\n                   </div>\n               </div>\n           </div>\n       </div>\n   </div>\n                                    </div>\n                                </fieldset>\n                            </div>\n   </div>\n                    </div>\n                </div>\n            </div>\n  ' + hiddenInfo() + '     </form>\n    </div>\n    <p style="color:#fff">（系统提供默认参数值(自动替换链接地址和参数值中匹配的内容)：用户账户: @[username] ; 用户密码(加密后) ：@[userpwd] ; 集成应用ID\n        ：@[appid];default_token : @[appdefault_token]）</p></div>';
    }

    function hiddenInfo() {
        return '<div class="hiddenInfo" style="display:none">\n' + '                <div class="form-group"><label class="col-md-3 control-label">起始位置:</label>\n' + '                    <div class="col-md-9">\n' + '                        <div class="form-group form-md-radios">\n' + '                            <div class="md-radio-inline">\n' + '                                <div class="md-radio"><input type="radio" id="postion-left"\n' + '                                                             name="default_postion"\n' + '                                                             class="md-radiobtn" value="true"><label\n' + '                                        for="postion-left"><span class="inc"></span><span class="check"></span>\n' + '                                    <span class="box"></span> 左</label>\n' + "                                </div>\n" + "\n" + '                                <div class="md-radio"><input type="radio" id="postion-right"\n' + '                                                             name="default_postion" value="false"\n' + '                                                             checked="" class="md-radiobtn"> <label\n' + '                                        for="postion-right"><span class="inc"></span> <span\n' + '                                        class="check"></span><span class="box"></span> 右</label>\n' + "                                </div>\n" + "\n" + "                            </div>\n" + "\n" + "                        </div>\n" + "\n" + "                    </div>\n" + "\n" + "                </div>\n" + '                <div class="form-group"><label for="default_x" class="col-md-3 control-label">起始位置（X）：</label>\n' + '                    <div class="col-md-9"><input type="text"\n' + '                                                 class="form-control input-inline input-small "\n' + '                                                 id="default_x" name="default_x"></div>\n' + "\n" + "                </div>\n" + '                <div class="form-group"><label for="default_y" class="col-md-3 control-label">起始位置（X）：</label>\n' + '                    <div class="col-md-9"><input type="text"\n' + '                                                 class="form-control input-inline input-small "\n' + '                                                 id="default_y" name="default_y"></div>\n' + "\n" + "                </div>\n" + '                <div class="form-group"><label for="default_width" class="col-md-3 control-label">起始位置（X）：</label>\n' + '                    <div class="col-md-9"><input type="text"\n' + '                                                 class="form-control input-inline input-small "\n' + '                                                 id="default_width" name="default_width"></div>\n' + "\n" + "                </div>\n" + '                <div class="form-group"><label for="default_height" class="col-md-3 control-label">起始位置（X）：</label>\n' + '                    <div class="col-md-9"><input type="text"\n' + '                                                 class="form-control input-inline input-small "\n' + '                                                 id="default_height" name="default_height"></div>\n' + "\n" + "                </div>\n" + '                <div class="form-group"><label class="col-md-3 control-label">窗口位置:</label>\n' + '                    <div class="col-md-9">\n' + '                        <div class="form-group form-md-radios">\n' + '                            <div class="md-radio-inline">\n' + '                                <div class="md-radio"><input type="radio" id="postion-draggable"\n' + '                                                             name="default_win_postion"\n' + '                                                             class="md-radiobtn" value="true"><label\n' + '                                        for="postion-draggable"><span class="inc"></span><span class="check"></span>\n' + '                                    <span class="box"></span>可拖拽</label>\n' + "                                </div>\n" + "\n" + '                                <div class="md-radio"><input type="radio" id="postion-nodrag"\n' + '                                                             name="default_win_postion" value="false"\n' + '                                                             checked="" class="md-radiobtn"> <label\n' + '                                        for="postion-nodrag"><span class="inc"></span><span\n' + '                                        class="check"></span><span class="box"></span>右</label>\n' + "                                </div>\n" + "\n" + "                            </div>\n" + "\n" + "                        </div>\n" + "\n" + "                    </div>\n" + "\n" + "                </div>\n" + '                <div class="form-group"><label class="col-md-3 control-label">窗口大小:</label>\n' + '                    <div class="col-md-9">\n' + '                        <div class="form-group form-md-radios">\n' + '                            <div class="md-radio-inline">\n' + '                                <div class="md-radio"><input type="radio" id="telescopic"\n' + '                                                             name="default_win_size"\n' + '                                                             class="md-radiobtn" value="true"><label\n' + '                                        for="telescopic"><span class="inc"></span><span class="check"></span>\n' + '                                    <span class="box"></span>可伸缩</label>\n' + "                                </div>\n" + "\n" + '                                <div class="md-radio"><input type="radio" id="size-fixed"\n' + '                                                             name="default_win_size" value="false"\n' + '                                                             checked="" class="md-radiobtn"> <label\n' + '                                        for="size-fixed"><span class="inc"></span><span\n' + '                                        class="check"></span><span class="box"></span>固定</label>\n' + "                                </div>\n" + "\n" + "                            </div>\n" + "\n" + "                        </div>\n" + "\n" + "                    </div>\n" + "\n" + "                </div>\n" + '                <div class="col-md-6 desktop-box">\n' + "                    <fieldset>\n" + '                        <legend style="font-size: 14px">快捷方式</legend>\n' + "                        <div>\n" + '                            <div class="form-group">\n' + '                                <div class="row"><label class="col-md-5 control-label">是否显示:</label>\n' + '                                    <div class="col-md-7">\n' + '                                        <div class="form-group form-md-radios">\n' + '                                            <div class="md-radio-inline">\n' + '                                                <div class="md-radio"><input type="radio" id="show-fastlink" value="true" name="show_fastlink_isValid" class="md-radiobtn" checked="checked">\n' + '                                                    <label for="show-fastlink"><span class="inc"></span><span class="check"></span><span class="box"></span> 是</label></div>\n' + '                                                <div class="md-radio"><input type="radio" id="hide-fastlink" value="false" name="show_fastlink_isValid" class="md-radiobtn"> <label for="hide-fastlink"><span class="inc"></span><span class="check"></span><span class="box"></span> 否 </label></div>\n' + "                                            </div>\n" + "                                        </div>\n" + "                                    </div>\n" + "                                </div>\n" + "                            </div>\n" + '                            <div class="fastlinkImg-box">\n' + '                                <div class="form-group">\n' + '                                    <div class="row"><label class="col-md-5 control-label">图标:</label>\n' + '                                        <div class="col-md-7">\n' + '                                            <div class="fileinput fileinput-new" data-provides="fileinput">\n' + '                                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 48px; height: 48px; line-height: 150px;font-size: 14px;padding: 1px;border: 2px solid #eeeeee">\n' + '                                                    <img class="fastlink-icon" id="fastlink-icon" src="" alt="" style="width:100%;height:100%">\n' + "                                                </div>\n" + '                                                <span class="btn red fileinput-button">\n' + '                    <i class="fa fa-plus"></i>\n' + "               <span>选择图片</span>\n" + '                <input type="file" name="file" data-type="show_fastlink_icon_url">\n' + '                <input type="hidden" value="" name="show_fastlink_icon_url" id="show_fastlink_icon_url">\n' + "                </span>\n" + '                                                <a href="javascript:" class="btn red fileinput-exists" data-dismiss="fileinput"> 取消</a>\n' + "                                            </div>\n" + "                                        </div>\n" + "                                    </div>\n" + "                                </div>\n" + "                            </div>\n" + "                        </div>\n" + "                    </fieldset>\n" + "                </div>\n" + "            </div>";
    }

    function panks(conf, id) {
        return '<div class="row" id="module_' + conf.id + '">    <div class="col-md-12">	<div class="portlet">	    <div class="portlet-title">		<div class="caption">		    <i class="fa fa-user"></i>组织机构管理	</div>		<div class="tools">                   <a href="" class="fullscreen" data-original-title="" title="">                   </a>		</div>	    </div>	    <div class="portlet-body">' + panksLeft(conf) + panksRight(conf) + "           </div>       </div>   </div></div>" + deleteModal() + sendDataModal();
    }

    function panksLeft(conf) {
        return '<div class="profile-sidebar">    <div class="portlet red-pink box">        <div class="portlet-title">            <div class="caption">                <i class="fa fa-users"></i>组织结构导航            </div>            <div class="tools">                <a href="javascript:;" class="collapse">                </a>            </div>        </div>        <div class="portlet-body">            <div id="tree_' + conf.id + '" class="tree-demo">            </div>        </div>    </div></div>';
    }

    function deleteModal() {
        return '<div id="deleteSysModal" class="modal fade" tabindex="-1">    <div class="modal-header">        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>          </div>          <div class="modal-body"><h4>确定删除？</h4></div>       <div class="modal-footer">           <button class="btn default" data-dismiss="modal" aria-hidden="true">取消</button>   <button type="button" class="btn green-meadow" id="deleteSysBtn">确定</button> </div> </div>';
    }

    function sendDataModal() {
        return '<div class="modal fade bs-modal-lg" id="sendDataModal" style="display: none;">\n' + '    <div class="modal-dialog modal-lg" style="margin:0;">\n' + '    <div class="modal-content">\n' + '    <div class="modal-header">\n' + '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\n' + '        <h4 class="modal-title">发送组织机构全量数据</h4>\n' + "    </div>\n" + '    <div class="modal-body">\n' + '        <div class="portlet-body form">\n' + '            <form class="form-horizontal" role="form">\n' + '                <div class="form-body">\n' + '                    <div class="form-group">\n' + '                        <label class="col-md-2 control-label">选择接口：</label>\n' + '                        <div class="col-md-10 check-box">\n' + "    </div>\n" + "                    </div>\n" + '                    <div class="form-group">\n' + '                        <label for="address" class="col-md-3 control-label">请输入单独需要推送地址：</label>\n' + '                        <div class="col-md-9">\n' + '                            <input type="text" id="address" name="address" class="form-control input-inline input-medium">\n' + "                        </div>\n" + "                    </div>\n" + '                    <div class="result-box">\n' + "  <span id='url-box'></span>\n" + "   <span id='res-box' style='margin-left:10px'></span>\n" + "   </div>\n" + "   </div>\n" + "  </form>\n" + "  </div>\n" + "    </div>\n" + '    <div class="modal-footer">\n' + '        <button type="button" class="btn default" data-dismiss="modal">关闭</button>\n' + "\n" + '        <button type="button" id="sendBtn" class="btn red">发送</button>\n' + "\n" + "    </div>\n" + "</div>";
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
            rules: {default_title: {required: true}},
            messages: {default_title: {required: "请输入标题名称"}},
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
                    html += '<div class="md-checkbox ">\n' + '<input type="checkbox" id="checkbox' + i + '" name="' + address[i].name + '" class="md-check" data-index="' + i + '">\n' + '<label for="checkbox' + i + '">\n' + '<span class="inc"></span>\n' + '<span class="check"></span>\n' + '<span class="box"></span>\n' + "" + address[i].boxLabel + "</label>" + "</div>";
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
                console.log(data);
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
                    e.preventDefault();
                    var tag = $("#deleteSysModal");
                    tag.modal("show");
                });
                $("#deleteSysBtn").on("click", function (e) {
                    e.preventDefault();
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
            });
        }
    };
})();