const express = require('express');
const { registerController, loginController } = require('../controllers/authController');

const router = express.Router();

// import routes

// Logins routes

router.post("/login",loginController);

router.post("/register",registerController);
module.exports = router