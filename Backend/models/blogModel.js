import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    draft:{
        type:Boolean,
        default:false
    },

    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)