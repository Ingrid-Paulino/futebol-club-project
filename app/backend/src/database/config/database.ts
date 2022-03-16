// import { Sequelize } from "sequelize/types";

require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3002',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

// export const db = new Sequelize (
//   username: process.env.DB_USER || 'trybe',
//   password: process.env.DB_PASS || 'trybe12345',
//   database: process.env.DB_NAME || 'TRYBE_FUTEBOL_CLUBE',
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || '3001',
//   dialect: 'mysql',
//   dialectOptions: {
//     timezone: 'Z',
//   },
//   logging: false,
// );

