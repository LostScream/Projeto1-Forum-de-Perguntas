const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

const connection = new Sequelize("Projeto1","teste","12345",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;