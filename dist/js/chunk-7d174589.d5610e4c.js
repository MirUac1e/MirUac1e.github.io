(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d174589"],{"2f14":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));class s{queryString(t){let e="";for(let a in t)e+=`${a}=${t[a]}&`;return e.slice(0,-1)}}const i=new s},cf2a:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order"},[a("van-nav-bar",{style:{"z-index":2},attrs:{title:"我的订单","left-text":"返回","left-arrow":"",fixed:!0},on:{"click-left":t.back}}),a("div",{staticClass:"order-bg"}),a("div",{staticClass:"tab-box"},[a("van-tabs",{attrs:{color:"#0c34ba","title-active-color":"#0c34ba"},on:{change:t.toggleStatus},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},t._l(t.tabItems,(function(e,s){return a("van-tab",{key:s,attrs:{title:e.title}},[t._l(t.orderDatas,(function(e,s){return a("div",{key:s,staticClass:"tab-item"},[a("div",{staticClass:"clearfix tab-item-box"},[a("div",{staticClass:"fl num"},[t._v(t._s(e.orderId))]),a("div",{staticClass:"fr"},[1==e.status?a("div",{staticClass:"text",on:{click:function(a){return t.confirmReceive(e,s)}}},[t._v(" 确认收货 ")]):a("div",{staticClass:"text-box"},[a("div",{staticClass:"finished"},[t._v("已完成")]),a("div",{staticClass:"remove",on:{click:function(a){return t.deleteOrder(e,s)}}},[a("van-icon",{attrs:{name:"delete"}})],1)])])]),t._l(e.products,(function(e,s){return a("div",{key:s,staticClass:"clearfix pro-box"},[a("div",{staticClass:"fl pro-img"},[a("img",{staticClass:"auto-img",attrs:{src:e.smallImg}})]),a("div",{staticClass:"fl pro-info"},[a("div",{staticClass:"clearfix"},[a("div",{staticClass:"name-cn fl"},[t._v(t._s(e.name))]),a("div",{staticClass:"pro-rule fl"},[t._v(t._s(e.rule))])]),a("div",{staticClass:"name-us"},[t._v(" "+t._s(e.enname)+" ")]),a("div",{staticClass:"clearfix btm"},[a("div",{staticClass:"fl pro-price"},[t._v(t._s(e.price))]),a("div",{staticClass:"fr pro-number"},[t._v("x "+t._s(e.count))])])])])})),a("div",{staticClass:"pro-allinfo"},[a("div",{staticClass:"pro-time"},[t._v(" "+t._s(t._f("formatDate")(e.date,"yyyy-MM-dd hh:mm:ss"))+" ")]),a("div",{staticClass:"clearfix"},[a("div",{staticClass:"fl pro-count"},[t._v("共计"+t._s(e.count)+"件商品")]),a("div",{staticClass:"fr pro-total"},[t._v("合计￥"+t._s(e.total)+"元")])])])],2)})),a("van-empty",{directives:[{name:"show",rawName:"v-show",value:t.orderDatas.length<1,expression:"orderDatas.length < 1"}],attrs:{description:"订单栏是空的desu"}},[a("van-button",{attrs:{type:"default",color:"#0c43ba",to:"Menu"}},[t._v("去逛逛把")])],1)],2)})),1)],1)],1)},i=[],r=a("2f14"),o={data(){return{tabIndex:0,orderDatas:[],tabItems:[{title:"全部"},{title:"进行中"},{title:"已完成"}]}},created(){this.findOrder(0)},methods:{back(){this.$router.go(-1)},findOrder(t){let e=localStorage.getItem("CSTK");if(!e)return this.$router.push({name:"Login"});this.orderDatas=[],this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/findOrder",params:{appkey:this.appkey,tokenString:e,status:t}}).then(t=>{if(this.$toast.clear(),7e4==t.data.code){let e={};t.data.result.map(t=>{e[t.oid]?(e[t.oid].count+=t.count,e[t.oid].total+=Number(t.count)*Number(t.price),e[t.oid].products.push(t)):e[t.oid]={orderId:t.oid,date:t.createdAt,count:t.count,total:Number(t.count)*Number(t.price),status:t.status,products:[t]}});for(let t in e)this.orderDatas.push(e[t]);this.orderDatas.sort((t,e)=>new Date(e.date).getTime()-new Date(t.date).getTime())}}).catch(t=>{console.log("error => ",t)})},toggleStatus(t,e){this.findOrder(t)},confirmReceive(t,e){let a=localStorage.getItem("CSTK");if(!a)return this.$router.push({name:"Login"});let s=r["a"].queryString({appkey:this.appkey,tokenString:a,oid:t.orderId});this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"POST",url:"/receive",data:s}).then(a=>{this.$toast.clear(),this.$toast(a.data.msg),8e4==a.data.code&&(1==this.tabIndex?this.orderDatas.splice(e,1):t.status=2)}).catch(t=>{console.log("error => ",t)})},deleteOrder(t,e){let a=localStorage.getItem("CSTK");if(!a)return this.$router.push({name:"Login"});let s=r["a"].queryString({appkey:this.appkey,tokenString:a,oid:t.orderId});this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"POST",url:"/removeOrder",data:s}).then(t=>{this.$toast.clear(),this.$toast(t.data.msg),9e4==t.data.code&&this.orderDatas.splice(e,1)}).catch(t=>{console.log("error => ",t)})}}},n=o,c=(a("eded"),a("2877")),l=Object(c["a"])(n,s,i,!1,null,"1e116cd6",null);e["default"]=l.exports},e825:function(t,e,a){},eded:function(t,e,a){"use strict";var s=a("e825"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-7d174589.d5610e4c.js.map