const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const { MongoError } = require('mongodb');

module.exports = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({status: "failed", message: "access denied, no token"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;

        const user = await User.findById(req.user._id);
        if (!user)
            return res.status(404).json({status: "failed", message: "user not found"})

        next(); //pass
    } catch (err) {
        res.status(400).json({status: "failed", message: err})
    }
}