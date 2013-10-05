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
	var path_full=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}},{d:"M40,30 l0,40 M60,30 l0,40 z",attr:{'stroke-width':8,'stroke':'#fff',fill:'#111'}}];
	var path_screen=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}}];
	var path_dummy=[{d:"M 50 1 a 49 49 0 1 0 1 0 z",attr:{'stroke-width':1,'stroke':'#ddd',fill:'#111'}}];
	
  var return_false=function(){return false};

	var fsCancel=document.CancelFullScreen||document.webkitCancelFullScreen||document.mozCancelFullScreen;
	var fsEnabled=!!fsCancel;
	var fsCurrent=false;

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
			var btn=paper.path(paper.raphael.transformPath(paths[i].d,['S',scale,scale,50,50,'T',cx-50,top+(bottom-top)/2-50])).attr(paths[i].attr);
			//.mousedown(mousedown).mouseup(mouseup);
			//$(btn.canvas).bind('dragstart', return_false);
		}
		if (!mousedown)
			mousedown=return_false;
		if (!mouseup)
			mouseup=return_false;
		return {set:paper.setFinish(),mousedown:mousedown,mouseup:mouseup};
	}
	var startMove=function(container,event){
		var data=container.data('zooomy');
		data['move']=getMouseXY(container,event);
	}
	var zoominDown=function(container){
		var data=container.data('zooomy');
		data.zoom=1;
		showCP(container);
		//data.cp.disabled=true;
	}
	var zoominUp=function(container){
		var data=container.data('zooomy');
		if (data.zoom==1) {
			scaleImage(container,1);
		}
		resetCPTimer(container);
	}
	var zoomoutDown=function(container){
		var data=container.data('zooomy');
		data.zoom=-1;
		//data.cp.disabled=true;
		showCP(container);
	}
	var zoomoutUp=function(container){
		var data=container.data('zooomy');
		if (data.zoom==-1) {
			scaleImage(container,-1);
		}
		resetCPTimer(container);
	}
	var scaleImage=function(container,direction,slow){
		var data=container.data('zooomy');
		var box=data.box;
		var image=data.image;
		var holder=image.holder;
		var origin=data.origin;
		var settings=data.settings;

		var step=settings.zoomingSpeed>=1?settings.zoomingSpeed/100:settings.zoomingSpeed;
		if (slow) step=step/5;

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
		if (data.settings.bgColor)
			data.box.object.css('background-color',data.settings.bgColor);
		data.box.object.css('overflow','hidden');
		if (data.box.object.css('position')=='static') data.box.object.css('position','relative');
		data.box.object.html('');
		container.resize(function(){resize(container)});
	}
	var setupPanel=function(container){
		var data=container.data('zooomy');
		var box=data.box;
		var cp_layer=$('<div style="position:absolute;left:0;top:0;height:100%;width:100%"></div>');
		box.object.append(cp_layer);

		var cppaper=Raphael(cp_layer.get(0),box.width,box.height);
		var cppanel=cppaper.path(['m',-box.width/10,box.height,'a',box.height/1.6,box.height/8,0,0,1,box.width+box.width/5,0]).attr({fill:'black',stroke:'none','fill-opacity':0});

		var arcl=cppanel.getTotalLength();
		var buttonsn=5;
		if (!fsEnabled) buttonsn=buttonsn-1;
		//var buttonsl=buttonsn * (100) + (buttonsn-1)*10; // n of buttons * button width + paddings

		var buttons=[];
	  var ch=box.height;
		var bx=[];for (var i=0;i<buttonsn;i++) bx.push({});
			
		var xb=arcl/2;
		var pt=cppanel.getPointAtLength(xb);
		if (buttonsn % 2==0) {
			xb=xb-(ch-pt.y)*1.1/2;
			pt=cppanel.getPointAtLength(xb);
		}

		var pos=Math.ceil(buttonsn/2)-1;

		bx[pos].x=pt.x;
		bx[pos].h=ch-pt.y;
		bx[pos].t=pt.y
		bx[pos].b=ch;

		var xb0=xb;
		for (i=pos-1;i>=0;i--){
			xb0=xb0-bx[i+1].h*1.1;
			var pt=cppanel.getPointAtLength(xb0);
			bx[i].x=pt.x;
			bx[i].h=ch-pt.y;
			bx[i].t=pt.y
			bx[i].b=ch;
		}

		var xb0=xb;
		for (i=pos+1;i<buttonsn;i++){
			xb0=xb0+bx[i-1].h*1.1;
			var pt=cppanel.getPointAtLength(xb0);
			bx[i].x=pt.x;
			bx[i].h=ch-pt.y;
			bx[i].t=pt.y
			bx[i].b=ch;
		}
		
    var last={};
		xb0=xb0+bx[i-1].h*1.1;
		var pt=cppanel.getPointAtLength(xb0);
		last.x=pt.x;
		last.h=ch-pt.y;
		last.t=pt.y
		last.b=ch;

		i=0;
		buttons.push(getButtonSet(cppaper,path_fit,bx[i].x,bx[i].t,bx[i].b,function(){fitImage(container) }));

		i=i+1;
		buttons.push(getButtonSet(cppaper,path_zoomin,bx[i].x,bx[i].t,bx[i].b,function(){zoominDown(container)},function(){zoominUp(container)}));

		if (fsEnabled){
			i=i+1;
			buttons.push(getButtonSet(cppaper,path_screen,bx[i].x,bx[i].t,bx[i].b,function(){fullScreen(container)}));
		}

		i=i+1;
		buttons.push(getButtonSet(cppaper,path_zoomout,bx[i].x,bx[i].t,bx[i].b,function(){zoomoutDown(container)},function(){zoomoutUp(container)}));

		i=i+1;
		buttons.push(getButtonSet(cppaper,path_full,bx[i].x,bx[i].t,bx[i].b,function(){ fullImage(container); }));

	/*	
		var logo=cppaper.path(
			Raphael.transformPath("M 55,65 a45,45 0,1,1 0,1 z M 115,10 A58,58 0,1,0 130,115 A62,62 0,1,1 115,10 z M 35,20 A80,80 0,1,0 166,65 A75,75 0,1,1 35,20 z",['T',10,0])+
			Raphael.transformPath("M506 3408 c-14 -19 -16 -70 -16 -355 0 -320 1 -334 20 -353 11 -11 31 -20 45 -20 14 0 34 9 45 20 19 19 20 33 20 358 0 316 -1 340 -18 355 -27 25 -78 22 -96 -5z M3195 3400 c-14 -26 -15 -76 -13 -354 3 -302 4 -325 22 -345 24 -26 67 -27 89 -3 15 17 17 56 17 359 0 317 -1 341 -18 356 -10 10 -33 17 -50 17 -25 0 -35 -6 -47 -30z M255 3241 c-129 -34 -205 -136 -205 -276 0 -87 24 -150 80 -206 78 -78 197 -100 293 -55 l37 18 0 64 0 65 -29 -22 c-69 -51 -185 -28 -230 44 -47 76 -15 199 61 238 50 25 95 24 152 -5 l47 -24 -3 62 c-3 59 -4 62 -40 79 -42 21 -120 29 -163 18z M745 3226 l-26 -26 3 -246 c3 -230 4 -247 22 -260 26 -18 56 -18 84 2 22 15 22 18 22 263 0 266 -2 274 -52 286 -21 5 -33 1 -53 -19z M1213 3236 c-88 -28 -157 -99 -188 -194 -45 -135 38 -299 175 -347 74 -26 80 -23 80 39 0 52 -1 55 -30 61 -37 8 -76 39 -95 75 -24 46 -20 50 55 50 l70 0 0 50 0 50 -65 0 c-70 0 -74 4 -51 49 17 32 52 58 87 63 22 3 24 7 24 57 0 30 -4 56 -10 57 -5 1 -29 -3 -52 -10z M1310 3197 l0 -52 45 -19 c45 -18 85 -60 85 -90 0 -13 -12 -16 -65 -16 l-65 0 0 -50 0 -50 108 0 c132 0 152 10 152 73 -1 111 -106 227 -227 250 l-33 7 0 -53z M1798 3233 c-181 -60 -244 -313 -115 -460 72 -80 183 -113 278 -82 62 21 79 45 79 112 l0 59 -30 -26 c-76 -63 -201 -39 -247 47 -25 47 -22 125 6 170 49 80 159 100 235 42 l36 -27 0 59 c0 68 -13 86 -77 109 -50 17 -107 16 -165 -3z M2092 3234 c-22 -15 -22 -18 -22 -268 0 -232 1 -254 18 -269 24 -22 54 -21 83 2 l24 19 0 247 0 247 -24 19 c-28 23 -49 24 -79 3z M2299 3231 l-24 -19 0 -245 c0 -227 1 -246 19 -266 23 -26 67 -27 89 -3 15 16 17 50 17 265 0 234 -1 248 -20 267 -25 25 -51 25 -81 1z M2473 3230 l-43 -19 0 -56 c0 -54 6 -65 27 -44 5 5 34 9 63 7 45 -3 56 -7 74 -31 19 -26 22 -46 26 -201 4 -126 9 -178 19 -190 17 -20 60 -21 87 -2 17 13 19 31 24 189 5 158 7 178 26 204 17 23 30 29 69 31 60 4 91 -11 105 -51 5 -16 10 -101 10 -188 0 -146 2 -161 20 -179 27 -27 75 -26 94 2 13 18 16 55 16 198 0 97 -5 193 -11 215 -22 77 -106 135 -197 135 -41 0 -101 -30 -138 -69 l-28 -30 -29 34 c-19 24 -44 39 -79 50 -66 19 -84 19 -135 -5z M3430 3241 c-14 -4 -40 -16 -58 -25 -31 -16 -32 -19 -32 -76 0 -33 2 -60 5 -60 3 0 20 10 36 23 46 34 133 31 181 -5 72 -55 87 -163 33 -234 -44 -58 -137 -83 -191 -51 -12 6 -31 18 -43 25 -22 13 -22 13 -19 -50 l3 -63 45 -22 c88 -45 202 -23 284 55 131 126 103 371 -52 455 -53 29 -147 43 -192 28z M4446 3226 c-15 -14 -26 -31 -26 -39 0 -8 31 -58 69 -113 l69 -100 -55 -74 c-30 -41 -66 -94 -80 -118 l-26 -44 20 -26 c15 -20 29 -27 54 -27 33 0 39 7 191 220 87 121 164 235 173 252 18 37 9 65 -26 84 -38 20 -62 3 -117 -86 -30 -47 -55 -85 -57 -85 -2 0 -25 34 -52 77 -26 42 -50 80 -53 84 -3 4 -17 10 -32 14 -21 5 -33 1 -52 -19z M903 3223 c-20 -13 -23 -25 -23 -74 0 -53 10 -74 24 -50 3 4 22 11 42 14 46 8 74 33 74 67 0 53 -67 78 -117 43z M3994 3229 c-42 -12 -120 -83 -144 -129 -63 -123 -37 -269 61 -353 42 -36 114 -67 156 -67 21 0 23 4 23 59 0 58 -1 60 -30 66 -72 16 -129 107 -115 182 13 71 53 115 128 137 13 4 17 17 17 61 l0 55 -32 -1 c-18 0 -47 -5 -64 -10z M4110 3185 c0 -44 4 -57 18 -61 74 -22 114 -66 127 -137 14 -75 -43 -166 -115 -182 -29 -6 -30 -8 -30 -66 0 -55 2 -59 23 -59 73 0 181 69 216 139 65 127 40 268 -65 360 -47 41 -95 61 -146 61 -27 0 -28 -2 -28 -55z M4692 2895 c-18 -25 -32 -48 -32 -50 0 -9 73 -120 93 -142 40 -44 107 -19 107 40 0 18 -22 58 -62 112 -34 47 -65 85 -68 85 -3 0 -21 -20 -38 -45z M1438 2864 c-15 -8 -32 -23 -38 -34 -6 -11 -28 -25 -50 -31 l-40 -12 0 -54 c0 -61 6 -64 87 -37 62 20 117 58 131 89 14 30 1 69 -27 84 -25 14 -30 13 -63 -5z",['T',0,-7500,'S',0.04,-0.04,0,0]));
		logo.transform(['S',last.h/200,last.h/200,0,0,'T',last.x,last.t]);

		logo.attr({'stroke-width':0,'stroke':'none',fill:'#aaa'});
*/

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
		holder.css('max-width','none');
		holder.css('max-height','none');
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
			resetCPTimer(container);
		//	showCP(container);
		});
		touchpad.mouseout(function (e) {
			var data=container.data('zooomy');
			data.move=false;
			data.zoom=0;
			data.cp.disabled=false;
			hideCP(container);
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
					scaleImage(container,data.zoom,true);
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

	function fullScreen(container)
	{
		if (!fsEnabled) return;
		var state=document.FullScreen||document.webkitFullScreen||document.mozFullScreen;
		if (state){
			//fsCancel(document);
			document[fsCancel.name]();
		}else{
			var e=container.get(0);
			fsCurrent=container;

			var func = e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen;
			if (func) 
			{
					if (Element["ALLOW_KEYBOARD_INPUT"])
							func.call(e, Element["ALLOW_KEYBOARD_INPUT"]);
					else
							func.call(e);
			}
		}
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
		if (img.length>0){
			var src=img.get(0).src;
			container.html('<div style="margin-top:25%;text-align:center">Loading...</div>');
			var i=new Image();
			i.onload=function(){init(container,this,settings)};
			i.src=src;
		}
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
//console.log(data.cp);
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
		if (duration==undefined) duration=data.settings.cpHideDuration;
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
		setupOrigin(container,img);
		resize(container);
/*
		setupPanel(container);
		setupImageFit(container);
		drawImage(container);
		setupTouchpad(container);
*/
	}	

	var traverseContainers=function(j,settings){
		return j.each(function() {
			var container=$(this);
			getImgFromContainer(container,settings);
    });
	}

	
	$.fn.dreambox = function(options) {
		var settings = $.extend({
			bgColor: false,
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
			j.css('visibility','hidden');
			$.getScript('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js',function(){
				j.css('visibility','');
				return traverseContainers(j,settings);
			})
		}
	};
function resize(container)
{
	var data=container.data('zooomy');

	data.box.object.html('');
	data.box.width=container.width();
	data.box.height=container.height();

	setupPanel(container);
	setupImageFit(container);
	drawImage(container);
	setupTouchpad(container);
}
function fullScreenChangeHandler(event)
{
	var container=fsCurrent;
	resize(container);
  hideCP(container,0);
}

/**
 * Handles the browser-specific fullscreenerror event and triggers
 * a jquery event for it.
 *
 * @param {?Event} event
 *            The fullscreenerror event.
 */
function fullScreenErrorHandler(event)
{
}

    var e = document;
    if (e["webkitCancelFullScreen"])
    {
        var change = "webkitfullscreenchange";
        var error = "webkitfullscreenerror";
    }
    else if (e["mozCancelFullScreen"])
    {
        var change = "mozfullscreenchange";
        var error = "mozfullscreenerror";
    }
    else 
    {
        var change = "fullscreenchange";
        var error = "fullscreenerror";
    }

    // Install the event handlers
    jQuery(document).bind(change, fullScreenChangeHandler);
    jQuery(document).bind(error, fullScreenErrorHandler);

}( jQuery ));
