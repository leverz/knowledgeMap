const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

router.get('/', (ctx) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream('./views/index.html')
})
router.get('/ai', async (ctx) => {
  ctx.type = 'application/json'
  const data = fs.readFileSync('./data/AI.json')
  ctx.body = data
})
app.use(router.routes())
app.listen(3000)
console.log('App listening on port 3000!')
