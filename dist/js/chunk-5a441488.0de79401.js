(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a441488"],{"2f14":function(e,s,t){"use strict";t.d(s,"a",(function(){return o}));class a{queryString(e){let s="";for(let t in e)s+=`${t}=${e[t]}&`;return s.slice(0,-1)}}const o=new a},"4f3a":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"forget"},[t("van-nav-bar",{style:{"z-index":2},attrs:{title:"密码找回","left-text":"返回","left-arrow":"",fixed:!0},on:{"click-left":e.back}}),t("div",{staticClass:"forget-box"},[t("div",{staticClass:"title"},[e._v("忘记密码？")]),t("div",{staticClass:"en-titile"},[e._v("Retrieve the password here")]),t("van-form",{staticClass:"clearfix"},[t("van-field",{attrs:{label:"手机号",placeholder:"手机号"},model:{value:e.userInfo.phone,callback:function(s){e.$set(e.userInfo,"phone",s)},expression:"userInfo.phone"}}),t("van-field",{attrs:{"right-icon":e.isPassword?"closed-eye":"eye-o",type:e.isPassword?"password":"text",placeholder:"新的密码",label:"新的密码",autocomplete:"off"},on:{"click-right-icon":e.passwordClick},model:{value:e.userInfo.newPassword,callback:function(s){e.$set(e.userInfo,"newPassword",s)},expression:"userInfo.newPassword"}}),t("van-field",{attrs:{center:"",clearable:"",label:"邮箱验证码",placeholder:"请输入邮箱验证码"},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-button",{attrs:{size:"small",type:"primary",color:"#0c34ba",disabled:e.isSend},on:{click:e.sendCheckCode}},[e._v(" "+e._s(e.text)+" ")])]},proxy:!0}]),model:{value:e.userInfo.email,callback:function(s){e.$set(e.userInfo,"email",s)},expression:"userInfo.email"}}),t("van-field",{attrs:{label:"验证码",placeholder:"请输入验证码"},model:{value:e.userInfo.checkCode,callback:function(s){e.$set(e.userInfo,"checkCode",s)},expression:"userInfo.checkCode"}}),t("div",{staticClass:"clearfix"},[t("div",{staticClass:"fr goLogin",on:{click:e.goLogin}},[e._v(" 已有帐号?立即登录 ")])]),t("div",{staticClass:"form-button",staticStyle:{margin:"45px 16px"}},[t("van-button",{attrs:{block:"",round:"",size:"large",type:"info",color:"#0c34ba"},on:{click:e.sumbit}},[e._v(" 找回密码 ")])],1)],1)],1)],1)},o=[],r=t("2f14"),i=t("e3a8"),n={data(){return{isPassword:!0,userInfo:{email:"",checkCode:"",newPassword:"",phone:""},text:"发送验证码",isSend:!1}},created(){},methods:{back(){this.$router.go(-1)},goLogin(){this.$router.push({name:"Login"})},passwordClick(){this.isPassword=!this.isPassword},sendCheckCode(){let e={email:{value:this.userInfo.email,reg:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,errorMsg:"邮箱格式不正确"}};if(i["a"].valid(e),!i["a"].valid(e))return;this.isSend=!0;let s=5,t=setInterval(()=>{this.text=s+"秒重新发送",s<0&&(this.text="发送验证码",this.isSend=!1,clearInterval(t)),s--},1e3);this.$toast.loading({message:"加载中",duration:0,forbidClick:!0,loadingType:"spinner"});let a=r["a"].queryString({appkey:this.appkey,email:this.userInfo.email});this.axios({method:"POST",url:"/emailValidCode",data:a}).then(e=>{this.$toast.clear(),this.$toast(e.data.msg),console.log(e)}).catch(e=>{this.$toast.clear(),console.log("错误 => ",e)})},sumbit(){let e={email:{value:this.userInfo.email,reg:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,errorMsg:"邮箱格式不正确"},phone:{value:this.userInfo.phone,reg:/^1[3-9]\d{9}$/,errorMsg:"手机号格式不正确"},newPassword:{value:this.userInfo.newPassword,reg:/^[A-Za-z]\w{5,15}$/,errorMsg:"密码格式不正确,请确保以字母开头且有数字组合"},checkCode:{value:this.userInfo.checkCode,reg:/^\d{6}$/,errorMsg:"验证为6位数字"}};if(i["a"].valid(e),!i["a"].valid(e))return;this.$toast.loading({message:"加载中",duration:0,forbidClick:!0,loadingType:"spinner"});let s=r["a"].queryString({appkey:this.appkey,validCode:this.userInfo.checkCode});this.axios({method:"POST",url:"/checkValidCode",data:s}).then(e=>{this.$toast.clear(),this.$toast(e.data.msg),"K001"==e.data.code&&this.sendChangePassword()}).catch(e=>{this.$toast.clear(),console.log("错误 => ",e)})},sendChangePassword(){this.$toast.loading({message:"加载中",duration:0,forbidClick:!0,loadingType:"spinner"});let e=r["a"].queryString({appkey:this.appkey,phone:this.userInfo.phone,password:this.userInfo.newPassword});this.axios({method:"POST",url:"/retrievePassword",data:e}).then(e=>{this.$toast.clear(),this.$toast(e.data.msg),"L001"==e.data.code&&setTimeout(()=>{this.$router.push({name:"Login"})},1e3)}).catch(e=>{this.$toast.clear(),console.log("错误 => ",e)})}}},l=n,c=(t("bc65"),t("2877")),d=Object(c["a"])(l,a,o,!1,null,"2a693122",null);s["default"]=d.exports},bc65:function(e,s,t){"use strict";var a=t("cb8f"),o=t.n(a);o.a},cb8f:function(e,s,t){},e3a8:function(e,s,t){"use strict";t.d(s,"a",(function(){return i}));t("9a83");var a=t("f564"),o=t("2b0e");o["a"].use(a["a"]);class r{valid(e){for(let s in e)if(!e[s].reg.test(e[s].value))return Object(a["a"])({type:"warning",message:e[s].errorMsg}),!1;return!0}}const i=new r}}]);
//# sourceMappingURL=chunk-5a441488.0de79401.js.map