(function ( $ ) {
	var img_panel="iVBORw0KGgoAAAANSUhEUgAAAfQAAABQCAYAAADvLIfGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASiSURBVHic7d3bVhxFFAbgf4MhMRgNigaJCRhIwIfyvXxEL3wHvJgJOQ0z04cauuH7blgMRfVeay7+tau7q+rm5iYtVdVZkr+bXuT+1X0XwGC+w3nz/c3fQ/8O/7m5ufm35QW+azn50vWOrgMAU3WdpGmg77WcfOl6B9cAgClrnoVNA72qTpIctbwGAMzASVW9bHmB1h267hwAFppmokAHgN2YZ6AvlxZOWs0PADPztqqet5q8ZYeuOweAT/aSfGg5eSt/NZwbAOaoWbPbJNCXSwpvWswNADN2UVVPWkzcqkO/ajg3AMzVkyTvWkzcKnTdPweA1Zpk5OiBXlUHSS7GnhcAHoirqho9f1t06JexdzsA3KXJc2YtAt1yOwCsN3pWjhroVbWfhu/YAcADMe1AT3KW5NnIcwLAQ3NUVa/GnHDsQLeZDABsZ9QufbRAr6rK4v1zAGCzaQZ6ktMkP444HwA8ZL9X1U9jTTZmoHu6HQC6GS07xwx0988BoJtpBXpVHSc5HmMuAHhEzqrq+zEmGqtDt9wOAN2Ndka6QAeA+zVKhg4O9Kp6keT1CLUAwGN0UVWDz0AZo0O/TlIjzAMAj9Eop5SOFegAQH+Ds3RQoFfVsyTnQ4sAgEfuw3LH1d6Gdujvk+wPnAMAHrvDJG+HTDA00G0mAwDjGHQeSu9AXz6Rdznk4gDArUH30Yd06O+yeDIPABju56r6re8/Dwl0T7cDwLh6Z2uvQHf2OQA0sdtAz+JJvMO+FwUAVjrte0Z630C33A4AbfRaARfoADAtvTK2c6BX1askR30uBgBsdL7cibWTPh26zWQAoJ1eZ6T3CXTL7QDQVues7RToVfUyyUnXiwAAnVx2PSO9a4euOweA9g6y2JF1a10D3f1zANiNTk301oFeVc+TvOlcDgDQx1WXM9K7dOhXHccDAP0dpkMj3SWg3T8HgN3aOnu3CvSqOkhy0bscAKCPcQM9yWWSTo/PAwCDbX1G+raBbrkdAO7HVhm8MdCraj89tqADAEax1elr23ToZ0k6bxIPAIzitKp+3DRom0C3mQwA3J/KFl362kBfvtDe66B1AGA0G++jb+rQT5NsbPMBgKY2npG+KdA93Q4A928/yft1AzYFuvvnADANa5vsOwO9qo6THI9eDgDQx9oz0td16JbbAWA6nib5864/CnQAmI87s3lloFfViySvm5UDAPRx5xnpd3Xo11m8yA4ATMcPSf5Y9Yd1gQ4ATM/KjP4m0Jcvrp+3rgYA6GW7QM/ixfX9trUAAD39UlW/fv3hqkC3mQwATNs3XfoXgb58Yf1yZ+UAAH2sD/Qk75Ic7KYWAKCn0+Ur5re+DnRPtwPA9FW+yuzbQHf2OQDMyupAT/I2yeFuawEAejqvqqcff/k80C23A8B8fHFGukAHgPm6ze69JKmqV0mO7q0cAKCP91W1n3zq0G0mAwDzc3tG+sdAt9wOAPN0nSR7VfUyyck9FwMA9HNVVbUX3TkAzNmLJK/34v45AMzddSW5yGILuXz283OrPusyduj/T2GsurqNnWpdXcaqq9vYqdbVZay6uo2dal1dxj6kuv77HymZI/T7UCcoAAAAAElFTkSuQmCC";
// all buttons must be withing 100x100 area
	var img_zoomin="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"

	var img_zoomout="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";

	var img_move="iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAEtUlEQVR4nN2bPW4VMRSF2QFLYAksgRVEtOko0oc6FU16+jR0aVH6SJQpkdJHtOkosgCYT8pF1nDOtec92xM4kpXkvfnxsc/98bXz6tULwetn7N2Pafi04MeCX8/g9w8L9u7XMDC73xf8MviyYO8+DsHnBY504L+c+Rpp8G3B3v3sincLWoj/XLB3X6tAll8XfHsGNgpBde0xxPEN757xdsF4ZgZ0BKJb7BRPvr7u8fFR3l/ep/wC795lAFqc1Do+K+J3d3cpcRTkno8ypuYAbxbUSAOIlvepwbq+vrbEW0yDZ04j3mqrxOvyPmUal5eXlniZ4DhMjQCtxAHqiPuQ5vr7i4sLeR8+ouX5L4L409PTX599XMA92KK6R7kKZjrL7nYj3mrjQcINFh5dzbhShgOhdBpxoDpxc3MjO0fYYebXn9/f31upK3D9GmsHOhzKUSHbh4cH2TkVyvDorcRvb29lzH+/YCpxF5pUeGKQkOT686urq2bizvtPT2KU182kqxTCtZBvgXpu+I+pUM4Kr35yctJEJMi4BKYE5qNmXHl0oke5fsDEypDaBaqTp6enNg09lDj2ra5bZ23IXiU9RAm3cDoIKtZula+LBCXOzs4k8dKjM6tZGOya1yuHRQfPz8+biGMWKkSVQObuunIFmK0UA5FMHQ0VopAlHVVZ3CHEGUj3vJBvtoIr0S3ZUQ4uZogByADhFuKoxymIPrTm9F2Ju9QVQrXleigjI07C4p6FtLeQBt2kDpRDIfTg3TNApkYcx+fU07qICXQvWigHFx3OwhqemmuycIbEuUalwVvRdbaBy+DosMvi4nuaS0UjGdqSEDkMWbqSNKiXRafXMoUQAxLfO2LhA9zAtAKJy8yNDwlLjErYKz/5m8yoJeNRL8TGgxj2jKRJbMrPo6mEp8UUAjhBV62VEm+plILahp7L4NYEs8bM4hOY6fLeWrgDLmeQElfJRw0QVJ7Rrby2EHctI47TczNtvXhLBdORn0ncEUMZmbe3BYpDSAfWsh9JHBMopczv2H1mpelua5YAMJI83I02agkZueppOKcejWfhACEbz1WzjbyrFZlauseD8cAunDBwvMStinqRVs3NdnOSQqjKbD0WHG7mHSIGj2rK4W3eWkaqKu0MILGtSUSkmqOawsEpqap7B5BWY8j/s/gY1VwafBDpQGb3EOKlWYFhtMSdfXfJxbNqBhLG4allYlRKRjf17i4npbLjWOHsaAwC9h+7ITNI04bupmTkcXSzSK6bK250LTDwMBXqyrX07Kaiy5DdFOfsRocr11QNftg2saqpYet7kJ+6TezW7IS12fae1da7A1vPtmZmhTFXWx963Itw4YiDGYmLqthOOf/CSiyb+ZHk3WxPOwYC+do6XhUTj22q4Girp6OATWVp7QjyivhuB/qzCi3et2e4U+Xn6edYS2SruaiN9Zh9yk0KU8+xbiEfA8CMHUoYYbk9uN0P9BPuaqcRays4lBFnYiDacrBgd+KgFu5ir7sMUSihVh/PsKvUS2RVVwDBli2hf4p0CXfs6ligqOx/Xl4Etpxpz8AAQnb6mdVj0HoaSRElWkzNzHqiduiO9JdCAjk3CpmRkPwG0nYtDaDgqQwAAAAASUVORK5CYII=";

	var img_full="iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOiSURBVHic7dpPaBxlGMfxz9oiVKWelJb0EEF6EK+WyguC7cGTByFISFsEL3qwtVDqSSGiUGxrgzXqRYVein+KKCIeKtaDrxQheNEUrKKCUls8eLGC2XQ9vLvbTTRmJuzMu5L5wrI7z77vzO/57cy+zzvvtDqdz61nbsgtIDeNAbkF5KYxILeA3DQG5BaQm8aA3AJy0xiQW0Bu1r0BG9Nb+AGdbqzzH5+vYJL4S30SyxDG8BZuR6sbbK38Od7RNcB4gb1fwkOjmzxJW3gMn2BrkR5lLoEZ4vyadNVKnMdM0dZlDDhCmCgvqG7CBI4UbV3GgA04TdhRWlNthB04LWktRNlR4AzmSvapkzlJY2HKGPA29hEXS0mqlbiIfZLWQhQ14F3sHe3ke8RF7JU0r8pyA35De1nsPUwRl8dHmNjGlKR9kLaUY59BAy7jPuxB75d+Xyp8/kfJ94htTEo5kHLaI+V4udeqVwhdwW7iBVwgbMBE2kFcqE3z0IkLhIel6vAM8Z0UD7vxKbTSukC4m/h1Lpl5SDm3ql0YCffgLmzCm8S/Cvbbjl04RfyzG5vEr8TPhqmwwtlgeANfYhqP48YSne/Fa7h1IDaNR4Ykrs/G1ZushbAVj+IZ4vPVHGM4VHUGjHXfv6ho/0OjAgPCqzjX3fiA8Hv3ckD4hnDsX/rMEU4OX8vqVHEJvCjV5K/jKXzlevGxWfpDXM5m3FSBllWpwID4PeG27sY88fzwjzE81v09wcaAmo+3gJuXhsImbKlZR5+6DfhJmowM8iBuqVlHn4oKoRX5GC8QnsMpPIAD+KNmHX3qPgNewUd4GhfxrGTApZp19Kl4MrQSYYs09l8kdlZrXSW96fA24s85hdRPyrl3CZxLgf6XuwgnsuiqhHAi5dTf3qZbrvfOgA6+w/3Yjg+l0nSWuL9uucMlvIwncFUacb6Vkr+T2Bo0AH6UFhYH6/KTxCfrEzxMwkvSn2yPq9Ltv/G0GVvLR4Fx/5yUHCAUXmsbHcKMpcmTchsfDBQdBg8Sjg9BVU2E4zhYpGWZOuAQ4ejaBNVJOIpDRVuXLYQOE3aW7FMjYScOl+lR1oD9oz2/j+dRatQqY8A0cbaUnizEWekOciHKGDDVfQZnxAlj0rpgIQYN6D0QdU1aR1uUFhMXuq9xnB1tE8IYzkpae7rbrudzzdIHv3JNhkaH5pZYbgG5aQzILSA3jQG5BeSmMSC3gNw0BuQWkJvGgNwCcvM3ZlvTT5VNdwsAAAAASUVORK5CYII=";

	var img_fit="iVBORw0KGgoAAAANSUhEUgAAAD4AAAAmCAYAAACcRCiyAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARjSURBVGiB7dpbiJVVFAfw39HRhmSULpSZSBqlSRffEraKUKAQ5HP0UHTHCsQyDKmmoEQziiK8gN0oBIMICrs8TdKOLEEfQso0Kx0lgkihmjF1etjfmfnmc+acM+c2L/1hw/r2rG/v9d97feusvfaUBga+1D6Ef3ABBrImJ2ctdrbDko52TJJDKdfGFRPG24DxQot3PHRjYa5jUg3v7Mz0erGaeLoVlpVa+42HafgMN4/xxV+wlPhzsy0qo8WuHk9iGfaM4aVftZg0bfnGx0S+LaSpydXDHMzCT1JMqFe+CDtw3SgTHcedmXwInZhZh3yQeLwa8Ynd3fdUIj0Ze7EAv2MeHq1TnoNr0Y9LChP14ylcjpXZIiyoU/6XWXdw9PNKxKvseOjEn81NKs4LeMck9z7cpPHn4UPivEpaLY7qo2GQ/JWaShpCFxYTd1XSKgS3sKjw3Enoa55RZQwGvCXNJQ26cMv53SHkn4pRfR3hiSYbkp+8izA9ix1n8HcLJpmK2wrzrsLT+Z4i8RI2DJGPfc35vsNiwmGcwgkEPC4lKnm9awiXNThZlvENjrkKL0sLPYjRUtYNhAG8pjnBbVsax2IcxW9SlP+moLcX24cbPmaUXX1XjjTMJqzN5DMdhM2GTkvzcwNsxMQGDMgQJmMu1hLzkXR71pqNzNXDUUOkSfnD+kzu78BDFQZZL7lknQjLsEJa2OWEGfiD+Fz2t1uJawiT8KKUhCwlvJINsIe4Y4yT9uILw0kXUZpgqCAwGjYR6nW9DqnwUJY7c88LpeSmjE5pgSZmcqeaTnPnYTUeqKJTKg0MDJxVW86+mlhpFUdBmIqTWEncnOt/Bk8Ojx/hJLYT61zoYd90JZypZcfL2ESYX11tvBDm46UalWtydTiH+4gH6rar5YgHcL/a+NRM/F7imw3Z1RbEN6TDTjVUJX4OdxPfatyomnAWkxsc49WsVeJV6qigcE6KjlvxdoPG1IoTuLHBMbqkLO1ByfZyjnIEOzN5oEMiN0n6GXk4mzjbae/j9QYNGQvew/OEXvyIXcSNYxwjS2DiY4QStkjkDxLLmZsO4jtD74QVuB53Ed/NOhtNV/vxLL4t9PdIrp1DfIHwlVRUmIYf6pgvl6vHbRn5zUWlYq4+wTDSzShExH50j/CHfVKNrajfIy1Kvcjl6hC3ZuRvzysVE5c1uZ1uIcJUqRCxm3B1kwcf4Vgat2BdvqdAPH5XeO6TXK6JCF34VEpZZ6KnyeSPSbGqgLgv/1RLze0UZkiFw0vxZQPyfnwkxZE8eqXDUJ90wLgBF9cpL8Iy4iMViFW9QjorfSvTsTwz+FCd8gJcMQJpUu1tG77GAclV59YpF8pnI6NNxcYwBZ9IhYhKKF8oHGm1RW24SQlTJK+pRpp0+dBDuKqVFtFy4uFCfIwlY3ipLeRbveOr8Bc+kGpu1bBb+pn7HmuzslVL0MYLhbAfN1VRmt2OC0P+/4+ItqAfpw2dlkojtFqrQQ3jP6vOSbtGtn74AAAAAElFTkSuQmCC";

	var img_exact="iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAUgSURBVHic7dlbiFVVGAfw36SkRRejLCna2YUg0KB6SFjd7B4WUT2EUVnShaYIehGsqLELRXSl+8Wi6GJC9FBQBIZlO+ol0SiKLLWTYXnJrImgcnpY68zsOZ5xzlZntjrnD5t99rr+v/9Z+1vf+nZHT88nRjJ2q5pA1WgLUDWBqtEWoGoCVaMtQNUEqkZbgKoJVI22AFUTqBptAbZcHSY0PI8nnD90dLYV4fzIsV/ZhOZtI7YgQLgXSwmT0/N4LMCkbeI4tJiEBX0ihMmiDfcO1GEAAcLduBXJ6HB6vJu8XekODSbrz3k8bk02bYbRmxeFLtxeKKj/8zsTkgj9cDvhP/KuYmHDCgh34M6hZFYx7kw29qIgQLgNc4aZUBWYk2xFrwBhNu6piFAVuCfZ3LsC9inRuWf786kE+9ArQD4b97fYsWNo+Awr7k8293OCD2B1NXyGFatFW9HnA8bjQ2wxatpFMAEf1oOlehxwET5OV4e+Zd7s9+Jho1oei/GM6Kfqvmqg3xfhuY72h5FdAuEywvSt6dkkFN4pcZ24tN8o23EbBAgHYD35pq0fA8IYjMOv5IPEGGEM9sXabZ83ouQrEPYkPElYjzX4g/AKYVyqH01YQPiSUAiuwgTCD4T5hbKZhG/wt7g1daex9m8y77Q4pm78go19R9ywCCfFK2xI1zutWlRCgNCB93AhHsZx4sHpDLwV2+T/issxwwup3254FWNxU2HAcWmc43EsujANzzbMeyXexVc4FUfjCvyeGnRiabrOTdesVq0qsQuE6Xgd08nnFcqvxos4mTwNFi7FvERuP9yFM8kXDjJHlyjqgeRrCGNRw1LyM7bQbyF6yKe2aEwvyviAU/AX1hFOK5Svj5ObhCRA/iZhKh7BKMxpbnw4EWfjEHGFHJAqjhJfsaNT2YsleJZCGQEOS+2fb1L3I8Y0lD2B68X39tHNu4SHcTOW4GssF/0B0dHBoem+sgTPUigjwCr8Rj5x8KZhd7yMZTgYj+OqQv3BuAVPk3cWys8RRavj53Q/pATPUiizC3yOgxqW/0B4EMeI4WYnZhCuKNRPTPcPGvpd0PD8rejsBgtyfo/cymNUV9fMFptmS0SCM8h+IltNtgfZcWSzyL6nto5wMR5CJ/n71JaQTcQssrdim+wPcfkfTraY7F+y63AD9sRr1JZR+4esG7eQ7Uf2XWp7Atl51L5I3I7BxWRryHYn24va2lasKrEC8v9wFt7HK1iLdVgkbmN/EiZiLuaRv1DofKP4Hs+Pnj3fgGtTv8X4VfyXi6ukPu/jSZgZ4iu1Mc1ZTM8/hrfF3SbHU61atZWHoTAaR4oCriLfuBWDIOyBI9IYGwZp2yE64r1RG7x9a0gChMvE4KUVLCT/bHtMvv0RpojBUivH4VXk8+u7wKe4W/w3BsNs7KACOA33tdBuhRjB9uYEV4iBzkhIif2Ck8h/oL8TvMTISIkdJNqKvpxgp+hJRwoeSzb3roAyX3x3le8Ck+gT4EbNY/xm2BW+Czwv2tzrBHvEGHxuZZSGD3NxfT37VHCCeY8Ynb1UCa3hwUu4tph6awiF8x5cI57k6ujG5fqOpDuDD1gpcu4ulL2Maxrzjk3OAvkmzBTTWH9hGvlrmCpmZ3Z0H1DD1MR5mmjDq5jZLJE6wGEo3yQePqaQf5TKlusTYUdF3fjl8TH/CFMwY6AscvvLUNUEqkZbgKoJVI22AFUTqBptAaomUDXaAlRNoGq0BaiaQNUY8QL8D/pkSIQH4MnQAAAAAElFTkSuQmCC";

	var img_dummy=img_zoomin;
	
  var return_false=function(){return false};

	var fsCancel=document.CancelFullScreen||document.webkitCancelFullScreen||document.mozCancelFullScreen;
	var fsEnabled=!!fsCancel;
	var fsCurrent=false;
	var fsSet=false;

	var getMouseXY=function(container,event){
		var data=container.data('zooomy');
		var offset = data.touchpad.object.offset(); 
		return {x:event.pageX - offset.left,y:event.pageY - offset.top};
	}
	var getButtonForMouseEvent=function(container,event){
		var data=container.data('zooomy');
		var offset = data.cp.object.offset(); 
		var x=event.pageX - offset.left,y=event.pageY - offset.top;
		var cp=data.cp;
		var ret=false;
		for (var i=0;i<cp.buttons.length;i++){
			var b=cp.buttons[i].set;
			var p=b.position();
			if (x>p.left && x<p.left+b.width() && y>p.top && y<p.top+b.height()) return cp.buttons[i];
		}
		return ret;
	}

	var getButtonSet=function(panel,base64,cx,cy,mousedown,mouseup,dblclick){
		var btn=$('<div style="position:absolute"></div>');
		panel.append(btn);
		var img=new Image();
		img.onload=function(){
			var w=img.width;
			var h=img.height;
			btn.css('left',Math.floor(cx-w/2)+'px');
			btn.css('top',Math.floor(cy-h/2)+'px');
			btn.css('width',w+'px');
			btn.css('height',h+'px');
			btn.css('background-image','url('+img.src+')');
		};
		img.src='data:image/png;base64,'+base64;


		if (!mousedown)
			mousedown=return_false;
		if (!mouseup)
			mouseup=return_false;
		if (!dblclick)
			dblclick=return_false;
		return {set:btn,mousedown:mousedown,mouseup:mouseup,dblclick:dblclick};
	}
	var startMove=function(container,event){
		var data=container.data('zooomy');
		data['move']=getMouseXY(container,event);
	}
	var zoominDown=function(container){
		showCP(container);
		var data=container.data('zooomy');
		data.zoom=1;
	}
	var zoominUp=function(container){
		var data=container.data('zooomy');
		if (data.zoom==1) {
			scaleImage(container,1);
		}
		resetCPTimer(container);
	}
	var zoomoutDown=function(container){
		showCP(container);
		var data=container.data('zooomy');
		if (data.image.height<=data.minHeight||data.image.width<=data.minWidth) return;
		data.zoom=-1;
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


		var cx=image.left+image.width/2
		var cy=image.top+image.height/2

		var h=origin.height/s;
		var w=origin.width/s;
		if (h<data.minHeight||w<data.minWidth) return;

		data.scale=s;
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
		var cp_layer=$('<div style="position:absolute;left:50%;margin-left:-250px;bottom:0;height:80px;width:500px;background-image:url(data:image/png;base64,'+img_panel+')"></div>');

		box.object.append(cp_layer);

		var arcl=cp_layer.width();
		var buttonsn=5;
		if (!fsEnabled) buttonsn=buttonsn-1;

		var buttons=[];
	  var ch=box.height;
		var bh=80;//buttons top
		var bw=80;//buttons width
		var bx=[];for (var i=0;i<buttonsn;i++) bx.push({});
			
		var cx=(arcl-buttonsn*bw)/2+bw/2;
		var cy=bh/2;

		buttons.push(getButtonSet(cp_layer,img_zoomin,cx,cy,function(){zoominDown(container)},function(){zoominUp(container)}));
		cx+=bw;


		buttons.push(getButtonSet(cp_layer,img_fit,cx,cy,function(){fitImage(container) }));
		cx+=bw;

		buttons.push(getButtonSet(cp_layer,img_exact,cx,cy,function(){ fullImage(container); }));
		cx+=bw;

		if (fsEnabled){
			buttons.push(getButtonSet(cp_layer,img_full,cx,cy,function(){fullScreen(container)}));
			cx+=bw;
		}

		buttons.push(getButtonSet(cp_layer,img_zoomout,cx,cy,function(){zoomoutDown(container)},function(){zoomoutUp(container)}));
		cx+=bw;

		data.cp={object:cp_layer,timer:false,status:0,buttons:buttons,disabled:false};
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

		touchpad.dblclick(function(e){
			var b=getButtonForMouseEvent(container,e);
			if (b)
				b.dblclick(e);
			else {
				var data=container.data('zooomy');
				if (data.image.height==data.minHeight && data.image.width==data.minWidth){
					fullImage(container);
				}else{
					fitImage(container);
				}
			}
			e.preventDefault();
			e.isPropagationStopped();
		});
		touchpad.mousedown(function (e) {
			var b=getButtonForMouseEvent(container,e);
			if (b) b.mousedown(e);
			else{
				startMove(container,e);
			}
			e.preventDefault();
			e.isPropagationStopped();
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
			e.preventDefault();
			e.isPropagationStopped();
		});
		touchpad.mouseout(function (e) {
			var data=container.data('zooomy');
			data.move=false;
			data.zoom=0;
			data.cp.disabled=false;
			hideCP(container);
			e.preventDefault();
			e.isPropagationStopped();
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
			e.preventDefault();
			e.isPropagationStopped();
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
			data.minHeight=h;
			data.minWidth=w;
	}

	var moveImage=function(container,xy){
		var data=container.data('zooomy');
		var box=data.box;
		var image=data.image;
		var holder=image.holder;
		var origin=data.origin;
		var settings=data.settings;
		var move=data.move;

		var x_offset=xy.x-move.x;
		var y_offset=xy.y-move.y;
		move.x=xy.x;
		move.y=xy.y;

		var left=image.left+x_offset;
		var top=image.top+y_offset;

		var max_left=box.width-image.width;
		if (max_left<0) max_left=0;

		var min_left=0;
		if (image.width>box.width) min_left=box.width-image.width;

		if (x_offset>0 && left>max_left)
			left=max_left;
		else
			if (x_offset<0 && left<min_left) left=min_left;

		var max_top=box.height-image.height;
		if (max_top<0) max_top=0;

		var min_top=0;
		if (image.height>box.height) min_top=box.height-image.height;

		if (y_offset>0 && top>max_top)
			top=max_top;
		else
			if (y_offset<0 && top<min_top) top=min_top;

		image.left=left;
		image.top=top;

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
		var panel=cp.object;


		if (cp.timer){
			clearTimeout(cp.timer);
			cp.timer=false;
		};
		if (data.cp.disabled) return;
// status 1 handled
    if (cp.status==1) return;
// staus 3 handled
    if (cp.status==3){
			panel.stop(true);
			cp.status=0;
		}
// status 2 handled
		if (cp.status==2){
			resetCPTimer(container);
		}else {
// status 0
			var settings=data.settings;
			cp.status=1;
			panel.fadeTo(settings.cpShowDuration,1,function(){
				cp.status=2;
				resetCPTimer(container);
			});
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
		if (duration==0){
			cp.object.fadeOut(duration);
			cp.status=0;
		}else{
			if (cp.status!=3){
				cp.status=3;
				cp.object.fadeOut(duration,function(){
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
		var panel=data.cp.object;
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
			useBackground: true,
			cpHeight: 'auto',
			cpShowDuration:300,
			cpHideDuration:1000,
			cpHideTimeout:2000,
			zoomingSpeed:10
    }, options );
		var j=this;
		return traverseContainers(j,settings);
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
	fsSet=!fsSet;	
	if (!document.mozCancelFullScreen){;
		var data=container.data('zooomy');
		if (fsSet){
			data.box.width_bak=container.width();
			data.box.height_bak=container.height();
			container.width($(document).width());
			container.height($(document).height());
		}else{
			container.height(data.box.height_bak);
			container.width(data.box.width_bak);
		}
	}
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
