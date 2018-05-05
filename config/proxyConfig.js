/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
      '/api': {
        // target: 'http://39.104.126.26:8090',
        // target: 'http://210.41.121.166:8091',
        target: 'http://39.104.126.26:8086',
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
        // target: 'http://39.104.126.26:8090/api',
        target: 'http://210.41.121.166:8091/api',
        changeOrigin: true,
        pathRewrite: {
          // '^/manage': ''
        }
      }
    }
  }
}
