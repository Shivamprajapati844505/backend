const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.getAllUsers);

router.get('/:userId', authMiddleware, userController.getUserById);

router.put('/:userId', authMiddleware, userController.updateUserProfile);

router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router