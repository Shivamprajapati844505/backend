const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// user login page
exports.login = async(req,res) => {
    const { email,password } = req.body;

    try{
        const user = await User.findOne({email});
        
        if(!user)
            return res.status(404).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch)
            return res.status(404).json({message:"Invalid Credentials"})

        const token = jwt.sign({id:user._id}, "Cheen Tapak Dam Dam", {expiresIn:"1h"});
        console.log(token);
        res.json({ token, user:{id: user._id, email: user.email} });
    } catch(err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}


// user signup page
exports.signup = async(req,res) =>{
    let { username,email,password } = req.body;

    try{
        let user = await User.findOne({email}); 
        if(user)
            return res.status(404).json({message:"User Already Exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;

        user = new User({ username,email,password });
        await user.save();
        const token = jwt.sign({id: user._id}, "Cheen Tapak Dam Dam", {expiresIn: '1h'})
        res.status(201).json({token, user: {id: user._id, email: user.email}})
    } catch(err){
        return res.status(500).json({message:"Server failed"});
    }
}