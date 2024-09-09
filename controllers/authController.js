const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const JWT_SECRET = "CheenTapakDamDam";

// user login page
exports.login = async(req,res) => {
    try{
        const { email,password,role } = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(404).json({message:"User not found"});
        
        if(role !== user.role)
            return res.status(404).json({message:"{Person doesn't exist with this code}"})
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch)
            return res.status(404).json({message:"Invalid Credentials"})

        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:"1h"});
        res.cookie('token', token, {
            expires: new Date(Date.now() + 3600000),  
            sameSite: 'Strict'  
        });
        
        res.json({ token, user:{id: user._id, email: user.email, role:user.role} });
    } catch(err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}


// user signup page
exports.signup = async(req,res) =>{
    let { username,email,password,role } = req.body;

    try{
        let user = await User.findOne({email}); 
        if(user)
            return res.status(404).json({message:"User Already Exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;

        user = new User({ username,email,password,role });
        await user.save();
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {
            expires: new Date(Date.now + 3600000)
        });

        res.status(201).json({token, user: {id: user._id, email: user.email, role:user.role}});
    } catch(err){
        return res.status(500).json({message:"Server failed"});
    }
}

exports.getProfile = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user)
            return res.status(404).json({message:"User not found"});

        res.json(user);
    } catch(err) {
        res.status(500).json({message:"Server error", err:err.message});
    }
}