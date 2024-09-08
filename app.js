//Specify all the requirements here
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

const app = express();

//Specify all the routes here
const authRoutes = require("./routes/authRoutes");

//Specify all the middlewares here
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Location of the routes of pages
app.use("/auth", authRoutes);

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;

const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@records.qt7pd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Records`;

mongoose.connect(DB_URI)
.then((res)=>{
    console.log("Database has been connected");
})
.catch((err)=>{
    console.log(err.message);
})

app.listen(3000, ()=>{
    console.log("Created a new backend", "http://localhost:3000/")
})


app.get('/', (req,res)=>{
    res.send("Homepage")
})