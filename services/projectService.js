const Project = require('../models/project');

// Function to create a new project
const createProject = async (title, description, userId) => {
    const project = new Project({ title, description, createdBy: userId });
    await project.save();
    return project;
};

// Function to get all projects
const getAllProjects = async () => {
    return await Project.find();
};

// Function to get a project by ID
const getProjectById = async (id) => {
    const project = await Project.findById(id);
    if (!project) {
        throw new Error('Project not found');
    }
    return project;
};

// Function to update a project
const updateProject = async (id, updates) => {
    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) {
        throw new Error('Project not found');
    }
    return project;
};

// Function to delete a project
const deleteProject = async (id) => {
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Project not found');
    }
    return result;
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
