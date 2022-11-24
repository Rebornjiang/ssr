const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync('./public/index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
  // ……renderer 的其他选项
  template,
  clientManifest
})

const server = express()

server.get('*', (req, res) => {
  renderer.renderToString({ title: 'hello SSR' }, (err, html) => {
    console.log(html)
    if (err) return res.status(500).end('渲染失败')
    res.end(html)
  })
})

server.listen(8080)