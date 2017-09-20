using("lib.DateTime.BaseTimePicker");

lib.DateTime.DateTimePicker = Ext.extend(Ext.BoxComponent, {

	timeLabel : '时间',

	changeTimeText : '更改时间...',

	doneText : '确定',

	initComponent : function() {
		lib.DateTime.DateTimePicker.superclass.initComponent.call(this);

		this.addEvents('select');

		this.timePickerButton = new Ext.Button({
					text : this.changeTimeText,
					handler : this._showTimePicker,
					scope : this
				});

		this._initDatePicker();
		this._initTimePicker();

		this.timeValue = new Date();

		if (this.value) {
			this.setValue(this.value);
			delete this.value;
		}
	},

	_initTimePicker : function() {
		if (!this.timeMenu) {
			var menuConfig = this.initialConfig.timeMenu;

			if (menuConfig && menuConfig.xtype) {
				this.timeMenu = Ext.create(menuConfig);
			} else {
				var pickerConfig = this.initialConfig.timePicker || {};
				if (this.timeFormat) {
					pickerConfig.format = this.timeFormat;
				}
				var picker = Ext.create(pickerConfig, 'basetimepicker');
				this.timeMenu = new Menu(picker, menuConfig || {});
			}

			if (!Ext.isFunction(this.timeMenu.getPicker)) {
				throw '类继承错误。';
			}

			this.timeMenu.on('timeselect', this.onTimeSelect, this);
		}
	},

	_initDatePicker : function() {
		var config = this.initialConfig.datePicker || {};

		config.internalRender = this.initialConfig.internalRender;

		Ext.applyIf(config, {
					format : this.dateFormat || Ext.DatePicker.prototype.format
				});

		var picker = this.datePicker = Ext.create(config, 'datepicker');

		picker.update = picker.update.createSequence(function() {
					if (this.el != null && this.datePicker.rendered) {
						var width = this.datePicker.el.getWidth();
						this.el.setWidth(width + this.el.getBorderWidth('lr')
								+ this.el.getPadding('lr'));
					}
				}, this);
	},

	_renderDatePicker : function(ct) {
		var picker = this.datePicker;

		picker.render(ct);

		var bottomEl = picker.getEl().child('.x-date-bottom');

		var size = bottomEl.getSize(true);
		var style = ['position: absolute', 'bottom: 0', 'left: 0',
				'overflow: hidden', 'width: ' + size.width + 'px',
				'height: ' + size.height + 'px'].join(';');

		var div = ct.createChild({
					tag : 'div',
					cls : 'x-date-bottom',
					style : style,
					children : [{
								tag : 'table',
								cellspacing : 0,
								style : 'width: 100%',
								children : [{
											tag : 'tr',
											children : [{
														tag : 'td',
														align : 'left'
													}, {
														tag : 'td',
														align : 'right'
													}]
										}]
							}]
				});

		if (picker.showToday) {
			var todayConfig = {};
			Ext.each(['text', 'tooltip', 'handler', 'scope'], function(key) {
						todayConfig[key] = picker.todayBtn.initialConfig[key];
					});
			this.todayBtn = new Ext.Button(todayConfig).render(div
					.child('td:first'));
		}

		this.doneBtn = new Ext.Button({
					text : this.doneText,
					handler : this.onDone,
					scope : this
				}).render(div.child('td:last'));
	},

	_getFormattedTimeValue : function(date) {
		return date.format(this.timeMenu.picker.format);
	},

	_renderValueField : function(ct) {
		var cls = 'ux-date-time-picker' + '-value-ct';

		var timeLabel = !Ext.isEmpty(this.timeLabel) ? '<span class="' + cls
				+ '-value-label">' + this.timeLabel + ':</span>&nbsp;' : '';

		var div = ct.insertFirst({
					tag : 'div',
					cls : [cls, 'x-date-bottom'].join(' ')
				});

		var table = div.createChild({
					tag : 'table',
					cellspacing : 0,
					style : 'width: 100%',
					children : [{
						tag : 'tr',
						children : [{
							tag : 'td',
							align : 'left',
							cls : cls + '-value-cell',
							html : '<div class="'
									+ cls
									+ '-value-wrap">'
									+ timeLabel
									+ '<span class="'
									+ cls
									+ '-value">'
									+ this
											._getFormattedTimeValue(this.timeValue)
									+ '</span>' + '</div>'
						}, {
							tag : 'td',
							align : 'right',
							cls : cls + '-btn-cell'
						}]
					}]
				});

		this.timeValueEl = table.child('.' + cls + '-value');
		this.timeValueEl.on('click', this._showTimePicker, this);

		this.timePickerButton.render(table.child('td:last'));
	},

	onRender : function(ct, position) {
		this.el = ct.createChild({
					tag : 'div',
					cls : 'ux-date-time-picker',
					children : [{
								tag : 'div',
								cls : 'ux-date-time-picker' + '-inner'
							}]
				}, position);

		lib.DateTime.DateTimePicker.superclass.onRender
				.call(this, ct, position);

		var innerEl = this.el.first();

		this._renderDatePicker(innerEl);

		this._renderValueField(innerEl);
	},

	_updateTimeValue : function(date) {
		this.timeValue = date;
		if (this.timeValueEl != null) {
			this.timeValueEl.update(this._getFormattedTimeValue(date));
		}
	},

	setValue : function(value) {
		this._updateTimeValue(value);
		this.datePicker.setValue(value.clone());
	},

	getValue : function() {
		var date = this.datePicker.getValue();

		var time = this.timeValue
				.getElapsed(this.timeValue.clone().clearTime());

		return new Date(date.getTime() + time);
	},

	onTimeSelect : function(menu, picker, value) {
		this._updateTimeValue(value);
	},

	_showTimePicker : function() {
		this.timeMenu.getPicker().setValue(this.timeValue, false);

		if (this.timeMenu.isVisible()) {
			this.timeMenu.hide();
		} else {
			this.timeMenu.show(this.timePickerButton.el, null, this.parentMenu);
		}
	},

	onDone : function() {
		this.fireEvent('select', this, this.getValue());
	},

	destroy : function() {
		Ext.destroy(this.timePickerButton);
		this.timePickerButton = null;

		if (this.timeValueEl) {
			this.timeValueEl.remove();
			this.timeValueEl = null;
		}

		Ext.destroy(this.datePicker);
		this.datePicker = null;

		if (this.timeMenu) {
			Ext.destroy(this.timeMenu);
			this.timeMenu = null;
		}

		if (this.todayBtn) {
			Ext.destroy(this.todayBtn);
			this.todayBtn = null;
		}

		if (this.doneBtn) {
			Ext.destroy(this.doneBtn);
			this.doneBtn = null;
		}

		this.parentMenu = null;

		lib.DateTime.DateTimePicker.superclass.destroy.call(this);
	}

});

Ext.reg('datetimepicker', lib.DateTime.DateTimePicker);

//

var Menu = lib.DateTime.DateTimePicker.Menu = Ext.extend(Ext.menu.Menu, {

			enableScrolling : false,

			hideOnClick : false,

			plain : true,

			showSeparator : false,

			constructor : function(picker, config) {
				config = config || {};

				if (config.picker) {
					delete config.picker;
				}

				this.picker = Ext.create(picker);

				Menu.superclass.constructor.call(this, Ext.applyIf({
									items : this.picker
								}, config));

				this.addEvents('timeselect');

				this.picker.on('select', this.onTimeSelect, this);
			},

			getPicker : function() {
				return this.picker;
			},

			onTimeSelect : function(picker, value) {
				this.hide();
				this.fireEvent('timeselect', this, picker, value);
			},

			destroy : function() {
				this.purgeListeners();

				this.picker = null;

				Menu.superclass.destroy.call(this);
			}

		});
