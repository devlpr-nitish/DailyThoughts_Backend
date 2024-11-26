import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", (req,res,next)=>{
    userController.signup(req,res,next);
})

userRouter.post("/signin", (req,res,next)=>{
    userController.signin(req,res,next);
})

export default userRouter;