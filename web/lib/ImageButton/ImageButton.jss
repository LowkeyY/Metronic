
Ext.namespace("lib.ImageButton");
lib.ImageButton.ImageButton = Ext.extend(Ext.BoxComponent, {
			initComponent : function() {
				lib.ImageButton.ImageButton.superclass.initComponent.call(this)
			},
			render : function(container, position) {
				lib.ImageButton.ImageButton.superclass.render.call(this, container,
						position);
				if (this.disabled == true) {
					this.disable()
				} else {
					this.disabled = true;
					this.enable()
				}
			},
			disable : function() {
				lib.ImageButton.ImageButton.superclass.disable.call(this);
				this.getEl().dom.src = this.initialConfig.imgNormal;
				this.getEl().removeAllListeners()
			},
			enable : function() {
				if (this.disabled) {
					lib.ImageButton.ImageButton.superclass.enable.call(this);
					var that = this;
					this.getEl().on("click", that.initialConfig.actionFn, this);
					this.getEl().on("mouseout", function() {
								that.getEl().dom.src = that.initialConfig.imgNormal
							});
					this.getEl().on("mouseover", function() {
								that.getEl().dom.src = that.initialConfig.imgOver
							});
					this.getEl().on("mousedown", function() {
								that.getEl().dom.src = that.initialConfig.imgClicked
							});
					this.getEl().on("mouseup", function() {
								that.getEl().dom.src = that.initialConfig.imgOver
							})
				}
			},
			setImages : function(imgNormalUrl, imgOverUrl, imgClickedUrl) {
				var that = this;
				this.initialConfig.imgNormal = imgNormalUrl;
				this.initialConfig.imgOver = imgOverUrl;
				this.initialConfig.imgClicked = imgClickedUrl;
				if (this.disabled == true) {
					this.getEl().dom.src = this.initialConfig.imgNormal
				} else {
					this.getEl().on("mouseout", function() {
								that.getEl().dom.src = that.initialConfig.imgNormal
							});
					this.getEl().on("mouseover", function() {
								that.getEl().dom.src = that.initialConfig.imgOver
							});
					this.getEl().on("mousedown", function() {
								that.getEl().dom.src = that.initialConfig.imgClicked
							});
					this.getEl().on("mouseup", function() {
								that.getEl().dom.src = that.initialConfig.imgOver
							})
				}
			},
			showImage : function(img) {
				this.getEl().dom.src = img
			}
});