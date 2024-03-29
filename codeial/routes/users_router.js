const express = require('express')
const router = express.Router()

const passport = require('passport')

const usersController = require('../controller/users_controller')

router.get('/profile/:id',passport.checkUserAuthentication,usersController.profile)
router.post('/update/:id',passport.checkUserAuthentication,usersController.update)


//creating route for signup
router.get('/sign-up',usersController.signUp)

//creating route for signin
router.get('/sign-in',usersController.signIn)

router.post('/create',usersController.create)

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in',failureFlash:true},
),usersController.createSession)

router.get('/sign-out',usersController.destroySession)



module.exports = router;