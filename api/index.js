const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan =  require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true }).then(() =>{
    console.log("Connected");
}).catch(err => {console.log(err)});


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts", postRoute);


app.listen(3000, () =>{
    console.log("PORT AT 3000");
});