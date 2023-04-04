const { Router } = require('express')
const router = new Router() //1
const plantController = require('../controllers/plantController')
const { upload } = require('../service/upload.service')

router.post('/', 
// checkRole('ADMIN'), 
upload.single('img'),
plantController.create)

router.delete('/:id', 
// checkRole('ADMIN'), 
plantController.delete)

router.get('/', plantController.getAll)
router.get('/:id', plantController.getOne)

module.exports = router