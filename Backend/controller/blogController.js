import { Blog } from "../models/blogModel.js"
import  { Comment } from "../models/commentModel.js"
import { User } from "../models/userModel.js"
import uploadimage, { deleteimage } from "../utils/cloudinary.js"
import upload from "../utils/multer.js"

import fs from 'fs'


const createBlog = async (req,res)=>{
    try {

     const {id} = req.user

        const {title,description,draft} = req.body

        const blogImage = req.file

        const user = await User.findById(id)

        if(!title || !description ){
            return res.status(400).json({success:false,message:"please all the required field"})
        }

        if(!user){
            return res.status(400).json({success:false,message:"creator dosenot exist"})
        }
        if(!blogImage){
            return res.status(400).json({success:false,message:"please fill  the image"})
        }

        const {secure_url,public_id} = await uploadimage(req.file.path)

        fs.unlinkSync(req.file.path)

        
        const blog = await Blog.create({title,description,draft,creator:user._id,image:secure_url,imageId:public_id})
        
        await User.findByIdAndUpdate(id,{$push :{ blogs : blog._id}})

        return res.status(200).json({success:true,message:"successfully created the blog",blog})
        
    } catch (error) {
        console.log(error)
     return   res.status(500).json({ success: false, message: error.message });

     
    }
}

const getBlogs = async (req,res)=>{

    try {

        const blog = await Blog.find({}).populate({
            path:"creator",
            select:"-password"
        })

        if(!blog){
            
        res.status(400).json({success:false,message:"Blog Not found"})
        }

        res.status(200).json({success:true,message:"successfully get the blogs",blog})
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }

}


const getBlog = async (req,res)=>{

    try {

        const {id} = req.params

        const blog = await Blog.findById(id)

        if(!blog){
            
            res.status(400).json({success:false,message:"Blog Not found"})
            }

            
        res.status(200).json({success:true,message:"successfully get the blog",blog})

        
    } catch (error) {
        
        res.status(500).json({success:false,message:error.message})
    }

}


const updateBlog = async (req,res)=>{

    try {

        const {id} = req.params
        const user_id = req.user

        const {title,description,draft} = req.body

       const blogId = await Blog.findById(id)


        if(!(blogId.creator==user_id.id)){
         return   res.status(400).json({success:false,message:"you are not authorized to update"})
        }

        const blog = await Blog.findByIdAndUpdate(id,{title,description,draft},{new:true})

        if(!blog){
            
            res.status(400).json({success:false,message:"Blog Not found"})
            }

            
        res.status(200).json({success:true,message:"successfully update the blog",blog})

        
    } catch (error) {
        
        res.status(500).json({success:false,message:error.message})
    }

}

const deleteBlog = async (req,res)=>{

    try {

        const {id} = req.params

        const user = req.user

        const blogss = await Blog.findById(id)
        console.log("first")

        if(!blogss){
            
            return res.status(400).json({success:false,message:"blog not found"})
        }

        if(user.id != blogss.creator){
            return res.status(400).json({success:false,message:"you are unauthorized"})
        }




        await deleteimage(blogss.imageId)
        
        await User.findByIdAndUpdate(user.id,{$pull :{blogs:id}})
  await Blog.findByIdAndDelete(id)




            
        res.status(200).json({success:true,message:"successfully delete the blog"})

        
    } catch (error) {
        
        res.status(500).json({success:false,message:error.message})
    }

}

const likeBlog = async (req,res) => {
    try {

        const blogId = req.params

        const {id} = req.user

        console.log(id)

        const blog = await Blog.findById(blogId.id)

        if(!blog){
           return res.status(400).json({success:false,message:"blog NOt found"})
        }

        console.log(blog.likes)
        console.log(blog.likes.includes(id))
        if(blog.likes.includes(id)){

            
            await Blog.findByIdAndUpdate(blogId.id,{$pull:{likes:id}})
            
        return res.status(200).json({success:true,message:"user dislike Blog"})
        }else{
            await Blog.findByIdAndUpdate(blogId.id,{$push:{likes:id}})
        return res.status(200).json({success:true,message:"user like Blog"})
        }



        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})  
    }
}









export {createBlog,getBlog,getBlogs,updateBlog,deleteBlog,likeBlog}