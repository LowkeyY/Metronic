if(Ext.data.Connection){Ext.override(Ext.data.Connection,{handleFailure:function(response,e){this.transId=false;var options=response.argument.options;if(response.status==401){var callbackScript=response.getResponseHeader("Callback-Script");if(callbackScript){eval(callbackScript);}else{top.TimeOut.showWindow(this,options);}return ;}response.argument=options?options.argument:null;this.fireEvent("requestexception",this,response,options,e);Ext.callback(options.failure,options.scope,[response,options]);Ext.callback(options.callback,options.scope,[options,false,response]);}});}top.TimeOut=function(){var B=30;var E=new Ext.Panel({baseCls:"x-plain",style:"background:#f9f9f9  no-repeat center center;",region:"center"});var A=new Ext.form.FormPanel({bodyStyle:"background:#ffffff;padding:0px 0 5px 5px;",height:40,items:[{name:"usrMail",xtype:"hidden"},{name:"usrLang",xtype:"hidden"},{xtype:"textfield",fieldLabel:"请输入密码",width:150,inputType:"password",name:"usrPwd",labelStyle:"text-align:right;width:200;padding:3px 10px 0px 0px",allowBlank:false},{xtype:"hidden",name:"lt"}],border:false,region:"south",url:"/login/login.jcp"});var C=new Ext.Window({buttons:[{handler:function(){window.legalQuit=true;self.location.replace("/login/");},text:"以其他用户登录"},{handler:function(){top.TimeOut.login();},text:"登录"}],buttonAlign:"right",closable:false,draggable:true,layout:"border",modal:true,resizable:false,items:[E,A],title:"系统已自动锁定",height:230,width:530});var D=A.getForm();var F=function(){this.center();};B*=60000;return{expireTime:B,check:false,counter:0,interval:null,shown:false,lastLink:null,warn:function(){alert("由于您长时间没有操作，系统已超时锁定，请重新登录。");self.location.replace("/");},showWindow:function(G,H){if(this.shown){return false;}this.shown=true;top.TimeOut.stop();if(get_cookie("user_name")==null){self.location.replace("/login");}this.lastLink=(typeof (G)!="undefined")?[G,H]:null;var I=get_cookie("language");Ext.Ajax.request({method:"GET",url:"/login/getSysConf.jcp?lang="+I+"&ra="+Math.random(),scope:this,callback:function(N,P,M){var K={};if(!P||!Ext.isDefined(M.responseText)||(K=Ext.decode(M.responseText)).success==false){Ext.msg("error",K.message||"无法连接服务器");return ;}var L=Ext.decode(M.responseText);var O=L.lang;if(O){using("lang."+(O.needToTranslate?O.currentLanguage:"dumb"));}else{using("lang.dumb");}var J=function(){C.once("show",function(){var S=A.form.findField("usrPwd");S.focus();S.clearInvalid.defer(200,S);},this);C.show();if(!E.logoSetted){C.getEl().addKeyListener(13,this.login);C.body.parent().setStyle("border-color","#99BBE8");E.logoSetted=true;var R=K.logo;if(O){var Q=R.split(".");R=Q[0]+"_"+O.currentLanguage+"."+Q[1];}E.getEl().setStyle("background-image","url("+R+")");}A.form.findField("lt").setValue(K.lt);A.authType=K.authType;Ext.EventManager.onWindowResize(F,C);};Ext.onReady(J,this);}});return false;},start:function(){Ext.getBody().on("mouseup",this.updateTime);Ext.getBody().on("keyup",this.updateTime);this.counter=0;this.interval=setInterval(function(){var G=top.TimeOut;if(G.check){G.check=false;G.counter=0;}else{G.counter++;if(G.counter>10){Ext.Ajax.request({url:"/login/PlatformTimeoutChecker.jcp",method:"GET"});}}},Math.ceil(B/10));},stop:function(){Ext.getBody().un("mouseup",this.updateTime);Ext.getBody().un("keyup",this.updateTime);clearInterval(this.interval);},relocation:function(){Ext.Ajax.request({url:"/login/PlatformTimeoutChecker.jcp",method:"POST"});},updateTime:function(){top.TimeOut.check=true;},login:function(){var G=A.form;G.findField("usrMail").setValue(get_cookie("user_name"));if(A.authType!="simple"){G.findField("usrPwd").setValue(hex_md5(G.findField("usrPwd").getValue()));}G.findField("usrLang").setValue(get_cookie("language"));D.submit({waitMsg:"登录中,请等待...",reset:true,scope:this,success:function(){try{var I=top.TimeOut.lastLink;if(I!=null){I[0].request(I[1]);I=null;}}catch(H){var J=WorkBench.Desk.getDesktop();Ext.msg("info","登录成功,但恢复之前操作失败,请重新操作.");}C.hide();Ext.EventManager.removeResizeListener(F,C);top.TimeOut.shown=false;top.TimeOut.start();},failure:function(I,H){Ext.msg("error","<br>"+H.result.errors[0].msg,{scope:this,fn:function(){G.findField("usrPwd").focus();}});var J=get_cookie("language");Ext.Ajax.request({method:"GET",url:"/login/getSysConf.jcp?lang="+J+"&ra="+Math.random(),scope:this,callback:function(M,N,L){var K={};if(!N||!Ext.isDefined(L.responseText)||(K=Ext.decode(L.responseText)).success==false){Ext.msg("error",K.message||"无法连接服务器");return ;}G.findField("lt").setValue(K.lt);G.findField("usrPwd").setValue("");}});}});}};}();top.TimeOut.start();