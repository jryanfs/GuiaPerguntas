const express = require('express');
const bodyParser =  require('body-parser');
const routes = require('./routes');

require('./database/AuthConnection');

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        // Express usar a "view engine" --> EJS
        this.server.set('view engine', 'ejs');
        this.server.use(express.static('public'));
        this.server.use(bodyParser.urlencoded({extended: false}));
        this.server.use(bodyParser.json());
    }
    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;
