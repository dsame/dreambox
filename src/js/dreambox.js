(function ( $ ) {
	var img_panel="iVBORw0KGgoAAAANSUhEUgAAAfQAAABQCAYAAADvLIfGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASiSURBVHic7d3bVhxFFAbgf4MhMRgNigaJCRhIwIfyvXxEL3wHvJgJOQ0z04cauuH7blgMRfVeay7+tau7q+rm5iYtVdVZkr+bXuT+1X0XwGC+w3nz/c3fQ/8O/7m5ufm35QW+azn50vWOrgMAU3WdpGmg77WcfOl6B9cAgClrnoVNA72qTpIctbwGAMzASVW9bHmB1h267hwAFppmokAHgN2YZ6AvlxZOWs0PADPztqqet5q8ZYeuOweAT/aSfGg5eSt/NZwbAOaoWbPbJNCXSwpvWswNADN2UVVPWkzcqkO/ajg3AMzVkyTvWkzcKnTdPweA1Zpk5OiBXlUHSS7GnhcAHoirqho9f1t06JexdzsA3KXJc2YtAt1yOwCsN3pWjhroVbWfhu/YAcADMe1AT3KW5NnIcwLAQ3NUVa/GnHDsQLeZDABsZ9QufbRAr6rK4v1zAGCzaQZ6ktMkP444HwA8ZL9X1U9jTTZmoHu6HQC6GS07xwx0988BoJtpBXpVHSc5HmMuAHhEzqrq+zEmGqtDt9wOAN2Ndka6QAeA+zVKhg4O9Kp6keT1CLUAwGN0UVWDz0AZo0O/TlIjzAMAj9Eop5SOFegAQH+Ds3RQoFfVsyTnQ4sAgEfuw3LH1d6Gdujvk+wPnAMAHrvDJG+HTDA00G0mAwDjGHQeSu9AXz6Rdznk4gDArUH30Yd06O+yeDIPABju56r6re8/Dwl0T7cDwLh6Z2uvQHf2OQA0sdtAz+JJvMO+FwUAVjrte0Z630C33A4AbfRaARfoADAtvTK2c6BX1askR30uBgBsdL7cibWTPh26zWQAoJ1eZ6T3CXTL7QDQVues7RToVfUyyUnXiwAAnVx2PSO9a4euOweA9g6y2JF1a10D3f1zANiNTk301oFeVc+TvOlcDgDQx1WXM9K7dOhXHccDAP0dpkMj3SWg3T8HgN3aOnu3CvSqOkhy0bscAKCPcQM9yWWSTo/PAwCDbX1G+raBbrkdAO7HVhm8MdCraj89tqADAEax1elr23ToZ0k6bxIPAIzitKp+3DRom0C3mQwA3J/KFl362kBfvtDe66B1AGA0G++jb+rQT5NsbPMBgKY2npG+KdA93Q4A928/yft1AzYFuvvnADANa5vsOwO9qo6THI9eDgDQx9oz0td16JbbAWA6nib5864/CnQAmI87s3lloFfViySvm5UDAPRx5xnpd3Xo11m8yA4ATMcPSf5Y9Yd1gQ4ATM/KjP4m0Jcvrp+3rgYA6GW7QM/ixfX9trUAAD39UlW/fv3hqkC3mQwATNs3XfoXgb58Yf1yZ+UAAH2sD/Qk75Ic7KYWAKCn0+Ur5re+DnRPtwPA9FW+yuzbQHf2OQDMyupAT/I2yeFuawEAejqvqqcff/k80C23A8B8fHFGukAHgPm6ze69JKmqV0mO7q0cAKCP91W1n3zq0G0mAwDzc3tG+sdAt9wOAPN0nSR7VfUyyck9FwMA9HNVVbUX3TkAzNmLJK/34v45AMzddSW5yGILuXz283OrPusyduj/T2GsurqNnWpdXcaqq9vYqdbVZay6uo2dal1dxj6kuv77HymZI/T7UCcoAAAAAElFTkSuQmCC";
// all buttons must be withing 100x100 area
	var img_zoomin="iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAEH0lEQVR4nOWbPU4jQRCFuQFH2CM44ABcwNLGjsgcshIHgAtY2tgRkeOVOABcAMkpGRGxJV9gtj+LRuWieqbbbbt6dp/UEggYz6uun1fVzcVFIS4DrgMeAn4HvAQ8BvD9zwB+XvrM5gHhPwFdBjDGjwDvd67GZDJ5eH5+fs8hLbEJwBO83/9QTO7v74tJa4zOACFsb4LnbmqJAzwgeM/Em1MurtfrdZLMx8dHt1qturu7u24+n+8WXy+Xy+7t7S1pgDEkwsvUjkM6JPTu6uqqd2GM19fXb38fDLr2JteL29vbR4t4qGZdSPaDxOV6enr69hzKoTdHE5Sm4J0m8RLScmkPeA/w5mmC2qyJE8OlOy4Xf7vdbvee2VzyY9ctdyd+DyUe12w205704s13D8SiJk7M1hKPSz8eWezN+Qtro7ZRvo5F3kqANwHevHewXP6YxOOSOqAJ8UPDoomTpU9BXidAsr+r+DkneRZJVIJO8b8hz1osFnuf5yZ+cDtNHtc8JXkrAbp1f8SeNgD1+ZTkcTidAF0GIKeu86mFgWUCpOSePQHygRtD2Od0cbULPSGBzD4reUDMafKAPv2UO0/2p3mS+BVwdgOguiwDEAI1DY5ceJMma8FFAFndHajt8Njl1KTHgpv+TxmA5HRIFTDy6dfz0BQsJkUSrt2fVQHiC5c0PVrRAcLIMiL5RcIl+UVQdzGC1fWh0oaIEyZyR3M8R4sfl+SnQQLS5XBIC8idLAkZPf5qYvaPAbQX8KKpRCh3vaRkWurPvf0FCKIXVat4Ub2renxVWim0+nNvfyV0RdBuLTu3Q7tEnSybmv+RjDqFKIllvNeoRN3+NjX/IxnpRMhx1rHIWxWgmfkfsCqBjNdj9AdaHTaRACNIRpYe+IzVavJ6/tfc4Scvk7q9QSjUGkBXkCYPP0lKKQ+o7Q616naVwCmk2mNidzqdVhkAL5JoKgFG0BswHR7SBLkLo1H6SKDNH4BKWF1i7pgM0taFB4mm6r8F3NPSBENJTu+yhWb0fx8sTZBqjthxTZzfxe1Z2htcpr+lsDSB1RxJZZcaouhoakr/98FKhPJChETf9Ejr/ybLn4VUcyQ7OuYCQ0mxaf3fB6s5klo+tyXW+p8y680tCyRC68wwGiJX/8vp0SgqQERfc5QripqeAOXAOjcoUYV6AjSKEihhJUJdDUoSIAYYTRIExKvVIfbJYryjTwqPpgxGWKrQmg7lSuHm+wCNoUMT66prH0YVAsCqBrEvsG559wFDevMpRurQJAXyA3eujPzZeXM5GKljdAmGSeFXd8u6EOHNoQqpY3SAbS4+iafs5P3+1UjNCqmQXDNKXYEZZcxbsCrBEJr9l5dDUGKAJuf9tUiFgCY+Kp1fgj4D4Or/LPGIeJeIozOkLE2SRfovBkJCGdumNU0AAAAASUVORK5CYII="

	var img_zoomout="iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEUElEQVR4nN2bMU5cQQyG9wYcITVVCiqqXAAp3UrbkA6JKhIX4AJoU28VCYk6EheIRI2Uli4VdSQu8OIPMdLgtefNm100fvtLFuwCj7HHY//2eBcLA18F14Lfgl+C74IjgfW7B4Uvgr+CwQDvfxb0XuOH4ZvAUjzHH8FBegIuP6Z8boTe690r2NF/gloDAOJD73XvDTWuf9BeQJS3lHx6ehrOzs6Gk5OTYbPZbP0cw/Ve+15AqrMMcHV19ap8El6/vLwc3lHwDHBzc/POAMhqtdoywk9Bbx12AiTHMgCKorA2glCF1+OhY8Ks0yMKWEZ4fn5+VdgygnYcnnH9BtJqb50mgd3zjPD4+LhlgCTaE3LMjjmyWI8P3N/fj3qABZ43q6PBYn8ICIzaI8Sz3RhQwqzjgzbCxcXFcHd3V618Alyjty5NYOfy6lCnwATiBB6CgfhqeQiVZm99mlCKDUDHhyS8n4NnzCoo5ihVi1aaTAKZ0pgthbaKplKKLFFoAm1vfZrQYoAShZ5ddrDaZQS+GiMcBIW2jgE7W4oDYwRqdowR19VGYGdrDFDKELNKk1bd4KVDSzg2FleAgRIgwxvDK54SXS5lBCrMGmCM8EeDmJAbwushWG5fA45GeN6gu8pWD8FSnvfwiGQw+o+8tn43PG/AVfMF5/yAY6F/lpqtpRiheQOe9knQW1cXOkVSNaJMrggpsDZQWrwhfLbQKTLP+VP4Qi5W+U0fs7euLrzWWvKIFuEY6SNBjyEki/Su2mopc6mesKh0yFSpgyLYRfkSlcbYIbvQOijuwwBJrD5DyFT5UQbwUiXsMVRcyMvnMZrcIvAJHRdCVZd5WmxNgzVxwWKPISg0zC3PCLUdpCkeQDzguVbHmlTZ3Rt0MLRunacICYZHonQtuscGPYThVYxjcnp6Ojw8PFQrnqNrW15fsBC4psQDdv3y8nKYOMq0BdbQzRMoYvLF1FLj4+Pj4fb2difFc3RtxF6r2liP4Vg7X3sXiYORdPgX3OMw9yHcaLDmPrtOtegOUqk3oHsJFqDGOJc82hVrEK5bRalTo9dRXi6XRcV5BDtdUjwXq4boYgCg7xoZw9MGKDVPcSI5xtXKI5Y3dS2iKF7yxeTlcsn1W5RfOAboOuanW+s5VfZ2v1X5hWMACFIX5RP07AHsjszggaxgKVcjxoVWfwMATZW9KRR2cNGoPGKRqDCjO9Z9o0ar6yPefEeYUd/SnOLbTu20+95IX6hWmtVHTOCULBqVdyaBY84wenPLY0zPE2zqFVBhh7yto9BigJLyIOw1myZILQYYUz5kBznBigVTUuBYASXVYbyzr6E7SJS0NRWf85HHdxD7xr1XTPDSIm+xwyiL8D22qu0Uyd/EID41GBvRnQIec35+zifdYru+Rokb1IJjIY+JmfJq0PK5xoT1ek0TNA7bawWe4H2o2wIkR9L8/BXXgLujnDYGr8kceMvEFHf0H+obvL54q6P7AAAAAElFTkSuQmCC";

	var img_move="iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAEtUlEQVR4nN2bPW4VMRSF2QFLYAksgRVEtOko0oc6FU16+jR0aVH6SJQpkdJHtOkosgCYT8pF1nDOtec92xM4kpXkvfnxsc/98bXz6tULwetn7N2Pafi04MeCX8/g9w8L9u7XMDC73xf8MviyYO8+DsHnBY504L+c+Rpp8G3B3v3sincLWoj/XLB3X6tAll8XfHsGNgpBde0xxPEN757xdsF4ZgZ0BKJb7BRPvr7u8fFR3l/ep/wC795lAFqc1Do+K+J3d3cpcRTkno8ypuYAbxbUSAOIlvepwbq+vrbEW0yDZ04j3mqrxOvyPmUal5eXlniZ4DhMjQCtxAHqiPuQ5vr7i4sLeR8+ouX5L4L409PTX599XMA92KK6R7kKZjrL7nYj3mrjQcINFh5dzbhShgOhdBpxoDpxc3MjO0fYYebXn9/f31upK3D9GmsHOhzKUSHbh4cH2TkVyvDorcRvb29lzH+/YCpxF5pUeGKQkOT686urq2bizvtPT2KU182kqxTCtZBvgXpu+I+pUM4Kr35yctJEJMi4BKYE5qNmXHl0oke5fsDEypDaBaqTp6enNg09lDj2ra5bZ23IXiU9RAm3cDoIKtZula+LBCXOzs4k8dKjM6tZGOya1yuHRQfPz8+biGMWKkSVQObuunIFmK0UA5FMHQ0VopAlHVVZ3CHEGUj3vJBvtoIr0S3ZUQ4uZogByADhFuKoxymIPrTm9F2Ju9QVQrXleigjI07C4p6FtLeQBt2kDpRDIfTg3TNApkYcx+fU07qICXQvWigHFx3OwhqemmuycIbEuUalwVvRdbaBy+DosMvi4nuaS0UjGdqSEDkMWbqSNKiXRafXMoUQAxLfO2LhA9zAtAKJy8yNDwlLjErYKz/5m8yoJeNRL8TGgxj2jKRJbMrPo6mEp8UUAjhBV62VEm+plILahp7L4NYEs8bM4hOY6fLeWrgDLmeQElfJRw0QVJ7Rrby2EHctI47TczNtvXhLBdORn0ncEUMZmbe3BYpDSAfWsh9JHBMopczv2H1mpelua5YAMJI83I02agkZueppOKcejWfhACEbz1WzjbyrFZlauseD8cAunDBwvMStinqRVs3NdnOSQqjKbD0WHG7mHSIGj2rK4W3eWkaqKu0MILGtSUSkmqOawsEpqap7B5BWY8j/s/gY1VwafBDpQGb3EOKlWYFhtMSdfXfJxbNqBhLG4allYlRKRjf17i4npbLjWOHsaAwC9h+7ITNI04bupmTkcXSzSK6bK250LTDwMBXqyrX07Kaiy5DdFOfsRocr11QNftg2saqpYet7kJ+6TezW7IS12fae1da7A1vPtmZmhTFXWx963Itw4YiDGYmLqthOOf/CSiyb+ZHk3WxPOwYC+do6XhUTj22q4Girp6OATWVp7QjyivhuB/qzCi3et2e4U+Xn6edYS2SruaiN9Zh9yk0KU8+xbiEfA8CMHUoYYbk9uN0P9BPuaqcRays4lBFnYiDacrBgd+KgFu5ir7sMUSihVh/PsKvUS2RVVwDBli2hf4p0CXfs6ligqOx/Xl4Etpxpz8AAQnb6mdVj0HoaSRElWkzNzHqiduiO9JdCAjk3CpmRkPwG0nYtDaDgqQwAAAAASUVORK5CYII=";

	var img_screen="iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAC0WlDQ1BJQ0MgUHJvZmlsZQAAKJGNlM9LFGEYx7+zjRgoQWBme4ihQ0ioTBZlROWuv9i0bVl/lBLE7Oy7u5Ozs9PM7JoiEV46ZtE9Kg8e+gM8eOiUl8LALALpblFEgpeS7Xlnxt0R7ccLM/N5nx/f53nf4X2BGlkxTT0kAXnDsZJ9Uen66JhU+xEhHEEdwqhTVNuMJBIDoMFjsWtsvofAvyute/v/OurStpoHhP1A6Eea2Sqw7xfZC1lqBBC5XsOEYzrE9zhbnv0x55TH8659KNlFvEh8QDUtHv+auEPNKWmgRiRuyQZiUgHO60XV7+cgPfXMGB6k73Hq6S6ze3wWZtJKdz9xG/HnNOvu4ZrE8xmtN0bcTM9axuod9lg4oTmxIY9DI4YeH/C5yUjFr/qaoulEk9v6dmmwZ9t+S7mcIA4TJ8cL/TymkXI7p3JD1zwW9KlcV9znd1Yxyeseo5g5U3f/F/UWeoVR6GDQYNDbgIQk+hBFK0xYKCBDHo0iNLIyN8YitjG+Z6SORIAl8q9TzrqbcxtFyuZZI4jGMdNSUZDkD/JXeVV+Ks/JX2bDxeaqZ8a6qanLD76TLq+8ret7/Z48fZXqRsirI0vWfGVNdqDTQHcZYzZcVeI12P34ZmCVLFCpFSlXadytVHJ9Nr0jgWp/2j2KXZpebKrWWhUXbqzUL03v2KvCrlWxyqp2zqtxwXwmHhVPijGxQzwHSbwkdooXxW6anRcHKhnDpKJhwlWyoVCWgUnymjv+mRcL76y5o6GPGczSVImf/4RVyGg6CxzRf7j/c/B7xaOxIvDCBg6frto2ku4dIjQuV23OFeDCN7oP3lZtzXQeDj0BFs6oRavkSwvCG4pmdxw+6SqYk5aWzTlSuyyflSJ0JTEpZqhtLZKi65LrsiWL2cwqsXQb7Mypdk+lnnal5lO5vEHnr/YRsPWwXP75rFzeek49rAEv9d/AvP1FThgxSQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAZVJREFUeJztmzFuwjAUQB3E3shHYKMSqoSylymXQLmBh3ZhzQG8ZChHyAUYGaDdEVKVnSNE6QVwlwo1HZK0BT9Q/pM8BCXo5UWxB0zgnFN9ZkAL0EgAWoBGAtACNBKAFqCRALQAzVAppUaj0UMYhmHXi/b7/dvllJqZTqeP5/ieqqqqw+HwrowxqXPu2MdhjEkHcRzPzlH0FonjeDb8/sFut1NlWVI+XtBaqyiKTse1AIvFQhVF4V3KJ5PJRG02m9Nx71cBCUAL0EgAWoBGAtACNBKAFqCRALQAjQSgBWgkAC1AIwFoARoJQAvQSABagEYC0AI0EoAWoJEAtACNBKAFaGq/Do/vx5SHN37eYy3A8mXpVeYakFfAWpvREhTW2izo+/8Fhm0naK3v5vP5061tplqv1695nmdlWX40nuicaxyr1WpLb2f76/hyb7y/Lq/A8WyPhaFxou/9KtAaIEmSZx8il6CLe6dV4Ld7ia+B017gFgJjTOpD6FoJnHO3Psn9C5kEaQEaCUAL0EgAWoBGAtACNJ/KcTMjPWavcgAAAABJRU5ErkJggg==";
	var img_full="iVBORw0KGgoAAAANSUhEUgAAAD8AAAA+CAYAAACcA8N6AAADBElEQVR4nO2bMW7jMBBFc4M9Qo6QwgfYCxjY2lU6twF8gVzAwNautvIFfAFdwMC27lK5XsAXcPiCMBjMUiIpStFI4AeE2ElEzyNnhkOKfnjI0A+nnxE9OuW0OaZitmY19up0j4j/GYklWzFbsxqbEzxeOij8Hyd/4+VyuZ/P54/rer2ag8etvU232+3LVuzuBf/Xyd+43W7vq9Xq4zocDubgX5y8TU3TfNmK3dnw2o3oWMvw0kuxrwj+2cnfhJv7xqzC/3MKeWkv+Abf+dTxeDQN/8tJxru0NRteJg+02WxMw8vcdDqd+sMT67IxMqZszBq8THRovV73h5eJIzTqluBlXgqFZzI8ZaqMcySzpiV4vFMXYCRlOSMF4YHkRpIEPcdr6eZtsTMVPDbi2tjLZ+GZMrMjklzIQ/+D18kspC7wXHhG6beT7mDe8/vYwkh7oxYj3gaeBU9yk3NkKTzgb05dxjOKT0658Iw2doRcPQmeXqMBwkdnySHgUxZGiA5Kgccj+eyUAYrCh6axIeFlbMpR4qfuF2I6Bp8DPSm8XmWF2mEkY+3MEr5tlSUvOfpALgZexntbvSANq/DfCc8uB3+MXVbg9/t91NbO2j6lyNGyAp8i/VmTw7dVjLIdytbR4ammmgSVwuupLlSJyY1QZodQO5TAMVtlFdkJn6pSeCSLHL+jyrKTvpXgqOThR1eITQav19ttYnT7gpuF9x3QtbgpBTcN70WuIQ/4tTmvWfX1JhYyDz+mKnyFr/AVvsJX+Ao/LbwvcF4/RaEz1GEms/D8XT9hkVpseaufoI7VAebgqdv1kpalLPeyrJUHhdCilrT6tETfzYxZwg+1jTVLeHnIgV3XEHzKBuYs4VP22yv8EuFT3H632y0TXhoUOiik2ymZ683By6lOn+D0l5zrFzXV6bO7jL4/O8OcTyhILarIQfpMX5tK4t0svD7NGVLsQNJs4X0HEM/6mRrvU46izRr+O1ThK3yFr/AVvsIXwvsv6Fn9UqGExzZpa68vFd4TZQ2+S+9agsmxRIGo4wAAAABJRU5ErkJggg==";
	var img_dummy=img_zoomin;
	
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
		var buttonsn=4;
		if (!fsEnabled) buttonsn=buttonsn-1;

		var buttons=[];
	  var ch=box.height;
		var bh=80;//buttons top
		var bw=80;//buttons width
		var bx=[];for (var i=0;i<buttonsn;i++) bx.push({});
			
		var cx=(arcl-buttonsn*bw)/2+bw/2;
		var cy=bh/2;

		//buttons.push(getButtonSet(cp_layer,img_fit,cx,cy,function(){fitImage(container) }));
		//cx+=bw;

		buttons.push(getButtonSet(cp_layer,img_zoomin,cx,cy,function(){zoominDown(container)},function(){zoominUp(container)}));
		cx+=bw;

		if (fsEnabled){
			buttons.push(getButtonSet(cp_layer,img_screen,cx,cy,function(){fullScreen(container)}));
			cx+=bw;
		}

		buttons.push(getButtonSet(cp_layer,img_zoomout,cx,cy,function(){zoomoutDown(container)},function(){zoomoutUp(container)}));
		cx+=bw;

		buttons.push(getButtonSet(cp_layer,img_full,cx,cy,function(){ fullImage(container); }));
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
			else
				fitImage(container);
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
			data.minWidth=h;
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
			cpPanelOpacity:0.6,
			cpButtonsOpacity:0.6,
			//dontLoadRaphael: false,
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
