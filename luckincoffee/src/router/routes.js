export const routes = [
  {
    //登录
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    // 首页
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
        path: '/home',
        name: 'Home',
        component: () => import('../views/mainViews/Home')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/mainViews/Menu')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/mainViews/My')
      },
      {
        path: '/shopbag',
        name: 'Shopbag',
        component: () => import('../views/mainViews/Shopbag')
      }
    ]
  },
  {
    // 详情页
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    // 支付页面
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    // 新增地址页面
    path: '/addaddress',
    name: 'Addaddress',
    component: () => import('../views/Addaddress.vue')
  },
  {
    // 地址管理页面
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    // 帐号信息管理页面Account
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    // 订单页面
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    // 收藏页面
    path: '/like',
    name: 'Like',
    component: () => import('../views/Like.vue')
  },
  {
    // 帐号安全中心
    path: '/secure',
    name: 'Secure',
    component: () => import('../views/Secure.vue')
  },
  {
    // 找回密码页面
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/Forget.vue')
  },
  {
    // 搜索
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: "*",
    redirect: {
      name: 'Home'
    }
  }
]