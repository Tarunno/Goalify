const express = require('express')
const router = express.Router() 
const {
  userRegister, 
  userLogin, 
  userInfo
} = require('../controllers/userController')

router.route('/').post(userRegister)
router.route('/login').post(userLogin)
router.route('/me').get(userInfo)

module.exports = router
