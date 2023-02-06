const userSchema = require("../Schemas/user");
const bcrypt = require('bcrypt')
const validator = require('validator')
const ObjectId = require('mongodb').ObjectId

let User = class {
  username;
  email;
  name;
  password;

  constructor({ username, email, name, password }) {
    this.email = email;
    this.username = username;
    this.name = name;
    this.password = password;
  }

  static verifyUserNameAndEmailExists({ username, email }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDb = await userSchema.findOne({
          $or: [{ username }, { email }],
        });
        console.log(userDb);

        if (userDb && userDb.email === email) {
            return reject("Email already exists")
        }

        if (userDb && userDb.username === username) {
            return reject("Username already exists")
        }

        return resolve()


      } catch (error) {

        reject(error)
      }
    });
  }

  static verifyUserId({userId}){
    return new Promise(async (resolve, reject)=>{
      try {
        if(!ObjectId(userId))
        {
          reject("Invalid UserId")
        }

        const userDb = await userSchema.findOne({_id: ObjectId(userId)})
        if(!userDb){
          reject("No user found")
        }
        resolve(userDb)
      } catch (error) {
        reject(error)
      }
    })
  }

  registerUser()
  {
    return new Promise(async (resolve, reject)=>{
        const hashedPassword = await bcrypt.hash(this.password, 7)
        //created an object of userSchema
        const user = new userSchema({
            username: this.username,
            email: this.email,
            name:this.name,
            password:hashedPassword,
        })
        try {
            const userDb = await user.save();
            return resolve(userDb)
        } catch (error) {
            return reject(error)
        }
        
    })
  }

static loginUser({loginId, password}){
    return new Promise(async (resolve, reject)=>{
        let userDb = {}
        if(validator.isEmail(loginId)){
            
            userDb = await userSchema.findOne({email :loginId})
        }
        else{
            userDb = await userSchema.findOne({username :loginId})

            console.log("username")
        }
        if(!userDb)
            return reject("No user found")


        const isMatch = await bcrypt.compare(password, userDb.password)

        if(!isMatch){
            return reject("Password do not match")
        }
        return resolve(userDb)

    
    })
}

};

module.exports = User