const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if(user.usertype !== "admin"){
        return res.status(401).send({
          success: false,
          message: "Only admin access is allowed",
        });
    }else{
        next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-authorized access denied",
      error,
    });
  }
};