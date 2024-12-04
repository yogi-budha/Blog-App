import { Blog } from "../models/blogModel.js"
import { User } from "../models/userModel.js"


const createBlog = async (req,res)=>{
    try {

     const {id} = req.user
console.log(id)
        const {title,description,draft} = req.body

        const user = await User.findById(id)

        if(!title || !description ){
            return res.status(400).json({success:false,message:"please all the required field"})
        }

        if(!user){
            return res.status(400).json({success:false,message:"creator dosenot exist"})
        }

        
        
        const blog = await Blog.create({title,description,draft,creator:user._id})
        
        await User.findByIdAndUpdate(id,{$push :{ blogs : blog._id}})

        return res.status(200).json({success:true,message:"successfully created the blog",blog})
        
    } catch (error) {

     return   res.status(500).json({ success: false, message: 'Server Error' });

     
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




        

        await User.findByIdAndUpdate(user.id,{$pull :{blogs:id}})
  await Blog.findByIdAndDelete(id)




            
        res.status(200).json({success:true,message:"successfully delete the blog"})

        
    } catch (error) {
        
        res.status(500).json({success:false,message:error.message})
    }

}



export {createBlog,getBlog,getBlogs,updateBlog,deleteBlog}