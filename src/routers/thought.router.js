import express from 'express';
import ThoughtContoller from '../controllers/thought.contoller.js';

const thoughtRouter = express.Router();
const thoughtController = new ThoughtContoller();

thoughtRouter.post("/add", (req,res,next)=>{
    thoughtController.addThought(req,res,next);
})
thoughtRouter.get("/", (req,res,next)=>{
    thoughtController.getThought(req,res,next);
})
thoughtRouter.delete("/:thoughtId", (req,res,next)=>{
    thoughtController.deleteThought(req,res,next);
})
thoughtRouter.get("/:collegeName", (req,res,next)=>{
    thoughtController.getThoughtsByCollegeName(req,res,next);
})
thoughtRouter.post("/:thoughtId/like", (req,res,next)=>{
    thoughtController.likeThought(req,res,next);
})
thoughtRouter.post("/:thoughtId/dislike", (req,res,next)=>{
    thoughtController.dislikeThought(req,res,next);
})



export default thoughtRouter;