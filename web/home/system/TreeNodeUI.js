Ext.override(Ext.tree.TreeNodeUI,{toggleCheck:function(B){var A=this.checkbox;if(A){A.checked=(B===undefined?!A.checked:B);this.fireEvent("checkchange",this.node,A.checked);}}});