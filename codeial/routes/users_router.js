const express = require('express')
const router = express.Router()

const usersController = require('../controller/users_controller')

router.get('/profile',usersController.profile)

//creating route for signup
router.get('/sign-up',usersController.signUp)

//creating route for signin
router.get('/sign-in',usersController.signIn)

router.post('/create',usersController.create)


module.exports = router;