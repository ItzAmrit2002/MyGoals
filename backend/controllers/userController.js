const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Set User
//@route POST /api/users
//@access PUBLIC

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        //Not sending user as the result because the object will also contain the hashed-password
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        })
    }
    else
    {
        res.status(400)
        throw new error("Please enter valid inputs")
    }

     


    res.json({message: 'Register User'})
})

//@desc Authenticate a User
//@route POST /api/login
//@access PUBLIC

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            message: "Successfully logged in"
        })
    }
    else{
        res.status(400)
        throw new Error('User not found')
    }
    res.json({message: 'Login User'})
})

//@desc Get User Data
//@route GET /api/users/me
//@access PRIVATE
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
loginUser, getMe}