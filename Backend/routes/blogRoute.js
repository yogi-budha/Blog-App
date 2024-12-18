import express from "express"
import {  createBlog, deleteBlog, getBlog, getBlogs, likeBlog, updateBlog } from "../controller/blogController.js"
import { verify } from "../middlewares/authMiddleware.js"
import { commentBlog, deleteComment, likeComment, updateComment } from "../controller/commentController.js"
import upload from "../utils/multer.js"

const blogRoute = express.Router()

// Blogs
blogRoute.post("/blog",verify,upload.single("image"),createBlog)
blogRoute.get("/blog",getBlogs)
blogRoute.get("/blog/:id",getBlog)
blogRoute.patch("/blog/:id",verify,updateBlog)
blogRoute.delete("/blog/:id",verify,deleteBlog)
blogRoute.post("/blog/like/:id",verify,likeBlog)

// comments
blogRoute.post("/blog/comment/:id",verify,commentBlog)
blogRoute.delete("/blog/comment/:id",verify,deleteComment)
blogRoute.post("/blog/updateComment/:id",verify,updateComment)
blogRoute.post("/blog/updateComment/:id",verify,updateComment)
blogRoute.post("/blog/like-comment/:id",verify,likeComment)

export default blogRoute