const sequelize = require("sequelize");
const connection = require("./database.js");

const Question = connection.define('questions', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {});

module.exports = Question;