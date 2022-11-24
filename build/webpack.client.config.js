const { merge } = require('webpack-merge')
const resolvePath = require('./utils/path')
const baseConfig = require('./webpack.base.config.js')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
console.log({resolvePath})

module.exports = merge(baseConfig, {
  entry: {
    app: resolvePath('src/entry-client.js')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime']
          }

        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'manifest'
    }
  },
  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})