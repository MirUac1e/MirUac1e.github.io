(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7540340c"],{"54fc":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"recommended"},[s("div",[s("div",{staticClass:"search-box goFlex"},[s("div",{staticClass:"search-item"},[s("van-search",{attrs:{placeholder:"请输入搜索关键词"}})],1),s("div",{staticClass:"little-play-box",on:{click:t.clickLittlePlay}},[s("div",{staticClass:"little-play goFlex",class:t.iconState.play?"active":""},[t.songListData[t.songIndex]?s("div",{staticClass:"little-play-img",style:t.songListData[t.songIndex]?"background-image:url("+t.songListData[t.songIndex].imgUrl+")":""}):s("van-icon",{attrs:{name:"music-o"}})],1)])]),s("div",{staticClass:"swipe-box"},[s("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:0}},t._l(t.bannerData,(function(t,a){return s("van-swipe-item",{key:a},[s("img",{staticClass:"auto-img",attrs:{src:t.imageUrl,alt:""}})])})),1)],1),s("div",{staticClass:"rec-box clearfix"},t._l(t.recList,(function(a,i){return s("div",{key:i,staticClass:"rec-item fl"},[s("div",{staticClass:"rec-item-icon"},[s("div",{staticClass:"rec-item-icon-content"},[s("van-icon",{attrs:{name:a.imgUrl,color:"#fff"}})],1)]),s("div",{staticClass:"rec-item-title"},[t._v(t._s(a.title))])])})),0)]),s("div",{staticClass:"personalized"},[t._m(0),s("div",{staticClass:"personalized-content clearfix"},t._l(t.personalizedData,(function(a,i){return s("div",{key:i,staticClass:"personalized-content-item",class:[i%2==0?"tol":"tor",i%2==0?"fl":"fr"],on:{click:function(s){return t.clickPlayList(a.id)}}},[s("div",{staticClass:"img-box"},[s("img",{staticClass:"auto-img",attrs:{src:a.picUrl,alt:""}}),s("div",{staticClass:"img-box-count"},[s("van-icon",{attrs:{name:"service-o"}}),s("div",[t._v(t._s(a.playCount))])],1)]),s("div",{staticClass:"desc-box"},[t._v(" "+t._s(a.name)+" ")])])})),0)]),s("div")])},e=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"personalized-title-box clearfix"},[s("div",{staticClass:"personalized-title fl"},[t._v(" 推荐歌单 ")])])}],l=s("2f14"),o=s("2f62"),n={data(){return{bannerData:[],cookieData:"",recList:[{title:"每日推荐",imgUrl:"shop-o",methods:""},{title:"歌单",imgUrl:"coupon-o",methods:""},{title:"排行榜",imgUrl:"chart-trending-o",methods:""},{title:"直播",imgUrl:"tv-o",methods:""}],personalizedData:[]}},methods:{clickLittlePlay(){this.songListData[this.songIndex]&&this.$store.commit("onlyOpenPlayPage")},clickPlayList(t){this.$router.push({path:"/songlistdetail",query:{id:t}})},test(){this.$toast.loading({type:"loading",message:"发送中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({methods:"get",url:"/personalized",params:{limit:10}}).then(t=>{this.$toast.clear()}).catch(t=>{this.$toast.clear(),console.log("err ==> ",t)})},getBanner(){this.axios({methods:"get",url:"/banner"}).then(t=>{this.$toast.clear(),this.bannerData=t.data.banners}).catch(t=>{this.$toast.clear(),console.log("err ==> ",t)})},getCookie(){this.cookieData=l["a"].getCookie("wyyc"),this.test()},getPersonalizedData(){this.$toast.loading({type:"loading",message:"发送中",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({methods:"get",url:"/personalized",params:{limit:6}}).then(t=>{this.$toast.clear(),t.data.result.map(t=>{t.playCount=Math.floor(t.playCount/1e4)+"万"}),this.personalizedData=t.data.result}).catch(t=>{this.$toast.clear(),console.log("err ==> ",t)})}},created(){this.getBanner(),this.getCookie(),this.getPersonalizedData()},computed:{...Object(o["b"])(["songIndex","iconState","songListData"])}},c=n,r=(s("8dac"),s("2877")),d=Object(r["a"])(c,i,e,!1,null,"de19817a",null);a["default"]=d.exports},"8dac":function(t,a,s){"use strict";var i=s("e46b"),e=s.n(i);e.a},e46b:function(t,a,s){}}]);
//# sourceMappingURL=chunk-7540340c.d72d661e.js.map