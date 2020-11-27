const sequelize = require("sequelize");
const connection = require("./database.js");

const answer = connection.define("answers", {
    body: {
        type:sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

answer.sync({force: false});

module.exports = answer;