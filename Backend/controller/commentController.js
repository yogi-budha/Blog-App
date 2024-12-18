import { Blog } from "../models/blogModel.js"
import { Comment } from "../models/commentModel.js"
import { User } from "../models/userModel.js"

const commentBlog = async (req,res) => {
    try {

        const blogId = req.params



        const {id} = req.user

        const user = User.findById(id)

        if(!user){
            return res.status(400).json({success:false,message:"user doesnot exist"})
        }

        
        
        const blog = await Blog.findById(blogId.id)

        if(!blog){
           return res.status(400).json({success:false,message:"blog NOt found"})
        }

        const {content} = req.body
      const comment =   await Comment.create({content,blogIds:blogId.id,user:id})

      await Blog.findByIdAndUpdate(blogId.id,{$push:{comment:comment._id}})


            
        return res.status(200).json({success:true,message:"comment successfully done ",comment})
      



        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})  
    }
}


const deleteComment = async (req,res) => {
    try {

        const commentId = req.params



        const {id} = req.user

        
        
        const comments = await Comment.findById(commentId.id)
        console.log(comments)

 

        if(!comments){
           return res.status(400).json({success:false,message:"comment NOt found"})
        }

        const blog = await Blog.findById(comments.blogIds)

        if(!blog){
            return res.status(400).json({success:false,message:"blog NOt found"})



         }


        if(id == comments.user || blog.creator == id){

            await Comment.findByIdAndDelete(commentId.id)

            await Blog.findByIdAndUpdate(comments.blogIds,{$pull:{comment:commentId.id}})

            return res.status(200).json({success:true,message:"comment deleted successfully done "})
        }else{
            
            return res.status(400).json({success:false,message:"you are unauthorized "})
        }


        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})  
    }
}

const updateComment = async (req,res) =>{

    try {
            const {id} = req.params
    const userId = req.user
    const {content} = req.body


    const comment = await Comment.findById(id)

    if(!comment){
        return res.status(400).json({success:false,message:"comment is not found"})
    }

    if(userId.id != comment.user){
        
        return res.status(400).json({success:false,message:"you are not authorized"})
    }
    
    await Comment.findByIdAndUpdate(id,{content})
    return res.status(400).json({success:false,message:"comment updated successfully",comment})

    } catch (error) {
        
        return res.status(400).json({success:false,message:error.message})
    }

}

const likeComment = async (req,res) =>{

    try {
        const userid = req.user
    const {id} = req.params

    if(!userid){
        return res.status(400).json({success:false,message:"please login"})

    }
    if(!id){
        return res.status(400).json({success:false,message:"comment not found"})

    }


    const comment = await Comment.findById(id)

    console.log(userid.id)

    if(comment.likes.includes(userid.id)){
        await Comment.findByIdAndUpdate(id,{$pull:{likes:userid.id}})
        
        return res.status(200).json({success:true,message:"you dislike the comment"})
    }else{
        await Comment.findByIdAndUpdate(id,{$push:{likes:userid.id}})

        return res.status(200).json({success:true,message:"you like the commnet"})
    }

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
    

}

export {commentBlog,deleteComment,updateComment,likeComment}