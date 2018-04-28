/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
      '/api': {
        target: 'http://39.104.126.26:8090/api',
        changeOrigin: true,
        pathRewrite: {
          // '^/res': ''
        }
      }
    }
  },

  // 联调
  test: {
    proxyTable: {
      '/api': {
        target: 'http://210.41.121.161:8080',
        changeOrigin: true,
        pathRewrite: {
          // '^/manage': ''
        }
      }
    }
  }
}
