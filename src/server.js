/* eslint-disable class-methods-use-this */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Youch = require('youch');
const cors = require('cors');
const passport = require('passport');
const validate = require('express-validation');
const passportConfig = require('./config/passport');

const routes = require('./routes');
const databaseConfig = require('./config/database');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.database();
    this.middleware();
    this.passport();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }

  middleware() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(morgan('dev'));
    this.express.use(cors());
  }

  passport() {
    this.express.use(passport.initialize());
    passportConfig(passport);
  }

  routes() {
    this.express.use('/api', routes);
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);

        return res.json(await youch.toJSON());
      }

      return res.status(err.status || 500).json({ error: 'Internal Server Error' });
    });
  }
}

module.exports = new App().express;
