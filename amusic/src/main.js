import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Icon,
  Button,
  Popup,
  Field,
  Form,
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  Search,
  IndexBar,
  IndexAnchor,Cell, CellGroup
} from 'vant';

Vue.use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Button)
  .use(Popup)
  .use(Field)
  .use(Form)
  .use(Toast)
  .use(NavBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Cell)
  .use(CellGroup)

Vue.use(VueAxios, axios)

//设置请求基础路径
// axios.defaults.baseURL = 'https://api.opendota.com/api'
axios.defaults.baseURL = 'http://localhost:3000'

//设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')