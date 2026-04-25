var express = require('express');
var router = express.Router();
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');

router.post('/signin', async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({status: "failed", message: "Please provide both email and password"});
        }

        //check user existence
        const user = await User.findOne({email: email});
        if (!user)
            return res.status(404).json({status: "failed", message: "User not found"});

        //check password
        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser)
            return res.status(400).json({status: "failed", message: "Invalid Password"});

        const token = jwt.sign(
            { _id: user._id},
            process.env.TOKEN_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({status: "success", token: token, name: user.name, onboarding: user.onboarding});

    } catch (err) {
        console.error("Login Crash Prevented:", err.message);
        res.status(500).json({status: "failed", message: "Internal Server Error"});
    }
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

        const token = jwt.sign(
            { _id: savedUser._id},
            process.env.TOKEN_SECRET,
            { expiresIn: '2h' }
        )

        res.status(201).json({status: "success", token: token, name: name})


    } catch (err) {
        res.status(500).json({status: "failed", message: err.message})
    }
});

router.post('/signup/onboarding', verify, async (req, res) => {
    try {
        const { birthYear, state, incomeCategory } = req.body

        const userProfileData = new UserProfile({
            user: req.user._id,
            birthYear,
            state,
            incomeCategory
        })

        const savedData = await userProfileData.save();
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { onboarding: true },
            { new: true }
        )
            
        res.status(201).json({status: "success"})

    } catch (err) {
        console.log(err)
        res.status(500).json({status: "failed", error: err})
    }
})

router.get('/getUserDetails', verify, async(req, res) => {
    try {
        const userdetails = await UserProfile.findOne({user: req.user._id}).select('birthYear state incomeCategory');
        res.status(200).json({
            status: "success", 
            birthyear: userdetails.birthYear,
            state: userdetails.state,
            incomeCategory: userdetails.incomeCategory
        });
    } catch (err) {
        console.error("Error fetching user details:", err.message);
        res.status(500).json({status: "failed", message: "Internal Server Error"});
    }
})

module.exports = router