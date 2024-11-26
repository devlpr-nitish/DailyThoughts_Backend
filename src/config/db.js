import mongoose from "mongoose";


const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connect successfully");
    })
    .catch((err) => {
      console.log("Database connection error: ", err);
    });
};

export default connectToDb;
