import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
//middleware
app.use(cors(
    {
        origin:process.env.CLIENT_URL,
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Database Connection
import connectDb from "./DbConfig/Db.js";
connectDb();
 
//user routes
import userRoutes from "./Routes/User.Routes.js";
app.use("/api/v1/user", userRoutes);

//book routes
import bookRoutes from "./Routes/Book.Routes.js";
app.use("/api/v1/book", bookRoutes);

//request routes
import requestRoutes from "./Routes/Request.Routes.js";
app.use("/api/v1/request", requestRoutes);
export default app;

