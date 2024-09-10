const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/project/:projectId', authMiddleware, taskController.getTaskById);

router.get('/:taskId', authMiddleware, taskController.getTaskById);

router.post('/project/:projectId', authMiddleware, taskController.createTask);

router.put('/:taskId', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.updateTask);

router.delete('/:taskId', authMiddleware, roleMiddleware(['admin']), taskController.deleteTask);

module.exports = router;