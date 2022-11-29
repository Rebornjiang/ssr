import { createApp } from './app'

// 服务每次渲染的时候会调用当前方法
export default context => {
  const { app } = createApp()
  return app
}