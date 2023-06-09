const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.delete(
   '/:id',
   // checkRole('ADMIN'),
   userController.delete
);
router.post('/login', userController.login);
router.patch('/update/:id', userController.update)
router.patch('/updatePassword/:id', userController.updatePassword)
router.get('/auth', authMiddleware, userController.check);
router.get('/:id', userController.getUserInfo);


module.exports = router