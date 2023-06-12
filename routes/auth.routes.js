const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
  '/register',
  [
    check('name', 'Name is too short')
      .isLength({min: 1}),
    check('email', 'Email is incorrect').isEmail(),
    check('password', 'Password is too short')
      .isLength({min: 1})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Data is incorrect'
      })
    }

    const {name, email, password} = req.body

    const candidate = await User.findOne({email})

    if(candidate) {
      return res.status(400).json({message: 'This user is already registered'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({name, email, password: hashedPassword})

    await user.save()

    res.status(201).json({message: 'The user created'})

  } catch(e) {
    res.status(500).json({message: 'Something went wrong. Try again.'})
  }
})

router.post(
  '/login', 
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
  ],
  async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Data is incorrect'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) {
      return res.status(400).json({message: 'User is not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({message: 'Enter correct password'})
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get('jwtSecret'),
      {expiresIn: '1h'}
    )

    res.json({token, userId: user.id})

  } catch(e) {
    res.status(500).json({message: 'Something went wrong. Try again.'})
  }

})

router.get(
  '/home', 
  async (req, res) => {
try {
  const users = await User.find({})
  res.json(users)
  console.log(users)
} catch(e) {
  res.status(500).json({message: 'Something went wrong. Try again.'})
}})

module.exports = router