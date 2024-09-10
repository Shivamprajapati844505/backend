const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Get tasks by project ID
router.get('/project/:projectId', authMiddleware, taskController.getTaskByProject);

// Get a task by task ID
router.get('/:taskId', authMiddleware, taskController.getTaskById);

// Create a task for a specific project
router.post('/project/:projectId', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.createTask);

// Update a task by task ID
router.put('/:taskId', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.updateTask);

// Delete a task by task ID
router.delete('/:taskId', authMiddleware, roleMiddleware(['admin']), taskController.deleteTask);

module.exports = router;
