const express = require('express')
const router = express.Router();
const passport = require('passport')

const postsController = require('../controller/posts_controller');

router.post('/create',passport.checkUserAuthentication,postsController.create)
router.get('/destroy/:id',passport.checkUserAuthentication,postsController.destroy)


module.exports = router