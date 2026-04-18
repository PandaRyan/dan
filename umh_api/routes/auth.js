var express = require('express');
var router = express.Router();
const User = require('../models/Users')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    res.status(200).json({message: "login success"})
});

router.post('/signup', async (req, res) => {
    let { name, email, password } = req.body
    
    
});