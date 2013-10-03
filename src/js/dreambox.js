(function ( $ ) {
// all buttons must be withing 100x100 area
	var path_zoomin=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#aaa',fill:'#111'}},{d:"M25,50 l50,0 M50,25 l0,50",attr:{stroke:'#fff','stroke-width':10}}];
	var path_zoomout=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}},{d:"M25,50 l50,0",attr:{stroke:'#fff','stroke-width':10}}];
	var path_move=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}},{d:"M25,25 l40,0 l0,40 l-40,0 l0,-40",attr:{stroke:'#fff','stroke-width':5}},
		{d:'M25,65 l15,15',attr:{stroke:'#fff','stroke-width':3}},
		{d:'M65,25 l15,15',attr:{stroke:'#fff','stroke-width':3}},
		{d:'M65,65 l15,15',attr:{stroke:'#fff','stroke-width':3}}
	];
	var path_fit=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}},{d:"M15,30 l70,0 l0,40 l-70,0 z",attr:{'stroke-width':8,'stroke':'#fff',fill:'#111'}}];
	var path_full=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}},{d:"M40,30 l70,0 l0,40 l-70,0 z",attr:{'stroke-width':8,'stroke':'#fff',fill:'#111'}}];
	var path_dummy=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}}];
	
  var return_false=function(){return false};

	var getMouseXY=function(container,event){
		var data=container.data('zooomy');
		var offset = data.touchpad.object.offset(); 
		return {x:event.pageX - offset.left,y:event.pageY - offset.top};
	}
	var getButtonForMouseEvent=function(container,event){
		var data=container.data('zooomy');
		var offset = data.touchpad.object.offset(); 
		var x=event.pageX - offset.left,y=event.pageY - offset.top;
		var cp=data.cp;
		var ret=false;
		for (var i=0;i<cp.buttons.length;i++){
			var b=cp.buttons[i];
			b.set.forEach(function(el){
				if (el.isPointInside(x,y)){
					ret=b;
					return false;
				}
			})
		}
		return ret;
	}

	var getButtonSet=function(paper,paths,cx,top,bottom,mousedown,mouseup){
		paper.setStart();
		for (var i=0;i<paths.length;i++){
// 100 is from the button area
			var h=(bottom-top-2);
			if (h<16) h=16;
			var scale=h/100;
			var attr=paths[i].attr;
			attr['stroke-opacity']=0;
			attr['fill-opacity']=0;
			attr['cursor']='pointer';
			if (!mousedown) mousedown=return_false;
			if (!mouseup) mouseup=function(){alert("No acion")};
			var btn=paper.path(paper.raphael.transformPath(paths[i].d,['S',scale,scale,50,50,'T',cx-50,top+(bottom-top)/2-50])).attr(paths[i].attr);
			//.mousedown(mousedown).mouseup(mouseup);
			//$(btn.canvas).bind('dragstart', return_false);
		}
		return {set:paper.setFinish(),mousedown:mousedown,mouseup:mouseup};
	}
	var startMove=function(container,event){
		var data=container.data('zooomy');
		data['move']=getMouseXY(container,event);
	}
	var zoominDown=function(container){
		var data=container.data('zooomy');
		data.zoom=1;
		data.cp.disabled=true;
	}
	var zoominUp=function(container){
		var data=container.data('zooomy');
		if (data.zoom==1) {
			scaleImage(container,1);
		}
	}
	var zoomoutDown=function(container){
		var data=container.data('zooomy');
		data.zoom=-1;
		data.cp.disabled=true;
	}
	var zoomoutUp=function(container){
		var data=container.data('zooomy');
		if (data.zoom==-1) {
			scaleImage(container,-1);
		}
	}
	var scaleImage=function(container,direction){
		var data=container.data('zooomy');
		var box=data.box;
		var image=data.image;
		var holder=image.holder;
		var origin=data.origin;
		var settings=data.settings;

		var step=settings.zoomingSpeed>=1?settings.zoomingSpeed/100:settings.zoomingSpeed;

		if (origin.width>origin.height){
			var d=origin.width*step/data.scale;
			var l=image.width+d*direction;
			if (box.width/(l/origin.width)<box.width/10) return;
			var s=origin.width/l;
		}else{
			var d=origin.height*step/data.scale;
			var l=image.height+d*direction;
			if (box.height/(l/origin.height)<box.height/10) return;
			var s=origin.height/l;
		}

		if (l<16) return; //too small

		data.scale=s;

		var cx=image.left+image.width/2
		var cy=image.top+image.height/2

		var h=origin.height/data.scale;
		var w=origin.width/data.scale;

		image.width=w;
		image.height=h;
		image.left=cx-image.width/2;
		image.top=cy-image.height/2;

		holder.css('top',image.top);
		holder.css('left',image.left);
		holder.css('height',image.height);
		holder.css('width',image.width);
	}
	var fitImage=function(container){
		var data=container.data('zooomy');
		var image=data.image;
		var holder=image.holder;
		setupImageFit(container);
		holder.css('top',image.top);
		holder.css('left',image.left);
		holder.css('height',image.height);
		holder.css('width',image.width);
	}
	var fullImage=function(container){
		var data=container.data('zooomy');
		var image=data.image;
		var holder=image.holder;
		setupImageFull(container);
		holder.css('top',image.top);
		holder.css('left',image.left);
		holder.css('height',image.height);
		holder.css('width',image.width);
	}

	var setupContainer=function(container){
		var data=container.data('zooomy');
		data.box.object=container; //for unification
		data.box.width=container.width();
		data.box.height=container.height();
		data.box.object.css('background-color',data.settings.bgColor);
		if (data.box.object.css('position')=='static') data.box.object.css('position','relative');
		data.box.object.html('');
	}
	var setupPanel=function(container){
		var data=container.data('zooomy');
		var box=data.box;
		var cp_layer=$('<div style="position:absolute;left:0;top:0;height:100%;width:100%"></div>');
		box.object.append(cp_layer);

		var cppaper=Raphael(cp_layer.get(0),box.width,box.height);
		var cppanel=cppaper.path(['m',-box.width/10,box.height,'a',box.height/1.6,box.height/8,0,0,1,box.width+box.width/5,0]).attr({fill:'black',stroke:'none','fill-opacity':0});

		var arcl=cppanel.getTotalLength();
		var buttonsl=4 * (100) + (4-1)*10; // n of buttons * button width + paddings
		var buttons=[];

	  var ch=box.height;
			
		var xb=(arcl-buttonsl)/2+50;
		var pt=cppanel.getPointAtLength(xb);
		buttons.push(getButtonSet(cppaper,path_fit,pt.x,pt.y,ch,function(){
			fitImage(container)
		}));

		xb=xb+100+10;
		pt=cppanel.getPointAtLength(xb);
		buttons.push(getButtonSet(cppaper,path_zoomin,pt.x,pt.y,ch,function(){zoominDown(container)},function(){zoominUp(container)}));

		xb=xb+100+10;
		pt=cppanel.getPointAtLength(xb);
		buttons.push(getButtonSet(cppaper,path_zoomout,pt.x,pt.y,ch,function(){zoomoutDown(container)},function(){zoomoutUp(container)}));

		xb=xb+100+10;
		pt=cppanel.getPointAtLength(xb);
		buttons.push(getButtonSet(cppaper,path_full,pt.x,pt.y,ch,function(){
			fullImage(container);
		}));

		data.cp={paper:cppaper,panel:cppanel,timer:false,status:0,buttons:buttons,disabled:false};
	}

	var setupOrigin=function(container,image){
		var data=container.data('zooomy');
		data.origin.object=image;
		data.origin.width=image.width;
		data.origin.height=image.height;
		data.origin.src=image.src;
	}
	var drawImage=function(container){
		var data=container.data('zooomy');
		var settings=data.settings;
		var box=data.box;
		var image=data.image;
		var origin=data.origin;
		if (settings.useBackground){
			var holder=$('<div style="position:absolute;left:'+image.left+'px;top:'+image.top+'px;height:'+image.height+'px;width:'+image.width+'px"></div');
			if (holder.css('background-size')){
				holder.css('background-size','cover')
				holder.css('background-image','url("'+origin.src+'")');
			}else{
				holder.css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+origin.src+"', sizingMethod='scale')");
			}
		}else{
			var holder=$('<img style="position:absolute;left:'+image.left+'px;top:'+image.top+'px;height:'+image.height+'px;width:'+image.width+'px" src="'+origin.src+'"></img');
		}
		image.holder=holder;
		box.object.prepend(holder);
	}
	var setupTouchpad=function(container){
		var data=container.data('zooomy');
		var touchpad=$('<div style="position:absolute;left:0;top:0;height:100%;width:100%"></div>');
		data.box.object.append(touchpad);
		data.touchpad.object=touchpad;

		touchpad.mousedown(function (e) {
			var b=getButtonForMouseEvent(container,e);
			if (b) b.mousedown(e);
			else{
				startMove(container,e);
			}
		});

		touchpad.mouseup(function (e) {
			var data=container.data('zooomy');
			var b=getButtonForMouseEvent(container,e);
			if (b && data.zoom) {
				b.mouseup(e);
			}
			data.move=false;
			data.zoom=0;
			data.cp.disabled=false;
			showCP(container);
		});
		touchpad.mouseout(function (e) {
			var data=container.data('zooomy');
			data.move=false;
			data.zoom=0;
			data.cp.disabled=false;
			showCP(container);
		})

		touchpad.mousemove(function (e) {
			var data=container.data('zooomy');
			if (data.zoom==0 && !data.move){
				showCP(container);
			}else{
				if (data.cp.status!=0){
					hideCP(container,0);
				}
				if (data.zoom!=0)
					scaleImage(container,data.zoom);
				else if (data.move)
					moveImage(container,getMouseXY(container,e));
			}
		});
	}

	var setupImageFull=function(container){
		var data=container.data('zooomy');
		var settings=data.settings;
		var box=data.box;
		var image=data.image;
		var origin=data.origin;


		//var l=(box.width-origin.width)/2;+image.left?image.left*data.scale:0;
		var cx=image.left+image.width/2
		var cy=image.top+image.height/2
		image.height=origin.height;
		image.width=origin.width;
		image.left=cx-image.width/2;
		image.top=cy-image.height/2;
		data.scale=1;
	}

	var setupImageFit=function(container){
		var data=container.data('zooomy');
		var settings=data.settings;
		var box=data.box;
		var image=data.image;
		var origin=data.origin;

		var iw=origin.width;
		var ih=origin.height;
		var cw=box.width;
		var ch=box.height;
		var kv=ih/ch;
		var kh=iw/cw;
			if (kv>kh){
				var k=kv;
				var h=ch;
				var w=iw/kv;
				var t=0;
				var l=Math.floor((cw-w)/2);
				w=Math.floor(w);
			}else if (kh>kv){
				var k=kh;
				var w=cw;
				var h=ih/kh;
				var l=0;
				var t=Math.floor((ch-h)/2);
				h=Math.floor(h);
			}else{
				var k=kh;
				var h=ch;
				var w=cw;
				var t=0;
				var l=0;
			}
			image.height=h;
			image.width=w;
			image.left=l;
			image.top=t;
			data.scale=k;
	}

	var moveImage=function(container,xy){
		var data=container.data('zooomy');
		var image=data.image;
		var holder=image.holder;
		var origin=data.origin;
		var settings=data.settings;
		var move=data.move;

		var x_offset=xy.x-move.x;
		var y_offset=xy.y-move.y;
		move.x=xy.x;
		move.y=xy.y;

		image.left+=x_offset;
		image.top+=y_offset;

		holder.css('top',image.top);
		holder.css('left',image.left);
	}

	var getImgFromContainer=function(container,settings){
		var img=$('img',container).first();
		var src=img.get(0).src;
		container.html('');
		var i=new Image();
		i.onload=function(){init(container,this,settings)};
		i.src=src;
	}
/* CP 
States: Invisible -> Fading In -> Active -> Fading Out ->Invisible
         0            1             2         3            0
Timer : False        False        True      False        False 
Show  : Effective -> Ignored   -> Renew  -> Cancel+FadeIn -> Effective
*/

	var showCP=function(container){
		var data=container.data('zooomy');
		var cp=data.cp;
		var panel=cp.panel;


		if (cp.timer){
			clearTimeout(cp.timer);
			cp.timer=false;
		};

		if (data.cp.disabled) return;
// status 1 handled
    if (cp.status==1) return;
// staus 3 handled
    if (cp.status==3){
			panel.stop();
			for (var i=0;i<cp.buttons.length;i++) cp.buttons[i].set.stop();
			cp.status=0;
		}
// status 2 handled
		if (cp.status==2){
			resetCPTimer(container);
		}else {
// status 0
			var settings=data.settings;
			cp.status=1;
			for (var i=0;i<cp.buttons.length;i++)
				cp.buttons[i].set.forEach(function(el){
					el.animate({'stroke-opacity':settings.cpButtonsOpacity,'fill-opacity':settings.cpButtonsOpacity},settings.cpShowDuration,'linear')
				});
			panel.animate({'fill-opacity':settings.cpPanelOpacity},settings.cpShowDuration,'linear',function(){
				cp.status=2;
				resetCPTimer(container);
			})
		}

	}

	var hideCP=function(container,duration){
		var data=container.data('zooomy');
		var cp=data.cp;
		if (cp.timer){
			clearTimeout(cp.timer);
			cp.timer=false;
		};
		for (var i=0;i<cp.buttons.length;i++)
			cp.buttons[i].set.forEach(function(el){
				if (duration==0)
					el.attr({'stroke-opacity':0.0,'fill-opacity':0.0});
				else
					el.animate({'stroke-opacity':0.0,'fill-opacity':0.0},duration,'linear')
			});
		if (duration==0){
			cp.panel.attr({'fill-opacity':0.0});
			cp.status=0;
		}else{
			if (cp.status!=3){
				cp.status=3;
				cp.panel.animate({'fill-opacity':0.0},duration,'linear',function(){
					cp.status=0;
				})
			}
		}
	}


	var resetCPTimer=function(container){
		var data=container.data('zooomy');
		var cp=data.cp;
		if (cp.timer){
			clearTimeout(cp.timer);
			cp.timer=false;
		};
		if (data.cp.disabled) return;
		var panel=data.cp.panel;
		var settings=data.settings;
		cp.timer=setTimeout(
			function(){
				cp.timer=false
				hideCP(container,settings.cpHideDuration);
			},
			settings.cpHideTimeout
		)
	}

	var onUserActivity=function(container){
		var data=container.data('zooomy');
		if (data.cp.disabled) return;
		showCP(container);
	};
  var init=function(container,img,settings){
			container.data('zooomy',{
				holder:null, //jQuery object with a HTML element holding an image block
				settings:settings,
				cp:null,
				zoom:0,
				move:0,
				orientation:0,
				origin:{},
				box:{},
				touchpad:{},
				image:{}});
	
		setupContainer(container);
		setupPanel(container);
		setupOrigin(container,img);
		setupImageFit(container);
		drawImage(container);
		setupTouchpad(container);
	}	

	var traverseContainers=function(j,settings){
		return j.each(function() {
			var container=$(this);
			getImgFromContainer(container,settings);
    });
	}
	
	$.fn.dreambox = function(options) {
		var settings = $.extend({
			bgColor: "#aaa",
			useBackground: false,
			cpHeight: 'auto',
			cpShowDuration:300,
			cpHideDuration:1000,
			cpHideTimeout:2000,
			cpPanelOpacity:0.6,
			cpButtonsOpacity:0.6,
			dontLoadRaphael: false,
			zoomingSpeed:10
    }, options );
		var j=this;
		if (settings.dontLoadRaphael){
			return traverseContainers(j,settings);
		}else{
			$.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js',function(){
				return traverseContainers(j,settings);
			})
		}
	};
}( jQuery ));
