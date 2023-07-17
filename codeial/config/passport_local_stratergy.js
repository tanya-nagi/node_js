const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true},
    function(req,email,password,done){
    //find the user and establish the identity
    User.findOne({email: email}).then((user)=>{
        if(!user || user.password !== password){
            // console.log('Invalid Username/Password');
            req.flash('error','Invalid Username/Password')
            return done(null,false)

        }
        return done(null,user)


    }).catch((err)=>{
        req.flash('error',err);
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

//check if user is authenticate
passport.checkUserAuthentication = (req,res,next)=>{
    // if user is autheticate pass it to next function (controller's action)
    if(req.isAuthenticated){
        return next()
    }

    //if user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticateUser = (req,res,next)=>{
    if(req.isAuthenticated){
        // req.user stored the data about signed in user from the session cokie and we just sending this
        // to local function for views

        res.locals.user = req.user;
    }
    next()
}

