(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3be10c4e"],{"1e4b":function(n,t,i){"use strict";i.r(t);var e=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"header"},[i("van-tag",{attrs:{plain:"",type:"primary",size:"large"}},[n._v(" "+n._s(n.toDay.week))]),n._v("   "),i("van-tag",{attrs:{plain:"",type:"primary",size:"large"}},[n._v(" "+n._s(n.toDay.ticket))])],1),i("div",{staticClass:"row"},n._l(n.luckNum,(function(t,e){return i("div",{key:e,staticClass:"col"},[t&&(-1!==n.toDay.key.indexOf("SSQ")||-1!==n.toDay.key.indexOf("QXC"))&&e<6?i("div",{class:n.finish?"blue":"fade-in blue"},[n._v(" "+n._s(t)+" ")]):n._e(),t&&(-1!==n.toDay.key.indexOf("SSQ")||-1!==n.toDay.key.indexOf("QXC"))&&e>=6?i("div",{class:n.finish?"red":"fade-in red"},[n._v(" "+n._s(t)+" ")]):n._e(),t&&-1!==n.toDay.key.indexOf("DLT")&&e<5?i("div",{class:n.finish?"blue":"fade-in blue"},[n._v(" "+n._s(t)+" ")]):n._e(),t&&-1!==n.toDay.key.indexOf("DLT")&&e>=5?i("div",{class:n.finish?"red":"fade-in red"},[n._v(" "+n._s(t)+" ")]):n._e()])})),0),i("div",{staticClass:"footer"},[n.openBtn?i("van-button",{attrs:{round:"",size:"small",type:"primary"},on:{click:function(t){return n.openLuck()}}},[n._v("开启今日")]):n._e(),n._v("   "),i("van-button",{attrs:{round:"",size:"small",to:"/history",type:"info"}},[n._v("查看历史")])],1)])},s=[],u=i("4360"),a={name:"index",components:{},data:function(){return{toDay:u["b"],luckNum:[],finish:!1,openBtn:!1,luckNumFun:{}}},mounted:function(){this.luckNumFun=u["b"].luckNumFun(),this.finish=this.luckNumFun.finish(),this.openBtn=!this.finish,this.luckNum=this.luckNumFun.exist()},methods:{openLuck:function(){var n=this;this.openBtn=!1;var t=function t(){setTimeout((function(){n.luckNum=n.luckNumFun.next(),n.luckNumFun.finish()||t()}),300)};t()}}},o=a,c=(i("d44d"),i("2877")),l=Object(c["a"])(o,e,s,!1,null,null,null);t["default"]=l.exports},"222d":function(n,t,i){},d44d:function(n,t,i){"use strict";i("222d")}}]);
//# sourceMappingURL=chunk-3be10c4e.f125ee6d.js.map