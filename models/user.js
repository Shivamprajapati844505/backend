const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
