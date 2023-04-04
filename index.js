require("dotenv").config();
const express = require("express");
const router = require('./routes/index')
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api', router)

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      app.get('/', (req, res) => res.json("Just for test"))
   } catch (e) {
      console.log(e);
   }
};

start();
