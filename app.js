//Specify all the requirements here
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

//Specify all the routes here
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

//Specify all the middlewares here
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client origin
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.get("/users",(req,res)=>{
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authentication failed!' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return res.status(200).json({user:req.user});
    } catch (err) {
        res.status(401).json({ error: 'Invalid token!' });
    }
})
//Location of the routes of pages
app.use("/auth", authRoutes);
// app.use("/projects", projectRoutes);
app.use('/tasks', taskRoutes);

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