const Task = require('../models/task');

// Function to create a new task
const createTask = async (title, description, projectId, assignedTo) => {
    const task = new Task({ title, description, project: projectId, assignedTo });
    await task.save();
    return task;
};

// Function to get all tasks
const getAllTasks = async () => {
    return await Task.find().populate('project assignedTo');
};

// Function to get a task by ID
const getTaskById = async (id) => {
    const task = await Task.findById(id).populate('project assignedTo');
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

// Function to update a task
const updateTask = async (id, updates) => {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true }).populate('project assignedTo');
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

// Function to delete a task
const deleteTask = async (id) => {
    const result = await Task.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Task not found');
    }
    return result;
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
