const express = require('express');
const validate = require('express-validation');
const passport = require('passport');

const routes = express.Router();

const controllers = require('./app/controllers');
const validators = require('./app/validation');

/**
 * Users
 */
routes.post('/users', validate(validators.User), controllers.UserController.store);

/**
 * Session
 */
routes.post('/session', validate(validators.Session), controllers.SessionController.store);

routes.use(passport.authenticate('jwt', { session: false }));

/**
 * Chat
 */
routes.post('/message', controllers.MessageController.sendMessage);
routes.get('/message', controllers.MessageController.listMessages);
module.exports = routes;
