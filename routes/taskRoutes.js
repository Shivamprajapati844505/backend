const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Get tasks by project ID
router.get('/project/:projectId', authMiddleware, taskController.getTaskByProject);

// Get a task by task ID
router.get('/:taskId', authMiddleware, taskController.getTaskById);

// Create a task for a specific project
router.post('/project/add/:projectId', authMiddleware,  taskController.createTask);

// Update a task by task ID 
router.put('/:taskId', authMiddleware, taskController.updateTask);

// Delete a task by task ID
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
