const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//authentication using passport
passport.use(new LocalStrategy({userNamefield:'email'},function(email,password,done){
console.log('email,password')
console.log(email,password)
    //find the user and establish the identity
    User.findOne({email: email}).then((user)=>{
        if(!user || user.password !== password){
            console.log('Invalid Username/Password');
            return done(null,false)

        }

        return done(null,user)


    }).catch((err)=>{
        console.log('error');
        return done(err)
    })
}

))

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id)
})


//deserializing the key to user in cookies
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        return done(null,user)

    }).catch((err)=>{
        console.log('Error in finding user --> Passport');
        return done(err)
    })
})

module.exports = passport;
