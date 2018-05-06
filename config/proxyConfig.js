/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
      '/api': {
        target: 'http://39.104.126.26',
        // zhangjian
        // target: 'http://210.41.121.166:8091',
        // target: 'http://39.104.126.26:8086',
        // yuwei
        // target: 'http://210.41.121.130:8092',
        // target: 'http://192.168.137.166:8091/api',
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
        target: 'http://39.104.126.26',
        // target: 'http://210.41.121.130:8092',
        changeOrigin: true,
        pathRewrite: {
          // '^/manage': ''
        }
      }
    }
  }
}
