using("lib.DateTime.DateTimePicker");

lib.DateTime.DateTimeMenu = Ext.extend(Ext.menu.Menu, {

			enableScrolling : false,

			plain : true,

			isStrict : Ext.isIE7 && Ext.isStrict,

			showSeparator : false,

			hideOnClick : true,

			pickerId : null,

			cls : 'x-date-menu x-date-time-menu',

			constructor : function(config) {
				this.picker = this._createPicker(config || {});
				delete config.picker;

				lib.DateTime.DateTimeMenu.superclass.constructor.call(this, Ext
								.applyIf({
											items : this.picker
										}, config || {}));

				this.picker.parentMenu = this;

				this.on('beforeshow', this.onBeforeShow, this);

				if (this.isStrict) {
					this.on('show', this.onShow, this, {
								single : true,
								delay : 20
							});
				}

				this.relayEvents(this.picker, ['select']);
				this.on('show', this.picker.focus, this.picker);
				this.on('select', this.menuHide, this);

				if (this.handler) {
					this.on('select', this.handler, this.scope || this);
				}
			},

			_createPicker : function(initialConfig) {
				var picker = initialConfig.picker;

				var defaultConfig = {
					ctCls : 'x-menu-date-item',
					internalRender : this.isStrict || !Ext.isIE
				};

				if (typeof picker === 'object') {
					if (picker.render) {
						return picker;
					} else {
						return Ext.create(Ext.apply(defaultConfig, picker),
								'datetimepicker');
					}
				} else {
					return Ext.create(defaultConfig, 'datetimepicker');
				}
			},

			menuHide : function() {
				if (this.hideOnClick) {
					this.hide(true);
				}
			},

			onBeforeShow : function() {
				if (this.picker.datePicker) {
					this.picker.datePicker.hideMonthPicker(true);
				}
			},

			onShow : function() {
				var el = this.picker.datePicker.getEl();
				el.setWidth(el.getWidth()); // nasty hack for IE7 strict mode
			},

			destroy : function() {
				this.picker.destroy();
				this.picker = null;

				lib.DateTime.DateTimeMenu.superclass.destroy.call(this);
			}

		});

Ext.reg('datetimemenu', lib.DateTime.DateTimeMenu);
