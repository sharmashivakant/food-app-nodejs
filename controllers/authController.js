const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// register controller 
const registerController = async (req,res) =>{
    try{
        const {userName,email,password,phone,address,answer} = req.body
        // validate
        if(!userName || !email || !password || !phone || !address || !answer){
            return res.status(500).send({
                success: false,
                message: 'Please fill all fields'
            })
        }
        // check user
        const exisiting = await userModel.findOne({email})
        if(exisiting){
            return res.status(500).send({
                success: false,
                message: 'Email already exists'
            })
        }
        // hash password
        var salt =bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const user = await userModel.create({
            userName,
            email,
            password:hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Server Error'
        });
    }
};

// LoginController

const loginController = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            });
        }
        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        // check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: 'Invalid password'
            });
        }
        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            token,
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
};


module.exports = {registerController, loginController};