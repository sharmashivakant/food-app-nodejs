const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByIdResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
} = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');




const router = express.Router();

// routes

// create food
router.post("/create" , authMiddleware,createFoodController);

// get all food
router.get("/getAll",getAllFoodController);

// get single food
router.get("/get/:id", getSingleFoodController);

// get food with resturant
router.get("/getByIdResturant/:id", getFoodByIdResturantController);

// Food update
router.put("/update/:id", authMiddleware,updateFoodController);

// Food Delete
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// place order 

router.post("/placeOrder" , placeOrderController);

// order status
router.post("/orderStatus/:id",authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;