const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async(req,res) =>{
    try {
        // find the user
        const user = await userModel.findById({_id:req.body.id});
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        // send user data
        res.status(200).send({
            success: true,
            message: 'User data',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error,
        });
    }
}

// update user

const updateUserController = async(req,res) => {
    try {
        // find user
        const user = await userModel.findById({_id:req.body.id});
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        // update user data
       const {userName,address,phone } =req.body;
       if(userName) user.userName = userName
       if(address) user.address = address
       if(phone) user.phone = phone
       await user.save();
       res.status(200).send({
        success: true,
        message: 'User updated successfully',
        user,  // return updated user data
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error,
        });
        
    }
};

// UPDATE USER PASSWORR
const updatePasswordController = async (req, res) => {
    try {
      //find user
      const user = await userModel.findById({ _id: req.body.id });
      //valdiation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Usre Not Found",
        });
      }
      // get data from user
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(500).send({
          success: false,
          message: "Please Provide Old or New PasswOrd",
        });
      }
      //check user password  | compare password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid old password",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Updated!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Password Update API",
        error,
      });
    }
  };

// reset password
const resetPasswordController = async (req, res) => {
    try {
      const { email, newPassword, answer } = req.body;
      if (!email || !newPassword || !answer) {
        return res.status(500).send({
          success: false,
          message: "Please Privide All Fields",
        });
      }
      const user = await userModel.findOne({ email, answer });
      if (!user) {
        return res.status(500).send({
          success: false,
          message: "User Not Found or invlaid answer",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();

      res.status(200).send({
        success: true,
        message: "Password Reset SUccessfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "eror in PASSWORD RESET API",
        error,
      });
    }
  };

  // delete user

  const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Profile API",
            error,
        });
    }
  }

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController, 
    resetPasswordController,
    deleteProfileController
}