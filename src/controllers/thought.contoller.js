import { Thought } from "../schemas/thought.schema.js";
import { userModel } from "../schemas/user.schema.js";

export default class ThoughtContoller {
  async addThought(req, res, next) {
    try {
      const { thought } = req.body;
      const userId = req.userId;
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, error: "Unauthorized user." });
      }
      if (!thought) {
        return res
          .status(400)
          .json({ success: false, error: "Message is required." });
      }

      const userData = await userModel.findOne({ _id: userId });

      const newThought = new Thought({
        thought,
        user: userId,
        college: userData.college,
      });

      await newThought.save();

      return res.status(201).json({ success: true, data: newThought });
    } catch (error) {
      console.error("Error saving thought:", error);

      // Ensure a single response is sent
      if (!res.headersSent) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getThought(req, res, next) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res
          .status(400)
          .json({ success: false, error: "Unauthorized user." });
      }

      // Find all thoughts added by the user
      const thoughts = await Thought.find({ user: userId });

      // Check if no thoughts are found
      if (!thoughts.length) {
        return res
          .status(404)
          .json({ message: "No thoughts found for this user." });
      }

      // Return the thoughts along with the user data
      return res.status(200).json({ success: true, thoughts });
    } catch (error) {
      console.error("Error fetching thoughts:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteThought(req, res, next) {
    try {
      const userId = req.userId;
      const { thoughtId } = req.params;

      // Find the thought to ensure it exists and belongs to the user
      const thought = await Thought.findById(thoughtId);
      // console.log(thought);

      if (!thought) {
        return res
          .status(404)
          .json({ success: false, message: "Thought not found" });
      }

      if (thought.user.toString() !== userId) {
        // Assuming `user` is a field in the Thought model
        return res
          .status(403)
          .json({
            success: false,
            message: "You are not authorized to delete this thought",
          });
      }

      // Delete the thought
      await Thought.findByIdAndDelete(thoughtId);

      res
        .status(200)
        .json({ success: true, message: "Thought deleted successfully" });
    } catch (error) {
      console.error("Error deleting thought:", error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the thought" });
    }
  }

  async getThoughtsByCollegeName(req,res,next){
    try {
      const { collegeName } = req.params; // Extract collegeName from params
      const userId = req.userId; // Extract userId from the request (assumes middleware has set this)
  
      if (!collegeName || !userId) {
        return res.status(400).json({ message: "College name and user ID are required." });
      }
  
      // Find the user making the request
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const formateCollegeName = user.college.toLowerCase().replace(/\s+/g, '-');
  
      // Check if the user's college matches the collegeName from params
      if (formateCollegeName !== collegeName) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to view thoughts for this college.",
        });
      }
  
      // Fetch thoughts that match the college name
      const thoughts = await Thought.find({ college: user.college });
  
      if (!thoughts || thoughts.length === 0) {
        return res.status(404).json({ message: "No thoughts found for this college." });
      }
  
      res.status(200).json({ success: true, thoughts });
    } catch (error) {
      console.error("Error fetching thoughts by college name:", error);
      res.status(500).json({ message: "An error occurred while fetching thoughts." });
    }
  }
}
