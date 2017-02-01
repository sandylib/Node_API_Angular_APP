var  passport = require('passport'),  
     mongoose = require('mongoose'),   
     LocalStrategy = require('passport-local').Strategy,
     User = mongoose.model('User');

module.exports = function() { 

passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username:username},function(err,user){
                 if(user && user.authenticate(password)) {
                    return done(null, user);
                  } else {
                    return done(null, false);
                  }
            })
        }));


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}