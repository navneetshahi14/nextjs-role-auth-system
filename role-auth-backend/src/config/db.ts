import mongoose from "mongoose";
import { ENV } from "./ENV";
const mongooseUri = ENV.MONGO_URI || ""

if(!mongooseUri) console.log("mongoose url not fount")
 
const connectDB = async()=>{
    try{

        (await mongoose.connect(mongooseUri)).isObjectIdOrHexString((data:any) => console.log(`database connected with ${data.connection.host}`))
        
    }catch(err:any){
        console.log(err?.message)
        setTimeout(connectDB,5000)
    }
}

export default connectDB