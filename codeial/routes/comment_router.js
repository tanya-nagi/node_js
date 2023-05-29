const express = require('express')
const router = express.Router();
const passport = require('passport')

const commentsController = require('../controller/comments_controller');

router.post('/create',passport.checkUserAuthentication,commentsController.create)

module.exports = router