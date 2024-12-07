// food controller

const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async(req,res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        } =req.body;
        // validation
        if (!title ||!description ||!price ||!resturant) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }
        // create new food
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        });
        await newFood.save();
        res.status(201).send({
            success: true,
            message: "Food created successfully",
            data: newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Food API",
            error,
        });
        
    }

};
// get all food
const getAllFoodController = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No Foods Available",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Foods API",
            error,
        });
        
    }
};


// get single food
const getSingleFoodController = async(req,res) => {
    try {
        const {id} = req.params;
        const food = await foodModel.findById(id);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Single Food API",
            error,
        });
        
    }
};

// get food By Id resturant
const getFoodByIdResturantController = async(req,res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(400).send({
                success: false,
                message: "Please provide Resturant Id",
            });
        }
        const food = await foodModel.find({resturant: resturantId});
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Foods not found with hits id",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food base on resturant",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Food By Id Resturant API",
            error,
        });
        
    }
};

// food update

const updateFoodController = async (req, res) => {
    try {
        const foodId =req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please provide Food Id",
            });
            
        }
        const food = await foodModel.findById(foodId)
           if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
            
           }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        } =req.body;

        const updateFood = await foodModel.findByIdAndUpdate(foodId,{
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        },
    { new: true });
    res.status(200).send({
        success: true,
        message: "Food updated successfully",
        food: updateFood,
     });
        // update food data
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Food API",
            error,
        });
        
    }
};

// food delete

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please provide Food Id",
            });
        }
        const food = await foodModel.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Food API",
            error,
        });
        
    }
};

// place order items

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
          return res.status(500).send({
            success: false,
            message: "please food cart or payemnt method",
          });
        }
        let total = 0;
        //cal
        cart.map((i) => {
          total += i.price;
        });
    
        const newOrder = new orderModel({
          foods: cart,
          payment: total,
          buyer: req.body.id,
        });
        await newOrder.save();
        res.status(201).send({
          success: true,
          message: "Order Placed successfully",
          newOrder,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr In Place Order API",
          error,
        });
      }
};

// change order

const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please provide Order Id",
            });
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        );
        res.status(200).send({
            success: true,
            message: "Order Status successfully"
         });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Order Status API",
            error,
        });
        
    }
};

module.exports = {
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByIdResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
}