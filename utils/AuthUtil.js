
const validator = require("validator")

let cleanUpAndValidate = ({name, email, username, password}) => {
    return new Promise((resolve, reject)=>{
        if(!password || !email || !username || !name){
            return reject("Missing credentials")
        }

        if(typeof email !== "string"){
            return reject("Email is not a string")
        }

        if( !validator.isEmail(email)){
            return reject ("Invalid email format")
        }

        if(typeof username !== "string"){
            return reject("Username is not a string")
        }

        if(typeof password !== "string"){
            return reject("Password is not a string")
        }

        if(username.length < 3 || username.length >30){
            return reject("The length of username should be between 3-30 characters")
        }

        // if(password && !validator.isAlphanumeric(password))
        // {
        //     return reject("Password should cotain Letters and numbers")
        // }

        return resolve();
    })
}

module.exports = cleanUpAndValidate;
