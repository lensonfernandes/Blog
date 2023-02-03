

const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const User = require("../Models/User")

const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    textBody:{
        type: String,
        required: true
    },
    creationTime:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:User,
        required: true
    }
})

module.exports = mongoose.model("Blogs" ,  blogSchema)