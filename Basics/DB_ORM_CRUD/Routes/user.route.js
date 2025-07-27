import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/", createUser);

userRouter.patch("/:id", updateUser);

userRouter.get("/:id", getUserById);

userRouter.delete("/:id", deleteUser);

export default userRouter;
