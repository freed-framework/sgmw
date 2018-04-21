/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
      // '/res': {
      //   target: 'http://0.0.0.0:9999',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/res': ''
      //   }
      // }
    }
  },

  // 联调
  test: {
    proxyTable: {
      '/xxx': {
        // target: 'https://xxx.com',
        changeOrigin: true,
        pathRewrite: {
          // '^/manage': ''
        }
      }
    }
  }
}
