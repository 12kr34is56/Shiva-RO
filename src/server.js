//create the instances which are necessary packages

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//now i want my app to know that ,to use bodyparser
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


//connect to moongose
mongoose.connect("mongodb+srv://commercekv2003:YxafoYqRF28ppQUJ@cluster0.swtavs0.mongodb.net/ShivaRO?retryWrites=true&w=majority&appName=Cluster0")

const UserRoute = require("./routes/user_route");
app.use("/api/user",UserRoute);

//listern the routes

const PORT = 2001;
app.listen(PORT,()=> console.log("Now the server has started at PORT: ",PORT));
