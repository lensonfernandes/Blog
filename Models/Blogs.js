const blogSchema = require("../Schemas/Blogs");
const constants = require("../constants")
const ObjectId = require("mongodb").ObjectId;

const Blogs = class{
    title;
    textBody;
    userId;
    creationTime;

    constructor({title, textBody, userId, creationTime}){
        this.creationTime = creationTime;
        this.title = title;
        this.userId = userId;
        this.textBody = textBody;
    }

    createBlog(){
        return new Promise(async (resolve, reject)=>{
        
            this.textBody.trim();
            this.textBody.trim();

            const blog = new blogSchema({
                title: this.title,
                textBody: this.textBody,
                userId: this.userId,
                creationTime: this.creationTime
            })

            try {
                const blogDb = await blog.save();
                resolve(blogDb)
            } catch (error ) {
                reject(error)
            }
        })
    }

   static getBlogs({skip}){
        return  new Promise(async (resolve, reject)=>{
            try {
                const blogsDb = await blogSchema.aggregate([
                    //pagination, sort
                    {
                        $sort: {creationTime: -1}
                    },
                    {
                        $facet: {
                            data: [
                                {$skip : parseInt(skip)},
                                {$limit : constants.LIMIT}
                            ]
                        }
                    }
                ])
                resolve(blogsDb)
                    console.log(blogsDb) 

            } catch (error) {
                reject(error)
            }
        })
    }

    static getMyBlogs({skip, userId}){
        return  new Promise(async (resolve, reject)=>{
            try {
                const myBlogsDb = await blogSchema.aggregate([
                    //pagination, sort
                    {
                        $match: { userId: ObjectId(userId)}
                    },

                    {
                        $sort: {creationTime: -1}
                    },
                    {
                        $facet: {
                            data: [
                                {$skip : parseInt(skip)}, 
                                {$limit : constants.LIMIT}
                            ]
                        }
                    }
                ])
                resolve(myBlogsDb)
                    console.log(myBlogsDb) 

            } catch (error) {
                reject(error)
            }
        })
    }


}


module.exports = Blogs;

