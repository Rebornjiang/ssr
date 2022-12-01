import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'
Vue.use(Router)

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index.vue')
      },

      {
        path: '*',
        name: 'Error404',
        component: () => import('@/views/errors/404.vue')
      }
    ]
  })

  return router
}