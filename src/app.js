import Vue from 'vue'
import createRouter from '@/router/'
import VueMeta from 'vue-meta'
import createStore from '@/store/index'
Vue.use(VueMeta)

// 如果根组件没有 metaInfo 信息，需要全局混入一个 metaInfo，因为在 server 入口文件获取了 meta信息，不然服务端会抛出异常
Vue.mixin({
  metaInfo: {
    // titleTemplate: `$s - RebornJiang`
  }
})
import App from './App.vue'


// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
