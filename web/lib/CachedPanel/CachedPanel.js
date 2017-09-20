Ext.namespace("lib.CachedPanel");
using("lib.statusbar.StatusBar");
lib.CachedPanel.CachedPanel = Ext.extend(Ext.Panel, {
    cachedAttributeName: "cached",
    layoutOnActivePanelChange: true,
    statusBar: false,
    statusConfig: {},
    deferredRender: true,
    bodyStyle: "background-color:white",
    initComponent: function () {
        this.frame = false;
        if (this.statusBar) {
            this.bbar = new lib.CachedPanel.CachedPanel.StatusBar(Ext.applyIf(this.statusConfig, {
                owner: this,
                statusDefine: ["ID", "修改者".loc(), "修改时间".loc()]
            }));
        }
        delete this.layout;
        lib.CachedPanel.CachedPanel.superclass.initComponent.call(this);
        this.addEvents("beforeactivepanelchange", "activepanelchange");
        this.setLayout(new Ext.layout.CardLayout(Ext.apply({
            layoutOnCardChange: this.layoutOnActivePanelChange,
            deferredRender: this.deferredRender
        }, this.layoutConfig)));
        this.initItems();
    },
    afterRender: function () {
        lib.CachedPanel.CachedPanel.superclass.afterRender.call(this);
        if (this.activePanel !== undefined) {
            var item = Ext.isObject(this.activePanel) ? this.activePanel : this.items.get(this.activePanel);
            delete this.activePanel;
            this.setActivePanel(item);
        }
    },
    findPanel: function (prop, value) {
        return this.findBy(function (c) {
            return c[prop] === value;
        });
    },
    havePanel: function (mixed) {
        return Ext.isDefined(this.getPanel(mixed));
    },
    getPanel: function (mixed) {
        var q;
        if (Ext.isObject(mixed)) {
            this.items.each(function (v) {
                if (v == mixed) {
                    q = v;
                    return false;
                }
            });
        } else {
            this.items.each(function (v) {
                if (v.name == mixed || v.id == mixed) {
                    q = v;
                    return false;
                }
            });
        }
        return q;
    },
    setActivePanel: function (item) {
        item = this.getPanel(item);
        if (this.fireEvent("beforeactivepanelchange", this, item, this.activePanel) === false) {
            return;
        }
        if (!this.rendered) {
            this.activePanel = item;
            return;
        }
        if (this.activePanel != item) {
            if (item) {
                var it = this.activePanel;
                this.activePanel = item;
                this.layout.setActiveItem(item);
                if (Ext.isObject(it) && it[this.cachedAttributeName] != true) {
                    this.remove(it, true);
                }
            }
            this.fireEvent("activepanelchange", this, item);
        }
    },
    getActivePanel: function () {
        return this.activePanel;
    },
    getStatusBar: function () {
        return (this.statusBar) ? this.bottomToolbar : undefined;
    },
    beforeDestroy: function () {
        delete this.activePanel;
        lib.CachedPanel.CachedPanel.superclass.beforeDestroy.apply(this);
    },
    setActiveTab: function (item) {
        this.setActivePanel(item);
    },
    hideStatus: function () {
        this.statusBar && this.bottomToolbar.hide();
    },
    showStatus: function () {
        this.statusBar && this.bottomToolbar.show();
    },
    setStatusValue: function (arr) {
        this.statusBar && this.bottomToolbar.setValue(arr);
    }
});
Ext.reg("cachedpanel", lib.CachedPanel.CachedPanel);
lib.CachedPanel.CachedPanel.StatusBar = Ext.extend(Ext.ux.StatusBar, {
    statusDefine: null,
    statusValue: null,
    hide: function () {
        if (!this.hidden) {
            this.owner.bbar.hide();
            this.owner.syncHeight();
            this.hidden = true;
        }
    },
    show: function () {
        if (this.hidden) {
            this.owner.bbar.show();
            this.owner.syncHeight();
            this.hidden = false;
        }
    },
    setValue: function (arr) {
        if (!Ext.isArray(arr)) {
            return;
        }
        var len = this.statusDefine.length;
        if (len > arr.length - 1) {
            len = arr.length - 1;
        }
        for (var i = 0; i < len; i++) {
            Ext.fly(this.cells[i].getEl()).update(this.statusDefine[i] + ": " + arr[i + 1]);
        }
        if (arr.length > 0) {
            this.setText(arr[0]);
        }
    },
    onHide: Ext.emptyFn,
    onRender: function (ct, position) {
        ct.setVisibilityMode(Ext.Element.DISPLAY);
        this.hidden && ct.hide();
        lib.CachedPanel.CachedPanel.StatusBar.superclass.onRender.call(this, ct, position);
    },
    afterRender: function () {
        lib.CachedPanel.CachedPanel.StatusBar.superclass.afterRender.call(this);
        for (var i = 0; i < this.statusDefine.length; i++) {
            Ext.fly(this.cells[i].getEl().parent()).addClass("x-status-text-panel");
        }
    },
    beforeDestroy: function () {
        this.owner = null;
        this.statusDefine = null;
        this.statusValue = null;
        this.cells = null;
        lib.CachedPanel.CachedPanel.StatusBar.superclass.beforeDestroy.apply(this);
    },
    initComponent: function () {
        this.items = new Array();
        this.cells = new Array();
        var haveVal = Ext.isArray(this.statusValue);
        for (var i = 0; i < this.statusDefine.length; i++) {
            var msg = this.statusDefine[i] + ": ";
            if (haveVal && Ext.isDefined(this.statusValue[i + 1])) {
                msg += this.statusValue[i + 1];
            }
            this.items.push(this.cells[i] = new Ext.Toolbar.TextItem(msg));
            this.items.push(" ");
        }
        lib.CachedPanel.CachedPanel.StatusBar.superclass.initComponent.call(this);
        if (haveVal) {
            this.setText(this.statusValue[0]);
        }
    }
});