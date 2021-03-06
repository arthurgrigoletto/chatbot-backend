const express = require('express');
const validate = require('express-validation');
const passport = require('passport');

const routes = express.Router();

const controllers = require('./app/controllers');
const validators = require('./app/validation');

const { UserController, MessageController, ReportController } = controllers;

routes.post('/users', validate(validators.User), UserController.store);
routes.post('/reports/search', ReportController.search);
routes.post('/reports/search_metrics', ReportController.metrics);

routes.use(passport.authenticate('jwt', { session: false }));
routes.post('/message', MessageController.sendMessage);
routes.get('/message', MessageController.listMessages);
routes.post('/reports', ReportController.store);

module.exports = routes;
