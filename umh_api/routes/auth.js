var express = require('express');
var router = express.Router();
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');

router.post('/signin', async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    //check user existence
    const user = await User.findOne({email: email})
    if (!user)
        return res.status(400).json({status: "failed", message: "User not found"})

    //check password
    const validUser = await bcrypt.compare(password, user.password)
    if (!validUser)
        return res.status(400).json({status: "failed", message: "Invalid Password"})

    const token = jwt.sign(
        { _id: user._id},
        process.env.TOKEN_SECRET,
        { expiresIn: '3h' }
    )

    res.status(200).json({status: "success", token: token})
});

router.post('/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body
        
        //check user existence
        const userExists = await User.findOne({ email: email})
        if (userExists)
            return res.status(400).json({status: "failed", message: "Existing account found with email"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            onboarding: false
        })

        const savedUser = await newUser.save();
        res.status(201).json({status: "success", token: token, name: name})


    } catch (err) {
        res.status(500).json({status: "failed", message: err.message})
    }
});

router.post('/signup/onboarding', verify, async (req, res) => {
    try {
        let { birthYear, state, incomeCategory } = req.body
        let { Authorization } = req.header

        const userProfileData = new UserProfile({
            user: req.user._id,
            birthYear: birthYear,
            state: state,
            incomeCategory: incomeCategory
        })

        const savedData = await userProfileData.save();
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { onboarding: true },
            { new: true }
        )
            
        res.status(201).json({status: "success"})

    } catch (err) {
        res.status(500).json({status: "failed", error: err})
    }
})

module.exports = router