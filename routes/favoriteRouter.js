const Router = require('express')
const router = new Router()
const favoriteRouter = require('../controllers/favoriteRouter')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', 
// checkRole('ADMIN'), 
favoriteRouter.create)

router.delete('/', 
// checkRole('ADMIN'), 
favoriteRouter.delete)

router.get('/:userId', favoriteRouter.getByUser)
router.get('/', favoriteRouter.getAll)

module.exports = router