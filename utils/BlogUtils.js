
const validator = require("validator")

let blogsCleanUpAndValidate = ({title, textBody, userId}) => {
    return new Promise((resolve, reject)=>{
        
        if(!title || !textBody || !userId){
           return reject("Missing fields")
        }

        if(typeof title !== "string"|| typeof textBody !== 'string')
        {
           return reject('Invalid Data')
        }

        
        if(title.length > 100)
        {
           return  reject('Title should be less than 100 characters')
        }

        
        
        if(textBody.length > 1000)
        {
           return  reject('TextBody should be less than 1000 characters')
        }


        // if(password && !validator.isAlphanumeric(password))
        // {
        //     return reject("Password should cotain Letters and numbers")
        // }

        return resolve();
    })
}

module.exports = blogsCleanUpAndValidate;
