Ext.namespace("ExternalItems.haiwaizhishigongxiang.upload");
// using("ExternalItems.haiwaizhishigongxiang.HWUpExcelFile");
// ExternalItems.haiwaizhishigongxiang.HWUpExcelFile(btn);

ExternalItems.haiwaizhishigongxiang.upload.UpZip = function(btn) {
	var panel = Ext.getCmp(btn.panelId);

	if (btn.target && !btn.target_old) {
		var tg = Ext.apply({}, btn.target);
		btn.target_old = tg;
		btn.target.type = 0;
	};

	function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the
		// clock_seq_hi_and_reserved
		// to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	}

	function up(key) {
		CPM.doAction({
					url : '/ExternalItems/haiwaizhishigongxiang/upload/UpZip.jcp?key='
							+ key,
					method : 'POST',
					form : panel.form,
					scope : this,
					timeout : 10800000,
					params : panel.param,
					success : function(response, options) {
						var check = response.responseText;
						var ajaxResult = Ext.util.JSON.decode(check);
						if (ajaxResult.err) {
							Ext.msg("warn", ajaxResult.message);
							var field;
							if (field = panel.form.findField("EXCEL")) {
								try {
									field.el.dom.value = '';
									field.fileInput.dom.value = "";
								} catch (e) {
								}
							}
						} else {
							Ext.msg("info", ajaxResult.message);
							var win = panel.findParentByType(Ext.Window);
							if (ajaxResult.isAdd)
								Ext.isFunction(win.refreshWest)
										&& win.refreshWest();
							else
								Ext.isFunction(win.refreshCenter)
										&& win.refreshCenter();
							win.close();
						}
					}
				});

		var progressBar1 = Ext.Msg.progress("上传中...");

		var dingshi;
		var f = function() {
			return function() {

				Ext.Ajax.request({
					url : '/ExternalItems/haiwaizhishigongxiang/upload/getUpExcealCount.jcp',
					method : 'POST',
					params : {
						key : key
					},
					scope : this,
					success : function(response, options) {
						var check = response.responseText;
						var ajaxResult = Ext.util.JSON.decode(check)
						var shengyu = ajaxResult.shengyu;
						var count = ajaxResult.count;
						var statu = ajaxResult.statu;
						if (statu == "0") {
							var v = (count - shengyu);
							var i = v / count;
							progressBar1.updateProgress(i, '进度：' + v + '/'
											+ count, '共' + count + '个资料文件。');
							if (shengyu == 0) {

								Ext.msg("info", "上传完成。");
								var win = panel.findParentByType(Ext.Window);
								win.close();

								progressBar1.hide();

								window.clearInterval(dingshi);
							}
						} else if (statu == "-1") {

							window.clearInterval(dingshi);
						} else if (statu == "1") {
							progressBar1.hide();
							window.clearInterval(dingshi);
						}
					}
				})
			};
		};
		dingshi = setInterval(f(), 500);
	}

	if (panel.form.isValid()) {
		var key = uuid();

		CPM.doAction({
			url : '/ExternalItems/haiwaizhishigongxiang/upload/HWUpExcelFileValidate.jcp?key='
					+ key,
			method : 'POST',
			form : panel.form,
			scope : this,
			timeout : 10800000,
			params : panel.param,
			success : function(response, options) {
				var check = response.responseText;
				var ajaxResult = Ext.util.JSON.decode(check);

				if (ajaxResult.success) {
					var count = ajaxResult.fileCount;
					var err = ajaxResult.err;
					if (err) {
						var message=ajaxResult.message;
						Ext.msg("confirm", message+
								"没有找到相应目录</br>" +
								"有效文件共" + count + "个" +
								"</br>是否现在上传。",
								function(answer) {
									if (answer == 'yes') {
										up(key);
									}
								});
					} else {
						Ext.msg("confirm", "共发现" + count + "个资料是否现在上传。",
								function(answer) {
									if (answer == 'yes') {
										up(key);
									}
								});
					}
				} else {
					Ext.msg("error", ajaxResult.message);
				}
			}
		})
	}
}