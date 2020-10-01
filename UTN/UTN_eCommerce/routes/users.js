var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");


/* GET user */
router.get('/', usersController.login);

/* POST a new user */
router.post('/', usersController.register);

module.exports = router;
