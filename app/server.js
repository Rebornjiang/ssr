const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const resolvePath = require('../build/utils/path')
const createDevRenderer = require('./dev/createDevRenderer')


let renderer = null
const isProd = process.env.NODE_ENV === 'production' ? true : false
let loadingRenderer = null

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
  loadingRenderer = createDevRenderer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      // ……renderer 的其他选项
      template,
      clientManifest
    })
  })
}





// 负责渲染的 render 函数
const render = (req, res) => {
  renderer.renderToString({ title: 'hello SSR' }, (err, html) => {
    console.log(html)
    if (err) return res.status(500).end('渲染失败')
    res.end(html)
  })
}

server.use('/dist', express.static('./dist'))

server.get('*', isProd ? render : async (req, res) => {
  await loadingRenderer
  render(req, res)
})

server.listen(8080)