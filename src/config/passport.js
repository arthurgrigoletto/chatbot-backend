/* eslint-disable no-underscore-dangle */

const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../app/models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.APP_SECRET;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id).then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
    }),
  );
};
