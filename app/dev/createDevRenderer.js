const resolvePath = require('../../build/utils/path')
const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack');







module.exports = (server, createRenderer) => {
  let load, template, serverBundle, clientManifest
  const promise = new Promise((resolve, reject) => load = resolve)


  watchTemplate()


  watchServerBundle()


  // 更新 renderer 
  const updateRenderer = () => {
    if (template && serverBundle && clientManifest) {
      createRenderer(template, serverBundle, clientManifest)
      load()
    }
  }

  // 监听 bundle
  function watchTemplate() {
    // 处理 template
    chokidar.watch(resolvePath('public/index.template.html')).on('change', (event, path) => {
      template = fs.readFileSync(resolvePath('public/index.template.html'), 'utf-8')
      console.log('template update')
      update()
    })
  }

  // 监听 serverBundle
  function watchServerBundle() {
    const config = require(resolvePath('build/webpack.server.config.js'))
    console.log(config, 'webpack 方法执行错误')
    const compiler = webpack(config, (err, stats) => {
      console.log(err)
    })
    return
    compiler.watch({}, (err, stats) => {
      console.log('watch server')
      if (err) throw new Error(err)
      if (stats.hasErrors) return
      // console.log(stats)
    })
  }

  return promise
}
