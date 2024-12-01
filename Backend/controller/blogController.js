import { Blog } from "../models/blogModel.js"
import { User } from "../models/userModel.js"
import {  verifyJWT } from "../utils/geerateJwt.js"


const createBlog = async (req,res)=>{
    try {

        const {token } = req.body

        const isValid = await verifyJWT(token)
       
      if(!isValid){
      return  res.status(400).json({success:false,message:"invalid token"})

      }


        const {title,description,creator,draft} = req.body

        const user = await User.findById(creator)

        if(!title || !description ){
            return res.status(400).json({success:false,message:"please all the required field"})
        }

        if(!creator){
            return res.status(400).json({success:false,message:"creator dosenot exist"})
        }

        
        
        const blog = await Blog.create({title,description,draft,creator})
        
        await User.findByIdAndUpdate(creator,{$push :{ blogs : blog._id}})

        res.status(200).json({success:true,message:"successfully created the blog",blog})
        
    } catch (error) {

        res.status(500).json({success:false,message:error.message})

     
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

        const {title,description,draft} = req.body

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

        const blog = await Blog.findByIdAndDelete(id)

        if(!blog){
            
            res.status(400).json({success:false,message:"Blog Not found"})
            }

            
        res.status(200).json({success:true,message:"successfully delete the blog",blog})

        
    } catch (error) {
        
        res.status(500).json({success:false,message:error.message})
    }

}



export {createBlog,getBlog,getBlogs,updateBlog,deleteBlog}