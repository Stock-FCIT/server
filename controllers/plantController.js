const {Plant} = require('../models/models') 
const ApiError = require('../error/ApiError')
const { uploadToCloudinary } = require("../service/upload.service");
const { ErrorHandler } = require('../utils/errorHandler')
const { bufferToDataURI } = require('../utils/file')

class PlantController {

   async create(req, res, next) {
      try {
         const {name, price, description, categoryId, rating} = req.body
         const { file } = req
         if (!file) throw new ErrorHandler(400, 'Image is required')
     
         const fileFormat = file.mimetype.split('/')[1]
         const { base64 } = bufferToDataURI(fileFormat, file.buffer)
     
         const imageDetails = await uploadToCloudinary(base64, fileFormat)
     
         // res.json({
         //   status: 'success',
         //   message: 'Upload successful',
         //   data: imageDetails,
         // })
         const plant = await Plant.create({name, price, description, categoryId, img: imageDetails.url, rating})

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

   async getAll(req, res) {
      try {
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