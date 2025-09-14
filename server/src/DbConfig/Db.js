import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDb = async()=>{
   try {
     const conneCtion = await mongoose.connect(process.env.MONGO_URI);
     if(conneCtion){
       console.log(`MongoDB connected successfully`);
       console.log("Host: ", conneCtion.connection.host);
     }else{
       console.log(`MongoDB connection failed`);
     }
   } catch (error) {
     console.log(error.message);
   }
}

export default connectDb;