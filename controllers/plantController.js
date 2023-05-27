const {Plant, Category} = require('../models/models') 
const { Op } = require("sequelize")
const ApiError = require('../error/ApiError')
const { uploadToCloudinary } = require("../service/upload.service");
const { ErrorHandler } = require('../utils/errorHandler')
const { bufferToDataURI } = require('../utils/file')

class PlantController {

   async create(req, res, next) {
      try {
         const {name, price, description, categoryId, img, rating} = req.body
         // const { file } = req
         // if (!file) throw new ErrorHandler(400, 'Image is required')
     
         // const fileFormat = file.mimetype.split('/')[1]
         // const { base64 } = bufferToDataURI(fileFormat, file.buffer)
     
         // const imageDetails = await uploadToCloudinary(base64, fileFormat)
     
         // res.json({
         //   status: 'success',
         //   message: 'Upload successful',
         //   data: imageDetails,
         // })
         // const plant = await Plant.create({name, price, description, categoryId, img: imageDetails.url, rating})
         const plant = await Plant.create({name, price, description, categoryId, img, rating})

         return res.json(plant)
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async delete(req, res, next) {
      try {
         const {id} = req.params
         const plant = await Plant.destroy({where:{id}})
         return res.json("Succeess delete!")
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }

   }

   async getAll(req, res, next) {
      try {
         let {category, sort, limit, page} = req.query
         page = page || 1
         limit = limit || 12 

         let categoryId = null
         let offset = page * limit - limit         
         
         const name = category
         if (category) categoryId = (await Category.findOne({where:{name}})).id || null
         // const categories = await Category.findAll()
         // const categoriesName  = categories.map(category => category.name) 


         // categoryId = (await Category.findOne({where:{name}})).id

         let plants
         if (!categoryId && !sort) {
            plants = await Plant.findAndCountAll({limit, offset})
         }
         if (categoryId && sort == "popular") {
            plants = await Plant.findAndCountAll({
               where: {categoryId},
               order: [['rating', 'DESC']]
            })
         } 
         if (categoryId && sort == "new") {
            plants = await Plant.findAndCountAll({
               where: {categoryId},
               order: [['createdAt', 'DESC']]
            })
         } 
         if (!categoryId && sort == "popular") {
            plants = await Plant.findAndCountAll({
               order: [['rating', 'DESC']]
            })
         } 
         if (!categoryId && sort == "new") {
            plants = await Plant.findAndCountAll({
               order: [['createdAt', 'DESC']]
            })
         } 
         if (categoryId && !sort) {
            plants = await Plant.findAndCountAll({
               where: {categoryId},
            })
         } 

         return res.json(plants)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getOne(req, res) {
      const {id} = req.params
      const plant = await Plant.findOne({where:{id}}) 
      return res.json(plant)
   }

}

module.exports = new PlantController()