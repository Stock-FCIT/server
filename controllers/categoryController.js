const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
   async create(req, res) {
      const {name} = req.body
      const category = await Category.create({name})
      return res.json({category})
   }

   async delete(req, res) {
      const {id} = req.params
      const category = await Category.destroy({where:{id}}) 
      return res.json("Success delete!")
   }

   async getAll(req, res) {
      const categories = await Category.findAll()
      return res.json(categories)
   }
}

module.exports = new CategoryController()