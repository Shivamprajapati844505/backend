//Specify all the requirements here
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
const User = require('./models/user')


const app = express();

//Specify all the routes here
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes")
const errorHandler = require('./middleware/errorHandler');

//Specify all the middlewares here
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://project-management-list-frontend.onrender.com', // Replace with your client origin
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

// app.get("/users", (req, res) => {
//     // Extract the token from the Authorization header
//     const authHeader = req.header('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Authentication header missing or invalid!' });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ error: 'Token missing!' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
//         return res.status(200).json({ user: req.user });
//     } catch (err) {
//         return res.status(401).json({ error: 'Invalid token!' });
//     }
// });

app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Query to find all users
        res.status(200).json(users); // Send the list of users
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
});

//Location of the routes of pages
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

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
    res.send("Homepage");
})

app.get('/admin', async (req, res) => {
    try {
        const admin = await User.find({ role: 'admin' }); 
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching admin', error: err });
    }
});
 
app.get('/managers', async (req, res) => {
    try {
        const managers = await User.find({ role: 'manager' }); 
        res.status(200).json(managers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching managers', error: err });
    }
});

app.get('/teammembers', async (req, res) => {
    try {
        const teammember = await User.find({ role: 'teammember' }); 
        res.status(200).json(teammember);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teammember', error: err });
    }
});


module.exports = app;