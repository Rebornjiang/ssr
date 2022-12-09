import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router,store } = createApp()
if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server

  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})