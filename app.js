
const express = require('express');
const mongoose = require('mongoose');
const AuthRouter = require('./Controllers/AuthController');
require("dotenv").config()

const app = express();
const db = require('./db')

const PORT = process.env.PORT || 8001;

//middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{

    return res.send({
        status:200,
        message:"This is my Blog"
    })

})

app.use("/auth", AuthRouter)



app.listen(PORT, ()=>{
    console.log('Server is now running')
})