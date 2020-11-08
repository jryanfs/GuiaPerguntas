const connection = require('./connection');

connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com o banco de dados")
        })
        .catch((erro)=>{
            console.log(erro)
        });

module.exports = connection;
