import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
        path: '/my',
        name: 'My',
        component: () => import('../views/mainView/My.vue'),
      },
      {
        path: '/recommended',
        name: 'Recommended',
        component: () => import('../views/mainView/Recommended.vue'),
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('../views/mainView/Video.vue'),
      }, {
        path: '/mymusic',
        name: 'Mymusic',
        component: () => import('../views/mainView/Mymusic.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/songlistdetail',
    name: 'Songlistdetail',
    component: () => import('../views/Songlistdetail.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/singerdetail',
    name: 'Singerdetail',
    component: () => import('../views/Singerdetail.vue')
  },
  {
    path: "*",
    redirect: {
      name: 'Login'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router