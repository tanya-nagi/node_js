const User = require("../models/user")

module.exports.profile = function(req, res){
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then((user)=>{
            if(user){
                return res.render('user_profile', {
                        title: 'User Profile',
                        user: user
                    })
               
            }

        }).catch((err)=>{
            if(err){
                return res.redirect('/users/sign-in')
            }
        })

    }
    else{
        return res.redirect('/users/sign-in')
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
            console.log('error in finding user that is signed up');
        }
        
    })
}

//get the sign-in data
module.exports.createSession = function(req,res){

    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}).then((user)=>{
        //handle user found
        if(user){
            //handle password which don't match
            if(user.password !== req.body.password){
                return res.redirect('back')

            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        else{
            //handle user not found

            return res.redirect('back')
        }

    }).catch((err)=>{
        if(err){
            console.log('error in finding user that is signing in');

        }
    })

}