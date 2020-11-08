const sequelize= require('sequelize');
const connection = require('../database/connection');

const reply = connection.define("replys",{
    body:{
        type: sequelize.TEXT,
        allowNull: false
    },
    questionId:{
        type: sequelize.INTEGER,
        allowNull: false    
    },
});

reply.sync({force:false});

module.exports = reply;