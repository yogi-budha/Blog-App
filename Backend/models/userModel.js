import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    userName : String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }]
},{timestamps:true})

export const User = mongoose.model("User",userSchema)