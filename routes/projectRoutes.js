const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Get all projects
router.get('/', authMiddleware, projectController.getAllProjects);

// Get project by ID
router.get('/:projectId', authMiddleware, projectController.getProjectById);

// Create a new project (only accessible by admins)
router.post('/', authMiddleware, roleMiddleware('admin'), projectController.createProject);

// Update a project (only accessible by admins)
router.put('/:projectId', authMiddleware, roleMiddleware('admin'), projectController.updateProject);

// Delete a project (only accessible by admins)
router.delete('/:projectId', authMiddleware, roleMiddleware('admin'), projectController.deleteProject);

module.exports = router;
