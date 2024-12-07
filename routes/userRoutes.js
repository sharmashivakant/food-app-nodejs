const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// import routes

// get user routes
router.get("/getUser",authMiddleware, getUserController);

// update user routes
router.put("/updateUser",authMiddleware ,updateUserController);
router.post("/updatePassword", authMiddleware,updatePasswordController);
router.post("/resetPassword" ,authMiddleware ,resetPasswordController);
router.delete("/userDelete/:id",authMiddleware,deleteProfileController);


module.exports = router;