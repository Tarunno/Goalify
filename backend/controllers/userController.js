const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users 
// @access  Public
const userRegister = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Empty required field(s)!')
  }
  
  // Check if user exists 
  const userExists = await User.findOne({email})
  
  if(userExists){
    res.status(400)
    throw new Error('User already exists!')
  }

  // Hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user 
  const user = await User.create({
    name,
    email,
    password: hashedPassword 
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } 
  else{
    res.send(400)
    throw new Error('Invalid user data!')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login 
// @access  Public
const userLogin = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'userLogin'})
})

// @desc    Get user data
// @route   POST /api/users/me 
// @access  Public
const userInfo = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'userInfo'})
})

module.exports = {
  userLogin,
  userRegister,
  userInfo
}
