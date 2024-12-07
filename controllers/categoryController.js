const categoryModel = require("../models/categoryModel");

const createCategoryController = async(req,res) => {
    try {
        const {title,imageUrl}=req.body;
        // validation
        if (!title ) {
            return res.status(400).send({
                success: false,
                message: 'Please provide title and imageUrl',
            });
        }
        // create new category
        const newCategory = new categoryModel({
            title,
            imageUrl,
        });
        // save category
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error category api',
            error,
        });
        
    }
};

// get all categories

const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: 'No categories found',
            });
        }
        res.status(200).send({
            success: true,
            totalCount: categories.length,
            data: categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Category API',
            error,
        });
        
    }
};

// update category

const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, imageUrl } = req.body;
        
        // find and update category
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Category API',
            error,
        });
        
    }
};

// delete category

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        // find and delete category
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delete Category API',
            error,
        });
        
    }
};

module.exports = {
    createCategoryController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
};