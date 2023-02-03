
const express = require('express');
const mongoose = require('mongoose');
const AuthRouter = require('./Controllers/AuthController');
require("dotenv").config()

const app = express();
const db = require('./db')
const session = require('express-session')
const mongoDbsession = require('connect-mongodb-session')(session)
const BlogsRouter = require("./Controllers/BlogsController");
const isAuth = require('./Middlewares/isAuth');

const PORT = process.env.PORT || 8001;

const store = new mongoDbsession({
    uri: process.env.MONGO_URI,
    collection: "session"
}) 

//middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
        secret:process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store:store
    })
)

app.get("/", (req, res)=>{

    return res.send({
        status:200,
        message:"This is my Blog"
    })

})

app.use("/auth", AuthRouter)
app.use("/blog", isAuth,  BlogsRouter)



app.listen(PORT, ()=>{
    console.log('Server is now running')
})