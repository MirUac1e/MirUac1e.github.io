(function(t){function e(e){for(var s,i,r=e[0],l=e[1],c=e[2],d=0,g=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&g.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(g.length)g.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,i=1;i<a.length;i++){var r=a[i];0!==n[r]&&(s=!1)}s&&(o.splice(e--,1),t=l(l.s=a[0]))}return t}var s={},i={app:0},n={app:0},o=[];function r(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-29ec111e":"50747edf","chunk-37f784d8":"348c7685","chunk-3a75d3db":"f88230db","chunk-698b8f0c":"89bfb38b","chunk-70ca9035":"d07a4f14","chunk-7540340c":"d72d661e","chunk-7af83279":"a77b0b81","chunk-bca15602":"d889defb","chunk-ffea5f44":"ba9e44c0"}[t]+".js"}function l(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-29ec111e":1,"chunk-37f784d8":1,"chunk-3a75d3db":1,"chunk-698b8f0c":1,"chunk-70ca9035":1,"chunk-7540340c":1,"chunk-7af83279":1,"chunk-bca15602":1,"chunk-ffea5f44":1};i[t]?e.push(i[t]):0!==i[t]&&a[t]&&e.push(i[t]=new Promise((function(e,a){for(var s="css/"+({}[t]||t)+"."+{"chunk-29ec111e":"0e433876","chunk-37f784d8":"54266ee3","chunk-3a75d3db":"5e4617be","chunk-698b8f0c":"1adec46e","chunk-70ca9035":"a320e64a","chunk-7540340c":"f067f11e","chunk-7af83279":"c3382d3a","chunk-bca15602":"24157be2","chunk-ffea5f44":"ad89ebe3"}[t]+".css",n=l.p+s,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var c=o[r],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===s||d===n))return e()}var g=document.getElementsByTagName("style");for(r=0;r<g.length;r++){c=g[r],d=c.getAttribute("data-href");if(d===s||d===n)return e()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=e,u.onerror=function(e){var s=e&&e.target&&e.target.src||n,o=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=s,delete i[t],u.parentNode.removeChild(u),a(o)},u.href=n;var h=document.getElementsByTagName("head")[0];h.appendChild(u)})).then((function(){i[t]=0})));var s=n[t];if(0!==s)if(s)e.push(s[2]);else{var o=new Promise((function(e,a){s=n[t]=[e,a]}));e.push(s[2]=o);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=r(t);var g=new Error;c=function(e){d.onerror=d.onload=null,clearTimeout(u);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;g.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",g.name="ChunkLoadError",g.type=s,g.request=i,a[1](g)}n[t]=void 0}};var u=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(e)},l.m=t,l.c=s,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)l.d(a,s,function(e){return t[e]}.bind(null,s));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var g=0;g<c.length;g++)e(c[g]);var u=d;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},2395:function(t,e,a){},"2f14":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));class s{getCookie(t){for(var e=t+"=",a=document.cookie.split(";"),s=0;s<a.length;s++){var i=a[s].trim();if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""}calcMilliseconds(t){let e=Math.floor(t/1e3/60),a=Math.floor(t/1e3%60);return e<10&&(e="0"+e),a<10&&(a="0"+a),e+":"+a}getLocalTime(t){return new Date(parseInt(t)).toLocaleDateString().replace(/:\d{1,2}$/," ")}formatLyric(t){let e=[],a=t.split("\n"),s=a.length;for(let i=0;i<s;i++){let t=a[i],s=t.split("]"),n=s.pop();s.forEach(t=>{let a={},s=t.substr(1,t.length-1).split(":"),i=60*parseInt(s[0])+Math.ceil(s[1]);a.time=i,a.text=n,e.push(a)})}return e.sort(this.sortRule),e}sortRule(t,e){return t.time-e.time}}const i=new s},"56d7":function(t,e,a){"use strict";a.r(e);a("da3c");var s=a("0b33"),i=(a("bda7"),a("5e46")),n=(a("537a"),a("ac28")),o=(a("a52c"),a("2ed4")),r=(a("c3a6"),a("ad06")),l=(a("66b9"),a("b650")),c=(a("8a58"),a("e41f")),d=(a("be7f"),a("565f")),g=(a("38d5"),a("772a")),u=(a("e7e5"),a("d399")),h=(a("5246"),a("6b41")),m=(a("7844"),a("5596")),f=(a("4b0a"),a("2bb1")),v=(a("5852"),a("d961")),p=(a("6894"),a("e11d")),y=(a("615f"),a("92e2")),b=(a("c194"),a("7744")),x=(a("0653"),a("34e9")),k=a("2b0e"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view"),t.isLittlePlayList?a("div",{staticClass:"little-play-list"},[a("div",{staticClass:"not-content",on:{click:t.toggleLittlePlayList}}),a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v("当前播放")]),a("div",{staticClass:"order goFlex",on:{click:t.toggleOrder}},[a("div",{staticStyle:{"margin-right":"10px"}},[t.iconState.order[0].v?a("i",{staticClass:"iconfont"},[t._v("")]):t.iconState.order[1].v?a("i",{staticClass:"iconfont"},[t._v("")]):t.iconState.order[2].v?a("i",{staticClass:"iconfont"},[t._v("")]):t._e()]),a("div",[t._v(" "+t._s(t.iconState.order[t.iconState.index].name)+" ")])]),a("div",{staticClass:"song-item-box"},t._l(t.songListData,(function(e,s){return a("div",{key:s,staticClass:"song-item goFlex",style:s==t.songIndex?"color:#e4393c":"",on:{click:function(e){return t.littlePlayListChangeSong(s)}}},[a("div",{staticClass:"song-item-name"},[t._v(" "+t._s(e.name)+t._s(e.isAlia?"("+e.alia[0]+")":"")+" ")]),a("div",{staticClass:"song-item-singer goFlex"},t._l(t.songUrlData?t.songListData[s].artsss:"",(function(e,i){return a("div",{key:i,style:s==t.songIndex?"color:#e4393c":""},[t._v(" "+t._s(e.name)+t._s(i!=t.songListData[s].artsss.length-1?"/":"")+" ")])})),0)])})),0)])]):t._e(),a("div",{staticClass:"play-page"},[a("van-popup",{style:{height:"100%"},attrs:{overlay:!1,"close-on-click-overlay":!1,position:"bottom"},model:{value:t.showPlayPage.a,callback:function(e){t.$set(t.showPlayPage,"a",e)},expression:"showPlayPage.a"}},[a("div",{staticClass:"bg",style:0!=t.songListData.length?"background-image:url("+t.songListData[t.songIndex].imgUrl+")":""}),a("van-nav-bar",{attrs:{"left-arrow":""},on:{"click-left":function(e){return t.togglePlayPage({v:!1})}},scopedSlots:t._u([{key:"title",fn:function(){return[a("div",[a("div",[t._v(" "+t._s(t.songUrlData?t.songListData[t.songIndex].name:"")+" ")]),a("div",{staticClass:"goFlex",staticStyle:{"font-size":"12px"}},[t._l(t.songUrlData?t.songListData[t.songIndex].artsss:"",(function(e,s){return a("div",{key:s,on:{click:function(a){return t.goSingerDetail(e.id)}}},[t._v(" "+t._s(e.name)+t._s(s!=t.songListData[t.songIndex].artsss.length-1?"/":"")+" ")])})),a("van-icon",{attrs:{name:"arrow"}})],2)])]},proxy:!0}])}),a("div",{staticClass:"content"},[t.isCover?a("div",{staticClass:"the-cover",on:{click:t.toggleCover}},[a("div",{staticClass:"cover-box"},[a("div",{staticClass:"cover-item",class:t.iconState.play?"active":"",style:0!=t.songListData.length?"background-image:url("+t.songListData[t.songIndex].imgUrl+")":""})]),a("div",{staticClass:"function-box"},t._l(t.functionItem,(function(t,e){return a("div",{key:e,staticClass:"function-item"},[a("van-icon",{attrs:{name:t.icon}})],1)})),0)]):a("div",{staticClass:"the-lyrics"},[a("div",{staticClass:"volume-box"},[a("div",{staticClass:"volume-icon"},[a("van-icon",{attrs:{name:"volume-o"}})],1),a("div",{staticClass:"volume-item"},[a("div",{staticClass:"volume-item-active",style:"width:"+t.volume+"%",on:{click:t.clickVolumen}}),a("div",{staticClass:"volume-item-no-active",on:{click:t.clickVolumen}}),a("div",{staticClass:"volume-point",style:"left:"+t.volume+"%"})])]),a("div",{staticClass:"lyrics-box",on:{click:t.toggleCover}},[a("div",{staticStyle:{"font-size":"24px"}},[t._v(" "+t._s(1==t.lyric.length?t.lyric[0]:"")+" ")]),t.lyric.length>1?a("div",{staticClass:"lyrics-item-box",style:"top:calc(50% + "+t.goTop+")"},t._l(t.lyric,(function(e,s){return a("div",{key:s,staticClass:"lyrics-item",class:s==t.lyricIndex?"active":""},[t._v(" "+t._s(e.text)+" ")])})),0):t._e()])])]),a("div",[a("div",{staticClass:"progress-bar-box"},[a("div",{staticClass:"time-box"},[t._v(t._s(t.playTime.min))]),a("div",{staticClass:"progress-bar"},[a("div",{staticClass:"progress-bar-after",style:"width:"+t.percent+"%",on:{click:t.clickProgressBar}}),a("div",{staticClass:"progress-bar-pre",on:{click:t.clickProgressBar}}),a("div",{staticClass:"progress-bar-point",style:"left:"+t.percent+"%",on:{touchstart:t.moveProgressBar,touchmove:t.test,touchend:t.test2}})]),a("div",{staticClass:"time-box"},[t._v(t._s(t.allTime.min))])]),a("div",{staticClass:"switchs"},[a("div",{staticClass:"switch-item",on:{click:t.toggleOrder}},[t.iconState.order[0].v?a("i",{staticClass:"iconfont"},[t._v("")]):t.iconState.order[1].v?a("i",{staticClass:"iconfont"},[t._v("")]):t.iconState.order[2].v?a("i",{staticClass:"iconfont"},[t._v("")]):t._e()]),a("div",{staticClass:"switch-item",on:{click:t.preSong}},[a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"switch-item",on:{click:t.togglePlay}},[t.iconState.play?a("i",{staticClass:"iconfont"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"switch-item",on:{click:t.nextSong}},[a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"switch-item",on:{click:t.toggleLittlePlayList}},[a("i",{staticClass:"iconfont"},[t._v("")]),a("audio",{ref:"ado",staticStyle:{display:"none"},attrs:{id:"ado",autoplay:0!=t.songUrlData.length?null!=t.songUrlData[t.songIndex].url:"",controls:"",src:0!=t.songUrlData.length&&null!=t.songUrlData[t.songIndex].url?t.songUrlData[t.songIndex].url:"0"},on:{ended:t.audioEnd,canplay:t.startPlaying,timeupdate:t.timeupdate}})])])])],1)],1)],1)},L=[],P=a("2f62"),S=a("2f14"),I={data(){return{isLittlePlayList:!1,lyricIndex:0,goTop:0,betweenPos:0,beginPos:0,percent:0,isCover:!0,preUrl:"not a music",preState:!1,songData:{},functionItem:[{icon:"like-o"},{icon:"down"},{icon:"music-o"},{icon:"more-o"},{icon:"bars"}]}},computed:{...Object(P["b"])(["isPlaying","showPlayPage","songId","songIndex","songUrlData","songListData","iconState","allTime","playTime","volume","lyric"])},methods:{littlePlayListChangeSong(t){this.$store.commit("littlePlayListChangeSong",t)},toggleLittlePlayList(){this.isLittlePlayList=!this.isLittlePlayList},clickVolumen(t){let e=Number(t.offsetX)/Number(t.target.parentNode.clientWidth);this.$store.commit("set",{name:"volume",v:100*e}),this.$refs.ado.volume=e},clickProgressBar(t){let e=Number(t.offsetX)/Number(t.target.parentNode.clientWidth);this.$refs.ado.currentTime=this.$refs.ado.duration*e},moveProgressBar(t){},test(t){},test2(t){},timeupdate(){let t=S["a"].calcMilliseconds(1e3*this.$refs.ado.currentTime),e=this.$refs.ado.currentTime,a={min:t,millisec:e};this.$store.commit("set",{name:"playTime",v:a}),this.percent=this.playTime.millisec/this.allTime.millisec*100;let s=Math.ceil(this.$refs.ado.currentTime);this.lyric.map((t,e)=>{s==t.time&&(this.goTop=28*-e+"px",this.lyricIndex=e)})},startPlaying(){let t=S["a"].calcMilliseconds(1e3*this.$refs.ado.duration),e=this.$refs.ado.duration,a={min:t,millisec:e};this.$store.commit("set",{name:"allTime",v:a}),this.$refs.ado.volume=.5,a=100*this.$refs.ado.volume,this.$store.commit("set",{name:"volume",v:a})},audioEnd(){if(this.$store.commit("togglePlay",!1),1==this.iconState.order[2].v&&(this.$store.commit("togglePlay",!0),this.$refs.ado.play()),1==this.iconState.order[0].v&&(this.nextSong(),this.$store.commit("togglePlay",!0)),1==this.iconState.order[1].v){let t=Math.floor(Math.random()*(this.songListData.length-1));this.$store.commit("nextSong",t),this.$store.commit("togglePlay",!0)}},goSingerDetail(t){this.togglePlayPage({v:!1}),this.$router.push({path:"/singerdetail",query:{id:t}})},toggleCover(){this.isCover=!this.isCover},toggleOrder(){this.$store.commit("toggleOrder")},togglePlay(){if(!this.$refs.ado.duration)return this.$toast.fail({message:"这首歌无法播放！",forbidClick:!0,duration:1e3,loadingType:"spinner"}),void setTimeout(()=>{this.nextSong()},1500);1==this.iconState.play?this.$refs.ado.pause():this.$refs.ado.play(),this.$store.commit("togglePlay",!this.iconState.play)},getSongUrl(){this.$toast.loading({type:"loading",message:"请稍等",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({methods:"get",url:"/song/url",params:{id:this.songId}}).then(t=>{this.$toast.clear(),this.songData.url!=t.data.data[0].url&&(this.songData=t.data.data[0])}).catch(t=>{this.$toast.clear(),console.log("err ==> ",t)})},togglePlayPage(t){this.$store.commit("togglePlayPage",t)},nextSong(){if(1!=this.iconState.order[1].v)this.$store.commit("nextSong");else{let t=Math.floor(Math.random()*(this.songListData.length-1));this.$store.commit("nextSong",t)}},preSong(){if(1!=this.iconState.order[1].v)this.$store.commit("preSong");else{let t=Math.floor(Math.random()*(this.songListData.length-1));this.$store.commit("preSong",t)}}},updated(){0!=this.showPlayPage.a&&this.songUrlData&&(this.songUrlData[this.songIndex].url!=this.preUrl&&(this.preUrl=this.songUrlData[this.songIndex].url,this.$store.commit("togglePlay",!0)),this.songUrlData[this.songIndex].url?this.songUrlData[this.songIndex].url&&this.preState&&(this.$store.commit("togglePlay",!0),this.preState=!1):(this.preState=!0,this.$store.commit("togglePlay",!1)))}},D=I,_=(a("7c55"),a("2877")),$=Object(_["a"])(D,C,L,!1,null,null,null),w=$.exports,T=a("8c4f");k["a"].use(T["a"]);const U=[{path:"/main",name:"Main",component:()=>a.e("chunk-3a75d3db").then(a.bind(null,"cd56")),children:[{path:"/my",name:"My",component:()=>a.e("chunk-ffea5f44").then(a.bind(null,"8fc1"))},{path:"/recommended",name:"Recommended",component:()=>a.e("chunk-7540340c").then(a.bind(null,"54fc"))},{path:"/video",name:"Video",component:()=>a.e("chunk-bca15602").then(a.bind(null,"f560"))},{path:"/mymusic",name:"Mymusic",component:()=>a.e("chunk-70ca9035").then(a.bind(null,"7f48"))}]},{path:"/login",name:"Login",component:()=>a.e("chunk-37f784d8").then(a.bind(null,"a55b"))},{path:"/songlistdetail",name:"Songlistdetail",component:()=>a.e("chunk-7af83279").then(a.bind(null,"9e37"))},{path:"/play",name:"Play",component:()=>a.e("chunk-29ec111e").then(a.bind(null,"8363"))},{path:"/singerdetail",name:"Singerdetail",component:()=>a.e("chunk-698b8f0c").then(a.bind(null,"fc9e"))},{path:"*",redirect:{name:"Login"}}],O=new T["a"]({routes:U});var M=O,j=a("bc3a"),E=a.n(j),N=a("a7fe"),B=a.n(N);k["a"].use(B.a,E.a),E.a.defaults.baseURL="http://localhost:3000",k["a"].use(u["a"]),k["a"].use(P["a"]);var A=new P["a"].Store({state:{userInfo:{},iconState:{play:!1,order:[{v:!0,name:"循环播放"},{v:!1,name:"随机播放"},{v:!1,name:"单曲循环"}],index:0},isPlaying:!1,showPlayPage:{a:!1},songIndex:"",songId:0,songListData:[],songUrlData:[],allTime:{min:0,millisec:0},playTime:{min:0,millisec:0},volume:0,lyric:[]},mutations:{littlePlayListChangeSong(t,e){t.songIndex=e,t.songId=t.songListData[t.songIndex].id,E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)})},setUserInfo(t,e){t.userInfo=e},togglePlay(t,e){t.iconState.play=e},onlyOpenPlayPage(t){t.showPlayPage.a=!0},togglePlayPage(t,e){t.showPlayPage.a=e.v,e.v&&(E()({methods:"get",url:"/lyric",params:{id:e.id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)}),(e.id&&e.songUrlData||e.songListData)&&(t.songId=e.id,t.songUrlData=e.songUrlData,t.songListData=e.songListData,t.songIndex=e.index))},nextSong(t,e){if(1==t.iconState.order[1].v)return t.songIndex=e,t.songId=t.songListData[t.songIndex].id,void E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)});t.songIndex<t.songListData.length-1?(t.songIndex++,t.songId=t.songListData[t.songIndex].id,E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)})):(t.songIndex=0,t.songId=t.songListData[t.songIndex].id,E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)}))},preSong(t,e){if(1==t.iconState.order[1].v)return t.songIndex=e,t.songId=t.songListData[t.songIndex].id,void E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)});t.songIndex>0?(t.songIndex--,t.songId=t.songListData[t.songIndex].id,E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)})):(t.songIndex=t.songListData.length-1,t.songId=t.songListData[t.songIndex].id,E()({methods:"get",url:"/lyric",params:{id:t.songListData[t.songIndex].id}}).then(e=>{e.data.lrc?t.lyric=S["a"].formatLyric(e.data.lrc.lyric):t.lyric=["暂时没有歌词/轻音乐"]}).catch(t=>{console.log("err ==> ",t)}))},toggleOrder(t){t.iconState.index<2?t.iconState.index++:t.iconState.index=0,t.iconState.order.map(t=>{t.v=!1}),t.iconState.order[t.iconState.index].v=!0},set(t,e){t[e.name]=e.v}},actions:{},modules:{}});a("499a");k["a"].use(s["a"]).use(i["a"]).use(n["a"]).use(o["a"]).use(r["a"]).use(l["a"]).use(c["a"]).use(d["a"]).use(g["a"]).use(u["a"]).use(h["a"]).use(m["a"]).use(f["a"]).use(v["a"]).use(p["a"]).use(y["a"]).use(b["a"]).use(x["a"]),k["a"].use(B.a,E.a),E.a.defaults.baseURL="http://localhost:3000",k["a"].config.productionTip=!1,new k["a"]({router:M,store:A,render:t=>t(w)}).$mount("#app")},"7c55":function(t,e,a){"use strict";var s=a("2395"),i=a.n(s);i.a}});
//# sourceMappingURL=app.446988ab.js.map