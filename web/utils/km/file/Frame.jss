Ext.namespace("utils.km.file");
loadcss("utils.km.file.main");
using("utils.km.file.RemoteMethods");
using("utils.km.file.FileManager");

utils.km.file.Frame=Ext.extend(WorkBench.baseNode,{
	main:function(launcher){
		this.frames.set('File',this);	
		var KmFileManager={};
		var fm=this.Frame = new Ext.Panel({
				isFrame:true,
				border: false,
				layout: 'fit'
		});
		RemoteMethods = new utils.km.file.RemoteMethods(); 
		RemoteMethods.GetFileManagerSettings(function(result){
				KmFileManager.mainPanel=new utils.km.file.FileManager({settings:result});
				fm.add(KmFileManager.mainPanel);
				fm.doLayout();
		},this); 
		return this.Frame;
	},
	doWinLayout:function(win){  

	}
});
Utility = function() {
    return {
        formatSize: function(size) {
            if (size == 0) {
                return "";
            }
	        if (size<1024) {
		        return Math.floor(size*100)/100+" bytes";
	        }
	        if (size<1048576) {
		        return Math.floor((size/1024)*100)/100+" KB";
	        }
	        if (size<1073741824) {
		        return Math.floor((size/1048576)*100)/100+" MB";
	        }
	        return Math.floor((size/1073741824)*100)/100+" GB";      
        },        
        isImage: function(name) {
            var regExp = /\.jpg$|\.jpeg$|\.gif$|\.png$|\.bmp$/i;
            if(regExp.test(name))
                return true;
            else
                return false;
        }
    };
}();
