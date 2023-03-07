const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

module.exports = passport;
