Ext.namespace("lib.upload");

Ext.form.FlashFile = Ext.extend(Ext.form.Field, {
	focusClass : undefined,
	fieldClass : "x-form-field",
	inputPre : "filesUpload",
	icon : "/lib/upload/images/attach2.gif",
	defaultAutoCreate : {
		tag : "div"
	},
	actionMode : "wrap",
	initComponent : function() {
		Ext.form.FlashFile.superclass.initComponent.call(this);
		this.addEvents()
	},
	onResize : function() {
		Ext.form.FlashFile.superclass.onResize.apply(this, arguments);
		if (!this.boxLabel && !this.fieldLabel) {
			this.el.alignTo(this.wrap, "c-c")
		}
	},
	initEvents : function() {
		Ext.form.FlashFile.superclass.initEvents.call(this)
	},
	getResizeEl : function() {
		return this.wrap
	},
	getPositionEl : function() {
		return this.wrap
	},
	parseDom : function(arg) {
		var o = document.createElement("div");
		o.innerHTML = arg;
		return o;
	},
	getElementsByTagId : function(e, t, i) {
		var r = null;
		Ext.each(e.getElementsByTagName(t), function(n) {
					if (i != null) {
						if (n.getAttribute("id") == i) {
							r = n;
						}
					} else {
						r = n;
					}
				})
		return r;
	},
	removeItem : function(num, isEdit) {
		if (isEdit) {
			var flashTextNode = Ext.getDom("flashText_edit_" + this.id + "_" + num);
			flashTextNode.parentNode.removeChild(flashTextNode);
			var flashFileNode = Ext.getDom("flashFile_edit_" + this.id + "_" + num);
			flashFileNode.parentNode.removeChild(flashFileNode);
			//Ext.getDom("flashText_edit_" + this.id + "_" + num).remove();
			//Ext.getDom("flashFile_edit_" + this.id + "_" + num).remove();
			this.valuesAreaSetValue();
			return;
		}
		var flashTextNode = Ext.getDom("flashText_" + this.id + "_" + num);
		flashTextNode.parentNode.removeChild(flashTextNode);
		var flashFileNode = Ext.getDom("flashFile_" + this.id + "_" + num);
		flashFileNode.parentNode.removeChild(flashFileNode);
		//Ext.getDom("flashText_" + this.id + "_" + num).remove();
		//Ext.getDom("flashFile_" + this.id + "_" + num).remove();
		this.valuesAreaSetValue();
	},
	downloadItem : function(path){
		if(path!=null){
			this.iframePanel.el.dom.src = "/lib/upload/FlashFileDownload.jcp?path="+path;
		}
	},
	showFile : function(filename, filesize, num) {
		var field = "Ext.getCmp('" + this.id + "')";
		var value = [
				'<div id="flashText_',
				this.id,
				"_",
				num,
				'" style="line-height: 18px;" >',
				'<img align="absmiddle" src="',
				this.icon,
				'" / ><a>',
				filename,
				this.formatSize(filesize),
				'</a>&nbsp;<span id="status_',
				num,
				'" width="100px" style="color:#999999;font-size:10px;">等待上传</span>',
				'<span id="progress_',
				num,
				'" style="display:none;width:100px;border:1px solid #ddd;">',
				'<div style="display:inline-block;height:10px;background:#687ed9;"></div></span>',
				'<a style="cursor:pointer;padding-left:5px;" onclick="', field,
				".cancel(", num, ');">' + "删除" + "</a>",
				'</div><input id="flashFile_', this.id, "_", num, '" name="',
				this.inputPre, '[]" type="hidden" />'];
		this.listCt.appendChild(this.parseDom(value.join("")));
	},
	progress : function(a, f) {
		var d = Ext.getDom("flashText_" + this.id + "_" + f);
		var c = this.getElementsByTagId(d, "span", "progress_" + f);
		if (a == "end") {
			c.style.display = "none";
		} else {
			this.getElementsByTagId(d, "span", "status_" + f).style.display = "none";
			c.style.display = "inline-block";
			this.getElementsByTagId(c, "div").style.width = a;
		}
	},
	cancel : function(num) {
		var obj = Ext.getDom(this.id).getElementsByTagName("object")[0];
		obj.cancel(num);
		this.removeItem(num);
	},
	uploadComplate : function(filename, filepath, filesize, num) {
		Ext.getDom("flashFile_" + this.id + "_" + num).value = Ext.encode({
			fileName : filename,
			filePath : filepath,
			fileSize : filesize
		});
		this.valuesAreaSetValue();

	},
	valuesAreaSetValue : function(){
		Ext.getDom("flashFile_" + this.id + "_all").value = this.getValue();
	},
	insertItem : function(fileConf, num) {
		var field = "Ext.getCmp('" + this.id + "')";
		var filename = fileConf.fileName;
		var filesize = fileConf.fileSize;
		var filepath = fileConf.filePath;
		fileConf = Ext.encode(fileConf);
		var value =[];
		if(this.state!="view")
			value = ['<div id="flashText_edit_', this.id, "_", num,
					'" style="line-height: 18px;" >',
					'<img align="absmiddle" src="', this.icon, '" / ><a>', filename,
					this.formatSize(filesize), "</a>&nbsp;",
					'<a style="cursor:pointer;padding-left:5px;" onclick="', field,
					".removeItem(", num, ', true);">' + "删除" + "</a>",
					'</div><input id="flashFile_edit_', this.id, "_", num,
					'" name="', this.inputPre, '[]" type="hidden" value=\'',fileConf,
					'\'/>'];
		else
			value = ['<div id="flashText_view_', this.id, "_", num,
					'" style="line-height: 18px;" >',
					'<img align="absmiddle" src="', this.icon, '" / ><a>', filename,
					this.formatSize(filesize), "</a>&nbsp;",
					'<a style="cursor:pointer;padding-left:5px;" onclick="', field,
					".downloadItem(","'", filepath,"'", ');">' + "下载" + "</a>",
					'</div><input id="flashFile_view_', this.id, "_", num,
					'" name="', this.inputPre, '[]" type="hidden" value=\'', fileConf,
					'\'/>'];
		this.listCt.appendChild(this.parseDom(value.join("")));
		
	},
	calllog : function(str){
		lg("--"+str);
	},
	formatSize : function(size) {
		var result;
		if (size >= 0 && size < 1024) {
			result = size + "Byte"
		} else {
			if (size >= 1024 && size < 1048576) {
				result = Math.floor(size / 1024) + "K"
			} else {
				result = Math.floor(size / 1024 / 1024 * 10) / 10 + "M"
			}
		}
		return "(" + result + ")"
	},
	onRender : function(b, a) {
		var c = this;
		this.iframePanel = new Ext.ux.IFrameComponent({
				url : '',
				style : 'position:relative;left:0; top:0; height:0; width:0'
			});
		Ext.form.FlashFile.superclass.onRender.call(this, b, a);
		this.wrap = this.el.wrap({
					cls : "x-form-flashfile-wrap"
				});
		if(Ext.isDefined(this.name))
			this.inputPre = this.name;
		if(this.state!="view")
			new Ext.Container({
				layout : "table",
				layoutConfig : {
					columns : 1
				},
				renderTo : this.wrap.dom.firstChild,
				items : [{
					xtype : "flash",
					url : "/lib/upload/attachsUpload.swf?ext=Ext.getCmp('"
							+ this.id
							+ "')&upload=uploadComplate&progress=progress&sf=showFile&cl=calllog",
					wmode : "transparent",
					style : "margin-top:2px;",
					height : 20,
					width : 75,
					listeners : {
						render : function(d) {
							setTimeout(function() {
										d.setHeight(22)
									}, 100)
						}
					}
				}]
			});
		else
			new Ext.Container({
				layout : "table",
				layoutConfig : {
					columns : 1
				},
				renderTo : this.wrap.dom.firstChild,
				items : [this.iframePanel]
			});
		this.listCt = document.createElement("div");
		this.valuesArea = document.createElement("input");
		Ext.apply(this.valuesArea,{
			id : "flashFile_"+this.id+"_all",
			name : this.inputPre,
			type : "hidden",
			value : this.originalValue || ""
		});
		this.wrap.dom.appendChild(this.valuesArea);
		this.wrap.dom.appendChild(this.listCt);
	},
	onDestroy : function() {
		Ext.destroy(this.wrap);
		Ext.form.FlashFile.superclass.onDestroy.call(this)
	},
	initValue : function() {
		this.originalValue = this.getValue()
	},
	getValue : function() {
		var rv = [];
		if (this.rendered) {
			if(Ext.isDefined(this.listCt)){
				Ext.each(this.listCt.getElementsByTagName("input"),function(input){
					if(input.value!="")
						rv.push(Ext.decode(input.value));
				})
			}
		}
		var values = {
			attachsUpload : {
				tempItems : rv
			}
		}
		return Ext.isEmpty(rv)?"":Ext.encode(values);
	},
	setValue : function(sv) {
		if (!sv) {
			this.listCt.innerHTML = "";
			return this;
		}
		try {
			sv = Ext.decode(sv);
		} catch (e) {
			return this;
		}
		this.listCt.innerHTML = "";
		if (Ext.isObject(sv) && Ext.isDefined(sv.attachsUpload)) {
			var num = 1;
			Ext.each(sv.attachsUpload.formalItems, function(i) {
						this.insertItem(i, num);
						num++;
					}.createDelegate(this))
		}
		this.valuesAreaSetValue();
		return this;
	}
});
Ext.reg("flashfile", Ext.form.FlashFile);