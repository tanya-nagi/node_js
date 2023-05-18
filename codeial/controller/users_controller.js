const User = require("../models/user")

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

//get the sign-up data
module.exports.create = function(req,res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back')
    }
    console.log(req.body.email,'---email');
    User.findOne({email: req.body.email}).then((user)=>{
        console.log(user,'-----user')
        if(!user){
            User.create(req.body).then(()=>{
                return res.redirect('/users/sign-in')

            }).catch(()=>{
                console.log('error in creating user');

            })
        }
        else{
            return res.redirect('back')
        }
    }).catch((err)=>{
        if(err){
            console.log('error in finding user that is logged in');
        }
        
    })
}

//get the sign-in data
module.exports.createSession = function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}