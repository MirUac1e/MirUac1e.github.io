import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ajax相关
import axios from 'axios'
import VueAxios from 'vue-axios'



import {
  NavBar,
  Button,
  Form,
  Field,
  Icon,
  Popup,
  Notify,
  Toast,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Search,
  Tab,
  Tabs,
  Skeleton,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Stepper,
  SwipeCell,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Empty,
  AddressEdit,
  AddressList,
  Area,
  Uploader,
  Dialog,
} from 'vant';

Vue.use(Popup)
  .use(Icon)
  .use(Field)
  .use(Form)
  .use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Notify)
  .use(Skeleton)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Stepper)
  .use(SwipeCell)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(Empty)
  .use(AddressEdit)
  .use(AddressList)
  .use(Area)
  .use(Uploader)
  .use(Dialog)

//全局注册过滤器, 一般用于格式化数
Vue.filter('formatDate', (value, format) => {
  //value: 需要格式化的数据
  //format: 指定格式 yyyy-MM-dd hh:mm:ss

  // console.log('format ==> ', format);

  let date = new Date(value);

  //获取年份
  let year = date.getFullYear();
  // console.log('year ==> ', year);
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    let content = RegExp.$1;
    // console.log('content ==> ', content);
    format = format.replace(content, year.toString().slice(4 - content.length));

    // console.log('format ==> ', format);
  }

  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in o) {
    //构造动态正则
    let reg = new RegExp(`(${key}+)`);
    // console.log('reg ==> ', reg);
    if (reg.test(format)) {
      //获取匹配组的内容
      let content = RegExp.$1;
      // console.log('content ==> ', content);
      let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
      // console.log('k ==> ', k);
      format = format.replace(content, k);
      // console.log('format ==> ', format);
    }
  }

  return format;
})

// 注册ajax相关插件
Vue.use(VueAxios, axios)

//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

//添加一个Vue的原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



// /deep/深层改变css
// 图片路径前面加 request