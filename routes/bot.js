const {authenticateUserToken} = require("../controllers/authControllers")
const router = require('express').Router();
const {add_bot,update_bot} = require('../controllers/botController');
router.post("/",authenticateUserToken,add_bot)
router.post("/:botUUID",authenticateUserToken,update_bot)

module.exports = router