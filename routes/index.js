//Config Global
const express = require('express');

//Require controllers js
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");

//Standard Function for Initialise Router
const router = express.Router();

//Chamada rotas para GET
router.get('/', homeController.userMiddleware, homeController.index);
router.get('/users/login',userController.login);
router.get('/users/register', userController.register);

module.exports = router;
