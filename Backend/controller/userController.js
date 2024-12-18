import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateJwtToken } from "../utils/geerateJwt.js";

const createUser = async (req,res) => {

    try {

        const {userName,email,password} = req.body

        if(!userName){
            return res.status(400).json({
                success:false,
                message:'please enter the UserName'
            })
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:'please enter the email'
            })
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:'please enter the password'
            })
        }

        const checkForExistingUser = await User.findOne({email})

        if(checkForExistingUser){
           return res.status(400).json({success:false,message:"User already created"})
        }


        const hashPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({userName,email,password:hashPassword})

        const token = await generateJwtToken({email:newUser.email,id:newUser._id})

         res.status(200).json({
            success:true,
            message:"User created Successfully",
            user:{
                ...newUser._doc,password:undefined
            },
            token
        })
        
    } catch (error) {

        res.status(400).json({success:false,message:'internal server error'})
        error:error.message
        
    }
}

const login = async (req,res) =>{

    const {email,password} = req.body

    try {
        
        if(!email){
            return res.status(400).json({success:false,message:"please fill the email field"})
        }
        if(!password){
            return res.status(400).json({success:false,message:"please fill the password field"})
        }

        const existingUser = await  User.findOne({email})




        if(!existingUser){
            return res.status(400).json({success:false,message:"user doesnot exist"})
        }

       const pass = await bcrypt.compare(password,existingUser.password)

 

       if(!pass){
        return res.status(400).json({success:false,message:"Password Incorrect"})
       }

      const token = await generateJwtToken({email:existingUser.email,id:existingUser._id})
        res.status(200).json({success:true,message:"Login successfully",user:{
            ...existingUser._doc,password:undefined
        },token})

    } catch (error) {

        res.status(400).json({success:false,message:error.message})
        
    }
}

const getusers = async (req,res) => {
    try {
        
        const users = await User.find()

        if(!users){
            res.status(400).json({
                success:false,
                message:"user not found",
                users
            })
        }

         res.status(200).json({
            success:true,
            message:"user fetched Successfully",
            users
        })
    } catch (error) {
        
        console.log(error.message)

        res.status(500).json({success:false,message:"Internal server error"})
    }
}

const getsingleuser = async (req,res) => {
    try {
        const {id} = req.params
        
        const users = await User.findById(id)

        if(!users){
            res.status(400).json({
                success:false,
                message:"user not found",
                
            })
        }

         res.status(200).json({
            success:true,
            message:"single user fetched Successfully",
            users
        })
    } catch (error) {
        
        console.log(error.message)

        res.status(500).json({success:false,message:"Internal server error"})
    }
}


const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const {userName,email,password} = req.body

        const updatedUser = await User.findByIdAndUpdate(id,{userName,email,password},{new:true})




         res.status(200).json({
            success:true,
            message:"user updated Successfully",
            updatedUser
        })
    } catch (error) {
        
        console.log(error.message)

        res.status(500).json({success:false,message:"Internal server error"})
    }
}


const deleteUser = async (req,res) =>{

    try {

        const {id} = req.params
        

        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            return res.status(200).json({
                success:false
                ,message:"user not found"
            })
        }

        return res.status(200).json({success:true,message:"user deleted successfully",deleteUser})

        
    } catch (error) {

        
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}


export {createUser,getusers,getsingleuser,updateUser,deleteUser,login}