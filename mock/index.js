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
router.get('/manage/intermediaries/lists', (req, res) => res.json(require('./data/intermediaries.json')))
router.get('/manage/intermediaries/edit', (req, res) => res.json(require('./data/intermEdit.json')))
router.get('/manage/agent/group/lists', (req, res) => res.json(require('./data/agentGroups.json')))
router.get('/manage/agent/search/users', (req, res) => res.json(require('./data/agent.json')))
router.get('/manage/agent/search/groups', (req, res) => res.json(require('./data/agentGroups.json')))
// router.get('/manage/seller/users/lists', (req, res) => res.json(require('./data/sellerLists.json')))
router.get('/manage/seller/groups/lists', (req, res) => res.json(require('./data/sellerListSearchGroups.json')))
router.get('/api/get/reservations/detail', (req, res) => res.json(require('./data/reservationsDetail.json')))


module.exports = router
