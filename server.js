const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');



// dotenv configuration
dotenv.config();

connectDb();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json()); 
app.use(morgan("dev"));

// route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.get("/", (req, res) =>{
    return res
    .status(200)
    .send("welcome to food server");
});

const PORT = process.env.PORT;

app.listen(PORT,(req, res) =>{
    console.log(`listening on ${PORT}`.white.bgMagenta);
});