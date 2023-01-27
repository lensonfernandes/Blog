
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()

const app = express();
const db = require('./db')

const PORT = process.env.PORT || 8001;

app.get("/", (req, res)=>{

    return res.send("This is my Blog")

})



app.listen(PORT, ()=>{
    console.log('Server is now running')
})