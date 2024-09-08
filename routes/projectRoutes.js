// const express = require('express');
// const router = express.Router();
// const projectController = require('../controllers/projectController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');

// router.get('/', authMiddleware, projectController.getAllProjects);

// router.get('/:projectId', authMiddleware, projectController.getProjectById);

// router.post('/', authMiddleware, roleMiddleware(['admin', 'manager']), projectController.createProject);

// router.put('/:projectId', authMiddleware, roleMiddleware(['admin', 'manager']), projectController.updateProjects);

// router.delete('/:projectId', authMiddleware, roleMiddleware([admin]), projectController.deletedProjects);

// module.exports = router;