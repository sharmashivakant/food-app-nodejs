const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    createCategoryController, 
    getAllCategoryController, 
    updateCategoryController, 
    deleteCategoryController
} = require('../controllers/categoryController');



const router = express.Router();

// routes

// create categories

router.post('/create', authMiddleware,createCategoryController);

// getAllCategory

router.get('/getAll', getAllCategoryController);

// update category
router.put('/update/:id', authMiddleware,updateCategoryController);

// delete category
router.delete('/delete/:id', authMiddleware,deleteCategoryController);

module.exports = router;