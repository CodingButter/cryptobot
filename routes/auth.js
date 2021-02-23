const router = require('express').Router();
const {login_post,signup_post} = require('../controllers/authControllers')

/**
 * @route POST /auth/login
 * @description Login User
 * @access Public
 */
router.post('/login',login_post)

router.post('/signup',signup_post)

module.exports = router