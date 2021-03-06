Ext.namespace('utils.km.file'); 

utils.km.file.SlideShow = function(files) {
    this._files = files;
    this._ssMask = null;
    this._totalImages = files.length;
    this._previewLoaded = false;
    this._slideShowRuning = true;
    this._interval = 4;
    this._currentImage = 0;
    this._viewportWidth = 0;
    this._viewportHeight = 0;
    this._previewWidth = 0;
    this._previewHeight = 0;
    this._divPreview = null;
    this._divComment = null;
    this._divNav = null;
    this._btnPlay = null;
    this._btnBack = null;
    this._btnNext = null;
    this._btnDecreaseInterval = null;
    this._btnIncreaseInterval = null;
    this._btnClose = null;
    this._imgPreview = null;
    this._hideComment = false;
    this._spanInterval = null;
    this._lnkToggleComment = null;
    this._theBody = null;
}

utils.km.file.SlideShow.prototype = {
    
    Init : function() {
        this.CreateMask();  
        this.CreatePreview();
        this.CreateNav();  
        this.Resize();
        this.DisplayImage(0);
        this.StartSlideShow();
        
        var slideshowInstance = this;
        window.onresize = function() { slideshowInstance.Resize(); }
        window.onscroll = function() { slideshowInstance.Resize(); }
    },
    
    SetInterval : function(val) {
        if (val < 1)
            val = 1;
        this._interval = val;
        this._spanInterval.innerHTML = val + ' 秒';
    },

    CreateMask : function() {
	    this._theBody = document.getElementsByTagName("BODY")[0];
    	
	   
			this._ssMask = document.createElement('div');
	  
			this._ssMask.className = 'ssMask';	
	    
			this._theBody.appendChild(this._ssMask);	
    },

    Resize : function() {
        this._viewportHeight = this.getViewportHeight();
	 
		this._viewportWidth = this.getViewportWidth();
    	
		this._ssMask.style.height = this._viewportHeight + "px";
	  
		this._ssMask.style.width = this._viewportWidth + "px";
    	
	
		this._ssMask.style.left = this.getScrollXY()[0] + "px";
	    
		this._ssMask.style.top = this.getScrollXY()[1] + "px";
    	
	    this._previewHeight = this._viewportHeight - (this._divComment.offsetHeight + this._divNav.offsetHeight + 30);
	    this._previewWidth = this._viewportWidth - 40;
    	
	    this._theBody.style.overflow = "hidden";
    	
	    this._divPreview.style.height = this._previewHeight + 'px';
	    this._divPreview.style.width = this._previewWidth + 'px';
        
    },

    Hide : function() {
        this._theBody.style.overflow = "";
        this._theBody.removeChild(this._ssMask);    
        
        window.onresize = function() { }
        window.onscroll = function() { }
    },

    ToggleComment : function() {
        if(this._hideComment) {
            this._hideComment = false;
            this._lnkToggleComment.innerHTML = '隐藏工具栏';
            this._divComment.style.visibility = 'visible';
        } else {
            this._hideComment = true;
            this._lnkToggleComment.innerHTML = '显示工具栏';
            this._divComment.style.visibility = 'hidden';
        }
    },

    CreateNav : function() {
        var slideshowInstance = this;
        this._divNav = document.createElement('div');
        this._divNav.className = 'ssNav';
        this._divNav.style.visibility = 'visible';
        
        var divNavContainer = document.createElement('div');
        divNavContainer.onmouseover = function() {slideshowInstance._divNav.style.visibility = 'visible'; }
        divNavContainer.onmouseout = function() {slideshowInstance._divNav.style.visibility = 'hidden'; }
           
        this._btnBack = document.createElement('input');
        this._btnBack.type = 'button';
        this._btnBack.value = '后退';
        this._btnBack.onclick = function() {slideshowInstance.PreviousImage(); }
        
        this._btnPlay = document.createElement('input');
        this._btnPlay.type = 'button';
        this._btnPlay.value = '播放';
        this._btnPlay.className = 'ply';
        this._btnPlay.onclick = function() {slideshowInstance.StartSlideShow(); }
        
        this._btnNext = document.createElement('input');
        this._btnNext.type = 'button';
        this._btnNext.value = '前进';
        this._btnNext.onclick = function() {slideshowInstance.NextImage(); }
        
        this._btnDecreaseInterval = document.createElement('input');
        this._btnDecreaseInterval.type = 'button';
        this._btnDecreaseInterval.value = '-';
        this._btnDecreaseInterval.className = 'dec';
        this._btnDecreaseInterval.onclick = function() {slideshowInstance.SetInterval(slideshowInstance._interval - 1); }
        
        this._spanInterval = document.createElement('span');
        this._spanInterval.innerHTML = this._interval + ' 秒'; 
        
        this._btnIncreaseInterval = document.createElement('input');
        this._btnIncreaseInterval.type = 'button';
        this._btnIncreaseInterval.value = '+';
        this._btnIncreaseInterval.className = 'inc';
        this._btnIncreaseInterval.onclick = function() {slideshowInstance.SetInterval(slideshowInstance._interval + 1); }
        
        this._lnkToggleComment = document.createElement('a');
        this._lnkToggleComment.innerHTML = '隐藏工具栏'; 
        this._lnkToggleComment.href = '#';
        this._lnkToggleComment.onclick = function() { slideshowInstance.ToggleComment(); }
        
        this._btnClose = document.createElement('input');
        this._btnClose.value = '关闭';
        this._btnClose.type = 'button';
        this._btnClose.className = 'cls';
        this._btnClose.onclick = function() { slideshowInstance.Hide(); }    
         
        
        divNavContainer.appendChild(this._divNav);
        this._ssMask.appendChild(divNavContainer);    
        this._divNav.appendChild(this._btnBack);
        this._divNav.appendChild(this._btnPlay);
        this._divNav.appendChild(this._btnNext);
        this._divNav.appendChild(this._btnDecreaseInterval);
        this._divNav.appendChild(this._spanInterval);
        this._divNav.appendChild(this._btnIncreaseInterval);
        this._divNav.appendChild(this._lnkToggleComment);
        this._divNav.appendChild(this._btnClose);
        
        // set container height
        divNavContainer.style.height = this._divNav.offsetHeight + 'px';
        
        // hide the nav after two seconds
        var instance = this;
        setTimeout(function() { instance._divNav.style.visibility = 'hidden'; }, 10000);
    },

    CreatePreview : function() {
        this._divPreview = document.createElement('div');  
        this._divPreview.className = 'ssPreview';  
        this._imgPreview = document.createElement('img');     
        this._divComment = document.createElement('div');
        this._divComment.className = 'ssComment';
            
        this._ssMask.appendChild(this._divPreview);     
        this._divPreview.appendChild(this._imgPreview);
        this._ssMask.appendChild(this._divComment); 
    },

    DisplayImage : function(index) {

        var slideshowInstance = this;
        this._currentImage = index;
        this._previewLoaded = false;
        var thumbnail = new Image();
        thumbnail.src = (this._files[index].dwpath ? this._files[index].dwpath : "/utils/km/file/download.jcp?FileID=" + this._files[index].ID) + "&width=" + this._previewWidth + "&height=" + this._previewHeight;
        this._imgPreview.onload = function() { 
            slideshowInstance._previewLoaded = true; 
            slideshowInstance.DisplayComment(index);
        }    
        this._imgPreview.src = thumbnail.src;  
    },

    DisplayComment : function(index) {
        var comment = this._files[index].Description;
        this._divComment.innerHTML = (comment == null) ? '' : comment;
        
        if (comment == null || comment == '' || this._hideComment) {
            this._divComment.style.visibility = 'hidden';
        } else {
            this._divComment.style.visibility = 'visible';        
        }      
    },

    PreviousImage : function() {
        if (this._currentImage == 0)
            this.DisplayImage(this._totalImages -1);
        else
            this.DisplayImage(this._currentImage - 1);
    },

    NextImage : function() {
        if (this._currentImage == this._totalImages - 1)
            this.DisplayImage(0);
        else
            this.DisplayImage(this._currentImage + 1);
    },

    StartSlideShow : function() {
        var slideshowInstance = this;
        this._slideShowRuning = true;
        setTimeout(function(){slideshowInstance.SlideShow();}, this._interval * 1000);
        
        this._btnPlay.value = '停止';
        this._btnPlay.onclick = function() {slideshowInstance.StopSlideShow(); }
    },

    StopSlideShow : function() {
        var slideshowInstance = this;
        this._slideShowRuning = false;
        
        this._btnPlay.value = '播放';
        this._btnPlay.onclick = function() {slideshowInstance.StartSlideShow(); }
    },

    SlideShow : function() {
        if (this._previewLoaded && this._slideShowRuning) {        
            this.NextImage();
        }
        
        var slideshowInstance = this;
        if (this._slideShowRuning)
            setTimeout(function(){slideshowInstance.SlideShow();}, this._interval * 1000);
    },
    
    getViewportHeight : function() {
	
		if (window.innerHeight!=window.undefined) return window.innerHeight;
	
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	 
		if (document.body) return document.body.clientHeight; 
	    return window.undefined;
    },
    
    
	getViewportWidth : function() {
	   
		if (window.innerWidth!=window.undefined) return window.innerWidth; 
	  
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
	 
		if (document.body) return document.body.clientWidth; 
	    return window.undefined; 
    },

   
	getScrollXY : function() {
      var scrOfX = 0, scrOfY = 0;
      if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
      } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
      } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
      }
      return [ scrOfX, scrOfY ];
    }	
};