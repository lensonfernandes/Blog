const userSchema = require("../Schemas/user");

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

  registerUser()
  {
    return new Promise(async (resolve, reject)=>{

        //created an object of userSchema
        const user = new userSchema({
            username: this.username,
            email: this.email,
            name:this.name,
            password:this.password
        })
        try {
            const userDb = await user.save();
            return resolve(userDb)
        } catch (error) {
            return reject(error)
        }
        
    })
  }
};

module.exports = User