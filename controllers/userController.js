const User = require('../models/user');

exports.getAllUsers = async(req,res) =>{
    try{
        const users = await User.find().select('-password');
        res.json(users);
    } catch(err) {
        res.status(500).json({message:"Server error", error:err.message});
    }
};

exports.getUserById = async(req,res) =>{
    try{
        const user = await User.findById(req.params.userId).select('-password');
        if(!user)
            return res.status(404).json({message:'Server error', error:err.message});
        res.json(user);
    } catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
};

exports.updateUserProfile = async(req,res) =>{
    const { name,email } = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { name,email },
            { new:true }
        ).select('-password');
        if(!updatedUser)
            return res.status(404).json({message:"User not found"});
        res.json(updatedUser);
    } catch(err) {
        res.status(500).json({message:"Server error", error:err.message});
    }
}

exports.deleteUser = async(req,res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if(!deletedUser)
            return res.status(404).json({message:"User not found"});
        res.json({message:"User deleted successfully"})
    } catch(err) {
        res.status(500).json({message:"Server error", error:err.message});
    }
};