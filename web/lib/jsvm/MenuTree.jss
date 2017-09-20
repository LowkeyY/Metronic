Ext.namespace("lib.jsvm");

MenuTree = function(xmlDoc){
	Map.call(this);
	this.root = Node.loadXML(xmlDoc);
	this.append('<nobr><div class=tree_viewer','frame','></div></nobr>');
	this.event = new Object();
	this.frame;
}
_p = MenuTree.prototype = new Map;
_p.__CLASS = MenuTree;

_p.finish = function(dom,doc){
	if(dom){     
		dom.style.backgroundColor='#ffffff';
		dom.innerHTML = this._HTML.toString();
		this._init(dom,doc);
	}
	var frame = this.frame = this.getMap('frame');
	frame._instance = this;
	frame.onkeydown = MenuTree.keyDown;
	frame.onmousedown = MenuTree._mouseDown;
	frame.onclick = MenuTree._click;
	frame.ondblclick = MenuTree._DBLClick;
	frame.oncontextmenu = MenuTree._contextMenu;
//	frame.onselectstart = Tool.disableEvent;
	this.show(frame,this.root);
}


_p.show = function(dom,node){
	var str = new Array();
	var arrNode = node.son;
	var len = arrNode.length;
	var isSingle = (len == 1);
	var isRoot = node == this.root;

	for(var i=0;i<len;i++){
		var prop = arrNode[i].prop;
		prop.title=prop.title.loc();//wangwei
		var isForder = (prop._tag == "forder");
		var hasChild = arrNode[i].hasChild = (prop._hasChild =="1" || (arrNode[i].son !=null && arrNode[i].son.length > 0));
		if(isForder){
			if(!prop.icon0 && !prop.icon1){
				prop.icon0 = "menutree/close";
				prop.icon1= "menutree/open";
			}
		}else{
			if(!prop.icon0)
				prop.icon0 = "menutree/china";
		}
		if(!prop.icon1)
			prop.icon1 = prop.icon0;

		if(isSingle){
			if(isRoot)
				str.push('<div>');
			else
				str.push('<div class=bottom>');
		}else if(i==0)
			str.push('<div class=middle>');
		else if(i == len-1)
			str.push('</div><div class=bottom>');

		if(hasChild)
			str.push('<div><img align=absbottom MT=lock src=',MenuTree._I_none,'><a MT=title href="');
		else
			str.push('<div><img align=absbottom MT=lock src=',MenuTree._I_single,'><a MT=title href="');

		if(prop.href)
			str.push(encodeURI(prop.href),'" target="',prop.target);
		else 
			str.push('#');

		var checkbox = prop.checkbox;
		var initchk = prop.initchk;
		
		if ( checkbox == undefined )
			str.push('"><img class=icon align=absbottom src=',getImg(prop.icon0),'><span>',prop.title,'</span></a><div class=hide>'+'数据载入中'.loc()+'..</div></div>');
		else {
			if ( initchk == 'y' )
				initchk = "checked";
			else if ( initchk == 'n' )
				initchk = "";
			str.push('"><input type=checkbox name='+checkbox+' '+initchk+' ></input><span>',prop.title,'</span></a><div class=hide>'+'数据载入中'.loc()+'..</div></div>');
		}

		if(i == len -1)
			str.push('</div>');
	}

	dom.innerHTML = str.toString();
	dom = dom.firstChild;

	for(var i=0;i<len;i++){
		if(!isSingle && i == len -1)
			var div = dom.parentNode.childNodes[1].childNodes[0];
		else
			var div = dom.childNodes[i];
		div._node = arrNode[i];
		arrNode[i]._div = div;
	}
}

_p.loadHistory =function(storeName){
	this._storeName = storeName;
	this.uStore=new UserStore(tree_store);
	this.loadPath(this.uStore.getAttribute(storeName));
}

_p.loadPath =function(path){
	if(!path)
		return;
	path=path.split('/');

	var node = this.root;
	for(var i=0;i<path.length;i++){
		var node = node.getChild(path[i]);
		if(node){
			if(node.hasChild && !node._opend && i<path.length-1){
				this.initNode(node);
				node.open();
			}
			this.element_focus(node,true);
		}else
			break;
	}
}
_p.loadSubNode =function(id,fn){
	try{
		var currentNode=this.getNowNode();
		this.loadNode(currentNode);
		this.moveNext();
		var NNode=this.getNowNode();
		while(NNode.prop._id!=id&&NNode.index()!=NNode.parent.son.length -1){
			this.moveDown();
			NNode=this.getNowNode();
		}
		fn(NNode);
	}catch(e){}
}

_p.loadSubNodeWithLevel =function(id,fn){
	var currentNode=this.getNowNode();
	var id1=id+"__"+currentNode.prop.levelNum;
	var id2=id+"__"+(currentNode.prop.levelNum*1+1);
	try{
		this.loadNode(currentNode);
		this.moveNext();
		var NNode=this.getNowNode();
		while(NNode.prop._id!=id1 && NNode.prop._id!=id2 &&NNode.index()!=NNode.parent.son.length -1){
			this.moveDown();
			NNode=this.getNowNode();
		}
		fn(NNode);
	}catch(e){}
}
_p.loadRootNode =function(fn){
	try{
		var currentNode=this.getNowNode();
		while(currentNode.prop._id!='root'){
			currentNode = currentNode.parent;
			this.moveToScroll(currentNode);
			this.element_focus(currentNode);
			this.loadNode(currentNode);
		}
	}catch(e){}
}
_p.loadParentNode =function(fn){
	try{
		var currentNode=this.getNowNode();
		currentNode = currentNode.parent;	
		this.moveToScroll(currentNode);
		this.element_focus(currentNode);
		this.reloadNode(currentNode);
		var NNode=this.getNowNode();
		fn(NNode);
	}catch(e){}
}
_p.loadSelfNodeWithLevel =function(id,fn){
	var currentNode=this.getNowNode();
	id=id+"__"+currentNode.prop.levelNum;
	this.loadSelfNode(id,fn);
}
_p.loadSelfNode =function(id,fn){
	try{
		var currentNode=this.getNowNode();
		var currentNode = currentNode.parent;	
		this.moveToScroll(currentNode);
		this.element_focus(currentNode);
		this.reloadNode(currentNode);
		this.moveNext();
		var NNode=this.getNowNode();
		var finishingSlash=0;
		while(NNode.prop._id!=id && finishingSlash++<1500){
			this.moveDown();
			NNode=this.getNowNode();
		}
		fn(NNode);
	}catch(e){}
}
_p.getNowNode = function(){
	if(!this._nowNode)
		return this.root.son[0];
	var old = this.root.getChildBy("_id",this._nowNode);
	return old[old.length -1];	
}
_p.element_focus = function(node,auto){
	var old = this.getNowNode();
	if(old){
		old._div.childNodes[1].childNodes[1].className="";
		old._div.childNodes[1].childNodes[0].src = getImg(old.prop.icon0);
	}
	this._nowNode = node.getPathBy("_id");
	node._div.childNodes[1].childNodes[1].className="focus";
	node._div.childNodes[1].childNodes[0].src = getImg(node.prop.icon1);
	if(this._storeName && this.uStore && !auto){
		var path = node.getPathBy("_id").slice(1);
		this.uStore.setAttribute(this._storeName,path.join('/'));
		this.uStore.save("oXMLBranch");
	}
}

_p.getEvent = function(name,event){
	var o = this.event[name];
	if(o)
		return o[event];
}

_p.setEvent = function(name,func){
	this.event[name] = func;
}
_p.initNode = function(node){
	if(node._instance && node.title_click)
		return;
	node._instance = this;
	node.lockDown = MenuTree.lockDown;
	node.title_DBLClick = MenuTree.title_DBLClick;
	node.title_click = MenuTree.title_click;
	node.title_contextMenu = MenuTree.title_contextMenu;
	node.open = MenuTree.element_open;
	node.close = MenuTree.element_close;
}

_p.loadNode = function(node){
	if(node._instance){
	}else{
		node._instance = this;
	}
	node.open = MenuTree.element_open;
	node.close = MenuTree.element_close;
	node.close();
	node.open(true);
}

_p.reloadNode = function(node){
	node.open = MenuTree.element_open;
	node.close = MenuTree.element_close;
	node.close();
	node.open(true);
}

_p.checkTitle = function(node){
	if(node){
		node = node.parentNode;
		if(node && node.tagName=="A" && node.getAttribute("MT")=="title"){
			node = node.parentNode._node;
			if(node.prop.href)
				return false;
			this.initNode(node);
			return node;
		}
	}
}

_p.moveToScroll = function(node){
	var frame = this.frame;
	if(!node)
		node = this.getNowNode();
	node = node._div;

	var iY = node.offsetTop - frame.offsetTop;
	var iX = node.offsetLeft - frame.offsetLeft - 25;
	if(iY < frame.scrollTop)
		frame.scrollTop = iY;
	else if(iY > frame.scrollTop + frame.clientHeight -40)
		frame.scrollTop = iY - frame.clientHeight + 40

	frame.scrollLeft = iX;
}

_p.moveLeft = function(){
	var node = this.getNowNode();
	var p = node.parent;
	if(node._opend){
		node.close();
	}else{
		if(p == this.root)
			return;
		else{
			this.moveToScroll(p);
			this.element_focus(p);
		}
	}
}

_p.moveRight = function(){
	var node = this.getNowNode();
	if(node.hasChild){
		if(!node._opend){
			this.initNode(node);
			node.open();
		}
		node = node.son[0];
		this.element_focus(node);
	}
}

_p.moveUp = function(){
	var node = this.getNowNode();
	var p = node.parent;

	if(node.index() == 0){
		if(p == this.root)
			return;
		else
			node = p;
	}else{
		node= p.son[node.index()-1];
		while(node._opend){
			node = node.son[node.son.length -1];
		}
	}
	this.moveToScroll(node);
	this.element_focus(node);
}

_p.moveDown = function(){
	var node = this.getNowNode();
	var p = node.parent;
	if(node._opend){
		node = node.son[0];
	}else{
		while(node.parent && node.index() == node.parent.son.length -1){
			node = node.parent;
			if(node == this.root)
				return;
		}
		node=node.parent.son[node.index()+1];
	}
	this.moveToScroll(node);
	this.element_focus(node);
}

_p.moveNext = function(){
	var node = this.getNowNode();
	if((node.hasChild) && !node._opend){
		this.moveRight();
	}else{
		this.moveDown();
	}
}

_p.movePrevious = function(inst){
	var node = this.getNowNode();
	var p = node.parent;
	if(node.index() == 0){
		if(p == this.root)
			return;
		else
			node = p;
	}else{
		node= p.son[node.index()-1];
	}
	this.moveToScroll(node);
	this.element_focus(node);
}

MenuTree._mouseDown = function(){
	var node = event.srcElement;
	if(((top.ie && event.button == 1) ||(top.mozilla  && event.button == 0)  )&& node && node.tagName=="IMG" && node.getAttribute("MT")=="lock"){
		node = node.parentNode._node;
		this._instance.initNode(node);
		node.lockDown();
	}
}
MenuTree._DBLClick = function(){
	var node = event.srcElement;
	if(node = this._instance.checkTitle(node))
		node.title_DBLClick();
}
MenuTree._click = function(){
	var node = event.srcElement;
	if(node = this._instance.checkTitle(node)){
		node.title_click();
		Tool.disableEvent(this.event);
		return false;
	}
	return true;
}
MenuTree._contextMenu = function(){
	var node = event.srcElement;
	if(node = this._instance.checkTitle(node)){
		node.title_contextMenu();
		return false;
	}
}

MenuTree.lockDown = function(){
	if(this._opend)
		this.close();
	else
		this.open();
}

MenuTree.title_click = function(){
	this._instance.element_focus(this);
	this.event = this._instance.getEvent(this.prop.event,"title_click");
	if(this.event)this.event();
}

MenuTree.title_DBLClick = function(tree){
	if(this.prop._tag == "forder"){
		this.lockDown();
	}
	this.event = this._instance.getEvent(this.prop.event,"title_dblclick");
	if(this.event)this.event();
}
MenuTree.title_contextMenu = function(){
	this.event = this._instance.getEvent(this.prop.event,"contextmenu");
	if(this.event)this.event();
}

MenuTree.element_open = function(reload){
	if(!this.hasChild && !reload)
		return;
	var div = this._div;
	var _img = div.childNodes[0];
	var _span = div.childNodes[1];
	var _hide = div.childNodes[2];
	_img.src = MenuTree._I_block;

	_hide.className= 'show';

	this._opend = true;
	if(!this.son || this.son.length==0 || reload){
		this._loaded = false;
		_hide.innerHTML = '目录载入中...'.loc();
		try{
			this.event = this._instance.getEvent(this.prop.event,"reload_forder"); 
		}catch(e){
			throw e;
		}finally{
			if(this.event){
				try{
					this.event();
				}catch(e){
					_hide.innerHTML = '载入失败..'.loc();
					throw e;
				}
			}else{
				try{
					this.loadXML(Tool.getXML(encodeURI(this.prop.url)),this);
				}catch(e){
					if(String(e).indexOf("401")!=-1){
						this.close();
					}
					_hide.innerHTML = '载入失败..'.loc();
					throw e;
				}
			}
		}
	}
	if(!this.son || this.son.length==0){
		this.son == null;
		this.hasChild = false;
		div.childNodes[0].src = MenuTree._I_single;
		_hide.className= 'hide';
		this._opend = false;
	}else{
		this.hasChild = true;
		if(!this._loaded){
			this._instance.show(_hide,this);
			this._loaded = true;
		}
	}
}

MenuTree.element_close = function(){
	var div = this._div;
	var _img = div.childNodes[0];
	var _hide = div.childNodes[2];
	_img.src = MenuTree._I_none;
	_hide.className= 'hide';
	this._opend = false;
}

///////////////鼠标事件

MenuTree.keyDown = function(){
	var blnRetVal = false
	var inst = this._instance;
	if(window.event.ctrlKey == false && window.event.altKey == false){
		Tool.disableEvent(this.event);
		switch (window.event.keyCode){
			case 9 : // tab key
				if (window.event.shiftKey == true) inst.movePrevious();
				else inst.moveNext();
				break;
			case 37 : inst.moveLeft();break;
			case 38 : inst.moveUp();break;
			case 39 : inst.moveRight();break;
			case 40 : inst.moveDown();break;
			case 188 : inst.movePrevious();break; //<
			case 190 : inst.moveNext();break; // >

			default :
				window.event.cancelBubble = false;
				window.event.returnValue = true;
				blnRetVal = true;
				break;
		}
	}else{
		window.event.cancelBubble = false;
		window.event.returnValue = true;
		blnRetVal = true;
	}
	return blnRetVal;
}
MenuTree._I_none = getImg('menutree/none');
MenuTree._I_block = getImg('menutree/block');
MenuTree._I_single = getImg('menutree/single');