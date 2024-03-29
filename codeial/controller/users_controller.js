const User = require("../models/user")

module.exports.profile = function(req, res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_of_user: user
        })
    })
   
}
module.exports.update = function(req,res){
    if(req.user.id===req.params.id){
        User.findByIdAndUpdate(req.params.id,
            req.body
        ).then((user)=>{
            return res.redirect('back')

        })
    }else{
        return res.status(401).send()
    }
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
    User.findOne({email: req.body.email}).then((user)=>{
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
    req.flash('success','Logged in successfully')
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
            req.flash('success','Logged out successfully')

        res.redirect('/');
      });
}

