const Project = require("../models/project");

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('generatedBy', 'name email')
            .populate('managers', 'name email'); // Populating managers
        res.json(projects);
    } catch (err) {
        console.error("Error getting all projects:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId)
            .populate('generatedBy', 'name email')
            .populate('managers', 'name email'); // Populating managers
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        console.error("Error getting project by ID:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { title, content, generatedBy, priority, managers } = req.body;
        
        // Validate incoming data
        if (!title || !content || !generatedBy) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const newProject = new Project({ title, content, generatedBy, priority, managers });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        console.error("Error creating project:", err);
        res.status(500).json({ error: err.message });
    }
}

// Update a project
exports.updateProject = async (req, res) => {
    const { title, content, priority, managers } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projectId,
            { title, content, priority, managers },
            { new: true }
        ).populate('generatedBy', 'name email')
            .populate('managers', 'name email');
        if (!updatedProject)
            return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
        if (!deletedProject)
            return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
