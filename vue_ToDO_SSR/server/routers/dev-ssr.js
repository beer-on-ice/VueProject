const fs = require('fs') // 会把文件写入磁盘
const MemoryFS = require('memory-fs') // 不把文件写入磁盘
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const Router = require('koa-router')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // webpack compiler的输出目录是在memoryFS里面

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson() // 以 JSON 对象形式返回编译信息
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('新的bundle已生成')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '稍等片刻......'
    return
  }
  const { data } = await axios.get(
    'http://127.0.0.1:8081/public/vue-ssr-client-manifest.json'
  )
  // const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    data
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
