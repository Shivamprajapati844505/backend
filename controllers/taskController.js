const Task = require('../models/task');

exports.getTaskByProject = async(req,res) =>{
    try{
        const tasks = await Task.find({project: req.params.projectId});
        res.json(tasks);
    } catch(err) {
        res.status(500).json({message:"Server error", error: err.message});
    }
}

exports.getTaskById = async(req,res) =>{
    try{
        const task = await Task.findById(req.params.taskId).populate('project', 'name');
        if(!task)
            return res.status(500).json({message:"Server error", error:err.message});
        res.json(task);
    } catch(err) {
        res.status(500).json({message:'Server error', error:err.message});
    }
}

exports.createTask = async(req,res) =>{
    const { name,description,status,project } = req.body;
    try{
        const newTask = new Task({ name,description,status,project });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch(err) {
        res.status(500).json({message:'server error', error:err.message});
    }
}

exports.updateTask = async(req,res) =>{
    const { name,description,status } = req.body;

    try{
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            { name,description,status },
            { new:true }
        )
    } catch(err) {
        res.status(500).json({message:"Server error", error:err.message});
    }
}

exports.deleteTask = async(req,res) =>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
        if(!deletedTask)
            return res.status(404).json({message:"Task not found"});
        res.json({message:"Task deleted successfully"});
    } catch(err) {
        res.status(500).json({message:"Server error", error:err.message});
    }
}