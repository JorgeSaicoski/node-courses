const passportJWT = require('passport-jwt');
const User = require('../models/user')
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

module.exports = passport => {
    passport.use(strategy);
};