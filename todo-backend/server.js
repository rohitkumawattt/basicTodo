import express from "express"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import connectDB from "./config/db.js";
import todoRouter from "./routes/todo.route.js"

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({message: "Hello World"});
})
// database connection
connectDB();

// todo routers api

app.use("/api/todo", todoRouter);


app.listen(port, () =>{
    console.log(`Server is running on port -> ${port}`);
})
