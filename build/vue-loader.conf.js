'use strict'
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: merge(
    utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    {
      ts: ['babel-loader', 'ts-loader', 'tslint-loader'],
      tsx: 'babel-loader!ts-loader'
    }
  ),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  // 添加开启 TSLint 进行预处理
  // ts: ['babel-loader', 'ts-loader', 'tslint-loader']
}
