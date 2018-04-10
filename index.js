const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

router.get('/', (ctx) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream('./views/index.html')
})
app.use(router.routes())
app.listen(3000)
console.log('App listening on port 3000!')
