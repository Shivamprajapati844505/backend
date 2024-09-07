const express = require("express");
const mongoose = require("mongoose");
const user = require('./models/user');
const blogRoutes = require("./routes/authRoutes");

app.use("/auth", blogRoutes);



