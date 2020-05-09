const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const query = require("../app/accounts/query")
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    query.readById(jwt_payload.id)
    .then(([account]) => {
        if (account) {
            return done(null, account);
        } else {
            return done(null, false);
        }
    }).catch(err => done(err, false) )
}));

module.exports = passport