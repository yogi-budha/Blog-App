import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema({
    content:String,
    blogIds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true})

export const Comment = mongoose.model("Comment",commentSchema)