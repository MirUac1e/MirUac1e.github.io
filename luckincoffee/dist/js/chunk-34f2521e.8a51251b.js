(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34f2521e"],{"2f14":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));class s{queryString(t){let e="";for(let a in t)e+=`${a}=${t[a]}&`;return e.slice(0,-1)}}const i=new s},6707:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shopbag"},[a("van-nav-bar",{attrs:{title:"购物车","left-text":"返回","left-arrow:fixed":"true"},on:{"click-right":t.toggleEdit,"click-left":t.back},scopedSlots:t._u([t.shopBagData.length>0?{key:"right",fn:function(){return[a("div",[t._v(" "+t._s(t.isEdit?"完成":"编辑")+" ")])]},proxy:!0}:null],null,!0)}),a("div",t._l(t.shopBagData,(function(e,s){return a("van-swipe-cell",{key:s,attrs:{disabled:!t.isEdit},scopedSlots:t._u([{key:"right",fn:function(){return[a("van-button",{attrs:{square:"",type:"danger",text:"删除",color:"#0c34ba"},on:{click:function(a){return t.removeOneShopBag(e.sid)}}})]},proxy:!0}],null,!0)},[a("van-cell",{attrs:{border:!1}},[a("div",{staticClass:"clearfix pro-box"},[a("div",{staticClass:"fl check"},[a("van-checkbox",{attrs:{"icon-size":"24px","checked-color":"#0c34ba"},on:{click:function(a){return t.toggleCheck(e)}},model:{value:e.isCheck,callback:function(a){t.$set(e,"isCheck",a)},expression:"item.isCheck"}})],1),a("div",{staticClass:"fl pro-img"},[a("img",{staticClass:"auto-img",attrs:{src:e.small_img,alt:""}})]),a("div",{staticClass:"fl pro-info"},[a("div",{staticClass:"clearfix"},[a("div",{staticClass:"name-cn fl"},[t._v(t._s(e.name))]),a("div",{staticClass:"pro-rule fl"},[t._v(t._s(e.rule))])]),a("div",{staticClass:"name-us"},[t._v(" "+t._s(e.enname)+" ")]),a("div",{staticClass:"clearfix btm"},[a("div",{staticClass:"fl pro-price"},[t._v("￥"+t._s(e.price*e.count))]),a("div",{staticClass:"fr "},[a("van-stepper",{attrs:{theme:"round","button-size":"24","disable-input":""},on:{change:function(a){return t.modifyCount(e)}},model:{value:e.count,callback:function(a){t.$set(e,"count",a)},expression:"item.count"}})],1)])])])])],1)})),1),a("van-empty",{directives:[{name:"show",rawName:"v-show",value:t.shopBagData.length<1,expression:"shopBagData.length < 1"}],attrs:{description:"购物袋是空的desu"}},[a("van-button",{attrs:{type:"default",color:"#0c43ba",to:"Menu"}},[t._v("去逛逛把")])],1),t.shopBagData.length>0?a("div",[a("van-submit-bar",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}],attrs:{price:t.total,"button-text":"提交订单","button-color":"#0c34ba"},on:{submit:t.commit}},[a("van-checkbox",{attrs:{"checked-color":"#0c34ba","icon-size":"24px"},on:{click:t.isAllCheck},model:{value:t.allChecked,callback:function(e){t.allChecked=e},expression:"allChecked"}},[t._v("全选 ")])],1),a("van-submit-bar",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],attrs:{"button-text":"删除所选","button-color":"#0c43ba"},on:{submit:t.removeSelectShopBag}},[a("van-checkbox",{attrs:{"checked-color":"#0c34ba","icon-size":"24px"},on:{click:t.isAllCheck},model:{value:t.allChecked,callback:function(e){t.allChecked=e},expression:"allChecked"}},[t._v("全选 ")])],1)],1):t._e()],1)},i=[],o=a("2f14"),n={data(){return{allChecked:!1,isEdit:!1,pids:[],shopBagData:[],total:0}},created(){this.findShopBagData()},methods:{back(){this.$router.go(-1)},commit(){let t=[];this.shopBagData.map(e=>{e.isCheck&&t.push(e.sid)}),0!==t.length?(t=t.join("-"),this.$router.push({name:"Pay",query:{sids:t}})):this.$toast("请选择至少一件商品")},toggleEdit(){this.isEdit=!this.isEdit},isAllCheck(){this.shopBagData.map(t=>{t.isCheck=this.allChecked}),this.sum()},toggleCheck(t){this.sum();for(let e=0;e<this.shopBagData.length;e++){if(0==this.shopBagData[e].isCheck)return void(this.allChecked=!1);this.allChecked=!0}},findShopBagData(){let t=localStorage.getItem("CSTK");if(!t)return this.$router.push({name:"Login"});this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/findAllShopcart",params:{appkey:this.appkey,tokenString:t}}).then(t=>{this.$toast.clear(),5e3==t.data.code&&(t.data.result.map(t=>{t.isCheck=!1}),this.shopBagData=t.data.result)}).catch(t=>{console.log("error => ",t)})},modifyCount(t){let e=localStorage.getItem("CSTK");if(!e)return this.$router.push({name:"Login"});let a=o["a"].queryString({appkey:this.appkey,tokenString:e,sid:t.sid,count:t.count});this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"POST",url:"/modifyShopcartCount",data:a}).then(t=>{this.$toast.clear(),6e3==t.data.code&&this.sum(),console.log("编辑购物车数量 ",t.data.msg)}).catch(t=>{console.log("error => ",t)})},removeShopBagData(t){let e=localStorage.getItem("CSTK");if(!e)return this.$router.push({name:"Login"});let a=o["a"].queryString({appkey:this.appkey,tokenString:e,sids:JSON.stringify(t)});this.$toast({message:"加载中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"POST",url:"/deleteShopcart",data:a}).then(t=>{this.$toast.clear(),this.sum(),this.$toast(t.data.msg),this.findShopBagData()}).catch(t=>{console.log("error => ",t)})},removeOneShopBag(t){this.removeShopBagData([t])},removeSelectShopBag(){for(let t=0;t<this.shopBagData.length;t++)this.shopBagData[t].isCheck&&(this.removeShopBagData([this.shopBagData[t].sid]),this.shopBagData.splice(t,1),t--)},sum(){this.total=0,this.shopBagData.map(t=>{t.isCheck&&(this.total+=Number(t.price)*t.count)}),this.total=100*this.total}}},c=n,l=(a("95ed"),a("2877")),r=Object(l["a"])(c,s,i,!1,null,"1ffc1a82",null);e["default"]=r.exports},"95ed":function(t,e,a){"use strict";var s=a("bac6"),i=a.n(s);i.a},bac6:function(t,e,a){}}]);
//# sourceMappingURL=chunk-34f2521e.8a51251b.js.map