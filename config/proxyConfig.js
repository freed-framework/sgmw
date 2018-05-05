/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
      '/api': {
        target: 'http://39.104.126.26:8090',
        // target: 'http://192.168.137.249:8091',
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
        target: 'http://39.104.126.26:8090/api',
        // target: 'http://192.168.137.249:8091/api',
        changeOrigin: true,
        pathRewrite: {
          // '^/manage': ''
        }
      }
    }
  }
}
