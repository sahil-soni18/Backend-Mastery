import express from 'express';
import { createUser, getUsers, updateUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.post('/', createUser);

userRouter.patch('/:id', updateUser);

export default userRouter;