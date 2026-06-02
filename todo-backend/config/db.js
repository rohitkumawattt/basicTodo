import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/TODO`);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}
export default connectDB;