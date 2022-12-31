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
    throw new Error('Email should be unique!')
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
      email: user.email,
      token: generateToken(user.id)
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
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(!user){
    res.status(400)
    throw new Error('Invalid user!')
  }
  else{
    if(await bcrypt.compare(password, user.password)){
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      })
    }
  }

  res.status(200).json({message: 'Incorrect password!'})
})

// @desc    Get user data
// @route   POST /api/users/me 
// @access  Private
const userInfo = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email
  })
})


// Generate JWT 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d'
  })
}

module.exports = {
  userLogin,
  userRegister,
  userInfo
}
