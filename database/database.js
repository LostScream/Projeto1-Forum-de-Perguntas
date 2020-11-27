const sequelize = require("sequelize");

const connection = new sequelize("Projeto1","teste","12345",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;