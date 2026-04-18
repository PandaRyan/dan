const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    birthYear: {type: String, required: true, unique: true},
    state: {type: String, required: true},
    incomeCategory: {type: String, required: true}    
})

module.exports = mongoose.model('UserProfile', userProfileSchema)