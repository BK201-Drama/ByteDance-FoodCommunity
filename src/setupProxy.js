const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bk201-drama.app.cloudendpoint.cn/api',
      changeOrigin: true,
    })
  )
}