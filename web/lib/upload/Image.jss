/*
 * 任务: ----1、图片下载 ----2、本地图片预览 ----3、图片滚轮缩放 ----4、图片平移 ----5、隐藏文件框.
 * ----6、服务器端处理生成缩略图 ----7、服务器端处理控件edit模式。 ----8、ondestroy
 * ----9、如果预览时传入后，上传时无需传输。 ----10、三种状态 view new edit -11、增加各级别css bug:
 * ----1、firefox有时出现排版错误 2、放大到超过scrollHeight再缩小会从mask边界出去,从而引发一系列错误.
 * 3、生成预览被打断未处理. ----4、重新提交会错误 等升级: 1、隐藏文件框(all). 2、多文件及多文件queue展示扩展 3、服务器端插件
 * 
 */

lib.upload.Image = Ext.extend(lib.upload.FileBase, {

	/**
	 * @cfg {String} width width of field
	 */

	width : 200,
	height : 170,
	pattern : "*.bmp;*.gif;*.jpg;*.png;*.jpeg",
	txtStyle : '',

	/**
	 * @cfg {String} width width of field
	 */
	imageHeightMax : -1,
	imageHeightMin : -1,
	imageWidthMax : -1,
	imageWidthMin : -1,

	// private
	isView : false,
	canvas : null,
	imagePath : null,
	noImageMessage : '无图片'.loc(),
	loadingMessage : '图片载入中...'.loc(),
	loadFailureMessage : '图片载入失败'.loc(),
	secureLimitMessage : '<span style="font-size:10px;">'+'安全限制,无法预览图片'.loc()+'</span>',

	/**
	 * private creates handlers
	 */
	initComponent : function() {
		lib.upload.Image.superclass.initComponent.call(this);
		if (!this.state)
			this.state = 'new';
		this.isView = this.state == 'view';
		this.canvasHeight = this.height - 2;
	},
	/**
	 * private Renders underlying DateField and provides a workaround for side
	 * error icon bug
	 */
	onRender : function(ct, position) {
		var t = Ext.DomHelper.append(ct, {
					tag : 'table',
					style : 'border-collapse:collapse;width:' + this.width,
					children : [{
								tag : 'tr',
								children : [{
											tag : 'td',
											cls : 'ux-canvas'
										}]
							}, {
								tag : 'tr',
								cls : 'slide-row',
								children : [{
											tag : 'td',
											children : [{
														tag : 'div',
														cls : 'ux-field'
													}]
										}]
							}]
				}, true);
		this.uxField = t.child('div.ux-field');
		this.slideRow = t.child('tr.slide-row');
		this.slideRow.enableDisplayMode("");
		lib.upload.Image.superclass.onRender.call(this, this.uxField, position);
		this.el.dom.setAttribute("name", this.name + "_text");
		Ext.DomHelper.append(this.wrap, {
					tag : 'input',
					type : 'hidden',
					name : this.name + '_tz_Description',
					value : this.maxSize + ":" + this.minSize + ":"
							+ this.pattern
				}, true);
		this.createCanvas(t.child('td.ux-canvas'));
		this.wrap = t.wrap({
					cls : 'x-form-field-wrap x-form-file-wrap'
				});
		if (!this.isView) {
			this.pkc = this.wrap.createChild({
						tag : 'img',
						src : '/themes/icon/all/cross.gif',
						style : 'position: absolute; top: 3px; left: '
								+ (this.width - 20) + 'px;'
					});
			this.pkc.on("click", function() {
						this.reset();
						if (!this.allowBlank)
							this.markInvalid();
					}, this);
			this.pkc.hide();
		} else {
			this.slideRow.hide();
		}

	},

	setValue : function(value) {
		if (!value || value == this.value)
			return;
		if (typeof(value) == 'object') {
			this.imagePath = this.basePath + "download.jcp?fileid=" + value.id
					+ "&r=" + Math.random();
			this.setImage();
			this.ssid.setValue(value.id);
			value = value.value;
		} else {
			this.state = 'new';
			if (Ext.isIE6) {
				this.setImage("file:\\\\" + value);
			} else {
				this.showMessage(this.secureLimitMessage);
			}
			this.ssid.setValue(value);
		}
		lib.upload.Image.superclass.setValue.call(this, value);
		this.value = value;
	},

	createCanvas : function(ct) {
		this.canvas = ct.createChild({
			tag : 'div',
			cls : "widget-uf-canvas",
			style : "width:"
					+ this.width
					+ "px;height:"
					+ (this.isView ? this.canvasHeight : this.canvasHeight - 22)
					+ "px"
		});
		this.canvas.dom.innerHTML = "<center><TABLE cellspacing=0 cellpadding=0><TR><TD><img border='0' src='"
				+ this.basePath
				+ "images/tl.gif' width='12'></TD><TD style='background: url("
				+ this.basePath
				+ "images/t.gif) repeat-x'></TD><TD><img border='0' src='"
				+ this.basePath
				+ "images/tr.gif' width='15'></TD></TR><TR><TD style='background: url("
				+ this.basePath
				+ "images/l.gif) repeat-y'></TD><TD ><img class='tz-img-Pkp'  galleryimg='no'><div class='tz-img-Pkt' style='height:"
				+ (this.canvasHeight - 70)
				+ "px;width:"
				+ (this.width - 30)
				+ "px;font-size:"
				+ ((this.width - 31) / 10)
				+ "px;line-height:"
				+ (this.canvasHeight - 70)
				+ "px;"
				+ this.txtStyle
				+ "'>"
				+ this.noImageMessage
				+ "</div><img src='"
				+ this.basePath
				+ "images/loading.gif' class='tz-img-tip'></TD><TD style='background: url("
				+ this.basePath
				+ "images/r.gif) repeat-y'></TD></TR><TR><TD><img src='"
				+ this.basePath
				+ "images/bl.gif'></TD><TD style='background: url("
				+ this.basePath
				+ "images/b.gif) repeat-x'></TD><TD><img src='"
				+ this.basePath + "images/br.gif'></TD></TR></TABLE></center>";
		this.pkp = this.canvas.child('img.tz-img-Pkp');
		this.pkp.enableDisplayMode("block");
		this.pkt = this.canvas.child('div.tz-img-Pkt');
		this.pkt.enableDisplayMode("block");
		this.tip = this.canvas.child('img.tz-img-tip');

		this.maskEl = Ext.DomHelper.append(document.body, {
					tag : "div",
					cls : "widget-uf-mask"
				}, true);
		this.maskEl.enableDisplayMode("block");
		this.maskEl.hide();
		this.maskEl.createChild({
					tag : 'div',
					cls : "inner"
				});
		var inner = this.maskEl.createChild({
					tag : 'div',
					cls : 'widget-uf-zoomlayer'
				});
		inner.dom.innerHTML = '<table cellspacing="5" cellpadding="0" style="background-color:white"><tr><td style="text-align: right" class="tool"> <a href="#" class="b"><img src="/themes/icon/all/zoom_in.gif" border="0" style="vertical-align: middle" title="放大-可以用鼠标滚轮缩放图片" /></a><a href="#" class="b"><img src="/themes/icon/all/zoom_out.gif" border="0" style="vertical-align: middle" title="缩小-可以用鼠标滚轮缩放图片" /></a><a href="#" class="b"><img src="/themes/icon/all/resize.gif" border="0" style="vertical-align: middle" title="恢复实际大小" /></a><a href="#" class="b" target="_blank"><img src="/themes/icon/all/application_add.gif" border="0" style="vertical-align: middle" title="在新窗口打开" /></a>  <a href="#" class="b"><img style="vertical-align: middle;" src="/themes/icon/all/cross.gif" title="关闭" /></a>&nbsp;</td></tr><tr><td align="center"><img class="tz-img-body"></td></tr></table>';
		var tools = Ext.DomQuery.select("a.b", inner.dom);
		Ext.get(tools[0]).on("click",
				this.resetMaskSize.createDelegate(this, [1.25]));
		Ext.get(tools[1]).on("click",
				this.resetMaskSize.createDelegate(this, [0.75]));
		Ext.get(tools[2]).on("click",
				this.resetMaskSize.createDelegate(this, [0]));
		Ext.get(tools[4]).on("click", this.unmask, this);
		this.maskEl.inner = inner;
		inner.swt = false, inner.bussy = false;
		inner.on("dragstart", function(e) {
					e.stopEvent()
				});
		inner.on("mousedown", function(e) {
					e.stopEvent();
					this.deltaX = e.getPageX() - this.dom.offsetLeft;
					this.deltaY = e.getPageY() - this.dom.offsetTop;
					this.swt = true;
				}, inner);
		inner.on("mousemove", function(e) {
					if (!this.swt)
						return false;
					e.stopPropagation();
					inner.setXY([e.getPageX() - this.deltaX,
							e.getPageY() - this.deltaY]);
				}, inner);
		inner.on("mouseup", function() {
					this.swt = false;
				}, inner);
		inner.on('mousewheel', function(e) {
					e.stopEvent();
					if (inner.bussy)
						return false;
					inner.bussy = true;
					this.resetMaskSize(1 + e.getWheelDelta() * 0.1);
					inner.bussy = false;
				}, this);
		this.maskEl.opbtn = tools[3];
		this.maskEl.zbody = this.maskEl.child("img.tz-img-body");
		this.pkp.on("click", function(e) {
					e.stopEvent();
					if (this.imagePath == null)
						return;
					this.showTip(true);
					var ccimage = new Image();
					ccimage.onload = function() {
						if (ccimage.loaded)
							return;
						ccimage.loaded = true;
						this.showTip(false);
						this.mask(ccimage);
						this.maskEl.opbtn.href = ccimage.src;
					}.createDelegate(this);
					ccimage.onerror = function() {
						this.pkc.hide();
						this.showTip(false);
						this.showMessage(this.loadFailureMessage);
					}.createDelegate(this);
					ccimage.src = this.imagePath;
				}, this);
		this.maskEl.first().on("click", this.unmask, this);
	},
	resetMaskSize : function(size) {
		var img = this.maskEl.img;
		if (size == 0) {
			var w = img.image.width;
			var h = img.image.height;
			img.left += (img.w - w) / 2;
			img.top += (img.h - h) / 2;
			if (img.left < 0)
				img.left = 15;
			if (img.top < 0)
				img.top = 10;
			img.w = w;
			img.h = h;
		} else {
			if (size < 1 && img.w * size < 120)
				return;
			img.left += (img.w - img.w * size) / 2;
			img.top += (img.h - img.h * size) / 2;
			if (img.top < 10)
				img.top = 10;
			if (img.left < 15)
				img.left = 15;
			img.w *= size;
			img.h *= size;
		}
		this.setMaskSize(img);
	},
	setMaskSize : function(img) {
		var scrollTop = document.body.scrollTop
				? document.body.scrollTop
				: document.documentElement.scrollTop;
		var scrollLeft = document.body.scrollLeft
				? document.body.scrollLeft
				: document.documentElement.scrollLeft;
		if (img.h < 90 || img.w < 120) {
			if (img.h < 90) {
				img.ch = 123;
				img.top -= (123 - img.h) / 2
			}
			if (img.w < 120) {
				img.cw = 130;
				img.left -= (130 - img.w) / 2
			}
			if (!img.cw)
				img.cw = img.w + 10;
			if (!img.ch)
				img.ch = img.h + 33;
			this.maskEl.inner.setSize(img.cw, img.ch, true);
		}

		this.maskEl.inner.setLeftTop(scrollLeft + img.left - 15, scrollTop
						+ img.top - 10);
		this.maskEl.zbody.setSize(img.w, img.h);
	},
	mask : function(image) {
		var view = {
			w : Ext.lib.Dom.getViewportWidth(true),
			h : Ext.lib.Dom.getViewportHeight(true)
		}
		var img = this.computeRet({
					h : view.h * 0.8,
					w : view.w * 0.8
				}, {
					h : image.height,
					w : image.width
				});
		img.left += view.w * 0.1;
		img.top += view.h * 0.1;
		img.image = image;
		this.maskEl.img = img;
		this.maskEl.zbody.dom.src = image.src;
		this.setMaskSize(img);
		Ext.getBody().addClass("x-body-masked");
		this.maskEl.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
						.getViewHeight(true));
		this.maskEl.show();
	},
	unmask : function() {
		this.maskEl.hide();
		Ext.getBody().removeClass("x-body-masked");
	},
	showTip : function(show) {
		this.tip.setStyle("display", show ? "block" : "none");
	},
	computeRet : function(can, img) {
		if (img.h > can.h || img.w > can.w)
			if (img.w / img.h >= can.w / can.h) {
				img.h = (img.h * can.w) / img.w;
				img.w = can.w;
			} else {
				img.w = (img.w * can.h) / img.h;
				img.h = can.h;
			}
		return {
			h : img.h,
			w : img.w,
			top : Math.floor((can.h - img.h) / 2),
			left : Math.floor((can.w - img.w) / 2)
		}
	},
	setImage : function(imgsrc) {
		if (!imgsrc)
			imgsrc = this.imagePath;
		this.pkt.dom.innerHTML = this.loadingMessage;
		this.showTip(true);
		var cimage = new Image();
		cimage.onload = function() {
			if (cimage.loaded)
				return;
			cimage.loaded = true;
			this.showTip(false);
			var img = {
				h : cimage.height,
				w : cimage.width
			};
			img = this.computeRet({
						h : this.canvasHeight - 30,
						w : this.width - 27
					}, img);
			img.src = imgsrc;
			this.showPicture(true, img);
		}.createDelegate(this);
		cimage.onerror = function() {
			this.showTip(false);
			this.showMessage(this.loadFailureMessage, true);
		}.createDelegate(this);
		cimage.src = imgsrc;

	},
	showPicture : function(vis, cfg) {
		var fn = vis ? "show" : "hide";
		if (!this.isView) {
			this.pkc[fn]();
			if (vis) {
				this.uxField.slideOut('t', {
							duration : 0.6,
							callback : function() {
								this.pkp.dom.src = cfg.src;
								this.canvas.first().setStyle("margin-top",
										cfg.top + "px");
								this.pkp.setStyle("width", cfg.w + "px");
								this.pkp.setStyle("height", cfg.h + "px");
								this.slideRow.hide();
								this.canvas.setHeight(this.canvasHeight);
								this.slideRow.setStyle("height", "20px");
								this.pkt.hide();
								this.pkp.show();
							},
							scope : this
						});
			} else {
				this.canvas.setHeight(this.canvasHeight - 35);
				var sld = this.slideRow;
				sld.show();
				this.pkp.hide();
				this.uxField.slideIn('t', {
							callback : function() {
								setTimeout(function() {
											sld.setStyle("height", "22px");
										}, 10);

								this.pkt.show();
							},
							scope : this
						});
			}

		} else {
			if (cfg) {
				this.pkp.dom.src = cfg.src;
				this.canvas.first().setStyle("margin-top", cfg.top + "px");
				this.pkp.setStyle("width", cfg.w + "px");
				this.pkp.setStyle("height", cfg.h + "px");

				this.pkt.hide();
				this.pkp.show();
			}
		}
	},
	showMessage : function(message, center) {
		this.canvas.first().setStyle("margin-top", center ? "8px" : "0px");
		this.pkt.dom.innerHTML = message;
		this.showPicture(false);
	},

	reset : function() {
		this.value = "";
		this.showTip(false);
		this.ssid.setValue("");
		lib.upload.Image.superclass.setValue.call(this, '');
		this.state = 'new';
		this.showMessage(this.noImageMessage);
		this.imagePath = null;
		this.clearInvalid();
	},

	onDestroy : function() {
		if (this.tzdestroyed)
			return;
		this.tzdestroyed = true;
		if (!this.isView) {
			if (this.pkc) {
				this.pkc.removeAllListeners();
				this.pkc.remove();
			}
		}
		this.pkp.removeAllListeners();
		this.pkp.remove();
		this.maskEl.zbody.removeAllListeners();
		this.maskEl.zbody.remove();
		this.pkt.removeAllListeners();
		this.pkt.remove();
		this.tip.remove();
		this.maskEl.inner.removeAllListeners();
		this.maskEl.inner.remove();
		var s = this.maskEl.first();
		s.removeAllListeners();
		s.remove();
		delete(s);
		this.maskEl.removeAllListeners();
		this.maskEl.remove();
	}

});
Ext.reg('imageupload', lib.upload.Image);