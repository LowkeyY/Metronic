

Ext.namespace('utils.km.file');
utils.km.file.GridBase = function(config) {
	this.events = {
		"containerclick" : true,
		"containerdblclick" : true,
		"containercontextmenu" : true,
		"continermousedown" : true,
		"itemdblclick" : true,
		"itemcontextmenu" : true,
		"selectionchange" : true,
		"beforeitemdrop" : true,
		"itemdrop" : true
	};

	utils.km.file.GridBase.superclass.constructor.call(this, Ext.applyIf(config
							|| {}, {

						plugins : [new utils.km.file.FilesGridDragSelector({
									dragSafe : true
								})],

						view : new utils.km.file.FilesGridView({
									forceFit : true,
									tpl : config.tpl,
									emptyText : config.emptyText || ''
								})
					}));

	this.on('rowcontextmenu', this.onRowContextMenu, this);
	this.on('rowdblclick', this.onRowDblClick, this);
	this.on('afterrender', function(ctree) {
		var p = ctree.ownerCt;
		while (p && !p.isFrame)
			p = p.ownerCt;
		this.frameEl = p.el;
		var myDrop = new Ext.dd.DropTarget(this.view.el, {

			grid : this,
			dropAllowed : 'x-dd-drop-ok',
			dropNotAllowed : 'x-dd-drop-nodrop',
			ddGroup : 'fileFolderDD',
			dropAllowedTarget : this.dropAllowedTarget,
			dropNotAllowedTarget : this.dropNotAllowedTarget,

			notifyDrop : function(dd, e, data) {
				// first we check if this is a valid drop point
				var dnTarget = e.getTarget(this.dropNotAllowedTarget);
				if (dnTarget) {
					return false;
				}
				// if user drops on a row we get index of that row and use it in
				// drop event
				var rowIndex = this.grid.getView().findRowIndex(e
						.getTarget(this.dropAllowedTarget));
				// now lets build drop event
				var dropEvent = {
					grid : this.grid,
					rowIndex : rowIndex,
					data : data,
					source : dd,
					rawEvent : e
				};
				if (false === this.grid.fireEvent("beforeitemdrop", dropEvent)) {
					return false;
				}
				this.grid.fireEvent("itemdrop", dropEvent);
				return true;
			},

			notifyOver : function(dd, e, data) {
				var dnTarget = e.getTarget(this.dropAllowedTarget, 5, true);
				if (dnTarget && dnTarget.getAttribute("readonly") == 'false') {
					return this.dropAllowed;
				} else if (this.grid.readOnly) {
					return this.dropNotAllowed;
				} else {
					return this.dropAllowed;
				}
			}
		}, this);

		var myDrag = new Ext.grid.GridDragZone(this, {
					ddGroup : 'fileFolderDD',
					onBeforeDrag : function(data, e) {
						for (var i = 0, ss = data.selections; i < ss.length; i++) {
							if (ss[i].json.dragable === false) {
								return false;
							}
						}
						return true;
					}
				})

	});
	this.getSelectionModel()
			.on('selectionchange', this.onSelectionChange, this);

};

Ext.extend(utils.km.file.GridBase, Ext.grid.GridPanel, {

			onRowContextMenu : function(grd, index, e) {
				if (this.getSelectionModel().isSelected(index) !== true) {
					this.getSelectionModel().clearSelections();
					this.getSelectionModel().selectRow(index);
				}
				this.fireEvent("itemcontextmenu", this, e);
			},

			onRowDblClick : function(grd, index, e) {
				this.fireEvent("itemdblclick", grd, index, e);
			},

			onSelectionChange : function(sm) {
				this.fireEvent("selectionchange", this, sm.getSelections());
			},

			setTemplate : function(tpl) {
				this.getView().tpl = tpl;
				this.getView().refresh(false);
				return;
			},

			selectAll : function() {
				this.getSelectionModel().selectAll();
			},

			// private
			processEvent : function(name, e) {
				this.fireEvent(name, e);
				var t = e.getTarget();
				var v = this.view;
				var header = v.findHeaderIndex(t);
				var row = v.findRowIndex(t);
				if (header !== false) {
					this.fireEvent("header" + name, this, header, e);
				} else if (row !== false) {
					var cell = v.findCellIndex(t);
					if (row !== false) {
						this.fireEvent("row" + name, this, row, e);
						if (cell !== false) {
							this.fireEvent("cell" + name, this, row, cell, e);
						}
					}
				} else if (e.target == this.getView().mainBody.dom) {
					if (this.fireEvent("container" + name, this, e) !== false)
						this.getSelectionModel().clearSelections();
				}
			}

		});