import express from 'express'
import { createUser, getUsers, updateUserItems, updateUserPassword } from '../controllers/user.js'

export const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/get", getUsers);
userRouter.post("/updatePassword", updateUserPassword);
userRouter.post("/updateItems", updateUserItems);
