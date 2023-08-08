const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config();
require('./config/db').connect();

app.use(express.json());

app.use('/api/v1/student', studentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`The server running on: htpp://localhost:${process.env.PORT}`)
);

// const modules = {
//   Math: 12.5,
//   physycs: 13.5,
//   science: 10.0,
//   historyAndGeography: 8.23,
//   law: 5.0,
//   arabic: 10.89,
//   french: 15.12,
//   english: 14.45,
//   sport: 18.23,
// };

// const objectKeys = Object.keys(modules);
// const values = objectKeys.map((curr) => modules[curr]);

// const calclAverag = function (points) {
//   const averag = +points
//     .reduce((accumulator, currentValue) => (accumulator + currentValue) / 2)
//     .toFixed(2);

//   console.log(averag);
// };

// calclAverag(values);
