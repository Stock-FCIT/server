const Router = require('express')
const router = new Router()
const plantRouter = require('./plantRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/plant', plantRouter)
router.use('/category', categoryRouter)

module.exports = router