const express = require('express')
const router = express.Router() 
const {
  userRegister, 
  userLogin, 
  userInfo
} = require('../controllers/userController')

const protect =  require('../middleware/authMiddleware')

router.route('/').post(userRegister)
router.route('/login').post(userLogin)
router.route('/me').get(protect, userInfo)

module.exports = router
