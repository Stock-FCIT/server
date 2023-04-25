const {Favorite} = require('../models/models')
const ApiError = require('../error/ApiError')

class FavoriteController {
   async create(req, res, next) {
      try {
         const {userId, plantId} = req.body
         const favorite = await Favorite.create({userId, plantId})
         return res.json({favorite})
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async delete(req, res, next) {
      try {
         const {userId, plantId} = req.params
         const favorite = await Favorite.destroy({where:{userId, plantId}})
         return res.json("Succeess delete!")
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async getAll(req, res) {
      const favorite = await Favorite.findAll()
      return res.json(favorite)
   }

   async getByUser(req, res, next) {
      try {
         const {userId} = req.params
         const favorites = await Favorite.findAll({where: {userId}})
         let favoritesWithouotNULL = []
         favorites.forEach(favorite => {
            if (!(favorite.plantId === null)) {
               favoritesWithouotNULL.push(favorite)
            }
         });
         return res.json(favoritesWithouotNULL)
      } catch (e) {
         next(ApiError.badRequest(e.message))

      }
   }
}

module.exports = new FavoriteController()