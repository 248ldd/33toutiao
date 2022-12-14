import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 首屏加载速度很慢
// 路由懒加载
//   - 使用路由页面 再去请求他

// 懒加载chunk 默认的名字是模版的路径
// webpack魔法注释: /* webpackChunkName:"新名字" */ 就是你请求来的模版的名字
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"Search" */ '@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
