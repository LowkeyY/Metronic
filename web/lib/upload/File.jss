lib.upload.File = Ext.extend(lib.upload.FileBase, {
			/**
			 * @cfg {String} width width of field
			 */
			width : 200,
			/**
			 * @cfg {String} 是否显示文本框。
			 */
			hideTextField : false,
			/**
			 * @cfg {String} 下载文件的url
			 */
			/**
			 * state
			 * 
			 * @cfg {String} 当前控件所处的状态，有新建，编辑（new,edit）两个状态。
			 */
			downloadUrl : '/lib/upload/download.jcp',
			/**
			 * private Renders underlying DateField and provides a workaround
			 * for side error icon bug
			 */
			onRender : function(ct, position) {
				this.ct = ct;
				this.position = position;
				if (!this.ssid) {
					this.ssid = ct.createChild({
								id : this.id + "-ssid",
								name : this.name + "_SSID",
								tag : 'input',
								type : 'hidden'
							});
					this.ssid.setValue = function(v) {
						this.dom.value = v;
					}
				}
				if (this.state == 'new')
					this.renderNew();
				else {
					this.el = this.ct.createChild({
								id : this.id
							}, this.position);
					this.wrap = this.el.wrap({
								cls : 'x-form-field-wrap x-form-file-wrap'
							});
					this.buttonOnly = true;
				}
			},
			// private
			renderView : function() {
				if (!this.value)
					return;

				var txt = "", mval = this.value.value || '无文件名'.loc();

				if (!this.hideTextField) {
					txt = mval.replace(new RegExp("[^\x00-\xff]", "g"), "::");
					var limit = (this.state == 'edit') ? this.editStateCharNum || 15 : 23;
					if (txt.length > limit) {
						var cle = 0, pos = 0, mt = mval;
						limit -= 2;
						while (cle < limit)
							cle += (mt.charAt(pos++) > '\xff') ? 1.45 : 1;
						txt = mval.substring(0, pos) + "...";
					} else
						txt = mval;
				}
				this.ssid.setValue(this.value.id);
				var tg = this.el.child("div[class=upload-file-view]");
				if (Ext.isObject(tg)) {
					tg.remove();
				}
				var t = Ext.DomHelper.append(this.el, {
							tag : 'div',
							cls : 'upload-file-view',
							style : 'border-collapse:collapse;width:'
									+ this.width,
							children : [{
								tag : 'a',
								target:'_blank',
								href : this.downloadUrl + '?fileid='
										+ this.value.id,
								style : 'float:left;padding:3px 10px 0 0;',
								title : this.value.name || mval,
								html : txt
							}, {
								tag : "div",
								cls : 'ux-tz'
							}]
						}, true);
				if (this.state == 'edit') {
					this.deleteButton = new Ext.Button({
								renderTo : t.child('div.ux-tz'),
								width : 40,
								cls : "x-btn-text-icon",
								text : '删 除'.loc(),
								handler : function() {
									this.deleteButton.destroy();
									this.wrap.remove();
									this.el = this.wrap = this.value = undefined;
									this.renderNew();
									this.wrap.setWidth(this.width);
								},
								icon : '/themes/icon/all/cross.gif',
								scope : this

							});
				}
			},

			renderNew : function() {
				this.state = 'new';
				this.buttonOnly = false;
				if (this.wrap)
					this.wrap.remove();
				var we = this.el;
				if (this.el) {
					this.el = null;
				}
				lib.upload.File.superclass.onRender.call(this, this.ct,
						this.position)
				this.ssid.setValue("");
				var t = Ext.DomHelper.append(this.wrap, {
							tag : 'input',
							type : 'hidden',
							name : this.name + '_tz_Description',
							value : this.maxSize + ":" + this.minSize + ":"
									+ this.pattern
						}, true);
				if (we)
					this.wrap.setWidth(this.width - 8);
			},

			setValue : function(value) {
				this.value = value;
				if (typeof(value) == 'string' && this.state == 'new') {
					lib.upload.File.superclass.setValue.call(this, value);
				} else {
					if (value) {
						this.renderView();
					} else {
						this.renderNew();
					}
				}
			}

		});
Ext.reg('fileupload', lib.upload.File);