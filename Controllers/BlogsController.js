const express = require("express");
const BlogsRouter = express.Router();
const Blogs = require("../Models/Blogs");
const User = require("../Models/User");
const blogsCleanUpAndValidate = require("../utils/BlogUtils");

BlogsRouter.post("/create-blog", (req, res) => {
  const title = req.body.title;
  const textBody = req.body.textBody;
  const userId = req.session.user.userId;
  const creationTime = new Date();

  //data validation
  blogsCleanUpAndValidate({ title, textBody, userId })
    .then(async () => {
      //console.log(title, textBody, creationTime, userId)
      try {
        const userDb = await User.verifyUserId({ userId });

        //create blog
        const blog = new Blogs({ title, textBody, userId, creationTime });

        try {
          const blogDb = await blog.createBlog();

          return res.send({
            status: 200,
            message: "Blog created successfully",
            data: blogDb,
          });
        } catch (error) {
          console.log(error);
          return res.send({
            status: 402,
            message: "Error occurred",
            error: error,
          });
        }
      } catch (error) {
        console.log(error);
        return res.send({
          status: 400,
          message: "Error occurred",
          error: error,
        });
      }

      return res.send(true);
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        status: 400,
        message: "Errror occurred",
        error: err,
      });
    });

  // console.log("All ok");
  // return res.send(true)
});

BlogsRouter.get("/get-blogs", async (req, res) => {
  let skip = req.query.skip || 0;
  console.log(skip);

  try {
    const blogsDb = await Blogs.getBlogs({ skip });
    return res.send({
      status: 200,
      message: "Read Successful",
      data: blogsDb,
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Read Unsuccessful",
      error: error,
    });
  }
});

BlogsRouter.get("/my-blogs", async (req, res) => {
  const userId = req.session.user.userId;
  let skip = req.query.skip || 0;

  console.log(userId, skip);

  try {
    const myBlogsDb = await Blogs.getMyBlogs({ skip, userId });

    return res.send({
      status: 200,
      message: "Read Success",
      data: myBlogsDb,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: "Read Failed",
      error: error,
    });
  }
});

BlogsRouter.post("/edit-blog", async (req, res) => {
  const { title, textBody } = req.body.data;
  const blogId = req.body.blogId;
  const userId = req.session.user.userId;

  //Data validation

  if (!title && !textBody) {
    return res.send({
      status: 400,
      message: "Missing credentials",
    });
  }

  try {
    const blog = new Blogs({ blogId, title, textBody });

    //function to find blog
    const blogDb = await blog.getDataofBlogFromId();
    console.log(blogDb);

    if (blogDb.userId.toString() !== userId.toString()) {
      return res.send({
        status: 401,
        message: "Permission denied to Edit",
      });
    }

    //allow edit only for 30 min from creationTime

    const currentTime = Date.now();
    const creationTime = new Date(blogDb.creationTime); // string to date object

    //console.log(currentTime)
    //console.log(creationTime.getTime())

    const diff = (currentTime - creationTime.getTime()) / (1000 * 60);
    console.log(diff)

    if (diff > 30) {
      return res.send({
        status: 403,
        message: "Edit Unsuccessful",
        error: "Cannot edit after 30 minutes",
      });
    }

    //update the blog in db

    try {
      const oldBlog = await blog.updateBlog();

      return res.send({
        status: 200,
        message: "Edit success",
        data: oldBlog,
      });
    } catch (error) {
      console.log(error)
      return res.send({
        status: 402,
        message: "Error occured",
        error: error,
      });
    }
  } catch (error) {
    return res.send({
      status: 400,
      message: "Error occured",
      error: error,
    });
  }
});

BlogsRouter.post('/delete-blog', async(req,res)=>{
  const blogId = req.body.blogId;
  const userId = req.session.user.userId;

try{
  const blog = new Blogs({blogId})
  const blogDb = await blog.getDataofBlogFromId();

  if(!blogDb.userId.equals(userId)){
    return res.send({
      status: 401,
      message:"Not allow to Delete. Authorization failed"
    })
  }

  //delete blog

  const blogData = await blog.deleteBlog();

  return res.send({
    status: 200,
    message: " Delete Successful",
    data: blogData
  })
}
catch(error){
  return res.send({
    status: 401,
    message:"Error occurred",
    error:error
  })
}

})

module.exports = BlogsRouter;
