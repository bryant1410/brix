KISSY.add("brix/gallery/sitenav/index",function(e,t,i){function a(){a.superclass.constructor.apply(this,arguments)}var n=function(e){var t=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.src=e,t.appendChild(i)};return a.ATTRS={mode:{value:""},hovercolor:{value:""}},e.extend(a,t,{render:function(){var t=this;i.jsonp("http://www.taobao.com/go/rgn/mm/mm_nav_back.php",{mode:t.get("mode"),hovercolor:t.get("hovercolor")},function(i){var a="http://g.tbcdn.cn/",r="",s="";t.get("el").html(e.one("<textarea />").html(i).val()),r=t.get("el").one(".J_alimama_nav").attr("data-v"),s=a+"/mm/alimama-brand/"+r+"/app/components/nav/mmnav-min.js",n(s)})}}),a},{requires:["brix/core/brick","ajax"]});