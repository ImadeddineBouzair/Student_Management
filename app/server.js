const express = require('express');
const app = express();
const validator = require('validator');

const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config();
require('./config/db').connect();

app.use(express.json());

app.use('/api/v1/student', studentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`The server running on: htpp://localhost:${process.env.PORT}`)
);

const validation = validator.isEmail('youcef.gmail.dcom');

console.log(validation);
