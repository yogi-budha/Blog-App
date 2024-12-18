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
    image:{
        type:String,
        required:true
    },
    imageId:{
        type:String,
        required:true
    },

    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comment:[{
          type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]

},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)