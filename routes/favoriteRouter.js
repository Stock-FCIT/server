const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoriteController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', 
// checkRole('ADMIN'), 
favoriteController.create)

router.delete('/:userId/:plantId', 
// checkRole('ADMIN'), 
favoriteController.delete)

router.get('/:userId', favoriteController.getByUser)
router.get('/', favoriteController.getAll)

module.exports = router