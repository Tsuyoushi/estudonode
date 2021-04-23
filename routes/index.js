//Config Global
const express = require('express');

//Require controllers js
const homeController = require('../controllers/homeController');
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

//Standard Function for Initialise Router
const router = express.Router();

//Chamada rotas para GET
router.get('/', homeController.userMiddleware, homeController.index);
router.get('/users/login',userController.login);
router.get('/users/register', userController.register);

router.get('/post/add', postController.add)
router.post('/post/add', postController.addAction);

module.exports = router;
