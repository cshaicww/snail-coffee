(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90972fb0"],{"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),o=r("ae40"),i=a("forEach"),s=o("forEach");t.exports=i&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"18e5":function(t,e,r){"use strict";var n=r("696e"),a=r.n(n);a.a},4160:function(t,e,r){"use strict";var n=r("23e7"),a=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},"44ef":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r("d4ec"),a=r("bee2"),o=function(){function t(){Object(n["a"])(this,t),this.phone={reg:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,err:"请输入正确的电话号码或邮箱"},this.nickName={reg:/^[0-9a-zA-Z\u4e00-\u9fa5]{4,12}$/,err:"请输入正确的呢称"},this.password={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的密码"},this.oldPassword={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的旧密码"},this.newPassword={reg:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,err:"请输入正确的新密码"},this.venCode={reg:/^[0-9]{6}$/,err:"请输入正确的验证码"},this.email={reg:/(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/,err:"请输入正确的邮箱地址"}}return Object(a["a"])(t,[{key:"sub",value:function(t,e){for(var r in t)if(!this[r].reg.test(t[r]))return e.$toast(this[r].err),!1;return!0}}]),t}(),i=new o},"4c53":function(t,e,r){"use strict";var n=r("23e7"),a=r("857a"),o=r("af03");n({target:"String",proto:!0,forced:o("sub")},{sub:function(){return a(this,"sub","","")}})},"4d63":function(t,e,r){var n=r("83ab"),a=r("da84"),o=r("94ca"),i=r("7156"),s=r("9bf2").f,c=r("241c").f,u=r("44e7"),f=r("ad6d"),l=r("9f7f"),d=r("6eeb"),p=r("d039"),h=r("69f3").set,v=r("2626"),g=r("b622"),w=g("match"),b=a.RegExp,y=b.prototype,E=/a/g,m=/a/g,$=new b(E)!==E,k=l.UNSUPPORTED_Y,x=n&&o("RegExp",!$||k||p((function(){return m[w]=!1,b(E)!=E||b(m)==m||"/a/i"!=b(E,"i")})));if(x){var P=function(t,e){var r,n=this instanceof P,a=u(t),o=void 0===e;if(!n&&a&&t.constructor===P&&o)return t;$?a&&!o&&(t=t.source):t instanceof P&&(o&&(e=f.call(t)),t=t.source),k&&(r=!!e&&e.indexOf("y")>-1,r&&(e=e.replace(/y/g,"")));var s=i($?new b(t,e):b(t,e),n?this:y,P);return k&&r&&h(s,{sticky:r}),s},S=function(t){t in P||s(P,t,{configurable:!0,get:function(){return b[t]},set:function(e){b[t]=e}})},O=c(b),I=0;while(O.length>I)S(O[I++]);y.constructor=P,P.prototype=y,d(a,"RegExp",P)}v("RegExp")},5319:function(t,e,r){"use strict";var n=r("d784"),a=r("825a"),o=r("7b0b"),i=r("50c4"),s=r("a691"),c=r("1d80"),u=r("8aa5"),f=r("14c3"),l=Math.max,d=Math.min,p=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,v=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var w=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,b=n.REPLACE_KEEPS_$0,y=w?"$":"$0";return[function(r,n){var a=c(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,a,n):e.call(String(a),r,n)},function(t,n){if(!w&&b||"string"===typeof n&&-1===n.indexOf(y)){var o=r(e,t,this,n);if(o.done)return o.value}var c=a(t),p=String(this),h="function"===typeof n;h||(n=String(n));var v=c.global;if(v){var m=c.unicode;c.lastIndex=0}var $=[];while(1){var k=f(c,p);if(null===k)break;if($.push(k),!v)break;var x=String(k[0]);""===x&&(c.lastIndex=u(p,i(c.lastIndex),m))}for(var P="",S=0,O=0;O<$.length;O++){k=$[O];for(var I=String(k[0]),R=l(d(s(k.index),p.length),0),_=[],D=1;D<k.length;D++)_.push(g(k[D]));var j=k.groups;if(h){var A=[I].concat(_,R,p);void 0!==j&&A.push(j);var C=String(n.apply(void 0,A))}else C=E(I,p,R,_,j,n);R>=S&&(P+=p.slice(S,R)+C,S=R+I.length)}return P+p.slice(S)}];function E(t,r,n,a,i,s){var c=n+t.length,u=a.length,f=v;return void 0!==i&&(i=o(i),f=h),e.call(s,f,(function(e,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(c);case"<":s=i[o.slice(1,-1)];break;default:var f=+o;if(0===f)return e;if(f>u){var l=p(f/10);return 0===l?e:l<=u?void 0===a[l-1]?o.charAt(1):a[l-1]+o.charAt(1):e}s=a[f-1]}return void 0===s?"":s}))}}))},"696e":function(t,e,r){},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var o,i;return a&&"function"==typeof(o=e.constructor)&&o!==r&&n(i=o.prototype)&&i!==r.prototype&&a(t,i),t}},"857a":function(t,e,r){var n=r("1d80"),a=/"/g;t.exports=function(t,e,r,o){var i=String(n(t)),s="<"+e;return""!==r&&(s+=" "+r+'="'+String(o).replace(a,"&quot;")+'"'),s+">"+i+"</"+e+">"}},a15b:function(t,e,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),i=r("a640"),s=[].join,c=a!=Object,u=i("join",",");n({target:"Array",proto:!0,forced:c||!u},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},af03:function(t,e,r){var n=r("d039");t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},bee2:function(t,e,r){"use strict";function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}r.d(e,"a",(function(){return a}))},d4ec:function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",(function(){return n}))},e6e1:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modifypassword"},[r("van-nav-bar",{attrs:{title:"修改密碼","left-text":"返回","left-arrow":""},on:{"click-left":t.goBack}}),r("div",{staticClass:"cont"},[r("van-form",{on:{submit:t.updatePassword}},[t._l(t.cellData,(function(e,n){return r("van-field",{key:n,staticClass:"van-cell",attrs:{"label-width":66,label:e.title,placeholder:e.placeholder,type:e.type,clearable:"",autocomplete:"off"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[r("van-icon",{attrs:{"class-prefix":"icon",name:e.isOpen?"yanjing":"biyan"},on:{click:function(e){return t.changeEyes(n)}}})]},proxy:!0}],null,!0),model:{value:e.password,callback:function(r){t.$set(e,"password",r)},expression:"item.password"}})})),r("p",[t._v("必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间")]),r("div",{staticClass:"btn"},[r("van-button",{staticClass:"van-button",attrs:{type:"info","native-type":"submit",disabled:t.isPass}},[t._v("确认")])],1)],2)],1)],1)},a=[],o=(r("4c53"),r("44ef")),i=r("fa7d"),s={name:"ModifyPassword",data:function(){return{cellData:[{title:"旧密码",placeholder:"请填写旧密码",type:"password",password:"",isOpen:!1},{title:"新密码",placeholder:"请填写新密码",type:"password",password:"",isOpen:!1}]}},computed:{userInfo:function(){var t={};return t.oldPassword=this.cellData[0].password,t.newPassword=this.cellData[1].password,t},isPass:function(){for(var t in this.userInfo)if(""==this.userInfo[t])return!0;return!1}},methods:{goBack:function(){this.$router.go(-1)},changeEyes:function(t){this.cellData[t].isOpen?this.cellData[t].type="password":this.cellData[t].type="text",this.cellData[t].isOpen=!this.cellData[t].isOpen},updatePassword:function(){var t=this;if(o["a"].sub(this.userInfo,this)){if(this.userInfo.newPassword==this.userInfo.oldPassword)return void this.$toast("您曾使用过当前密码,请从新输入");var e=localStorage.getItem("_t");this.$toast.loading({forbidClick:!0,duration:0,message:"加载中..."}),this.axios({method:"POST",url:"/updatePassword",data:{appkey:this.appKey,tokenString:e,oldPassword:this.userInfo.oldPassword,password:this.userInfo.newPassword},transformRequest:i["a"].transformRequest}).then((function(e){t.$toast.clear(),"E001"==e.data.code?(localStorage.removeItem("_t"),t.$router.push({name:"Login"})):t.$toast(e.data.msg)})).catch((function(e){t.$toast.clear()}))}}}},c=s,u=(r("18e5"),r("2877")),f=Object(u["a"])(c,n,a,!1,null,"7bcba4e6",null);e["default"]=f.exports},fa7d:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("4160"),r("a15b"),r("fb6a"),r("d3b7"),r("4d63"),r("ac1f"),r("25f0"),r("5319");var n=r("d4ec"),a=r("bee2"),o=function(){function t(){Object(n["a"])(this,t)}return Object(a["a"])(t,[{key:"transformRequest",value:function(t){var e="";for(var r in t)e+=r+"="+t[r]+"&";return e}},{key:"getToken",value:function(t){var e=["t0","t1","t2"],r=[];return e.forEach((function(e){r.push(t.$cookies.get(e))})),r.join(".")}},{key:"formatDate",value:function(t,e){var r=t.getFullYear().toString();if(/(y+)/.test(e)){var n=RegExp.$1;e=e.replace(n,r.slice(r.length-n.length))}var a={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var o in a){var i=new RegExp("(".concat(o,"{1,2})"));if(i.test(e)){var s=RegExp.$1,c=a[o]>=10||1==s.length?a[o]:"0"+a[o];e=e.replace(s,c)}}return e}}]),t}(),i=new o}}]);
//# sourceMappingURL=chunk-90972fb0.29ae32f1.js.map