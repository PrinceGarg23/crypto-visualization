const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'https://ws.coincap.io',
      changeOrigin: true,
      ws: true,
    })
  );
};
