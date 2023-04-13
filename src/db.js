require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } = process.env;
console.log(DB_NAME, DB_USER, DB_HOST, DB_PASSWORD);
let sequelize = new Sequelize(
  "postgresql://postgres:I5AjrxeDafilnXy6qTif@containers-us-west-173.railway.app:5899/railway",
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Bills, Usuarios } = sequelize.models;

Usuarios.hasMany(Bills);
Bills.belongsTo(Usuarios);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
