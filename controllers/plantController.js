const uuid = require('uuid')
const path = require('path')
const {Plant} = require('../models/models') 
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

class PlantController {
   async create(req, res, next) {
      try {
         const {name, price, description, categoryId} = req.body
         const {img} = req.files
         let fileName = uuid.v4() + ".jpg"
         img.mv(path.resolve(__dirname, '..', 'static', fileName))

         const plant = await Plant.create({name, price, description, categoryId, img: fileName})

         return res.json(plant)
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }

   }

   async getAll(req, res) {
      let {categoryId, limit, page} = req.query
      page = page || 1
      limit = limit || 12
      let offset = page * limit - limit
      let plants
      if (!categoryId) {
         plants = await Plant.findAndCountAll({limit, offset})
      }
      if (categoryId) {
         plants = await Plant.findAndCountAll({where:{categoryId, limit, offset}})
      }

      return res.json(plants)
   }

   async getOne(req, res) {
      const {id} = req.params
      const plant = await Plant.findOne({where:{id}}) 
      return res.json(plant)
   }
}

module.exports = new PlantController()