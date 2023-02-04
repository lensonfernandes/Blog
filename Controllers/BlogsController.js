

const express = require("express")
const BlogsRouter = express.Router()
const Blogs = require("../Models/Blogs");
const User = require("../Models/User");
const blogsCleanUpAndValidate = require("../utils/BlogUtils");

BlogsRouter.post("/create-blog", (req, res)=>{

    const title = req.body.title;
    const textBody = req.body.textBody;
    const userId = req.session.user.userId;
    const creationTime = new Date();


    //data validation
    blogsCleanUpAndValidate({title, textBody, userId}).then(async()=>{

        //console.log(title, textBody, creationTime, userId)
        try {
           const userDb = await User.verifyUserId({userId})


           //create blog
           const blog = new Blogs({title,textBody, userId, creationTime })

           try {
                const blogDb = await blog.createBlog()

                return res.send({
                    status: 200,
                    message:"Blog created successfully",
                    data: blogDb
                })
            
           } catch (error) {
            console.log(error)
            return res.send({
                status: 402,
                message:"Error occurred",
                error: error
            })
            
           }

        } catch (error) {
            console.log(error)
            return res.send({
                status: 400,
                message: "Error occurred",
                error: error
            })
        }

        return res.send(true)

    }).catch((err)=>{
        console.log(err)
        return res.send({
            status: 400,
            message: "Errror occurred",
            error: err
        })
    })


    // console.log("All ok");
    // return res.send(true)
})

BlogsRouter.get("/get-blogs",  async (req, res)=>{
    let skip = req.query.skip || 0;
    console.log(skip)

    try {
       const blogsDb = await Blogs.getBlogs({skip})
       return res.send({
        status: 200,
        message: "Read Successful",
        data: blogsDb
       })
    } catch (error) {
        return res.send({
            status: 400,
            message: "Read Unsuccessful",
           error: error
           })
    }

})

module.exports = BlogsRouter;