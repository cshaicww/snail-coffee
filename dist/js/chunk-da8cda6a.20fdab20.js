(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da8cda6a"],{"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,a=n("a640"),i=n("ae40"),o=a("forEach"),c=i("forEach");t.exports=o&&c?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"320e":function(t,e,n){},4160:function(t,e,n){"use strict";var r=n("23e7"),a=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},"44ef":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("d4ec"),a=n("bee2"),i=function(){function t(){Object(r["a"])(this,t),this.phone={reg:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,err:"请输入正确的电话号码或邮箱"},this.nickName={reg:/^[0-9a-zA-Z\u4e00-\u9fa5]{4,12}$/,err:"请输入正确的呢称"},this.password={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的密码"},this.oldPassword={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的旧密码"},this.newPassword={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的新密码"},this.venCode={reg:/^[0-9]{6}$/,err:"请输入正确的验证码"},this.email={reg:/(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/,err:"请输入正确的邮箱地址"}}return Object(a["a"])(t,[{key:"sub",value:function(t,e){for(var n in t)if(!this[n].reg.test(t[n]))return e.$toast(this[n].err),!1;return!0}}]),t}(),o=new i},"4c53":function(t,e,n){"use strict";var r=n("23e7"),a=n("857a"),i=n("af03");r({target:"String",proto:!0,forced:i("sub")},{sub:function(){return a(this,"sub","","")}})},"4d63":function(t,e,n){var r=n("83ab"),a=n("da84"),i=n("94ca"),o=n("7156"),c=n("9bf2").f,s=n("241c").f,u=n("44e7"),f=n("ad6d"),l=n("9f7f"),d=n("6eeb"),g=n("d039"),v=n("69f3").set,h=n("2626"),p=n("b622"),b=p("match"),m=a.RegExp,y=m.prototype,k=/a/g,w=/a/g,E=new m(k)!==k,$=l.UNSUPPORTED_Y,x=r&&i("RegExp",!E||$||g((function(){return w[b]=!1,m(k)!=k||m(w)==w||"/a/i"!=m(k,"i")})));if(x){var M=function(t,e){var n,r=this instanceof M,a=u(t),i=void 0===e;if(!r&&a&&t.constructor===M&&i)return t;E?a&&!i&&(t=t.source):t instanceof M&&(i&&(e=f.call(t)),t=t.source),$&&(n=!!e&&e.indexOf("y")>-1,n&&(e=e.replace(/y/g,"")));var c=o(E?new m(t,e):m(t,e),r?this:y,M);return $&&n&&v(c,{sticky:n}),c},S=function(t){t in M||c(M,t,{configurable:!0,get:function(){return m[t]},set:function(e){m[t]=e}})},N=s(m),R=0;while(N.length>R)S(N[R++]);y.constructor=M,M.prototype=y,d(a,"RegExp",M)}h("RegExp")},"4f59":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modifyname"},[n("van-nav-bar",{attrs:{title:"修改昵称","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.goBack()}}}),n("h3",[t._v("用户名:")]),n("div",{staticClass:"cont"},[n("div",{staticClass:"inp"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.MyMsg.nickName,expression:"MyMsg.nickName"}],attrs:{type:"text",autocomplete:"off"},domProps:{value:t.MyMsg.nickName},on:{input:function(e){e.target.composing||t.$set(t.MyMsg,"nickName",e.target.value)}}})]),n("p",[t._v("必须是字母或数字或汉字组合，限长4-12个字符")]),n("button",{on:{click:t.changeUserInfo}},[t._v("确认")])])],1)},a=[],i=(n("4c53"),n("fa7d")),o=n("44ef"),c=(n("2f62"),{name:"ModifyName",data:function(){return{MyMsg:{nickName:""},isPass:!0}},created:function(){this.getUseInfo()},methods:{goBack:function(){this.$router.go(-1)},getUseInfo:function(){var t=this,e=localStorage.getItem("_t");this.$toast.loading({forbidClick:!0,duration:0,message:"加载中..."}),this.axios({method:"GET",url:"/findMy",params:{appkey:this.appKey,tokenString:e}}).then((function(e){t.$toast.clear(),t.MyMsg["nickName"]=e.data.result[0].nickName})).catch((function(e){t.$toast.clear()}))},changeUserInfo:function(){var t=this;if(o["a"].sub(this.MyMsg,this)){var e=localStorage.getItem("_t");this.$toast.loading({forbidClick:!0,duration:0,message:"处理中..."}),this.axios({method:"POST",url:"/updateNickName",data:{appkey:this.appKey,tokenString:e,nickName:this.MyMsg.nickName},transformRequest:i["a"].transformRequest}).then((function(e){t.$toast.clear(),t.goBack()})).catch((function(e){t.$toast.clear()}))}else this.isPass=!1}}}),s=c,u=(n("c673"),n("2877")),f=Object(u["a"])(s,r,a,!1,null,"7d2d1244",null);e["default"]=f.exports},5319:function(t,e,n){"use strict";var r=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),c=n("a691"),s=n("1d80"),u=n("8aa5"),f=n("14c3"),l=Math.max,d=Math.min,g=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,h=/\$([$&'`]|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n,r){var b=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,m=r.REPLACE_KEEPS_$0,y=b?"$":"$0";return[function(n,r){var a=s(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):e.call(String(a),n,r)},function(t,r){if(!b&&m||"string"===typeof r&&-1===r.indexOf(y)){var i=n(e,t,this,r);if(i.done)return i.value}var s=a(t),g=String(this),v="function"===typeof r;v||(r=String(r));var h=s.global;if(h){var w=s.unicode;s.lastIndex=0}var E=[];while(1){var $=f(s,g);if(null===$)break;if(E.push($),!h)break;var x=String($[0]);""===x&&(s.lastIndex=u(g,o(s.lastIndex),w))}for(var M="",S=0,N=0;N<E.length;N++){$=E[N];for(var R=String($[0]),P=l(d(c($.index),g.length),0),_=[],A=1;A<$.length;A++)_.push(p($[A]));var j=$.groups;if(v){var C=[R].concat(_,P,g);void 0!==j&&C.push(j);var I=String(r.apply(void 0,C))}else I=k(R,g,P,_,j,r);P>=S&&(M+=g.slice(S,P)+I,S=P+R.length)}return M+g.slice(S)}];function k(t,n,r,a,o,c){var s=r+t.length,u=a.length,f=h;return void 0!==o&&(o=i(o),f=v),e.call(c,f,(function(e,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(s);case"<":c=o[i.slice(1,-1)];break;default:var f=+i;if(0===f)return e;if(f>u){var l=g(f/10);return 0===l?e:l<=u?void 0===a[l-1]?i.charAt(1):a[l-1]+i.charAt(1):e}c=a[f-1]}return void 0===c?"":c}))}}))},7156:function(t,e,n){var r=n("861d"),a=n("d2bb");t.exports=function(t,e,n){var i,o;return a&&"function"==typeof(i=e.constructor)&&i!==n&&r(o=i.prototype)&&o!==n.prototype&&a(t,o),t}},"857a":function(t,e,n){var r=n("1d80"),a=/"/g;t.exports=function(t,e,n,i){var o=String(r(t)),c="<"+e;return""!==n&&(c+=" "+n+'="'+String(i).replace(a,"&quot;")+'"'),c+">"+o+"</"+e+">"}},a15b:function(t,e,n){"use strict";var r=n("23e7"),a=n("44ad"),i=n("fc6a"),o=n("a640"),c=[].join,s=a!=Object,u=o("join",",");r({target:"Array",proto:!0,forced:s||!u},{join:function(t){return c.call(i(this),void 0===t?",":t)}})},af03:function(t,e,n){var r=n("d039");t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},bee2:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",(function(){return a}))},c673:function(t,e,n){"use strict";var r=n("320e"),a=n.n(r);a.a},d4ec:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return r}))},fa7d:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("4160"),n("a15b"),n("fb6a"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("5319");var r=n("d4ec"),a=n("bee2"),i=function(){function t(){Object(r["a"])(this,t)}return Object(a["a"])(t,[{key:"transformRequest",value:function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e}},{key:"getToken",value:function(t){var e=["t0","t1","t2"],n=[];return e.forEach((function(e){n.push(t.$cookies.get(e))})),n.join(".")}},{key:"formatDate",value:function(t,e){var n=t.getFullYear().toString();if(/(y+)/.test(e)){var r=RegExp.$1;e=e.replace(r,n.slice(n.length-r.length))}var a={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var i in a){var o=new RegExp("(".concat(i,"{1,2})"));if(o.test(e)){var c=RegExp.$1,s=a[i]>=10||1==c.length?a[i]:"0"+a[i];e=e.replace(c,s)}}return e}}]),t}(),o=new i}}]);
//# sourceMappingURL=chunk-da8cda6a.20fdab20.js.map