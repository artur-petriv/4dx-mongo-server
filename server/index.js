require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const sequelize = require('./db');
const modules = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler); // Always register in the end

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
