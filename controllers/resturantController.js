// create 

const resturantModel = require("../models/resturantModel");

const createResturantController =async(req,res) =>{
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
            // validation
            if(!title || !coords){
                return res.status(500).send({
                    success: false,
                    message: 'Please provide title, and adddress',
                });
            }
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });
        await newResturant.save();
        res.status(201).send({
            success: true,
            message: "Resturant created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Create Resturant API",
            error,
        });
        
    }
};
// GET ALL Resturants
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({});
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Available",
            });
            
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Resturant API",
            error,
        });
        
    }
};

// get by id
const getResturantByIdController = async(req, res) =>{
        try {
            const resturantId = req.params.id;
            // validation
            if (!resturantId) {
                return res.status(400).send({
                    success: false,
                    message: "Please provide Resturant Id",
                });
            }
            const resturant = await resturantModel.findById(resturantId);
            if (!resturant) {
                return res.status(404).send({
                    success: false,
                    message: "Resturant not found",
                });
            }
            res.status(200).send({
                success: true,
                resturant,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error in Get Resturant By Id API",
                error,
            });
            
        }
};

// Delete a Resturant

const deleteResturantController = async(req, res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(400).send({
                success: false,
                message: 'Please provide Resturant Id',
            });
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            message: 'Resturant deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Delete Resturant API",
            error,
        });
        
    }
};

module.exports = {
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController,
};