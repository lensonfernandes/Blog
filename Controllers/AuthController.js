

const express = require('express');
const cleanUpAndValidate = require('../utils/AuthUtil');

const AuthRouter = express.Router();

AuthRouter.post("/register", (req, res)=>{
    console.log("Register");

    const {email, password, username, name} = req.body;
    cleanUpAndValidate({email, password, username, name}).then(()=>{
        res.send({
            status: 200,
            message:"OK",
            data: req.body,
        })
    }).catch((err)=>{
        res.send({
            status: 400,
            message:"Error occurred",
            error: err,
        })
    })
   
    })
})


AuthRouter.post("/login", (req, res)=>{
    console.log("Login");
    return res.send({
        status:200,
    })
})


module.exports = AuthRouter