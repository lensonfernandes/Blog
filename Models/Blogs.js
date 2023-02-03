const blogSchema = require("../Schemas/Blogs");

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


}


module.exports = Blogs;

