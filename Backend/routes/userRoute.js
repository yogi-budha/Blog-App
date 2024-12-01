import express from 'express'
import { createUser, deleteUser, getsingleuser, getusers, login, updateUser } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post("/user",createUser)
userRoute.get("/users",getusers)
userRoute.post("/user/login",login)
userRoute.get("/user/:id",getsingleuser)
userRoute.patch("/user/:id",updateUser)
userRoute.post("/user/:id",deleteUser)

export default userRoute