const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING},
   email: {type: DataTypes.STRING, unique: true},
   password: {type: DataTypes.STRING},
   phone: {type: DataTypes.STRING, unique: true},
   country: {type: DataTypes.STRING, defaultValue: ""},
   city: {type: DataTypes.STRING, defaultValue: ""},
   address: {type: DataTypes.STRING, defaultValue: ""},
   role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketPlant = sequelize.define('basket_plant',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Plant = sequelize.define('plant',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
   price: {type: DataTypes.REAL, allowNull: false},
   description: {type: DataTypes.TEXT},
   img: {type: DataTypes.STRING, allowNull: false},
   // rating: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})

const Category = sequelize.define('category',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CategoryPlant = sequelize.define('category_plant', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPlant)
BasketPlant.belongsTo(Basket)

Plant.hasMany(BasketPlant)
BasketPlant.belongsTo(Plant)

Category.hasMany(Plant)
Plant.belongsTo(Category)

// // Category.belongsToMany(Plant, {through: CategoryPlant})
// // Plant.belongsToMany(Category, {through: CategoryPlant})

module.exports = {
   User,
   Basket,
   BasketPlant,
   Plant,
   Category,
   CategoryPlant 
}