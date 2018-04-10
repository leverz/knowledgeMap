const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const multer = require('koa-multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './data/'),
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})

router.get('/', (ctx) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream('./views/index.html')
})
router.get('/search/:tag', async (ctx) => {
  const tag = ctx.params.tag
  ctx.type = 'application/json'
  const data = fs.readFileSync(`./data/${tag}.json`)
  ctx.body = data
})
router.get('/upload', ctx => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream('./views/upload.html')
})
router.post('/upload', upload.single('upload'), async (ctx) => {
  const originName = ctx.req.file.originalName
  if (originName === 'AI.json') {
    ctx.assert(403, '已有该文件')
  }
  ctx.body = {
    code: 0,
    data: null
  }
})
app.use(router.routes())
app.listen(3000)
console.log('App listening on port 3000!')
