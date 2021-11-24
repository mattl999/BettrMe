const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      // a user has logged in
      console.log("profile from passport config: ", profile);
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return cb(err);
        if (user) {
          return cb(null, user);
        } else {
          let newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newUser.save(function (err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function(user, done){
    done(null, user.id)
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});