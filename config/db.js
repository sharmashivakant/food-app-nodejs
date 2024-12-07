const mongoose = require('mongoose');
const colors = require('colors');


 const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to ${mongoose.connection.host}`.bgCyan);
    }catch(error){
        console.log("DB Error", error.bgCyan);
    }
}

module.exports = connectDb;