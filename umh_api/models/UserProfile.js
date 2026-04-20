const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    birthYear: {type: String, required: true},
    state: {type: String, required: true},
    incomeCategory: {type: String, required: true}    
})

module.exports = mongoose.model('UserProfile', userProfileSchema)