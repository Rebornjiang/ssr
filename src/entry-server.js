import { createApp } from './app'

// 服务每次渲染的时候会调用当前方法
export default async context => {
  const { url } = context
  const { app, router } = createApp()

  router.push(url)
  // 等待路由与异步组件相互匹配完成
  await new Promise(router.onReady.bind(router))
  
  return app
}