const sequelize= require('sequelize')
const connection = require('./database')


const resposta = connection.define("respostas",{
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false    
    },
}) 

resposta.sync({force:false})


module.exports = resposta;