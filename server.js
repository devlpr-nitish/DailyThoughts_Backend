import connectToDb from './src/config/db.js';
import './env.js';
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import userRouter from './src/routers/user.router.js';
import thoughtRouter from './src/routers/thought.router.js';
import authenticate from './src/middlewares/jwt.middleware.js';


const server = express();
server.use(cors());
server.use(bodyParser.json());

//routes
server.use("/api/users", userRouter);
server.use("/api/thoughts",authenticate, thoughtRouter);



server.get("/", (req,res,next)=>{
    res.send("Hello");
})

server.listen(3000 || process.env.PORT, ()=>{
    console.log(`Server is running`);
    connectToDb();
})