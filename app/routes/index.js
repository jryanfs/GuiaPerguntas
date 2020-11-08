const { Router } = require('express');

const HomeController = require('../controllers/HomeController');
const QuestionController = require('../controllers/QuestionController');
const ReplyController = require('../controllers/ReplyController');

const routes = new Router();

routes.get('/home',HomeController.index);

routes.get('/question',QuestionController.index);

routes.post('/savequestion',QuestionController.store);

routes.get('/question/:id',QuestionController.indexById);

routes.post('/reply',ReplyController.store);

module.exports = routes;
