const express = require("express");
const User = require('../models/user');

const router = express.Router();

router.use(express.json());

router.post('/auth/signup', async(req,res)=>{
    const { username, email, password } = req.body;

    try{
        const addUser = new User({ username, email, password });
        await User.create(addUser);
    } catch(err) {
        res.status(500).redirect('/auth/signup');
    }
})

router.post('/auth/login', async(req,res)=>{
    const { email, password } = req.body;

    try{
        const addUser = new User({  email, password });
        await User.(addUser);
    } catch(err) {
        res.status(500).redirect('/auth/signup');
    }
});
