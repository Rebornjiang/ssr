const resolvePath = require('./utils/path')
const { merge } = require('webpack-merge')

const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: resolvePath('src/entry-server.js'),

  // 这允许 webpack 以 Node 适用方式处理模块加载
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',
  output: {
    filename: 'server-bundle.js',
    // 此处告知 入口起点的返回值将分配给 module.exports 对象， 使用 Node 风格导出模块(Node-style exports)
    // 即可以通过 require 方式导入
    libraryTarget: 'commonjs2'

  },
  externals: [nodeExternals({
    // 白名单中的资源依然正常打包
    allowlist: [/\.css$/]
  })],
  plugins: [
    new VueSSRServerPlugin()
  ]

})  