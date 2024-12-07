const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');


const router = express.Router();

// routes

router.post("/create" ,authMiddleware ,createResturantController);
// Get all resturant
router.get("/getAll",getAllResturantController);
// Get resturant by id
router.get("/get/:id",getResturantByIdController);
// Delete all resturant
router.delete("/delete/:id" ,authMiddleware,deleteResturantController);

module.exports = router;