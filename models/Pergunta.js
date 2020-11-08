const sequelize = require('sequelize');
const connection = require('../database/connection');

const question = connection.define('questions',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    description:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

question.sync({ force: false });


module.exports = question;