(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ffea5f44"],{"7a5a":function(t,s,i){"use strict";var a=i("b96f"),e=i.n(a);e.a},"8fc1":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"my"},[t.isLogin?i("div",{staticClass:"my-top"},[i("div",{staticClass:"clearfix my-title-box"},[i("div",{staticClass:"fl my-title"},[t._v("个人中心")]),i("div",{staticClass:"fr my-icon"},[i("div",{staticClass:"little-play goFlex",class:t.iconState.play?"active":"",on:{click:t.clickLittlePlay}},[t.songListData[t.songIndex]?i("div",{staticClass:"little-play-img",style:t.songListData[t.songIndex]?"background-image:url("+t.songListData[t.songIndex].imgUrl+")":""}):i("van-icon",{attrs:{name:"music-o"}})],1)])]),i("div",{staticClass:"clearfix"},[i("div",{staticClass:"my-info-box fl clearfix"},[i("div",{staticClass:"my-info-img fl"},[i("img",{staticClass:"auto-img",attrs:{src:t.userInfo.avatarUrl,alt:""}})]),i("div",{staticClass:"my-info-detail-box fl"},[i("div",{staticClass:"my-info-nickname"},[t._v(t._s(t.userInfo.nickname))]),i("div",{staticClass:"my-info-vip"},[t._v("lv."+t._s(t.userInfo.vipType))])])]),i("div",{staticClass:"my-focus-box fr clearfix"},[i("div",{staticClass:"my-focus fl"},[i("div",{staticClass:"my-focus-num"},[t._v(t._s(t.userInfo.gender))]),i("div",{staticClass:"my-focus-title"},[t._v("动态")])]),i("div",{staticClass:"my-focus fl"},[i("div",{staticClass:"my-focus-num"},[t._v(t._s(t.userInfo.follows))]),i("div",{staticClass:"my-focus-title"},[t._v("关注")])]),i("div",{staticClass:"my-focus fl"},[i("div",{staticClass:"my-focus-num"},[t._v(t._s(t.userInfo.followeds))]),i("div",{staticClass:"my-focus-title"},[t._v("粉丝")])])])])]):i("div",{staticClass:"my-top",staticStyle:{height:"100%"}},[i("van-button",{attrs:{type:"primary",to:"Login"}},[t._v("请去登录")])],1),i("div",{staticClass:"my-content-box"},[i("div",{staticClass:"rec-box clearfix"},t._l(t.recList,(function(s,a){return i("div",{key:a,staticClass:"rec-item fl"},[i("div",{staticClass:"rec-item-icon"},[i("div",{staticClass:"rec-item-icon-content"},[i("van-icon",{attrs:{name:s.imgUrl,color:"#fff"}})],1)]),i("div",{staticClass:"rec-item-title"},[t._v(t._s(s.title))])])})),0)])])},e=[],o=i("2f14"),l=i("2f62"),c={data(){return{isLogin:!1,recList:[{title:"我的消息",imgUrl:"chat-o",methods:""},{title:"最近播放",imgUrl:"underway-o",methods:""},{title:"全部收藏",imgUrl:"goods-collect-o",methods:""},{title:"我的设置",imgUrl:"ellipsis",methods:""}]}},computed:Object(l["b"])(["userInfo","songListData","songIndex","iconState"]),created(){this.checkIsLogin()},methods:{clickLittlePlay(){this.songListData[this.songIndex]&&this.$store.commit("onlyOpenPlayPage")},checkIsLogin(){o["a"].getCookie("wyyc")?(this.isLogin=!0,this.getUserInfoByUid()):this.isLogin=!1},getUserInfoByUid(){this.$toast.loading({type:"loading",message:"发送中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({methods:"get",url:"/user/detail",params:{uid:80747428}}).then(t=>{this.$toast.clear(),this.$store.commit("setUserInfo",t.data.profile)}).catch(t=>{this.$toast.clear(),console.log("err ==> ",t)})}}},n=c,r=(i("7a5a"),i("2877")),d=Object(r["a"])(n,a,e,!1,null,"5df5893a",null);s["default"]=d.exports},b96f:function(t,s,i){}}]);
//# sourceMappingURL=chunk-ffea5f44.ba9e44c0.js.map