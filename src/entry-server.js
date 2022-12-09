import { createApp } from './app'

// 服务每次渲染的时候会调用当前方法
export default async context => {
  const { url } = context
  const { app, router, store } = createApp()

  const meta = app.$meta() || {}

  console.log(meta)
  router.push(url)
  context.meta = meta
  // 等待路由与异步组件相互匹配完成
  await new Promise(router.onReady.bind(router))
  context.rendered = () => {
    // 在应用渲染完成以后，服务端 Vuex 容器中已经填充了状态数据
    // 这里手动的把容器中的状态数据放到 context 上下文中
    // Renderer 在渲染页面模板的时候会把 state 序列化为字符串串内联到页面中
    // window.__INITIAL_STATE__ = store.state
    context.state = store.state
  }
  return app
}