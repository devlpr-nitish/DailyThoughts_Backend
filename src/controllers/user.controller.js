import { userModel } from "../schemas/user.schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default class UserController {
  async signup(req, res, next) {
    try {
      const { username, college, password } = req.body;
      const userExists = await userModel.findOne({ username: username });
      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: "username already exists" });
      }
      const newUser = new userModel({ username, college, password });
      const user = await newUser.save();
      return res
        .status(201)
        .json({ success: true, user, message: "signup successfully" });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }

  async signin(req, res, next) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, 
        { expiresIn: "1d" } 
      );

      return res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          college: user.college,
        },
        token, // Send the JWT token to the client
        message: "Login successful",
      });
    } catch (error) {
      // console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
        error: error.message,
      });
    }
  }
}
