import express from "express";
import { createPost, getPostById, getUserPosts } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.get('/user/:userId', getUserPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);

export default postRouter;