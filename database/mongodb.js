import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI){
    throw new Error('DB_URI is not defined in .env.local');
}

const connectToDB = async ()=> {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Database connected in ${NODE_ENV} mode`)
    } catch (error) {
        console.log('Error connecting in DB',error)
        process.exit(1)
    }
}

export default connectToDB