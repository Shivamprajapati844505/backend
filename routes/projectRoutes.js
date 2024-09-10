const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, projectController.getAllProjects);

router.get('/:projectId', authMiddleware, projectController.getProjectById);

router.post('/', authMiddleware, projectController.createProject);

router.put('/:projectId', authMiddleware, projectController.updateProject);

router.delete('/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;
