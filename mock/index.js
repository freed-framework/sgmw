/**
 * @file index.js
 * @author denglingbo
 *
 * mock 入口
 */
const express = require('express')
const router = express.Router()

router.options('*', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'TOKEN, Content-Type')
  res.end()
})

router.get('/api/get/book', (req, res) => res.json(require('./data/book')))
router.get('/api/get/hello', (req, res) => res.json(require('./data/hello.json')))
router.post('/api/login', (req, res) => {
  setTimeout(() => {
    res.json(require('./data/login.json'))
  }, 1000)
})

module.exports = router
