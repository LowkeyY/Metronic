Ext.namespace("bin.task");bin.task.SchedulePanel=function(D){this.frames=D;Task=this.frames.get("Task");this.retFn=function(E){E.setActiveTab("SchedulePanel");E.setStatusValue(["任务执行".loc()]);}.createCallback(Task.mainPanel);this.ButtonArray=[];this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"save",text:"保存".loc(),icon:"/themes/icon/xp/save.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:false,state:"create",handler:this.onButtonClick}));this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"updatesave",text:"保存".loc(),icon:"/themes/icon/xp/save.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:true,state:"edit",handler:this.onButtonClick}));this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"delete",text:"删除".loc(),icon:"/themes/icon/common/delete.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:true,state:"edit",handler:this.onButtonClick}));this.ButtonArray.push(new Ext.Toolbar.Separator());this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"param",text:"参数设置".loc(),icon:"/themes/icon/xp/properties.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:true,state:"edit",handler:this.onButtonClick}));this.ButtonArray.push(new Ext.Toolbar.Separator());this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"run",text:"测试执行".loc(),icon:"/themes/icon/all/lightning.gif",cls:"x-btn-text-icon  bmenu",disabled:false,state:"edit",scope:this,hidden:true,handler:this.onButtonClick}));this.ButtonArray.push(new Ext.Toolbar.Button({btnId:"restart",text:"重启任务服务".loc(),icon:"/themes/icon/database/run_exc.gif",cls:"x-btn-text-icon  bmenu",disabled:false,scope:this,hidden:true,state:"edit",handler:this.onButtonClick}));this.params={};this.ds=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"/bin/task/schedule.jcp?",method:"GET"}),reader:new Ext.data.JsonReader({},[{name:"taskType",mapping:"taskType"},{name:"schduleName",mapping:"schduleName"},{name:"monthCheckArr",mapping:"monthCheckArr"},{name:"weekCheckArr",mapping:"weekCheckArr"},{name:"dateCheckArr",mapping:"dateCheckArr"},{name:"dateType",mapping:"dateType"},{name:"dateTypeArr",mapping:"dateTypeArr"},{name:"hourArr",mapping:"hourArr"},{name:"createdate",mapping:"createdate"},{name:"creater",mapping:"creater"}]),remoteSort:false});this.titleForm=new Ext.FormPanel({labelWidth:100,labelAlign:"right",border:false,frame:false,shadow:false,collapsible:false,region:"north",layout:"fit",bodyStyle:"padding:20px 0px 0px 0px;height:50px;width:100%;background:#FFFFFF;",items:[{layout:"column",border:false,items:[{columnWidth:1,layout:"form",border:false,items:[new Ext.form.TextField({fieldLabel:"执行名称".loc(),name:"schedule_name",width:280,maxLength:64,allowBlank:false,regex:/^[^\<\>\'\"\&]+$/,regexText:"执行名称中不应有".loc()+"&,<,>,',\","+"字符".loc(),maxLengthText:"执行名称不能超过{0}个字符!".loc(),blankText:"执行名称必须提供.".loc()})]}]}]});var A=[];A.push('<FORM name="_FORM_UNPOST_TASKDATE__">');A.push('<fieldset style="padding: 2"><legend>'+"选择月份".loc()+'</legend><input type="checkbox" name="month" value="0" > '+"一月".loc()+' <input type="checkbox" name="month" value="1" > '+"二月".loc()+'<input type="checkbox" name="month" value="2" > '+"三月".loc()+'<input type="checkbox" name="month" value="3"> '+"四月".loc()+'<input type="checkbox" name="month" value="4" > '+"五月".loc()+'<input type="checkbox" name="month" value="5" > '+"六月".loc()+'<br><input type="checkbox" name="month" value="6" > '+"七月".loc()+'<input type="checkbox" name="month" value="7" > '+"八月".loc()+'<input type="checkbox" name="month" value="8" > '+"九月".loc()+'<input type="checkbox" name="month" value="9" > '+"十月".loc()+'<input type="checkbox" name="month" value="10" > '+"十一月".loc()+'<input type="checkbox" name="month" value="11" > '+"十二月".loc()+"</fieldset>");A.push('<fieldset style="padding: 2"><legend><input type="radio" value="V1"  name="R1" checked=true onclick="c_dates.style.display=\'\';c_week.style.display=\'none\'">'+"日期".loc()+' <input type="radio" value="V1" name="R1" onclick="c_dates.style.display=\'none\';c_week.style.display=\'\'">'+"星期".loc()+' </legend><div id="c_dates">');for(var B=1;B<=31;B++){A.push('<input type=checkbox name="days" value="');A.push(B);A.push('">');A.push(B);A.push("日".loc());if(B%10==0){A.push("<br>");}}A.push('<input type="checkbox" name="days" value="-1" >'+"最后一天".loc()+'<input type="checkbox" name="days" value="-2" >'+"倒数第二天".loc()+'<input type="checkbox" name="days" value="-3" >'+"倒数第三天".loc()+"</div>");A.push('<div id="c_week" style="display:none">'+"星期".loc()+' <select size="6" name="D1" multiple> <option value="1" >'+"第一个".loc()+'  </option> <option value="2" >'+"第二个".loc()+'</option> <option value="3" >'+"第三个".loc()+'</option> <option value="4" >'+"第四个".loc()+'</option> <option value="-1" >'+"最后一个".loc()+'</option> </select> <select size="6" name="D2" multiple> <option value="1" >'+"星期一".loc()+'</option> <option value="2" >'+"星期二".loc()+'</option> <option value="3" >'+"星期三".loc()+'</option> <option value="4" >'+"星期四".loc()+'</option> <option value="5" >'+"星期五".loc()+'</option> <option value="6" >'+"星期六".loc()+'</option> <option value="7" >'+"星期日".loc()+"</option> </select></div></fieldset>");A.push('<fieldset style="padding: 2"> <legend>'+"选择时间".loc()+' </legend> <select style="width:70px" size="4" name="D1" multiple></select><button href="#" onclick="javascript:return delSchedule();">'+"删除".loc()+'</button><br> <select size="1" name="D2"> <option value="24">0</option> <option value="01">1</option> <option value="02">2</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option> </select> 点 <select size="1" name="D3"> <option value="00">0</option> <option value="01">1</option> <option value="02">2</option> <option value="03">3</option> <option value="04">4</option> <option value="05">5</option> <option value="06">6</option> <option value="07">7</option> <option value="08">8</option> <option value="09">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option> <option value="24">24</option> <option value="25">25</option> <option value="26">26</option> <option value="27">27</option> <option value="28">28</option> <option value="29">29</option> <option value="30">30</option> <option value="31">31</option> <option value="32">32</option> <option value="33">33</option> <option value="34">34</option> <option value="35">35</option> <option value="36">36</option> <option value="37">37</option> <option value="38">38</option> <option value="39">39</option> <option value="40">40</option> <option value="41">41</option> <option value="42">42</option> <option value="43">43</option> <option value="44">44</option> <option value="45">45</option> <option value="46">46</option> <option value="47">47</option> <option value="48">48</option> <option value="49">49</option> <option value="50">50</option> <option value="51">51</option> <option value="52">52</option> <option value="53">53</option> <option value="54">54</option> <option value="55">55</option> <option value="56">56</option> <option value="57">57</option> <option value="58">58</option> <option value="59">59</option> </select>分 <button href="#" onclick="javascript:return instSchedule();">添加</button> </fieldset>');A.push("</fieldset></FORM>");var C=A.join("");this.scheduleDefinePanel=new Ext.Panel({frame:false,collapsible:false,layout:"fit",region:"center",border:false,bodyStyle:"padding:0px 30px 0px 30px;height:100%;width:100%;background:#FFFFFF;",html:C});this.MainTabPanel=new Ext.Panel({layout:"border",border:false,split:false,id:"SchedulePanel",cached:true,frame:false,collapsible:false,items:[this.titleForm,this.scheduleDefinePanel],tbar:this.ButtonArray});};bin.task.SchedulePanel.prototype={formCreate:function(B){this.frames.get("Task").mainPanel.setStatusValue(["任务执行".loc()]);if(B){this.frames.get("Task").mainPanel.setStatusValue(["任务执行".loc(),B.parent_id,"无".loc(),"无".loc()]);this.toggleToolBar("create");this.params=B;var A=document.getElementsByName("_FORM_UNPOST_TASKDATE__")[0];A.reset();removeAllTime();}else{this.hideToolBar();}this.titleForm.form.reset();},formEdit:function(){this.toggleToolBar("edit");},hideToolBar:function(){var A=this.MainTabPanel.getTopToolbar();A.items.each(function(B){B.disable();},A.items);},toggleToolBar:function(B){var A=this.MainTabPanel.getTopToolbar();A.items.each(function(C){C.hide();},A.items);A.items.each(function(C){if(C.state==B){C.show();}},A.items);},loadTask:function(B){this.params=B;var A=this.titleForm.form;this.ds.baseParams=B;this.ds.load();this.ds.on("load",function(){var M=this.ds.getAt(0).data.taskType;var P=this.ds.getAt(0).data.schduleName;var L=this.ds.getAt(0).data.creater;var H=this.ds.getAt(0).data.createdate;var O=Ext.util.JSON.decode(this.ds.getAt(0).data.monthCheckArr);var E=Ext.util.JSON.decode(this.ds.getAt(0).data.weekCheckArr);var Q=Ext.util.JSON.decode(this.ds.getAt(0).data.dateTypeArr);var K=Ext.util.JSON.decode(this.ds.getAt(0).data.dateCheckArr);var Q=Ext.util.JSON.decode(this.ds.getAt(0).data.dateTypeArr);var C=Ext.util.JSON.decode(this.ds.getAt(0).data.hourArr);var N=document.getElementsByName("_FORM_UNPOST_TASKDATE__")[0];N.reset();removeAllTime();var I=Ext.DomQuery.select("input[name=month]",N.childNodes[0]);for(var G=0;G<I.length;G++){if(O[G]=="checked"){I[G].checked=true;}}DayTypeSelect(this.ds.getAt(0).data.dateType);if(this.ds.getAt(0).data.dateType=="date"){var J=Ext.DomQuery.select("input[name=days]",N.childNodes[1]);for(var G=0;G<J.length;G++){if(K[G]=="checked"){J[G].checked=true;}}var F=Ext.DomQuery.select("input[name=R1]",N.childNodes[1]);F[0].checked=true;}else{var F=Ext.DomQuery.select("input[name=R1]",N.childNodes[1]);F[1].checked=true;var D=Ext.DomQuery.selectNode("select[name=D1]",N.childNodes[1]);var J=Ext.DomQuery.selectNode("select[name=D2]",N.childNodes[1]);for(var G=0;G<D.length;G++){if(E[G]=="selected"){D[G].selected=true;}}for(var G=0;G<J.length;G++){if(K[G]=="selected"){J[G].selected=true;}}}A.findField("schedule_name").setValue(P);addHour(C);this.frames.get("Task").mainPanel.setStatusValue(["任务执行".loc(),B.schedule_id,L,H]);},this);},getTaskDateValue:function(){var D=[];var A=[];var M=[];var B=[];var K=document.getElementsByName("_FORM_UNPOST_TASKDATE__")[0];var I=Ext.DomQuery.select("input[name=month]",K.childNodes[0]);for(var H=0;H<I.length;H++){if(I[H].checked){D.push(I[H].value);}}var L=false;var F=Ext.DomQuery.select("input[name=R1]",K.childNodes[1])[0];if(F.checked){var J=Ext.DomQuery.select("input[name=days]",K.childNodes[1]);for(var H=0;H<J.length;H++){if(J[H].checked){M.push(J[H].value);}}}else{L=true;var C=Ext.DomQuery.selectNode("select[name=D1]",K.childNodes[1]).childNodes;var J=Ext.DomQuery.selectNode("select[name=D2]",K.childNodes[1]).childNodes;for(var H=0;H<C.length;H++){if(C[H].selected){A.push(C[H].value);}}for(var H=0;H<J.length;H++){if(J[H].selected){M.push(J[H].value);}}}var E=Ext.DomQuery.selectNode("select[name=D1]",K.childNodes[2]).childNodes;for(var H=0;H<E.length;H++){B.push(Number(E[H]._hh+"")*60+Number(E[H]._mm+""));}var G=["<tasktime><mon>"];for(var H=0;H<D.length;H++){G.push('<element value="'+D[H]+'" />');}G.push("</mon><week>");for(var H=0;H<A.length;H++){G.push('<element value="'+A[H]+'" />');}G.push("</week><day>");for(var H=0;H<M.length;H++){G.push('<element value="'+M[H]+'" />');}G.push("</day><time>");for(var H=0;H<B.length;H++){G.push('<element value="'+B[H]+'" />');}G.push("</time></tasktime>");if(D.length==0||M.length==0||(L==true&&A.length==0)||B.length==0){Ext.msg("error","必须定义完整执行时间!".loc());return false;}return G.join("");},onButtonClick:function(C){F=this.frames.get("Task");if(C.btnId=="save"){var D=this.titleForm.form;var A=this.params;A.type="save";if(D.isValid()){A.schedule_name=D.findField("schedule_name").getValue();A.content=this.getTaskDateValue();if(this.getTaskDateValue()){Ext.Ajax.request({url:"/bin/task/schedule.jcp",params:A,method:"post",scope:this,success:function(I,J){var H=I.responseText;var G=Ext.util.JSON.decode(H);if(G.success){Ext.msg("info","保存成功".loc());F.navPanel.getTree().loadSubNode(G.schedule_id,F.navPanel.clickEvent);}else{Ext.msg("error","数据保存失败!,原因:".loc()+"<br>"+G.message);}}});}}else{Ext.msg("error","数据不能提交,请修改表单中标识的错误!".loc());}}else{if(C.btnId=="delete"){Ext.msg("confirm","确认删除?".loc(),function(G){if(G=="yes"){var H=this.params;H.type="delete";Ext.Ajax.request({url:"/bin/task/schedule.jcp",params:H,method:"post",scope:this,success:function(K,L){var J=K.responseText;var I=Ext.util.JSON.decode(J);if(I.success){F.navPanel.getTree().loadParentNode(F.navPanel.clickEvent);}else{Ext.msg("error","数据删除失败!,原因:".loc()+"<br>"+I.message);}}});}}.createDelegate(this));}else{if(C.btnId=="updatesave"){var D=this.titleForm.form;var A=this.params;A.type="updatesave";if(D.isValid()){A.schedule_name=D.findField("schedule_name").getValue();A.content=this.getTaskDateValue();if(this.getTaskDateValue()){Ext.Ajax.request({url:"/bin/task/schedule.jcp",params:A,method:"post",scope:this,success:function(I,J){var H=I.responseText;var G=Ext.util.JSON.decode(H);if(G.success){Ext.msg("info","更新成功".loc());F.navPanel.getTree().loadSelfNode(G.schedule_id,F.navPanel.clickEvent);}else{Ext.msg("error","数据删除失败!,原因:".loc()+"<br>"+G.message);}}});}}else{Ext.msg("error","数据不能提交,请修改表单中标识的错误!".loc());}}else{if(C.btnId=="param"){using("bin.task.TaskParamsPanel");var F=this.frames.get("Task");F.paramPanel=new bin.task.TaskParamsPanel(this.frames,this.retFn);F.mainPanel.add(F.paramPanel.paramGrid);F.mainPanel.setActiveTab(F.paramPanel.paramGrid);F.paramPanel.init(this.params);}else{if(C.btnId=="restart"){var B=this.params;B.type="restart";Ext.Ajax.request({url:"/bin/task/schedule.jcp",params:B,method:"post",scope:this,success:function(I,J){var H=I.responseText;var G=Ext.util.JSON.decode(H);if(G.success){Ext.msg("info","任务重启成功".loc());}else{Ext.msg("error","任务重启动失败失败!,原因:".loc()+"<br>"+G.message);}}});}else{if(C.btnId=="run"){var E=this.params;E.type="run";E.parent_id=this.params.parent_id;Ext.Ajax.request({url:"/bin/task/schedule.jcp",params:E,method:"POST",scope:this,success:function(G,H){Ext.msg("info","执行成功!".loc());},failure:function(G,H){Ext.msg("error","任务重启动失败失败!,原因:".loc()+"<br>"+H.result.message);}});}}}}}}}};