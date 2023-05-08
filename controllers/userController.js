const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
   return jwt.sign(
      {id, email, role}, 
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
      )
}

class UserController {
   async registration(req, res, next) {
      try {
         const {name, email, phone, password, role} = req.body
         if (!email || !password) {
            return res.json('Incorrect email or password')
         }
         const candidate = await User.findOne({where: {email}})
         const candidatePhone = await User.findOne({where: {phone}})
         if (candidate && candidatePhone) {
            return res.status(500).json({message: 'User with this e-mail and phone is already existed'})
         }
         if (candidate) {
            return res.status(500).json({message: 'User with this e-mail is already existed'})
         }
         if (candidatePhone) {
            return res.status(500).json({message: 'User with this phone is already existed'})
         }
         const hashPassword = await bcrypt.hash(password, 5)
         const user = await User.create({name, email, phone, role, password:hashPassword})
         const basket = await Basket.create({userId: user.id})
         const token = generateJwt(user.id, user.email, user.role)
         return res.json({token})
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }
   }
   
   async delete(req, res, next) {
      try {
         const {id} = req.params
         const user = await User.destroy({where:{id}})
         return res.json("Succeess delete!")
      } catch(e) {
         next(ApiError.badRequest(e.message))
      }

   }
      
   async update(req, res, next) {
      try{ 
         const {id} = req.params
         const {name, email, phone, country, city, address} = req.body
         const userToUpdate = User.update(
            {
               name: name,
               email: email,
               phone: phone,
               country: country,
               city: city,
               address: address
            },
            {where:{id}})
         res.json("Success update!")
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async updatePassword(req, res, next) {
      try{ 
         const {id} = req.params
         const {currentPassword, password} = req.body
         const user = await User.findOne({where: {id}})
         let comparePassword = bcrypt.compareSync(currentPassword, user.password)
         if (!comparePassword) {
            return res.status(500).json({message: 'Current Password is incorrect!'})
         } 
         if (currentPassword === password) {
            return res.status(500).json({message: 'New password must be different from previous!'})
         } 
         const hashPassword = await bcrypt.hash(password, 5)
         const passwordToUpdate = User.update(
            {
               password: hashPassword
            },
            {where:{id}})
         res.json("Password changed!")
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async login(req, res, next) {
      try {
         const {email, password} = req.body
         const user = await User.findOne({where: {email}})
         if (!user) {
            return res.status(500).json({message: 'The email or password is incorrect'})
         }
         let comparePassword = bcrypt.compareSync(password, user.password)
         if (!comparePassword) {
            return res.status(500).json({message: 'The email or password is incorrect'})
         }
         const token = generateJwt(user.id, user.email, user.role)
         return res.json({token})
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }

   async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
   }

   async getUserInfo(req, res, next) {
      try {
         const {id} = req.params
         const user = await User.findOne({where:{id}}) 
         return res.json({
            id: user.id, 
            name: user.name,
            email: user.email,
            phone: user.phone,
            country: user.country,
            city: user.city,
            address: user.address,
            role: user.role
         })
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
}

module.exports = new UserController()