const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const resolvePath = require('../build/utils/path')
const createDevRenderer = require('./dev/createDevRenderer')


let renderer = null
const isProd = process.env.NODE_ENV === 'production' ? true : false
let onReady = null

const server = express()

if (isProd) {
  const template = fs.readFileSync(resolvePath('public/index.template.html'), 'utf-8')
  const serverBundle = require(resolvePath('dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(resolvePath('dist/vue-ssr-client-manifest.json'))
  renderer = createBundleRenderer(serverBundle, {
    // ……renderer 的其他选项
    template,
    clientManifest
  })
} else {
  onReady = createDevRenderer(server, ({ template, serverBundle, clientManifest }) => {
    console.log('reset renderer')
    renderer = createBundleRenderer(serverBundle, {
      // ……renderer 的其他选项
      template,
      clientManifest
    })
  })
}


// 负责渲染的 render 函数
const render = (req, res) => {
  const context = { title: 'hello SSR', url: req.url }
  console.log('aaaaaaaaaa，没有输出？')
  renderer.renderToString(context, (err, html) => {
    console.log(err)
    if (err) return res.status(500).end('渲染失败')
    res.end(html)
  })
}

server.use('/dist', express.static('./dist'))

server.get('*', isProd ? render : async (req, res) => {
  await onReady
  render(req, res)
})

server.listen(8080)