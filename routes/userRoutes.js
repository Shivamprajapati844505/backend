const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware(['admin']), userController.getAllUsers);

router.get('/:userId', authMiddleware, userController.getUserById);

router.put('/:userId', authMiddleware, userController.updateUserProfile);

router.delete('/:userId', authMiddleware, roleMiddleware(['admin']), userController.deleteUser);

module.exports = router