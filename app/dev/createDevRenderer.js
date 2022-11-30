const resolvePath = require('../../build/utils/path')
const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = (server, createRenderer) => {
  let ready, template, serverBundle, clientManifest
  const promise = new Promise((resolve, reject) => ready = resolve)

  // 更新 renderer 
  const updateRenderer = () => {
    if (template && serverBundle && clientManifest) {
      createRenderer({ template, serverBundle, clientManifest })
      ready()
    }
  }

  // 监听 bundle
  function watchTemplate() {
    // if (!template) {

    // }
    // initial template
    template = fs.readFileSync(resolvePath('public/index.template.html'), 'utf-8')

    // 处理 template
    chokidar.watch(resolvePath('public/index.template.html')).on('change', (event, path) => {
      template = fs.readFileSync(resolvePath('public/index.template.html'), 'utf-8')
      console.log('template update')
      updateRenderer()
    })
  }

  // 监听 serverBundle
  function watchServerBundle() {
    const config = require(resolvePath('build/webpack.server.config.js'))
    const compiler = webpack(config)
    webpackDevMiddleware(compiler, { stats: 'errors-only' })
    // 通过往 webpack 中注册 hook，实现对于打包的监听
    compiler.hooks.done.tap('server', () => {
      // 借助 webpack 的 fs 模块来从内存中读取打包结果（基于 memofs）
      try {
        serverBundle = JSON.parse(compiler.outputFileSystem.readFileSync(resolvePath('dist/vue-ssr-server-bundle.json'), 'utf-8'))
      } catch (error) {
        throw error
      }
      updateRenderer()
    })
  }

  // 监听客户端
  function watchClientBundle() {
    const config = require(resolvePath('build/webpack.client.config.js'))
    // 1. 使用 webpack hot module 作为 webpack 插件来监听编译器的变化
    if (config.plugins && Array.isArray(config.plugins)) config.plugins.push(new webpack.HotModuleReplacementPlugin())

    // 2. 客户端与服务端建立 SSE 链接，以便服务端能够在编译器发生变化之后通知到客户端最更新; (将负责建立SSE链接的 代码也打包到客户端 app 文件中 )
    if (config.entry?.app ) config.entry.app = ['webpack-hot-middleware/client?reload=true',config.entry.app]

    // 3. 注意开发环境不要使用 content:hash 这种文件命名方式，服务器资源发生变化会重新加载，无法实现热更新效果
    if(config.output?.filename)config.output.filename = '[name].js'

    const compiler = webpack(config)
    const clientDevMiddleware = webpackDevMiddleware(compiler, { stats: 'errors-only' })

    // 注册 hook
    compiler.hooks.done.tap('client', () => {
      try {
        clientManifest = JSON.parse(compiler.outputFileSystem.readFileSync(resolvePath('dist/vue-ssr-client-manifest.json'), 'utf-8'))
      } catch (error) {
        throw error
      }
      updateRenderer()
    })

    /**
     * ！！！important 将打包到内存中的文件，通过 express 中间件来对外进行公开
     * - 若是没有公开，浏览器加载不了客户端打包的 js 文件
     * */
    server.use(clientDevMiddleware)
    
    // 挂载热更新中间件
    server.use(webpackHotMiddleware(compiler))
  }

  // 流程
  watchTemplate()
  watchServerBundle()
  watchClientBundle()
  updateRenderer()
  return promise
}
