import express from "express"
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controller/blogController.js"
import { verify } from "../middlewares/authMiddleware.js"

const blogRoute = express.Router()


blogRoute.post("/blog",verify,createBlog)
blogRoute.get("/blog",getBlogs)
blogRoute.get("/blog/:id",getBlog)
blogRoute.patch("/blog/:id",verify,updateBlog)
blogRoute.delete("/blog/:id",verify,deleteBlog)

export default blogRoute