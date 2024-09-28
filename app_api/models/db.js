require('./locations');
const { call } = require("../../app");
const dbConfig = require("./db.config");
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => console.log('connected to Mongo'))
.catch(err => console.error('Error connecting: ', err));

//shutdown
const gracefulShutdown = (msg) => {
  mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
});