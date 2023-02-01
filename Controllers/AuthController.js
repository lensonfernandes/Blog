const express = require("express");
const cleanUpAndValidate = require("../utils/AuthUtil");

const User = require("../Models/User");

const AuthRouter = express.Router();

AuthRouter.post("/register", (req, res) => {
  console.log("Register");

  const { email, password, username, name } = req.body;
  cleanUpAndValidate({ email, password, username, name })
    .then(async () => {
    //   const user = new User({
    //     name: name,
    //     email: email,
    //     password: password,
    //     username: username,
    //   });

    //   try {
    //     const userDb = await user.save();
    //     console.log(userDb);

    //     req.session.isAuth = true;

    //     return res.send({
    //       status: 200,
    //       message: "User is registered",
    //       data: userDb,
    //     });
    //   } catch (err) {
    //     return res.send({
    //       status: 400,
    //       message: "Database error",
    //       error: err,
    //     });
    //   }

    //   return res.send({
    //     status: 200,
    //     message: "OK",
    //     data: req.body,
    //   });

    //check if user exists or not
        try{
            await User.verifyUserNameAndEmailExists({username, email})
        }
        catch(error){
            console.log(error)
            return res.send({
                status: 401,
                message:"Error occured",
                error: error
            })
        }

    //create user
    const user = new User({
        email,
        username,
        password,
        name
    })

try {
   const userDb =  await user.registerUser()
   return res.send({
    status: 201,
    message:"Registration successful",
    data: userDb
   })
} catch (error) {
    return res.send({
        status: 400,
        message: "Error occurred",
        error: error,
    })
    
}

    })
    .catch((err) => {
        console.log(err)
      return res.send({
        status: 400,
        message: "Error occurred",
        error: err,
      });
    });
});

AuthRouter.post("/login", (req, res) => {
  console.log("Login");
  return res.send({
    status: 200,
  });
});

module.exports = AuthRouter;
