const Project = require("../models/project");

exports.getAllProjects = async(req,res)=>{
    try{
        const projects = await Project.find().populate('owner', 'name email');
        res.json(projects);
    } catch(err) {
        res.status(500).json({message:"Server Error", error: err.message});
    }
}

exports.getProjectById = async (req,res) =>{
    try{
        const project = await Project.findById(req.params.projectId).populate('owner', 'name email');
        if(!project)
            return res.status(404).json({message:"Products not found"});
    } catch(err) {
        res.status(500).json({message:'Server error', error:err.message});
    }
}

exports.createProject = async(req,res) =>{
    const {name,description,owner} = req.body;

    try{
        const newProject = new Project({name,description,owner});
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    }catch(err){
        res.status(500).json({message:"Server error", error:err.message});
    }
}

exports.updateProjects = async(req,res) =>{
    const {name,description} = req.body;
    try{
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projectId,
            {name, description},
            {new:true}
        );
        if(!updatedProject)
            return res.status(404).json({message:'Project not found'});
        res.json(updatedProject);
    } catch(err) {
        res.status(500).json({message:"Server error", error: err.message})
    }
}

exports.deletedProjects = async(req,res) =>{
    try{
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
        if(!deletedProject)
            return res.status(404).json({message:"Project not found"});
        res.json({message:"Project deleted successfully"});
    } catch(err) {
        res.status(500).json({message:'Server down', error:err.message});
    }
}