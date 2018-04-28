'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTEXT: '"test"',
  API_HOST: '"http://39.104.126.26/api"'
})
