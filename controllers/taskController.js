const Task = require('../models/task');

// Get tasks by project ID
exports.getTaskByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get a single task by task ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('project', 'title').populate('assignedTo', 'username'); // Populate assignedTo with username
        if (!task)
            return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { title, content, status, project, priority, assignedTo } = req.body;
    try {
        const newTask = new Task({ title, content, status, project, priority, assignedTo });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    const { title, content, status, priority } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            { title, content, status, priority },
            { new: true }
        );
        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
        if (!deletedTask)
            return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
